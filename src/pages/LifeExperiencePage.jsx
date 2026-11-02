import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  MapPin
} from 'lucide-react';

const LIFE_EXPERIENCES = {
  adventure: {
    label: 'ADVENTURE & HIGH ALTITUDE SPORTS',
    heroIntro: 'A culture of courage, skill and endurance.',
    heroStats: [
      { value: '03', label: 'Land · water · air' },
      { value: 'AAW', label: 'Army Adventure Wing' },
      { value: '24×7', label: 'Readiness mindset' }
    ],
    slides: [
      {
        eyebrow: 'LAND ADVENTURE',
        title: 'Beyond the',
        highlight: 'high frontier.',
        location: 'Himalayan expeditions · Mountaineering',
        badge: 'Skill under altitude',
        description: 'On rock, ice and snow, every step is a lesson in judgement, preparation and trust. The Army’s mountaineering culture turns demanding terrain into a school of leadership.',
        image: 'https://pbs.twimg.com/media/GtmwAMsX0AABB63.jpg',
        source: 'ADGPI · Indian Army',
        sourceUrl: 'https://x.com/adgpi/status/1934771047603265664'
      },
      {
        eyebrow: 'HIGH-ALTITUDE EXPEDITIONS',
        title: 'Where the',
        highlight: 'mountain becomes the mission.',
        location: 'Ladakh · Karakoram ranges',
        badge: 'Endurance in thin air',
        description: 'Acclimatisation, ice craft, route finding and rope work are built into the expedition mindset. The summit is only one part of the achievement; the team returns stronger and wiser.',
        image: 'https://www.hindustantimes.com/ht-img/img/2025/06/18/1600x900/Approaching-from-the-southeast--the-team-chose-a-s_1750273899876.jpg',
        source: 'Hindustan Times · Army expedition',
        sourceUrl: 'https://www.hindustantimes.com/cities/chandigarh-news/indian-army-organises-mountaineering-expedition-to-honour-galwan-heroes-101750273902625.html'
      },
      {
        eyebrow: 'AQUA ADVENTURE',
        title: 'Read the wind.',
        highlight: 'Lead the horizon.',
        location: 'Army Aqua Nodal Centre · Blue-water sailing',
        badge: 'Discipline on water',
        description: 'Sailing asks for calm decisions in changing conditions. Seamanship, navigation and shared responsibility build the same composure that service demands on land.',
        image: 'https://akm-img-a-in.tosshub.com/indiatoday/images/story/202404/crews-ship-182426653-16x9_0.png?VersionId=x9cuyeOH10j32R0t6dZr54mHP4NCN1yF&size=690%3A388',
        source: 'India Today · Army Adventure Wing sailing',
        sourceUrl: 'https://www.indiatoday.in/india/story/india-army-air-force-navy-tri-services-crew-defence-forces-2528602-2024-04-18'
      },
      {
        eyebrow: 'EQUESTRIAN TRADITION',
        title: 'Speed with',
        highlight: 'precision and balance.',
        location: 'Army Equestrian Centre · Polo',
        badge: 'Teamwork at speed',
        description: 'Polo and equestrian sport pair instinct with discipline. The horse, rider and team must move as one—an enduring sporting tradition that develops confidence, coordination and nerve.',
        image: 'https://pbs.twimg.com/media/D2fCHx9W0AAriEe.jpg',
        source: 'Ministry of Defence · Gen Thimayya Cup',
        sourceUrl: 'https://x.com/SpokespersonMoD/status/1110069322645278720'
      },
      {
        eyebrow: 'AIR ADVENTURE',
        title: 'Trust your training.',
        highlight: 'Own the air.',
        location: 'Airborne skills · Precision parachuting',
        badge: 'Courage with control',
        description: 'Air adventure develops absolute trust in equipment, procedure and the team. It is a disciplined expression of courage, not a shortcut around preparation.',
        image: 'https://files.prokerala.com/news/photos/imgs/1024/tri-service-exercise-conducted-at-madhavpur-beach-1935144.jpg',
        source: 'Tri-Service exercise photo',
        sourceUrl: 'https://www.prokerala.com/news/photos/tri-service-exercise-conducted-at-madhavpur-beach-3738110.html'
      }
    ],
    feature: {
      kicker: 'THE CULTURE OF ADVENTURE',
      title: 'Training that turns uncertainty into capability.',
      text: 'Adventure in the Indian Army is not a recreation placed beside service. It is a deliberate way to build self-reliance, confidence and the ability to make sound decisions when the environment is unfamiliar and the margin for error is small. The Army Adventure Wing coordinates land, aqua and aero activities, while teams train for national and international expeditions.',
      image: 'https://www.hindustantimes.com/ht-img/img/2025/06/18/1600x900/Approaching-from-the-southeast--the-team-chose-a-s_1750273899876.jpg',
      source: 'Hindustan Times · Indian Army mountaineering expedition'
    },
    disciplines: [
      { label: 'LAND', title: 'Ice, rock and altitude', text: 'Mountaineering, trekking, rock climbing, snow skiing and mountain biking build route sense, physical resilience and calm leadership.', image: 'https://pbs.twimg.com/media/GtmwAMsX0AABB63.jpg', source: 'ADGPI · Indian Army' },
      { label: 'WATER', title: 'Seamanship under pressure', text: 'Sailing, rowing, kayaking and rafting train navigation, communication and shared responsibility in a moving environment.', image: 'https://akm-img-a-in.tosshub.com/indiatoday/images/story/202404/crews-ship-182426653-16x9_0.png?VersionId=x9cuyeOH10j32R0t6dZr54mHP4NCN1yF&size=690%3A388', source: 'India Today · Army sailing' },
      { label: 'AIR', title: 'Precision from the sky', text: 'Parachuting and other aero activities demand confidence in procedure, equipment and the team from the first brief to the final landing.', image: 'https://files.prokerala.com/news/photos/imgs/1024/tri-service-exercise-conducted-at-madhavpur-beach-1935144.jpg', source: 'Tri-Service exercise photo' },
      { label: 'ARENA', title: 'Speed, balance and trust', text: 'Equestrian sport and polo carry a distinct Army tradition, developing balance, timing and teamwork at speed.', image: 'https://pbs.twimg.com/media/D2fCHx9W0AAriEe.jpg', source: 'Ministry of Defence · Gen Thimayya Cup' }
    ],
    journey: [
      { number: '01', title: 'Build the foundation', text: 'Fitness, watermanship, rope work, navigation and equipment care come before the expedition.' },
      { number: '02', title: 'Train in the real environment', text: 'Teams learn to read the terrain, weather and their own limits through progressive exposure.' },
      { number: '03', title: 'Return the learning to service', text: 'The final measure is not only a summit or a race; it is the judgement and confidence carried back to the unit.' }
    ],
    sources: [
      { label: 'PIB · Army Adventure Wing sailing expedition', url: 'https://www.pib.gov.in/PressReleaseIframePage.aspx?PRID=2018287&lang=2&reg=48' },
      { label: 'PIB · Indian Army white-water rafting expedition', url: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2023495&lang=2&reg=48' },
      { label: 'Ministry of Defence · Annual Report 2024–25', url: 'https://www.ddpmod.gov.in/sites/default/files/f8e94bda5b77b0d965c38149f88e92d60cd38ff431611165edca1c59b99653ff/4fd1090a4871149c4845f914894dca251728a192696dcf1d284a02fb51618c3d.pdf' }
    ]
  },
  csd: {
    label: 'MEDICAL (ECHS) & CSD CANTEEN',
    heroIntro: 'Welfare that travels with the service family.',
    heroStats: [
      { value: '1948', label: 'CSD established' },
      { value: '13.5M+', label: 'People served by CSD' },
      { value: 'ECHS', label: 'Care after service' }
    ],
    slides: [
      {
        eyebrow: 'CANTEEN STORES DEPARTMENT',
        title: 'Everyday support,',
        highlight: 'within reach.',
        location: 'Unit Run Canteens · Across the service network',
        badge: 'A welfare backbone',
        description: 'From household essentials to daily provisions, the Canteen Stores Department connects a nationwide supply system with the people who serve, have served and stand beside them.',
        image: 'https://www.newsbharati.com/Encyc/2020/10/24/2_03_08_30_Military_1_H%40%40IGHT_0_W%40%40IDTH_600.jpg',
        source: 'NewsBharati · CSD outlet',
        sourceUrl: 'https://www.newsbharati.com/Encyc/2020/10/24/Chinese-items-banned.html'
      },
      {
        eyebrow: 'UNIT RUN CANTEENS',
        title: 'A familiar place',
        highlight: 'for service families.',
        location: 'CSD Chandigarh · Daily-use provisions',
        badge: 'Service and routine',
        description: 'A Unit Run Canteen is more than a retail counter. It is a dependable part of station life, shaped by authorised access, local availability and the practical needs of military families.',
        image: 'https://www.loan4fauji.com/blog/wp-content/uploads/2023/12/2022-11-26-1-jpg.webp',
        source: 'CSD Chandigarh · photo report',
        sourceUrl: 'https://www.loan4fauji.com/blog/csd-canteen-chandigarh/'
      },
      {
        eyebrow: 'MODERNISING ACCESS',
        title: 'Clear process.',
        highlight: 'Responsible access.',
        location: 'AFD and CSD digital services',
        badge: 'Guided purchasing',
        description: 'For larger items, the CSD process follows eligibility, availability and documentation checks. The official portal and nominated URC remain the safest route from enquiry to purchase order.',
        image: 'https://www.ssbcrack.com/wp-content/uploads/2024/03/CSD-Facility.jpg',
        source: 'SSBCrack · CSD facility report',
        sourceUrl: 'https://www.ssbcrack.com/2024/03/upgraded-csd-facility-inaugurated-at-northern-area-chandigarh.html'
      }
    ],
    feature: {
      kicker: 'A WELFARE SYSTEM BUILT AROUND SERVICE',
      title: 'The quiet infrastructure behind daily life in uniform.',
      text: 'The Canteen Stores Department is a Government of India organisation under the Ministry of Defence. Established in 1948, it has grown from a small supply arrangement into a large welfare network serving serving personnel, pensioners and their families. Its purpose is practical: make quality everyday products accessible through an accountable system.',
      image: 'https://www.newsbharati.com/Encyc/2020/10/24/2_03_08_30_Military_1_H%40%40IGHT_0_W%40%40IDTH_600.jpg',
      source: 'NewsBharati · CSD outlet'
    },
    disciplines: [
      { label: 'DAILY USE', title: 'Essentials for home and station', text: 'The CSD catalogue includes toiletries, household requisites, general items, watches and stationery, food and medicine, subject to the current catalogue and local availability.', image: 'https://www.loan4fauji.com/blog/wp-content/uploads/2023/12/2022-11-26-1-jpg.webp', source: 'CSD Chandigarh · photo report' },
      { label: 'AFD', title: 'Larger purchases, guided carefully', text: 'AFD items include categories such as vehicles and white goods. Eligibility, price ceilings, periodicity and documentation depend on the beneficiary category and the current CSD procedure.', image: 'https://www.ssbcrack.com/wp-content/uploads/2024/03/CSD-Facility.jpg', source: 'CSD facility report' },
      { label: 'URC', title: 'The local point of service', text: 'Unit Run Canteens receive stores through the CSD depot system and serve authorised beneficiaries at the station level. Availability can vary by depot, state and demand.', image: 'https://www.newsbharati.com/Encyc/2020/10/24/2_03_08_30_Military_1_H%40%40IGHT_0_W%40%40IDTH_600.jpg', source: 'CSD outlet photo' },
      { label: 'ECHS', title: 'Care that continues after service', text: 'ECHS provides healthcare for eligible ex-servicemen pensioners and dependents through polyclinics, service facilities and empanelled hospitals, subject to the scheme’s rules.', image: '/assets/echs-care-clinic.png', source: 'Illustrative visual · AI generated' }
    ],
    journey: [
      { number: '01', title: 'Start at the official source', text: 'Check the current product, eligibility and AFD guidance only on the official CSD website or through your nominated URC.' },
      { number: '02', title: 'Use the authorised channel', text: 'For AFD purchases, obtain the required availability and documents, then submit them through the nominated Unit Run Canteen.' },
      { number: '03', title: 'Keep your records safe', text: 'Retain receipts, approvals and card details. If a policy or stock position changes, the official CSD notice takes precedence.' }
    ],
    sources: [
      { label: 'Official CSD · About and product categories', url: 'https://csdindia.gov.in/cat.aspx?Id=1' },
      { label: 'Official CSD · FAQ and purchase guidance', url: 'https://www.csdindia.gov.in/faq.html' },
      { label: 'Official ECHS · About the scheme', url: 'https://www.echs.gov.in/about' }
    ]
  }
};

const LifeExperiencePage = ({ type }) => {
  const page = LIFE_EXPERIENCES[type] || LIFE_EXPERIENCES.adventure;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const current = page.slides[activeIndex];

  const moveSlide = useCallback((direction) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setActiveIndex((index) => (index + direction + page.slides.length) % page.slides.length);
    window.setTimeout(() => setIsTransitioning(false), 500);
  }, [isTransitioning, page.slides.length]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) return;
      if (event.key === 'ArrowRight') moveSlide(1);
      if (event.key === 'ArrowLeft') moveSlide(-1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [moveSlide]);

  return (
    <main className={`life-experience-page life-experience-${type}`} id="main-content">
      <section className="hero-container life-immersive-slider" aria-label={page.label}>
        <div className="hero-background-wrapper">
          {page.slides.map((slide, index) => (
            <div key={slide.title} className={`academy-bg-slide ${index === activeIndex ? 'active' : ''}`} aria-hidden={index !== activeIndex}>
              <img src={slide.image} alt="" className="hero-bg-img" loading={index === 0 ? 'eager' : 'lazy'} />
            </div>
          ))}
          <div className="hero-overlay-gradient light-overlay" />
          <div className="hero-overlay-gradient dark-overlay" />
          <div className="hero-vignette light-vignette" />
          <div className="hero-vignette dark-vignette" />
        </div>

        <div className="container hero-content-relative life-hero-content-container">
          <div className="hero-main-layout">
            <div className={`hero-text-column life-hero-editorial-col ${isTransitioning ? 'transitioning' : ''}`}>
              <Link to="/" className="life-back-link"><ArrowLeft size={16} /> Back to Home</Link>
              <div className="academy-pre-heading"><span className="academy-section-label">{page.label}</span></div>
              <div className="hero-tricolor-badge"><span className="tricolor-bar-accent" /><span className="hero-tagline-text">{current.eyebrow} · {current.badge.toUpperCase()}</span></div>
              <h1 className="hero-main-title life-hero-title">{current.title}<br /><span className="title-highlight">{current.highlight}</span></h1>
              <div className="academy-meta-pill"><MapPin size={15} className="meta-icon" /><span className="meta-location">{current.location}</span></div>
              <p className="hero-subtext life-hero-desc">{current.description}</p>
              <div className="academy-quick-stats-row life-hero-stats">
                {page.heroStats.map((stat) => <div key={stat.label} className="academy-quick-stat-card"><span className="stat-label">{stat.label}</span><span className="stat-val">{stat.value}</span></div>)}
              </div>
              <div className="hero-actions-group life-hero-actions">
                <a href="#life-article" className="btn btn-primary btn-lg"><span>Explore the story</span><ArrowRight size={18} /></a>
                <a href={current.sourceUrl} target="_blank" rel="noreferrer" className="btn life-source-action">View photo source</a>
              </div>
            </div>
          </div>
        </div>

        <a href={current.sourceUrl} target="_blank" rel="noreferrer" className="life-hero-source">Image: {current.source}</a>
        <div className="academy-carousel-controls life-carousel-controls" aria-label="Carousel navigation">
          <button type="button" className="academy-nav-arrow-btn" onClick={() => moveSlide(-1)} aria-label="Previous slide"><ChevronLeft size={22} /></button>
          <div className="academy-counter-pill"><span className="counter-current">0{activeIndex + 1}</span><span className="counter-divider">/</span><span className="counter-total">0{page.slides.length}</span></div>
          <button type="button" className="academy-nav-arrow-btn" onClick={() => moveSlide(1)} aria-label="Next slide"><ChevronRight size={22} /></button>
        </div>
      </section>

      <div className="container life-article-shell" id="life-article">
        <section className="life-article-intro">
          <span className="section-tag">{page.label}</span>
          <h2>{page.heroIntro}</h2>
          <p>{type === 'adventure'
            ? 'The Army’s sporting culture is shaped by the environments in which soldiers learn to lead: the mountain, the water, the arena and the open sky.'
            : 'The welfare ecosystem follows the soldier through service and into veteran life, with CSD and ECHS serving different but connected needs.'}</p>
        </section>

        <section className="life-feature-layout">
          <div className="life-feature-image-wrap"><img src={page.feature.image} alt={page.feature.source} /><span>Image: {page.feature.source}</span></div>
          <div className="life-feature-copy"><span className="life-kicker">{page.feature.kicker}</span><h2>{page.feature.title}</h2><p>{page.feature.text}</p></div>
        </section>

        <section className="life-disciplines-section">
          <div className="life-section-heading"><div><span className="life-kicker">THE EXPERIENCE IN FOUR FRAMES</span><h2>{type === 'adventure' ? 'Every environment teaches a different kind of courage.' : 'A connected system, seen through everyday life.'}</h2></div><p>{type === 'adventure' ? 'The best adventure training is immersive, progressive and shared.' : 'CSD and ECHS are designed around access, accountability and continuity of care.'}</p></div>
          <div className="life-disciplines-grid">
            {page.disciplines.map((item) => <article className="life-discipline-card" key={item.title}><div className="life-discipline-image"><img src={item.image} alt={item.title} loading="lazy" /></div><div className="life-discipline-copy"><span>{item.label}</span><h3>{item.title}</h3><p>{item.text}</p><small>Image: {item.source}</small></div></article>)}
          </div>
        </section>

        <section className="life-journey-section">
          <div className="life-section-heading"><div><span className="life-kicker">HOW IT COMES TO LIFE</span><h2>{type === 'adventure' ? 'From first brief to the final return.' : 'A simple path through the welfare network.'}</h2></div></div>
          <div className="life-journey-grid">{page.journey.map((item) => <article className="life-journey-card" key={item.number}><strong>{item.number}</strong><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
        </section>

        <section className="life-reference-panel">
          <div><span className="life-kicker">READ THE OFFICIAL DETAIL</span><h2>{type === 'adventure' ? 'The spirit is in the doing.' : 'Use official channels for current rules.'}</h2><p>{type === 'adventure' ? 'Activities, expeditions and training evolve with the force. Explore the official releases for the context behind the photographs and stories.' : 'Product availability, beneficiary eligibility, periodicity and procedures can change. The official CSD or ECHS portal always takes precedence over third-party guidance.'}</p></div>
          <div className="life-reference-links">{page.sources.map((source) => <a href={source.url} target="_blank" rel="noreferrer" key={source.url}>{source.label}<ArrowRight size={14} /></a>)}</div>
        </section>

        <div className="detail-bottom-cta life-bottom-cta"><div><h3>{type === 'adventure' ? 'Find your own edge.' : 'Stay connected to the official system.'}</h3><p>{type === 'adventure' ? 'Explore Army entry routes and discover where a life of service can take you.' : 'Keep the official CSD and ECHS websites close for current notices and services.'}</p></div><Link to={type === 'adventure' ? '/opportunities' : '/'} className="btn btn-gold btn-lg"><span>{type === 'adventure' ? 'Explore Army Entries' : 'Back to Home'}</span><ArrowRight size={18} /></Link></div>
      </div>

      <style>{`
        .life-experience-page { min-height: 100vh; background: var(--bg-app); color: var(--text-primary); padding-bottom: 80px; overflow: hidden; }
        .life-immersive-slider { min-height: 710px; padding: 72px 0 112px; position: relative; border-bottom: 1px solid rgba(27,48,34,0.1); }
        .life-immersive-slider .hero-background-wrapper { position: absolute; inset: 0; z-index: 0; overflow: hidden; }
        .life-immersive-slider .academy-bg-slide { position: absolute; inset: 0; opacity: 0; transform: scale(1.04); transition: opacity 800ms cubic-bezier(0.22,1,0.36,1), transform 1000ms cubic-bezier(0.22,1,0.36,1); pointer-events: none; }
        .life-immersive-slider .academy-bg-slide.active { opacity: 1; transform: scale(1); pointer-events: auto; }
        .life-immersive-slider .hero-bg-img { width: 100%; height: 100%; object-fit: cover; object-position: center; }
        .life-immersive-slider .hero-overlay-gradient { position: absolute; inset: 0; }
        .life-immersive-slider .light-overlay { background: linear-gradient(90deg, rgba(243,246,244,0.98) 0%, rgba(243,246,244,0.88) 34%, rgba(243,246,244,0.34) 73%, rgba(243,246,244,0.12) 100%); }
        .life-immersive-slider .dark-overlay { opacity: 0; background: linear-gradient(90deg, rgba(9,18,11,0.96) 0%, rgba(9,18,11,0.82) 42%, rgba(9,18,11,0.34) 100%); }
        .life-immersive-slider .hero-vignette { position: absolute; inset: 0; pointer-events: none; }
        .life-immersive-slider .light-vignette { background: linear-gradient(180deg, rgba(255,255,255,0.12), transparent 35%, rgba(243,246,244,0.7) 100%); }
        .life-immersive-slider .dark-vignette { opacity: 0; background: linear-gradient(180deg, rgba(0,0,0,0.16), transparent 35%, rgba(5,12,7,0.66) 100%); }
        [data-theme='dark'] .life-immersive-slider .light-overlay, [data-theme='dark'] .life-immersive-slider .light-vignette { opacity: 0; }
        [data-theme='dark'] .life-immersive-slider .dark-overlay, [data-theme='dark'] .life-immersive-slider .dark-vignette { opacity: 1; }
        .life-hero-content-container { position: relative; z-index: 10; }
        .life-hero-editorial-col { max-width: 750px; transition: opacity 300ms ease, transform 400ms cubic-bezier(0.22,1,0.36,1); }
        .life-hero-editorial-col.transitioning { opacity: 0.2; transform: translateY(8px); }
        .life-back-link { display: inline-flex; gap: 7px; align-items: center; color: var(--army-primary); font-size: 0.8rem; font-weight: 700; margin-bottom: 20px; }
        [data-theme='dark'] .life-back-link { color: var(--gold-light); }
        .life-back-link:hover { transform: translateX(-3px); }
        .life-experience-page .academy-pre-heading { margin-bottom: 12px; }
        .life-experience-page .academy-section-label { display: inline-block; font-family: var(--font-display); font-size: 0.75rem; font-weight: 900; letter-spacing: 0.16em; color: var(--army-primary); background: rgba(31,73,48,0.08); padding: 5px 12px; border-radius: var(--radius-full); border: 1px solid rgba(31,73,48,0.15); }
        [data-theme='dark'] .life-experience-page .academy-section-label { color: var(--gold-light); background: rgba(197,155,39,0.12); border-color: rgba(197,155,39,0.25); }
        .life-experience-page .hero-tricolor-badge { display: inline-flex; align-items: center; gap: 9px; margin-bottom: 16px; color: var(--text-secondary); font-size: 0.72rem; font-weight: 800; letter-spacing: 0.08em; }
        .life-experience-page .tricolor-bar-accent { width: 30px; height: 3px; border-radius: 4px; background: linear-gradient(90deg, var(--tiranga-saffron), #fff 50%, var(--tiranga-green)); }
        .life-hero-title { font-family: var(--font-display); font-size: clamp(2.7rem, 5vw, 4.3rem); line-height: 1.04; margin-bottom: 16px; max-width: 720px; }
        .life-hero-title .title-highlight { color: var(--gold-dark); }
        [data-theme='dark'] .life-hero-title .title-highlight { color: var(--gold-light); }
        .life-experience-page .academy-meta-pill { display: inline-flex; align-items: center; gap: 8px; color: var(--text-secondary); font-size: 0.86rem; font-weight: 700; margin-bottom: 16px; }
        .life-experience-page .academy-meta-pill .meta-icon { color: var(--gold-dark); }
        [data-theme='dark'] .life-experience-page .academy-meta-pill .meta-icon { color: var(--gold-light); }
        .life-hero-desc { max-width: 650px; font-size: 1.02rem; color: var(--text-secondary); line-height: 1.68; margin-bottom: 20px; }
        .life-hero-stats { display: grid; grid-template-columns: repeat(3, minmax(140px, 1fr)); gap: 12px; max-width: 680px; margin-bottom: 26px; }
        .life-experience-page .academy-quick-stat-card { background: rgba(255,255,255,0.78); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border: 1px solid rgba(0,0,0,0.08); border-radius: var(--radius-sm); padding: 10px 12px; display: flex; flex-direction: column; gap: 3px; box-shadow: 0 4px 12px rgba(0,0,0,0.03); }
        [data-theme='dark'] .life-hero-stats .academy-quick-stat-card { background: rgba(11,29,18,0.72); }
        .life-experience-page .academy-quick-stat-card .stat-label { font-size: 0.66rem; text-transform: uppercase; letter-spacing: 0.06em; color: var(--text-muted); font-weight: 700; line-height: 1.25; }
        .life-experience-page .academy-quick-stat-card .stat-val { font-size: 0.86rem; font-weight: 800; color: var(--text-primary); line-height: 1.25; }
        [data-theme='dark'] .life-experience-page .academy-quick-stat-card .stat-label { color: #94a3b8; }
        [data-theme='dark'] .life-experience-page .academy-quick-stat-card .stat-val { color: #f8fafc; }
        .life-hero-actions { display: flex; align-items: center; gap: 12px; }
        .life-source-action { color: var(--text-primary); border: 1px solid var(--border-medium); background: rgba(255,255,255,0.54); }
        .life-source-action:hover { background: var(--bg-surface); border-color: var(--army-primary); }
        [data-theme='dark'] .life-source-action { color: #fff; border-color: rgba(255,255,255,0.24); background: rgba(11,29,18,0.48); }
        .life-hero-source { position: absolute; z-index: 20; bottom: 40px; left: max(24px, calc((100% - 1400px) / 2 + 24px)); color: var(--text-muted); font-size: 0.68rem; text-decoration: underline; text-underline-offset: 2px; }
        .life-hero-source:hover { color: var(--army-primary); }
        [data-theme='dark'] .life-hero-source:hover { color: var(--gold-light); }
        .life-carousel-controls { right: 60px; bottom: 32px; }
        .life-article-shell { max-width: 1120px; padding-top: 76px; }
        .life-article-intro { max-width: 760px; margin-bottom: 50px; }
        .life-article-intro h2, .life-feature-copy h2, .life-section-heading h2, .life-reference-panel h2 { font-family: var(--font-display); font-weight: 900; letter-spacing: -0.04em; color: var(--text-primary); }
        .life-article-intro h2 { font-size: clamp(2rem, 4vw, 3.4rem); line-height: 1.08; margin-bottom: 16px; }
        .life-article-intro p { color: var(--text-secondary); font-size: 1rem; line-height: 1.7; }
        .life-feature-layout { display: grid; grid-template-columns: minmax(0, 1.08fr) minmax(0, 0.92fr); gap: 42px; align-items: center; margin-bottom: 88px; }
        .life-feature-image-wrap { position: relative; min-height: 410px; border-radius: var(--radius-lg); overflow: hidden; background: var(--bg-surface-subtle); box-shadow: var(--shadow-floating); }
        .life-feature-image-wrap::after { content: ''; position: absolute; inset: 0; background: linear-gradient(180deg, transparent 50%, rgba(7,18,10,0.64)); pointer-events: none; }
        .life-feature-image-wrap img { width: 100%; height: 100%; min-height: 410px; object-fit: cover; }
        .life-feature-image-wrap > span { position: absolute; z-index: 1; left: 18px; bottom: 16px; color: #fff; font-size: 0.68rem; }
        .life-feature-copy { padding-right: 14px; }
        .life-kicker { display: inline-block; color: var(--gold-dark); font-size: 0.72rem; font-weight: 900; letter-spacing: 0.13em; text-transform: uppercase; margin-bottom: 12px; }
        [data-theme='dark'] .life-kicker { color: var(--gold-light); }
        .life-feature-copy h2 { font-size: clamp(1.8rem, 3vw, 2.65rem); line-height: 1.1; margin-bottom: 16px; }
        .life-feature-copy p { color: var(--text-secondary); font-size: 0.95rem; line-height: 1.75; }
        .life-disciplines-section, .life-journey-section { margin-bottom: 84px; }
        .life-section-heading { display: flex; align-items: end; justify-content: space-between; gap: 28px; margin-bottom: 26px; }
        .life-section-heading h2 { font-size: clamp(1.65rem, 3vw, 2.35rem); line-height: 1.1; max-width: 650px; }
        .life-section-heading > p { max-width: 315px; color: var(--text-secondary); font-size: 0.86rem; line-height: 1.6; }
        .life-disciplines-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 18px; }
        .life-discipline-card { display: grid; grid-template-columns: 0.84fr 1.16fr; min-height: 238px; background: rgba(255,255,255,0.86); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); overflow: hidden; box-shadow: 0 10px 26px rgba(27,60,36,0.05); }
        [data-theme='dark'] .life-discipline-card { background: rgba(19,34,23,0.86); }
        .life-discipline-image { min-height: 238px; overflow: hidden; }
        .life-discipline-image img { width: 100%; height: 100%; object-fit: cover; transition: transform 500ms ease; }
        .life-discipline-card:hover .life-discipline-image img { transform: scale(1.04); }
        .life-discipline-copy { padding: 20px; display: flex; flex-direction: column; align-items: flex-start; }
        .life-discipline-copy > span { color: var(--gold-dark); font-size: 0.68rem; font-weight: 900; letter-spacing: 0.12em; }
        [data-theme='dark'] .life-discipline-copy > span { color: var(--gold-light); }
        .life-discipline-copy h3 { color: var(--text-primary); font-family: var(--font-display); font-size: 1.05rem; font-weight: 800; line-height: 1.15; margin: 8px 0; }
        .life-discipline-copy p { color: var(--text-secondary); font-size: 0.78rem; line-height: 1.55; }
        .life-discipline-copy small { color: var(--text-muted); font-size: 0.62rem; margin-top: auto; padding-top: 12px; }
        .life-journey-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        .life-journey-card { background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 22px; min-height: 190px; }
        .life-journey-card > strong { color: var(--gold-dark); font-family: var(--font-display); font-size: 1.5rem; }
        [data-theme='dark'] .life-journey-card > strong { color: var(--gold-light); }
        .life-journey-card h3 { color: var(--text-primary); font-family: var(--font-display); font-size: 1rem; margin: 18px 0 8px; }
        .life-journey-card p { color: var(--text-secondary); font-size: 0.8rem; line-height: 1.6; }
        .life-reference-panel { display: grid; grid-template-columns: 1fr 0.9fr; gap: 36px; padding: 28px; margin-bottom: 30px; border-radius: var(--radius-md); background: linear-gradient(135deg, rgba(247,249,248,0.86), rgba(255,255,255,0.68)); border: 1px solid var(--border-subtle); }
        [data-theme='dark'] .life-reference-panel { background: rgba(19,34,23,0.72); }
        .life-reference-panel h2 { font-size: 1.65rem; line-height: 1.12; margin-bottom: 10px; }
        .life-reference-panel p { color: var(--text-secondary); font-size: 0.82rem; line-height: 1.6; }
        .life-reference-links { display: grid; align-content: center; gap: 10px; }
        .life-reference-links a { display: flex; justify-content: space-between; align-items: center; gap: 12px; padding: 12px 14px; border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: var(--army-primary); background: rgba(255,255,255,0.62); font-size: 0.75rem; font-weight: 700; }
        [data-theme='dark'] .life-reference-links a { color: var(--gold-light); background: rgba(0,0,0,0.2); }
        .life-reference-links a:hover { border-color: var(--gold-primary); }
        .life-bottom-cta { margin-top: 0; }
        .life-experience-page .detail-bottom-cta { display: flex; justify-content: space-between; align-items: center; gap: 20px; padding: 24px; border-radius: var(--radius-md); background: rgba(244,247,245,0.86); border: 1.5px solid rgba(226,232,240,0.9); }
        [data-theme='dark'] .life-experience-page .detail-bottom-cta { background: rgba(0,0,0,0.3); border-color: rgba(255,255,255,0.08); }
        .life-experience-page .detail-bottom-cta h3 { font-family: var(--font-display); font-size: 1.18rem; color: var(--text-primary); margin-bottom: 4px; }
        .life-experience-page .detail-bottom-cta p { color: var(--text-secondary); font-size: 0.78rem; }
        @media (max-width: 900px) { .life-feature-layout, .life-reference-panel { grid-template-columns: 1fr; } .life-disciplines-grid { grid-template-columns: 1fr; } .life-journey-grid { grid-template-columns: 1fr; } }
        @media (max-width: 700px) { .life-immersive-slider { min-height: 720px; padding: 48px 0 112px; } .life-hero-title { font-size: 2.45rem; } .life-hero-stats { grid-template-columns: 1fr 1fr; } .life-hero-actions, .life-section-heading, .life-experience-page .detail-bottom-cta { flex-direction: column; align-items: flex-start; } .life-hero-actions .btn { width: 100%; } .life-hero-source { left: 16px; bottom: 30px; max-width: 48%; } .life-carousel-controls { right: 18px; bottom: 20px; } .life-feature-image-wrap, .life-feature-image-wrap img { min-height: 300px; } .life-feature-layout { gap: 26px; margin-bottom: 64px; } .life-discipline-card { grid-template-columns: 1fr; } .life-discipline-image { min-height: 190px; max-height: 190px; } .life-article-shell { padding-top: 54px; } }
      `}</style>
    </main>
  );
};

export default LifeExperiencePage;
