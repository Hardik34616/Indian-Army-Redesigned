/* ==============================================================================
   VEER AI - GOOGLE GEMINI LLM SERVICE (Free Tier)
   Uses Gemini REST API directly via fetch — no npm package needed.
   Free tier: 15 RPM, 1M TPM, 1500 RPD.
   ============================================================================== */

// Model fallback chain — fast non-thinking models that respond quickly for chat
const GEMINI_MODELS = [
  'gemini-3.5-flash-lite',   // Fastest, confirmed working
  'gemini-3.5-flash',        // Fallback
  'gemini-2.5-flash-lite',   // Second fallback
];
const BASE_URL = 'https://generativelanguage.googleapis.com/v1beta/models';

/** Read the API key from .env only — no user-facing key config */
const getApiKey = () => (import.meta.env.VITE_GEMINI_API_KEY || '').trim();

const SYSTEM_INSTRUCTION = `You are "Veer AI", the official, highly knowledgeable, patriotic, and authoritative AI Recruitment and Guidance Assistant for the Indian Army (Join Indian Army official portal redesign).

Your Core Mission:
Provide accurate, motivating, structured, and helpful guidance to young Indian aspirants seeking to join the Indian Army across all entry streams (Officer Entries, JCO/OR, Agnipath Scheme, and Territorial Army).

Domain Knowledge & Rules:
1. OFFICER ENTRIES:
   - NDA (National Defence Academy, Khadakwasla): 10+2 Entry, age 16.5-19.5, UPSC exam + 5-day SSB interview. 3 Yrs NDA + 1 Yr IMA.
   - CDS (Combined Defence Services): For graduates (age 19-24 for IMA, 19-25 for OTA). UPSC CDS Exam + SSB.
   - TGC (Technical Graduate Course) & SSC Tech: For B.E./B.Tech graduates (age 20-27). Direct SSB shortlisting based on engineering cutoff percentage (no written exam).
   - NCC Special Entry: For graduates with 50% + NCC 'C' Certificate (Alpha/Bravo grade). Direct SSB.
   - JAG (Judge Advocate General): For LLB graduates (min 55% + CLAT PG score), age 21-27.
2. AGNIPATH SCHEME (AGNIVEER):
   - Agniveer General Duty (GD): Class 10th pass with 45% aggregate and 33% in each subject. Age 17.5-21.
   - Agniveer Technical: 10+2 with Physics, Chemistry, Maths & English (50% aggregate, 40% each subject).
   - Agniveer Clerk / Store Keeper Technical: 10+2 in any stream (Arts, Commerce, Science) with 60% aggregate and 50% in English & Maths/Accounts.
   - Agniveer Tradesmen: 10th or 8th pass with minimum 33% in each subject.
   - Tenure: 4 years, Seva Nidhi package (~₹11.71 Lakhs), 25% enrolled into regular cadre.
3. PRESTIGIOUS ACADEMIES:
   - NDA (Khadakwasla, Pune): Tri-service academy (Army, Navy, Air Force). Motto: "Service Before Self".
   - IMA (Dehradun, Uttarakhand): Permanent Commission officer training. Motto: "Valour and Wisdom", Chetwode Credo.
   - OTA (Chennai, Tamil Nadu): Short Service Commission (Men & Women). Motto: "Serve with Honour".
4. SELECTION PROCEDURE:
   - Stage 1: Online Registration / Application & Common Entrance Exam (CEE) or UPSC Written Exam.
   - Stage 2: Physical Fitness Test (PFT: 1.6km run, pull-ups, 9ft ditch, zig-zag balance) or 5-Day SSB Interview (Screening, Psychology, GTO, Personal Interview).
   - Stage 3: Special Medical Board (SMB) / Command Military Hospital.
   - Stage 4: All India Merit List & Academy Dispatch.
5. TONE & STYLE:
   - Professional, inspiring, respectful, structured, and precise.
   - Greet with "Jai Hind!" when appropriate (only on first interaction).
   - Use clear markdown formatting: **Bold headings**, bullet points (-), numbered steps (1.), and clean spacing.
   - Keep answers comprehensive yet concise and scannable.
   - If a question is about dates/notifications, advise them to check the Live Calendar or official notification tab.
   - Always answer as if you are an expert military recruitment counselor.`;

/**
 * Sends a message to Google Gemini API (free tier).
 * @param {Array} messagesHistory - Array of { role: 'user'|'assistant', text/content: string }
 * @returns {Promise<{ text: string, modelUsed: string, isLive: boolean }>}
 */
