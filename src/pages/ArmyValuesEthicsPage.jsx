import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Award,
  CheckCircle2,
  Flag,
  HeartHandshake,
  Landmark,
  Medal,
  ScrollText,
  ShieldCheck,
  Sparkles,
  Target,
  Users
} from 'lucide-react';

const VALUES = [
  {
    code: 'NAAM',
    title: 'Carry the name',
    theme: 'saffron',
    icon: Award,
    text: 'The honour of the regiment, unit and institution is carried into every decision, every relationship and every action.',
    line: 'Honour the name you inherit. Strengthen the name you leave behind.'
  },
  {
    code: 'NAMAK',
    title: 'Keep faith with the trust',
    theme: 'gold',
    icon: ShieldCheck,
    text: 'Loyalty is lived through responsibility to comrades, the people and the nation whose trust a soldier carries.',
    line: 'Loyalty is not a word on the uniform. It is a promise kept under pressure.'
  },
  {
    code: 'NISHAN',
    title: 'Guard the colours',
    theme: 'green',
    icon: Flag,
    text: 'The flag and the insignia represent the ideals of India. They are protected through discipline, courage and example.',
    line: 'The colours are more than symbols. They are a standard to live up to.'
  }
];

const PRACTICES = [
  { number: '01', title: 'Duty before comfort', text: 'Choose the mission and the team when the easier choice is to step back.', icon: Target },
  { number: '02', title: 'Courage with judgement', text: 'Act decisively, while keeping discipline, law and the safety of others in view.', icon: ShieldCheck },
  { number: '03', title: 'Comradeship without exception', text: 'Stand beside the person next to you and build trust across every difference.', icon: Users },
  { number: '04', title: 'Integrity in the unseen moments', text: 'The standard matters even when there is no audience, applause or easy answer.', icon: HeartHandshake }
];

