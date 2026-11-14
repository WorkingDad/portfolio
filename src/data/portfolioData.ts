/**
 * Authentic portfolio data extracted directly from Ted Finger's live portfolio at https://tedfinger.us/
 * Pre-defined Django content models:
 *  - Intro (CMS Content Block)
 *  - Samples (Interactive cards, modals, Vimeo embeds, and web packages)
 *  - Skills Accordion (eLearning Authoring, Media Development, Technical Skills)
 *  - Work History Accordion (16 professional experience records with roles, dates, bullet items, and company URLs)
 *  - Contact (Direct contact information, form fields, and resume download)
 */

export interface SampleItem {
  id: string;
  title: string;
  thumbnail: string;
  teaser: string;
  modalDescription: string;
  embedUrl: string;
  contentType: 'iframe' | 'video' | 'interactive';
  originalWidth: string;
  originalHeight: string;
  categoryTag?: string;
  badge?: string;
}

export interface SkillGroupItem {
  id: string;
  title: string;
  iconName: 'authoring' | 'media' | 'web' | 'lms' | 'methodology' | 'technical';
  items: string[];
}

export interface WorkHistoryItem {
  id: string;
  company: string;
  role: string;
  dates: string;
  description?: string;
  bullets: string[];
  website?: string;
}

export interface IntroData {
  heading: string;
  bannerImage: string;
  paragraphs: string[];
}

export interface ContactData {
  headline: string;
  introText: string;
  email: string;
  phone: string;
  phoneFormatted: string;
  website: string;
  websiteDisplay: string;
  linkedin: string;
  resumeUrl: string;
}

// 1. INTRO / "WHAT I DO" SECTION
export const INTRO_DATA: IntroData = {
  heading: "What I do",
  bannerImage: "/media/uploads/2026/02/25/banner-website_BvZ3W4G.png",
  paragraphs: [
    "I start by viewing content through the learner’s eyes to identify 'newcomer' friction points and ask subject matter experts the right questions.",
    "I then transform that complex data into engaging, professional solutions that simplify learning and directly support job performance. Hope you check out my samples!"
  ]
};