export const sendVeerAIMessage = async (messagesHistory) => {
  const apiKey = getApiKey();

  // If no API key configured, use offline knowledge base
  if (!apiKey) {
    const lastUserMessage = messagesHistory[messagesHistory.length - 1]?.content || messagesHistory[messagesHistory.length - 1]?.text || '';
    return getOfflineGuidance(lastUserMessage);
  }

  // Build Gemini request body with conversation history
  const contents = messagesHistory
    .filter(m => m.role === 'user' || m.role === 'assistant' || m.role === 'model')
    .map(m => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.text || m.content || '' }]
    }));

  const requestBody = {
    system_instruction: {
      parts: [{ text: SYSTEM_INSTRUCTION }]
    },
    contents,
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 2048,
      topP: 0.95,
      topK: 40
    },
    safetySettings: [
      { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
      { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
      { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
      { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' }
    ]
  };

  // Try each model in the fallback chain
  let lastError = null;

  for (const model of GEMINI_MODELS) {
    try {
      const url = `${BASE_URL}/${model}:generateContent?key=${apiKey}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const status = response.status;

        if (status === 400 || status === 403) {
          console.error(`Gemini model ${model} error:`, errorData?.error?.message);
          // Try next model
          lastError = errorData?.error?.message || `HTTP ${status}`;
          continue;
        }
        if (status === 404 || status === 503) {
          // Model not available or overloaded — try next
          lastError = `Model ${model} unavailable (${status})`;
          continue;
        }
        if (status === 429) {
          lastError = 'Rate limited';
          continue;
        }
        lastError = errorData?.error?.message || `HTTP ${status}`;
        continue;
      }

      const data = await response.json();
      const answer = data?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (answer && answer.trim()) {
        return {
          text: answer.trim(),
          modelUsed: 'Veer AI',
          isLive: true
        };
      }

      // If blocked by safety
      const blockReason = data?.candidates?.[0]?.finishReason;
      if (blockReason === 'SAFETY') {
        return {
          text: 'I apologize, but I can only assist with Indian Army recruitment-related queries. Please ask me about eligibility, entry schemes, academies, physical standards, or the selection process.',
          modelUsed: 'Veer AI',
          isLive: true
        };
      }

      lastError = 'Empty response';
      continue;
    } catch (err) {
      lastError = err.message;
      continue;
    }
  }

  // All models failed — fallback to knowledge base silently
  console.warn('All Gemini models failed, using knowledge base. Last error:', lastError);
  const lastMsg = messagesHistory[messagesHistory.length - 1]?.content || messagesHistory[messagesHistory.length - 1]?.text || '';
  return getOfflineGuidance(lastMsg);
};

/**
 * Rich offline knowledge fallback
 */
const getOfflineGuidance = (question) => {
  const query = (question || '').toLowerCase();

  if (query.includes('agniveer') || query.includes('agnipath') || query.includes('soldier')) {
    return {
      text: `### Agniveer Recruitment Scheme (2026 Batch)

**Key Streams & Educational Requirements:**
- **Agniveer General Duty (GD):** 10th pass with 45% aggregate and minimum 33% in each subject.
- **Agniveer Technical:** 10+2 pass with Physics, Chemistry, Maths & English (min 50% aggregate).
- **Agniveer Clerk / Store Keeper:** 10+2 in any stream (Arts/Commerce/Science) with min 60% aggregate & 50% in English and Maths/Accounts.
- **Agniveer Tradesmen (10th/8th):** 10th or 8th Pass with minimum 33% in all subjects.

**Key Highlights:**
1. **Age Bracket:** 17.5 to 21 Years.
2. **Service Tenure:** 4 Years with ~₹11.71 Lakhs tax-free *Seva Nidhi* fund upon completion.
3. **Permanent Retention:** Up to 25% of candidates are enrolled into the regular army cadre based on merit.

👉 *To start your registration, navigate to the **Agnipath Scheme** section or click "Apply Now" on the homepage.*`,
      modelUsed: 'Veer AI',
      isLive: false
    };
  }

  if (query.includes('b.tech') || query.includes('engineer') || query.includes('tgc') || query.includes('ssc tech')) {
    return {
      text: `### Officer Entry Routes for B.E. / B.Tech Graduates

Engineering graduates have exclusive direct entry pathways to be commissioned as Officers in the Indian Army **without giving a written exam**:

1. **Technical Graduate Course (TGC - Permanent Commission):**
   - **Training Academy:** Indian Military Academy (IMA), Dehradun (1 Year).
   - **Age Limit:** 20 – 27 Years.
   - **Selection:** Direct SSB Interview based on degree cut-off percentage.

2. **Short Service Commission (SSC Tech Men & Women):**
   - **Training Academy:** Officers Training Academy (OTA), Chennai (49 Weeks).
   - **Age Limit:** 20 – 27 Years.
   - **Selection:** Direct SSB Interview.

3. **Combined Defence Services (CDS - IMA / OTA):**
   - Written UPSC Exam + SSB Interview for general combat arms (Infantry, Armoured, Artillery).

👉 *You can check your detailed eligibility on the **Opportunities > Officers Entry** page.*`,
      modelUsed: 'Veer AI',
      isLive: false
    };
  }

  if (query.includes('nda') || query.includes('10+2') || query.includes('12th') || query.includes('school')) {
    return {
      text: `### Joining the Indian Army After 10+2 / High School

1. **National Defence Academy (NDA, Khadakwasla, Pune):**
   - **Qualification:** 10+2 Pass in any stream for Army Wing; Physics & Maths required for Air Force/Navy.
   - **Age Bracket:** 16.5 to 19.5 Years (Men & Women eligible).
   - **Selection:** UPSC NDA Written Exam (Mathematics + General Ability) followed by 5-Day SSB Interview.
   - **Degree Awarded:** B.A. / B.Sc. / B.Tech from JNU during 3 years at NDA + 1 Year at IMA Dehradun.

2. **10+2 Technical Entry Scheme (TES):**
   - **Qualification:** 10+2 with PCM (min 60%) + valid JEE Mains score.
   - **Selection:** Direct SSB Interview.

3. **Agniveer Scheme (Soldier Enrolment):**
   - **Agniveer GD / Tech / Clerk:** 10th / 12th pass pathways for immediate combat and technical trades.`,
      modelUsed: 'Veer AI',
      isLive: false
    };
  }

  if (query.includes('physical') || query.includes('fitness') || query.includes('run') || query.includes('height')) {
    return {
      text: `### Indian Army Physical Fitness Standards (PFT)

During recruitment rallies and academy entrance, candidates are evaluated on the following physical benchmarks:

1. **1.6 KM (1600 Meters) Endurance Run:**
   - **Group I (60 Marks):** Within 5 minutes 30 seconds.
   - **Group II (48 Marks):** Between 5 minutes 31 seconds to 5 minutes 45 seconds.

2. **Beam (Pull-Ups on Bar):**
   - **10 Pull-ups:** 40 Marks (Maximum score).
   - **9 Pull-ups:** 33 Marks.
   - **6 Pull-ups:** 16 Marks (Minimum qualifying score).

3. **Obstacle Tests (Qualifying Standards):**
   - **9-Feet Ditch Jump:** Must clear cleanly in max 2 attempts.
   - **Zig-Zag Balance Beam:** Walk across narrow beam without falling.

*Tip: Train consistently with interval running, core exercises, and bodyweight pull-ups at least 8-12 weeks before your rally.*`,
      modelUsed: 'Veer AI',
      isLive: false
    };
  }

  if (query.includes('ssb') || query.includes('interview') || query.includes('selection')) {
    return {
      text: `### 5-Day SSB Interview Procedure

The Services Selection Board (SSB) interview is a comprehensive 5-day assessment:

**Day 1 - Screening:**
- Officer Intelligence Rating (OIR) test
- Picture Perception and Discussion Test (PP&DT)
- *Only screened-in candidates proceed to Day 2-5*

**Day 2 - Psychology Tests:**
- Thematic Apperception Test (TAT) - 12 pictures
- Word Association Test (WAT) - 60 words
- Situation Reaction Test (SRT) - 60 situations
- Self Description Test (SD)

**Day 3 & 4 - Group Testing Officer (GTO) Tasks:**
- Group Discussion, Group Planning Exercise
- Progressive Group Task, Half Group Task, Individual Obstacles
- Command Task, Final Group Task

**Day 5 - Conference:**
- Board conference with all assessors
- Results announced same day

*Tip: Be natural, show Officer-Like Qualities (OLQs), and demonstrate leadership potential.*`,
      modelUsed: 'Veer AI',
      isLive: false
    };
  }

  return {
    text: `### Jai Hind! Welcome to Veer AI

I can answer any question regarding Indian Army careers, including:
- **Officer Entries:** NDA, CDS, TGC, SSC Tech, NCC Special, JAG.
- **Agnipath Scheme:** Agniveer GD, Technical, Clerk/SKT, Tradesmen eligibility & pay.
- **Military Academies:** NDA Khadakwasla, IMA Dehradun, OTA Chennai.
- **Selection Procedure:** UPSC Exams, CEE computer tests, 5-Day SSB Interviews, Medical standards.
- **Physical Fitness Standards:** 1.6km running times, pull-ups, and obstacle benchmarks.

Please ask me a specific question and I'll provide detailed guidance!`,
    modelUsed: 'Veer AI',
    isLive: false
  };
};
