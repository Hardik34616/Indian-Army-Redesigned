/* ==========================================================================
   MOCK DATA REPOSITORY - JOIN INDIAN ARMY REDESIGN
   ========================================================================== */

export const OPPORTUNITIES = [
  {
    id: 'officers-entry',
    category: 'officer',
    title: 'Officers Entry',
    badge: 'Permanent & Short Service Commission',
    tagline: 'Lead as a Commissioned Officer with strategic leadership and supreme honour.',
    description: 'Join as an Officer in the Indian Army through UPSC exams or direct technical and service entries. Lead combat units, artillery batteries, armoured regiments, signals, engineering battalions, and aviation wings.',
    image: '/assets/card-officer-entry.jpg',
    gender: 'Both (Men & Women)',
    ageLimit: '16.5 - 27 Years (Entry Dependent)',
    qualification: '10+2 / Graduate / B.Tech / Law / Medical',
    trainingAcademy: 'Indian Military Academy (IMA), Dehradun / Officers Training Academy (OTA), Chennai / NDA, Pune',
    serviceType: 'Permanent Commission (PC) / Short Service Commission (SSC)',
    eligibilityCriteria: [
      'Indian citizen with the required age for the selected entry',
      '10+2, graduation, engineering, law or medical qualification as specified',
      'Medically fit and able to meet the prescribed SSB / physical standards'
    ],
    salary: 'Level 10 (₹56,100 - ₹1,77,500) + MSP ₹15,500/month',
    entries: [
      {
        name: 'NDA (National Defence Academy)',
        exam: 'UPSC NDA Exam (Twice a year)',
        age: '16.5 - 19.5 Years',
        edu: '10+2 Pass (PCM for Air Force/Navy, Any stream for Army)',
        duration: '3 Years NDA + 1 Year IMA',
        link: '/find-entry?entry=nda'
      },
      {
        name: 'CDS (Combined Defence Services)',
        exam: 'UPSC CDS Exam (IMA/OTA)',
        age: '19 - 24 (IMA) / 19 - 25 (OTA)',
        edu: 'Graduation in any discipline',
        duration: '1.5 Years (IMA) / 49 Weeks (OTA)',
        link: '/find-entry?entry=cds'
      },
      {
        name: 'TGC (Technical Graduate Course)',
        exam: 'Direct SSB Interview (No written exam)',
        age: '20 - 27 Years',
        edu: 'BE / B.Tech (Engineering stream)',
        duration: '1 Year at IMA Dehradun',
        link: '/find-entry?entry=tgc'
      },
      {
        name: 'SSC Tech (Men & Women)',
        exam: 'Direct SSB (Short Service Commission)',
        age: '20 - 27 Years',
        edu: 'Engineering Degree',
        duration: '49 Weeks at OTA Chennai',
        link: '/find-entry?entry=ssc-tech'
      },
      {
        name: 'NCC Special Entry Scheme',
        exam: 'Direct SSB for NCC \'C\' Certificate holders',
        age: '19 - 25 Years',
        edu: 'Graduation with min 50% + NCC \'C\' Cert',
        duration: '49 Weeks at OTA Chennai',
        link: '/find-entry?entry=ncc'
      },
      {
        name: 'JAG (Judge Advocate General)',
        exam: 'Direct SSB for Law Graduates',
        age: '21 - 27 Years',
        edu: 'LLB Degree (min 55%) + CLAT PG score',
        duration: '49 Weeks at OTA Chennai',
        link: '/find-entry?entry=jag'
      }
    ]
  },
  {
    id: 'jco-or-enrolment',
    category: 'jco',
    title: 'JCO / OR Enrolment',
    badge: 'Combat Backbone of the Army',
    tagline: 'Enlist as Junior Commissioned Officer or Other Ranks across specialized combat arms and services.',
    description: 'Junior Commissioned Officers (JCOs) and Other Ranks (ORs) form the unyielding frontline strength of the Indian Army across Infantry, Armoured, Artillery, Signals, Engineers, and Ordnance corps.',
    image: '/assets/card-jco-enrolment.jpg',
    gender: 'Male / Female (Specific Trades)',
    ageLimit: '17.5 - 25 Years',
    qualification: '10th / 12th / Diploma / B.Sc',
    trainingAcademy: 'Regimental Training Centres (across India)',
    serviceType: 'Regular Service (Color Service 15-20 Years)',
    eligibilityCriteria: [
      'Indian citizen within the age bracket of the selected trade',
      '10th, 12th, diploma or degree qualification as required by the trade',
      'Must qualify the physical fitness, medical and Common Entrance Exam stages'
    ],
    salary: 'Pay Level 3 to Level 8 + Military Service Pay (MSP)',
    entries: [
      {
        name: 'Soldier Technical Nursing Assistant (NA)',
        exam: 'Online CEE + Physical Rally',
        age: '17.5 - 23 Years',
        edu: '10+2 with Physics, Chemistry, Biology & English (min 50%)',
        duration: 'Basic Military Training + AMC School',
        link: '/find-entry?entry=nursing'
      },
      {
        name: 'Havildar (Surveyor Auto Cartographer)',
        exam: 'Online CEE + Physical + Interview',
        age: '20 - 25 Years',
        edu: 'BA / B.Sc with Mathematics / BE / B.Tech',
        duration: 'Regimental Center & CME Pune',
        link: '/find-entry?entry=havildar-surveyor'
      },
      {
        name: 'Religious Teacher (Junior Commissioned Officer)',
        exam: 'Written Test + Interview',
        age: '25 - 36 Years',
        edu: 'Graduation + Theological qualification (Pandit, Maulvi, Granthi, Priest)',
        duration: 'AEC Training College & Centre, Pachmarhi',
        link: '/find-entry?entry=jco-rt'
      },
      {
        name: 'Havildar (Education Corps)',
        exam: 'Written + Physical + Interview',
        age: '20 - 25 Years',
        edu: 'Post Graduate / Graduate in Science/Arts/MCA/B.Ed',
        duration: 'AEC Centre Pachmarhi',
        link: '/find-entry?entry=havildar-education'
      }
    ]
  },
  {
    id: 'agnipath-scheme',
    category: 'agnipath',
    title: 'Agnipath Scheme',
    badge: 'Transformative 4-Year Service',
    tagline: 'Serve the nation with Agnipath. A chance to be the change and emerge as a skilled Agniveer.',
    description: 'A transformative human resource policy offering passionate Indian youth the opportunity to serve in the armed forces for 4 years, develop elite skills, instill discipline, and receive the Seva Nidhi financial package with 25% permanent absorption.',
    image: '/assets/card-agnipath-scheme.jpg',
    gender: 'Both (Men & Women)',
    ageLimit: '17.5 - 21 Years',
    qualification: '8th / 10th / 10+2 (All Streams)',
    trainingAcademy: 'Respective Regimental Centres (6 Months Military Training)',
    serviceType: '4 Years Specialized Agnipath Tenure',
    eligibilityCriteria: [
      'Unmarried Indian citizen within the notified Agniveer age range',
      'Minimum 8th, 10th or 10+2 qualification depending on the trade',
      'Must meet trade-wise marks, physical fitness and medical standards'
    ],
    salary: '₹30,000 - ₹40,000/month + Seva Nidhi Package (₹11.71 Lakh Tax-Free)',
    entries: [
      {
        name: 'Agniveer (General Duty) - All Arms',
        exam: 'Online CEE + Physical Fitness Test (PFT)',
        age: '17.5 - 21 Years',
        edu: 'Class 10th / Matric with 45% marks in aggregate & 33% in each subject',
        duration: '6 months training + 3.5 yrs active service',
        link: '/find-entry?entry=agniveer-gd'
      },
      {
        name: 'Agniveer (Technical) - Aviation / Artillery / Tech',
        exam: 'Online CEE + PFT',
        age: '17.5 - 21 Years',
        edu: '10+2 with Science (PCM) and English with min 50% aggregate & 40% in each subject',
        duration: '6 months training + 3.5 yrs active service',
        link: '/find-entry?entry=agniveer-tech'
      },
      {
        name: 'Agniveer (Clerk / Store Keeper Technical)',
        exam: 'Online CEE (with Typing Test) + PFT',
        age: '17.5 - 21 Years',
        edu: '10+2 in Arts/Commerce/Science with 60% aggregate & min 50% in English and Maths/Accounts',
        duration: '6 months training + 3.5 yrs active service',
        link: '/find-entry?entry=agniveer-clerk'
      },
      {
        name: 'Agniveer (Tradesmen) 10th & 8th Pass',
        exam: 'Online CEE + PFT',
        age: '17.5 - 21 Years',
        edu: 'Class 10th / 8th Simple Pass with min 33% in each subject',
        duration: '6 months training + 3.5 yrs active service',
        link: '/find-entry?entry=agniveer-tradesmen'
      },
      {
        name: 'Agniveer Women (Corps of Military Police)',
        exam: 'Online CEE + PFT (Women specific standards)',
        age: '17.5 - 21 Years',
        edu: 'Class 10th / Matric with 45% marks in aggregate & 33% each subject',
        duration: 'CMP Centre & School, Bangalore',
        link: '/find-entry?entry=agniveer-women-cmp'
      }
    ]
  },
  {
    id: 'territorial-army',
    category: 'ta',
    title: 'Territorial Army',
    badge: 'Citizens in Uniform',
    tagline: 'Serve voluntarily in uniform while pursuing your civilian profession and corporate career.',
    description: 'The Territorial Army (TA) is part of the regular Indian Army. Its role is to relieve the regular Army from static duties and assist civil administration in natural disasters and maintaining essential services, allowing civilian professionals to serve part-time.',
    image: '/assets/card-territorial-army.jpg',
    gender: 'Both (Men & Women)',
    ageLimit: '18 - 42 Years',
    qualification: 'Graduate from any recognized University',
    trainingAcademy: 'TA Regimental Training Centres / OTA',
    serviceType: 'Part-Time Military Service (Embedded with civilian profession)',
    eligibilityCriteria: [
      'Indian citizen aged 18 to 42 years at the time of application',
      'Graduate from a recognised university and gainfully employed',
      'Must be physically and medically fit for Territorial Army service'
    ],
    salary: 'Same Pay & Allowances as Regular Army for embodiment days',
    entries: [
      {
        name: 'Territorial Army Officer (Non-Departmental)',
        exam: 'PIB Interview + SSB + Medical Board',
        age: '18 - 42 Years',
        edu: 'Graduate from recognized university, Gainfully Employed in civil occupation',
        duration: '1 Month basic training in 1st year + 2 months annual training camp',
        link: '/find-entry?entry=ta-officer'
      },
      {
        name: 'Territorial Army (Cyber Specialist Officers)',
        exam: 'Technical Interview + SSB for Cyber experts',
        age: '18 - 42 Years',
        edu: 'B.Tech/BE/MCA in IT/Computer Science/Cyber Security with industry experience',
        duration: 'Specialized embodyment camps',
        link: '/find-entry?entry=ta-cyber'
      },
      {
        name: 'Ecological Task Force (Ex-Servicemen & Civilians)',
        exam: 'Direct enrolment for specialized afforestation & ecological restoration',
        age: '18 - 45 Years',
        edu: '10th Pass / Ex-Servicemen',
        duration: 'Continuous project deployments',
        link: '/find-entry?entry=ta-ecological'
      }
    ]
  }
];

