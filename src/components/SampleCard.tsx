import React from 'react';
import { SampleItem } from '../data/portfolioData';
import { Play, ArrowUpRight } from 'lucide-react';

interface SampleCardProps {
  sample: SampleItem;
  onSelect: (sample: SampleItem) => void;
}

export function SampleCard({ sample, onSelect }: SampleCardProps) {
  return (
    <article 
      id={`sample-${sample.id}`}
      onClick={() => onSelect(sample)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(sample);
        }
      }}
      tabIndex={0}
      role="button"
      aria-haspopup="dialog"
      aria-label={`Open project preview for ${sample.title}`}
      className="group flex flex-col bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-200 hover:-translate-y-1 cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 scroll-mt-32"
    >
      {/* 16:9 Aspect Ratio Media Container */}
      <div className="relative aspect-video w-full bg-slate-900 overflow-hidden">
        {sample.thumbnail ? (
          <img 
            src={sample.thumbnail} 
            alt={sample.title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-full h-full bg-linear-to-br from-slate-800 to-slate-950 flex items-center justify-center p-6 text-center">
            <span className="text-sm font-semibold text-slate-300">{sample.title}</span>
          </div>
        )}
        
        <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/40 transition-colors flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-white/90 text-slate-900 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-sky-500 group-hover:text-white transition-all duration-200">
            <Play className="w-5 h-5 ml-0.5 fill-current" />
          </div>
        </div>

        {/* Category Badge */}
        {sample.badge && (
          <div className="absolute top-3 left-3">
            <span className="text-[11px] font-semibold tracking-wide uppercase px-2.5 py-1 bg-slate-900/85 text-white backdrop-blur-xs rounded-md">
              {sample.badge}
            </span>
          </div>
        )}
      </div>

      {/* Card Content Area */}
      <div className="flex-1 p-5 sm:p-6 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          {sample.categoryTag && (
            <div className="text-xs font-semibold text-sky-700 tracking-wide uppercase">
              {sample.categoryTag}
            </div>
          )}

          <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-sky-600 transition-colors leading-snug">
            {sample.title}
          </h3>

          <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
            {sample.teaser}
          </p>
        </div>

        {/* Footer Action */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs font-semibold text-sky-700 group-hover:text-sky-900 transition-colors">
            View Project Details & Preview
          </span>
          <div className="text-sky-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </article>
  );
}
