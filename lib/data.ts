export type Project = {
  slug: string;
  name: string;
  tagline: string;
  period: string;
  problem: string;
  hardPart: string;
  stats: { label: string; value: string }[];
  stack: string[];
  flow: string[]; // architecture diagram node labels, in order
  links: { github?: string; demo?: string };
  accent: "signal" | "success";
  videoUrl?: string;
  screenshots?: { file: string; caption: string }[];
  features?: { title: string; description: string }[];
  systemDetails?: {
    title: string;
    description: string;
    flowDiagram?: string[];
    table?: {
      headers: string[];
      rows: string[][];
    };
    codeBlock?: {
      language: string;
      code: string;
    };
  }[];
  roadmap?: { phase: string; status: "completed" | "in-progress" | "upcoming"; items: string[] }[];
  usageExamples?: { title: string; conversation: { role: "user" | "app"; text: string }[] }[];
};

export const projects: Project[] = [
  {
    slug: "crowdsense-ai",
    name: "CrowdSense AI",
    tagline: "Predictive crowd management, journey planning & surge prevention platform",
    period: "Mar 2026 — Apr 2026",
    problem:
      "Mumbai's suburban platforms carry 7.5M+ commuters daily. Existing CCTV systems are reactive — they document incidents after they happen, not before. CrowdSense ingests multi-sensor data (CCTV, BLE, WiFi, SMS) from transit hubs and stadiums, fuses it in real-time to estimate crowd density, and triggers automated alerts to prevent stampedes and overcrowding before platforms become unsafe.",
    hardPart:
      "Fusing high-confidence CCTV data with noisy BLE/WiFi proxies using Kalman filtering, then layering a Z-Score anomaly detector on top — all while keeping the YOLOv8 vision engine decoupled from the Express API layer via Redis Pub/Sub so 5+ concurrent video feeds never block the main request thread.",
    stats: [
      { label: "Concurrent feeds", value: "5+" },
      { label: "Stream latency", value: "<50ms" },
      { label: "Alert dispatch", value: "<2s" },
    ],
    stack: [
      "React (Vite)",
      "React Native (Expo)",
      "Node.js",
      "Express",
      "Python",
      "YOLOv8",
      "OpenCV",
      "Kalman Filter",
      "Redis Pub/Sub",
      "WebSockets",
      "Zustand",
      "Pipecat AI",
      "Sarvam AI",
      "Groq",
      "Daily.co",
      "MongoDB",
      "Twilio",
    ],
    flow: [
      "CCTV / BLE / WiFi / SMS feeds",
      "YOLOv8 detection engine",
      "Kalman fusion + Z-score anomaly",
      "Redis Pub/Sub broadcast",
      "Operator dashboard + mobile app",
      "SMS / WhatsApp alerts",
    ],
    links: { github: "https://github.com/nachiketkale24-png/AltX_Overdrive-Hack4Innovation-26" },
    accent: "signal",
    screenshots: [
      { file: "/assets/crowdsense_1.png", caption: "CrowdSense AI System Architecture & Sensor Fusion Overview" },
      { file: "/assets/crowdsense_2.png", caption: "Operator Command Center Dashboard & Live Heatmaps" },
      { file: "/assets/crowdsense_4.png", caption: "Dynamic Zone Definition & Multimodal Data Fusion" },
      { file: "/assets/crowdsense_5.png", caption: "Commuter Journey Planner & Zone Risk Badges" },
      { file: "/assets/crowdsense_6.png", caption: "YOLOv8 Computer Vision Crowd Density Counting Streams" },
      { file: "/assets/crowdsense_7.png", caption: "Z-Score Anomaly Warning & Risk Level Analytics" },
      { file: "/assets/crowdsense_8.png", caption: "Pipecat & Sarvam Multilingual Voice Assistant Flow" }
    ],
    features: [
      { title: "YOLOv8 Vision Counting", description: "Real-time object detection processing live video feeds, outputting precise commuter coordinate bounding boxes across active zones." },
      { title: "Multi-Sensor Fusion Core", description: "Fuses high-confidence video estimates with BLE beacons and noisy WiFi pings using local Kalman filter algorithms." },
      { title: "Z-Score Anomaly Risk Engine", description: "Tracks density trends against 12-month historical statistics, calculating deviations to automatically flag danger zones." },
      { title: "Multilingual Voice Assistant", description: "Voice chatbot powered by Pipecat AI, Sarvam AI STT/TTS, and Groq (LLM) enabling voice dialogue support in English/Hindi/Marathi." },
      { title: "Offline SMS Fallback (Twilio)", description: "Ensures accessibility for low-tech phones. Twilio fallback routes automated warnings and responds to text queries." },
      { title: "Redis Pub/Sub & WebSockets", description: "Supports concurrent streams with sub-50ms latency by routing frame counts from the Python ML worker to the dashboard." }
    ],
    systemDetails: [
      {
        title: "Multi-Sensor Kalman Fusion",
        description: "Merges visual crowd counts with noisy probe pings to yield a robust density estimate. Leverages Kalman gain optimization to self-adjust weights dynamically.",
        codeBlock: {
          language: "typescript",
          code: `// Sensor Fusion Update Step
const estimateError = priorEstimateError + processNoise;
const kalmanGain = estimateError / (estimateError + sensorNoise);

// Merge measurements: YOLO counts (low noise) vs WiFi pings (high noise)
const currentEstimate = priorEstimate + kalmanGain * (sensorMeasurement - priorEstimate);
const currentEstimateError = (1 - kalmanGain) * estimateError;`
        }
      },
      {
        title: "Twilio Offline Fallback Parser",
        description: "Enables commuters without internet access to send simple SMS keyword commands and receive text replies containing crowd reports.",
        table: {
          headers: ["Keyword Command", "Intended Query", "SMS Response Action"],
          rows: [
            ["DENSITY [station_name]", "Check current crowd level", "Query current zone density score & return status"],
            ["ROUTE [from] TO [to]", "Get safest commute route", "Run routing algorithm, select lowest risk path"],
            ["HELP", "List available services", "SMS list of instructions & commands guidelines"],
            ["ALERT ON", "Subscribe to push alerts", "Register phone number to database alert triggers list"]
          ]
        }
      },
      {
        title: "Voice Assistant Pipeline",
        description: "Built with Pipecat AI framework to streamline multi-user audio connections, routing speech recordings to high-speed LLMs and STT models.",
        flowDiagram: [
          "Commuter Audio Stream (Daily.co)",
          "Speech to Text (Sarvam AI)",
          "LLM Context Processing (Groq / Llama3)",
          "Text to Speech Synthesis (Sarvam AI)",
          "Audio Stream Output response"
        ]
      }
    ],
    usageExamples: [
      {
        title: "Surge Anomaly Trigger Warning",
        conversation: [
          { role: "user", text: "[Operator Alerts Log]: Alert! Platform 3 Z-Score = 3.8. Density exceeds safety threshold." },
          { role: "app", text: "Deploying guard protocols: Dispatching 4 crowd controllers to Platform 3 stairs. Sending SMS warnings to incoming commuters." }
        ]
      },
      {
        title: "Offline SMS Commute Query",
        conversation: [
          { role: "user", text: "SMS: DENSITY Dadar Platform 1" },
          { role: "app", text: "Reply: Dadar Platform 1 is currently MODERATE (420 people, Z-Score 0.8). Risk is Low. Next train in 3 mins." }
        ]
      }
    ],
    roadmap: [
      {
        phase: "Phase 1: Vision & Fusion Core",
        status: "completed",
        items: [
          "YOLOv8 zone configuration and video pipelines",
          "Kalman filtering multi-sensor fusion math logic",
          "Z-Score anomaly detection threshold triggers",
          "Redis Pub/Sub live WebSockets dashboard"
        ]
      },
      {
        phase: "Phase 2: Voice & Offline Access",
        status: "in-progress",
        items: [
          "Pipecat AI framework voice agent integration",
          "Sarvam AI multilingual Speech-to-Text pipelines",
          "Twilio SMS offline parsing and fallback replies"
        ]
      },
      {
        phase: "Phase 3: Community scaling",
        status: "upcoming",
        items: [
          "Cross-venue federated dashboards for rail operators",
          "AI predictive route planning based on crowd history",
          "Hardware BLE beacons placement at local stations"
        ]
      }
    ]
  },
  {
    slug: "lablink",
    name: "LabLink",
    tagline: "Intelligent blood bank & lab management platform for hospital networks",
    period: "Jan 2026 — Feb 2026",
    problem:
      "India's blood banking infrastructure still relies heavily on manual registers and phone calls. Critical shortages surface too late because blood banks, hospitals, donors, lab technicians, and patients operate as disconnected systems. LabLink unifies all five into one platform with real-time proximity matching, emergency SOS broadcasting, and complete traceability from donation to transfusion.",
    hardPart:
      "Building a one-click emergency SOS broadcast that matches compatible donors within a configurable radius using GeoJSON-indexed spatial queries on MongoDB — fast enough to matter in an emergency — while also running a dual-verification lab result pipeline (technician → pathologist) with critical value flagging and barcode-based specimen lifecycle tracking.",
    stats: [
      { label: "Blood groups", value: "8" },
      { label: "Match response", value: "<3s" },
      { label: "Portals", value: "4" },
    ],
    stack: [
      "React 19",
      "Express 5",
      "Node.js",
      "MongoDB",
      "GeoJSON",
      "JWT",
      "TailwindCSS",
      "eRaktKosh API",
    ],
    flow: [
      "Donor / hospital / patient request",
      "GeoJSON spatial index query",
      "Emergency SOS broadcast",
      "Ranked match engine",
      "Lab specimen lifecycle",
      "eRaktKosh stock sync",
    ],
    links: { github: "https://github.com/nachiketkale24-png/Blood_Lab" },
    accent: "success",
    screenshots: [
      { file: "/assets/lablink_main.png", caption: "LabLink Unified Healthcare Portal Welcome Interface" },
      { file: "/assets/lablink_dashboard.png", caption: "Admin Analytics Dashboard: Inventory Distribution & Trends" },
      { file: "/assets/lablink_inventory.png", caption: "Blood Bank Inventory: ABO classification and Expiry Monitor" },
      { file: "/assets/lablink_hospital.png", caption: "Hospital Portal: Blood Requests, Lab Orders & Emergency SOS" },
      { file: "/assets/lablink_donors.png", caption: "Donor Management: Matches Tracker and Camps Registration" }
    ],
    features: [
      { title: "Multi-Portal Ecosystem", description: "Dedicated portals for Admin, Hospital networks, Patients (Smart Panjikaran), and Lab Technicians, streamlining distinct operational roles." },
      { title: "Emergency SOS Broadcast", description: "Hospitals trigger immediate alerts dispatching SMS notifications to compatible blood donors within a spatial proximity radius." },
      { title: "LIS Specimen Lifecycle", description: "Ensures specimen chain-of-custody. Barcode generation, collection logs, result entry, critical flagging, and pathologist verification." },
      { title: "Compatibility Calculator", description: "Real-time, interactive utility showing donor-recipient compatibilities across all 8 major blood group types (ABO & Rh)." },
      { title: "Camp Organizer Registry", description: "Organize, schedule, and publicize blood donation camps, tracking attendee signups and actual blood bags collected." },
      { title: "Donors Gamification", description: "Gamified reward points system tracking donation streaks, user badges, lives saved counter, and competitive leaderboards." }
    ],
    systemDetails: [
      {
        title: "Proximity Donor Matching (GeoJSON)",
        description: "Utilizes geospatial indexing on MongoDB to query active donors within a specified kilometer radius who have compatible blood groups.",
        codeBlock: {
          language: "javascript",
          code: `// Proximity matching compatible donors within radius (meters)
const compatibleDonors = await User.find({
  role: 'donor',
  bloodGroup: { $in: getCompatibleGroups(requestedGroup) },
  location: {
    $nearSphere: {
      $geometry: { type: "Point", coordinates: [longitude, latitude] },
      $maxDistance: radiusInKm * 1000
    }
  }
});`
        }
      },
      {
        title: "Blood Compatibility Matrix",
        description: "Defines crossmatch rules between donor and recipient blood types, dynamically rendering matching availabilities in the inventory dashboard.",
        table: {
          headers: ["Recipient Blood Group", "Compatible Donor Groups", "Incompatible Donor Groups"],
          rows: [
            ["O- Negative", "O- only", "O+, A±, B±, AB±"],
            ["O+ Positive", "O-, O+", "A±, B±, AB±"],
            ["A- Negative", "O-, A-", "O+, A+, B±, AB±"],
            ["A+ Positive", "O-, O+, A-, A+", "B±, AB±"],
            ["B- Negative", "O-, B-", "O+, B+, A±, AB±"],
            ["B+ Positive", "O-, O+, B-, B+", "A±, AB±"],
            ["AB- Negative", "O-, A-, B-, AB-", "O+, A+, B+, AB+"],
            ["AB+ Positive", "Universal Recipient (All 8 types)", "None"]
          ]
        }
      },
      {
        title: "LIS Specimen Tracking",
        description: "From sample draw to transfusion, the specimen state machine guards patient safety against mislabeling and expiration.",
        flowDiagram: [
          "Patient Test Booking",
          "Technician Sample Draw (Barcode Labeling)",
          "Lab Results Entry (Critical Value Flags)",
          "Pathologist Review & Digital Verification",
          "Patient Report Dispatch (JSON download)"
        ]
      }
    ],
    usageExamples: [
      {
        title: "Hospital SOS Donor Alert",
        conversation: [
          { role: "user", text: "[Hospital SOS]: Urgent need for O- blood! Broadcasting to matching donors within 5km radius." },
          { role: "app", text: "SMS broadcasted. Matches found: 14 donors notified. Donor Amit Accepted: 'On my way, ETA 15 minutes.'" }
        ]
      },
      {
        title: "Lab Result Verification",
        conversation: [
          { role: "user", text: "Technician: Entered Haemoglobin result = 6.2 g/dL (Normal: 12-16)." },
          { role: "app", text: "System Alert: Critical Low value flagged! Alerting pathologist for immediate validation. Hospital notified." }
        ]
      }
    ],
    roadmap: [
      {
        phase: "Phase 1: Basic LIS & Inventory",
        status: "completed",
        items: [
          "Dedicated portals for hospital, admin, patient, tech",
          "Blood compatibility database and calculators",
          "Lab test checkout carts and payment logging",
          "Donation camp registrations and attendance rosters"
        ]
      },
      {
        phase: "Phase 2: Proximity SOS & Verification",
        status: "in-progress",
        items: [
          "GeoJSON spatial proximity donor matching",
          "Dual verification pathologist pipeline with critical value flags",
          "Lives saved calculators and gamified streak rewards"
        ]
      },
      {
        phase: "Phase 3: Integrations & Predictive AI",
        status: "upcoming",
        items: [
          "eRaktKosh API integrations for national stock sync",
          "AI predictive forecasting models for seasonal blood needs",
          "Real-time GPS transit tracking for blood delivery vehicles"
        ]
      }
    ]
  },
  {
    slug: "smartkisan",
    name: "SmartKisan",
    tagline: "Voice-enabled smart agriculture assistant for Indian farmers",
    period: "Feb 2026 — Mar 2026",
    problem:
      "Indian farmers face a massive digital divide — advanced agricultural technology like real-time market prices, government scheme eligibility, crop health diagnostics, and smart irrigation exists, but remains inaccessible to those with limited technical expertise. SmartKisan bridges this gap with Hindi/Hinglish voice commands and an offline-first mobile experience.",
    hardPart:
      "Building a robust intent recognition pipeline that correctly maps Hindi/Hinglish farmer terminology to app actions with confidence scoring — handling commands like 'गेहूं का भाव बताओ' or 'sinchai ki salah do' — while keeping the entire app functional offline-first with AsyncStorage caching for market prices and scheme data.",
    stats: [
      { label: "Crops tracked", value: "6+" },
      { label: "Govt schemes", value: "50+" },
      { label: "Languages", value: "3" },
    ],
    stack: [
      "React Native",
      "Expo",
      "TypeScript",
      "expo-speech",
      "expo-av",
      "AsyncStorage",
      "i18n-js",
      "React Navigation",
    ],
    flow: [
      "Voice input (Hindi / Hinglish)",
      "expo-av recording",
      "Intent router + NLP",
      "Confidence scoring",
      "Action execution + TTS response",
    ],
    links: { github: "https://github.com/nachiketkale24-png/SmartKisan" },
    accent: "success",
    videoUrl: "/assets/working_prototype.mp4",
    screenshots: [
      { file: "/assets/1_iot_hardware.jpeg", caption: "Real sensor integration and Arduino/Microcontroller setup" },
      { file: "/assets/2_dashboard.jpeg", caption: "Farm overview, crop status, quick navigation tasks" },
      { file: "/assets/3_dashboard_2.jpeg", caption: "My Crops status details and disease alert system" },
      { file: "/assets/4_irrigation.jpeg", caption: "Smart watering schedules, soil types and moisture tracking" },
      { file: "/assets/5_health_monitor.jpeg", caption: "Crop health status hub and disease scan options" },
      { file: "/assets/6_alerts.jpeg", caption: "Agricultural alerts by type, severity, and timestamps" },
      { file: "/assets/7_voice_assistant.jpeg", caption: "Bilingual voice command dashboard assistant" },
      { file: "/assets/8_ai_chatbot.jpeg", caption: "AI chatbot agricultural assistant with suggestions history" }
    ],
    features: [
      { title: "Voice Assistant (Hindi / Hinglish)", description: "Bilingual natural language processing allows farmers to speak naturally, map intents to actions, and hear spoken replies via Text-to-Speech." },
      { title: "Market Price Tracking (Mandi Bhav)", description: "Live crop rates across local markets, price trend analysis (↑ ↓ →), and algorithms recommending the best mandi for maximum returns." },
      { title: "Government Schemes Navigator", description: "Bilingual database of 50+ active government schemes with automated land size, state, and document requirement checks." },
      { title: "Crop Health Diagnostics", description: "Diagnose plant health (Good / Warning / Critical) and leverage scanning workflows to identify crop diseases and treatment options." },
      { title: "Smart Irrigation Calculations", description: "Optimized watering scheduler calculating requirements based on soil moisture, crop-specific factors, and seasonal multipliers." },
      { title: "Real-time Priority Alerts", description: "Instant notification warnings about extreme weather conditions, crop diseases, and sudden mandi price spikes." }
    ],
    systemDetails: [
      {
        title: "Voice Command System & Intent Recognition",
        description: "Understands Hindi/Hinglish commands using expo-av for recording, native transcription services, and a custom regex/substring-based router to map intents with confidence scores.",
        flowDiagram: [
          "User Speech Input",
          "Audio Capture (expo-av)",
          "Speech-to-Text Recognition",
          "Intent Router Parsing",
          "Confidence Matching",
          "UI Action / Navigation",
          "Text-to-Speech Output (expo-speech)"
        ],
        table: {
          headers: ["Intent", "Example Commands", "Action Taken"],
          rows: [
            ["SHOW_SCHEMES", "'योजना दिखाओ', 'government schemes'", "Navigate to Sarkari Schemes Screen"],
            ["SHOW_PRICES", "'गेहूं का भाव बताओ', 'mandi rate'", "Fetch and show Mandi Prices Screen"],
            ["SHOW_IRRIGATION", "'सिंचाई की सलाह दो', 'sinchai'", "Open Soil moisture & watering scheduler"],
            ["SHOW_HEALTH", "'rog dikhao', 'crop disease'", "Navigate to Crop Health Diagnostics Hub"],
            ["SHOW_ALERTS", "'alert', 'notification'", "Show critical alarms panel"],
            ["CHECK_ELIGIBILITY", "'eligible', 'scheme eligibility'", "Check on-device profile eligibility"]
          ]
        },
        codeBlock: {
          language: "typescript",
          code: `// Normalize input & execute matched intent
const normalized = userInput.toLowerCase().trim();

for (const [intent, patterns] of Object.entries(intentPatterns)) {
  if (patterns.some(pattern => normalized.includes(pattern))) {
    const params = extractParameters(intent, normalized);
    const confidence = calculateConfidence(pattern, normalized);
    if (confidence > 0.75) {
      executeIntent(intent, params);
      break;
    }
  }
}`
        }
      },
      {
        title: "Market Prices (Mandi Bhav) offline cache",
        description: "Mandi prices use local database files and cache to AsyncStorage. If the phone is offline, the app displays cached market trends seamlessly.",
        codeBlock: {
          language: "json",
          code: `{
  "prices": [
    {
      "crop": "Wheat",
      "cropHindi": "गेहूं",
      "mandis": [
        { "name": "Jalandhar Mandi", "price": 2200, "trend": "up", "change": 2.5 },
        { "name": "Chandigarh Mandi", "price": 2150, "trend": "stable", "change": 0 }
      ]
    }
  ]
}`
        }
      },
      {
        title: "Smart Irrigation & Soil Moisture Calculator",
        description: "Calculates optimal watering schedules using real-time soil moisture sensors and crop multipliers, generating clear metrics for water volume and irrigation costs saved.",
        codeBlock: {
          language: "typescript",
          code: `// Water requirement calculation
RecommendedWater = BaseAmount * SoilMoistureFactor * CropFactor * SeasonFactor;
WaterSavingsPercent = ((StandardWater - RecommendedWater) / StandardWater) * 100;
CostSaved = WaterSavingsPercent * WaterBillRate;

// Multipliers used:
// Wheat: 0.8x | Rice: 1.5x | Cotton: 1.2x | Sugarcane: 1.4x`
        }
      },
      {
        title: "Government Schemes Eligibility Engine",
        description: "Evaluates farmer profile fields against 50+ scheme constraints on-device, outputting whether they are Eligible, Partially Eligible, or Not Eligible, together with missing documentation reports.",
        flowDiagram: [
          "Check Land Size limits",
          "Check State-specific availability",
          "Check category exclusions",
          "Check Aadhaar & Bank Account links",
          "Return status: Eligible (✅) / Partial (⚠️) / Ineligible (❌)"
        ]
      }
    ],
    usageExamples: [
      {
        title: "Scheme Eligibility Check",
        conversation: [
          { role: "user", text: "क्या मैं सरकारी योजना के लिए पात्र हूं?" },
          { role: "app", text: "मैंने आपकी प्रोफाइल का मिलान किया है। आप 'पीएम किसान योजना' के लिए पात्र हैं! आवेदन के लिए आपके पास आधार कार्ड और बैंक पासबुक होनी चाहिए।" }
        ]
      },
      {
        title: "Mandi Bhav Check",
        conversation: [
          { role: "user", text: "गेहूं का भाव बताओ?" },
          { role: "app", text: "गेहूं की सर्वोत्तम कीमत जालंधर मंडी में ₹2,200 है। पिछली बार से 2.5% की वृद्धि (↑) हुई है।" }
        ]
      },
      {
        title: "Irrigation Advice",
        conversation: [
          { role: "user", text: "गेहूं को कितना पानी चाहिए?" },
          { role: "app", text: "मृदा नमी को देखते हुए अभी 5,000 लीटर पानी देने की सलाह दी जाती है। इससे आप सामान्य से 30% पानी बचा रहे हैं।" }
        ]
      }
    ],
    roadmap: [
      {
        phase: "Phase 1: Core System Features",
        status: "completed",
        items: [
          "Voice command assistant routing engine",
          "Real-time Mandi price monitoring database",
          "Government schemes eligibility checker & scanner",
          "Task reminders & crop health status monitoring"
        ]
      },
      {
        phase: "Phase 2: AI & ML Integration",
        status: "in-progress",
        items: [
          "Plant disease detection using CNN image models",
          "Weather forecast integration with offline warnings",
          "Soil moisture sensor IoT hardware integration"
        ]
      },
      {
        phase: "Phase 3: Community & Scaling",
        status: "upcoming",
        items: [
          "Community peer-to-peer marketplace",
          "Expert agronomist booking service",
          "Direct crop loan processing assistance"
        ]
      }
    ]
  },
  {
    slug: "weapon-alert-system",
    name: "Weapon Alert System",
    tagline: "Real-time weapon detection across live CCTV infrastructure",
    period: "May 2026 — Present",
    problem:
      "Standard surveillance systems require human operators watching dozens of feeds — threats are spotted too late. This SPTBI internship project builds a real-time weapon detection system that handles multiple simultaneous camera feeds (including mobile phones connected via QR tracking), runs YOLO inference on every frame, and dispatches alerts within sub-second latency.",
    hardPart:
      "Sub-second alert latency required a fault-tolerant socket-based frame pipeline handling multiple simultaneous camera feeds — including mobile phone cameras connected via QR tracking — while maintaining continuous DeepSORT tracking across dropped frames, lighting shifts, and cross-platform browser differences for camera access.",
    stats: [
      { label: "Alert latency", value: "<1s" },
      { label: "Camera support", value: "Multi" },
      { label: "Team size", value: "6" },
    ],
    stack: [
      "Python",
      "YOLOv8",
      "DeepSORT",
      "Streamlit",
      "Sockets",
    ],
    flow: [
      "Multi-camera / QR phone feeds",
      "YOLO inference engine",
      "DeepSORT tracking",
      "Threat classification",
      "Alert dispatch",
    ],
    links: { github: "https://github.com/nachiketkale24-png/Weapon-Detection" },
    accent: "signal",
  },
];

