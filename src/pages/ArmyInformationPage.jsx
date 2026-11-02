import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Compass,
  Crosshair,
  Flag,
  Landmark,
  Map,
  Medal,
  Mountain,
  ScrollText,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  Wrench
} from 'lucide-react';

const WINNERS = [
  {
    name: 'Major Somnath Sharma, PVC',
    shortName: 'Major Somnath Sharma',
    conflict: '1947 · Battle of Badgam',
    image: '/assets/gallantry-somnath-sharma.jpg',
    story: 'India’s first Param Vir Chakra awardee, remembered for holding his position against overwhelming odds and protecting the Srinagar airfield.',
    source: 'Wikimedia Commons',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:National_War_Memorial_India,_Param_Vir_Chakra_section,_Major_Somnath_Sharma.jpg'
  },
  {
    name: 'Captain Vikram Batra, PVC',
    shortName: 'Captain Vikram Batra',
    conflict: '1999 · Kargil War',
    image: '/assets/gallantry-vikram-batra.jpg',
    story: 'A fearless leader of the Kargil conflict whose example of courage, initiative and devotion continues to inspire generations of soldiers.',
    source: 'Indian Army via Wikimedia Commons',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Captain_Vikram_Batra_Portrait.jpg'
  },
  {
    name: 'Subedar Major Yogendra Singh Yadav, PVC',
    shortName: 'Subedar Major Yogendra Singh Yadav',
    conflict: '1999 · Tiger Hill',
    image: '/assets/gallantry-yogendra-yadav.jpg',
    story: 'At Tiger Hill, he led a decisive assault under intense fire and kept moving forward despite grave injuries and extraordinary odds.',
    source: 'Wikimedia Commons',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Sub_Maj_%26_Hony_Capt_Yogendra_Singh_Yadav,_PVC.jpg'
  },
  {
    name: 'Rifleman Sanjay Kumar, PVC',
    shortName: 'Rifleman Sanjay Kumar',
    conflict: '1999 · Point 4875',
    image: '/assets/gallantry-sanjay-kumar.jpg',
    story: 'His solitary assault on enemy positions at Point 4875 turned the tide of a critical operation during the Kargil War.',
    source: 'Wikimedia Commons',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Sub_Maj_Sanjay_Kumar,_PVC.png'
  },
  {
    name: 'Subedar Joginder Singh, PVC',
    shortName: 'Subedar Joginder Singh',
    conflict: '1962 · Battle of Bum La',
    image: '/assets/gallantry-joginder-singh.jpg',
    story: 'He and his small platoon stood their ground with exceptional resolve, embodying the soldier’s promise to defend every inch of the nation.',
    source: 'Indian Army via Wikimedia Commons',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Subedar_Joginder_Singh_Portrait.jpg'
  }
];

const OTHER_CHAKRA_WINNERS = [
  {
    name: 'Captain Keishing Clifford Nongrum, MVC',
    shortName: 'Captain K. C. Nongrum',
    award: 'Maha Vir Chakra',
    awardShort: 'MVC',
    rank: 'Second-highest wartime gallantry award',
    conflict: '1999 · Operation Vijay',
    image: '/assets/gallantry-kc-nongrum.jpg',
    story: 'During the assault on Point 4812 in the Batalik sector, he led from the front under intense fire and pressed the attack despite being mortally wounded.',
    source: 'Eastern Command, Indian Army via Wikimedia Commons',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Capt_KC_Nongrum.jpg'
  },
  {
    name: 'Captain Sanjeev Singh Jamwal, VrC',
    shortName: 'Captain Sanjeev Singh Jamwal',
    award: 'Vir Chakra',
    awardShort: 'VrC',
    rank: 'Third-highest wartime gallantry award',
    conflict: '1999 · Operation Vijay',
    image: '/assets/gallantry-sanjeev-jamwal.jpg',
    story: 'As commander of Bravo Company, he helped lead the assault on Point 5140 during the Kargil War, bringing clarity and resolve to a dangerous mountain operation.',
    source: 'Ministry of Defence via Wikimedia Commons',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Capt._Sanjeev_Jamwal_receiving_Vir_Chakra_from_President_K_R_Narayan_on_1999.jpg'
  },
  {
    name: 'Lieutenant Triveni Singh, AC',
    shortName: 'Lieutenant Triveni Singh',
    award: 'Ashoka Chakra',
    awardShort: 'AC',
    rank: 'Highest peacetime gallantry award',
    conflict: '2004 · Jammu Railway Station',
    image: 'https://upload.wikimedia.org/wikipedia/commons/7/74/Triveni_Singh.jpg',
    story: 'When terrorists attacked Jammu Railway Station, he moved into the danger, fought the attackers at close range and helped protect hundreds of passengers.',
    source: 'Indian Army via Wikimedia Commons',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Triveni_Singh.jpg'
  },
  {
    name: 'Lieutenant Sushil Khajuria, KC (Posthumous)',
    shortName: 'Lieutenant Sushil Khajuria',
    award: 'Kirti Chakra',
    awardShort: 'KC',
    rank: 'Second-highest peacetime gallantry award',
    conflict: '2011 · Kupwara, Jammu & Kashmir',
    image: 'https://upload.wikimedia.org/wikipedia/commons/0/07/Kirti_Chakra_awardee%2C_Lieutenant_Sushil_Khajuria_%28posthumous%29%2C_Army_service_corps_18th_battalion_the_Grenadiers.jpg',
    story: 'Leading a search-and-destroy mission in difficult terrain, he showed exceptional leadership and sacrificed his life while closing with militants.',
    source: 'Press Information Bureau via Wikimedia Commons',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Kirti_Chakra_awardee,_Lieutenant_Sushil_Khajuria_(posthumous),_Army_service_corps_18th_battalion_the_Grenadiers.jpg'
  },
  {
    name: 'Colonel Saumitra Ray, SC',
    shortName: 'Colonel Saumitra Ray',
    award: 'Shaurya Chakra',
    awardShort: 'SC',
    rank: 'Third-highest peacetime gallantry award',
    conflict: '1969 · Gallantry in action',
    image: 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Colonel_%28Then_Captain%29_Saumitra_Ray.jpg',
    story: 'His decoration stands for conspicuous gallantry in demanding operations away from a declared battlefield, where courage and judgement are tested without warning.',
    source: 'Wikimedia Commons',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Colonel_(Then_Captain)_Saumitra_Ray.jpg'
  }
];