const ArmyValuesEthicsPage = () => (
  <main className="army-information-page values-ethics-page" id="main-content">
    <section className="army-info-hero values-ethics-hero">
      <div className="army-info-hero-image" style={{ backgroundImage: 'url(/assets/Hero2.png)' }} />
      <div className="army-info-hero-overlay" />
      <div className="container army-info-hero-content">
        <div className="army-info-breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <span>About Indian Army</span>
          <span>/</span>
          <strong>VALUES &amp; CODE OF ETHICS</strong>
        </div>

        <div className="army-info-hero-copy">
          <div className="army-info-eyebrow">
            <span className="army-info-eyebrow-line" />
            <span>VALUES &amp; CODE OF ETHICS</span>
          </div>
          <h1>Service before self. Always.</h1>
          <p>The code that turns a force into a brotherhood: duty before comfort, integrity before recognition and the nation before self.</p>
          <div className="army-info-hero-meta">
            <span><Sparkles size={15} /> Naam · Namak · Nishan</span>
            <span><CheckCircle2 size={15} /> Official Indian Army information portal</span>
          </div>
        </div>

        <div className="army-info-hero-stats">
          <div className="army-info-stat"><strong>01</strong><span>Service before self</span></div>
          <div className="army-info-stat"><strong>03</strong><span>Pillars of soldierly identity</span></div>
          <div className="army-info-stat"><strong>∞</strong><span>A commitment carried forward</span></div>
        </div>
      </div>
    </section>

    <section className="army-info-section values-ethos-section">
      <div className="container">
        <div className="army-info-section-heading">
          <div>
            <span className="army-info-kicker">THE SOLDIER’S COMPASS</span>
            <h2>A code lived, not merely written.</h2>
          </div>
          <p>Values make decisions clear when conditions are difficult. They shape how soldiers lead, serve, work with comrades and carry the trust of the nation.</p>
        </div>

        <div className="values-ethos-layout">
          <div className="values-ethos-seal">
            <div className="values-seal-ring ring-one" />
            <div className="values-seal-ring ring-two" />
            <div className="values-seal-content">
              <span>THE SOLDIER’S PROMISE</span>
              <strong>SERVICE<br />BEFORE<br />SELF</strong>
              <div className="values-seal-rule" />
              <small>NAAM · NAMAK · NISHAN</small>
            </div>
          </div>

          <div className="values-pillar-grid">
            {VALUES.map((value) => {
              const Icon = value.icon;
              return (
                <article className={`values-pillar-card ${value.theme}`} key={value.code}>
                  <div className="values-pillar-top"><span>{value.code}</span><Icon size={21} /></div>
                  <h3>{value.title}</h3>
                  <p>{value.text}</p>
                  <div className="values-pillar-line">{value.line}</div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>

    <section className="army-info-section army-info-tint-section values-practice-section">
      <div className="container">
        <div className="army-info-section-heading">
          <div>
            <span className="army-info-kicker">ETHICS IN ACTION</span>
            <h2>Trust is earned in the details.</h2>
          </div>
          <p>Professional conduct is built through everyday choices: fairness in leadership, care for comrades, respect for the law and the courage to do what is right.</p>
        </div>

        <div className="values-practice-list">
          {PRACTICES.map((practice) => {
            const Icon = practice.icon;
            return (
              <article className="values-practice-row" key={practice.number}>
                <span className="values-practice-number">{practice.number}</span>
                <div className="values-practice-icon"><Icon size={20} /></div>
                <div className="values-practice-copy"><h3>{practice.title}</h3><p>{practice.text}</p></div>
                <CheckCircle2 className="values-practice-check" size={18} />
              </article>
            );
          })}
        </div>
      </div>
    </section>

    <section className="army-info-section army-info-dark-section values-promise-section">
      <div className="container">
        <div className="values-promise-layout">
          <div className="values-promise-mark"><Medal size={28} /></div>
          <div>
            <span className="army-info-kicker">THE STANDARD</span>
            <h2>Character is the first qualification for service.</h2>
            <p>The uniform gives a soldier authority. The code gives that authority its direction. Together, they create the trust between the Army and the nation.</p>
          </div>
        </div>

        <div className="values-promise-strip">
          <div><Landmark size={17} /><span>Lead by example</span></div>
          <div><ScrollText size={17} /><span>Protect dignity</span></div>
          <div><Flag size={17} /><span>Keep the promise</span></div>
          <div><Award size={17} /><span>Leave a standard</span></div>
        </div>
      </div>
    </section>

    <section className="army-info-section values-close-section">
      <div className="container values-close-layout">
        <div><span className="army-info-kicker">CARRY THE LEGACY FORWARD</span><h2>The next generation inherits more than a uniform.</h2></div>
        <div><p>It inherits a way of serving: with humility, courage, discipline and an unshakeable sense of responsibility.</p><Link className="values-close-link" to="/opportunities">Explore Army opportunities <ArrowRight size={16} /></Link></div>
      </div>
    </section>

    <style>{`
      .values-ethics-page { background: var(--bg-app); color: var(--text-primary); font-family: var(--font-body); }
      .values-ethics-page h1, .values-ethics-page h2, .values-ethics-page h3, .values-ethics-page strong { font-family: var(--font-display); }
      .values-ethics-page .army-info-hero { min-height: 590px; position: relative; display: flex; align-items: stretch; overflow: hidden; background: var(--army-darkest); }
      .values-ethics-page .army-info-hero-image, .values-ethics-page .army-info-hero-overlay { position: absolute; inset: 0; }
      .values-ethics-page .army-info-hero-image { background-position: center; background-size: cover; filter: saturate(0.82) brightness(0.8); transform: scale(1.02); }
      .values-ethics-page .army-info-hero-overlay { background: linear-gradient(90deg, rgba(8, 20, 12, 0.94) 0%, rgba(8, 20, 12, 0.78) 35%, rgba(8, 20, 12, 0.28) 70%, rgba(8, 20, 12, 0.52) 100%), linear-gradient(180deg, rgba(8, 20, 12, 0.18), rgba(8, 20, 12, 0.82)); }
      .values-ethics-page .army-info-hero-content { position: relative; z-index: 1; display: flex; width: 100%; min-height: 590px; padding-top: 28px; padding-bottom: 44px; flex-direction: column; justify-content: space-between; }
      .values-ethics-page .army-info-breadcrumb { display: flex; flex-wrap: wrap; align-items: center; gap: 9px; color: rgba(255, 255, 255, 0.68); font-size: 0.72rem; font-weight: 600; }
      .values-ethics-page .army-info-breadcrumb a:hover { color: #ffffff; }
      .values-ethics-page .army-info-breadcrumb strong { color: #f5c968; font-weight: 800; }
      .values-ethics-page .army-info-hero-copy { max-width: 760px; margin-top: 64px; }
      .values-ethics-page .army-info-eyebrow, .values-ethics-page .army-info-hero-meta, .values-ethics-page .army-info-hero-meta span { display: flex; align-items: center; }
      .values-ethics-page .army-info-eyebrow { gap: 10px; color: #f2c35e; font-size: 0.75rem; font-weight: 900; letter-spacing: 0.16em; }
      .values-ethics-page .army-info-eyebrow-line { width: 34px; height: 3px; border-radius: 4px; background: linear-gradient(90deg, #ff9933, #ffffff, #138808); }
      .values-ethics-page .army-info-hero h1 { max-width: 760px; margin: 16px 0 15px; color: #ffffff; font-size: clamp(2.4rem, 5vw, 4.7rem); font-weight: 900; line-height: 1.03; letter-spacing: -0.05em; }
      .values-ethics-page .army-info-hero-copy > p { max-width: 650px; color: rgba(255, 255, 255, 0.82); font-size: 1.05rem; line-height: 1.65; }
      .values-ethics-page .army-info-hero-meta { flex-wrap: wrap; gap: 18px; margin-top: 22px; color: rgba(255, 255, 255, 0.7); font-size: 0.78rem; font-weight: 600; }
      .values-ethics-page .army-info-hero-meta span { gap: 7px; }
      .values-ethics-page .army-info-hero-meta svg { color: #f5c968; }
      .values-ethics-page .army-info-hero-stats { display: grid; grid-template-columns: repeat(3, 1fr); max-width: 720px; border-top: 1px solid rgba(255, 255, 255, 0.22); }
      .values-ethics-page .army-info-stat { padding: 17px 22px 0 0; border-right: 1px solid rgba(255, 255, 255, 0.18); }
      .values-ethics-page .army-info-stat:not(:first-child) { padding-left: 22px; }
      .values-ethics-page .army-info-stat:last-child { border-right: 0; }
      .values-ethics-page .army-info-stat strong { display: block; color: #ffffff; font-family: var(--font-display); font-size: 1.8rem; font-weight: 900; line-height: 1; }
      .values-ethics-page .army-info-stat span { display: block; max-width: 140px; margin-top: 7px; color: rgba(255, 255, 255, 0.62); font-size: 0.72rem; line-height: 1.35; }
      .values-ethics-page .army-info-section { padding: 92px 0; background: var(--bg-surface); }
      .values-ethics-page .army-info-tint-section { background: var(--bg-app); }
      .values-ethics-page .army-info-dark-section { color: #ffffff; background: var(--bg-dark-section); }
      .values-ethics-page .army-info-section-heading { display: flex; align-items: flex-end; justify-content: space-between; gap: 40px; margin-bottom: 42px; }
      .values-ethics-page .army-info-section-heading > div { max-width: 650px; }
      .values-ethics-page .army-info-section-heading > p { max-width: 480px; color: var(--text-secondary); font-size: 1rem; line-height: 1.7; }
      .values-ethics-page .army-info-kicker { display: block; margin-bottom: 10px; color: var(--gold-dark); font-family: var(--font-display); font-size: 0.75rem; font-weight: 900; letter-spacing: 0.15em; }
      .values-ethics-page .army-info-section h2 { color: var(--text-primary); font-size: clamp(1.8rem, 3vw, 2.65rem); font-weight: 900; line-height: 1.08; letter-spacing: -0.04em; }
      .values-ethics-page .army-info-dark-section h2 { color: #ffffff; }
      .values-ethics-page .army-info-dark-section .army-info-kicker { color: var(--gold-light); }

      .values-ethos-layout { display: grid; grid-template-columns: minmax(300px, 0.72fr) minmax(0, 1.28fr); gap: 24px; align-items: stretch; }
      .values-ethos-seal { position: relative; display: grid; min-height: 470px; place-items: center; overflow: hidden; border: 1px solid var(--border-dark); border-radius: var(--radius-xl); color: #ffffff; background: radial-gradient(circle at 50% 44%, rgba(67, 129, 87, 0.38), transparent 43%), linear-gradient(145deg, #102318, #192f21); box-shadow: var(--shadow-xl); }
      .values-ethos-seal::before { content: ''; position: absolute; inset: 25px; border: 1px solid rgba(229, 190, 89, 0.18); border-radius: 50%; }
      .values-seal-ring { position: absolute; left: 50%; top: 50%; border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 50%; transform: translate(-50%, -50%); }
      .values-seal-ring.ring-one { width: 68%; aspect-ratio: 1; }
      .values-seal-ring.ring-two { width: 82%; aspect-ratio: 1; border-color: rgba(229, 190, 89, 0.16); }
      .values-seal-content { position: relative; z-index: 1; display: flex; align-items: center; flex-direction: column; text-align: center; }
      .values-seal-content > span { color: var(--gold-light); font-size: 0.65rem; font-weight: 900; letter-spacing: 0.16em; }
      .values-seal-content > strong { margin-top: 27px; color: #ffffff; font-family: var(--font-display); font-size: clamp(2.25rem, 5vw, 4.25rem); font-weight: 900; line-height: 0.92; letter-spacing: -0.08em; }
      .values-seal-rule { width: 54px; height: 4px; margin: 28px 0 18px; border-radius: 4px; background: linear-gradient(90deg, #ff9933, #ffffff, #138808); }
      .values-seal-content small { color: rgba(255, 255, 255, 0.62); font-family: var(--font-mono); font-size: 0.64rem; letter-spacing: 0.12em; }
      .values-pillar-grid { display: grid; grid-template-rows: repeat(3, 1fr); gap: 14px; }
      .values-pillar-card { position: relative; display: flex; min-height: 147px; padding: 23px 25px; flex-direction: column; border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); background: var(--bg-surface); box-shadow: var(--shadow-sm); overflow: hidden; transition: transform var(--transition-normal), box-shadow var(--transition-normal), border-color var(--transition-normal); }
      .values-pillar-card::after { content: ''; position: absolute; right: -35px; bottom: -50px; width: 155px; height: 155px; border: 1px solid var(--border-subtle); border-radius: 50%; opacity: 0.6; }
      .values-pillar-card:hover { border-color: var(--gold-primary); box-shadow: var(--shadow-lg); transform: translateX(4px); }
      .values-pillar-top { display: flex; align-items: center; justify-content: space-between; color: var(--gold-dark); }
      .values-pillar-top > span { font-family: var(--font-mono); font-size: 0.63rem; font-weight: 800; letter-spacing: 0.16em; }
      .values-pillar-top svg { color: var(--army-primary); }
      .values-pillar-card.saffron .values-pillar-top { color: #b45309; }
      .values-pillar-card.saffron .values-pillar-top svg { color: #b45309; }
      .values-pillar-card.gold .values-pillar-top { color: var(--gold-dark); }
      .values-pillar-card.green .values-pillar-top { color: #15803d; }
      .values-pillar-card.green .values-pillar-top svg { color: #15803d; }
      .values-pillar-card h3 { margin-top: 12px; color: var(--text-primary); font-size: 1.15rem; }
      .values-pillar-card p { max-width: 620px; margin-top: 7px; color: var(--text-secondary); font-size: 0.86rem; line-height: 1.58; }
      .values-pillar-line { position: absolute; right: 23px; bottom: 18px; max-width: 210px; color: var(--text-muted); font-size: 0.68rem; font-style: italic; text-align: right; }

      .values-practice-list { max-width: 1020px; margin: 0 auto; border-top: 1px solid var(--border-subtle); }
      .values-practice-row { display: grid; grid-template-columns: 40px 42px 1fr 20px; align-items: center; gap: 17px; padding: 21px 0; border-bottom: 1px solid var(--border-subtle); }
      .values-practice-number { color: var(--gold-dark); font-family: var(--font-mono); font-size: 0.72rem; font-weight: 800; }
      .values-practice-icon { width: 40px; height: 40px; display: grid; place-items: center; border-radius: 12px; color: var(--army-primary); background: var(--army-tint); }
      .values-practice-copy h3 { color: var(--text-primary); font-size: 1.08rem; }
      .values-practice-copy p { margin-top: 4px; color: var(--text-secondary); font-size: 0.87rem; line-height: 1.55; }
      .values-practice-check { color: #16a34a; }

      .values-promise-layout { display: grid; grid-template-columns: 62px 1fr; align-items: center; gap: 22px; max-width: 980px; margin: 0 auto; }
      .values-promise-mark { width: 62px; height: 62px; display: grid; place-items: center; border: 1px solid rgba(229, 190, 89, 0.35); border-radius: 17px; color: var(--gold-light); background: rgba(197, 155, 39, 0.1); }
      .values-promise-layout h2 { max-width: 720px; }
      .values-promise-layout p { max-width: 710px; margin-top: 17px; color: #cbd5e1; font-size: 1rem; line-height: 1.75; }
      .values-promise-strip { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; max-width: 980px; margin: 45px auto 0; padding-top: 24px; border-top: 1px solid rgba(255, 255, 255, 0.12); }
      .values-promise-strip > div { display: flex; align-items: center; gap: 9px; color: #dce7df; font-size: 0.8rem; font-weight: 700; }
      .values-promise-strip svg { color: var(--gold-light); }
      .values-close-layout { display: grid; grid-template-columns: 1fr 1fr; align-items: center; gap: 80px; }
      .values-close-layout h2 { max-width: 620px; }
      .values-close-layout p { color: var(--text-secondary); font-size: 1.02rem; line-height: 1.75; }
      .values-close-link { display: inline-flex; align-items: center; gap: 8px; margin-top: 20px; color: var(--army-primary); font-size: 0.86rem; font-weight: 800; }
      .values-close-link:hover { color: var(--gold-dark); }

      [data-theme='dark'] .values-ethics-page .army-info-section { background: var(--bg-surface); }
      [data-theme='dark'] .values-ethics-page .army-info-tint-section { background: var(--bg-app); }
      [data-theme='dark'] .values-pillar-card { background: var(--bg-surface-elevated); }
      [data-theme='dark'] .values-pillar-top svg, [data-theme='dark'] .values-practice-icon { color: var(--gold-light); }
      [data-theme='dark'] .values-practice-icon { background: rgba(197, 155, 39, 0.13); }
      [data-theme='dark'] .values-practice-number { color: var(--gold-light); }

      @media (max-width: 900px) {
        .values-ethos-layout { grid-template-columns: 1fr; }
        .values-ethos-seal { min-height: 360px; }
        .values-pillar-grid { grid-template-rows: none; grid-template-columns: repeat(3, 1fr); }
        .values-pillar-card { min-height: 255px; }
        .values-pillar-line { position: static; margin-top: auto; padding-top: 15px; text-align: left; }
        .values-close-layout { gap: 35px; }
      }

      @media (max-width: 760px) {
        .values-ethics-page .army-info-hero, .values-ethics-page .army-info-hero-content { min-height: 670px; }
        .values-ethics-page .army-info-hero-copy { margin-top: 42px; }
        .values-ethics-page .army-info-hero h1 { font-size: 2.65rem; }
        .values-ethics-page .army-info-hero-stats { grid-template-columns: repeat(3, 1fr); }
        .values-ethics-page .army-info-stat { padding-right: 10px; }
        .values-ethics-page .army-info-stat:not(:first-child) { padding-left: 10px; }
        .values-ethics-page .army-info-stat strong { font-size: 1.45rem; }
        .values-ethics-page .army-info-section { padding: 62px 0; }
        .values-ethics-page .army-info-section-heading, .values-close-layout { display: block; }
        .values-ethics-page .army-info-section-heading > p, .values-close-layout > div + div { margin-top: 18px; }
        .values-pillar-grid { grid-template-columns: 1fr; }
        .values-pillar-card { min-height: 0; }
        .values-promise-layout { grid-template-columns: 1fr; }
        .values-promise-strip { grid-template-columns: repeat(2, 1fr); margin-top: 32px; }
      }

      @media (max-width: 520px) {
        .values-ethics-page .army-info-hero-meta { display: none; }
        .values-ethics-page .army-info-stat span { font-size: 0.63rem; }
        .values-practice-row { grid-template-columns: 28px 38px 1fr 18px; gap: 10px; }
        .values-practice-copy h3 { font-size: 0.84rem; }
        .values-practice-copy p { font-size: 0.7rem; }
        .values-promise-strip { grid-template-columns: 1fr; }
        .values-seal-content > strong { font-size: 2.75rem; }
      }
    `}</style>
  </main>
);

export default ArmyValuesEthicsPage;
