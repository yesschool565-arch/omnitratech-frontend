import React, { useEffect, useState } from 'react';
import { ArrowRight, BookOpen, FileText, MonitorPlay, File } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CMSResources, ResourceModel } from '../utils/cms';
import { useSettings } from '../utils/settings';

const iconMap: Record<string, React.ReactNode> = {
  'PDF': <FileText size={12} />,
  'Video': <MonitorPlay size={12} />,
  'Blog': <BookOpen size={12} />
};

interface ResourceItemProps {
  type: string;
  title: string;
  date: string;
  image: string;
  icon: React.ReactNode;
  slug: string;
}

const ResourceItem: React.FC<ResourceItemProps> = ({ type, title, date, image, icon, slug }) => (
  <div className="flex flex-col h-full bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow border border-slate-100">
    <div className="relative h-48 overflow-hidden">
      <img src={image} alt={title} className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500" />
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-brand-800 uppercase flex items-center gap-2">
        {icon}
        {type}
      </div>
    </div>
    <div className="p-6 flex-1 flex flex-col">
      <div className="text-sm text-slate-500 mb-2">{date}</div>
      <Link to={`/resources/${slug}`}>
        <h3 className="text-xl font-bold text-slate-900 mb-3 flex-grow hover:text-brand-600 cursor-pointer transition-colors">
          {title}
        </h3>
      </Link>
      <Link to={`/resources/${slug}`} className="inline-flex items-center text-brand-600 font-semibold text-sm hover:underline mt-4">
        Read Now <ArrowRight size={14} className="ml-1" />
      </Link>
    </div>
  </div>
);

const Resources: React.FC = () => {
  const [resources, setResources] = useState<ResourceModel[]>([]);
  const { settings } = useSettings();

  useEffect(() => {
    CMSResources.getAll().then(setResources);
  }, []);

  return (
    <section id="resources" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{settings.resourcesTitle}</h2>
            <p className="text-lg text-slate-600 max-w-2xl text-justify">
              {settings.resourcesDescription}
            </p>
          </div>
          <Link to="/#resources" className="hidden md:flex items-center px-6 py-3 rounded-lg border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 transition-colors">
            View All Resources
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {resources.map((item, index) => (
            <ResourceItem 
              key={item.id} 
              type={item.category}
              title={item.title}
              date={item.date}
              image={`https://picsum.photos/600/400?random=${index + 10}`}
              icon={iconMap[item.format] || <File size={12} />}
              slug={item.title.toLowerCase().replace(/ /g, '-')}
            />
          ))}
        </div>

        <div className="mt-12 text-center md:hidden">
          <Link to="/#resources" className="inline-flex items-center px-6 py-3 rounded-lg border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 transition-colors">
            View All Resources
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Resources;