export const stats = [
  { label: "Hackathons led", value: "15+" },
  { label: "Systems shipped", value: "4" },
  { label: "Stream latency", value: "<50ms" },
  { label: "Alert dispatch", value: "<2s" },
];

export type TechCategory = {
  layer: string;
  description: string;
  items: string[];
};

export const techDepth: TechCategory[] = [
  {
    layer: "Detection & Vision",
    description: "Where raw signal becomes structured understanding",
    items: ["YOLOv8", "OpenCV", "DeepSORT", "Kalman Filter"],
  },
  {
    layer: "Real-time Infrastructure",
    description: "Moving state between systems without anyone waiting",
    items: ["Redis Pub/Sub", "WebSockets", "Socket pipelines", "Express.js"],
  },
  {
    layer: "Data & Persistence",
    description: "Where correctness has to survive scale",
    items: ["MongoDB", "GeoJSON indexing", "AsyncStorage", "JWT auth"],
  },
  {
    layer: "Interface",
    description: "Where all of the above becomes legible to a human",
    items: ["React", "React Native (Expo)", "Streamlit", "Tailwind CSS"],
  },
];

export type TimelineEntry = {
  date: string;
  title: string;
  detail: string;
};

export const timeline: TimelineEntry[] = [
  {
    date: "2025",
    title: "Google 'Build with AI' Bootcamp",
    detail: "Certified in generative AI workflows and production-ready agent deployment.",
  },
  {
    date: "Jan 2026",
    title: "23 Ventures Pitchathon",
    detail: "2nd position among 200+ startups for system design and execution.",
  },
  {
    date: "Feb 2026",
    title: "VESIT Hackathon",
    detail: "Top 5 of 2,000+ teams.",
  },
  {
    date: "Feb 2026",
    title: "GDG Mumbai",
    detail: "Top 50 of 1,000+ teams for applied tech solutions.",
  },
  {
    date: "Mar 2026",
    title: "Vasantdada Patil National Hackathon",
    detail: "Top 10 of 3,000+ teams nationwide.",
  },
  {
    date: "Mar 2026",
    title: "Barclays Hack-o-Hire",
    detail: "Delivered a full-stack solution within a 36-hour deadline.",
  },
  {
    date: "Apr 2026",
    title: "SIES Innov8 Hackathon",
    detail: "Domain Winner for innovative system implementation.",
  },
  {
    date: "May 2026",
    title: "SPTBI Internship",
    detail: "Began building the Weapon Alert Surveillance System as Software Engineering Intern.",
  },
];

export const profile = {
  name: "Nachiket Kale",
  role: "Software Engineer",
  subrole: "Systems, ML infra, and real-time architecture",
  location: "Mumbai, India",
  email: "nachiket.kale24@spit.ac.in",
  github: "https://github.com/nachiketkale24-png",
  linkedin: "https://linkedin.com/in/nachiket-kale-5363001b3",
  ticker: ["Python", "React", "TypeScript", "YOLOv8", "Redis", "Node.js", "MongoDB", "Streamlit"],
};
