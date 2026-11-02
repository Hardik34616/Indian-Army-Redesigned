/* ==========================================================================
   PRESTIGIOUS ACADEMIES DATA - JOIN INDIAN ARMY
   ========================================================================== */

export const ACADEMIES = [
  {
    id: 'nda',
    code: 'NDA',
    title: 'National Defence Academy',
    shortName: 'NDA Khadakwasla',
    displayTitle: 'NATIONAL DEFENCE ACADEMY',
    highlightWord: 'ACADEMY',
    badge: 'Khadakwasla, Pune • Estd. 1954',
    motto: 'सेवा परमो धर्म:',
    mottoTranslation: 'Service Before Self',
    location: 'Khadakwasla, Pune, Maharashtra',
    established: '7 December 1954 (Commissioned Jan 1955)',
    type: 'Premier Tri-Services Joint Training Institution',
    image: '/assets/academy/NDA.png',
    darkImage: '/assets/academy/NDA.png',
    heroTagline: 'The Cradle of Military Leadership & World’s First Tri-Services Academy',
    description:
      'The National Defence Academy (NDA) is the iconic joint services academy of the Indian Armed Forces, where cadets of the Army, Navy, and Air Force train together before progressing to pre-commission training in their respective service academies. Spanning over 7,014 scenic acres against the Sahyadri ranges and Sinhagad Fort, NDA transforms young 10+2 aspirants into officers of unyielding character, intellectual vigor, and military excellence.',
    quickStats: [
      { label: 'Training Duration', val: '3 Years (6 Terms)' },
      { label: 'Cadet Demographics', val: 'Male & Female (16.5 - 19.5 Yrs)' },
      { label: 'Commission Stream', val: 'Permanent Commission (PC)' },
      { label: 'Degree Awarded', val: 'B.A. / B.Sc. / B.Tech (JNU)' }
    ],
    overview: {
      lead: 'A cradle of extraordinary valor, strategic acumen, and tri-service camaraderie where future leaders of the Indian Armed Forces are forged.',
      paragraphs: [
        'Conceived by visionary military thinkers after World War II, the National Defence Academy was born out of the profound lesson that modern warfare demands seamless synergy between land, sea, and air forces. Established in the scenic basin of Khadakwasla Lake near Pune, the academy is centered around the monumental Sudan Block — a grand granite structure gifted in gratitude by the government of Sudan.',
        'During three rigorous years, cadets are organized into 18 squadrons across 5 battalions (Battalions 1 to 5). Cadets undergo an intensive blend of academics accredited by Jawaharlal Nehru University (JNU), physical conditioning, equitation, small arms marksmanship, navigation, drill, and joint warfare tactics.',
        'NDA alumni have earned 3 Param Vir Chakras, 12 Maha Vir Chakras, 32 Kirti Chakras, and have led India to decisive victories across every conflict since 1965, producing over 35 Chiefs of Staff across the three services.'
      ]
    },
    keyHighlights: [
      'World’s first tri-service training academy uniting Army, Navy, and Air Force cadets.',
      '7,014-acre sprawling campus with Olympic-grade sports, firing ranges, glider flying, and lake watermanship.',
      'Rigorous academic curriculum awarding B.Tech, B.Sc., or B.A. degrees conferred by JNU.',
      'Comprehensive physical endurance training, cross-country marathons, obstacle courses, and Camp Torna / Camp Rover.',
      'Induction of women cadets since 2021 into integrated squadrons with identical high performance benchmarks.'
    ],
    entryRoutes: [
      {
        name: 'NDA Army Wing (10+2 Entry)',
        exam: 'UPSC NDA & NA Written Exam (Twice a year)',
        age: '16.5 – 19.5 Years',
        edu: '10+2 Pass in any stream (State Board / CBSE / ICSE)',
        duration: '3 Yrs NDA + 1 Yr IMA Dehradun',
        link: '/apply?entry=officers-entry&stream=NDA%20Army'
      },
      {
        name: 'NDA Navy & Naval Academy (10+2 Entry)',
        exam: 'UPSC NDA & NA Written Exam (Twice a year)',
        age: '16.5 – 19.5 Years',
        edu: '10+2 Pass with Physics and Mathematics',
        duration: '3 Yrs NDA + 1 Yr INA Ezhimala',
        link: '/apply?entry=officers-entry&stream=NDA%20Navy'
      },
      {
        name: 'NDA Air Force Wing (Flying/Ground Duty)',
        exam: 'UPSC NDA & NA Written Exam (Twice a year) + CPSS',
        age: '16.5 – 19.5 Years',
        edu: '10+2 Pass with Physics and Mathematics',
        duration: '3 Yrs NDA + 1 Yr AFA Dundigal',
        link: '/apply?entry=officers-entry&stream=NDA%20AirForce'
      }
    ],
    selectionProcess: [
      {
        step: '1. UPSC NDA Written Examination',
        desc: 'National level competitive exam comprising Mathematics (300 Marks) and General Ability Test (GAT, 600 Marks).'
      },
      {
        step: '2. 5-Day Services Selection Board (SSB)',
        desc: 'Stage-1 Screening (OIR + PPDT) followed by Stage-2 Psychology Tests, Group Testing Officer (GTO) grounds, and Personal Interview.'
      },
      {
        step: '3. Special Medical Board (SMB)',
        desc: 'Rigorous medical examination at military command hospitals including pilot CPSS testing for Air Force aspirants.'
      },
      {
        step: '4. All India Merit List & Academy Joining',
        desc: 'Final merit compiled on combined written (900) + SSB (900) marks. Top candidates receive joining instructions for Khadakwasla.'
      }
    ],
    trainingDetails: {
      duration: '3 Years (6 Semesters / Terms of 22 weeks each)',
      academicStreams: 'B.Tech (Computer Science / Mechanical), B.Sc (Physics/Maths/Computer), B.A. (Social Sciences)',
      militarySubjects: 'Military History, Tactics, Weapon Training, Map Reading, Field Craft, Military Law, Leadership',
      outdoorCamps: [
        { name: 'Camp Greenhorn (Term 2)', focus: 'Basic fieldcraft, night navigation, 15km route march' },
        { name: 'Camp Rover (Term 4)', focus: 'Endurance survival, combat navigation, mountain tracking' },
        { name: 'Camp Torna (Term 6)', focus: 'Culminating tactical exercises, assault courses, night battle drills' }
      ],
      physicalStandards: 'Daily morning PT, 5km cross-country speed march, 10m diving, boxing, horse riding, 12-obstacle assault course.'
    },
    lifeAndFacilities: {
      squadrons: '18 Squadrons organized under 5 Battalions: Alpha, Bravo, Charlie, Delta, Echo, Foxtrot, Golf, Hunter, India, Juliet, Kilo, Lima, Mike, November, Oscar, Panther, Quebec, Romeo.',
      facilities: [
        'Habibullah Hall auditorium & Sudan Block administrative grand quadrangle.',
        'Olympic-size swimming pools, 18-hole golf course, and international equestrian arena.',
        'Peacock Bay watermanship training center on Khadakwasla Lake for rowing, kayaking, and sailing.',
        'Modern computer laboratories, supersonic wind tunnel, and air weapons simulation labs.'
      ],
      traditions: 'The legendary Passing Out Parade on the Khetarpal Parade Ground, lighting of the Academy Lamp, and the sacred march past the Quarterdeck.'
    },
    careerCommission: {
      initialRank: 'Lieutenant (Indian Army) / Sub Lieutenant (Indian Navy) / Flying Officer (Indian Air Force)',
      payScale: 'Level 10 (₹56,100 - ₹1,77,500) + Military Service Pay (MSP) ₹15,500/month',
      perks: 'Comprehensive military medical cover (ECHS), government accommodation, defense canteen (CSD), subsidized travel, sports facilities.'
    }
  },
  {
    id: 'ima',
    code: 'IMA',
    title: 'Indian Military Academy',
    shortName: 'IMA Dehradun',
    displayTitle: 'INDIAN MILITARY ACADEMY',
    highlightWord: 'MILITARY',
    badge: 'Dehradun, Uttarakhand • Estd. 1932',
    motto: 'वीरता और विवेक',
    mottoTranslation: 'Valour and Wisdom',
    location: 'Dehradun, Uttarakhand (Doon Valley)',
    established: '1 October 1932',
    type: 'Premier Officer Pre-Commission Training Academy for Indian Army',
    image: '/assets/academy/IMA.png',
    darkImage: '/assets/academy/IMA.png',
    heroTagline: 'The Forge of Battlefield Commanders and the Home of the Chetwode Credo',
    description:
      'The Indian Military Academy (IMA) is the legendary cradle of officer leadership for the Indian Army. Nestled in the Doon Valley foothills of the Himalayas, IMA has produced legendary field marshals, army chiefs, and Param Vir Chakra recipients. Here, Gentlemen Cadets are honed through rigorous discipline, military tactics, leadership challenges, and physical conditioning into commanders ready to lead from the front.',
    quickStats: [
      { label: 'Training Duration', val: '1 to 1.5 Years (Term Dependent)' },
      { label: 'Cadet Demographics', val: 'Male Graduates & Ex-NDA (19 - 27 Yrs)' },
      { label: 'Commission Stream', val: 'Permanent Commission (PC)' },
      { label: 'Cadet Designation', val: 'Gentleman Cadet (GC)' }
    ],
    overview: {
      lead: 'The historic institution that instills the supreme ethos: "The safety, honour and welfare of your country come first, always and every time."',
      paragraphs: [
        'Inaugurated on 10 December 1932 by Field Marshal Sir Philip Chetwode, the Indian Military Academy stands as one of the most prestigious military training institutions on earth. At its core is the historic Chetwode Building and the Chetwode Hall, bearing the immortal Chetwode Credo that guides every officer throughout their career.',
        'IMA trains Gentlemen Cadets (GCs) across regular Direct Entry (via UPSC CDS), Ex-NDA cadets, Technical Graduate Course (TGC) engineers, University Entry Scheme (UES), and Army Cadet College (ACC) entry for soldiers aspiring to become officers.',
        'Spanning over 1,400 acres along the Tons River, IMA is organized into 4 training battalions: Cariappa, Thimayya, Manekshaw, and Bhagat Battalions. The academy has produced 73 Param Vir Chakra & Maha Vir Chakra awardees, including Captain Vikram Batra, PVC, and Major Somnath Sharma, PVC.'
      ]
    },
    keyHighlights: [
      'Home to the sacred Chetwode Credo engraved in gold inside the Chetwode Hall.',
      'Intensive combat training in mountain warfare, counter-insurgency, jungle survival, and mechanized operations.',
      'Renowned Passing Out Parade (POP) culminating with GCs crossing the sacred Antim Pag (Final Step).',
      'Advanced small-arms firing simulation ranges, tactical battle training grounds, and night-vision warfare courses.',
      'Over 64,000 officers commissioned including international cadets from 34 partner nations.'
    ],
    entryRoutes: [
      {
        name: 'Combined Defence Services (CDS IMA Entry)',
        exam: 'UPSC CDS Written Examination (Twice a year)',
        age: '19 – 24 Years',
        edu: 'Graduation Degree in any stream from recognized university',
        duration: '1.5 Years (3 Terms of 22 weeks)',
        link: '/apply?entry=officers-entry&stream=CDS%20IMA'
      },
      {
        name: 'Technical Graduate Course (TGC Entry)',
        exam: 'Direct SSB Interview based on Engineering Cutoff',
        age: '20 – 27 Years',
        edu: 'B.E. / B.Tech in notified engineering disciplines',
        duration: '1 Year (2 Terms)',
        link: '/apply?entry=officers-entry&stream=TGC%20Entry'
      },
      {
        name: 'Army Cadet College (ACC Entry for Serving Soldiers)',
        exam: 'ACC Written Exam + SSB for Serving Soldiers',
        age: '20 – 27 Years',
        edu: '10+2 with 2 years minimum army service',
        duration: '3 Yrs ACC Wing + 1 Yr IMA',
        link: '/apply?entry=officers-entry&stream=ACC%20Entry'
      }
    ],
    selectionProcess: [
      {
        step: '1. UPSC CDS Written Exam / Direct Technical Shortlisting',
        desc: '300-mark written test in English, General Knowledge, and Elementary Mathematics for CDS aspirants.'
      },
      {
        step: '2. 5-Day Services Selection Board (SSB) Interview',
        desc: 'Testing of 15 Officer Like Qualities (OLQs) through psychological tests, progressive group tasks (PGT), and conference.'
      },
      {
        step: '3. Special Medical Board (SMB)',
        desc: 'Comprehensive medical assessment at designated Military Hospitals.'
      },
      {
        step: '4. Final All India Merit List & Calling Letter',
        desc: 'Candidates with top national ranks receive reporting instructions for Dehradun.'
      }
    ],
    trainingDetails: {
      duration: '1 to 1.5 Years depending on the entry stream',
      academicStreams: 'Military Strategy, Defense Economics, Weapon Technology, Geopolitics, International Relations',
      militarySubjects: 'Platoon Weaponry, Section Battle Drills, Radio Telephony, Combat Engineering, Counter Terror Ops',
      outdoorCamps: [
        { name: 'Camp Shivalik', focus: 'Jungle warfare, reconnaissance, river crossing, and tactical patrolling' },
        { name: 'Camp Golden Cat', focus: 'Quick reaction team drills, cordon and search operations, VIP security' },
        { name: 'Camp Trident', focus: 'Final comprehensive battalion exercise, live firing, and high altitude navigation' }
      ],
      physicalStandards: '10-mile endurance runs with full combat load (battle pack), obstacle course with 26 obstacles, boxing championship.'
    },
    lifeAndFacilities: {
      squadrons: 'Organized into 4 Battalions named after legendary Indian generals: Cariappa Battalion, Thimayya Battalion, Manekshaw Battalion, and Bhagat Battalion.',
      facilities: [
        'Historic Chetwode Hall, Vikram Batra Mess, and sprawling Somnath Stadium.',
        'High-tech indoor firing range, night-vision combat arena, and close-quarter battle (CQB) house.',
        'Olympic swimming pool, squash courts, international equestrian polo grounds, and adventure clubs.',
        'Extensive central library with over 100,000 military history and tactical strategy volumes.'
      ],
      traditions: 'The solemn Piiping Ceremony where stars are placed on the shoulders of newly minted Lieutenants, and the emotional march over the Antim Pag.'
    },
    careerCommission: {
      initialRank: 'Lieutenant (Indian Army)',
      payScale: 'Level 10 (₹56,100 - ₹1,77,500) + MSP ₹15,500/month',
      perks: 'Permanent Commission with lifelong career progression, Command of combat platoons, staff colleges, and defense diplomatic missions.'
    }
  },
  {
    id: 'ota',
    code: 'OTA',
    title: 'Officers Training Academy',
    shortName: 'OTA Chennai',
    displayTitle: 'OFFICERS TRAINING ACADEMY',
    highlightWord: 'TRAINING',
    badge: 'Chennai, Tamil Nadu • Estd. 1963',
    motto: 'यथा पूर्वं तथा परम्',
    mottoTranslation: 'Serve with Honour',
    location: 'St. Thomas Mount, Chennai, Tamil Nadu',
    established: '15 January 1963',
    type: 'Premier Short Service Commission (SSC) Academy for Men & Women',
    image: '/assets/academy/OTA.png',
    darkImage: '/assets/academy/OTA.png',
    heroTagline: 'Pioneers of Combat Leadership and Gender Integration in the Indian Armed Forces',
    description:
      'The Officers Training Academy (OTA) in Chennai is the premier institution dedicated to training officers for the Short Service Commission (SSC) in the Indian Army. Spanning 750 acres near the historic St. Thomas Mount, OTA Chennai holds the proud distinction of being the first military academy to commission women officers into the Indian Army in 1992. Over 49 demanding weeks, Lady and Gentlemen Cadets are transformed into versatile, resilient combat commanders.',
    quickStats: [
      { label: 'Training Duration', val: '49 Weeks (2 Semesters / Terms)' },
      { label: 'Cadet Demographics', val: 'Men & Women Graduates (19 - 27 Yrs)' },
      { label: 'Commission Stream', val: 'Short Service Commission (SSC - 10/14 Yrs)' },
      { label: 'Cadet Designation', val: 'Gentleman Cadet (GC) / Lady Cadet (LC)' }
    ],
    overview: {
      lead: 'The forge of agile, modern commanders where women and men train to identical exacting standards of military excellence.',
      paragraphs: [
        'Established during the Sino-Indian conflict in 1963 to meet urgent frontline leadership demands, the Officers Training Academy was originally known as Officers Training School (OTS). It was redesignated as OTA Chennai in 1988, having developed world-class training infrastructure.',
        'OTA Chennai pioneered the commissioning of women officers in non-medical branches in 1992. Today, Lady Cadets (LCs) and Gentlemen Cadets (GCs) train shoulder-to-shoulder with identical physical, tactical, and leadership requirements.',
        'The academy is organized into two training battalions: Shivaji Battalion and Ranjit Singh Battalion. Alumni of OTA Chennai have been decorated with the Param Vir Chakra (Major Ramaswamy Parameswaran, PVC of Operation Pawan fame), Ashok Chakra, and numerous Kirti Chakras.'
      ]
    },
    keyHighlights: [
      'Pioneer of women officer commissioning in the Indian Armed Forces since 1992.',
      'Parameswaran Drill Ground named after Param Vir Chakra recipient Major R. Parameswaran.',
      'Intensive, fast-paced 49-week curriculum designed for high-tempo modern warfare leadership.',
      'Direct entry pathways for Technical graduates, Law graduates (JAG), and NCC ‘C’ certificate holders without written exams.',
      'Options for Short Service Commission officers to convert to Permanent Commission or transition to elite corporate/civil roles.'
    ],
    entryRoutes: [
      {
        name: 'CDS OTA Non-Technical (Men & Women)',
        exam: 'UPSC CDS (OTA) Written Exam (English + GK only, No Maths)',
        age: '19 – 25 Years',
        edu: 'Graduation in any discipline from recognized university',
        duration: '49 Weeks at OTA Chennai',
        link: '/apply?entry=officers-entry&stream=CDS%20OTA'
      },
      {
        name: 'Short Service Commission (Tech) Men & Women',
        exam: 'Direct SSB Interview based on Engineering Cutoff',
        age: '20 – 27 Years',
        edu: 'B.E. / B.Tech in notified engineering branches',
        duration: '49 Weeks at OTA Chennai',
        link: '/apply?entry=officers-entry&stream=SSC%20Tech'
      },
      {
        name: 'NCC Special Entry Scheme (Men & Women)',
        exam: 'Direct SSB for NCC \'C\' Certificate Holders (Grade A/B)',
        age: '19 – 25 Years',
        edu: 'Graduation (min 50%) + NCC \'C\' Certificate',
        duration: '49 Weeks at OTA Chennai',
        link: '/apply?entry=officers-entry&stream=NCC%20Special'
      },
      {
        name: 'Judge Advocate General (JAG Entry)',
        exam: 'Direct SSB for Law Graduates with CLAT PG score',
        age: '21 – 27 Years',
        edu: 'LLB Degree (min 55%) eligible for Bar Council registration',
        duration: '49 Weeks at OTA Chennai',
        link: '/apply?entry=officers-entry&stream=JAG%20Entry'
      }
    ],
    selectionProcess: [
      {
        step: '1. Written Examination (CDS OTA) / Direct SSB Shortlisting',
        desc: 'Candidates appear for UPSC CDS OTA paper (200 marks) or apply directly for SSC Tech/NCC/JAG based on degree marks.'
      },
      {
        step: '2. 5-Day SSB Interview (Bhopal, Bangalore, Prayagraj, Kapurthala)',
        desc: 'Evaluation across Intelligence tests, Psych battery, Outdoor tasks, Command tasks, and Personal interviews.'
      },
      {
        step: '3. Specialist Medical Board (SMB)',
        desc: 'Complete medical, orthopedic, and ophthalmic verification at Command Hospitals.'
      },
      {
        step: '4. Final All India Merit List & Academy Reporting',
        desc: 'Merit list declared for Men and Women batches for April and October academy sessions.'
      }
    ],
    trainingDetails: {
      duration: '49 Weeks (Two Terms: Junior Term 23 Weeks, Senior Term 26 Weeks)',
      academicStreams: 'Military Technology, Defense Studies, Tactical Law, Cyber Warfare & Counter-Insurgency Ops',
      militarySubjects: 'Field Craft, Battle Drills, Close Quarter Battle (CQB), Radio Comms, Weapon Handling (Insas, AK, Pistol, LMG)',
      outdoorCamps: [
        { name: 'Camp Praneta (Junior Term)', focus: 'Section drills, bivouac survival, endurance route marches, night navigation' },
        { name: 'Camp Trishul (Senior Term)', focus: 'Platoon tactical attacks, defensive operations, ambushes, and riverine crossings' },
        { name: 'Camp Josh (Pre-POP)', focus: 'Final 40km speed endurance march, live firing battle runs, and combat survival' }
      ],
      physicalStandards: '5km running tests, obstacle courses, BPET (Battle Physical Efficiency Test), PPT (Physical Proficiency Test), swimming.'
    },
    lifeAndFacilities: {
      squadrons: 'Organized into Two Battalions: Shivaji Battalion (comprising Kohima, Jessami, and Meiktila Companies) and Ranjit Singh Battalion (comprising Alamein, Phillora, and Zojila Companies).',
      facilities: [
        'Sprawling Parameswaran Drill Square, Vikram Batra Mess, and Officers Club.',
        'State-of-the-art weapon simulation complex, tactical gymnasiums, and synthetic athletics track.',
        'Equestrian riding school, obstacle training grounds, and indoor shooting ranges.',
        'High-bandwidth digital learning center and multimedia defense warfare halls.'
      ],
      traditions: 'The stirring Pipping Ceremony on the lawns, presentation of the Sword of Honour to the best all-round cadet, and the final march across the Antim Pag.'
    },
    careerCommission: {
      initialRank: 'Lieutenant (Indian Army)',
      payScale: 'Level 10 (₹56,100 - ₹1,77,500) + MSP ₹15,500/month',
      perks: 'Tenure of 10 years extendable to 14 years. Opportunities for Permanent Commission grant, UN Peacekeeping missions, defense pension (if converted to PC), or ex-servicemen resettlement into premier corporate roles.'
    }
  }
];
