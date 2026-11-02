import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Send,
  Copy,
  RefreshCw,
  Check
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { sendVeerAIMessage } from '../../services/veerAIService';

const AI_PROMPTS = [
  'Officer entry routes for B.Tech graduates?',
  'Agniveer GD vs Technical eligibility & pay?',
  'How to prepare for NDA after 10+2?',
  'What are the 1.6km physical fitness run standards?',
  'Explain the 5-day SSB interview selection procedure'
];

/**
 * Lightweight Rich Markdown & Text Formatter for LLM responses
 */
const FormattedMessage = ({ content }) => {
  if (!content) return null;

  const lines = content.split('\n');
  const renderedElements = [];
  let inList = false;
  let listItems = [];
  let listType = 'ul';

  const flushList = () => {
    if (inList && listItems.length > 0) {
      if (listType === 'ol') {
        renderedElements.push(
          <ol key={`ol-${renderedElements.length}`} className="chat-ol">
            {listItems.map((item, i) => (
              <li key={i}>{formatInline(item)}</li>
            ))}
          </ol>
        );
      } else {
        renderedElements.push(
          <ul key={`ul-${renderedElements.length}`} className="chat-ul">
            {listItems.map((item, i) => (
              <li key={i}>{formatInline(item)}</li>
            ))}
          </ul>
        );
      }
      listItems = [];
      inList = false;
    }
  };

  const formatInline = (text) => {
    const parts = [];
    let keyIdx = 0;
    const regex = /(\*\*([^*]+)\*\*|\*([^*]+)\*|`([^`]+)`)/g;
    let match;
    let lastIndex = 0;

    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }
      if (match[2]) {
        parts.push(<strong key={keyIdx++}>{match[2]}</strong>);
      } else if (match[3]) {
        parts.push(<em key={keyIdx++}>{match[3]}</em>);
      } else if (match[4]) {
        parts.push(<code key={keyIdx++} className="inline-code">{match[4]}</code>);
      }
      lastIndex = regex.lastIndex;
    }

    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }

    return parts.length > 0 ? parts : text;
  };

  lines.forEach((line, idx) => {
    const trimmed = line.trim();

    if (!trimmed) {
      flushList();
      return;
    }

    // Headers
    if (trimmed.startsWith('### ')) {
      flushList();
      renderedElements.push(
        <h4 key={idx} className="chat-h4">
          {formatInline(trimmed.replace(/^###\s+/, ''))}
        </h4>
      );
      return;
    }
    if (trimmed.startsWith('## ')) {
      flushList();
      renderedElements.push(
        <h3 key={idx} className="chat-h3">
          {formatInline(trimmed.replace(/^##\s+/, ''))}
        </h3>
      );
      return;
    }

    // Unordered list
    if (trimmed.startsWith('- ') || trimmed.startsWith('* ') || trimmed.startsWith('• ')) {
      if (!inList || listType !== 'ul') {
        flushList();
        inList = true;
        listType = 'ul';
      }
      listItems.push(trimmed.replace(/^[-*•]\s+/, ''));
      return;
    }

    // Ordered list (1. 2. 3.)
    const numMatch = trimmed.match(/^(\d+)\.\s+(.*)/);
    if (numMatch) {
      if (!inList || listType !== 'ol') {
        flushList();
        inList = true;
        listType = 'ol';
      }
      listItems.push(numMatch[2]);
      return;
    }

    // Callout / Blockquote
    if (trimmed.startsWith('> ')) {
      flushList();
      renderedElements.push(
        <div key={idx} className="chat-callout">
          {formatInline(trimmed.replace(/^>\s+/, ''))}
        </div>
      );
      return;
    }

    // Regular paragraph
    flushList();
    renderedElements.push(
      <p key={idx} className="chat-p">
        {formatInline(trimmed)}
      </p>
    );
  });

  flushList();

  return <div className="formatted-chat-content">{renderedElements}</div>;
};

const VeerAIModal = () => {
  const { isVeerAIOpen, setIsVeerAIOpen, user } = useApp();
  const [query, setQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState(null);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      role: 'assistant',
      text: `Jai Hind! I am **Veer AI**, the official intelligent guidance assistant for the **Indian Army Recruitment Portal**.

Ask me anything regarding:
- **Officer Entries:** NDA, CDS, TGC, SSC Tech, NCC Special, JAG.
- **Agnipath Scheme:** Agniveer General Duty, Technical, Clerk, Tradesmen eligibility & terms.
- **Training Academies:** NDA Khadakwasla, IMA Dehradun, OTA Chennai.
- **Selection Process & Physical Standards:** 1.6km run benchmarks, 5-day SSB interviews, and CEE tests.`
    }
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isVeerAIOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [isVeerAIOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  if (!isVeerAIOpen) return null;

  const handleAsk = async (question) => {
    const trimmedQuestion = question.trim();
    if (!trimmedQuestion || isTyping) return;

    const userMessageId = Date.now();
    const newMessages = [
      ...messages,
      { id: userMessageId, role: 'user', text: trimmedQuestion }
    ];

    setMessages(newMessages);
    setQuery('');
    setIsTyping(true);

    try {
      const response = await sendVeerAIMessage(
        newMessages.map((m) => ({ role: m.role, content: m.text }))
      );

      setMessages((current) => [
        ...current,
        {
          id: userMessageId + 1,
          role: 'assistant',
          text: response.text,
          isLive: response.isLive
        }
      ]);
    } catch (error) {
      setMessages((current) => [
        ...current,
        {
          id: userMessageId + 1,
          role: 'assistant',
          text: `⚠️ **Connection Notice:** ${error.message || 'Unable to connect right now.'}\n\nPlease retry your question in a moment.`,
          isLive: false
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const copyMessage = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="veer-ai-backdrop" onClick={() => setIsVeerAIOpen(false)}>
      <div
        className="veer-ai-dialog animate-slide-up-fade"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label="Veer AI Chat"
      >
        {/* Header */}
        <div className="veer-ai-header">
          <div className="veer-ai-brand">
            <div className="veer-ai-logo-glow" title="Indian Army Official Crest">
              <img
                src="/Logo.png"
                alt="Indian Army Official Emblem"
                className="veer-army-emblem"
              />
            </div>
            <div>
              <div className="veer-ai-title-row">
                <h3 className="veer-ai-title">Veer AI</h3>
                <span className="live-pill-badge">
                  <span className="status-dot online" />
                  Official Army AI
                </span>
              </div>
              <span className="veer-ai-subtitle">Official Indian Army Recruitment Assistant</span>
            </div>
          </div>

          <button
            type="button"
            className="liquid-btn header-action-btn close-btn"
            onClick={() => setIsVeerAIOpen(false)}
            aria-label="Close Veer AI"
          >
            <X size={18} />
          </button>
        </div>

        {/* Chat History Area */}
        <div className="veer-ai-chat-area">
          {messages.map((message) => (
            <div key={message.id} className={`chat-message-row ${message.role}`}>
              {message.role === 'assistant' && (
                <div className="chat-avatar assistant" title="Veer AI (Indian Army)">
                  <img
                    src="/Logo.png"
                    alt="Indian Army Emblem"
                    className="chat-avatar-emblem"
                  />
                </div>
              )}

              <div className="chat-bubble-wrapper">
                <div className="chat-bubble">
                  {message.role === 'assistant' ? (
                    <FormattedMessage content={message.text} />
                  ) : (
                    message.text
                  )}
                </div>

                {message.role === 'assistant' && (
                  <div className="chat-actions">
                    <button
                      type="button"
                      className="chat-action-btn"
                      title="Copy response"
                      onClick={() => copyMessage(message.text, message.id)}
                    >
                      {copiedId === message.id ? <Check size={12} color="#16a34a" /> : <Copy size={12} />}
                    </button>
                  </div>
                )}
              </div>

              {message.role === 'user' && (
                <div className="chat-avatar user" style={{ overflow: 'hidden' }}>
                  <img
                    src={user?.photo || '/avatar.png'}
                    alt="Candidate"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => { e.target.onerror = null; e.target.src = '/avatar.png'; }}
                  />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="chat-message-row assistant typing">
              <div className="chat-avatar assistant" title="Veer AI">
                <img
                  src="/Logo.png"
                  alt="Indian Army Emblem"
                  className="chat-avatar-emblem"
                />
              </div>
              <div className="chat-bubble typing-bubble">
                <span className="dot" />
                <span className="dot" />
                <span className="dot" />
                <span className="thinking-text">Veer AI is thinking...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="veer-ai-input-zone">
          {messages.length <= 2 && (
            <div className="veer-ai-suggestions">
              {AI_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  className="suggestion-chip liquid-btn"
                  onClick={() => handleAsk(prompt)}
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          <form
            className="veer-ai-input-form"
            onSubmit={(e) => {
              e.preventDefault();
              handleAsk(query);
            }}
          >
            <div className="liquid-input-container">
              <button
                type="button"
                className="input-icon-btn reset-btn"
                title="Start New Chat"
                onClick={() =>
                  setMessages([
                    {
                      id: 'welcome',
                      role: 'assistant',
                      text: `Jai Hind! I am **Veer AI**, the official intelligent guidance assistant for the **Indian Army Recruitment Portal**.\n\nHow can I help with your recruitment, eligibility, physical preparation, or academy journey today?`
                    }
                  ])
                }
              >
                <RefreshCw size={17} />
              </button>

              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask Veer AI anything about Army eligibility, entries, exams..."
                className="liquid-input"
                disabled={isTyping}
              />

              <button
                type="submit"
                className={`liquid-submit-btn ${query.trim() && !isTyping ? 'active' : ''}`}
                disabled={!query.trim() || isTyping}
                aria-label="Send message"
              >
                <Send size={18} />
              </button>
            </div>
          </form>

          <div className="veer-ai-disclaimer">
            <span>Powered by Veer AI • For final eligibility, always refer to official notifications.</span>
          </div>
        </div>

        <style>{`
          /* Full Screen Blurred Backdrop */
          .veer-ai-backdrop {
            position: fixed;
            inset: 0;
            z-index: 9999;
            background: rgba(0, 0, 0, 0.45);
            backdrop-filter: blur(14px);
            -webkit-backdrop-filter: blur(14px);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
          }

          /* Massive Glassmorphic Modal Pane */
          .veer-ai-dialog {
            width: 100%;
            max-width: 880px;
            height: 86vh;
            max-height: 820px;
            background: rgba(255, 255, 255, 0.75);
            backdrop-filter: blur(40px) saturate(200%);
            -webkit-backdrop-filter: blur(40px) saturate(200%);
            border: 1px solid rgba(255, 255, 255, 0.6);
            border-radius: 28px;
            box-shadow: 
              0 40px 100px rgba(0, 0, 0, 0.18),
              inset 0 0 0 1px rgba(255, 255, 255, 0.6),
              inset 0 2px 20px rgba(255, 255, 255, 0.5);
            display: flex;
            flex-direction: column;
            overflow: hidden;
            position: relative;
          }

          [data-theme='dark'] .veer-ai-dialog {
            background: rgba(18, 28, 22, 0.72);
            border: 1px solid rgba(255, 255, 255, 0.1);
            box-shadow: 
              0 40px 100px rgba(0, 0, 0, 0.6),
              inset 0 0 0 1px rgba(255, 255, 255, 0.06),
              inset 0 2px 20px rgba(255, 255, 255, 0.04);
          }

          /* Header */
          .veer-ai-header {
            padding: 16px 24px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid rgba(0, 0, 0, 0.06);
            background: rgba(255, 255, 255, 0.4);
          }

          [data-theme='dark'] .veer-ai-header {
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
            background: rgba(0, 0, 0, 0.25);
          }

          .veer-ai-brand {
            display: flex;
            align-items: center;
            gap: 14px;
          }

          .veer-ai-logo-glow {
            width: 46px;
            height: 46px;
            border-radius: 14px;
            background: linear-gradient(145deg, #ffffff, #f4f6f4);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border: 1.5px solid rgba(31, 73, 48, 0.22);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 5px;
            box-shadow: 0 4px 18px rgba(31, 73, 48, 0.12), inset 0 1px 2px rgba(255, 255, 255, 1);
            position: relative;
            flex-shrink: 0;
            transition: all var(--transition-normal);
          }

          .veer-ai-logo-glow:hover {
            transform: translateY(-1px) scale(1.03);
            border-color: rgba(31, 73, 48, 0.4);
            box-shadow: 0 6px 20px rgba(31, 73, 48, 0.18), inset 0 1px 2px #fff;
          }

          [data-theme='dark'] .veer-ai-logo-glow {
            background: linear-gradient(145deg, rgba(28, 48, 34, 0.9), rgba(14, 26, 18, 0.95));
            border: 1.5px solid rgba(229, 190, 89, 0.45);
            box-shadow: 0 6px 24px rgba(0, 0, 0, 0.45), 0 0 14px rgba(218, 165, 32, 0.25), inset 0 1px 2px rgba(255, 255, 255, 0.15);
          }

          [data-theme='dark'] .veer-ai-logo-glow:hover {
            border-color: rgba(245, 158, 11, 0.7);
            box-shadow: 0 8px 28px rgba(0, 0, 0, 0.6), 0 0 20px rgba(218, 165, 32, 0.4), inset 0 1px 2px rgba(255, 255, 255, 0.25);
          }

          .veer-army-emblem {
            width: 100%;
            height: 100%;
            object-fit: contain;
            filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.12));
            transition: transform 0.3s ease, filter 0.3s ease;
          }

          .veer-ai-logo-glow:hover .veer-army-emblem {
            transform: scale(1.06);
          }

          [data-theme='dark'] .veer-army-emblem {
            filter: drop-shadow(0 0 6px rgba(255, 215, 0, 0.55)) brightness(1.15) contrast(1.08);
          }

          .veer-ai-title-row {
            display: flex;
            align-items: center;
            gap: 10px;
          }

          .veer-ai-title {
            font-family: var(--font-display);
            font-size: 1.25rem;
            font-weight: 900;
            color: var(--text-primary);
            margin: 0;
            line-height: 1.2;
          }

          .live-pill-badge {
            display: inline-flex;
            align-items: center;
            gap: 5px;
            font-size: 0.6875rem;
            font-weight: 700;
            padding: 2px 8px;
            border-radius: var(--radius-full);
            background: rgba(31, 73, 48, 0.1);
            color: var(--army-primary);
            border: 1px solid rgba(31, 73, 48, 0.15);
          }

          [data-theme='dark'] .live-pill-badge {
            background: rgba(197, 155, 39, 0.15);
            color: var(--gold-light);
            border-color: rgba(197, 155, 39, 0.25);
          }

          .status-dot {
            width: 6px;
            height: 6px;
            border-radius: 50%;
          }

          .status-dot.online {
            background: #22c55e;
            box-shadow: 0 0 6px #22c55e;
          }

          .veer-ai-subtitle {
            font-size: 0.75rem;
            color: var(--text-secondary);
            font-weight: 500;
          }

          .header-action-btn {
            width: 36px;
            height: 36px;
          }

          /* Chat History Area */
          .veer-ai-chat-area {
            flex: 1;
            padding: 24px;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            gap: 20px;
          }

          .veer-ai-chat-area::-webkit-scrollbar {
            width: 6px;
          }
          .veer-ai-chat-area::-webkit-scrollbar-thumb {
            background: rgba(0, 0, 0, 0.15);
            border-radius: 10px;
          }
          [data-theme='dark'] .veer-ai-chat-area::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.15);
          }

          .chat-message-row {
            display: flex;
            gap: 14px;
            max-width: 88%;
            animation: slide-up-message 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }

          .chat-message-row.user {
            align-self: flex-end;
            flex-direction: row-reverse;
          }

          @keyframes slide-up-message {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }

          .chat-avatar {
            width: 38px;
            height: 38px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            margin-top: 2px;
          }

          .chat-avatar.assistant {
            background: linear-gradient(145deg, #ffffff, #f4f6f4);
            border: 1.5px solid rgba(31, 73, 48, 0.18);
            padding: 4px;
            box-shadow: 0 4px 12px rgba(31, 73, 48, 0.08), inset 0 1px 2px #ffffff;
          }

          [data-theme='dark'] .chat-avatar.assistant {
            background: linear-gradient(145deg, rgba(28, 48, 34, 0.9), rgba(14, 26, 18, 0.95));
            border: 1.5px solid rgba(229, 190, 89, 0.4);
            box-shadow: 0 4px 14px rgba(0, 0, 0, 0.35), 0 0 10px rgba(218, 165, 32, 0.2), inset 0 1px 2px rgba(255, 255, 255, 0.15);
          }

          .chat-avatar-emblem {
            width: 100%;
            height: 100%;
            object-fit: contain;
            filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1));
          }

          [data-theme='dark'] .chat-avatar-emblem {
            filter: drop-shadow(0 0 4px rgba(255, 215, 0, 0.5)) brightness(1.15);
          }

          .chat-avatar.user {
            background: linear-gradient(135deg, var(--army-primary), var(--army-dark));
            color: #ffffff;
            font-weight: 800;
            font-size: 0.875rem;
            box-shadow: 0 4px 12px rgba(31, 73, 48, 0.2);
            border: 1.5px solid rgba(255, 255, 255, 0.2);
          }

          [data-theme='dark'] .chat-avatar.user {
            background: linear-gradient(135deg, #c59b27, #8c6e1c);
            color: #0d1a0f;
            box-shadow: 0 4px 14px rgba(197, 155, 39, 0.3);
            border-color: rgba(255, 255, 255, 0.25);
          }

          .chat-bubble-wrapper {
            display: flex;
            flex-direction: column;
            gap: 4px;
          }

          .chat-bubble {
            padding: 14px 18px;
            font-size: 0.9375rem;
            line-height: 1.55;
            color: var(--text-primary);
          }

          .chat-message-row.assistant .chat-bubble {
            background: rgba(255, 255, 255, 0.85);
            border-radius: 4px 18px 18px 18px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04);
            border: 1px solid rgba(0, 0, 0, 0.05);
          }

          [data-theme='dark'] .chat-message-row.assistant .chat-bubble {
            background: rgba(255, 255, 255, 0.07);
            border-color: rgba(255, 255, 255, 0.08);
            box-shadow: none;
          }

          .chat-message-row.user .chat-bubble {
            background: var(--army-primary);
            color: #fff;
            border-radius: 18px 4px 18px 18px;
            box-shadow: 0 4px 15px rgba(31, 69, 41, 0.2);
          }

          [data-theme='dark'] .chat-message-row.user .chat-bubble {
            background: var(--gold-dark);
            color: #0d1a0f;
          }

          /* Formatted Markdown in Chat */
          .formatted-chat-content {
            display: flex;
            flex-direction: column;
            gap: 10px;
          }

          .chat-h3 {
            font-family: var(--font-display);
            font-size: 1.0625rem;
            font-weight: 800;
            color: var(--text-primary);
            margin: 4px 0 2px;
          }

          .chat-h4 {
            font-family: var(--font-display);
            font-size: 0.95rem;
            font-weight: 800;
            color: var(--army-primary);
            margin: 4px 0 2px;
          }

          [data-theme='dark'] .chat-h4 {
            color: var(--gold-light);
          }

          .chat-p {
            margin: 0;
            font-size: 0.9375rem;
            color: var(--text-primary);
          }

          .chat-ul, .chat-ol {
            margin: 0;
            padding-left: 20px;
            display: flex;
            flex-direction: column;
            gap: 4px;
          }

          .chat-ul li, .chat-ol li {
            font-size: 0.9rem;
            color: var(--text-secondary);
            line-height: 1.45;
          }

          .chat-callout {
            background: rgba(31, 73, 48, 0.06);
            border-left: 3px solid var(--army-primary);
            padding: 8px 12px;
            border-radius: 0 var(--radius-xs) var(--radius-xs) 0;
            font-size: 0.875rem;
          }

          [data-theme='dark'] .chat-callout {
            background: rgba(197, 155, 39, 0.1);
            border-left-color: var(--gold-light);
          }

          .inline-code {
            background: rgba(0, 0, 0, 0.08);
            padding: 2px 6px;
            border-radius: 4px;
            font-family: monospace;
            font-size: 0.8125rem;
          }

          [data-theme='dark'] .inline-code {
            background: rgba(255, 255, 255, 0.12);
          }

          .chat-actions {
            display: flex;
            align-items: center;
            gap: 8px;
            padding-left: 4px;
          }

          .chat-action-btn {
            background: none;
            border: none;
            color: var(--text-muted);
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 22px;
            height: 22px;
            border-radius: 4px;
          }

          .chat-action-btn:hover {
            color: var(--text-primary);
            background: rgba(0, 0, 0, 0.05);
          }

          /* Typing Bubble */
          .typing-bubble {
            display: flex;
            align-items: center;
            gap: 6px;
            padding: 12px 18px;
          }

          .thinking-text {
            font-size: 0.8125rem;
            color: var(--text-secondary);
            font-style: italic;
            margin-left: 4px;
          }

          .dot {
            width: 6px;
            height: 6px;
            background: var(--army-primary);
            border-radius: 50%;
            animation: bounce 1.4s infinite ease-in-out both;
          }

          [data-theme='dark'] .dot {
            background: var(--gold-light);
          }

          .dot:nth-child(1) { animation-delay: -0.32s; }
          .dot:nth-child(2) { animation-delay: -0.16s; }

          @keyframes bounce {
            0%, 80%, 100% { transform: scale(0); }
            40% { transform: scale(1); }
          }

          /* Input Zone */
          .veer-ai-input-zone {
            padding: 0 24px 20px;
            background: linear-gradient(0deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 100%);
            display: flex;
            flex-direction: column;
            gap: 12px;
          }

          [data-theme='dark'] .veer-ai-input-zone {
            background: linear-gradient(0deg, rgba(18,28,22,0.7) 0%, rgba(18,28,22,0) 100%);
          }

          .veer-ai-suggestions {
            display: flex;
            gap: 10px;
            overflow-x: auto;
            padding: 4px 2px 6px;
            scroll-behavior: smooth;
          }
          
          .veer-ai-suggestions::-webkit-scrollbar {
            display: none;
          }

          /* 3D Liquid Glass Droplet Effect */
          .suggestion-chip {
            border-radius: 100px;
            padding: 9px 16px;
            white-space: nowrap;
            font-size: 0.8125rem;
            font-weight: 600;
            color: #173824;
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(240, 248, 243, 0.65) 100%);
            backdrop-filter: blur(16px) saturate(200%);
            -webkit-backdrop-filter: blur(16px) saturate(200%);
            border: 1px solid rgba(31, 73, 48, 0.2);
            box-shadow: 
              0 4px 14px rgba(31, 73, 48, 0.08),
              inset 0 1.5px 2px rgba(255, 255, 255, 0.95),
              inset 0 -1.5px 2px rgba(31, 73, 48, 0.06);
            cursor: pointer;
            position: relative;
            user-select: none;
            transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
            display: inline-flex;
            align-items: center;
            gap: 6px;
          }

          .suggestion-chip:hover {
            color: #0b2214;
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(225, 245, 232, 0.85) 100%);
            border-color: rgba(31, 73, 48, 0.4);
            transform: translateY(-2px) scale(1.02);
            box-shadow: 
              0 8px 22px rgba(31, 73, 48, 0.16),
              inset 0 2px 2px #ffffff,
              inset 0 -1.5px 2px rgba(31, 73, 48, 0.08),
              0 0 12px rgba(34, 197, 94, 0.2);
          }

          .suggestion-chip:active {
            transform: translateY(0) scale(0.97);
            box-shadow: 
              0 2px 8px rgba(31, 73, 48, 0.12),
              inset 0 1px 1px rgba(255, 255, 255, 0.8);
          }

          /* Dark Mode 3D Droplet Glass */
          [data-theme='dark'] .suggestion-chip {
            color: #fef08a;
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.14) 0%, rgba(255, 255, 255, 0.04) 100%);
            border: 1px solid rgba(229, 190, 89, 0.38);
            box-shadow: 
              0 6px 18px rgba(0, 0, 0, 0.45),
              inset 0 1.5px 2px rgba(255, 255, 255, 0.3),
              inset 0 -1.5px 2px rgba(0, 0, 0, 0.4),
              0 0 10px rgba(218, 165, 32, 0.15);
          }

          [data-theme='dark'] .suggestion-chip:hover {
            color: #ffffff;
            background: linear-gradient(135deg, rgba(229, 190, 89, 0.25) 0%, rgba(255, 255, 255, 0.18) 100%);
            border-color: rgba(251, 191, 36, 0.7);
            transform: translateY(-2px) scale(1.02);
            box-shadow: 
              0 8px 26px rgba(0, 0, 0, 0.55),
              inset 0 2px 3px rgba(255, 255, 255, 0.45),
              0 0 18px rgba(251, 191, 36, 0.4);
          }

          [data-theme='dark'] .suggestion-chip:active {
            transform: translateY(0) scale(0.97);
            box-shadow: 
              0 2px 8px rgba(0, 0, 0, 0.4),
              inset 0 1px 1.5px rgba(255, 255, 255, 0.2);
          }

          .liquid-input-container {
            display: flex;
            align-items: center;
            background: rgba(255, 255, 255, 0.88);
            border: 1px solid rgba(0, 0, 0, 0.1);
            border-radius: 30px;
            padding: 6px 10px;
            box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08), inset 0 2px 5px rgba(255, 255, 255, 0.8);
            transition: all 0.3s ease;
          }

          .liquid-input-container:focus-within {
            box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12), inset 0 2px 5px rgba(255, 255, 255, 1);
            border-color: rgba(31, 73, 48, 0.3);
            transform: translateY(-2px);
          }

          [data-theme='dark'] .liquid-input-container {
            background: rgba(0, 0, 0, 0.45);
            border: 1px solid rgba(255, 255, 255, 0.15);
            box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3), inset 0 2px 5px rgba(255, 255, 255, 0.05);
          }

          [data-theme='dark'] .liquid-input-container:focus-within {
            border-color: var(--gold-primary);
          }

          .input-icon-btn {
            background: transparent;
            border: none;
            color: var(--text-muted);
            width: 36px;
            height: 36px;
            display: grid;
            place-items: center;
            cursor: pointer;
            border-radius: 50%;
            transition: all 0.2s;
          }

          .input-icon-btn:hover {
            color: var(--text-primary);
            background: rgba(0, 0, 0, 0.05);
          }

          .liquid-input {
            flex: 1;
            background: transparent;
            border: none;
            outline: none;
            padding: 0 12px;
            font-size: 0.95rem;
            color: var(--text-primary);
          }

          .liquid-input::placeholder {
            color: var(--text-muted);
          }

          .liquid-submit-btn {
            width: 38px;
            height: 38px;
            border-radius: 50%;
            border: none;
            background: #e2e8f0;
            color: #94a3b8;
            display: grid;
            place-items: center;
            cursor: not-allowed;
            transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          }

          [data-theme='dark'] .liquid-submit-btn {
            background: #334155;
            color: #64748b;
          }

          .liquid-submit-btn.active {
            background: var(--army-primary);
            color: #fff;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(31, 69, 41, 0.4);
          }

          .liquid-submit-btn.active:hover {
            transform: scale(1.08);
            background: var(--army-forest);
          }

          [data-theme='dark'] .liquid-submit-btn.active {
            background: var(--gold-dark);
            color: #0d1a0f;
            box-shadow: 0 4px 12px rgba(197, 155, 39, 0.4);
          }

          .veer-ai-disclaimer {
            text-align: center;
            font-size: 0.6875rem;
            color: var(--text-muted);
            font-weight: 500;
          }

          .animate-slide-up-fade {
            animation: slide-up-fade 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }

          @keyframes slide-up-fade {
            0% { opacity: 0; transform: translateY(30px) scale(0.98); }
            100% { opacity: 1; transform: translateY(0) scale(1); }
          }
        `}</style>
      </div>
    </div>
  );
};

export default VeerAIModal;
