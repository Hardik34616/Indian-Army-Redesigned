import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import indiaMapSvg from '../../in.svg?raw';
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Compass,
  Crosshair,
  Flag,
  Landmark,
  Map,
  Mountain,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  Wrench
} from 'lucide-react';

const COMMANDS = [
  {
    id: 'northern',
    code: 'NC',
    number: '01',
    name: 'Northern Command',
    location: 'Udhampur',
    theatre: 'High-altitude frontier',
    focus: 'Mountain warfare, glacier operations and round-the-clock readiness across the northern frontier.',
    mission: 'Hold the heights. Guard the passes.',
    readiness: 'Altitude · surveillance · resilience',
    coordination: 'Forward formations and specialist high-altitude capabilities',
    icon: Mountain,
    position: { x: '29.03%', y: '18.42%' }
  },
  {
    id: 'eastern',
    code: 'EC',
    number: '02',
    name: 'Eastern Command',
    location: 'Kolkata',
    theatre: 'Eastern Himalayas and the Northeast',
    focus: 'Mountain operations and a complex eastern theatre where terrain, weather and distance demand constant preparedness.',
    mission: 'See deeper. Move sure-footed.',
    readiness: 'Mountains · mobility · integration',
    coordination: 'Mountain formations and frontier support networks',
    icon: Compass,
    position: { x: '65.24%', y: '50.53%' }
  },
  {
    id: 'western',
    code: 'WC',
    number: '03',
    name: 'Western Command',
    location: 'Chandimandir',
    theatre: 'Western theatre',
    focus: 'Operational depth and battlefield preparedness across a theatre shaped by decisive land operations.',
    mission: 'Stay ready at the decisive edge.',
    readiness: 'Armour · infantry · firepower',
    coordination: 'Combined-arms formations and rapid mobilisation',
    icon: ShieldCheck,
    position: { x: '33.71%', y: '25.57%' }
  },
  {
    id: 'south-western',
    code: 'SWC',
    number: '04',
    name: 'South Western Command',
    location: 'Jaipur',
    theatre: 'Desert and western sector',
    focus: 'Desert operations, mobility and combat readiness across the wide western approaches.',
    mission: 'Own the distance. Master the desert.',
    readiness: 'Mobility · armour · endurance',
    coordination: 'Mechanised and armoured formations',
    icon: Crosshair,
    position: { x: '30.80%', y: '37.44%' }
  },
  {
    id: 'central',
    code: 'CC',
    number: '05',
    name: 'Central Command',
    location: 'Lucknow',
    theatre: 'Central theatre and mobilisation',
    focus: 'Training, mobilisation and strategic support that connect the Army’s operational rhythm across the country.',
    mission: 'Connect the force. Sustain the tempo.',
    readiness: 'Depth · movement · coordination',
    coordination: 'Operational reserves and support formations',
    icon: Target,
    position: { x: '44.93%', y: '37.64%' }
  },
  {
    id: 'southern',
    code: 'SC',
    number: '06',
    name: 'Southern Command',
    location: 'Pune',
    theatre: 'Peninsular and strategic depth',
    focus: 'Strategic depth, training and coordination across the country’s southern arc and island approaches.',
    mission: 'Build depth. Keep the nation connected.',
    readiness: 'Reach · sustainment · training',
    coordination: 'Training establishments and strategic support',
    icon: Map,
    position: { x: '25.51%', y: '62.38%' }
  },
  {
    id: 'training',
    code: 'ARTRAC',
    number: '07',
    name: 'Army Training Command',
    location: 'Shimla',
    theatre: 'Doctrine and professional development',
    focus: 'The Army’s learning engine: doctrine, training standards and the professional development of its people.',
    mission: 'Learn faster. Prepare smarter.',
    readiness: 'Doctrine · education · innovation',
    coordination: 'Training establishments and future-force thinking',
    icon: BookOpen,
    position: { x: '34.60%', y: '24.31%' }
  }
];