export const RECRUITMENT_RALLIES = [
  {
    id: 'ral-2026-01',
    zone: 'HQ Rtg Zone Ambala',
    location: 'Khadga Sports Complex, Ambala Cantt (Haryana)',
    districts: 'Ambala, Kaithal, Karnal, Kurukshetra, Yamunanagar, Panchkula, Chandigarh',
    category: 'Agniveer GD, Tech, Clerk & Tradesmen',
    registrationWindow: '01 Feb 2026 - 15 Mar 2026',
    rallyDates: '12 May 2026 - 28 May 2026',
    ceeDate: '22 Apr 2026',
    status: 'Registration Active',
    statusType: 'active',
    pdfUrl: '#'
  },
  {
    id: 'ral-2026-02',
    zone: 'HQ Rtg Zone Lucknow',
    location: 'Cantonment Stadium, Varanasi (Uttar Pradesh)',
    districts: 'Varanasi, Gorakhpur, Azamgarh, Ghazipur, Ballia, Jaunpur, Deoria',
    category: 'Agniveer GD & Tech (All Arms)',
    registrationWindow: '10 Feb 2026 - 22 Mar 2026',
    rallyDates: '04 Jun 2026 - 20 Jun 2026',
    ceeDate: '26 Apr 2026',
    status: 'Registration Active',
    statusType: 'active',
    pdfUrl: '#'
  },
  {
    id: 'ral-2026-03',
    zone: 'HQ Rtg Zone Pune',
    location: 'Bombay Sappers Ground, Pune (Maharashtra & Goa)',
    districts: 'Pune, Satara, Sangli, Kolhapur, Solapur, Ratnagiri, Sindhudurg, North Goa, South Goa',
    category: 'Agniveer All Categories & Nursing Assistant',
    registrationWindow: '15 Jan 2026 - 28 Feb 2026',
    rallyDates: '10 Apr 2026 - 25 Apr 2026',
    ceeDate: '15 Mar 2026',
    status: 'Admit Card Live',
    statusType: 'admit-card',
    pdfUrl: '#'
  },
  {
    id: 'ral-2026-04',
    zone: 'HQ Rtg Zone Jalandhar',
    location: 'Guru Gobind Singh Stadium, Jalandhar (Punjab & J&K)',
    districts: 'Jalandhar, Kapurthala, Hoshiarpur, SBS Nagar, Amritsar, Gurdaspur',
    category: 'Agniveer GD, Tech, Clerk / SKT',
    registrationWindow: '01 Mar 2026 - 10 Apr 2026',
    rallyDates: '15 Jul 2026 - 30 Jul 2026',
    ceeDate: '28 May 2026',
    status: 'Upcoming',
    statusType: 'upcoming',
    pdfUrl: '#'
  },
  {
    id: 'ral-2026-05',
    zone: 'HQ Rtg Zone Bangalore',
    location: 'ASC Centre & College South, Bengaluru (Karnataka & Kerala)',
    districts: 'Bangalore Urban, Bangalore Rural, Kolar, Mandya, Mysuru, Tumakuru, Ramanagara',
    category: 'Agniveer GD, Clerk, Tradesmen & Women CMP',
    registrationWindow: '18 Jan 2026 - 05 Mar 2026',
    rallyDates: '18 Apr 2026 - 02 May 2026',
    ceeDate: '20 Mar 2026',
    status: 'Admit Card Live',
    statusType: 'admit-card',
    pdfUrl: '#'
  },
  {
    id: 'ral-2026-06',
    zone: 'HQ Rtg Zone Kolkata',
    location: 'Army Camp Ground, Siliguri (West Bengal & Sikkim)',
    districts: 'Darjeeling, Kalimpong, Jalpaiguri, Cooch Behar, Alipurduar, East Sikkim, North Sikkim',
    category: 'Agniveer GD, Tech & Sepoy Pharma',
    registrationWindow: '05 Mar 2026 - 20 Apr 2026',
    rallyDates: '10 Aug 2026 - 24 Aug 2026',
    ceeDate: '10 Jun 2026',
    status: 'Upcoming',
    statusType: 'upcoming',
    pdfUrl: '#'
  },
  {
    id: 'ral-2026-07',
    zone: 'HQ Rtg Zone Danapur',
    location: 'Mithilesh Stadium, Patna / Danapur Cantt (Bihar & Jharkhand)',
    districts: 'Patna, Bhojpur, Buxar, Rohtas, Kaimur, Nalanda, Nawada, Ranchi, Dhanbad',
    category: 'Agniveer General Duty & Technical',
    registrationWindow: '01 Feb 2026 - 18 Mar 2026',
    rallyDates: '22 May 2026 - 08 Jun 2026',
    ceeDate: '25 Apr 2026',
    status: 'Registration Active',
    statusType: 'active',
    pdfUrl: '#'
  },
  {
    id: 'ral-2026-08',
    zone: 'HQ Rtg Zone Shillong',
    location: 'Narangi Military Station, Guwahati (Assam & NE States)',
    districts: 'Kamrup Metro, Kamrup Rural, Nagaon, Morigaon, Goalpara, Darrang',
    category: 'Agniveer All Trades & Religious Teachers',
    registrationWindow: '20 Feb 2026 - 30 Mar 2026',
    rallyDates: '15 Jun 2026 - 29 Jun 2026',
    ceeDate: '02 May 2026',
    status: 'Registration Active',
    statusType: 'active',
    pdfUrl: '#'
  }
];

