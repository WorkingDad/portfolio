import { useEffect } from 'react';
import { SampleItem } from '../data/portfolioData';
import { ExternalLink, X } from 'lucide-react';

interface SampleModalProps {
  sample: SampleItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export function SampleModal({ sample, isOpen, onClose }: SampleModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !sample) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="sample-modal-headline"
    >
      <div 
        className="relative w-full max-w-5xl max-h-[90dvh] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50/80 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <h2 id="sample-modal-headline" className="text-base sm:text-lg font-bold text-slate-900 truncate">
              {sample.title}
            </h2>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href={sample.embedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-200/70 hover:bg-slate-200 transition-colors"
            >
              <span>Open in New Tab</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <button
              onClick={onClose}
              className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-200/60 rounded-lg transition-colors"
              aria-label="Close interactive modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6">
          {/* Full-Width 16:9 Aspect Ratio Embed Frame */}
          <div className="relative w-full aspect-video bg-slate-950 rounded-xl overflow-hidden border border-slate-800 shadow-inner">
            <iframe
              src={sample.embedUrl}
              title={sample.title}
              className="w-full h-full border-0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            />
          </div>

          {/* Description & Overview */}
          <div className="space-y-4">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                Project Overview & Context
              </h3>
            </div>

            <div className="p-5 bg-slate-50 border border-slate-200/80 rounded-xl text-sm text-slate-700 leading-relaxed space-y-3">
              <p>{sample.modalDescription}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
