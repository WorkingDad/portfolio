import { useState, useEffect, useRef } from 'react';
import { 
  ListTree, 
  ChevronDown, 
  ChevronRight,
  Home,
  Play,
  Wrench, 
  Briefcase, 
  Mail, 
  X, 
  Menu
} from 'lucide-react';
import { SampleItem } from '../data/portfolioData';

interface TableOfContentsNavProps {
  onSelectSample?: (sample: SampleItem) => void;
  onOpenWorkHistory?: (workId: string) => void;
  onExpandAllWork?: () => void;
}

interface SectionMeta {
  id: string;
  name: string;
  icon: typeof Home;
}

const SECTIONS: SectionMeta[] = [
  { id: 'home', name: 'Home', icon: Home },
  { id: 'samples', name: 'Samples', icon: Play },
  { id: 'skills', name: 'Skills', icon: Wrench },
  { id: 'experience', name: 'Experience', icon: Briefcase },
  { id: 'contact', name: 'Contact', icon: Mail },
];

export function TableOfContentsNav({
  onSelectSample: _onSelectSample,
  onOpenWorkHistory: _onOpenWorkHistory,
  onExpandAllWork: _onExpandAllWork
}: TableOfContentsNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const navRef = useRef<HTMLDivElement>(null);

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

  // Close dropdown on click outside or Escape key
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleAnchorClick = () => {
    setIsOpen(false);
  };

  const currentSectionMeta = SECTIONS.find(s => s.id === activeSection) || SECTIONS[0];

  return (
    <nav 
      ref={navRef}
      aria-label="Table of Contents Quick Jump"
      className="hidden md:block sticky z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-2xs transition-all"
      style={{ top: '72px' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-11 sm:h-12 flex items-center justify-between gap-4">
          {/* Left: Mobile Hamburger / Expandable Navigation Trigger */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <button
              type="button"
              onClick={() => setIsOpen(prev => !prev)}
              aria-expanded={isOpen}
              aria-controls="toc-expanded-menu"
              aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
              className={`inline-flex items-center justify-center gap-2 p-2 sm:px-3 sm:py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer border ${
                isOpen
                  ? 'bg-[#0B1D45] text-white border-[#0B1D45] shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200/80 text-slate-800 border-slate-200'
              }`}
            >
              {isOpen ? (
                <X className="w-5 h-5 sm:w-3.5 sm:h-3.5 text-current" />
              ) : (
                <>
                  <Menu className="w-5 h-5 sm:hidden text-slate-800" />
                  <ListTree className="hidden sm:inline-block w-3.5 h-3.5" />
                </>
              )}
              <span className="hidden sm:inline">Table of Contents</span>
              <ChevronDown className={`hidden sm:inline-block w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Current Active Section breadcrumb indicator */}
            <div className="flex items-center gap-1.5 sm:gap-2 text-xs text-slate-500 truncate" aria-live="polite">
              <span className="text-slate-300">/</span>
              <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-400 hidden xs:inline">Section:</span>
              <span className="font-semibold text-[#0B1D45] truncate text-xs">
                {currentSectionMeta.name}
              </span>
            </div>
          </div>

          {/* Right: Quick Jump Semantic Page Anchors */}
          <div className="hidden sm:flex items-center gap-1 sm:gap-1.5 overflow-x-auto no-scrollbar py-1" role="navigation" aria-label="Page Sections">
            {SECTIONS.map((sec) => {
              const isActive = activeSection === sec.id;
              return (
                <a
                  key={sec.id}
                  href={`#${sec.id}`}
                  aria-current={isActive ? 'true' : undefined}
                  className={`px-2.5 py-1 rounded-md text-xs font-semibold whitespace-nowrap transition-colors shrink-0 ${
                    isActive
                      ? 'bg-[#0B1D45] text-white shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {sec.name}
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* Expandable Navigation Menu: Clean List of the 5 Main Sections */}
      {isOpen && (
        <div 
          id="toc-expanded-menu"
          role="region"
          aria-label="Navigation Sections Menu"
          className="border-t border-slate-200 bg-white shadow-xl animate-in fade-in slide-in-from-top-2 duration-200"
        >
          <div className="max-w-md mx-auto px-4 py-3 sm:py-4">
            <div className="flex items-center justify-between pb-2.5 mb-1.5 border-b border-slate-100">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Menu
              </span>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-xs text-slate-400 hover:text-slate-700 p-1 rounded-md hover:bg-slate-100 transition-colors cursor-pointer"
                aria-label="Close navigation menu"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <nav aria-label="Main sections list" className="space-y-1">
              {SECTIONS.map((sec) => {
                const isActive = activeSection === sec.id;
                const IconComponent = sec.icon;
                return (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    onClick={handleAnchorClick}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all group ${
                      isActive
                        ? 'bg-sky-50 text-[#0B1D45] font-bold'
                        : 'hover:bg-slate-50 text-slate-700 hover:text-slate-900 font-medium'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                        isActive
                          ? 'bg-[#0B1D45] text-white shadow-xs'
                          : 'bg-slate-100 text-slate-600 group-hover:bg-sky-100 group-hover:text-sky-700'
                      }`}>
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <span className="text-sm">
                        {sec.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {isActive && (
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-sky-100 text-sky-800">
                          Current
                        </span>
                      )}
                      <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${
                        isActive ? 'text-sky-600 translate-x-0.5' : 'text-slate-300 group-hover:text-slate-600 group-hover:translate-x-0.5'
                      }`} />
                    </div>
                  </a>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </nav>
  );
}
