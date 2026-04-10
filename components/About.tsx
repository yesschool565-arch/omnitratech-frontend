import React from 'react';
import { useSettings } from '../utils/settings';

const About: React.FC = () => {
  const { settings } = useSettings();
  
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          <div className="relative order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://picsum.photos/800/600?grayscale"
                alt="OmnitraTech Team Meeting"
                className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-brand-900/20 mix-blend-multiply"></div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-brand-600 uppercase bg-brand-50 rounded-full">
              About Us
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              {settings.aboutTitle}
            </h2>
            <p className="text-lg text-slate-600 mb-6 leading-relaxed text-justify">
              {settings.aboutDescription}
            </p>
            <p className="text-base text-slate-600 mb-8 leading-relaxed text-justify">
              Our multidisciplinary team combines technical expertise with engineering precision to deliver enterprise-grade solutions worldwide. From intelligent autonomous agents and custom cloud architectures to complex pipeline designs and industrial systems, we bring cutting-edge innovation to every project. We ensure your initiatives drive measurable business outcomes and operational excellence.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="border-l-4 border-brand-500 pl-4">
                <h4 className="font-bold text-slate-900 text-lg">Mission</h4>
                <p className="text-sm text-slate-600 mt-1">To empower businesses worldwide with transformative technology and engineering solutions that deliver proven results.</p>
              </div>
              <div className="border-l-4 border-brand-300 pl-4">
                <h4 className="font-bold text-slate-900 text-lg">Vision</h4>
                <p className="text-sm text-slate-600 mt-1">A future where every business leverages advanced technology and engineering to unlock sustainable growth and operational excellence.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;