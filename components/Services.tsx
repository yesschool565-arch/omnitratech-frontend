import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CMSServices, ServiceModel } from '../utils/cms';
import { useSettings } from '../utils/settings';
import {
  Cloud,
  Briefcase,
  Shield,
  Building2,
  Wifi,
  BrainCircuit,
  Megaphone,
  Layers,
  Factory,
  GitBranch,
  Zap,
  Settings,
  Wrench,
  TrendingUp,
  Hammer,
  CheckCircle,
  AlertTriangle,
  Code,
  Headphones
} from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Cloud: <Cloud size={28} />,
  Briefcase: <Briefcase size={28} />,
  Shield: <Shield size={28} />,
  Building2: <Building2 size={28} />,
  Wifi: <Wifi size={28} />,
  BrainCircuit: <BrainCircuit size={28} />,
  Megaphone: <Megaphone size={28} />,
  Layers: <Layers size={28} />,
  Factory: <Factory size={28} />,
  Brain: <BrainCircuit size={28} />,
  GitBranch: <GitBranch size={28} />,
  Zap: <Zap size={28} />,
  Settings: <Settings size={28} />,
  Wrench: <Wrench size={28} />,
  TrendingUp: <TrendingUp size={28} />,
  Hammer: <Hammer size={28} />,
  CheckCircle: <CheckCircle size={28} />,
  AlertTriangle: <AlertTriangle size={28} />,
  Code: <Code size={28} />,
  Headphones: <Headphones size={28} />
};

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  slug: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, slug }) => (
  <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
    <div className="w-14 h-14 bg-brand-50 rounded-lg flex items-center justify-center text-brand-600 mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
    <p className="text-slate-600 leading-relaxed text-sm text-justify">{description}</p>
    <Link to={`/solutions/${slug}`} className="inline-block mt-6 text-brand-600 font-medium text-sm hover:underline group-hover:text-brand-800">Learn more &rarr;</Link>
  </div>
);

const Services: React.FC = () => {
  const [services, setServices] = useState<ServiceModel[]>([]);
  const { settings } = useSettings();

  useEffect(() => {
    CMSServices.getAll().then(setServices);
  }, []);

  return (
    <section id="services" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-base font-semibold text-brand-600 tracking-wide uppercase mb-2">Our Solutions</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{settings.servicesTitle}</h3>
          <p className="text-lg text-slate-600">
            {settings.servicesDescription}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard 
              key={index} 
              icon={iconMap[service.iconName] || <Layers size={28} />}
              title={service.title}
              description={service.description}
              slug={service.slug}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;