export const HISTORIC_OPERATIONS = [
  {
    id: 'op-vijay',
    name: 'Operation Vijay (1999)',
    year: '1999',
    theatre: 'Kargil, Dras & Batalik Sectors (Jammu & Kashmir)',
    image: '/assets/operation-vijay.png',
    badge: 'Kargil Triumph',
    summary: 'The eviction of Pakistani intrusions across the Line of Control at high altitudes reaching up to 18,000 feet. A masterclass in high-altitude mountain warfare, artillery firepower, and infantry valour.',
    keyHighlights: [
      'Recapture of strategically vital peaks: Tiger Hill, Tololing, Point 4875 and Jubar Heights.',
      'Awarded 4 Param Vir Chakras: Capt Vikram Batra, Lt Manoj Kumar Pandey, Grenadier Yogendra Singh Yadav, and Rifleman Sanjay Kumar.',
      'Showcased unmatched bravery of young officers leading from the front in sub-zero vertical rock faces.'
    ]
  },
  {
    id: 'op-meghdoot',
    name: 'Operation Meghdoot (1984)',
    year: '1984',
    theatre: 'Siachen Glacier, Karakoram Range',
    image: '/assets/operation-meghdoot.png',
    badge: 'Highest Battlefield on Earth',
    summary: 'A preemptive military operation to secure the Siachen Glacier and dominating peaks on the Saltoro Ridge, establishing permanent Indian control over the highest combat zone in the world.',
    keyHighlights: [
      'Airlifted troops onto uncharted glaciated peaks at altitudes ranging from 17,000 to 22,000 feet.',
      'Secured key mountain passes: Sia La, Bilafond La, and Gyong La.',
      'Developed legendary high-altitude survival doctrine and extreme cold weather warfare capabilities.'
    ]
  },
  {
    id: 'op-cactus',
    name: 'Operation Cactus (1988)',
    year: '1988',
    theatre: 'Malé, Republic of Maldives',
    image: '/assets/operation-cactus.png',
    badge: 'Airborne Intervention',
    summary: 'A swift, decisive combined airborne and naval intervention by the Indian Armed Forces within 12 hours of distress call from Maldivian President Maumoon Abdul Gayoom to thwart a mercenary coup.',
    keyHighlights: [
      '50th Independent Parachute Brigade airlifted non-stop from Agra to Hulhulé Airport.',
      'Restored sovereign democratic control of Maldives without a single civilian casualty.',
      'Earned worldwide praise for India’s swift rapid-reaction force capabilities in the Indian Ocean.'
    ]
  },
  {
    id: 'op-rahat',
    name: 'Operation Rahat (2013)',
    year: '2013',
    theatre: 'Kedarnath Valley, Uttarakhand',
    image: '/assets/operation-rahat.png',
    badge: 'Largest Humanitarian Rescue',
    summary: 'The world\'s largest civilian rescue operation launched by the Indian Armed Forces and NDRF following catastrophic cloudbursts and flash floods across Uttarakhand, saving over 100,000 pilgrims.',
    keyHighlights: [
      'Indian Army special forces and infantry constructed emergency footbridges and rope bridges across raging torrents.',
      'Aviation helicopters flew round-the-clock sorties in adverse fog and razor-sharp mountain gorges.',
      'Demonstrated selfless service, providing medical relief, emergency rations, and shelter to stranded citizens.'
    ]
  },
  {
    id: 'op-pawan',
    name: 'Operation Pawan (1987)',
    year: '1987',
    theatre: 'Northern and Eastern Sri Lanka',
    image: '/assets/operation-pawan.png',
    badge: 'Peacekeeping Mission',
    summary: 'Indian Peace Keeping Force (IPKF) operations to enforce the Indo-Sri Lanka Accord, demilitarize militant factions, and safeguard civilian populations in the Jaffna Peninsula.',
    keyHighlights: [
      'Heliborne operations into the Jaffna University campus under heavy hostile fire.',
      'Bravery of the Parachute Regiments, Guards, and Sikh Light Infantry under complex urban guerrilla conditions.',
      'Maj Ramaswamy Parameswaran awarded the Param Vir Chakra for exceptional courage.'
    ]
  },
  {
    id: 'op-relief',
    name: 'HADR & Disaster Assistance',
    year: 'Ongoing',
    theatre: 'National & Global Humanitarian Missions',
    image: '/assets/operation-relief.png',
    badge: 'First Responders to the Nation',
    summary: 'Whenever catastrophe strikes—whether floods, earthquakes, tsunamis, or international crises—the Indian Army stands as the bedrock of humanitarian assistance and disaster relief (HADR).',
    keyHighlights: [
      'Operation Dost (Turkey & Syria Earthquake 2023): Field hospitals deployed within 48 hours.',
      'Domestic flood and cyclone rescues in Assam, Kerala, Gujarat, and Odisha.',
      'UN Peacekeeping Missions across Africa and the Middle East, spreading Indian values of peace.'
    ]
  }
];