const AWARD_LADDER = [
  { code: 'PVC', title: 'Param Vir Chakra', context: 'Wartime · supreme valour', text: 'For the most conspicuous bravery or self-sacrifice in the presence of the enemy.' },
  { code: 'MVC', title: 'Maha Vir Chakra', context: 'Wartime · exceptional courage', text: 'For conspicuous gallantry in the presence of the enemy, of a high order.' },
  { code: 'VrC', title: 'Vir Chakra', context: 'Wartime · bravery in battle', text: 'For acts of bravery in the presence of the enemy on land, at sea or in the air.' },
  { code: 'AC', title: 'Ashoka Chakra', context: 'Peacetime · supreme valour', text: 'For the most conspicuous bravery or self-sacrifice away from the battlefield.' },
  { code: 'KC', title: 'Kirti Chakra', context: 'Peacetime · exceptional courage', text: 'For conspicuous gallantry away from the battlefield, of a high order.' },
  { code: 'SC', title: 'Shaurya Chakra', context: 'Peacetime · courageous action', text: 'For gallantry in action away from the battlefield, including courageous service in operations.' }
];

const SERVICE_AWARDS = [
  { code: 'SYSM', title: 'Sarvottam Yudh Seva Medal', text: 'For the highest distinguished service of an exceptional order during a conflict or operations.' },
  { code: 'PVSM', title: 'Param Vishisht Seva Medal', text: 'For distinguished service of the most exceptional order across a soldier’s career.' },
  { code: 'UYSM', title: 'Uttam Yudh Seva Medal', text: 'For distinguished service of an exceptional order during war, conflict or operations.' },
  { code: 'AVSM', title: 'Ati Vishisht Seva Medal', text: 'For distinguished service of an exceptional order in peace or active service.' },
  { code: 'YSM', title: 'Yudh Seva Medal', text: 'For distinguished service of a high order during war, conflict or operations.' },
  { code: 'VSM', title: 'Vishisht Seva Medal', text: 'For distinguished service of an exceptional order in any branch of the Armed Forces.' },
  { code: 'SM', title: 'Sena Medal (Gallantry)', text: 'For individual acts of exceptional devotion to duty or courage in the Army.' },
  { code: 'MID', title: 'Mention-in-Despatches', text: 'A formal recognition of distinguished and commendable service in operations.' }
];

const PAGE_CONTENT = {
  gallantry: {
    eyebrow: 'PARAM VIR CHAKRA & GALLANTRY',
    title: 'Stories that became the nation’s courage.',
    description: 'An immersive tribute to the soldiers whose courage in the presence of the enemy represents the highest ideals of the Indian Army.',
    heroImage: '/assets/operation-vijay.png',
    accent: '21 Param Vir Chakra recipients',
    stats: [
      { value: '21', label: 'Param Vir Chakra recipients' },
      { value: '1950', label: 'The award was instituted' },
      { value: '01', label: 'Standard of supreme valour' }
    ]
  },
  commands: {
    eyebrow: 'COMMAND & CORPS STRUCTURE',
    title: 'One Army. Seven commands. One purpose.',
    description: 'A clear view of how the Indian Army organises its operational commands, corps and specialist arms to remain ready across every theatre.',
    heroImage: '/assets/hero-army-visible.png',
    accent: 'A connected force across every terrain',
    stats: [
      { value: '07', label: 'Operational and training commands' },
      { value: '14', label: 'Army corps across theatres' },
      { value: '24×7', label: 'Readiness and coordination' }
    ]
  },
  values: {
    eyebrow: 'VALUES & CODE OF ETHICS',
    title: 'Service before self. Always.',
    description: 'The code that turns a force into a brotherhood: duty before comfort, integrity before recognition, and the nation before self.',
    heroImage: '/assets/Hero2.png',
    accent: 'Naam · Namak · Nishan',
    stats: [
      { value: '01', label: 'Service before self' },
      { value: '03', label: 'Pillars of soldierly identity' },
      { value: '∞', label: 'A commitment carried forward' }
    ]
  }
};

const COMMANDS = [
  { name: 'Northern Command', location: 'Udhampur', focus: 'High-altitude readiness across the northern frontier', icon: Mountain },
  { name: 'Western Command', location: 'Chandimandir', focus: 'Operational depth across the western theatre', icon: ShieldCheck },
  { name: 'Eastern Command', location: 'Kolkata', focus: 'Mountain warfare and eastern theatre preparedness', icon: Compass },
  { name: 'Southern Command', location: 'Pune', focus: 'Strategic depth and southern theatre coordination', icon: Map },
  { name: 'Central Command', location: 'Lucknow', focus: 'Training, mobilisation and central theatre support', icon: Target },
  { name: 'South Western Command', location: 'Jaipur', focus: 'Desert operations and western sector readiness', icon: Crosshair },
  { name: 'Army Training Command', location: 'Shimla', focus: 'Doctrine, training standards and professional development', icon: BookOpen }
];

