import { useState, useEffect } from 'react';
import { 
  INTRO_DATA, 
  SAMPLES_DATA, 
  SKILL_GROUPS_DATA, 
  WORK_HISTORY_DATA, 
  CONTACT_DATA, 
  SampleItem 
} from './data/portfolioData';
import { SampleCard } from './components/SampleCard';
import { SampleModal } from './components/SampleModal';
import { TableOfContentsNav } from './components/TableOfContentsNav';
import { 
  ArrowUpRight, 
  Sparkles, 
  Mail, 
  Phone, 
  Linkedin, 
  Download, 
  ChevronDown, 
  ChevronRight,
  CheckCircle2, 
  ExternalLink,
  Send,
  Building2,
  Wrench,
  Check,
  Globe,
  Laptop,
  Image,
  Layers,
  Settings,
  Home,
  Play,
  Briefcase,
  Menu,
  X
} from 'lucide-react';

const SECTIONS = [
  { id: 'home', name: 'Home', icon: Home },
  { id: 'samples', name: 'Samples', icon: Play },
  { id: 'skills', name: 'Skills', icon: Wrench },
  { id: 'experience', name: 'Experience', icon: Briefcase },
  { id: 'contact', name: 'Contact', icon: Mail },
];

export default function App() {
  const [activeSample, setActiveSample] = useState<SampleItem | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Active section scroll spy
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 140;
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i].id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(SECTIONS[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Accordion state for Work History (top open by default for immediate preview)
  const [openWorkIds, setOpenWorkIds] = useState<Record<string, boolean>>({
    'amca': true,
    'handshake-ai': true,
    'verizon': true,
    'fis-global': true,
    'rasmussen-university': true
  });

  // Accordion state for Skills (all open by default for rich visibility)
  const [openSkillIds, setOpenSkillIds] = useState<Record<string, boolean>>({
    'elearning-authoring-proficiencies': true,
    'media-development-tools': true,
    'additional-technical-skills': true
  });

  // Contact Form state
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    website: '',
    projectGoals: '',
    timeline: '',
    budget: '',
    message: ''
  });

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const emailSubject = `eLearning Project Inquiry: ${formData.firstName} ${formData.lastName}`;
    const emailBody = [
      `Name: ${formData.firstName} ${formData.lastName}`,
      `Email: ${formData.email}`,
      `Phone: ${formData.phone || 'N/A'}`,
      `Website: ${formData.website || 'N/A'}`,
      `Estimated Timeline: ${formData.timeline || 'N/A'}`,
      `Budget: ${formData.budget || 'N/A'}`,
      ``,
      `Project Goals & Outline:`,
      formData.projectGoals || 'N/A',
      ``,
      `Message:`,
      formData.message
    ].join('\n');

    const mailtoUrl = `mailto:tedfinger40@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

    try {
      const response = await fetch('https://formsubmit.co/ajax/tedfinger40@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: emailSubject,
          _replyto: formData.email,
          _template: 'table',
          'First Name': formData.firstName,
          'Last Name': formData.lastName,
          'Email': formData.email,
          'Phone': formData.phone || 'Not provided',
          'Website': formData.website || 'Not provided',
          'Estimated Timeline': formData.timeline || 'Not provided',
          'Budget': formData.budget || 'Not provided',
          'Project Goals and Outline': formData.projectGoals || 'Not provided',
          'Message': formData.message
        })
      });

      if (!response.ok) {
        window.location.href = mailtoUrl;
      }
    } catch {
      window.location.href = mailtoUrl;
    } finally {
      setIsSubmitting(false);
      setFormSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans w-full max-w-full overflow-x-hidden">
      {/* Accessibility Skip-to-Content Anchor */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2.5 focus:bg-[#0B1D45] focus:text-white focus:font-semibold focus:text-xs focus:rounded-lg focus:shadow-xl focus:outline-hidden focus:ring-2 focus:ring-sky-400 focus:ring-offset-2"
      >
        Skip to main content
      </a>

      {/* Top Header (Single sticky navigation bar optimized for Safari on iOS) */}
      <header className="sticky top-0 z-40 bg-white/98 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between gap-3 sm:gap-6">
          {/* Zone 1: Brand Wordmark */}
          <a href="#home" aria-label="Ted Finger - eLearning Specialist (Jump to Home)" className="flex items-center gap-2.5 sm:gap-3 group whitespace-nowrap min-w-0">
            <div className="flex flex-col text-[#0B1D45]">
              <span className="font-extrabold tracking-tight text-base sm:text-lg leading-tight group-hover:opacity-80 transition-opacity truncate">
                Ted Finger
              </span>
              <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                eLearning Specialist
              </span>
            </div>
          </a>

          {/* Zone 2: Nav Links (Desktop) */}
          <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
            {SECTIONS.map((sec) => (
              <a
                key={sec.id}
                href={`#${sec.id}`}
                className={`transition-colors whitespace-nowrap shrink-0 ${
                  activeSection === sec.id ? 'text-[#0B1D45] font-bold' : 'hover:text-slate-900'
                }`}
              >
                {sec.name}
              </a>
            ))}
          </nav>

          {/* Zone 3: Primary Action CTA & Mobile Hamburger */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <a
              href="#contact"
              className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors whitespace-nowrap shadow-xs"
            >
              Get in Touch
            </a>

            {/* Mobile Hamburger Menu Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(prev => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-primary-menu"
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-lg border border-slate-200 bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-slate-900" />
              ) : (
                <Menu className="w-5 h-5 text-slate-800" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu: Clean list of 5 main sections */}
        {mobileMenuOpen && (
          <div
            id="mobile-primary-menu"
            role="region"
            aria-label="Mobile Navigation Menu"
            className="md:hidden border-t border-slate-200 bg-white/98 shadow-xl animate-in fade-in slide-in-from-top-2 duration-200 max-h-[calc(100dvh-64px)] overflow-y-auto"
          >
            <div className="px-4 py-3 space-y-1">
              <div className="flex items-center justify-between pb-2 mb-1 border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <span>Menu</span>
                <span className="text-[10px] font-mono">5 Sections</span>
              </div>

              {SECTIONS.map((sec) => {
                const isActive = activeSection === sec.id;
                const IconComponent = sec.icon;
                return (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-3.5 py-3 rounded-xl transition-all ${
                      isActive
                        ? 'bg-sky-50 text-[#0B1D45] font-bold'
                        : 'hover:bg-slate-50 text-slate-700 hover:text-slate-900 font-medium'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                        isActive
                          ? 'bg-[#0B1D45] text-white shadow-xs'
                          : 'bg-slate-100 text-slate-600'
                      }`}>
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-semibold">{sec.name}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {isActive && (
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-sky-100 text-sky-800">
                          Current
                        </span>
                      )}
                      <ChevronRight className={`w-4 h-4 ${isActive ? 'text-sky-600' : 'text-slate-300'}`} />
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        )}
      </header>

      {/* Sticky Table of Contents Quick Reference Dropdown Nav */}
      <TableOfContentsNav 
        onSelectSample={(sample) => setActiveSample(sample)}
        onOpenWorkHistory={(workId) => setOpenWorkIds(prev => ({ ...prev, [workId]: true }))}
        onExpandAllWork={() => {
          const allOpen: Record<string, boolean> = {};
          WORK_HISTORY_DATA.forEach(w => allOpen[w.id] = true);
          setOpenWorkIds(allOpen);
        }}
      />

      {/* Main Content Area */}
      <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-hidden">
        {/* Section: Home / Intro ("What I do") */}
        <section id="home" className="relative overflow-hidden border-b border-slate-200 bg-linear-to-b from-white via-slate-50/50 to-slate-100/30 py-12 sm:py-16 lg:py-20 scroll-mt-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-sky-50 border border-sky-200/80 rounded-md text-xs font-semibold text-sky-800">
                  <Sparkles className="w-3.5 h-3.5 text-sky-600" />
                  <span>Instructional Design & Multimedia Development</span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.15] text-balance">
                  {INTRO_DATA.heading}
                </h1>

                <div className="space-y-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                  {INTRO_DATA.paragraphs.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <a
                    href="#samples"
                    className="px-5 py-2.5 bg-sky-600 hover:bg-sky-500 text-white rounded-lg font-semibold text-sm shadow-xs transition-colors inline-flex items-center gap-2"
                  >
                    <span>View Interactive Samples</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>

                  <a
                    href={CONTACT_DATA.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg font-medium text-sm shadow-2xs transition-colors inline-flex items-center gap-2"
                  >
                    <Download className="w-4 h-4 text-slate-500" />
                    <span>Download Resume (PDF)</span>
                  </a>
                </div>

                {/* Direct Contact & Portfolio Website Links (above Samples section) */}
                <div className="pt-5 border-t border-slate-200/90 flex flex-wrap items-center gap-y-3 gap-x-6 text-xs sm:text-sm">
                  <a
                    href={`mailto:${CONTACT_DATA.email}`}
                    className="inline-flex items-center gap-2 text-slate-700 hover:text-[#0B1D45] transition-colors font-medium group"
                    aria-label={`Email Ted Finger at ${CONTACT_DATA.email}`}
                  >
                    <span className="p-1.5 rounded-md bg-sky-50 group-hover:bg-sky-100 text-sky-700 transition-colors">
                      <Mail className="w-3.5 h-3.5" />
                    </span>
                    <span className="underline decoration-slate-300 group-hover:decoration-[#0B1D45] underline-offset-3">{CONTACT_DATA.email}</span>
                  </a>

                  <a
                    href={`tel:${CONTACT_DATA.phone}`}
                    className="inline-flex items-center gap-2 text-slate-700 hover:text-[#0B1D45] transition-colors font-medium group"
                    aria-label={`Call Ted Finger at ${CONTACT_DATA.phoneFormatted}`}
                  >
                    <span className="p-1.5 rounded-md bg-sky-50 group-hover:bg-sky-100 text-sky-700 transition-colors">
                      <Phone className="w-3.5 h-3.5" />
                    </span>
                    <span className="underline decoration-slate-300 group-hover:decoration-[#0B1D45] underline-offset-3">{CONTACT_DATA.phoneFormatted}</span>
                  </a>

                  <a
                    href="https://linkedin.com/in/tedfinger"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-slate-700 hover:text-[#0B1D45] transition-colors font-medium group"
                    aria-label="Visit Ted Finger's LinkedIn profile"
                  >
                    <span className="p-1.5 rounded-md bg-sky-50 group-hover:bg-sky-100 text-sky-700 transition-colors">
                      <Linkedin className="w-3.5 h-3.5" />
                    </span>
                    <span className="underline decoration-slate-300 group-hover:decoration-[#0B1D45] underline-offset-3">linkedin.com/in/tedfinger</span>
                    <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-slate-600" />
                  </a>
                </div>
              </div>

              {/* Right Column: Hero Banner Image */}
              <div className="lg:col-span-5">
                <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-xl bg-slate-900 aspect-16/10 group">
                  <img
                    src={INTRO_DATA.bannerImage}
                    alt="Ted Finger website banner"
                    loading="eager"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-slate-950/70 via-transparent to-transparent flex items-end p-5">
                    <div className="text-white space-y-1">
                      <div className="flex items-center gap-2 text-xs font-mono text-sky-400">
                        <span>Instructional Design & eLearning Development</span>
                      </div>
                      <p className="text-xs text-slate-300">
                        Articulate Storyline & Rise 360 · Adobe Captivate
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Samples */}
        <section id="samples" className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-32">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-700">
                Portfolio Gallery
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Samples
              </h2>
              <p className="text-sm text-slate-500 max-w-xl">
                Interactive learning experiences, animated Proof of Concept demonstrations, and MBA courseware. Click any card to launch the player.
              </p>
            </div>

            <div className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-md self-start sm:self-auto">
              {SAMPLES_DATA.length} Featured Modules & Media
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {SAMPLES_DATA.map((sample) => (
              <SampleCard
                key={sample.id}
                sample={sample}
                onSelect={(s) => setActiveSample(s)}
              />
            ))}
          </div>
        </section>

        {/* Section: Skills */}
        <section id="skills" className="py-16 sm:py-20 bg-slate-50/70 border-y border-slate-200/80 scroll-mt-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-600">
                Core Proficiencies
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1D45] tracking-tight">
                Skills & Technical Competencies
              </h2>
              <p className="text-sm text-slate-600 max-w-3xl">
                Key tools, platforms, and methodologies I use to design and deliver effective learning experiences.
              </p>
            </div>

            {/* Row 1: 3-Column Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {SKILL_GROUPS_DATA.slice(0, 3).map((group) => (
                <article
                  key={group.id}
                  id={`skill-${group.id}`}
                  className="bg-white rounded-2xl border border-sky-100/90 p-6 sm:p-7 shadow-xs scroll-mt-32 flex flex-col justify-between hover:shadow-md transition-shadow"
                >
                  <div>
                    <div className="flex items-center gap-4 pb-4 border-b border-slate-100 mb-5">
                      <div className="w-12 h-12 rounded-xl bg-sky-50 flex items-center justify-center text-sky-600 shrink-0">
                        {group.iconName === 'authoring' && <Laptop className="w-6 h-6 text-sky-600" />}
                        {group.iconName === 'media' && <Image className="w-6 h-6 text-sky-600" />}
                        {group.iconName === 'web' && <Globe className="w-6 h-6 text-sky-600" />}
                      </div>
                      <h3 className="font-bold text-[#0B1D45] text-base sm:text-lg leading-snug">
                        {group.title}
                      </h3>
                    </div>

                    <ul className="space-y-3">
                      {group.items.map((item, idx) => (
                        <li key={idx} className="text-xs sm:text-sm text-slate-800 flex items-start gap-2.5 leading-snug">
                          <CheckCircle2 className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>

            {/* Row 2: 2-Column Asymmetric Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Card 4: Learning Systems & Instructional Technology */}
              {SKILL_GROUPS_DATA[3] && (
                <article
                  id={`skill-${SKILL_GROUPS_DATA[3].id}`}
                  className="lg:col-span-5 bg-white rounded-2xl border border-sky-100/90 p-6 sm:p-7 shadow-xs scroll-mt-32 flex flex-col justify-between hover:shadow-md transition-shadow"
                >
                  <div>
                    <div className="flex items-center gap-4 pb-4 border-b border-slate-100 mb-5">
                      <div className="w-12 h-12 rounded-xl bg-sky-50 flex items-center justify-center text-sky-600 shrink-0">
                        <Layers className="w-6 h-6 text-sky-600" />
                      </div>
                      <h3 className="font-bold text-[#0B1D45] text-base sm:text-lg leading-snug">
                        {SKILL_GROUPS_DATA[3].title}
                      </h3>
                    </div>

                    <ul className="space-y-3.5">
                      {SKILL_GROUPS_DATA[3].items.map((item, idx) => (
                        <li key={idx} className="text-xs sm:text-sm text-slate-800 flex items-start gap-2.5 leading-relaxed">
                          <CheckCircle2 className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              )}

              {/* Card 5: Program & Project Management Methodology */}
              {SKILL_GROUPS_DATA[4] && (
                <article
                  id={`skill-${SKILL_GROUPS_DATA[4].id}`}
                  className="lg:col-span-7 bg-white rounded-2xl border border-sky-100/90 p-6 sm:p-7 shadow-xs scroll-mt-32 flex flex-col justify-between hover:shadow-md transition-shadow"
                >
                  <div>
                    <div className="flex items-center gap-4 pb-4 border-b border-slate-100 mb-5">
                      <div className="w-12 h-12 rounded-xl bg-sky-50 flex items-center justify-center text-sky-600 shrink-0">
                        <Settings className="w-6 h-6 text-sky-600" />
                      </div>
                      <h3 className="font-bold text-[#0B1D45] text-base sm:text-lg leading-snug">
                        {SKILL_GROUPS_DATA[4].title}
                      </h3>
                    </div>

                    <ul className="space-y-3">
                      {SKILL_GROUPS_DATA[4].items.map((item, idx) => (
                        <li key={idx} className="text-xs sm:text-sm text-slate-800 flex items-start gap-2.5 leading-snug">
                          <CheckCircle2 className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              )}
            </div>
          </div>
        </section>

        {/* Section: Professional Experience */}
        <section id="experience" className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-32">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-700">
                Employment History
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Professional Experience
              </h2>
              <p className="text-sm text-slate-600 max-w-4xl lg:max-w-none">
                Comprehensive career trajectory spanning enterprise technical training, health care systems (Epic EHR), higher education, and corporate eLearning.
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => {
                  const allOpen: Record<string, boolean> = {};
                  WORK_HISTORY_DATA.forEach(w => allOpen[w.id] = true);
                  setOpenWorkIds(allOpen);
                }}
                className="text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-md transition-colors cursor-pointer"
              >
                Expand All
              </button>
              <button
                onClick={() => setOpenWorkIds({})}
                className="text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-md transition-colors cursor-pointer"
              >
                Collapse All
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {WORK_HISTORY_DATA.map((work) => {
              const isOpen = Boolean(openWorkIds[work.id]);
              return (
                <details
                  key={work.id}
                  id={`work-${work.id}`}
                  open={isOpen}
                  onToggle={(e) => {
                    const isNowOpen = (e.currentTarget as HTMLDetailsElement).open;
                    setOpenWorkIds(prev => ({ ...prev, [work.id]: isNowOpen }));
                  }}
                  className="group rounded-xl border border-slate-200 bg-white shadow-xs overflow-hidden transition-all duration-200 scroll-mt-32"
                >
                  <summary className="list-none [&::-webkit-details-marker]:hidden w-full px-6 py-5 text-left flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-slate-50 transition-colors cursor-pointer select-none focus:outline-hidden focus-visible:ring-2 focus-visible:ring-sky-500">
                    <div>
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-sky-600 shrink-0" />
                        <h3 className="text-base sm:text-lg font-bold text-slate-900">
                          {work.company}
                        </h3>
                      </div>
                      <div className="text-xs sm:text-sm font-semibold text-sky-700 mt-0.5 ml-6">
                        {work.role}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 self-start sm:self-center ml-6 sm:ml-0">
                      {work.dates && (
                        <span className="font-mono text-xs text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
                          {work.dates}
                        </span>
                      )}
                      <ChevronDown className="w-4 h-4 text-slate-400 transition-transform duration-200 group-open:rotate-180" />
                    </div>
                  </summary>

                  <div className="px-6 pb-6 pt-2 border-t border-slate-100 space-y-4 animate-in fade-in duration-150">
                    {work.description && (
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium bg-sky-50/50 p-4 rounded-lg border border-sky-100">
                        {work.description}
                      </p>
                    )}

                    {work.bullets.length > 0 && (
                      <ul className="space-y-2 pt-1">
                        {work.bullets.map((bullet, bIdx) => (
                          <li key={bIdx} className="text-xs sm:text-sm text-slate-600 flex items-start gap-2.5 leading-relaxed">
                            <span className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-2 shrink-0" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {work.website && (
                      <div className="pt-2">
                        <a
                          href={work.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-700 hover:text-sky-900 transition-colors"
                        >
                          <span>Visit {work.company}</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    )}
                  </div>
                </details>
              );
            })}
          </div>
        </section>

        {/* Section: Contact */}
        <section id="contact" className="py-16 sm:py-20 bg-slate-900 text-white border-t border-slate-800 scroll-mt-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
              {/* Left Column: Direct Info */}
              <div className="lg:col-span-5 space-y-6">
                <div className="space-y-2">
                  <span className="text-xs font-mono uppercase tracking-widest text-sky-400">
                    Get in Touch
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    {CONTACT_DATA.headline}
                  </h2>
                </div>

                <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                  {CONTACT_DATA.introText}
                </div>

                <div className="pt-4 space-y-3">
                  <a
                    href={`mailto:${CONTACT_DATA.email}`}
                    className="flex items-center gap-3 p-3.5 bg-slate-800/80 hover:bg-slate-800 rounded-xl border border-slate-700 text-slate-200 transition-colors group"
                  >
                    <Mail className="w-5 h-5 text-sky-400 shrink-0" />
                    <div>
                      <div className="text-[11px] text-slate-400 uppercase tracking-wide">Email Direct</div>
                      <div className="text-sm font-semibold group-hover:text-white">{CONTACT_DATA.email}</div>
                    </div>
                  </a>

                  <a
                    href={`tel:${CONTACT_DATA.phone}`}
                    className="flex items-center gap-3 p-3.5 bg-slate-800/80 hover:bg-slate-800 rounded-xl border border-slate-700 text-slate-200 transition-colors group"
                  >
                    <Phone className="w-5 h-5 text-sky-400 shrink-0" />
                    <div>
                      <div className="text-[11px] text-slate-400 uppercase tracking-wide">Phone</div>
                      <div className="text-sm font-semibold group-hover:text-white">{CONTACT_DATA.phoneFormatted}</div>
                    </div>
                  </a>

                  <a
                    href={CONTACT_DATA.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3.5 bg-slate-800/80 hover:bg-slate-800 rounded-xl border border-slate-700 text-slate-200 transition-colors group"
                  >
                    <Linkedin className="w-5 h-5 text-sky-400 shrink-0" />
                    <div>
                      <div className="text-[11px] text-slate-400 uppercase tracking-wide">LinkedIn Profile</div>
                      <div className="text-sm font-semibold group-hover:text-white">linkedin.com/in/tedfinger</div>
                    </div>
                  </a>

                  <a
                    href={CONTACT_DATA.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3.5 bg-sky-600 hover:bg-sky-500 rounded-xl text-white font-semibold transition-colors justify-center shadow-md"
                  >
                    <Download className="w-5 h-5" />
                    <span>Download Ted Finger Resume (PDF)</span>
                  </a>
                </div>
              </div>

              {/* Right Column: Contact Message Form */}
              <div id="contact-form" className="lg:col-span-7 bg-slate-800/90 border border-slate-700/80 rounded-2xl p-6 sm:p-8 backdrop-blur-sm scroll-mt-32">
                <h3 className="text-lg font-bold text-white mb-2">Leave a Message</h3>
                <p className="text-xs text-slate-300 mb-6">
                  Fill out the form below and I will reply promptly regarding your project needs.
                </p>

                {formSubmitted ? (
                  <div className="p-6 sm:p-8 bg-emerald-950/80 border border-emerald-600/80 rounded-xl text-center space-y-4">
                    <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                      <Check className="w-6 h-6" />
                    </div>
                    <h4 className="text-base sm:text-lg font-bold text-white">Thank you for your message!</h4>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-md mx-auto">
                      Your inquiry has been sent to{' '}
                      <a href="mailto:tedfinger40@gmail.com" className="text-sky-400 underline font-semibold">
                        tedfinger40@gmail.com
                      </a>. I will review your project goals and reply promptly.
                    </p>
                    <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                      <button
                        onClick={() => {
                          setFormSubmitted(false);
                          setFormData({
                            firstName: '',
                            lastName: '',
                            email: '',
                            phone: '',
                            website: '',
                            projectGoals: '',
                            timeline: '',
                            budget: '',
                            message: ''
                          });
                        }}
                        className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-semibold rounded-lg text-white transition-colors cursor-pointer"
                      >
                        Send Another Message
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="contact-first-name" className="block text-xs font-medium text-slate-300 mb-1">First Name</label>
                        <input
                          id="contact-first-name"
                          name="firstName"
                          type="text"
                          required
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-white text-xs sm:text-sm focus:outline-hidden focus:border-sky-500"
                          placeholder="Your first name"
                        />
                      </div>
                      <div>
                        <label htmlFor="contact-last-name" className="block text-xs font-medium text-slate-300 mb-1">Last Name</label>
                        <input
                          id="contact-last-name"
                          name="lastName"
                          type="text"
                          required
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-white text-xs sm:text-sm focus:outline-hidden focus:border-sky-500"
                          placeholder="Your last name"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="contact-email" className="block text-xs font-medium text-slate-300 mb-1">Email Address</label>
                        <input
                          id="contact-email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-white text-xs sm:text-sm focus:outline-hidden focus:border-sky-500"
                          placeholder="name@example.com"
                        />
                      </div>
                      <div>
                        <label htmlFor="contact-phone" className="block text-xs font-medium text-slate-300 mb-1">Phone Number (Optional)</label>
                        <input
                          id="contact-phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-white text-xs sm:text-sm focus:outline-hidden focus:border-sky-500"
                          placeholder="(555) 000-0000"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="contact-website" className="block text-xs font-medium text-slate-300 mb-1">Website (Optional)</label>
                      <input
                        id="contact-website"
                        name="website"
                        type="url"
                        value={formData.website}
                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-white text-xs sm:text-sm focus:outline-hidden focus:border-sky-500"
                        placeholder="https://example.com"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="contact-timeline" className="block text-xs font-medium text-slate-300 mb-1">Estimated Timeline</label>
                        <input
                          id="contact-timeline"
                          name="timeline"
                          type="text"
                          value={formData.timeline}
                          onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-white text-xs sm:text-sm focus:outline-hidden focus:border-sky-500"
                          placeholder="e.g. 4–6 weeks, Immediate, Flexible"
                        />
                      </div>
                      <div>
                        <label htmlFor="contact-budget" className="block text-xs font-medium text-slate-300 mb-1">Budget</label>
                        <input
                          id="contact-budget"
                          name="budget"
                          type="text"
                          value={formData.budget}
                          onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-white text-xs sm:text-sm focus:outline-hidden focus:border-sky-500"
                          placeholder="e.g. $5k–$10k, Hourly, TBD"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="contact-project-goals" className="block text-xs font-medium text-slate-300 mb-1">Project Goals and Outline</label>
                      <textarea
                        id="contact-project-goals"
                        name="projectGoals"
                        rows={3}
                        value={formData.projectGoals}
                        onChange={(e) => setFormData({ ...formData, projectGoals: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-white text-xs sm:text-sm focus:outline-hidden focus:border-sky-500"
                        placeholder="Describe key learning objectives, target audience, course outline, or delivery requirements..."
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-message" className="block text-xs font-medium text-slate-300 mb-1">Message</label>
                      <textarea
                        id="contact-message"
                        name="message"
                        rows={3}
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-white text-xs sm:text-sm focus:outline-hidden focus:border-sky-500"
                        placeholder="Any additional details, questions, or notes..."
                      />
                    </div>

                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      By clicking &apos;Send Message&apos;, you agree to be contacted regarding your message. Information submitted is proprietary and confidential and will not be shared with third parties.
                    </p>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 bg-sky-500 hover:bg-sky-400 disabled:bg-sky-500/70 text-slate-950 font-bold text-sm rounded-lg transition-colors flex items-center justify-center gap-2 shadow-md cursor-pointer disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                          <span>Sending to tedfinger40@gmail.com...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Clean Production Footer */}
      <footer className="bg-white border-t border-slate-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-800">Ted Finger</span>
            <span>·</span>
            <span>eLearning Specialist & Instructional Designer</span>
            <span>·</span>
            <span>© {new Date().getFullYear()}</span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href={CONTACT_DATA.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-900 transition-colors"
            >
              LinkedIn
            </a>
            <a
              href={`mailto:${CONTACT_DATA.email}`}
              className="hover:text-slate-900 transition-colors font-medium text-slate-700"
            >
              {CONTACT_DATA.email}
            </a>
          </div>
        </div>
      </footer>

      {/* Native Full-Width Embed Modal */}
      <SampleModal
        sample={activeSample}
        isOpen={!!activeSample}
        onClose={() => setActiveSample(null)}
      />
    </div>
  );
}