export const SELECTION_STAGES = [
  {
    step: '01',
    title: 'Online Application & Aadhaar Verification',
    duration: '30-45 Days Window',
    icon: 'FileText',
    desc: 'Candidates register on the official portal, verify credentials via Digilocker/Aadhaar biometric integration, fill educational qualifications, and choose examination center preferences.'
  },
  {
    step: '02',
    title: 'Computer Based Common Entrance Exam (CEE) / UPSC',
    duration: 'Computer Based Test across 176+ Cities',
    icon: 'Monitor',
    desc: 'Objective testing covering General Knowledge, Science, Mathematics, English, and Specialized Trade Aptitude. Instant answer key challenge mechanism and transparent normalization.'
  },
  {
    step: '03',
    title: 'Physical Fitness Test (PFT) & PMT Rally',
    duration: 'At Zonal Recruiting Grounds',
    icon: 'Activity',
    desc: '1.6 km Run (Group I: Under 5 min 30 sec / Group II: Under 5 min 45 sec), Beam Pull-ups (10 for max 40 marks), 9 Feet Ditch Jump, and Zig-Zag Balance beam test.'
  },
  {
    step: '04',
    title: 'Services Selection Board (SSB) / Adaptability Test',
    duration: '5-Day SSB for Officers / Adaptability Test for Agniveers',
    icon: 'Users',
    desc: 'Psychological battery tests, Group Testing Officer (GTO) obstacle tasks, Personal Interview, and Final Board Conference assessing 15 Officer Like Qualities (OLQs).'
  },
  {
    step: '05',
    title: 'Specialist Medical Board Examination (SMB)',
    duration: 'At Military Hospitals (MH / CH)',
    icon: 'HeartPulse',
    desc: 'Rigorous assessment of vision, hearing, surgical parameters, dental points, blood/urine biochemistry, and physical health by specialized Armed Forces medical officers.'
  },
  {
    step: '06',
    title: 'All India Merit List & Academy Allotment',
    duration: 'Final Joining Call Letter',
    icon: 'Award',
    desc: 'Consolidated merit rankings based on written marks and rally performance. Successful candidates report to IMA Dehradun, OTA Chennai, NDA Pune, or Regimental Training Centres.'
  }
];