// 2. SAMPLES (All 7 authentic projects from tedfinger.us)
export const SAMPLES_DATA: SampleItem[] = [
  {
    id: "pause-protect-report",
    title: "Pause. Protect. Report.",
    thumbnail: "/assets/aistudio/3_stranger_0e1043d3.jpeg",
    teaser: "An interactive, scenario-based cybersecurity learning experience that helps learners recognize potential security risks and practice making appropriate reporting decisions through realistic situations and immediate feedback.",
    modalDescription: "An interactive, scenario-based cybersecurity learning experience that helps learners recognize potential security risks and practice making appropriate reporting decisions through realistic situations and immediate feedback.",
    embedUrl: "https://workingdad.github.io/portfolio-files/",
    contentType: "iframe",
    originalWidth: "min(95%,640px)",
    originalHeight: "100%",
    categoryTag: "Interactive Scenario",
    badge: "Interactive Module"
  },
  {
    id: "converting-textbook-content-to-elearning",
    title: "Converting textbook content to eLearning",
    thumbnail: "/media/uploads/2022/11/15/sample_sat_thumbnail.png",
    teaser: "This animated and interactive demonstration is based on a scene from a larger eLearning project I worked on.",
    modalDescription: "For an educational publishing company: The topic of this project was standardized test-taking strategies. After writing a detailed design document, I submitted this animated scene to the client, as an example, or Proof of Concept (POC). The POC won the client over, and led to my employer getting the contract for the entire project.",
    embedUrl: "https://player.vimeo.com/video/427582893",
    contentType: "iframe",
    originalWidth: "min(95%,640px)",
    originalHeight: "100%",
    categoryTag: "eLearning POC",
    badge: "Animated Demo"
  },
  {
    id: "business-uses-of-databases-part-1",
    title: "Business Uses of Databases: Part 1",
    thumbnail: "/media/uploads/2022/11/15/database1_thumb.png",
    teaser: "I did this instructional video for an MBA course, Intro to Databases.",
    modalDescription: "Business Uses of Databases: Part 1 — Published with permission from Unext.com.",
    embedUrl: "https://player.vimeo.com/video/427581422",
    contentType: "iframe",
    originalWidth: "min(95%,640px)",
    originalHeight: "100%",
    categoryTag: "MBA Courseware",
    badge: "Instructional Video"
  },
  {
    id: "business-uses-of-databases-part-2",
    title: "Business Uses of Databases: Part 2",
    thumbnail: "/media/uploads/2022/11/15/database2_thumb.png",
    teaser: "I did this instructional video for an MBA course, Intro to Databases.",
    modalDescription: "Business Uses of Databases: Part 2 — Published with permission from Unext.com.",
    embedUrl: "https://player.vimeo.com/video/428646018",
    contentType: "iframe",
    originalWidth: "min(95%,640px)",
    originalHeight: "100%",
    categoryTag: "MBA Courseware",
    badge: "Instructional Video"
  },
  {
    id: "functions-of-money",
    title: "Functions of Money",
    thumbnail: "/media/uploads/2022/11/15/money_thumb.png",
    teaser: "I did this instructional video for an MBA level Economics course.",
    modalDescription: "Functions of Money — Published with permission from Unext.com.",
    embedUrl: "https://player.vimeo.com/video/427942642",
    contentType: "iframe",
    originalWidth: "min(95%,640px)",
    originalHeight: "100%",
    categoryTag: "Economics Courseware",
    badge: "Instructional Video"
  },
  {
    id: "the-federal-reserve",
    title: "The Federal Reserve",
    thumbnail: "/media/uploads/2022/11/15/fed_thumb.png",
    teaser: "I did this instructional video for an MBA level Economics course.",
    modalDescription: "The Federal Reserve — Published with permission from Unext.com.",
    embedUrl: "https://player.vimeo.com/video/427581607",
    contentType: "iframe",
    originalWidth: "min(95%,640px)",
    originalHeight: "100%",
    categoryTag: "Economics Courseware",
    badge: "Instructional Video"
  },
  {
    id: "the-islm-model",
    title: "The ISLM Model",
    thumbnail: "/media/uploads/2022/11/15/islm_thumb.png",
    teaser: "I did this instructional video for an MBA level Economics course.",
    modalDescription: "The ISLM Model — Published with permission from Unext.com.",
    embedUrl: "https://player.vimeo.com/video/427581624",
    contentType: "iframe",
    originalWidth: "min(95%,640px)",
    originalHeight: "100%",
    categoryTag: "Macroeconomics",
    badge: "Instructional Video"
  }
];

// 3. SKILLS & TECHNICAL COMPETENCIES (5 groups matching curriculum structure)
export const SKILL_GROUPS_DATA: SkillGroupItem[] = [
  {
    id: "elearning-authoring-tools",
    title: "eLearning Authoring Tools",
    iconName: "authoring",
    items: [
      "Articulate Storyline 360 & Rise",
      "Adobe Captivate",
      "Lectora Publisher X.6",
      "TechSmith Camtasia"
    ]
  },
  {
    id: "media-production-design",
    title: "Media Production & Design",
    iconName: "media",
    items: [
      "Adobe Experience Manager",
      "Photoshop, Illustrator",
      "Audacity, SoundBooth",
      "WellSaid Labs (text to speech)"
    ]
  },
  {
    id: "web-collaboration-ai",
    title: "Web, Collaboration & AI",
    iconName: "web",
    items: [
      "Notebook LM",
      "ChatGPT Astra Ultra",
      "SharePoint, Smartsheet",
      "Web conferencing (WebEx, GoToMeeting)",
      "Video editing",
      "HTML5, Dreamweaver, WordPress",
      "Image processing and optimization",
      "Adobe Experience Manager"
    ]
  },
  {
    id: "learning-systems-instructional-technology",
    title: "Learning Systems & Instructional Technology",
    iconName: "lms",
    items: [
      "LMS administration, course creation, grading, and learner support",
      "Platforms: Instructure Canvas, Edge, Docebo, Blackboard"
    ]
  },
  {
    id: "program-project-management-methodology",
    title: "Program & Project Management Methodology",
    iconName: "methodology",
    items: [
      "End-to-End Program Lifecycles",
      "Stakeholder & Vendor Management",
      "Resource & Timeline Optimization",
      "Needs Assessment & Gap Analysis",
      "Agile/ADDIE Methodologies, and Program Evaluation & Metrics (Kirkpatrick/ISO)",
      "Change Management & System Adoption"
    ]
  }
];

