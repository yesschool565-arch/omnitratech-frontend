import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CMSServices, ServiceModel } from '../utils/cms';
import { useSettings } from '../utils/settings';
import {
    Cloud, Briefcase, Shield, Building2, Wifi, BrainCircuit,
    ArrowLeft, CheckCircle2, Zap, BarChart3, Users, Megaphone,
    Factory, GitBranch, LayoutDashboard, Search, Box, Link as LinkIcon,
    Activity, Cpu, Sparkles, Brain, Bot, HelpCircle, Settings, Wrench,
    TrendingUp, Hammer, Code, Headphones, AlertTriangle, CheckCircle
} from 'lucide-react';

const mainIconMap: Record<string, React.ReactNode> = {
    Cloud: <Cloud className="w-12 h-12" />,
    Briefcase: <Briefcase className="w-12 h-12" />,
    Shield: <Shield className="w-12 h-12" />,
    Building2: <Building2 className="w-12 h-12" />,
    Wifi: <Wifi className="w-12 h-12" />,
    BrainCircuit: <BrainCircuit className="w-12 h-12" />,
    Brain: <Brain className="w-12 h-12" />,
    Factory: <Factory className="w-12 h-12" />,
    GitBranch: <GitBranch className="w-12 h-12" />,
    Megaphone: <Megaphone className="w-12 h-12" />,
    Building2: <Building2 className="w-12 h-12" />,
    AlertTriangle: <AlertTriangle className="w-12 h-12" />,
    Code: <Code className="w-12 h-12" />,
};

const featureIconMap: Record<string, React.ReactNode> = {
    Zap: <Zap size={24} />,
    BarChart: <BarChart3 size={24} />,
    BarChart3: <BarChart3 size={24} />,
    Users: <Users size={24} />,
    MapComponent: <Search size={24} />,
    Search: <Search size={24} />,
    Shield: <Shield size={24} />,
    Box: <Box size={24} />,
    Layout: <LayoutDashboard size={24} />,
    LinkIcon: <LinkIcon size={24} />,
    Wifi: <Wifi size={24} />,
    Activity: <Activity size={24} />,
    Cpu: <Cpu size={24} />,
    Sparkles: <Sparkles size={24} />,
    Brain: <Brain size={24} />,
    Bot: <Bot size={24} />,
    Cloud: <Cloud size={24} />,
    Settings: <Settings size={24} />,
    Wrench: <Wrench size={24} />,
    TrendingUp: <TrendingUp size={24} />,
    Hammer: <Hammer size={24} />,
    Code: <Code size={24} />,
    Headphones: <Headphones size={24} />,
    AlertTriangle: <AlertTriangle size={24} />,
    CheckCircle: <CheckCircle size={24} />,
    GitBranch: <GitBranch size={24} />,
    HelpCircle: <HelpCircle size={24} />
};

const SolutionDetail: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const { settings } = useSettings();
    const [data, setData] = useState<ServiceModel | null>(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        CMSServices.getAll().then(services => {
            const service = services.find(s => s.slug === slug);
            setData(service || null);
        });
    }, [slug]);

    if (!data) {
        return (
            <div className="pt-32 pb-24 text-center">
                <h2 className="text-2xl font-bold">Solution not found</h2>
                <Link to="/" className="text-brand-600 hover:underline mt-4 inline-block">Return Home</Link>
            </div>
        );
    }

    return (
        <div className="pt-20">
            {/* Header Section */}
            <section className="bg-slate-900 py-20 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Link to="/" className="inline-flex items-center text-slate-400 hover:text-white mb-8 transition-colors">
                        <ArrowLeft size={20} className="mr-2" /> Back to Home
                    </Link>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="w-20 h-20 bg-brand-600 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-brand-500/20 text-white">
                                {mainIconMap[data.iconName] || <Cloud className="w-12 h-12" />}
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">{data.title}</h1>
                            <p className="text-xl text-slate-300 leading-relaxed max-w-2xl text-justify">{data.description}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
                        <div>
                            <h2 className="text-3xl font-bold text-slate-900 mb-8">{settings.serviceOverviewTitle || 'Service Overview'}</h2>
                            <p className="text-lg text-slate-600 mb-8 leading-relaxed text-justify">
                                {data.fullDescription}
                            </p>

                            <div className="space-y-4">
                                {data.benefits.map((benefit, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <CheckCircle2 className="text-brand-600 flex-shrink-0" size={24} />
                                        <span className="text-slate-700 font-medium">{benefit}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-slate-50 rounded-2xl p-8 md:p-12 border border-slate-100">
                            <h3 className="text-2xl font-bold text-slate-900 mb-8 text-center">{settings.serviceCapabilitiesTitle || 'Key Capabilities'}</h3>
                            <div className="space-y-8">
                                {data.features.map((feature, i) => (
                                    <div key={i} className="flex gap-5">
                                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-brand-600 shadow-sm border border-slate-100 flex-shrink-0">
                                            {featureIconMap[feature.iconName] || <HelpCircle size={24} />}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-900 mb-1">{feature.title}</h4>
                                            <p className="text-slate-600">{feature.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-brand-600">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
                    <h2 className="text-3xl md:text-4xl font-bold mb-8">Ready to transform your operations?</h2>
                    <p className="text-xl text-brand-100 mb-10 max-w-2xl mx-auto">
                        Get in touch with our experts to discuss how {data.title} can help your business grow.
                    </p>
                    <Link
                        to="/#contact"
                        className="bg-white text-brand-600 px-8 py-4 rounded-lg font-bold hover:bg-slate-50 transition-colors shadow-xl inline-block"
                    >
                        Schedule a Consultation
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default SolutionDetail;