export const FAQS = [
  {
    category: 'Agnipath',
    q: 'What is the educational eligibility for Agniveer (General Duty)?',
    a: 'Candidates must have passed Class 10th/Matric with 45% marks in aggregate and 33% in each individual subject. For boards following a grading system, minimum of D Grade (33-40%) in each subject and aggregate score equivalent to 45% is mandatory.'
  },
  {
    category: 'Agnipath',
    q: 'What financial package and benefits are provided to Agniveers upon completion of 4 years?',
    a: 'On completion of 4 years, Agniveers receive a one-time "Seva Nidhi" package of approximately ₹11.71 Lakh (tax-free), which includes their accumulated corpus plus equal matching contribution from the Government with interest. Additionally, they receive an Agniveer Skill Certificate and priority in CAPFs, State Police, and PSUs.'
  },
  {
    category: 'Officers',
    q: 'Can female candidates apply for National Defence Academy (NDA) and CDS?',
    a: 'Yes! Women candidates are fully eligible to apply for the NDA & NA examination conducted by UPSC, as well as the Combined Defence Services (CDS) examination for Officers Training Academy (OTA) Chennai, leading to Short Service and Permanent Commission opportunities.'
  },
  {
    category: 'Selection',
    q: 'What is the Physical Fitness Test (PFT) criteria for Agniveer recruitment rallies?',
    a: 'The PFT consists of: 1) 1.6 km Run — Group I: Completed in up to 5 min 30 sec (60 Marks), Group II: 5 min 31 sec to 5 min 45 sec (48 Marks); 2) Beam (Pull Ups) — 10 pull-ups (40 Marks), 9 pull-ups (33 Marks), down to 6 pull-ups (16 Marks); 3) 9 Feet Ditch — Qualifying; 4) Zig-Zag Balance — Qualifying.'
  },
  {
    category: 'Admit Card',
    q: 'How will I receive my Admit Card for the Online CEE Exam and Rally?',
    a: 'Admit cards are generated 10-15 days prior to the examination date. Candidates receive an SMS and email notification, and can download the color admit card by logging into their candidate dashboard using their Registered Email ID & Password or Application Roll Number.'
  },
  {
    category: 'General',
    q: 'Is there any registration fee for joining the Indian Army as an Agniveer or Officer?',
    a: 'For Agniveer online CEE registration, an examination processing fee of ₹250 + bank charges is applicable. For UPSC NDA/CDS entries, UPSC examination rules apply. Beware of touts and fraudulent agents—Army recruitment is 100% transparent and merit-based.'
  }
];

