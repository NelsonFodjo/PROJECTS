/* Nelson Fodjo — portfolio content + AI knowledge base */

export const DATA = {
  profile: {
    name: "Nelson Fodjo",
    fullName: "Nelson Fodjo Kamdoum",
    tagline: "The Solution Architect",
    role: "Data Science & Software Engineering · EdTech Innovator · Tech Community Leader",
    location: "Pamplemousses, Mauritius",
    email: "fodjonelson22@gmail.com",
    phone: "+237 652 278 011",
    github: "https://github.com/",
    linkedin: "https://www.linkedin.com/",
    youtube: "NELCO Explains CSC",
    calendly: "https://calendly.com/",
    socials: [
      { id: "linkedin", label: "LinkedIn", short: "in", url: "https://www.linkedin.com/" },
      { id: "github", label: "GitHub", short: "gh", url: "https://github.com/" },
      { id: "instagram", label: "Instagram", short: "ig", url: "https://instagram.com/" },
      { id: "facebook", label: "Facebook", short: "f", url: "https://facebook.com/" },
      { id: "whatsapp", label: "WhatsApp", short: "wa", url: "https://wa.me/237652278011" },
    ],
    summary:
      "Solution-oriented software engineering and data science student with strong leadership and execution skills. I transform complex problems into scalable solutions across education, technology, and community development. I am known for high ownership, rapid learning, and delivering measurable results.",
    stats: [
      { n: "600+", l: "students taught" },
      { n: "17", l: "schools reached" },
      { n: "1000+", l: "summit participants" },
    ],
  },

  education: [
    {
      when: "2025 — 2028",
      school: "African Leadership College of Higher Education",
      place: "Pamplemousses, Mauritius",
      degree: "BSc Software Engineering — ML & AI Track",
      note: "Expected graduation 2028.",
      points: [
        "Machine Learning & AI specialization track.",
        "Project-based, peer-led learning model focused on real-world problem solving.",
      ],
    },
    {
      when: "Nov 2024 — Dec 2025",
      school: "MIT Emerging Talent",
      place: "Remote",
      degree: "Certificate in Computer and Data Science",
      points: [
        "Completed Foundations Track: Intro to CS & Python and Computational Thinking & Data Science.",
        "Built and deployed an interactive research project — the MIT ET Foundations Project.",
      ],
    },
    {
      when: "Dec 2024 — Apr 2025",
      school: "WorldQuant University",
      place: "Remote",
      degree: "Applied Data Science Fellow",
      points: [
        "Used Python (pandas, scikit-learn, statsmodels), SQL, MongoDB and EDA to build and evaluate models.",
        "Tackled housing prices, air quality, earthquake damage and bankruptcy prediction.",
      ],
    },
    {
      when: "2017 — 2023",
      school: "GBHS Etoug-Ebe",
      place: "Yaoundé, Cameroon",
      degree: "Science High School Diploma",
      note: "CGPA 4.0 / 4.0",
      points: ["Graduated top of class with a perfect 4.0 GPA in the science stream."],
    },
  ],

  projects: [
    {
      name: "Pansophic",
      kicker: "EdTech Platform",
      desc: "An education platform built to make quality computer-science learning accessible to students across Africa — pairing structured curriculum with hands-on practice.",
      tags: ["Product", "EdTech", "Full-stack"],
      featured: true,
      year: "2025",
      role: "Founder & Lead Engineer",
      long: "Pansophic is an education platform designed for students with ambition but limited access. It pairs a structured computer-science curriculum with hands-on practice, working reliably even on low-bandwidth connections.",
      highlights: [
        "Offline-first architecture so lessons load on patchy connections",
        "Structured CS curriculum with hands-on coding practice",
        "Built for scale across multiple schools and cohorts",
      ],
    },
    {
      name: "ZK-Credit Scorer",
      kicker: "Privacy · Web3",
      desc: "A privacy-preserving credit-scoring concept using zero-knowledge proofs, letting users prove creditworthiness without exposing their raw financial data.",
      tags: ["Zero-Knowledge", "Python", "Fintech"],
      featured: true,
      year: "2025",
      role: "Builder",
      long: "A privacy-preserving credit-scoring concept that uses zero-knowledge proofs so a user can prove they meet a creditworthiness threshold without ever revealing the underlying financial data.",
      highlights: [
        "Prove a score threshold without disclosing raw data",
        "Explores ZK proofs applied to financial inclusion",
        "Python-based proving and verification flow",
      ],
    },
    {
      name: "MIT ET Foundations Project",
      kicker: "Data Science",
      desc: "An interactive research project built and deployed during the MIT Emerging Talent Foundations track, turning a dataset into a shareable, explorable analysis.",
      tags: ["Python", "Data Viz", "Research"],
      year: "2025",
      role: "Researcher",
      long: "An interactive research project built and deployed during the MIT Emerging Talent Foundations track — taking a raw dataset all the way to a shareable, explorable analysis.",
      highlights: [
        "End-to-end: data cleaning, analysis and deployment",
        "Interactive, shareable output",
        "Completed within the MIT ET Foundations track",
      ],
    },
    {
      name: "Certificate Automation Engine",
      kicker: "Automation · Open Dreams",
      desc: "A Python pipeline that auto-generates 200+ certificates and acceptance letters, cutting manual processing time by 80% across NGO programs.",
      tags: ["Python", "Automation"],
      year: "2025",
      role: "Automation Engineer",
      long: "A Python pipeline that auto-generates certificates and acceptance letters at scale for Open Dreams NGO, replacing a slow manual process.",
      highlights: [
        "Automated 200+ documents end-to-end",
        "Cut processing time by ~80%",
        "Templated, repeatable across programs",
      ],
    },
    {
      name: "WorldQuant Model Suite",
      kicker: "Machine Learning",
      desc: "A set of predictive models for housing prices, air quality, earthquake damage and bankruptcy — built with pandas, scikit-learn and statsmodels.",
      tags: ["scikit-learn", "SQL", "MongoDB"],
      year: "2025",
      role: "Applied DS Fellow",
      long: "A suite of predictive models built during the WorldQuant Applied Data Science fellowship, spanning four distinct real-world problem domains.",
      highlights: [
        "Housing prices, air quality, earthquake damage & bankruptcy",
        "pandas, scikit-learn, statsmodels, SQL & MongoDB",
        "Full EDA → modeling → evaluation workflow",
      ],
    },
    {
      name: "This Portfolio",
      kicker: "React · Conversational UI",
      desc: "The site you're on — a portfolio with a working AI assistant that answers questions about my work, plus clean, routed content pages.",
      tags: ["React", "AI", "Design"],
      year: "2026",
      role: "Designer & Developer",
      long: "The site you're reading now — a personal portfolio with a genuinely working AI assistant that answers questions about my work, wrapped in a clean, responsive, routed interface.",
      highlights: [
        "Working AI chat assistant grounded in my real background",
        "Resizable, collapsible sidebar navigation",
        "Light / dark mode and fully responsive layout",
      ],
    },
  ],

  experience: [
    {
      when: "Sep 2024 — Oct 2025",
      role: "TIC Summit Centre Regional Coordinator",
      org: "Tech Innovation Center Foundation",
      place: "Yaoundé, Cameroon",
      points: [
        "Led tech education across 17 schools, mentoring 200+ students.",
        "Organized summits for 1000+ participants.",
        "Awarded Best Regional Coordinator.",
      ],
    },
    {
      when: "Jul 2025 — Present",
      role: "Administrative Assistant",
      org: "Open Dreams NGO",
      place: "Yaoundé · Physical & Remote",
      points: [
        "Improved system reliability and student experience by 35% through automation, databases, cybersecurity and documentation.",
        "Automated 200+ certificates and acceptance letters in Python, cutting processing time by 80% for 200+ students.",
        "Streamlined cross-team workflows across programs.",
      ],
    },
    {
      when: "Aug 2023 — Present",
      role: "Computer Science & Mathematics Tutor",
      org: "PDV Leadex · Summit of Excellence · NELCO Explains CSC",
      place: "Yaoundé · Remote",
      points: [
        "Run the NELCO Explains CSC YouTube channel, tutoring 600+ students on GCE Computer Science.",
        "Teach C and SQL, improving student grades by 50%+.",
      ],
    },
    {
      when: "Mar 2022 — Present",
      role: "Front-End Web Developer",
      org: "PersSelf Learning",
      place: "Remote",
      points: ["Built a responsive fast-food restaurant website using HTML, CSS and JavaScript."],
    },
  ],

  skills: [
    {
      group: "Engineering",
      items: [
        { n: "Python", l: "advanced" }, { n: "JavaScript" }, { n: "React" },
        { n: "C" }, { n: "SQL" }, { n: "HTML / CSS" }, { n: "Git" },
      ],
    },
    {
      group: "Data & AI",
      items: [
        { n: "Pandas" }, { n: "scikit-learn" }, { n: "statsmodels" },
        { n: "MongoDB" }, { n: "Jupyter" }, { n: "EDA" }, { n: "ML / AI" },
      ],
    },
    {
      group: "Architecture & Craft",
      items: [{ n: "System Design" }, { n: "Automation" }, { n: "Data Modeling" }],
    },
    {
      group: "Leadership",
      items: [
        { n: "Mentoring" }, { n: "Curriculum Development" },
        { n: "Communication" }, { n: "Community Organizing" },
      ],
    },
    {
      group: "Languages",
      items: [{ n: "English", l: "native" }, { n: "French", l: "native" }],
    },
  ],

  community: [
    {
      name: "TIC Summit",
      role: "Regional Coordinator · Best Coordinator Award",
      desc: "Coordinated a regional tech-education summit reaching 17 schools and 1000+ participants, mentoring the next wave of student builders.",
      tags: ["Mentorship", "1000+ reached"],
    },
    {
      name: "AlchemiHack",
      role: "Organizer & Participant",
      desc: "Part of the team behind AlchemiHack — building hackathon culture on campus and helping students ship their first real projects under deadline.",
      tags: ["Hackathon", "Campus"],
    },
    {
      name: "Innovator Committee",
      role: "Member",
      desc: "Member of the Innovator Committee, championing student-led innovation initiatives and connecting peers with opportunities to build.",
      tags: ["Leadership"],
    },
    {
      name: "NELCO Explains CSC",
      role: "Founder & Educator",
      desc: "A YouTube channel and tutoring program that has taught 600+ students GCE Computer Science, lifting grades by 50%+.",
      tags: ["YouTube", "600+ students"],
    },
    {
      name: "Open Dreams NGO",
      role: "Administrative Assistant",
      desc: "Supporting 200+ students with automation, systems and documentation — improving program reliability and experience.",
      tags: ["NGO", "Automation"],
    },
  ],

  certifications: [
    "MITx 6.00.1x — Introduction to Computer Science and Programming Using Python",
    "MITx 6.00.2x — Introduction to Computational Thinking and Data Science",
  ],

  blog: [
    {
      title: "Building Pansophic: lessons from shipping EdTech in Africa",
      date: "May 2026", read: "6 min read", tag: "EdTech",
      excerpt: "What I learned designing a learning platform for students with patchy connectivity and big ambitions — and why offline-first changed everything.",
    },
    {
      title: "Zero-knowledge proofs, explained for builders",
      date: "Mar 2026", read: "8 min read", tag: "Web3",
      excerpt: "A practical look at how ZK proofs let you verify a claim without revealing the data behind it — and where I put them to work in the ZK-Credit Scorer.",
    },
    {
      title: "Automating 200+ certificates with a weekend Python script",
      date: "Jan 2026", read: "4 min read", tag: "Automation",
      excerpt: "How a small script cut a manual NGO workflow from days to minutes, and the gotchas I hit generating PDFs at scale.",
    },
  ],

  gallery: [
    { id: "g1", cap: "TIC Summit 2025" },
    { id: "g2", cap: "Mentoring session" },
    { id: "g3", cap: "AlchemiHack" },
    { id: "g4", cap: "Speaking" },
    { id: "g5", cap: "Open Dreams team" },
    { id: "g6", cap: "NELCO recording" },
  ],
};

/* ---- nav config ---- */
export const NAV = [
  { id: "home", label: "Home", icon: "home" },
  { id: "chat", label: "Chat", icon: "chat" },
  { id: "education", label: "Education", icon: "education" },
  { id: "projects", label: "Projects", icon: "projects" },
  { id: "gallery", label: "Gallery", icon: "gallery" },
  { id: "experience", label: "Experience", icon: "experience" },
  { id: "skills", label: "Skills", icon: "skills" },
  { id: "community", label: "Community", icon: "community" },
  { id: "blog", label: "Blog", icon: "blog" },
  { id: "contact", label: "Contact", icon: "mail" },
];

export const SECTION_BLURB = {
  education: "My academic path — ALC, MIT Emerging Talent, WorldQuant & more.",
  projects: "Things I've built — from EdTech to zero-knowledge experiments.",
  gallery: "Moments from talks, summits and the community.",
  experience: "Roles, impact and the numbers behind them.",
  skills: "The tools and craft I work with day to day.",
  community: "Where I teach, organize and give back.",
  blog: "Notes on building, learning and teaching.",
  contact: "Get in touch — email, socials or a quick message.",
};
