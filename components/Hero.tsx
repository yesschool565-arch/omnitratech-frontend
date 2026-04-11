import React from 'react';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSettings } from '../utils/settings';

const Hero: React.FC = () => {
  const { settings } = useSettings();

  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 bg-slate-50 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-brand-100 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-blue-100 rounded-full blur-3xl opacity-50"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm mb-8 animate-fade-in-up">
            <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></span>
            <span className="text-sm font-semibold text-slate-600 tracking-wide uppercase">
              {settings.heroBadge}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight mb-6 leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-800 to-brand-500">
              {settings.heroTitle}
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-4xl mx-auto leading-relaxed text-justify">
            {settings.heroDescription}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/#contact"
              className="w-full sm:w-auto px-8 py-4 bg-brand-900 text-white font-semibold rounded-lg hover:bg-brand-800 transition-all shadow-lg hover:shadow-brand-900/20 flex items-center justify-center gap-2 group"
            >
              Get Started
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/#contact"
              className="w-full sm:w-auto px-8 py-4 bg-white text-slate-700 font-semibold rounded-lg border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm flex items-center justify-center gap-2"
            >
              Contact Us
              <ChevronRight size={18} className="text-slate-400" />
            </Link>
          </div>
        </div>
      </div>

      {/* Abstract Grid Graphic */}
      <div className="absolute inset-0 bg-[url('http://localhost:3000/api/assets/noise.svg')] opacity-20 pointer-events-none"></div>
    </section>
  );
};

export default Hero;