export const MOCK_APPLICATIONS = [
  {
    id: 'IA-2026-68901',
    candidateName: 'Hardik Yash Raj',
    dob: '2001-08-14',
    category: 'Officers Entry',
    entryName: 'Officers Entry',
    appliedDate: '26 Aug 2026',
    currentStatus: 'Application Submitted - Under Initial Scrutiny',
    statusStage: 1,
    centerAllotted: 'Ambala Examination Centre',
    reportingDate: 'Admit card will be issued post initial scrutiny',
    rollNumber: 'OFF/2026/68901',
    admitCardReady: false,
    steps: [
      { name: 'Application Submitted', date: '26 Aug 2026', done: true },
      { name: 'Document Verification', date: 'In Scrutiny', done: false },
      { name: 'Admit Card Release', date: 'Pending', done: false },
      { name: 'UPSC / CEE Exam', date: 'Pending', done: false },
      { name: 'SSB Interview', date: 'Pending', done: false },
      { name: 'Final Merit List', date: 'Pending', done: false }
    ]
  },
  {
    id: 'IA-2026-98421',
    candidateName: 'Hardik Yash Raj',
    dob: '2001-08-14',
    category: 'Officers Entry',
    entryName: 'TGC-141 (Technical Graduate Course)',
    appliedDate: '12 Jan 2026',
    currentStatus: 'SSB Interview Scheduled',
    statusStage: 4,
    centerAllotted: '17 SSB Selection Centre Central, Bhopal (Madhya Pradesh)',
    reportingDate: '18 Apr 2026 (06:00 AM)',
    rollNumber: 'TGC141/2026/88921',
    admitCardReady: true,
    steps: [
      { name: 'Application Submitted', date: '12 Jan 2026', done: true },
      { name: 'Documents Verified & Scrutinized', date: '28 Jan 2026', done: true },
      { name: 'Cut-off Qualified (82.4% B.Tech Mech)', date: '15 Feb 2026', done: true },
      { name: 'SSB Interview Call Letter Issued', date: '25 Feb 2026', done: true },
      { name: 'Specialist Medical Board (SMB)', date: 'Pending SSB Result', done: false },
      { name: 'Final Merit List & Academy Allotment', date: 'Pending', done: false }
    ]
  },
  {
    id: 'IA-2026-44102',
    candidateName: 'Hardik Yash Raj',
    dob: '2001-08-14',
    category: 'Agnipath Scheme',
    entryName: 'Agniveer (General Duty) - All Arms',
    appliedDate: '04 Feb 2026',
    currentStatus: 'Online CEE Cleared - PFT Rally Scheduled',
    statusStage: 3,
    centerAllotted: 'Khadga Sports Stadium, Ambala Cantt',
    reportingDate: '14 May 2026 (04:30 AM)',
    rollNumber: 'AMB/HAR/GD/2026/44102',
    admitCardReady: true,
    steps: [
      { name: 'Aadhaar Verified Registration', date: '04 Feb 2026', done: true },
      { name: 'Online CEE Exam (Score: 88/100)', date: '22 Feb 2026', done: true },
      { name: 'Shortlisted for Physical Rally', date: '01 Mar 2026', done: true },
      { name: 'Physical Fitness Test (1.6 km + Beam)', date: '14 May 2026', done: false },
      { name: 'Recruitment Medical Examination', date: 'Post PFT', done: false },
      { name: 'Final Regimental Dispatch', date: 'Pending', done: false }
    ]
  },
  {
    id: 'IA-2026-11893',
    candidateName: 'Hardik Yash Raj',
    dob: '2001-08-14',
    category: 'Officers Entry',
    entryName: 'CDS II - OTA (Women Non-Tech)',
    appliedDate: '18 Feb 2026',
    currentStatus: 'Written Exam Qualified - SSB Call Awaited',
    statusStage: 3,
    centerAllotted: 'Selection Centre South, Bangalore',
    reportingDate: 'Awaited from UPSC/Dte Gen Rtg',
    rollNumber: 'CDS2026/W/11893',
    admitCardReady: false,
    steps: [
      { name: 'UPSC CDS II Online Form', date: '18 Feb 2026', done: true },
      { name: 'UPSC Written Exam', date: 'Qualified (Merit List)', done: true },
      { name: 'Dte Gen Rtg Registration Completed', date: '05 Mar 2026', done: true },
      { name: 'SSB Date Allotment Selection', date: 'Window opening shortly', done: false },
      { name: 'Medical Board Examination', date: 'Pending', done: false },
      { name: 'OTA Joining Order', date: 'Pending', done: false }
    ]
  }
];