const ARCHITECTURE = [
  { number: '01', title: 'Army Headquarters', text: 'Direction, policy and institutional leadership', icon: Landmark },
  { number: '02', title: 'Command', text: 'Theatre-level readiness and coordination', icon: Compass },
  { number: '03', title: 'Corps', text: 'Large formations built for sustained operations', icon: ShieldCheck },
  { number: '04', title: 'Division', text: 'Mission-ready combined-arms formations', icon: Target },
  { number: '05', title: 'Brigade to Battalion', text: 'The formations that turn intent into action', icon: Flag }
];

const CORPS_GROUPS = [
  {
    title: 'Combat arms',
    tag: 'DECISIVE ACTION',
    text: 'The formations that close with the problem and create decisive effect on the battlefield.',
    items: ['Infantry', 'Armoured Corps', 'Mechanised Infantry'],
    icon: Crosshair,
    tone: 'saffron'
  },
  {
    title: 'Firepower and aviation',
    tag: 'REACH AND PRECISION',
    text: 'Capabilities that extend the Army’s reach, awareness and ability to shape the battlespace.',
    items: ['Regiment of Artillery', 'Army Aviation Corps', 'Army Air Defence'],
    icon: Target,
    tone: 'gold'
  },
  {
    title: 'Combat support',
    tag: 'MOBILITY AND SIGNAL',
    text: 'Technical arms that enable movement, communication, intelligence and battlefield engineering.',
    items: ['Corps of Engineers', 'Corps of Signals', 'Military Intelligence'],
    icon: Compass,
    tone: 'green'
  },
  {
    title: 'Services and sustainment',
    tag: 'STRENGTH IN DEPTH',
    text: 'The people and systems that keep every formation equipped, healthy, supplied and resilient.',
    items: ['Army Service Corps', 'Army Ordnance Corps', 'Army Medical Corps', 'EME Corps'],
    icon: Wrench,
    tone: 'navy'
  }
];

