import React from 'react';
import { Briefcase, MapPin, Clock, ExternalLink } from 'lucide-react';

interface OpportunityCardProps {
    company: string;
    title: string;
    location: string;
    type: string;
    typeColor: string;
    postedAt: string;
    tags: string[];
    poster: {
        name: string;
        initials: string;
        className: string;
    };
    applyLink: string;
}

const OpportunityCard: React.FC<OpportunityCardProps> = ({
    company,
    title,
    location,
    type,
    typeColor,
    postedAt,
    tags,
    poster,
    applyLink
}) => {
    return (
        <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border-t-8 border-brand-600 p-8 flex flex-col h-full hover:shadow-2xl hover:shadow-brand-600/10 transition-all duration-300 group">
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2 text-slate-500 font-medium">
                    <Briefcase size={18} className="text-brand-600" />
                    <span className="text-base font-bold text-slate-400 tracking-tight">{company}</span>
                </div>
                <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${typeColor}`}>
                    {type}
                </span>
            </div>

            <h3 className="text-2xl font-bold text-slate-900 mb-6 group-hover:text-brand-600 transition-colors">
                {title}
            </h3>

            <div className="flex items-center gap-6 text-sm text-slate-500 mb-8">
                <div className="flex items-center gap-1.5 font-medium">
                    <MapPin size={18} className="text-brand-600" />
                    <span>{location}</span>
                </div>
                <div className="flex items-center gap-1.5 font-medium">
                    <Clock size={18} className="text-brand-600" />
                    <span>{postedAt}</span>
                </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-10">
                {tags.map((tag, index) => (
                    <span
                        key={index}
                        className="bg-slate-100 text-slate-600 px-4 py-1.5 rounded-lg text-sm font-semibold whitespace-nowrap"
                    >
                        {tag}
                    </span>
                ))}
            </div>

            <div className="mt-auto pt-8 border-t border-slate-100 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 font-bold text-sm">
                        {poster.initials}
                    </div>
                    <div>
                        <div className="text-slate-900 font-bold text-base leading-tight">
                            {poster.name}
                        </div>
                        <div className="text-slate-500 text-sm font-medium">
                            {poster.className}
                        </div>
                    </div>
                </div>
                <a
                    href={applyLink}
                    className="bg-brand-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-brand-700 transition-all shadow-lg shadow-brand-600/20 active:scale-95 text-base"
                >
                    Apply Now
                    <ExternalLink size={20} />
                </a>
            </div>
        </div>
    );
};

export default OpportunityCard;
