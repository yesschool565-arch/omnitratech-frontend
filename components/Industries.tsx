import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CMSServices, CMSIndustries, IndustryModel } from '../utils/cms';
import {
  Factory,
  HeartPulse,
  ShoppingBag,
  Landmark,
  Zap,
  Truck,
  Building2,
  Droplets,
  HardHat,
  Globe
} from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Factory: <Factory size={24} />,
  HeartPulse: <HeartPulse size={24} />,
  ShoppingBag: <ShoppingBag size={24} />,
  Landmark: <Landmark size={24} />,
  Zap: <Zap size={24} />,
  Truck: <Truck size={24} />,
  Building2: <Building2 size={24} />,
  Droplets: <Droplets size={24} />,
  HardHat: <HardHat size={24} />,
  Globe: <Globe size={24} />
};

const Industries: React.FC = () => {
  const [industries, setIndustries] = useState<IndustryModel[]>([]);

  useEffect(() => {
    CMSIndustries.getAll().then(setIndustries);
  }, []);

  return (
    <section id="industries" className="py-20 bg-brand-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">

          <div className="lg:col-span-1">
            <h2 className="text-3xl font-bold mb-6">Expert Solutions for Every Industry</h2>
            <p className="text-brand-100 mb-8 leading-relaxed text-justify">
              Our technology and engineering expertise spans across diverse sectors. We deliver integrated solutions tailored to your industry's unique challenges, leveraging cutting-edge innovation to drive sustainable growth and competitive advantage.
            </p>
            <Link to="/#contact" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-brand-900 bg-white hover:bg-brand-50 transition-colors font-bold">
              Explore Solutions for Your Industry
            </Link>
          </div>

          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {industries.map((industry) => (
                <Link
                  key={industry.id}
                  to={`/industries/${industry.slug}`}
                  className="bg-brand-800/50 backdrop-blur-sm p-6 rounded-lg border border-brand-700/50 hover:bg-brand-800 transition-colors text-center group block"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-700 text-brand-300 mb-4 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                    {iconMap[industry.iconName] || <Building2 size={24} />}
                  </div>
                  <h3 className="text-lg font-semibold text-white">{industry.title}</h3>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Industries;