const ArmyCommandStructurePage = () => {
  const [activeCommandId, setActiveCommandId] = useState('northern');
  const activeCommand = COMMANDS.find((command) => command.id === activeCommandId) || COMMANDS[0];
  const ActiveIcon = activeCommand.icon;

  return (
    <main className="army-information-page command-structure-page" id="main-content">
      <section className="army-info-hero command-structure-hero">
        <div className="army-info-hero-image" style={{ backgroundImage: 'url(/assets/hero-army-visible.png)' }} />
        <div className="army-info-hero-overlay" />
        <div className="container army-info-hero-content">
          <div className="army-info-breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <span>About Indian Army</span>
            <span>/</span>
            <strong>COMMAND &amp; CORPS STRUCTURE</strong>
          </div>

          <div className="army-info-hero-copy">
            <div className="army-info-eyebrow">
              <span className="army-info-eyebrow-line" />
              <span>COMMAND &amp; CORPS STRUCTURE</span>
            </div>
            <h1>One Army. Seven commands. One purpose.</h1>
            <p>Across mountains, deserts, plains and peninsular India, the Army’s command structure turns one national mission into coordinated readiness.</p>
            <div className="army-info-hero-meta">
              <span><Sparkles size={15} /> Seven command perspectives</span>
              <span><CheckCircle2 size={15} /> Official Indian Army information portal</span>
            </div>
          </div>

          <div className="army-info-hero-stats">
            <div className="army-info-stat"><strong>07</strong><span>Operational and training commands</span></div>
            <div className="army-info-stat"><strong>14</strong><span>Army corps across theatres</span></div>
            <div className="army-info-stat"><strong>24×7</strong><span>Readiness and coordination</span></div>
          </div>
        </div>
      </section>

      <section className="army-info-section command-observatory-section">
        <div className="container">
          <div className="army-info-section-heading">
            <div>
              <span className="army-info-kicker">THE OPERATIONAL MAP</span>
              <h2>Seven commands, one connected force.</h2>
            </div>
            <p>Each command brings together formations and specialist capabilities for its theatre. Select a command to see the role it plays in the Army’s wider rhythm.</p>
          </div>

          <div className="command-observatory">
            <div className="command-map-panel">
              <div className="command-network-heading">
                <span>COMMANDS ACROSS INDIA</span>
                <small>Select a headquarters</small>
              </div>
              <div className="command-map-stage">
                <div className="command-map-canvas">
                  <div className="provided-india-map" role="img" aria-label="Map of India showing command headquarters locations" dangerouslySetInnerHTML={{ __html: indiaMapSvg }} />
                  <div className="command-map-vignette" />
                  {COMMANDS.map((command) => {
                    return (
                      <button
                        type="button"
                        key={command.id}
                        className={`command-map-marker command-marker-${command.id} ${command.id === activeCommandId ? 'active' : ''}`}
                        style={{ '--marker-x': command.position.x, '--marker-y': command.position.y }}
                        onClick={() => setActiveCommandId(command.id)}
                        aria-label={`Show ${command.name} at ${command.location}`}
                      >
                        <span className="command-marker-dot" />
                        <span className="command-marker-label"><strong>{command.name}</strong><small>{command.location}</small></span>
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="command-map-footer">
                <span><i className="map-footer-dot" /> Command headquarters</span>
                <span>Stylized vector map · Select a location to explore</span>
              </div>
            </div>

            <article className="command-spotlight">
              <div className="command-spotlight-top">
                <div className="command-spotlight-mark"><ActiveIcon size={25} /></div>
                <div>
                  <span className="army-info-kicker">{activeCommand.number} / 07 · {activeCommand.location}</span>
                  <h3>{activeCommand.name}</h3>
                </div>
              </div>
              <div className="command-rule" />
              <strong className="command-mission">{activeCommand.mission}</strong>
              <p>{activeCommand.focus}</p>
              <div className="command-detail-list">
                <div><span>THEATRE</span><strong>{activeCommand.theatre}</strong></div>
                <div><span>READINESS</span><strong>{activeCommand.readiness}</strong></div>
                <div><span>COORDINATION</span><strong>{activeCommand.coordination}</strong></div>
              </div>
              <Link className="army-info-text-link" to="/opportunities">Explore a life of service <ArrowRight size={16} /></Link>
            </article>
          </div>
        </div>
      </section>

      <section className="army-info-section army-info-dark-section command-architecture-section">
        <div className="container">
          <div className="army-info-section-heading">
            <div>
              <span className="army-info-kicker">THE CHAIN OF READINESS</span>
              <h2>Every level has a role. Every role connects.</h2>
            </div>
            <p>Command gives the Army a clear architecture: leadership sets intent, formations create momentum and units deliver with discipline.</p>
          </div>

          <div className="command-architecture-flow">
            {ARCHITECTURE.map((level, index) => {
              const Icon = level.icon;
              return (
                <React.Fragment key={level.number}>
                  <div className="architecture-level">
                    <span>{level.number}</span>
                    <Icon size={21} />
                    <h3>{level.title}</h3>
                    <p>{level.text}</p>
                  </div>
                  {index < ARCHITECTURE.length - 1 && <ArrowRight className="architecture-arrow" size={19} />}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </section>

      <section className="army-info-section army-info-tint-section command-corps-section">
        <div className="container">
          <div className="army-info-section-heading">
            <div>
              <span className="army-info-kicker">CORPS &amp; SPECIALIST ARMS</span>
              <h2>Capability in every direction.</h2>
            </div>
            <p>Operational power is a combined-arms story: combat formations, technical arms and services working together as one system.</p>
          </div>

          <div className="command-capability-grid">
            {CORPS_GROUPS.map((group) => {
              const Icon = group.icon;
              return (
                <article className={`command-capability-card ${group.tone}`} key={group.title}>
                  <div className="capability-card-icon"><Icon size={22} /></div>
                  <span className="capability-card-tag">{group.tag}</span>
                  <h3>{group.title}</h3>
                  <p>{group.text}</p>
                  <div className="capability-items">
                    {group.items.map((item) => <span key={item}><CheckCircle2 size={14} /> {item}</span>)}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="army-info-section army-info-dark-section">
        <div className="container army-info-callout">
          <div className="army-info-callout-mark"><Users size={28} /></div>
          <div><span className="army-info-kicker">A SYSTEM BUILT FOR READINESS</span><h2>Every formation has a role. Every soldier has a responsibility.</h2></div>
          <Link className="army-info-primary-link" to="/opportunities">Find your entry route <ArrowRight size={17} /></Link>
        </div>
      </section>

      <style>{`
      .command-structure-page { background: var(--bg-app); color: var(--text-primary); font-family: var(--font-body); }
      .command-structure-page h1, .command-structure-page h2, .command-structure-page h3, .command-structure-page strong { font-family: var(--font-display); }
      .command-structure-page .army-info-hero { min-height: 590px; position: relative; display: flex; align-items: stretch; overflow: hidden; background: var(--army-darkest); }
      .command-structure-page .army-info-hero-image, .command-structure-page .army-info-hero-overlay { position: absolute; inset: 0; }
      .command-structure-page .army-info-hero-image { background-position: center; background-size: cover; filter: saturate(0.82) brightness(0.8); transform: scale(1.02); }
      .command-structure-page .army-info-hero-overlay { background: linear-gradient(90deg, rgba(8, 20, 12, 0.94) 0%, rgba(8, 20, 12, 0.78) 35%, rgba(8, 20, 12, 0.28) 70%, rgba(8, 20, 12, 0.52) 100%), linear-gradient(180deg, rgba(8, 20, 12, 0.18), rgba(8, 20, 12, 0.82)); }
      .command-structure-page .army-info-hero-content { position: relative; z-index: 1; display: flex; width: 100%; min-height: 590px; padding-top: 28px; padding-bottom: 44px; flex-direction: column; justify-content: space-between; }
      .command-structure-page .army-info-breadcrumb { display: flex; flex-wrap: wrap; align-items: center; gap: 9px; color: rgba(255, 255, 255, 0.68); font-size: 0.72rem; font-weight: 600; }
      .command-structure-page .army-info-breadcrumb a:hover { color: #ffffff; }
      .command-structure-page .army-info-breadcrumb strong { color: #f5c968; font-weight: 800; }
      .command-structure-page .army-info-hero-copy { max-width: 760px; margin-top: 64px; }
      .command-structure-page .army-info-eyebrow, .command-structure-page .army-info-hero-meta, .command-structure-page .army-info-hero-meta span { display: flex; align-items: center; }
      .command-structure-page .army-info-eyebrow { gap: 10px; color: #f2c35e; font-size: 0.75rem; font-weight: 900; letter-spacing: 0.16em; }
      .command-structure-page .army-info-eyebrow-line { width: 34px; height: 3px; border-radius: 4px; background: linear-gradient(90deg, #ff9933, #ffffff, #138808); }
      .command-structure-page .army-info-hero h1 { max-width: 760px; margin: 16px 0 15px; color: #ffffff; font-size: clamp(2.4rem, 5vw, 4.7rem); font-weight: 900; line-height: 1.03; letter-spacing: -0.05em; }
      .command-structure-page .army-info-hero-copy > p { max-width: 650px; color: rgba(255, 255, 255, 0.82); font-size: 1.05rem; line-height: 1.65; }
      .command-structure-page .army-info-hero-meta { flex-wrap: wrap; gap: 18px; margin-top: 22px; color: rgba(255, 255, 255, 0.7); font-size: 0.78rem; font-weight: 600; }
      .command-structure-page .army-info-hero-meta span { gap: 7px; }
      .command-structure-page .army-info-hero-meta svg { color: #f5c968; }
      .command-structure-page .army-info-hero-stats { display: grid; grid-template-columns: repeat(3, 1fr); max-width: 720px; border-top: 1px solid rgba(255, 255, 255, 0.22); }
      .command-structure-page .army-info-stat { padding: 17px 22px 0 0; border-right: 1px solid rgba(255, 255, 255, 0.18); }
      .command-structure-page .army-info-stat:not(:first-child) { padding-left: 22px; }
      .command-structure-page .army-info-stat:last-child { border-right: 0; }
      .command-structure-page .army-info-stat strong { display: block; color: #ffffff; font-family: var(--font-display); font-size: 1.8rem; font-weight: 900; line-height: 1; }
      .command-structure-page .army-info-stat span { display: block; max-width: 140px; margin-top: 7px; color: rgba(255, 255, 255, 0.62); font-size: 0.72rem; line-height: 1.35; }
      .command-structure-page .army-info-section { padding: 92px 0; background: var(--bg-surface); }
        .command-structure-page .army-info-tint-section { background: var(--bg-app); }
        .command-structure-page .army-info-dark-section { color: #ffffff; background: var(--bg-dark-section); }
        .command-structure-page .army-info-section-heading { display: flex; align-items: flex-end; justify-content: space-between; gap: 40px; margin-bottom: 42px; }
        .command-structure-page .army-info-section-heading > div { max-width: 650px; }
        .command-structure-page .army-info-section-heading > p { max-width: 480px; color: var(--text-secondary); font-size: 1rem; line-height: 1.7; }
        .command-structure-page .army-info-dark-section .army-info-section-heading > p { color: #cbd5e1; }
        .command-structure-page .army-info-kicker { display: block; margin-bottom: 10px; color: var(--gold-dark); font-family: var(--font-display); font-size: 0.75rem; font-weight: 900; letter-spacing: 0.15em; }
        [data-theme='dark'] .command-structure-page .army-info-kicker { color: var(--gold-light); }
        .command-structure-page .army-info-section h2 { color: var(--text-primary); font-size: clamp(1.8rem, 3vw, 2.65rem); font-weight: 900; line-height: 1.08; letter-spacing: -0.04em; }
        .command-structure-page .army-info-dark-section h2 { color: #ffffff; }

        .command-observatory { display: grid; grid-template-columns: 1fr; gap: 22px; align-items: stretch; }
        .command-map-panel { --map-bg: #f0f5f1; --map-land-light: #cfe2d3; --map-land-deep: #91b99d; --map-outline: #2d6040; --map-route: rgba(31, 73, 48, 0.28); --map-grid: rgba(31, 73, 48, 0.11); --map-label-bg: rgba(255, 255, 255, 0.86); --map-label-text: #173020; min-height: 720px; padding: 26px; overflow: hidden; border: 1px solid var(--border-subtle); border-radius: var(--radius-xl); color: var(--map-label-text); background: radial-gradient(circle at 50% 44%, rgba(255, 255, 255, 0.96), transparent 56%), var(--map-bg); box-shadow: var(--shadow-xl); }
        .command-network-heading { display: flex; align-items: center; justify-content: space-between; gap: 18px; position: relative; z-index: 2; color: var(--gold-dark); font-size: 0.72rem; font-weight: 900; letter-spacing: 0.14em; }
        .command-network-heading small { color: var(--text-muted); font-size: 0.69rem; font-weight: 600; letter-spacing: 0; }
        .command-map-stage { position: relative; min-height: 625px; display: flex; align-items: center; justify-content: center; margin-top: 4px; overflow: hidden; }
        .command-map-stage::before, .command-map-stage::after { content: ''; position: absolute; left: 50%; top: 50%; pointer-events: none; border: 1px solid var(--map-grid); border-radius: 50%; transform: translate(-50%, -50%); }
        .command-map-stage::before { width: 68%; aspect-ratio: 1; }
        .command-map-stage::after { width: 83%; aspect-ratio: 1; border-style: dashed; opacity: 0.55; }
        .command-map-canvas { position: relative; z-index: 1; width: min(68%, 620px); aspect-ratio: 1; }
        .provided-india-map { position: absolute; inset: 0; width: 100%; height: 100%; filter: drop-shadow(14px 18px 0 rgba(26, 61, 39, 0.13)); }
        .provided-india-map svg { display: block; width: 100%; height: 100%; overflow: visible; }
        .provided-india-map svg path { fill: var(--map-land-deep) !important; stroke: var(--map-outline) !important; stroke-width: 1.5px !important; vector-effect: non-scaling-stroke; }
        .provided-india-map svg #points, .provided-india-map svg #label_points { display: none; }
        .command-map-vignette { position: absolute; inset: 0; z-index: 2; pointer-events: none; background: radial-gradient(ellipse at center, transparent 50%, color-mix(in srgb, var(--map-bg) 12%, transparent) 80%, var(--map-bg) 100%); }
        .command-map-marker { position: absolute; z-index: 3; left: var(--marker-x); top: var(--marker-y); width: 17px; height: 17px; padding: 0; border: 0; color: var(--map-label-text); background: transparent; transform: translate(-50%, -50%); }
        .command-marker-dot { display: block; width: 15px; height: 15px; border: 3px solid var(--map-bg); border-radius: 50%; background: var(--army-primary); box-shadow: 0 0 0 2px var(--army-primary); }
        .command-map-marker.active .command-marker-dot { border-color: var(--map-bg); background: var(--gold-primary); box-shadow: 0 0 0 2px var(--gold-primary); }
        .command-marker-label { position: absolute; left: 25px; top: 50%; display: flex; min-width: 0; padding: 5px 8px; flex-direction: column; align-items: flex-start; border-left: 2px solid var(--army-primary); text-align: left; white-space: nowrap; background: var(--map-label-bg); transform: translateY(-50%); }
        .command-marker-label strong { font-size: 0.68rem; line-height: 1.15; white-space: nowrap; }
        .command-marker-label small { margin-top: 3px; color: var(--text-muted); font-size: 0.59rem; white-space: nowrap; }
        .command-map-marker.active .command-marker-label { border-left-color: var(--gold-primary); }
        .command-marker-northern .command-marker-label { top: -8px; transform: translateY(-100%); }
        .command-marker-western .command-marker-label { top: calc(50% + 26px); }
        .command-marker-western .command-marker-label, .command-marker-south-western .command-marker-label { left: auto; right: 25px; align-items: flex-end; border-left: 0; border-right: 2px solid var(--army-primary); text-align: right; }
        .command-map-marker.active.command-marker-western .command-marker-label, .command-map-marker.active.command-marker-south-western .command-marker-label { border-right-color: var(--gold-primary); }
        .command-map-footer { display: flex; align-items: center; justify-content: space-between; gap: 16px; margin-top: 3px; color: var(--text-muted); font-size: 0.68rem; }
        .command-map-footer > span { display: inline-flex; align-items: center; gap: 7px; }
        .map-footer-dot { width: 9px; height: 9px; border: 2px solid var(--map-bg); border-radius: 50%; background: var(--army-primary); box-shadow: 0 0 0 1px var(--army-primary); }
        .command-spotlight { display: flex; min-height: 540px; padding: 42px 38px; flex-direction: column; border: 1px solid var(--border-subtle); border-radius: var(--radius-xl); background: var(--bg-surface); box-shadow: var(--shadow-xl); }
        .command-spotlight-top { display: flex; align-items: center; gap: 17px; }
        .command-spotlight-mark { width: 56px; height: 56px; display: grid; flex: 0 0 56px; place-items: center; border: 1px solid var(--border-gold); border-radius: 16px; color: var(--army-primary); background: var(--army-tint); }
        .command-spotlight-top .army-info-kicker { margin-bottom: 7px; }
        .command-spotlight h3 { color: var(--text-primary); font-size: clamp(1.8rem, 2.9vw, 2.75rem); font-weight: 900; line-height: 1.04; letter-spacing: -0.045em; }
        .command-rule { width: 46px; height: 4px; margin: 28px 0 20px; border-radius: 3px; background: linear-gradient(90deg, #ff9933, #ffffff, #138808); }
        .command-mission { color: var(--army-primary); font-family: var(--font-display); font-size: 1.1rem; line-height: 1.3; }
        .command-spotlight > p { margin-top: 14px; color: var(--text-secondary); font-size: 0.98rem; line-height: 1.75; }
        .command-detail-list { display: grid; gap: 0; margin-top: 25px; border-top: 1px solid var(--border-subtle); }
        .command-detail-list > div { display: grid; grid-template-columns: 92px 1fr; gap: 16px; padding: 13px 0; border-bottom: 1px solid var(--border-subtle); }
        .command-detail-list span { color: var(--gold-dark); font-family: var(--font-mono); font-size: 0.66rem; font-weight: 800; }
        .command-detail-list strong { color: var(--text-primary); font-size: 0.78rem; line-height: 1.4; }
        .command-spotlight .army-info-text-link { margin-top: auto; padding-top: 22px; color: var(--army-primary); font-size: 0.84rem; }
        .command-spotlight .army-info-text-link:hover { color: var(--gold-dark); }

        .command-architecture-section .army-info-section-heading > p { color: #cbd5e1; }
        .command-architecture-flow { display: flex; align-items: stretch; gap: 12px; }
        .architecture-level { display: flex; min-height: 195px; flex: 1; padding: 21px; flex-direction: column; border: 1px solid rgba(255, 255, 255, 0.12); border-radius: var(--radius-lg); background: rgba(255, 255, 255, 0.045); }
        .architecture-level > span { color: var(--gold-light); font-family: var(--font-mono); font-size: 0.65rem; font-weight: 800; }
        .architecture-level > svg { margin-top: 27px; color: var(--gold-light); }
        .architecture-level h3 { margin-top: 17px; color: #ffffff; font-size: 0.98rem; line-height: 1.2; }
        .architecture-level p { margin-top: 8px; color: #aebfba; font-size: 0.78rem; line-height: 1.55; }
        .architecture-arrow { align-self: center; flex: 0 0 auto; color: var(--gold-light); }

        .command-capability-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; }
        .command-capability-card { min-height: 345px; padding: 25px; border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); background: var(--bg-surface); box-shadow: var(--shadow-sm); transition: transform var(--transition-normal), box-shadow var(--transition-normal), border-color var(--transition-normal); }
        .command-capability-card:hover { border-color: var(--gold-primary); box-shadow: var(--shadow-lg); transform: translateY(-5px); }
        .capability-card-icon { width: 45px; height: 45px; display: grid; place-items: center; margin-bottom: 24px; border-radius: 13px; color: var(--army-primary); background: var(--army-tint); }
        .command-capability-card.saffron .capability-card-icon { color: #b45309; background: rgba(255, 153, 51, 0.14); }
        .command-capability-card.gold .capability-card-icon { color: var(--gold-dark); background: rgba(197, 155, 39, 0.14); }
        .command-capability-card.green .capability-card-icon { color: #15803d; background: rgba(19, 136, 8, 0.12); }
        .command-capability-card.navy .capability-card-icon { color: #1d4ed8; background: rgba(0, 0, 128, 0.1); }
        .capability-card-tag { color: var(--gold-dark); font-family: var(--font-mono); font-size: 0.63rem; font-weight: 800; }
        .command-capability-card h3 { margin: 9px 0 10px; color: var(--text-primary); font-size: 1.15rem; }
        .command-capability-card > p { color: var(--text-secondary); font-size: 0.85rem; line-height: 1.62; }
        .capability-items { display: grid; gap: 9px; margin-top: 22px; padding-top: 18px; border-top: 1px solid var(--border-subtle); }
        .capability-items span { display: flex; align-items: center; gap: 7px; color: var(--text-primary); font-size: 0.76rem; font-weight: 700; }
        .capability-items svg { flex: 0 0 auto; color: var(--army-primary); }

        .command-structure-page .army-info-callout { display: flex; align-items: center; gap: 24px; }
        .command-structure-page .army-info-callout-mark { width: 58px; height: 58px; display: grid; flex: 0 0 58px; place-items: center; border: 1px solid rgba(229, 190, 89, 0.35); border-radius: 16px; color: var(--gold-light); background: rgba(197, 155, 39, 0.1); }
        .command-structure-page .army-info-callout h2 { max-width: 650px; font-size: clamp(1.45rem, 2.5vw, 2.1rem); }
        .command-structure-page .army-info-primary-link { display: inline-flex; align-items: center; gap: 8px; margin-left: auto; padding: 12px 18px; border: 1px solid rgba(229, 190, 89, 0.45); border-radius: var(--radius-sm); color: #18251b; background: var(--gold-light); font-size: 0.78rem; font-weight: 800; white-space: nowrap; transition: all var(--transition-fast); }
        .command-structure-page .army-info-primary-link:hover { color: #18251b; background: #ffffff; transform: translateY(-2px); }

        [data-theme='dark'] .command-structure-page .army-info-section { background: var(--bg-surface); }
        [data-theme='dark'] .command-structure-page .army-info-tint-section { background: var(--bg-app); }
        [data-theme='dark'] .command-map-panel { --map-bg: #102318; --map-land-light: #3e7650; --map-land-deep: #1d4930; --map-outline: #9fc5a6; --map-route: rgba(229, 190, 89, 0.28); --map-grid: rgba(229, 190, 89, 0.13); --map-label-bg: rgba(8, 20, 12, 0.84); --map-label-text: #f1f5f9; background: radial-gradient(circle at 50% 44%, rgba(67, 129, 87, 0.23), transparent 56%), var(--map-bg); }
        [data-theme='dark'] .command-spotlight, [data-theme='dark'] .command-capability-card { background: var(--bg-surface-elevated); }
        [data-theme='dark'] .command-spotlight-mark { color: var(--gold-light); background: rgba(197, 155, 39, 0.13); }
        [data-theme='dark'] .command-mission, [data-theme='dark'] .capability-card-tag, [data-theme='dark'] .command-detail-list span { color: var(--gold-light); }
        [data-theme='dark'] .capability-items svg { color: var(--gold-light); }
        [data-theme='dark'] .command-map-footer a { color: var(--gold-light); }

        @media (max-width: 1100px) {
          .command-observatory { grid-template-columns: 1fr; }
          .command-map-panel, .command-spotlight { min-height: 500px; }
          .command-capability-grid { grid-template-columns: repeat(2, 1fr); }
          .command-architecture-flow { display: grid; grid-template-columns: repeat(3, 1fr); }
          .architecture-arrow { display: none; }
        }

        @media (max-width: 760px) {
          .command-structure-page .army-info-hero, .command-structure-page .army-info-hero-content { min-height: 670px; }
          .command-structure-page .army-info-hero-copy { margin-top: 42px; }
          .command-structure-page .army-info-hero h1 { font-size: 2.65rem; }
          .command-structure-page .army-info-hero-stats { grid-template-columns: repeat(3, 1fr); }
          .command-structure-page .army-info-stat { padding-right: 10px; }
          .command-structure-page .army-info-stat:not(:first-child) { padding-left: 10px; }
          .command-structure-page .army-info-stat strong { font-size: 1.45rem; }
          .command-structure-page .army-info-section { padding: 62px 0; }
          .command-structure-page .army-info-section-heading { display: block; }
          .command-structure-page .army-info-section-heading > p { margin-top: 18px; }
          .command-map-panel { min-height: 0; padding: 20px; }
          .command-map-stage { min-height: 540px; margin-top: 15px; }
          .command-map-stage::before, .command-map-stage::after { display: none; }
          .command-map-canvas { width: 92%; }
          .command-marker-label { min-width: 86px; padding: 6px 7px; }
          .command-marker-label strong { font-size: 0.59rem; }
          .command-marker-label small { font-size: 0.53rem; }
          .command-marker-dot { width: 13px; height: 13px; flex-basis: 13px; }
          .command-map-footer { display: block; }
          .command-network { display: grid; grid-template-columns: repeat(2, 1fr); min-height: 0; margin-top: 18px; gap: 10px; }
          .command-network::before, .command-network::after { display: none; }
          .command-network-node, .command-network-node:hover, .command-network-node.active, .command-network-center { position: relative; left: auto; top: auto; width: auto; min-height: 84px; transform: none; }
          .command-network-node:hover, .command-network-node.active { transform: translateY(-3px); }
          .command-network-center { grid-column: 1 / -1; width: 100%; height: 90px; border-radius: 16px; order: -1; }
          .command-network-center span { width: 32px; height: 32px; }
          .command-network-legend { margin-top: 18px; }
          .command-spotlight { min-height: 0; padding: 32px 25px; }
          .command-capability-grid, .command-architecture-flow { grid-template-columns: 1fr; }
          .command-capability-card { min-height: 0; }
          .command-structure-page .army-info-callout { display: grid; grid-template-columns: auto 1fr; }
          .command-structure-page .army-info-primary-link { grid-column: 2; margin-left: 0; justify-self: start; }
        }

        @media (max-width: 520px) {
          .command-structure-page .army-info-hero-meta { display: none; }
          .command-structure-page .army-info-stat span { font-size: 0.63rem; }
          .command-network-heading { display: block; }
          .command-network-heading small { display: block; margin-top: 6px; }
          .command-network-node { min-height: 80px; padding: 10px; }
          .command-network-node strong { max-width: 94px; font-size: 0.66rem; }
          .command-network-node small { font-size: 0.57rem; }
          .command-detail-list > div { grid-template-columns: 77px 1fr; gap: 10px; }
        }
      `}</style>
    </main>
  );
};

export default ArmyCommandStructurePage;
