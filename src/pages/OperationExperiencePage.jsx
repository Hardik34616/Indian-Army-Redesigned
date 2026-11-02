import React, { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';

const LOCAL_OPERATION_IMAGES = {
  'op-vijay': '/assets/operation-vijay.png',
  'op-meghdoot': '/assets/operation-meghdoot.png',
  'op-cactus': '/assets/operation-cactus.png',
  'op-rahat': '/assets/operation-rahat.png',
  'op-pawan': '/assets/operation-pawan.png',
  'op-relief': '/assets/operation-relief.png'
};

const OPERATION_EXPERIENCES = {
  'op-vijay': {
    label: 'OPERATION VIJAY · 1999',
    title: 'Courage held the heights.',
    intro: 'In the summer of 1999, Indian soldiers climbed towards positions that had been occupied on the Kargil heights. Operation Vijay became a campaign of endurance, artillery coordination and close-quarter courage, fought without crossing the Line of Control.',
    heroStats: [
      { value: '1999', label: 'Kargil conflict' },
      { value: '5,000 m+', label: 'Height of many positions' },
      { value: '26 JUL', label: 'Kargil Vijay Diwas' }
    ],
    slides: [
      {
        eyebrow: 'KARGIL WAR',
        title: 'The heights were',
        highlight: 'never surrendered.',
        location: 'Dras · Kargil · Batalik sectors',
        badge: 'Operation Vijay',
        description: 'The Army fought a determined high-altitude campaign to recapture posts overlooking the Srinagar–Leh highway and restore the sanctity of the Line of Control.',
        image: 'https://images.indianexpress.com/2022/07/kargil-war-2.jpg?w=630',
        source: 'The Indian Express · Kargil archive',
        sourceUrl: 'https://indianexpress.com/photos/india-news/kargil-vijay-diwas-1999-war-india-pakistan-photos-8051793/'
      },
      {
        eyebrow: 'THE LAST ASCENT',
        title: 'Every peak was',
        highlight: 'a promise kept.',
        location: 'Tololing · Tiger Hill · Point 4875',
        badge: 'Recapture and resolve',
        description: 'Approaches were steep, exposed and defended from above. Infantry assaults, accurate artillery and relentless logistics turned isolated ridgelines into a connected road to victory.',
        image: '/assets/operation-vijay.png',
        source: 'Indian Army commemorative visual',
        sourceUrl: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2288840&lang=2&reg=48'
      },
      {
        eyebrow: 'LEGACY OF VALOUR',
        title: 'A generation learned',
        highlight: "what 'front line' means.",
        location: 'Kargil War Memorial · Dras',
        badge: 'Memory in service',
        description: 'Four Param Vir Chakras were awarded for acts of exceptional courage in the conflict. Their stories sit alongside the sacrifice of every soldier who made the victory possible.',
        image: '/assets/operation-vijay.png',
        source: 'Ministry of Defence · Kargil Vijay Diwas',
        sourceUrl: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2148839&lang=2&reg=48'
      }
    ],
    feature: {
      kicker: 'THE CAMPAIGN',
      title: 'Contain. Evict. Deny.',
      text: 'Operation Vijay demanded a clear objective and immense patience. Indian forces contained the intrusion, evicted the occupying forces from the heights and denied any attempt to change the status quo. The Indian Air Force supported the campaign through Operation Safed Sagar while the Navy maintained pressure at sea. Together, the services created the conditions for the Army to retake the ground peak by peak.',
      image: 'https://images.indianexpress.com/2022/07/kargil-war-2.jpg?w=630',
      source: 'The Indian Express · Kargil archive'
    },
    frames: [
      { label: 'TERRAIN', title: 'War above the tree line', text: 'Ridges, cliffs and rare oxygen made every movement a physical and tactical calculation. Soldiers had to climb towards an enemy observing from higher ground.', image: '/assets/operation-vijay.png', source: 'Indian Army commemorative visual' },
      { label: 'FIREPOWER', title: 'Artillery found the impossible angle', text: 'Gunners delivered sustained, accurate fire onto steep positions, helping infantry close the final distance in a battlefield where conventional approaches were unavailable.', image: 'https://images.indianexpress.com/2022/07/kargil-war-2.jpg?w=630', source: 'The Indian Express · Kargil archive' },
      { label: 'LEADERSHIP', title: 'Leaders moved first', text: 'The battle is remembered through the courage of soldiers such as Captain Vikram Batra, Lieutenant Manoj Kumar Pandey, Grenadier Yogendra Singh Yadav and Rifleman Sanjay Kumar.', image: '/assets/operation-vijay.png', source: 'Indian Army commemorative visual' },
      { label: 'REMEMBRANCE', title: 'Victory became a national promise', text: 'Kargil Vijay Diwas is observed on 26 July to remember the soldiers who reclaimed the heights and those who made the supreme sacrifice.', image: '/assets/operation-vijay.png', source: 'Indian Army commemorative visual' }
    ],
    journey: [
      { number: '01', title: 'See the intrusion', text: 'Local reports, patrols and surveillance revealed that winter-vacated positions had been occupied on commanding heights.' },
      { number: '02', title: 'Climb under fire', text: 'Units adapted tactics for night assaults, vertical approaches and sustained fighting in extreme cold and altitude.' },
      { number: '03', title: 'Restore the line', text: 'With the occupied posts recaptured, India restored control and preserved the principle that the Line of Control would not be crossed.' }
    ],
    sources: [
      { label: 'Ministry of Defence · Kargil Vijay Diwas backgrounder', url: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2288840&lang=2&reg=48' },
      { label: 'Ministry of Defence · Gun Hill and the gunners', url: 'https://www.pib.gov.in/newsite/erelcontent.aspx?lang=2&reg=48&relid=236179' },
      { label: 'The Indian Express · Kargil photo archive', url: 'https://indianexpress.com/photos/india-news/kargil-vijay-diwas-1999-war-india-pakistan-photos-8051793/' }
    ]
  },
  'op-meghdoot': {
    label: 'OPERATION MEGHDOOT · 1984',
    title: 'The glacier became a frontier.',
    intro: 'Operation Meghdoot began on 13 April 1984 with a bold joint effort by the Indian Army and Indian Air Force to secure the strategic heights of the Saltoro Ridge overlooking the Nubra Valley.',
    heroStats: [
      { value: '1984', label: 'Operation launched' },
      { value: '20,000 ft+', label: 'Extreme operational altitude' },
      { value: '365', label: 'Days of vigilance' }
    ],
    slides: [
      {
        eyebrow: 'SIACHEN GLACIER',
        title: 'At the edge of the map,',
        highlight: 'preparedness mattered.',
        location: 'Saltoro Ridge · Northern Ladakh',
        badge: 'Operation Meghdoot',
        description: 'Indian troops secured strategically important passes and heights before a rival occupation could be established, beginning a continuing high-altitude deployment.',
        image: 'https://im.rediff.com/news/2014/mar/14nitin7.jpg',
        source: 'Rediff · Siachen Glacier archive',
        sourceUrl: 'https://www.rediff.com/news/report/slide-show-1-the-siachen-glacier/20140314.htm'
      },
      {
        eyebrow: 'AIR AND GROUND',
        title: 'Every landing was',
        highlight: 'a feat of skill.',
        location: 'Bilafond La · Sia La · Gyong La',
        badge: 'Joint-service precision',
        description: 'Air transport and helicopter crews moved people and supplies across a glacier where altitude, weather and terrain challenged the limits of equipment and endurance.',
        image: '/assets/operation-meghdoot.png',
        source: 'Indian Army commemorative visual',
        sourceUrl: 'https://www.pib.gov.in/PressReleaseIframePage.aspx?PRID=2017834&lang=2&reg=48'
      },
      {
        eyebrow: 'THE HIGH FRONTIER',
        title: 'The mission continues',
        highlight: 'one acclimatised step at a time.',
        location: 'Siachen Base Camp · Karakoram',
        badge: 'Endurance as doctrine',
        description: 'The glacier demands a complete system: acclimatisation, clothing, shelter, casualty evacuation, supply chains and the discipline to live with the cold every day.',
        image: 'https://im.rediff.com/news/2014/mar/14nitin7.jpg',
        source: 'Ministry of Defence · IAF in Operation Meghdoot',
        sourceUrl: 'https://www.pib.gov.in/PressReleaseIframePage.aspx?PRID=2017834&lang=2&reg=48'
      }
    ],
    feature: {
      kicker: 'A JOINT-SERVICE BEGINNING',
      title: 'Securing the heights before the weather turned.',
      text: 'The first phase of Meghdoot was a race against geography and time. Army troops were positioned on crucial peaks and passes while the Air Force carried out the airlift and sustainment effort. The operation established a tactical advantage and created a specialised culture of glacier warfare that continues to evolve through training, engineering and medical support.',
      image: 'https://im.rediff.com/news/2014/mar/14nitin7.jpg',
      source: 'Rediff · Siachen Glacier archive'
    },
    frames: [
      { label: 'ALTITUDE', title: 'Thin air, exact routines', text: 'Acclimatisation is not a formality. It shapes how troops move, sleep, carry loads and make decisions in an environment where small errors become serious quickly.', image: '/assets/operation-meghdoot.png', source: 'Indian Army commemorative visual' },
      { label: 'AIR SUPPORT', title: 'The supply line is airborne', text: 'Transport aircraft and helicopters connect the base with isolated positions, carrying rations, equipment, fuel and the essentials of medical evacuation.', image: 'https://im.rediff.com/news/2014/mar/14nitin7.jpg', source: 'Rediff · Siachen Glacier archive' },
      { label: 'SURVIVAL', title: 'Cold weather becomes a skill', text: 'Shelter, clothing, nutrition, snow craft and equipment care are operational capabilities. The glacier tests a soldier long after the first deployment.', image: 'https://im.rediff.com/news/2014/mar/14nitin7.jpg', source: 'Rediff · Siachen Glacier archive' },
      { label: 'VALOUR', title: 'Bana Singh and the courage to volunteer', text: 'During Operation Meghdoot, Naib Subedar Bana Singh led the capture of a strategic post at around 21,000 feet and was awarded the Param Vir Chakra.', image: '/assets/operation-meghdoot.png', source: 'Indian Army commemorative visual' }
    ],
    journey: [
      { number: '01', title: 'Read the ridge', text: 'Intelligence, maps, weather and mountaineering knowledge identified the passes that could determine access across the glacier.' },
      { number: '02', title: 'Reach before the storm', text: 'Troops and supplies were airlifted to heights where helicopters, aircraft and men were all operating at the edge of performance.' },
      { number: '03', title: 'Hold through every season', text: 'The operation became a permanent commitment to presence, rotation, resupply, medical readiness and technical learning.' }
    ],
    sources: [
      { label: 'PIB · Operation Meghdoot commemorated', url: 'https://www.pib.gov.in/newsite/PrintRelease.aspx?lang=2&reg=48&relid=118215' },
      { label: 'PIB · IAF in Operation Meghdoot', url: 'https://www.pib.gov.in/PressReleaseIframePage.aspx?PRID=2017834&lang=2&reg=48' },
      { label: 'Rediff · Siachen Glacier photo feature', url: 'https://www.rediff.com/news/report/slide-show-1-the-siachen-glacier/20140314.htm' }
    ]
  },
  'op-cactus': {
    label: 'OPERATION CACTUS · 1988',
    title: 'A crisis met a ready response.',
    intro: 'When a coup attempt threatened the Maldives in November 1988, India responded to a request for help with a rapid joint operation that combined airborne forces, naval power and precise political purpose.',
    heroStats: [
      { value: '1988', label: 'Maldives intervention' },
      { value: '12 HRS', label: 'Response window' },
      { value: 'JOINT', label: 'Army · Navy · Air Force' }
    ],
    slides: [
      {
        eyebrow: 'RAPID RESPONSE',
        title: 'When the call came,',
        highlight: 'the runway was ready.',
        location: 'Malé · Hulhulé · Republic of Maldives',
        badge: 'Airborne intervention',
        description: 'The 50 Independent Parachute Brigade was airlifted from Agra to Hulhulé, securing the airport and creating the opening for the restoration of constitutional order.',
        image: 'https://images.indianexpress.com/2021/11/IMG-1576-e1635916604223.jpg',
        source: 'The Indian Express · Operation Cactus',
        sourceUrl: 'https://indianexpress.com/article/explained/explained-history/operation-cactus-1988-maldives-india-7611035/'
      },
      {
        eyebrow: 'ISLAND OBJECTIVE',
        title: 'Speed was the first',
        highlight: 'form of protection.',
        location: 'Hulhulé Airport · Malé',
        badge: 'Secure the vital point',
        description: 'The operation secured the airport, moved forces to the capital and helped prevent the crisis from becoming a prolonged fight among civilians and institutions.',
        image: 'https://imagesvs.oneindia.com/webp/hi/img/2024/01/operationcactus-1704904792.jpg',
        source: 'OneIndia · Operation Cactus archive',
        sourceUrl: 'https://www.oneindia.com/india/operation-cactus-how-india-foiled-a-coup-in-maldives-in-1988-3733573.html'
      },
      {
        eyebrow: 'MARITIME FOLLOW-THROUGH',
        title: 'The sea closed',
        highlight: 'the escape route.',
        location: 'Indian Ocean · Maldives',
        badge: 'Combined force',
        description: 'Indian naval ships tracked the fleeing mercenaries and helped bring the operation to a decisive close, showing how air, land and sea can work as one response.',
        image: '/assets/operation-cactus.png',
        source: 'Indian Army commemorative visual',
        sourceUrl: 'https://www.pib.gov.in/newsite/erelcontent.aspx?lang=2&reg=48&relid=16031'
      }
    ],
    feature: {
      kicker: 'THE DECISIVE WINDOW',
      title: 'A mission measured in hours.',
      text: 'Operation Cactus is remembered for its clarity of purpose. India acted after the Maldivian President sought assistance, secured the critical airport, restored control in Malé and coordinated the naval pursuit of the fleeing attackers. The intervention demonstrated that readiness is not only about force; it is about arriving with a defined objective and knowing when that objective has been achieved.',
      image: 'https://images.indianexpress.com/2021/11/IMG-1576-e1635916604223.jpg',
      source: 'The Indian Express · Operation Cactus'
    },
    frames: [
      { label: 'AIRBORNE', title: 'From Agra to Hulhulé', text: 'The rapid airlift of the Parachute Brigade gave India a decisive presence at the airport before the coup attempt could consolidate its control.', image: 'https://images.indianexpress.com/2021/11/IMG-1576-e1635916604223.jpg', source: 'The Indian Express · Operation Cactus' },
      { label: 'COMMAND', title: 'A single operational picture', text: 'Political direction, service coordination and a focused objective allowed the forces on the ground to act quickly without losing sight of the mission’s limited purpose.', image: '/assets/operation-cactus.png', source: 'Indian Army commemorative visual' },
      { label: 'MARITIME', title: 'The Indian Ocean mattered', text: 'The Navy’s role extended the operation beyond the airport and capital, tracking the escape by sea and supporting the restoration of Maldivian sovereignty.', image: 'https://imagesvs.oneindia.com/webp/hi/img/2024/01/operationcactus-1704904792.jpg', source: 'OneIndia · Operation Cactus archive' },
      { label: 'LEGACY', title: 'Reliability became the message', text: 'The operation strengthened India’s reputation as a responsible first responder in the Indian Ocean region when a neighbour’s security was at risk.', image: 'https://imagesvs.oneindia.com/webp/hi/img/2024/01/operationcactus-1704904792.jpg', source: 'OneIndia · Operation Cactus archive' }
    ],
    journey: [
      { number: '01', title: 'Answer the request', text: 'The Maldives sought India’s assistance after the attempted coup created an immediate threat to its government.' },
      { number: '02', title: 'Secure the gateway', text: 'Airborne troops secured Hulhulé Airport and moved to restore control in the capital.' },
      { number: '03', title: 'Close the escape', text: 'Naval coordination helped intercept the fleeing attackers and brought the crisis to a rapid conclusion.' }
    ],
    sources: [
      { label: 'The Indian Express · Explained history of Operation Cactus', url: 'https://indianexpress.com/article/explained/explained-history/operation-cactus-1988-maldives-india-7611035/' },
      { label: 'Ministry of Defence · Navy role in Operation Cactus', url: 'https://www.pib.gov.in/newsite/erelcontent.aspx?lang=2&reg=48&relid=16031' },
      { label: 'OneIndia · Operation Cactus archive', url: 'https://www.oneindia.com/india/operation-cactus-how-india-foiled-a-coup-in-maldives-in-1988-3733573.html' }
    ]
  },
  'op-rahat': {
    label: 'OPERATION RAHAT · 2013',
    title: 'In the mountains, every life mattered.',
    intro: 'The Uttarakhand floods of June 2013 cut off valleys, roads and pilgrimage routes. Operation Rahat brought together military aviation, ground columns, engineers, medics and civil agencies in a difficult mountain rescue effort.',
    heroStats: [
      { value: '2013', label: 'Uttarakhand floods' },
      { value: '24×7', label: 'Rescue readiness' },
      { value: 'AIR + LAND', label: 'Reach across valleys' }
    ],
    slides: [
      {
        eyebrow: 'MOUNTAIN RESCUE',
        title: 'When the roads disappeared,',
        highlight: 'the Army found a way.',
        location: 'Kedarnath · Rudraprayag · Uttarakhand',
        badge: 'Humanitarian rescue',
        description: 'Floods and landslides isolated thousands across the hill state. Rescue teams worked in unstable terrain, poor weather and narrow valleys to bring people to safety.',
        image: 'https://akm-img-a-in.tosshub.com/indiatoday/images/story/201306/cs-ht-the-rescue-july8-new-1_660_062913102306.jpg?VersionId=3x6sRacdI6NJP88y4pIc4SALQknZUML1&size=690%3A388',
        source: 'India Today · Uttarakhand rescue archive',
        sourceUrl: 'https://www.indiatoday.in/india/north/story/uttarakhand-floods-rescue-operations-army-iaf-169262-2013-06-29'
      },
      {
        eyebrow: 'AIR BRIDGE',
        title: 'The sky became',
        highlight: 'the only road left.',
        location: 'Kedarnath–Badrinath axis · Dehradun',
        badge: 'Round-the-clock sorties',
        description: 'Helicopters moved over valleys where roads and bridges had failed, evacuating pilgrims and residents while carrying relief and response teams into cut-off areas.',
        image: 'https://akm-img-a-in.tosshub.com/indiatoday/images/story/201306/gaurikund_660_063013102258.jpg?VersionId=UAk7go9CgX3sSCQmnLuCAOLrkizii3Ho&size=690%3A388',
        source: 'India Today · Gaurikund rescue archive',
        sourceUrl: 'https://www.indiatoday.in/india/north/story/uttarakhand-floods-rescue-operations-army-iaf-169262-2013-06-29'
      },
      {
        eyebrow: 'SERVICE IN CRISIS',
        title: 'Relief begins with',
        highlight: 'a human hand.',
        location: 'Uttarakhand · Mountain communities',
        badge: 'First responder',
        description: 'The operation was not only evacuation. It was the work of carrying, treating, feeding and reassuring people while the landscape around them was still changing.',
        image: '/assets/operation-rahat.png',
        source: 'Indian Army commemorative visual',
        sourceUrl: 'https://www.pib.gov.in/newsite/PrintRelease.aspx?lang=1&reg=3&relid=96598'
      }
    ],
    feature: {
      kicker: 'THE RESPONSE',
      title: 'A rescue network across broken ground.',
      text: 'The first response to Uttarakhand’s floods required many kinds of service at once. The Indian Air Force established a hub at Sarsawa and positioned medium-lift helicopters at Jolly Grant, while Army teams, NDRF personnel and state authorities worked across separate valleys. The official record of Operation Rahat shows how aviation, communications, medical response and local coordination combine when normal infrastructure fails.',
      image: 'https://akm-img-a-in.tosshub.com/indiatoday/images/story/201306/cs-ht-the-rescue-july8-new-1_660_062913102306.jpg?VersionId=3x6sRacdI6NJP88y4pIc4SALQknZUML1&size=690%3A388',
      source: 'India Today · Uttarakhand rescue archive'
    },
    frames: [
      { label: 'REACH', title: 'Into valleys cut off from the road', text: 'Helicopters, foot columns and improvised routes extended help into areas where bridges, roads and communication lines had been damaged or washed away.', image: 'https://akm-img-a-in.tosshub.com/indiatoday/images/story/201306/gaurikund_660_063013102258.jpg?VersionId=UAk7go9CgX3sSCQmnLuCAOLrkizii3Ho&size=690%3A388', source: 'India Today · Uttarakhand rescue archive' },
      { label: 'CARE', title: 'Evacuation is only the beginning', text: 'Relief work includes triage, first aid, food, shelter, transport and the sensitive task of reuniting people with families and communities.', image: '/assets/operation-rahat.png', source: 'Indian Army commemorative visual' },
      { label: 'ENGINEERING', title: 'Make a route where none remains', text: 'Engineers and ground teams help restore movement by clearing debris, assessing crossings and making temporary access possible for people and supplies.', image: 'https://im.rediff.com/news/2022/jul/18indian-army1.jpg?h=450&w=450', source: 'Rediff · Army rescue archive' },
      { label: 'COORDINATION', title: 'One response, many hands', text: 'Military teams, NDRF, state authorities and local communities all hold a piece of the rescue picture. Coordination turns separate efforts into a lifeline.', image: 'https://akm-img-a-in.tosshub.com/indiatoday/images/story/201306/cs-ht-the-rescue-july8-new-1_660_062913102306.jpg?VersionId=3x6sRacdI6NJP88y4pIc4SALQknZUML1&size=690%3A388', source: 'India Today · Uttarakhand rescue archive' },
    ],
    journey: [
      { number: '01', title: 'Reach the stranded', text: 'Use the available air and ground routes to locate people, open communication and establish safe evacuation points.' },
      { number: '02', title: 'Stabilise the valley', text: 'Move casualties and vulnerable people while delivering medical care, food, shelter and essential supplies.' },
      { number: '03', title: 'Support recovery', text: 'Keep routes, coordination and relief flowing until civil agencies and communities can resume the lead.' }
    ],
    sources: [
      { label: 'PIB · Operation Rahat launched by the IAF', url: 'https://www.pib.gov.in/newsite/PrintRelease.aspx?lang=1&reg=3&relid=96598' },
      { label: 'India Today · Uttarakhand rescue archive', url: 'https://www.indiatoday.in/india/north/story/uttarakhand-floods-rescue-operations-army-iaf-169262-2013-06-29' },
      { label: 'Rediff · Army rescue photo archive', url: 'https://www.rediff.com/news/2022/jul/18indian-army1.htm' }
    ]
  },
  'op-pawan': {
    label: 'OPERATION PAWAN · 1987',
    title: 'Peacekeeping demanded resolve.',
    intro: 'Operation Pawan was the Indian Peace Keeping Force’s campaign in Sri Lanka after the Indo-Sri Lanka Accord. It combined peacekeeping intent with difficult combat against militant formations in the north and east.',
    heroStats: [
      { value: '1987', label: 'IPKF deployment' },
      { value: 'IPKF', label: 'Indian Peace Keeping Force' },
      { value: 'NORTH + EAST', label: 'Sri Lankan theatre' }
    ],
    slides: [
      {
        eyebrow: 'SRI LANKA',
        title: 'Between peace and conflict,',
        highlight: 'the mission changed.',
        location: 'Jaffna · Northern and Eastern Sri Lanka',
        badge: 'Peacekeeping mission',
        description: 'The IPKF entered under the political framework of the Indo-Sri Lanka Accord. When disarmament failed, the force faced complex urban and jungle combat while still carrying a peacekeeping mandate.',
        image: 'https://images.moneycontrol.com/static-mcnews/2026/01/20260120091452_operation-pawan.jpg?height=720&impolicy=website&width=1280',
        source: 'Moneycontrol · Operation Pawan archive',
        sourceUrl: 'https://www.moneycontrol.com/news/india/operation-pawan-the-ipkfs-long-and-costly-intervention-in-sri-lanka-13770535.html'
      },
      {
        eyebrow: 'COMPLEX TERRAIN',
        title: 'The map was never',
        highlight: 'just a map.',
        location: 'Jaffna Peninsula · Sri Lanka',
        badge: 'Urban and jungle operations',
        description: 'Units navigated dense settlements, narrow lanes, difficult intelligence and an opponent who knew the ground. Every operation carried tactical and humanitarian consequences.',
        image: '/assets/operation-pawan.png',
        source: 'Indian Army commemorative visual',
        sourceUrl: 'https://www.pib.gov.in/newsite/PrintRelease.aspx?lang=2&reg=3&relid=193715'
      },
      {
        eyebrow: 'SACRIFICE',
        title: 'Duty can be difficult',
        highlight: 'even when the aim is peace.',
        location: 'IPKF memorial · Sri Lanka',
        badge: 'Service under uncertainty',
        description: 'Operation Pawan is remembered for the courage and loss of the soldiers who served in a politically complex campaign far from India’s borders.',
        image: '/assets/operation-pawan.png',
        source: 'Ministry of Defence · gallantry archive',
        sourceUrl: 'https://www.pib.gov.in/newsite/PrintRelease.aspx?lang=2&reg=3&relid=193715'
      }
    ],
    feature: {
      kicker: 'THE IPKF EXPERIENCE',
      title: 'A difficult mission in a changing theatre.',
      text: 'The Indian Peace Keeping Force was deployed with the expectation that the Accord would create the conditions for peace and the surrender of weapons. The situation changed rapidly. Indian troops were drawn into operations in Jaffna and beyond, balancing the need to defeat armed resistance with the responsibility to protect civilians and maintain a political end-state. Its lessons remain important for understanding the limits, burdens and responsibilities of expeditionary service.',
      image: 'https://images.moneycontrol.com/static-mcnews/2026/01/20260120091452_operation-pawan.jpg?height=720&impolicy=website&width=1280',
      source: 'Moneycontrol · Operation Pawan archive'
    },
    frames: [
      { label: 'MANDATE', title: 'Peacekeeping with a hard edge', text: 'The IPKF entered under an agreement intended to end violence, but disarmament and political settlement did not hold. The force had to adapt to an active conflict.', image: '/assets/operation-pawan.png', source: 'Indian Army commemorative visual' },
      { label: 'TACTICS', title: 'A campaign across close terrain', text: 'Urban fighting, jungle movement, intelligence gaps and a dispersed adversary placed unusual demands on conventional units and specialised teams.', image: 'https://images.moneycontrol.com/static-mcnews/2026/01/20260120091452_operation-pawan.jpg?height=720&impolicy=website&width=1280', source: 'Moneycontrol · Operation Pawan archive' },
      { label: 'AVIATION', title: 'Mobility shaped the mission', text: 'Army aviation played an important role in moving troops and sustaining operations across a theatre where roads and reliable access could not be assumed.', image: 'https://images.moneycontrol.com/static-mcnews/2026/01/20260120091452_operation-pawan.jpg?height=720&impolicy=website&width=1280', source: 'Moneycontrol · Operation Pawan archive' },
      { label: 'GALLANTRY', title: 'Major Ramaswamy Parameswaran', text: 'Major Ramaswamy Parameswaran was awarded the Param Vir Chakra for exceptional courage during Operation Pawan, a reminder of the individual leadership found within a complicated campaign.', image: '/assets/operation-pawan.png', source: 'Indian Army commemorative visual' }
    ],
    journey: [
      { number: '01', title: 'Enter under an accord', text: 'The IPKF deployment began as a peacekeeping commitment shaped by the Indo-Sri Lanka Accord.' },
      { number: '02', title: 'Adapt to the reality', text: 'When armed resistance continued, forces had to undertake demanding operations in urban and jungle terrain.' },
      { number: '03', title: 'Carry the lesson home', text: 'The campaign shaped later thinking about joint operations, intelligence, political purpose and the human cost of intervention.' }
    ],
    sources: [
      { label: 'PIB · Army Aviation Corps and Operation Pawan', url: 'https://www.pib.gov.in/newsite/PrintRelease.aspx?lang=2&reg=3&relid=193715' },
      { label: 'Moneycontrol · Operation Pawan archive', url: 'https://www.moneycontrol.com/news/india/operation-pawan-the-ipkfs-long-and-costly-intervention-in-sri-lanka-13770535.html' },
      { label: 'Ministry of Defence · Indian military history reference', url: 'https://www.mod.gov.in/' }
    ]
  },
  'op-relief': {
    label: 'HADR & DISASTER ASSISTANCE',
    title: 'First responders when the ground shifts.',
    intro: 'Humanitarian Assistance and Disaster Relief is a continuing responsibility rather than a single battle. Across floods, earthquakes, cyclones and overseas crises, the Indian Army brings trained columns, engineers, medical teams and logistics to people who need help quickly.',
    heroStats: [
      { value: '24×7', label: 'Response readiness' },
      { value: 'LAND · AIR · SEA', label: 'Ways to reach people' },
      { value: 'HADR', label: 'Humanitarian assistance' }
    ],
    slides: [
      {
        eyebrow: 'DOMESTIC RELIEF',
        title: 'When water takes the road,',
        highlight: 'people come first.',
        location: 'Flood-affected districts · India',
        badge: 'First responder to the nation',
        description: 'Army relief columns support civil administration with rescue, evacuation, engineering, medical care and essential supplies when floods and other disasters overwhelm normal access.',
        image: 'https://images.mid-day.com/images/images/2024/aug/PTI08_29_2024_000127B_36046745.jpg',
        source: 'Mid-day · Army flood relief archive',
        sourceUrl: 'https://www.mid-day.com/news/india-news/article/indian-army-steps-up-flood-relief-operations-in-gujarat-23384769'
      },
      {
        eyebrow: 'OVERSEAS HUMANITARIAN AID',
        title: 'Help travels',
        highlight: 'beyond the border.',
        location: 'Türkiye · Operation Dost, 2023',
        badge: 'Field hospital response',
        description: 'Under Operation Dost, an Indian Army field hospital and NDRF personnel treated earthquake victims in Hatay, showing how specialist medical relief can be projected quickly overseas.',
        image: 'https://drop.ndtv.com/albums/NEWS/indianarmyrescue/gt_640x480.jpg',
        source: 'NDTV · Indian Army rescue archive',
        sourceUrl: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=1900973&lang=2&reg=48'
      },
      {
        eyebrow: 'THE RELIEF COLUMN',
        title: 'Preparedness becomes',
        highlight: 'compassion in motion.',
        location: 'Engineer teams · Medical teams · Local administration',
        badge: 'Capability with purpose',
        description: 'A relief column carries more than equipment. It carries the ability to clear, cross, treat, communicate and restore a measure of safety under pressure.',
        image: 'https://im.rediff.com/news/2022/jul/18indian-army1.jpg?h=450&w=450',
        source: 'Rediff · Army rescue archive',
        sourceUrl: 'https://www.rediff.com/news/2022/jul/18indian-army1.htm'
      }
    ],
    feature: {
      kicker: 'A CONTINUING RESPONSIBILITY',
      title: 'Capability is measured by who can be reached.',
      text: 'The Indian Army’s HADR response is built around columns that can move with engineers, medics, rescue equipment and relief material. Domestic operations are conducted at the request of civil administration and in coordination with agencies such as the NDRF and SDRF. Overseas missions add field hospitals, airlift, maritime support and diplomacy. The common thread is disciplined help delivered at speed, with dignity at the centre.',
      image: 'https://images.mid-day.com/images/images/2024/aug/PTI08_29_2024_000127B_36046745.jpg',
      source: 'Mid-day · Army flood relief archive'
    },
    frames: [
      { label: 'RESCUE', title: 'Reach people in the first hours', text: 'Search and rescue teams work through water, debris, damaged roads and difficult weather to evacuate people and identify urgent needs.', image: 'https://im.rediff.com/news/2022/jul/18indian-army1.jpg?h=450&w=450', source: 'Rediff · Army rescue archive' },
      { label: 'ENGINEERING', title: 'Restore access and essentials', text: 'Engineers clear routes, improvise crossings, move equipment and help civil authorities reopen the lines that communities rely on.', image: 'https://images.mid-day.com/images/images/2024/aug/PTI08_29_2024_000127B_36046745.jpg', source: 'Mid-day · Army flood relief archive' },
      { label: 'MEDICAL', title: 'Care in a field setting', text: 'Medical teams provide triage, emergency treatment, public-health support and specialist care in locations where hospitals may be damaged or distant.', image: 'https://drop.ndtv.com/albums/NEWS/indianarmyrescue/gt_640x480.jpg', source: 'NDTV · Indian Army rescue archive' },
      { label: 'GLOBAL', title: 'A helping hand beyond India', text: 'Operation Dost and later HADR responses show how military logistics can support humanitarian action beyond India when lives are at risk.', image: '/assets/operation-relief.png', source: 'Indian Army commemorative visual' }
    ],
    journey: [
      { number: '01', title: 'Receive the call', text: 'Civil administration or a partner country identifies the emergency and requests support through the established response system.' },
      { number: '02', title: 'Deploy the right mix', text: 'Relief columns, engineers, medical teams, aviation and logistics are assembled around the needs of the affected community.' },
      { number: '03', title: 'Hand back a safer route', text: 'The response continues until people are evacuated, treated, supplied and supported towards recovery under civil leadership.' }
    ],
    sources: [
      { label: 'PIB · Indian Army contributions to nation building', url: 'https://www.pib.gov.in/PressNoteDetails.aspx?ModuleId=3&NoteId=151783&lang=1&reg=3' },
      { label: 'PIB · Operation Dost field hospital', url: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=1900973&lang=2&reg=48' },
      { label: 'PIB · Indian Army HADR exercise', url: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2074664&lang=2&reg=48' }
    ]
  }
};

const OperationExperiencePage = () => {
  const { id } = useParams();
  const page = OPERATION_EXPERIENCES[id] || OPERATION_EXPERIENCES['op-vijay'];
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => setActiveIndex(0), [id]);

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

  const current = page.slides[activeIndex];
  const imageFallback = (event) => {
    if (event.currentTarget.dataset.fallbackApplied) return;
    event.currentTarget.dataset.fallbackApplied = 'true';
    event.currentTarget.src = LOCAL_OPERATION_IMAGES[id] || LOCAL_OPERATION_IMAGES['op-vijay'];
  };

  return (
    <main className="operation-experience-page" id="main-content">
      <section className="opx-immersive-slider" aria-label={page.label}>
        <div className="opx-background-wrapper">
          {page.slides.map((slide, index) => (
            <div key={`${slide.eyebrow}-${index}`} className={`opx-bg-slide ${index === activeIndex ? 'active' : ''}`} aria-hidden={index !== activeIndex}>
              <img src={slide.image} alt="" className="opx-bg-img" loading={index === 0 ? 'eager' : 'lazy'} onError={imageFallback} />
            </div>
          ))}
          <div className="opx-light-overlay" />
          <div className="opx-dark-overlay" />
          <div className="opx-light-vignette" />
          <div className="opx-dark-vignette" />
        </div>

        <div className="container opx-content-relative">
          <div className={`opx-editorial-column ${isTransitioning ? 'transitioning' : ''}`}>
            <Link to="/" className="opx-back-link"><ArrowLeft size={16} /> Back to Home</Link>
            <div className="opx-pre-heading"><span>{page.label}</span></div>
            <div className="opx-tricolor-badge"><span /><span>{current.eyebrow} · {current.badge.toUpperCase()}</span></div>
            <h1>{current.title}<br /><span>{current.highlight}</span></h1>
            <div className="opx-meta-pill"><MapPin size={15} /><span>{current.location}</span></div>
            <p className="opx-hero-desc">{current.description}</p>
            <div className="opx-hero-stats">
              {page.heroStats.map((stat) => <div key={stat.label} className="opx-stat-card"><span>{stat.label}</span><strong>{stat.value}</strong></div>)}
            </div>
            <div className="opx-actions">
              <a href="#operation-article" className="btn btn-primary btn-lg"><span>Explore the history</span><ArrowRight size={18} /></a>
              <a href={current.sourceUrl} target="_blank" rel="noreferrer" className="btn opx-source-button">View photo source</a>
            </div>
          </div>
        </div>

        <a href={current.sourceUrl} target="_blank" rel="noreferrer" className="opx-hero-source">Image: {current.source}</a>
        <div className="opx-carousel-controls" aria-label="Carousel navigation">
          <button type="button" className="opx-nav-button" onClick={() => moveSlide(-1)} aria-label="Previous slide"><ChevronLeft size={22} /></button>
          <div className="opx-counter"><span>{String(activeIndex + 1).padStart(2, '0')}</span><i>/</i><span>{String(page.slides.length).padStart(2, '0')}</span></div>
          <button type="button" className="opx-nav-button" onClick={() => moveSlide(1)} aria-label="Next slide"><ChevronRight size={22} /></button>
        </div>
      </section>

      <div className="container opx-article-shell" id="operation-article">
        <section className="opx-article-intro">
          <span className="opx-section-tag">{page.label}</span>
          <h2>{page.title}</h2>
          <p>{page.intro}</p>
        </section>

        <section className="opx-feature-layout">
          <div className="opx-feature-image"><img src={page.feature.image} alt={page.feature.title} onError={imageFallback} /><span>Image: {page.feature.source}</span></div>
          <div className="opx-feature-copy"><span className="opx-kicker">{page.feature.kicker}</span><h2>{page.feature.title}</h2><p>{page.feature.text}</p></div>
        </section>

        <section className="opx-frames-section">
          <div className="opx-section-heading"><div><span className="opx-kicker">THE STORY IN FOUR FRAMES</span><h2>Every operation asks a different kind of courage.</h2></div><p>Read the operation through terrain, people, capability and the choices that shaped its outcome.</p></div>
          <div className="opx-frames-grid">
            {page.frames.map((frame) => <article className="opx-frame-card" key={frame.title}><div className="opx-frame-image"><img src={frame.image} alt={frame.title} loading="lazy" onError={imageFallback} /></div><div className="opx-frame-copy"><span>{frame.label}</span><h3>{frame.title}</h3><p>{frame.text}</p><small>Image: {frame.source}</small></div></article>)}
          </div>
        </section>

        <section className="opx-journey-section">
          <div className="opx-section-heading"><div><span className="opx-kicker">HOW IT UNFOLDED</span><h2>From the first call to the lasting lesson.</h2></div></div>
          <div className="opx-journey-grid">{page.journey.map((item) => <article className="opx-journey-card" key={item.number}><strong>{item.number}</strong><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
        </section>

        <section className="opx-reference-panel">
          <div><span className="opx-kicker">READ THE OFFICIAL DETAIL</span><h2>History deserves a source.</h2><p>This page is an editorial experience built from public records and reported archives. Follow the references for official context, dates and service detail.</p></div>
          <div className="opx-reference-links">{page.sources.map((source) => <a href={source.url} target="_blank" rel="noreferrer" key={source.url}>{source.label}<ArrowRight size={14} /></a>)}</div>
        </section>

        <div className="detail-bottom-cta opx-bottom-cta"><div><h3>Explore more of the Army’s story.</h3><p>Return to the operations gallery or discover the paths into a life of service.</p></div><div className="opx-bottom-actions"><Link to="/#operations" className="btn btn-gold btn-lg"><span>Back to operations</span><ArrowRight size={18} /></Link><Link to="/opportunities" className="btn opx-outline-button">Explore Army Entries</Link></div></div>
      </div>

      <style>{`
        .operation-experience-page { min-height: 100vh; background: var(--bg-app); color: var(--text-primary); padding-bottom: 80px; overflow: hidden; }
        .opx-immersive-slider { min-height: 710px; padding: 72px 0 112px; position: relative; border-bottom: 1px solid rgba(27,48,34,0.1); }
        .opx-background-wrapper { position: absolute; inset: 0; z-index: 0; overflow: hidden; }
        .opx-bg-slide { position: absolute; inset: 0; opacity: 0; transform: scale(1.04); transition: opacity 800ms cubic-bezier(0.22,1,0.36,1), transform 1000ms cubic-bezier(0.22,1,0.36,1); pointer-events: none; }
        .opx-bg-slide.active { opacity: 1; transform: scale(1); pointer-events: auto; }
        .opx-bg-img { width: 100%; height: 100%; object-fit: cover; object-position: center; filter: saturate(0.84) contrast(0.94); }
        .opx-light-overlay, .opx-dark-overlay, .opx-light-vignette, .opx-dark-vignette { position: absolute; inset: 0; }
        .opx-light-overlay { background: linear-gradient(90deg, rgba(243,246,244,0.98) 0%, rgba(243,246,244,0.9) 34%, rgba(243,246,244,0.42) 72%, rgba(243,246,244,0.16) 100%); }
        .opx-dark-overlay { opacity: 0; background: linear-gradient(90deg, rgba(9,18,11,0.97) 0%, rgba(9,18,11,0.84) 42%, rgba(9,18,11,0.36) 100%); }
        .opx-light-vignette { background: linear-gradient(180deg, rgba(255,255,255,0.12), transparent 35%, rgba(243,246,244,0.72) 100%); }
        .opx-dark-vignette { opacity: 0; background: linear-gradient(180deg, rgba(0,0,0,0.16), transparent 35%, rgba(5,12,7,0.7) 100%); }
        [data-theme='dark'] .opx-light-overlay, [data-theme='dark'] .opx-light-vignette { opacity: 0; }
        [data-theme='dark'] .opx-dark-overlay, [data-theme='dark'] .opx-dark-vignette { opacity: 1; }
        .opx-content-relative { position: relative; z-index: 10; }
        .opx-editorial-column { max-width: 750px; transition: opacity 300ms ease, transform 400ms cubic-bezier(0.22,1,0.36,1); }
        .opx-editorial-column.transitioning { opacity: 0.2; transform: translateY(8px); }
        .opx-back-link { display: inline-flex; gap: 7px; align-items: center; color: var(--army-primary); font-size: 0.8rem; font-weight: 700; margin-bottom: 20px; }
        [data-theme='dark'] .opx-back-link { color: var(--gold-light); }
        .opx-back-link:hover { transform: translateX(-3px); }
        .opx-pre-heading { margin-bottom: 12px; }
        .opx-pre-heading span { display: inline-block; font-family: var(--font-display); font-size: 0.75rem; font-weight: 900; letter-spacing: 0.16em; color: var(--army-primary); background: rgba(31,73,48,0.08); padding: 5px 12px; border-radius: var(--radius-full); border: 1px solid rgba(31,73,48,0.15); }
        [data-theme='dark'] .opx-pre-heading span { color: var(--gold-light); background: rgba(197,155,39,0.12); border-color: rgba(197,155,39,0.25); }
        .opx-tricolor-badge { display: inline-flex; align-items: center; gap: 9px; margin-bottom: 16px; color: var(--text-secondary); font-size: 0.72rem; font-weight: 800; letter-spacing: 0.08em; }
        .opx-tricolor-badge > span:first-child { width: 30px; height: 3px; border-radius: 4px; background: linear-gradient(90deg, var(--tiranga-saffron), #fff 50%, var(--tiranga-green)); }
        .opx-editorial-column h1 { font-family: var(--font-display); font-size: clamp(2.7rem, 5vw, 4.3rem); line-height: 1.04; margin-bottom: 16px; max-width: 720px; letter-spacing: -0.045em; }
        .opx-editorial-column h1 > span { color: var(--gold-dark); }
        [data-theme='dark'] .opx-editorial-column h1 > span { color: var(--gold-light); }
        .opx-meta-pill { display: inline-flex; align-items: center; gap: 8px; color: var(--text-secondary); font-size: 0.86rem; font-weight: 700; margin-bottom: 16px; }
        .opx-meta-pill svg { color: var(--gold-dark); }
        [data-theme='dark'] .opx-meta-pill svg { color: var(--gold-light); }
        .opx-hero-desc { max-width: 650px; font-size: 1.02rem; color: var(--text-secondary); line-height: 1.68; margin-bottom: 20px; }
        .opx-hero-stats { display: grid; grid-template-columns: repeat(3, minmax(140px, 1fr)); gap: 12px; max-width: 680px; margin-bottom: 26px; }
        .opx-stat-card { background: rgba(255,255,255,0.78); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border: 1px solid rgba(0,0,0,0.08); border-radius: var(--radius-sm); padding: 10px 12px; display: flex; flex-direction: column; gap: 3px; box-shadow: 0 4px 12px rgba(0,0,0,0.03); }
        [data-theme='dark'] .opx-stat-card { background: rgba(11,29,18,0.72); }
        .opx-stat-card span { font-size: 0.66rem; text-transform: uppercase; letter-spacing: 0.06em; color: var(--text-muted); font-weight: 700; line-height: 1.25; }
        .opx-stat-card strong { font-size: 0.86rem; font-weight: 800; color: var(--text-primary); line-height: 1.25; }
        [data-theme='dark'] .opx-stat-card span { color: #94a3b8; }
        [data-theme='dark'] .opx-stat-card strong { color: #f8fafc; }
        .opx-actions { display: flex; align-items: center; gap: 12px; }
        .opx-source-button { color: var(--text-primary); border: 1px solid var(--border-medium); background: rgba(255,255,255,0.54); }
        .opx-source-button:hover { background: var(--bg-surface); border-color: var(--army-primary); }
        [data-theme='dark'] .opx-source-button { color: #fff; border-color: rgba(255,255,255,0.24); background: rgba(11,29,18,0.48); }
        .opx-hero-source { position: absolute; z-index: 20; bottom: 40px; left: max(24px, calc((100% - 1400px) / 2 + 24px)); color: var(--text-muted); font-size: 0.68rem; text-decoration: underline; text-underline-offset: 2px; }
        .opx-hero-source:hover { color: var(--army-primary); }
        [data-theme='dark'] .opx-hero-source:hover { color: var(--gold-light); }
        .opx-carousel-controls { position: absolute; z-index: 20; display: flex; align-items: center; gap: 12px; right: 60px; bottom: 32px; }
        .opx-nav-button { width: 38px; height: 38px; border-radius: 50%; border: 1px solid var(--border-medium); background: rgba(255,255,255,0.84); color: var(--army-primary); display: grid; place-items: center; cursor: pointer; transition: all var(--transition-fast); }
        .opx-nav-button:hover { transform: translateY(-2px); border-color: var(--army-primary); }
        [data-theme='dark'] .opx-nav-button { color: #fff; background: rgba(15,25,19,0.7); border-color: rgba(255,255,255,0.22); }
        .opx-counter { display: inline-flex; align-items: center; gap: 5px; min-width: 54px; justify-content: center; color: var(--text-secondary); font-family: var(--font-display); font-weight: 800; font-size: 0.75rem; }
        .opx-counter i { font-style: normal; color: var(--text-muted); }
        .opx-article-shell { max-width: 1120px; padding-top: 76px; }
        .opx-article-intro { max-width: 820px; margin-bottom: 50px; }
        .opx-article-intro h2, .opx-feature-copy h2, .opx-section-heading h2, .opx-reference-panel h2 { font-family: var(--font-display); font-weight: 900; letter-spacing: -0.04em; color: var(--text-primary); }
        .opx-section-tag { display: inline-block; color: var(--gold-dark); font-size: 0.72rem; font-weight: 900; letter-spacing: 0.13em; margin-bottom: 12px; }
        [data-theme='dark'] .opx-section-tag, [data-theme='dark'] .opx-kicker { color: var(--gold-light); }
        .opx-article-intro h2 { font-size: clamp(2rem, 4vw, 3.4rem); line-height: 1.08; margin-bottom: 16px; }
        .opx-article-intro p { color: var(--text-secondary); font-size: 1rem; line-height: 1.7; }
        .opx-feature-layout { display: grid; grid-template-columns: minmax(0, 1.08fr) minmax(0, 0.92fr); gap: 42px; align-items: center; margin-bottom: 88px; }
        .opx-feature-image { position: relative; min-height: 410px; border-radius: var(--radius-lg); overflow: hidden; background: var(--bg-surface-subtle); box-shadow: var(--shadow-floating); }
        .opx-feature-image::after { content: ''; position: absolute; inset: 0; background: linear-gradient(180deg, transparent 50%, rgba(7,18,10,0.64)); pointer-events: none; }
        .opx-feature-image img { width: 100%; height: 100%; min-height: 410px; object-fit: cover; }
        .opx-feature-image > span { position: absolute; z-index: 1; left: 18px; bottom: 16px; color: #fff; font-size: 0.68rem; }
        .opx-feature-copy { padding-right: 14px; }
        .opx-kicker { display: inline-block; color: var(--gold-dark); font-size: 0.72rem; font-weight: 900; letter-spacing: 0.13em; text-transform: uppercase; margin-bottom: 12px; }
        .opx-feature-copy h2 { font-size: clamp(1.8rem, 3vw, 2.65rem); line-height: 1.1; margin-bottom: 16px; }
        .opx-feature-copy p { color: var(--text-secondary); font-size: 0.95rem; line-height: 1.75; }
        .opx-frames-section, .opx-journey-section { margin-bottom: 84px; }
        .opx-section-heading { display: flex; align-items: end; justify-content: space-between; gap: 28px; margin-bottom: 26px; }
        .opx-section-heading h2 { font-size: clamp(1.65rem, 3vw, 2.35rem); line-height: 1.1; max-width: 650px; }
        .opx-section-heading > p { max-width: 315px; color: var(--text-secondary); font-size: 0.86rem; line-height: 1.6; }
        .opx-frames-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 18px; }
        .opx-frame-card { display: grid; grid-template-columns: 0.84fr 1.16fr; min-height: 238px; background: rgba(255,255,255,0.86); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); overflow: hidden; box-shadow: 0 10px 26px rgba(27,60,36,0.05); }
        [data-theme='dark'] .opx-frame-card { background: rgba(19,34,23,0.86); }
        .opx-frame-image { min-height: 238px; overflow: hidden; }
        .opx-frame-image img { width: 100%; height: 100%; object-fit: cover; transition: transform 500ms ease; }
        .opx-frame-card:hover .opx-frame-image img { transform: scale(1.04); }
        .opx-frame-copy { padding: 20px; display: flex; flex-direction: column; align-items: flex-start; }
        .opx-frame-copy > span { color: var(--gold-dark); font-size: 0.68rem; font-weight: 900; letter-spacing: 0.12em; }
        [data-theme='dark'] .opx-frame-copy > span { color: var(--gold-light); }
        .opx-frame-copy h3 { color: var(--text-primary); font-family: var(--font-display); font-size: 1.05rem; font-weight: 800; line-height: 1.15; margin: 8px 0; }
        .opx-frame-copy p { color: var(--text-secondary); font-size: 0.78rem; line-height: 1.55; }
        .opx-frame-copy small { color: var(--text-muted); font-size: 0.62rem; margin-top: auto; padding-top: 12px; }
        .opx-journey-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        .opx-journey-card { background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 22px; min-height: 190px; }
        .opx-journey-card > strong { color: var(--gold-dark); font-family: var(--font-display); font-size: 1.5rem; }
        [data-theme='dark'] .opx-journey-card > strong { color: var(--gold-light); }
        .opx-journey-card h3 { color: var(--text-primary); font-family: var(--font-display); font-size: 1rem; margin: 18px 0 8px; }
        .opx-journey-card p { color: var(--text-secondary); font-size: 0.8rem; line-height: 1.6; }
        .opx-reference-panel { display: grid; grid-template-columns: 1fr 0.9fr; gap: 36px; padding: 28px; margin-bottom: 30px; border-radius: var(--radius-md); background: linear-gradient(135deg, rgba(247,249,248,0.86), rgba(255,255,255,0.68)); border: 1px solid var(--border-subtle); }
        [data-theme='dark'] .opx-reference-panel { background: rgba(19,34,23,0.72); }
        .opx-reference-panel h2 { font-size: 1.65rem; line-height: 1.12; margin-bottom: 10px; }
        .opx-reference-panel p { color: var(--text-secondary); font-size: 0.82rem; line-height: 1.6; }
        .opx-reference-links { display: grid; align-content: center; gap: 10px; }
        .opx-reference-links a { display: flex; justify-content: space-between; align-items: center; gap: 12px; padding: 12px 14px; border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: var(--army-primary); background: rgba(255,255,255,0.62); font-size: 0.75rem; font-weight: 700; }
        [data-theme='dark'] .opx-reference-links a { color: var(--gold-light); background: rgba(0,0,0,0.2); }
        .opx-reference-links a:hover { border-color: var(--gold-primary); }
        .opx-bottom-cta { display: flex; justify-content: space-between; align-items: center; gap: 20px; padding: 24px; border-radius: var(--radius-md); background: rgba(244,247,245,0.86); border: 1.5px solid rgba(226,232,240,0.9); }
        [data-theme='dark'] .opx-bottom-cta { background: rgba(0,0,0,0.3); border-color: rgba(255,255,255,0.08); }
        .opx-bottom-cta h3 { font-family: var(--font-display); font-size: 1.18rem; color: var(--text-primary); margin-bottom: 4px; }
        .opx-bottom-cta p { color: var(--text-secondary); font-size: 0.78rem; }
        .opx-bottom-actions { display: flex; gap: 10px; align-items: center; }
        .opx-outline-button { color: var(--text-primary); border: 1px solid var(--border-medium); background: transparent; }
        .opx-outline-button:hover { border-color: var(--army-primary); background: var(--bg-surface); }
        [data-theme='dark'] .opx-outline-button { color: #fff; border-color: rgba(255,255,255,0.2); }
        @media (max-width: 900px) { .opx-feature-layout, .opx-reference-panel { grid-template-columns: 1fr; } .opx-frames-grid { grid-template-columns: 1fr; } .opx-journey-grid { grid-template-columns: 1fr; } }
        @media (max-width: 700px) { .opx-immersive-slider { min-height: 720px; padding: 48px 0 112px; } .opx-editorial-column h1 { font-size: 2.45rem; } .opx-hero-stats { grid-template-columns: 1fr 1fr; } .opx-actions, .opx-section-heading, .opx-bottom-cta, .opx-bottom-actions { flex-direction: column; align-items: flex-start; } .opx-actions .btn, .opx-bottom-actions .btn { width: 100%; } .opx-hero-source { left: 16px; bottom: 30px; max-width: 48%; } .opx-carousel-controls { right: 18px; bottom: 20px; } .opx-feature-image, .opx-feature-image img { min-height: 300px; } .opx-feature-layout { gap: 26px; margin-bottom: 64px; } .opx-frame-card { grid-template-columns: 1fr; } .opx-frame-image { min-height: 190px; max-height: 190px; } .opx-article-shell { padding-top: 54px; } }
      `}</style>
    </main>
  );
};

export default OperationExperiencePage;