// 4. WORK HISTORY (All 16 authentic employment records from tedfinger.us)
export const WORK_HISTORY_DATA: WorkHistoryItem[] = [
  {
    id: "amca",
    company: "Accreditation Council for Medical Affairs (AMCA)",
    role: "Instructional Designer (freelance project)",
    dates: "July 2026 – Present",
    bullets: [
      "Updating course content in Articulate Rise and Storyline.",
      "Creating new course content in Articulate Rise and Storyline."
    ],
    website: "https://www.medicalaffairsspecialist.org/"
  },
  {
    id: "handshake-ai",
    company: "Handshake AI",
    role: "AI Content Trainer (freelance project)",
    dates: "April 2026 – Present",
    bullets: [
      "Optimizing AI for improved responses to complex re-writing and editing task prompts.",
      "Training AI models for digital graphics creation and video annotation."
    ],
    website: ""
  },
  {
    id: "verizon",
    company: "Verizon",
    role: "Instructional Designer",
    dates: "Oct 2023 - Dec 2025",
    bullets: [
      "Managed the end-to-end program execution of enterprise-wide technical training initiatives, leading cross-functional alignment across technical teams and business stakeholders.",
      "Translated complex system and process documentation into interactive eLearning using Articulate Storyline and Verizon Studio LMS.",
      "Leveraged AI tools, including Verizon GPT and NotebookLM to efficiently synthesize and organize large volumes of complex technical information, streamlining the development of clear, learner-focused instructional content and performance support materials.",
      "Facilitated stakeholder and SME alignment across multiple departments to define learning objectives, manage deliverable timelines, and ensure curriculum accuracy.",
      "Created custom graphics using Adobe Photoshop and PowerPoint, while adhering to company branding and visual guidelines.",
      "Contributed to improved LMS completion rates and measurable gains in employee performance.",
      "Updated and created new articles in the company's internal knowledge-base, using Adobe Experience Manager."
    ],
    website: ""
  },
  {
    id: "fis-global",
    company: "FIS Global",
    role: "Instructional Designer",
    dates: "Jul 2021 - Sep 2022",
    bullets: [
      "Designed and developed company-wide training on newly implemented Customer Service system for agents, managers, and quality evaluators.",
      "Collaborated with subject matter experts.",
      "Designed assessment questions to assess learners' understanding and to trigger LMS completion.",
      "Tools used: Articulate Storyline & Rise, Microsoft Office & Teams"
    ],
    website: "http://fisglobal.com"
  },
  {
    id: "rasmussen-university",
    company: "Rasmussen University",
    role: "Higher Ed Course Developer",
    dates: "Jan 2020 - Apr 2021",
    bullets: [
      "Prepared higher education courses to function in new version of Blackboard LMS.",
      "Performed full quality review on higher education courses.",
      "Made edits and updates, and adjust settings to courses as needed, directly in LMS.",
      "Trouble-shoot and resolve course issues that faculty and students report.",
      "Tools used: Blackboard LMS, Cherwell Service Management, Microsoft Office & Teams"
    ],
    website: "https://www.rasmussen.edu/"
  },
  {
    id: "thermo-fisher-scientific",
    company: "Thermo Fisher Scientific",
    role: "Instructional Designer",
    dates: "May 2018 - Jul 2020",
    bullets: [
      "Designed and developed eLearning for new and existing web-based systems to demonstrate how to perform various tasks.",
      "Collaborated with SMEs and wrote storyboard scripts, based on content provided.",
      "Recorded and edited voiceover narration.",
      "Developed micro learning modules, to provide quick, searchable on-the-job references for performing specific system tasks, which also combine into more comprehensive new hire training programs.",
      "Wrote and implemented quiz questions to assess learners' understanding, and to trigger completion in the LMS (Docebo LMS).",
      "Published eLearning modules for LMS and loaded into LMS.",
      "Developed job aid reference documents, providing step-by-step instructions.",
      "Tools used: Adobe Captivate, Camtasia, Audacity, Docebo LMS, Microsoft Office & Teams"
    ],
    website: "https://www.thermofisher.com/"
  },
  {
    id: "ani-inc-advanced-network-information",
    company: "ANI, Inc. (Advanced Network Information)",
    role: "eLearning Content Developer",
    dates: "Nov 2017 - May 2018",
    bullets: [
      "For a multinational IT and Telcom conglomerate, assisted in writing course outline and design document for new version of existing process training.",
      "Wrote storyboard scripts for eLearning project.",
      "Collaborated remotely with project team.",
      "Tools used: Egnyte Connect, Smartsheet, Inc., MS Office"
    ],
    website: ""
  },
  {
    id: "atos-information-technology-services-formerly-pursuit-health-advisors",
    company: "Atos Information Technology & Services (formerly Pursuit Health Advisors)",
    role: "Instructional Designer",
    dates: "May 2017 - Jul 2017",
    bullets: [
      "Instructional design and development of online systems simulations for Electronic Health Records (EHR) systems.",
      "Updated Captivate-based training modules by adding, omitting, re-wording, and re-ordering content, according to client's direction.",
      "Developed scored assessments with graded multiple-choice questions, and graded interactions.",
      "Edited narration scripts where necessary, and prepared text for voiceover recording.",
      "Tools used: Adobe Captivate 9, Microsoft Office Suite"
    ],
    website: ""
  },
  {
    id: "capital-education-llc",
    company: "Capital Education, LLC",
    role: "Instructional Designer",
    dates: "Mar 2017 - May 2017",
    bullets: [
      "Built, edited, configured, and updated higher learning courses using Learning Management Systems (LMS).",
      "Tools used: Instructure Canvas, Edge LMS, Microsoft Office Suite"
    ],
    website: "https://capitaleducation.com/"
  },
  {
    id: "independent-contractor",
    company: "Independent Contractor",
    role: "eLearning Specialist",
    dates: "Oct 2014 - Feb 2017",
    description: "(Clients include Agate Publishing & PulseLearning)",
    bullets: [
      "Contract instructional design, interactive media development, and authoring for corporate clients and educational publishers.",
      "Developed custom eLearning modules, animations, and assessment pipelines."
    ],
    website: ""
  },
  {
    id: "ann-robert-h-lurie-childrens-hospital-of-chicago",
    company: "Ann & Robert H. Lurie Children's Hospital of Chicago",
    role: "EPIC Training Consultant",
    dates: "Dec 2012 - Nov 2014",
    bullets: [
      "Developed eLearning system training on tasks using the Epic electronic health records system for various audiences within the hospital, published for LMS.",
      "Created, edited and updated instruction manuals, and on-the-job reference documentation.",
      "Developed and adhered to realistic project plans and schedules for projects I worked on.",
      "Tools used: Adobe Captivate, MS Office"
    ],
    website: "https://www.luriechildrens.org/"
  },
  {
    id: "cognitive-arts",
    company: "Cognitive Arts",
    role: "Contract eLearning Specialist",
    dates: "Sep 2010 - Nov 2012",
    bullets: [
      "For company's clients' projects, transformed complex content into engaging online learning.",
      "Developed interactive media for eLearning projects.",
      "Published LMS-ready eLearning courses, including customizing LMS-specific publish settings.",
      "Worked with clients and other project stakeholders to trouble-shoot LMS performance issues.",
      "Tools used: Adobe Captivate, Trivantis Lectora, Articulate Presenter, Engage & QuizMaker, MS Office"
    ],
    website: "https://www.niit.com/en/learning-outsourcing/"
  },
  {
    id: "pulselearning-lcc",
    company: "PulseLearning, LCC",
    role: "Senior Learning Specialist",
    dates: "Jun 2008 - Nov 2010",
    bullets: [
      "For a large educational publishing company, secured a large contract by developing and presenting a POC (Proof of Concept) sample, which effectively communicated the vision for the project to the client.",
      "Designed training programs for various company clients using the ADDIE process.",
      "Led project design and development.",
      "Tools used: Adobe Captivate, Trivantis Lectora, Articulate Presenter, Engage & QuizMaker, MS Office"
    ],
    website: "https://www.pulselearning.com/"
  },
  {
    id: "w-w-grainger-inc",
    company: "W. W. Grainger, Inc.",
    role: "Design Technologist",
    dates: "Dec 2004 - May 2008",
    bullets: [
      "Collaborated with management to implement customer service onboarding training program, putting processes, standards, and evaluation metrics in place, to secure ISO certification for the department.",
      "Designed training programs using the SADDIE process (company variation of the ADDIE process).",
      "Developed SCORM-compliant online courses and tutorials.",
      "Developed instructional animations and diagrams to visually describe new processes.",
      "Developed interactive simulations.",
      "Designed employee training curriculum, consisting of a blended approach, combining eLearning and ILT.",
      "Wrote storyboards for online training.",
      "Developed assessments for eLearning applications.",
      "Recorded voice-over narration for online courses and tutorials, and instructed the department how to record voiceover.",
      "Recorded and edited videos, to implement in online courses.",
      "Created eLearning Templates for training department.",
      "Provided expertise on grainger.com functionality.",
      "Delivered new hire training for customer service employees in classroom environment."
    ],
    website: "https://www.grainger.com/"
  },
  {
    id: "abbott-labs",
    company: "Abbott Labs",
    role: "Instructional Designer",
    dates: "Sep 2004 - Dec 2004",
    bullets: [
      "Designed, re-designed, developed, and updated internal websites.",
      "Collaborated with Global Pharmaceutical Operations (GPO) team members, as well as with project stakeholders within other divisions.",
      "Collaborate remotely with project team.",
      "Tools used: Egnyte Connect, Smartsheet, Inc., MS Office"
    ],
    website: "http://abbott.com"
  },
  {
    id: "capital-education-formerly-unext",
    company: "Capital Education (formerly Unext)",
    role: "Multimedia Developer",
    dates: "Aug 2002 - Sep 2004",
    bullets: [
      "Developed media for online university courses.",
      "Developed media assets to visually describe content for online courses.",
      "Worked with faculty, subject matter experts, editors and course engineers to identify most effective methods of adding instructional value to courses.",
      "Developed animations and interactive media for courses.",
      "Managed production of media for multiple projects."
    ],
    website: "http://capitaleducation.com"
  },
  {
    id: "infinet-solutions",
    company: "InfiNET Solutions",
    role: "Multimedia Developer",
    dates: "Mar 2001 - Apr 2002",
    bullets: [
      "Designed, developed and continued to manage and give strategic direction for the company website.",
      "Provided creative direction to Product Development team.",
      "Established usability standards for development of software applications.",
      "Coordinated online marketing efforts.",
      "Developed animated presentations to market products.",
      "Developed interactive diagrams to educate clients about issues involving online billing.",
      "Designed & developed clients' web sites.",
      "Designed & managed production of printed marketing materials."
    ],
    website: ""
  },
  {
    id: "sun-total-systems-llc-formerly-click2learncom",
    company: "Sun Total Systems, LLC (formerly Click2Learn.com)",
    role: "Senior Graphic Designer",
    dates: "Jan 2000 - Feb 2001",
    bullets: [
      "Responsible for working with clients to develop look and feel of e-learning projects.",
      "Developed screen type templates for projects.",
      "Responsible for designing interface, navigation, and interactive functionality for each project.",
      "Worked with Subject Matter Experts to determine best approach for communicating course content.",
      "Responsible for developing and managing production graphics.",
      "Responsible for identifying and allocating resources to projects assigned to the company's Chicago area facility."
    ],
    website: ""
  }
];

// 5. CONTACT SECTION DATA
export const CONTACT_DATA: ContactData = {
  headline: "I can't wait to help you with your next eLearning project!",
  introText: "I'm open to working both contract positions and as a full-time employee, I can offer reasonable rates as well as the option to work remotely.",
  email: "ted.finger@me.com",
  phone: "262-612-9079",
  phoneFormatted: "(262) 612-9079",
  website: "https://tedfinger.me/",
  websiteDisplay: "tedfinger.me",
  linkedin: "https://www.linkedin.com/in/tedfinger",
  resumeUrl: "/assets/aistudio/Ted_Finger_Resume_bfcabe48.pdf"
};