const CORPS = [
  { title: 'Combat Arms', text: 'Infantry, Armoured Corps and Mechanised Infantry deliver decisive action on the battlefield.', icon: Crosshair },
  { title: 'Firepower & Aviation', text: 'Artillery and Army Aviation extend reach, precision and battlefield awareness.', icon: Target },
  { title: 'Combat Support', text: 'Engineers, Signals and Intelligence enable mobility, communication and informed decisions.', icon: Compass },
  { title: 'Services & Sustainment', text: 'Logistics, medical and ordnance services keep every formation supplied and resilient.', icon: Wrench }
];

const VALUES = [
  { title: 'Service Before Self', text: 'The central promise: place the mission, the team and the nation before personal comfort.', icon: Flag, tone: 'saffron' },
  { title: 'Naam', text: 'Carry the honour of the regiment, unit and institution through every action.', icon: Award, tone: 'gold' },
  { title: 'Namak', text: 'Remain loyal to the people and the nation whose trust a soldier carries.', icon: ShieldCheck, tone: 'green' },
  { title: 'Nishan', text: 'Guard the colours, the flag and the ideals they represent with unwavering resolve.', icon: Medal, tone: 'navy' }
];

const ArmyInformationPage = () => {
  const { topic = 'gallantry' } = useParams();
  const page = PAGE_CONTENT[topic] || PAGE_CONTENT.gallantry;
  const [activeWinnerIndex, setActiveWinnerIndex] = useState(0);
  const [activeChakraIndex, setActiveChakraIndex] = useState(0);
  const isGallantry = topic === 'gallantry';
  const activeWinner = WINNERS[activeWinnerIndex];
  const activeChakra = OTHER_CHAKRA_WINNERS[activeChakraIndex];

  const moveWinner = (direction) => {
    setActiveWinnerIndex((current) => (current + direction + WINNERS.length) % WINNERS.length);
  };

  const moveChakra = (direction) => {
    setActiveChakraIndex((current) => (current + direction + OTHER_CHAKRA_WINNERS.length) % OTHER_CHAKRA_WINNERS.length);
  };

  return (
    <main className={`army-information-page army-information-${topic}`} id="main-content">
      <section className="army-info-hero">
        <div className="army-info-hero-image" style={{ backgroundImage: `url(${page.heroImage})` }} />
        <div className="army-info-hero-overlay" />
        <div className="container army-info-hero-content">
          <div className="army-info-breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <span>About Indian Army</span>
            <span>/</span>
            <strong>{page.eyebrow}</strong>
          </div>

          <div className="army-info-hero-copy">
            <div className="army-info-eyebrow">
              <span className="army-info-eyebrow-line" />
              <span>{page.eyebrow}</span>
            </div>
            <h1>{page.title}</h1>
            <p>{page.description}</p>
            <div className="army-info-hero-meta">
              <span><Sparkles size={15} /> {page.accent}</span>
              <span><CheckCircle2 size={15} /> Official Indian Army information portal</span>
            </div>
          </div>

          <div className="army-info-hero-stats">
            {page.stats.map((stat) => (
              <div className="army-info-stat" key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {isGallantry ? (
        <>
          <section className="army-info-section army-info-feature-section">
            <div className="container">
              <div className="army-info-section-heading">
                <div>
                  <span className="army-info-kicker">THE HIGHEST GALLANTRY HONOUR</span>
                  <h2>Valor that lives beyond the battlefield.</h2>
                </div>
                <p>The Param Vir Chakra is awarded for the most conspicuous bravery or self-sacrifice in the presence of the enemy. These stories are a living part of India’s military memory.</p>
              </div>

              <div className="gallantry-spotlight">
                <div className="gallantry-spotlight-image">
                  <img src={activeWinner.image} alt={activeWinner.name} />
                  <div className="gallantry-image-wash" />
                  <div className="gallantry-image-label"><Award size={15} /> PARAM VIR CHAKRA</div>
                </div>
                <div className="gallantry-spotlight-copy">
                  <span className="army-info-kicker">{activeWinner.conflict}</span>
                  <h3>{activeWinner.shortName}</h3>
                  <div className="gallantry-rule" />
                  <p>{activeWinner.story}</p>
                  <div className="gallantry-spotlight-footer">
                    <a href={activeWinner.sourceUrl} target="_blank" rel="noreferrer">Image source: {activeWinner.source}</a>
                    <div className="gallantry-controls">
                      <button type="button" className="army-info-round-btn" onClick={() => moveWinner(-1)} aria-label="Previous gallantry story"><ChevronLeft size={18} /></button>
                      <span>0{activeWinnerIndex + 1} / 0{WINNERS.length}</span>
                      <button type="button" className="army-info-round-btn" onClick={() => moveWinner(1)} aria-label="Next gallantry story"><ChevronRight size={18} /></button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="gallantry-winner-grid">
                {WINNERS.map((winner, index) => (
                  <button
                    type="button"
                    className={`gallantry-winner-card ${index === activeWinnerIndex ? 'active' : ''}`}
                    key={winner.name}
                    onClick={() => setActiveWinnerIndex(index)}
                  >
                    <img src={winner.image} alt="" />
                    <span className="gallantry-winner-card-body">
                      <small>{winner.conflict}</small>
                      <strong>{winner.shortName}</strong>
                    </span>
                    <ArrowRight size={16} />
                  </button>
                ))}
              </div>
            </div>
          </section>

          <section className="army-info-section army-info-other-chakra-section">
            <div className="container">
              <div className="army-info-section-heading">
                <div>
                  <span className="army-info-kicker">THE OTHER CHAKRAS</span>
                  <h2>Every decoration carries a different kind of courage.</h2>
                </div>
                <p>The Chakra series recognises exceptional courage in battle and in peace. Explore the stories behind the five decorations that stand alongside the Param Vir Chakra.</p>
              </div>

              <div className="gallantry-spotlight">
                <div className="gallantry-spotlight-image">
                  <img src={activeChakra.image} alt={activeChakra.name} />
                  <div className="gallantry-image-wash" />
                  <div className="gallantry-image-label"><Award size={15} /> {activeChakra.award.toUpperCase()}</div>
                </div>
                <div className="gallantry-spotlight-copy">
                  <span className="army-info-kicker">{activeChakra.conflict}</span>
                  <h3>{activeChakra.shortName}</h3>
                  <div className="gallantry-award-rank">{activeChakra.award} · {activeChakra.rank}</div>
                  <div className="gallantry-rule" />
                  <p>{activeChakra.story}</p>
                  <div className="gallantry-spotlight-footer">
                    <a href={activeChakra.sourceUrl} target="_blank" rel="noreferrer">Image source: {activeChakra.source}</a>
                    <div className="gallantry-controls">
                      <button type="button" className="army-info-round-btn" onClick={() => moveChakra(-1)} aria-label="Previous Chakra story"><ChevronLeft size={18} /></button>
                      <span>0{activeChakraIndex + 1} / 0{OTHER_CHAKRA_WINNERS.length}</span>
                      <button type="button" className="army-info-round-btn" onClick={() => moveChakra(1)} aria-label="Next Chakra story"><ChevronRight size={18} /></button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="gallantry-winner-grid">
                {OTHER_CHAKRA_WINNERS.map((winner, index) => (
                  <button
                    type="button"
                    className={`gallantry-winner-card ${index === activeChakraIndex ? 'active' : ''}`}
                    key={winner.name}
                    onClick={() => setActiveChakraIndex(index)}
                  >
                    <img src={winner.image} alt="" />
                    <span className="gallantry-winner-card-body">
                      <small>{winner.award} · {winner.conflict}</small>
                      <strong>{winner.shortName}</strong>
                    </span>
                    <ArrowRight size={16} />
                  </button>
                ))}
              </div>
            </div>
          </section>

          <section className="army-info-section army-info-tint-section army-info-award-system-section">
            <div className="container">
              <div className="army-info-section-heading">
                <div>
                  <span className="army-info-kicker">THE CHAKRA SERIES</span>
                  <h2>Six honours. One unbroken standard.</h2>
                </div>
                <p>Wartime and peacetime decorations form a connected language of service. Each honour marks a different level and context of courage.</p>
              </div>

              <div className="award-ladder">
                {AWARD_LADDER.map((award) => (
                  <article className="award-ladder-card" key={award.code}>
                    <span className="award-ladder-badge">{award.code}</span>
                    <div>
                      <small>{award.context}</small>
                      <h3>{award.title}</h3>
                      <p>{award.text}</p>
                    </div>
                  </article>
                ))}
              </div>

              <div className="service-awards-heading">
                <div>
                  <span className="army-info-kicker">THE WIDER ARMY HONOURS</span>
                  <h3>Recognition for leadership, duty and distinguished service.</h3>
                </div>
                <p>Beyond the Chakra series, the Army honours distinguished service in war, operations and peace through a family of service decorations.</p>
              </div>

              <div className="service-awards-grid">
                {SERVICE_AWARDS.map((award) => (
                  <article className="service-award-card" key={award.code}>
                    <span>{award.code}</span>
                    <h3>{award.title}</h3>
                    <p>{award.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="army-info-section army-info-dark-section">
            <div className="container">
              <div className="army-info-dark-grid">
                <div>
                  <span className="army-info-kicker">A LEGACY OF COURAGE</span>
                  <h2>Remembering is a form of service.</h2>
                </div>
                <div>
                  <p>From the first defence of independent India to the mountains of Kargil, gallantry is not only a record of the past. It is a standard carried by every soldier who serves after them.</p>
                  <Link className="army-info-text-link" to="/opportunities">Explore a life of service <ArrowRight size={16} /></Link>
                </div>
              </div>
            </div>
          </section>
        </>
      ) : topic === 'commands' ? (
        <>
          <section className="army-info-section">
            <div className="container">
              <div className="army-info-section-heading">
                <div>
                  <span className="army-info-kicker">THE OPERATIONAL MAP</span>
                  <h2>Seven commands, one connected force.</h2>
                </div>
                <p>Each command brings together formations and specialist capabilities for its theatre, while training and doctrine keep the Army aligned as one institution.</p>
              </div>
              <div className="command-grid">
                {COMMANDS.map((command, index) => {
                  const Icon = command.icon;
                  return (
                    <article className="command-card" key={command.name}>
                      <div className="command-card-top"><span>0{index + 1}</span><Icon size={22} /></div>
                      <h3>{command.name}</h3>
                      <strong>{command.location}</strong>
                      <p>{command.focus}</p>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="army-info-section army-info-tint-section">
            <div className="container">
              <div className="army-info-section-heading compact">
                <div>
                  <span className="army-info-kicker">CORPS & SPECIALIST ARMS</span>
                  <h2>Capability in every direction.</h2>
                </div>
                <p>Operational power is made possible by the combat arms, support arms and services working together as one system.</p>
              </div>
              <div className="corps-grid">
                {CORPS.map((corps) => {
                  const Icon = corps.icon;
                  return <article className="corps-card" key={corps.title}><div className="corps-icon"><Icon size={22} /></div><h3>{corps.title}</h3><p>{corps.text}</p></article>;
                })}
              </div>
            </div>
          </section>

          <section className="army-info-section army-info-dark-section">
            <div className="container army-info-callout">
              <div className="army-info-callout-mark"><Landmark size={28} /></div>
              <div><span className="army-info-kicker">A SYSTEM BUILT FOR READINESS</span><h2>Every formation has a role. Every soldier has a responsibility.</h2></div>
              <Link className="army-info-primary-link" to="/opportunities">Find your entry route <ArrowRight size={17} /></Link>
            </div>
          </section>
        </>
      ) : (
        <>
          <section className="army-info-section">
            <div className="container">
              <div className="army-info-section-heading">
                <div>
                  <span className="army-info-kicker">THE SOLDIER’S COMPASS</span>
                  <h2>A code lived, not merely written.</h2>
                </div>
                <p>Values make decisions clear when conditions are difficult. They shape how soldiers lead, serve, work with comrades and carry the trust of the nation.</p>
              </div>
              <div className="values-grid">
                {VALUES.map((value) => {
                  const Icon = value.icon;
                  return <article className={`value-card ${value.tone}`} key={value.title}><div className="value-icon"><Icon size={22} /></div><h3>{value.title}</h3><p>{value.text}</p></article>;
                })}
              </div>
            </div>
          </section>

          <section className="army-info-section army-info-tint-section">
            <div className="container">
              <div className="army-info-section-heading compact">
                <div>
                  <span className="army-info-kicker">ETHICS IN ACTION</span>
                  <h2>Trust is earned in the details.</h2>
                </div>
                <p>Professional conduct is built through everyday choices: fairness in leadership, care for comrades, respect for the law and courage to do what is right.</p>
              </div>
              <div className="ethics-list">
                {[
                  ['01', 'Lead by example', 'Responsibility begins with personal conduct and accountability.'],
                  ['02', 'Protect dignity', 'Respect for people remains central to military professionalism.'],
                  ['03', 'Keep the promise', 'The uniform represents discipline, reliability and public trust.'],
                  ['04', 'Leave a standard', 'Every generation strengthens the institution for the next.']
                ].map(([number, title, text]) => <div className="ethics-row" key={number}><span>{number}</span><ScrollText size={19} /><div><h3>{title}</h3><p>{text}</p></div><CheckCircle2 size={18} /></div>)}
              </div>
            </div>
          </section>

          <section className="army-info-section army-info-dark-section">
            <div className="container army-info-callout">
              <div className="army-info-callout-mark"><ScrollText size={28} /></div>
              <div><span className="army-info-kicker">CARRY THE LEGACY FORWARD</span><h2>Character is the first qualification for service.</h2></div>
              <Link className="army-info-primary-link" to="/opportunities">Explore Army opportunities <ArrowRight size={17} /></Link>
            </div>
          </section>
        </>
      )}

      <style>{`
        .army-information-page {
          background: var(--bg-app);
          color: var(--text-primary);
        }

        .army-info-hero {
          min-height: 590px;
          position: relative;
          display: flex;
          align-items: stretch;
          overflow: hidden;
          background: var(--army-darkest);
        }

        .army-info-hero-image,
        .army-info-hero-overlay {
          position: absolute;
          inset: 0;
        }

        .army-info-hero-image {
          background-position: center;
          background-size: cover;
          filter: saturate(0.82) brightness(0.8);
          transform: scale(1.02);
        }

        .army-info-hero-overlay {
          background: linear-gradient(90deg, rgba(8, 20, 12, 0.94) 0%, rgba(8, 20, 12, 0.78) 35%, rgba(8, 20, 12, 0.28) 70%, rgba(8, 20, 12, 0.52) 100%), linear-gradient(180deg, rgba(8, 20, 12, 0.18), rgba(8, 20, 12, 0.82));
        }

        .army-info-hero-content {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          width: 100%;
          min-height: 590px;
          padding-top: 28px;
          padding-bottom: 44px;
        }

        .army-info-breadcrumb {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 9px;
          color: rgba(255, 255, 255, 0.68);
          font-size: 0.72rem;
          font-weight: 600;
        }

        .army-info-breadcrumb a:hover { color: #ffffff; }
        .army-info-breadcrumb strong { color: #f5c968; font-weight: 800; }

        .army-info-hero-copy { max-width: 760px; margin-top: 64px; }

        .army-info-eyebrow,
        .army-info-hero-meta,
        .army-info-hero-meta span {
          display: flex;
          align-items: center;
        }

        .army-info-eyebrow {
          gap: 10px;
          color: #f2c35e;
          font-family: var(--font-display);
          font-size: 0.75rem;
          font-weight: 900;
          letter-spacing: 0.16em;
        }

        .army-info-eyebrow-line { width: 34px; height: 3px; border-radius: 4px; background: linear-gradient(90deg, #ff9933, #ffffff, #138808); }
        .army-info-hero h1 { max-width: 760px; margin: 16px 0 15px; color: #ffffff; font-size: clamp(2.4rem, 5vw, 4.7rem); font-weight: 900; line-height: 1.03; letter-spacing: -0.05em; }
        .army-info-hero-copy > p { max-width: 650px; color: rgba(255, 255, 255, 0.82); font-size: 1.05rem; line-height: 1.65; }
        .army-info-hero-meta { flex-wrap: wrap; gap: 18px; margin-top: 22px; color: rgba(255, 255, 255, 0.7); font-size: 0.78rem; font-weight: 600; }
        .army-info-hero-meta span { gap: 7px; }
        .army-info-hero-meta svg { color: #f5c968; }

        .army-info-hero-stats { display: grid; grid-template-columns: repeat(3, 1fr); max-width: 720px; border-top: 1px solid rgba(255, 255, 255, 0.22); }
        .army-info-stat { padding: 17px 22px 0 0; border-right: 1px solid rgba(255, 255, 255, 0.18); }
        .army-info-stat:not(:first-child) { padding-left: 22px; }
        .army-info-stat:last-child { border-right: 0; }
        .army-info-stat strong { display: block; color: #ffffff; font-family: var(--font-display); font-size: 1.8rem; font-weight: 900; line-height: 1; }
        .army-info-stat span { display: block; max-width: 140px; margin-top: 7px; color: rgba(255, 255, 255, 0.62); font-size: 0.72rem; line-height: 1.35; }

        .army-info-section { padding: 92px 0; background: var(--bg-surface); }
        .army-info-tint-section { background: var(--bg-app); }
        .army-info-dark-section { color: #ffffff; background: var(--bg-dark-section); }
        .army-info-section-heading { display: flex; align-items: flex-end; justify-content: space-between; gap: 40px; margin-bottom: 42px; }
        .army-info-section-heading.compact { margin-bottom: 32px; }
        .army-info-section-heading > div { max-width: 650px; }
        .army-info-section-heading > p { max-width: 480px; color: var(--text-secondary); font-size: 0.95rem; line-height: 1.65; }
        .army-info-dark-section .army-info-section-heading > p { color: #cbd5e1; }
        .army-info-kicker { display: block; margin-bottom: 10px; color: var(--gold-dark); font-family: var(--font-display); font-size: 0.71rem; font-weight: 900; letter-spacing: 0.15em; }
        [data-theme='dark'] .army-info-kicker { color: var(--gold-light); }
        .army-info-section h2 { color: var(--text-primary); font-size: clamp(1.8rem, 3vw, 2.65rem); font-weight: 900; line-height: 1.08; letter-spacing: -0.04em; }
        .army-info-dark-section h2 { color: #ffffff; }

        .gallantry-spotlight { display: grid; grid-template-columns: minmax(320px, 0.9fr) 1.1fr; height: 470px; min-height: 470px; overflow: hidden; border: 1px solid var(--border-subtle); border-radius: var(--radius-xl); background: var(--bg-surface); box-shadow: var(--shadow-xl); }
        .gallantry-spotlight-image { position: relative; height: 470px; overflow: hidden; background: #15251a; }
        .gallantry-spotlight-image img { width: 100%; height: 100%; object-fit: cover; object-position: center top; transition: opacity 300ms ease; }
        .gallantry-image-wash { position: absolute; inset: 0; background: linear-gradient(180deg, transparent 45%, rgba(8, 20, 12, 0.76) 100%); }
        .gallantry-image-label { position: absolute; left: 24px; bottom: 22px; display: inline-flex; align-items: center; gap: 7px; color: #ffffff; font-size: 0.7rem; font-weight: 900; letter-spacing: 0.13em; }
        .gallantry-image-label svg { color: #f5c968; }
        .gallantry-spotlight-copy { display: flex; flex-direction: column; padding: 60px 58px 36px; }
        .gallantry-spotlight-copy h3 { max-width: 520px; margin: 0; color: var(--text-primary); font-size: clamp(1.9rem, 3.3vw, 3rem); font-weight: 900; line-height: 1.04; letter-spacing: -0.045em; }
        .gallantry-award-rank { margin-top: 13px; color: var(--gold-dark); font-size: 0.71rem; font-weight: 800; letter-spacing: 0.02em; }
        .gallantry-rule { width: 46px; height: 4px; margin: 20px 0 24px; border-radius: 3px; background: linear-gradient(90deg, #ff9933, #ffffff, #138808); }
        .gallantry-spotlight-copy > p { max-width: 500px; color: var(--text-secondary); font-size: 1rem; line-height: 1.7; }
        .gallantry-spotlight-footer { display: flex; align-items: flex-end; justify-content: space-between; gap: 20px; margin-top: auto; padding-top: 32px; }
        .gallantry-spotlight-footer > a { color: var(--text-muted); font-size: 0.68rem; text-decoration: underline; }
        .gallantry-spotlight-footer > a:hover { color: var(--army-primary); }
        .gallantry-controls { display: flex; align-items: center; gap: 10px; color: var(--text-muted); font-size: 0.7rem; font-weight: 800; }
        .army-info-round-btn { width: 36px; height: 36px; display: grid; place-items: center; border: 1px solid var(--border-medium); border-radius: 50%; color: var(--text-secondary); background: var(--bg-surface); transition: all var(--transition-fast); }
        .army-info-round-btn:hover { color: var(--army-primary); border-color: var(--army-primary); transform: translateY(-2px); }

        .gallantry-winner-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 12px; margin-top: 22px; }
        .gallantry-winner-card { min-width: 0; display: flex; align-items: center; gap: 10px; padding: 9px; border: 1px solid var(--border-subtle); border-radius: var(--radius-md); text-align: left; color: var(--text-primary); background: var(--bg-surface); transition: all var(--transition-normal); }
        .gallantry-winner-card:hover, .gallantry-winner-card.active { border-color: var(--gold-primary); box-shadow: 0 7px 18px rgba(35, 58, 39, 0.1); transform: translateY(-3px); }
        .gallantry-winner-card > img { width: 42px; height: 52px; flex: 0 0 42px; border-radius: 7px; object-fit: cover; object-position: center top; }
        .gallantry-winner-card-body { display: flex; flex-direction: column; min-width: 0; flex: 1; }
        .gallantry-winner-card-body small { overflow: hidden; color: var(--gold-dark); font-size: 0.57rem; font-weight: 800; white-space: nowrap; text-overflow: ellipsis; }
        .gallantry-winner-card-body strong { overflow: hidden; margin-top: 4px; font-size: 0.68rem; line-height: 1.2; white-space: nowrap; text-overflow: ellipsis; }
        .gallantry-winner-card > svg { flex: 0 0 auto; color: var(--text-muted); }

        .army-info-other-chakra-section { background: var(--bg-app); }
        .award-ladder { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
        .award-ladder-card { display: grid; grid-template-columns: 48px 1fr; gap: 15px; min-height: 180px; padding: 22px; border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); background: var(--bg-surface); box-shadow: var(--shadow-sm); transition: transform var(--transition-normal), box-shadow var(--transition-normal), border-color var(--transition-normal); }
        .award-ladder-card:hover { border-color: var(--gold-primary); box-shadow: var(--shadow-lg); transform: translateY(-4px); }
        .award-ladder-badge { width: 44px; height: 44px; display: grid; place-items: center; border: 1px solid rgba(197, 155, 39, 0.42); border-radius: 13px; color: var(--gold-dark); background: rgba(197, 155, 39, 0.1); font-family: var(--font-mono); font-size: 0.65rem; font-weight: 800; }
        .award-ladder-card small { display: block; color: var(--gold-dark); font-size: 0.62rem; font-weight: 800; line-height: 1.25; }
        .award-ladder-card h3 { margin: 8px 0 9px; color: var(--text-primary); font-size: 0.98rem; line-height: 1.2; }
        .award-ladder-card p { color: var(--text-secondary); font-size: 0.75rem; line-height: 1.55; }
        .service-awards-heading { display: flex; align-items: flex-end; justify-content: space-between; gap: 40px; margin: 72px 0 28px; }
        .service-awards-heading h3 { max-width: 600px; color: var(--text-primary); font-size: clamp(1.4rem, 2.3vw, 2rem); font-weight: 900; line-height: 1.12; letter-spacing: -0.035em; }
        .service-awards-heading > p { max-width: 480px; color: var(--text-secondary); font-size: 0.9rem; line-height: 1.65; }
        .service-awards-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
        .service-award-card { min-height: 180px; padding: 22px; border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); background: var(--bg-surface); box-shadow: var(--shadow-sm); }
        .service-award-card > span { display: inline-grid; min-width: 40px; min-height: 26px; place-items: center; padding: 0 7px; border-radius: 7px; color: var(--army-primary); background: var(--army-tint); font-family: var(--font-mono); font-size: 0.6rem; font-weight: 800; }
        .service-award-card h3 { margin: 22px 0 9px; color: var(--text-primary); font-size: 0.9rem; line-height: 1.2; }
        .service-award-card p { color: var(--text-secondary); font-size: 0.75rem; line-height: 1.55; }

        .army-info-dark-grid { display: grid; grid-template-columns: 1fr 1fr; align-items: center; gap: 80px; }
        .army-info-dark-grid p { margin-bottom: 20px; color: #cbd5e1; font-size: 0.98rem; line-height: 1.7; }
        .army-info-text-link, .army-info-primary-link { display: inline-flex; align-items: center; gap: 8px; font-weight: 800; }
        .army-info-text-link { color: var(--gold-light); font-size: 0.85rem; }
        .army-info-text-link:hover { color: #ffffff; }

        .command-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
        .command-card { min-height: 235px; padding: 24px; border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); background: var(--bg-surface); transition: transform var(--transition-normal), box-shadow var(--transition-normal), border-color var(--transition-normal); }
        .command-card:hover { border-color: var(--gold-primary); box-shadow: var(--shadow-lg); transform: translateY(-5px); }
        .command-card-top { display: flex; align-items: center; justify-content: space-between; color: var(--gold-dark); }
        .command-card-top span { font-family: var(--font-mono); font-size: 0.7rem; font-weight: 700; }
        .command-card h3 { margin: 29px 0 7px; color: var(--text-primary); font-size: 1rem; line-height: 1.2; }
        .command-card strong { color: var(--army-primary); font-size: 0.75rem; }
        .command-card p { margin-top: 12px; color: var(--text-secondary); font-size: 0.75rem; line-height: 1.5; }

        .corps-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
        .corps-card { padding: 28px; border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); background: var(--bg-surface); box-shadow: var(--shadow-sm); }
        .corps-icon { width: 44px; height: 44px; display: grid; place-items: center; margin-bottom: 22px; border-radius: 12px; color: var(--army-primary); background: var(--army-tint); }
        [data-theme='dark'] .corps-icon { color: var(--gold-light); background: rgba(197, 155, 39, 0.13); }
        .corps-card h3 { margin-bottom: 8px; font-size: 1rem; }
        .corps-card p { color: var(--text-secondary); font-size: 0.8rem; line-height: 1.6; }

        .army-info-callout { display: flex; align-items: center; gap: 24px; }
        .army-info-callout-mark { width: 58px; height: 58px; flex: 0 0 58px; display: grid; place-items: center; border: 1px solid rgba(229, 190, 89, 0.35); border-radius: 16px; color: var(--gold-light); background: rgba(197, 155, 39, 0.1); }
        .army-info-callout h2 { max-width: 650px; font-size: clamp(1.45rem, 2.5vw, 2.1rem); }
        .army-info-primary-link { margin-left: auto; padding: 12px 18px; border: 1px solid rgba(229, 190, 89, 0.45); border-radius: var(--radius-sm); color: #18251b; background: var(--gold-light); font-size: 0.78rem; white-space: nowrap; transition: all var(--transition-fast); }
        .army-info-primary-link:hover { color: #18251b; background: #ffffff; transform: translateY(-2px); }

        .values-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
        .value-card { min-height: 255px; padding: 28px; border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); background: var(--bg-surface); box-shadow: var(--shadow-sm); }
        .value-icon { width: 46px; height: 46px; display: grid; place-items: center; margin-bottom: 30px; border-radius: 50%; color: var(--army-primary); background: var(--army-tint); }
        .value-card.saffron .value-icon { color: #b45309; background: rgba(255, 153, 51, 0.14); }
        .value-card.gold .value-icon { color: var(--gold-dark); background: rgba(197, 155, 39, 0.14); }
        .value-card.green .value-icon { color: #15803d; background: rgba(19, 136, 8, 0.12); }
        .value-card.navy .value-icon { color: #1d4ed8; background: rgba(0, 0, 128, 0.1); }
        .value-card h3 { margin-bottom: 11px; font-size: 1.08rem; }
        .value-card p { color: var(--text-secondary); font-size: 0.82rem; line-height: 1.65; }

        .ethics-list { max-width: 950px; margin: 0 auto; border-top: 1px solid var(--border-subtle); }
        .ethics-row { display: grid; grid-template-columns: 38px 30px 1fr 20px; align-items: center; gap: 16px; padding: 22px 0; border-bottom: 1px solid var(--border-subtle); }
        .ethics-row > span { color: var(--gold-dark); font-family: var(--font-mono); font-size: 0.68rem; font-weight: 700; }
        .ethics-row > svg { color: var(--army-primary); }
        .ethics-row > svg:last-child { color: #16a34a; }
        .ethics-row h3 { margin-bottom: 3px; font-size: 0.98rem; }
        .ethics-row p { color: var(--text-secondary); font-size: 0.78rem; }

        [data-theme='dark'] .army-info-section { background: var(--bg-surface); }
        [data-theme='dark'] .army-info-tint-section { background: var(--bg-app); }
        [data-theme='dark'] .gallantry-spotlight, [data-theme='dark'] .command-card, [data-theme='dark'] .corps-card, [data-theme='dark'] .value-card, [data-theme='dark'] .gallantry-winner-card, [data-theme='dark'] .award-ladder-card, [data-theme='dark'] .service-award-card { background: var(--bg-surface-elevated); }
        [data-theme='dark'] .command-card strong, [data-theme='dark'] .gallantry-winner-card-body small, [data-theme='dark'] .gallantry-award-rank, [data-theme='dark'] .award-ladder-card small { color: var(--gold-light); }
        [data-theme='dark'] .service-award-card > span { color: var(--gold-light); background: rgba(197, 155, 39, 0.13); }

        @media (max-width: 1024px) {
          .command-grid { grid-template-columns: repeat(3, 1fr); }
          .corps-grid, .values-grid, .service-awards-grid { grid-template-columns: repeat(2, 1fr); }
          .award-ladder { grid-template-columns: repeat(2, 1fr); }
          .gallantry-winner-grid { grid-template-columns: repeat(3, 1fr); }
        }

        @media (max-width: 760px) {
          .army-info-hero, .army-info-hero-content { min-height: 670px; }
          .army-info-hero-copy { margin-top: 42px; }
          .army-info-hero h1 { font-size: 2.65rem; }
          .army-info-hero-stats { grid-template-columns: repeat(3, 1fr); }
          .army-info-stat { padding-right: 10px; }
          .army-info-stat:not(:first-child) { padding-left: 10px; }
          .army-info-stat strong { font-size: 1.45rem; }
          .army-info-section { padding: 62px 0; }
          .army-info-section-heading, .army-info-dark-grid { display: block; }
          .army-info-section-heading > p { margin-top: 18px; }
          .gallantry-spotlight { display: block; height: auto; min-height: 0; }
          .gallantry-spotlight-image, .gallantry-spotlight-image img { min-height: 360px; height: 360px; }
          .gallantry-spotlight-copy { min-height: 360px; padding: 34px 28px 28px; }
          .gallantry-spotlight-footer { align-items: center; }
          .service-awards-heading { display: block; }
          .service-awards-heading > p { margin-top: 18px; }
          .command-grid { grid-template-columns: repeat(2, 1fr); }
          .army-info-callout { display: grid; grid-template-columns: auto 1fr; }
          .army-info-primary-link { grid-column: 2; margin-left: 0; justify-self: start; }
        }

        @media (max-width: 520px) {
          .army-info-hero-meta { display: none; }
          .army-info-hero-stats { gap: 7px; }
          .army-info-stat span { font-size: 0.63rem; }
          .gallantry-winner-grid, .command-grid, .corps-grid, .values-grid, .award-ladder, .service-awards-grid { grid-template-columns: 1fr; }
          .gallantry-winner-card { min-height: 70px; }
          .gallantry-spotlight-footer { display: block; }
          .gallantry-controls { margin-top: 16px; }
          .ethics-row { grid-template-columns: 30px 24px 1fr 18px; gap: 10px; }
          .ethics-row p { font-size: 0.72rem; }
        }
      `}</style>
    </main>
  );
};

export default ArmyInformationPage;