export const MOCK_RESULTS = [
  {
    id: 'res-01',
    title: 'Common Entrance Exam (CEE) 2026 - Agniveer GD & Tech Batch 01/2026 Merit List',
    date: '28 Feb 2026',
    category: 'Agnipath Scheme',
    zone: 'All Recruiting Zones (Pan-India)',
    cutOff: 'General Duty: 64 Marks | Technical: 72 Marks',
    downloadUrl: '#'
  },
  {
    id: 'res-02',
    title: 'TGC-141 Final Merit List - Indian Military Academy (IMA) Course Commencing Jul 2026',
    date: '20 Feb 2026',
    category: 'Officers Entry',
    zone: 'Dte Gen of Recruiting, New Delhi',
    cutOff: 'Mechanical: 79% | Civil: 77% | CS/IT: 81%',
    downloadUrl: '#'
  },
  {
    id: 'res-03',
    title: 'Soldier Nursing Assistant (AMC) Final Enrolment Selection List - ZRO Pune & Danapur',
    date: '14 Feb 2026',
    category: 'JCO / OR Entry',
    zone: 'ZRO Pune & Danapur',
    cutOff: 'Aggregate Merit: 142/200',
    downloadUrl: '#'
  },
  {
    id: 'res-04',
    title: 'Agniveer Women (Corps of Military Police) CEE Result & Shortlisted Candidates for Rally',
    date: '02 Feb 2026',
    category: 'Women Enrolment',
    zone: 'HQ Rtg Zone Bangalore & Ambala',
    cutOff: '10th Cut-off: 76% aggregate',
    downloadUrl: '#'
  }
];

export const ZRO_DIRECTORIES = [
  {
    name: 'HQ Rtg Zone Ambala',
    states: 'Haryana, Himachal Pradesh, Chandigarh (UT)',
    address: 'HQ Recruiting Zone, 14, Staff Road, Ambala Cantt - 133001',
    phone: '0171-2600269',
    email: 'zroambala-army@nic.in'
  },
  {
    name: 'HQ Rtg Zone Bangalore',
    states: 'Karnataka, Kerala, Lakshadweep (UT)',
    address: 'HQ Recruiting Zone, 148, Field Marshal KM Cariappa Rd, Bangalore - 560025',
    phone: '080-25596542',
    email: 'zrobangalore-army@nic.in'
  },
  {
    name: 'HQ Rtg Zone Chennai',
    states: 'Tamil Nadu, Andhra Pradesh, Telangana, Puducherry, A&N Islands',
    address: 'HQ Recruiting Zone, Fort St George, Chennai - 600009',
    phone: '044-25674924',
    email: 'zrochennai-army@nic.in'
  },
  {
    name: 'HQ Rtg Zone Danapur',
    states: 'Bihar, Jharkhand',
    address: 'HQ Recruiting Zone, Danapur Cantt, Patna - 801503',
    phone: '06115-227224',
    email: 'zrodanapur-army@nic.in'
  },
  {
    name: 'HQ Rtg Zone Jalandhar',
    states: 'Punjab, Jammu & Kashmir, Ladakh (UT)',
    address: 'HQ Recruiting Zone, Jalandhar Cantt - 144005',
    phone: '0181-2266005',
    email: 'zrojalandhar-army@nic.in'
  },
  {
    name: 'HQ Rtg Zone Kolkata',
    states: 'West Bengal, Odisha, Sikkim',
    address: 'HQ Recruiting Zone, 1, Gokhale Road, Kolkata - 700020',
    phone: '033-22237042',
    email: 'zrokolkata-army@nic.in'
  },
  {
    name: 'HQ Rtg Zone Lucknow',
    states: 'Uttar Pradesh, Uttarakhand',
    address: 'HQ Recruiting Zone, 236, Mahatma Gandhi Marg, Lucknow - 226002',
    phone: '0522-2292900',
    email: 'zrolucknow-army@nic.in'
  },
  {
    name: 'HQ Rtg Zone Pune',
    states: 'Maharashtra, Gujarat, Goa, Daman & Diu, Dadra & Nagar Haveli',
    address: 'HQ Recruiting Zone, Pune Cantt - 411001',
    phone: '020-26345005',
    email: 'zropune-army@nic.in'
  },
  {
    name: 'HQ Rtg Zone Shillong',
    states: 'Assam, Meghalaya, Arunachal Pradesh, Nagaland, Manipur, Mizoram, Tripura',
    address: 'HQ Recruiting Zone, HQ 101 Area, Shillong - 793005',
    phone: '0364-2504177',
    email: 'zroshillong-army@nic.in'
  }
];

