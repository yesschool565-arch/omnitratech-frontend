import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CMSIndustries, IndustryModel } from '../utils/cms';
import { useSettings } from '../utils/settings';
import {
    ArrowLeft, CheckCircle2, Factory, HeartPulse, ShoppingBag,
    Landmark, Zap, Truck, Droplets, HardHat, BarChart3,
    Users, Shield, Settings, Globe, Cpu, Database
} from 'lucide-react';

// Helper components for missing/custom icons
const Brain = (props: any) => <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-1.54Z" /><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-1.54Z" /></svg>;
const Sparkles = (props: any) => <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" /><path d="M5 3v4" /><path d="M19 17v4" /><path d="M3 5h4" /><path d="M17 19h4" /></svg>;
const Wifi = (props: any) => <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13a10 10 0 0 1 14 0" /><path d="M8.5 16.5a5 5 0 0 1 7 0" /><path d="M2 8.82a15 15 0 0 1 20 0" /><line x1="12" x2="12.01" y1="20" y2="20" /></svg>;
const MapPin = (props: any) => <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>;
const Box = (props: any) => <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" /><path d="m3.3 7 8.7 5 8.7-5" /><path d="M12 22V12" /></svg>;
const Layout = (props: any) => <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" /><path d="M3 9h18" /><path d="M9 21V9" /></svg>;
const Clock = (props: any) => <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>;

const iconMap: Record<string, React.ReactNode> = {
    Factory: <Factory />,
    HeartPulse: <HeartPulse />,
    ShoppingBag: <ShoppingBag />,
    Landmark: <Landmark />,
    Zap: <Zap />,
    Truck: <Truck />,
    Droplets: <Droplets />,
    HardHat: <HardHat />,
    BarChart: <BarChart3 />,
    Users: <Users />,
    Shield: <Shield />,
    Settings: <Settings />,
    Globe: <Globe />,
    Cpu: <Cpu />,
    Database: <Database />,
    Brain: <Brain />,
    Sparkles: <Sparkles />,
    Wifi: <Wifi />,
    MapPin: <MapPin />,
    Box: <Box />,
    Layout: <Layout />,
    Clock: <Clock />
};

const IndustryDetail: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const [data, setData] = useState<IndustryModel | null>(null);
    const { settings } = useSettings();

    useEffect(() => {
        window.scrollTo(0, 0);
        CMSIndustries.getAll().then(industries => {
            const industryParams = industries.find(i => i.slug === slug);
            if (industryParams) {
                setData(industryParams);
            }
        });
    }, [slug]);

    if (!data) {
        return (
            <div className="pt-32 pb-24 text-center min-h-[60vh] flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold">Industry not found</h2>
                <Link to="/" className="text-brand-600 hover:underline mt-4 inline-block">Return Home</Link>
            </div>
        );
    }

    return (
        <div className="pt-20">
            {/* Header Section */}
            <section className="bg-slate-900 py-24 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Link to="/#industries" className="inline-flex items-center text-slate-400 hover:text-white mb-8 transition-colors font-medium">
                        <ArrowLeft size={20} className="mr-2" /> Back to Industries
                    </Link>
                    <div className="flex flex-col md:flex-row gap-10 items-center">
                        <div className="w-24 h-24 bg-brand-600/20 text-brand-400 rounded-3xl flex items-center justify-center border border-brand-500/30 flex-shrink-0">
                            {React.cloneElement(iconMap[data.iconName] as React.ReactElement || <Factory />, { className: "w-12 h-12" })}
                        </div>
                        <div>
                            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">{data.title}</h1>
                            <p className="text-xl text-slate-300 leading-relaxed max-w-3xl font-light">
                                {data.description}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-32 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
                        <div>
                            <h2 className="text-3xl font-bold text-slate-900 mb-10">{settings.industryTransformTitle}</h2>
                            <p className="text-lg text-slate-600 mb-12 leading-relaxed text-justify">
                                {data.fullDescription}
                            </p>
                            <div className="space-y-6">
                                {data.benefits.map((benefit, i) => (
                                    <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                                        <CheckCircle2 className="text-brand-600 flex-shrink-0 mt-1" size={24} />
                                        <span className="text-slate-800 font-semibold">{benefit}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-slate-950 rounded-[3rem] p-10 md:p-16 border border-white/5 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-600/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
                            <h3 className="text-2xl font-bold text-white mb-12 text-center relative z-10">{settings.industryCapabilitiesTitle}</h3>
                            <div className="space-y-12 relative z-10">
                                {data.features.map((feature, i) => (
                                    <div key={i} className="flex gap-8 group/item">
                                        <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-brand-400 border border-white/10 group-hover/item:bg-brand-600 group-hover/item:text-white transition-all duration-300 flex-shrink-0">
                                            {React.cloneElement(iconMap[feature.iconName] as React.ReactElement || <Settings />, { size: 28 })}
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-bold text-white mb-2">{feature.title}</h4>
                                            <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-brand-600 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('http://localhost:3000/api/assets/noise.svg')] opacity-10 mix-blend-overlay"></div>
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white relative z-10">
                    <h2 className="text-4xl md:text-5xl font-bold mb-10 leading-tight">Ready to Innovate in {data.title}?</h2>
                    <p className="text-xl text-brand-100 mb-12 leading-relaxed">
                        Join forces with OmnitraTech to deploy global-scale technology and engineering solutions.
                    </p>
                    <Link
                        to="/#contact"
                        className="bg-white text-brand-600 px-12 py-5 rounded-2xl font-bold hover:bg-brand-50 hover:scale-105 transition-all shadow-2xl inline-block active:scale-95"
                    >
                        Consult Our Industry Experts
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default IndustryDetail;