export const MOCK_SSB_HISTORY = [
  {
    id: 'SSB-2025-04',
    entryName: 'TGC-140 (Technical Graduate Course)',
    entryType: 'Direct Technical Officers Entry',
    boardName: '33 SSB, Selection Centre Central, Bhopal',
    batchNo: 'TG-140/1029',
    chestNo: '23',
    dateRange: '15 Jul 2025 - 19 Jul 2025',
    callLetterNo: 'SCC/TGC140/2025/1029',
    resultStatus: 'Conference Out (Stage-II)',
    resultType: 'conference-out', // 'recommended', 'conference-out', 'screened-out', 'medical-out'
    stage1Result: 'Screened-In (OIR Rating: 1, PPDT Cleared)',
    stage2Result: 'Completed (Psychology, 9 GTO Tasks & Interview)',
    conferenceResult: 'Not Recommended at Final Conference',
    reportingVenue: 'Sultania Infantry Lines, Bhopal (MP)',
    dossierDetails: {
      oirRating: 'Grade 1 (94 percentile)',
      ppdtTheme: 'Flood Evacuation and Medical Relief',
      psychologyBattery: 'Completed TAT (12 stories), WAT (60 words), SRT (52 situations), Self Description',
      gtoTasks: 'GD, GPE, PGT, HGT, Snake Race, Lecturette, Individual Obstacles (9 cleared), Command Task, FGT',
      interviewDuration: '55 Minutes with Deputy President',
      remarks: 'Strong analytical skills, commendable physical stamina; advised to further refine group assertiveness.'
    }
  },
  {
    id: 'SSB-2024-03',
    entryName: 'CDS-I 2025 (IMA Dehradun Direct Entry)',
    entryType: 'UPSC CDSE Regular Army Entry',
    boardName: '12 SSB, Selection Centre South, Bangalore',
    batchNo: 'CD-IMA/8812',
    chestNo: '07',
    dateRange: '19 Nov 2024 - 23 Nov 2024',
    callLetterNo: 'SCS/CDSE1/2024/8812',
    resultStatus: 'Recommended by SSB Board',
    resultType: 'recommended',
    stage1Result: 'Screened-In (OIR Rating: 1, PPDT Cleared)',
    stage2Result: 'Qualified with High Merit',
    conferenceResult: 'Recommended on Day 5 Conference (Rank in Batch: 2/34)',
    reportingVenue: 'Cubbon Road, Bangalore Cantt (Karnataka)',
    dossierDetails: {
      oirRating: 'Grade 1 (96 percentile)',
      ppdtTheme: 'Establishment of Solar Microgrid in Remote Village',
      psychologyBattery: 'TAT, WAT (60/60), SRT (56/60), High Officer Like Qualities (OLQ)',
      gtoTasks: 'Command Task (Submersible Bridge Problem - Solved), 10 Obstacles Cleared',
      interviewDuration: '65 Minutes with Board President',
      remarks: 'Clear strategic outlook, robust leadership conviction, exceptional teamwork.'
    }
  },
  {
    id: 'SSB-2024-02',
    entryName: 'TES-48 (10+2 Technical Entry Scheme)',
    entryType: 'Engineering Cadet Entry',
    boardName: '21 SSB, Selection Centre Central, Bhopal',
    batchNo: 'B-TES/3814',
    chestNo: '42',
    dateRange: '06 Mar 2024 (Day 1)',
    callLetterNo: 'SCC/TES48/2024/3814',
    resultStatus: 'Screened Out (Stage-I)',
    resultType: 'screened-out',
    stage1Result: 'OIR: Grade 2, PPDT Group Discussion Screened Out',
    stage2Result: 'Not Eligible (Stage-1 Filtration)',
    conferenceResult: 'Dispatched on Day 1 Afternoon',
    reportingVenue: 'Sultania Infantry Lines, Bhopal (MP)',
    dossierDetails: {
      oirRating: 'Grade 2 (78 percentile)',
      ppdtTheme: 'Accident Response on Highway',
      psychologyBattery: 'Not Reached',
      gtoTasks: 'Not Reached',
      interviewDuration: 'N/A',
      remarks: 'Need more confident narration during Picture Perception and Discussion Test.'
    }
  },
  {
    id: 'SSB-2023-01',
    entryName: 'NDA-148 Course (Army Wing Entry)',
    entryType: 'UPSC NDA & NA Examination',
    boardName: '11 SSB, Selection Centre East, Allahabad (Prayagraj)',
    batchNo: 'D-NDA/4921',
    chestNo: '18',
    dateRange: '14 Oct 2023 - 18 Oct 2023',
    callLetterNo: 'SCE/NDA148/2023/4921',
    resultStatus: 'Conference Out (Stage-II)',
    resultType: 'conference-out',
    stage1Result: 'Screened-In (OIR Rating: 1)',
    stage2Result: 'Completed Full 5-Day Testing',
    conferenceResult: 'Not Recommended at Final Conference',
    reportingVenue: 'Carriappa Road, Allahabad Cantt (UP)',
    dossierDetails: {
      oirRating: 'Grade 1 (91 percentile)',
      ppdtTheme: 'Rural Youth Vocational Training Center Setup',
      psychologyBattery: 'TAT, WAT (58/60), SRT (48/60), Self Description',
      gtoTasks: 'PGT, HGT, Snake Race (Commanding), 8 Obstacles',
      interviewDuration: '50 Minutes with Interviewing Officer',
      remarks: 'Good physical endurance and analytical aptitude; encouraged to gain deeper general awareness.'
    }
  }
];
