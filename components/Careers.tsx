import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    Briefcase,
    GraduationCap,
    Clock,
    MapPin,
    ArrowRight,
    CheckCircle2,
    Users,
    Target,
    Rocket,
    Search
} from 'lucide-react';
import OpportunityCard from './OpportunityCard';
import { CMSJobs, JobModel } from '../utils/cms';
import { useSettings } from '../utils/settings';

const Careers: React.FC = () => {
    const [searchQuery, setSearchQuery] = React.useState('');
    const [selectedDept, setSelectedDept] = React.useState('All Departments');
    const [opportunities, setOpportunities] = React.useState<any[]>([]);
    const { settings } = useSettings();

    useEffect(() => {
        window.scrollTo(0, 0);
        CMSJobs.getAll().then(jobs => {
            const mappedJobs = jobs.map(job => ({
                company: "OmnitraTech",
                title: job.title,
                location: job.location,
                type: job.type,
                typeColor: job.type.includes('INTERNSHIP') ? "bg-green-100 text-green-600" : "bg-blue-100 text-blue-600",
                postedAt: "Recently",
                tags: job.tags || [],
                poster: {
                    name: "Hiring Team",
                    initials: "OT",
                    className: ""
                },
                applyLink: "/#contact",
                department: job.department
            }));
            setOpportunities(mappedJobs);
        });
    }, []);

    return (
        <div className="pt-20">
            {/* Hero Section */}
            <section className="bg-slate-900 py-32 text-white relative overflow-hidden">
                {/* Background Decorative Elements */}
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[500px] h-[500px] bg-brand-600/10 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[400px] h-[400px] bg-brand-500/5 rounded-full blur-[100px]"></div>
                <div className="absolute inset-0 bg-[url('http://localhost:3000/api/assets/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <div className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-[0.2em] text-brand-400 uppercase bg-brand-400/10 rounded-full border border-brand-400/20">
                        Join Our Team
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">
                        {settings.careersTitle}
                    </h1>
                    <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed text-center font-light">
                        {settings.careersDescription}
                    </p>
                    <div className="flex flex-wrap justify-center gap-6">
                        <a href="#openings" className="group bg-brand-600 text-white px-10 py-4 rounded-xl font-bold hover:bg-brand-500 transition-all shadow-xl shadow-brand-600/20 flex items-center gap-2">
                            View Openings
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </a>
                        <a href="#internships" className="bg-white/5 text-white px-10 py-4 rounded-xl font-bold hover:bg-white/10 transition-all border border-white/10 backdrop-blur-sm">
                            Internship Program
                        </a>
                    </div>
                </div>
            </section>

            {/* Why Join Us */}
            <section className="py-32 bg-white relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">Why OmnitraTech?</h2>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                            We provide a high-performance environment where talent meets opportunity, fostering a culture of continuous cognitive learning and groundbreaking innovation.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {[
                            { icon: <Rocket className="w-8 h-8" />, title: "Cutting-edge Projects", desc: "Collaborate on state-of-the-art technology and engineering solutions that redefine enterprise standards." },
                            { icon: <Target className="w-8 h-8" />, title: "Exponential Growth", desc: "Vibrant career trajectories and strategic mentorship to accelerate your professional journey." },
                            { icon: <Users className="w-8 h-8" />, title: "High-Caliber Team", desc: "A prestigious assembly of technology and engineering experts committed to collaborative excellence." }
                        ].map((item, i) => (
                            <div key={i} className="p-10 rounded-3xl bg-slate-50 border border-slate-100 text-center hover:bg-white hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:-translate-y-2 transition-all duration-500 group">
                                <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center text-brand-600 mx-auto mb-8 shadow-sm group-hover:bg-brand-600 group-hover:text-white transition-all duration-500">
                                    {item.icon}
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-4">{item.title}</h3>
                                <p className="text-slate-600 leading-relaxed text-justify">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Job Openings */}
            <section id="openings" className="py-32 bg-slate-50 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-64 h-64 bg-brand-600/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                        <div>
                            <div className="text-brand-600 font-bold tracking-widest uppercase text-sm mb-3">Opportunities For You</div>
                            <h2 className="text-3xl md:text-5xl font-bold text-slate-900">Current Openings</h2>
                        </div>

                        {/* Search & Filter Box */}
                        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-4 w-full md:w-auto lg:min-w-[500px]">
                            <div className="relative flex-grow">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <input
                                    type="text"
                                    placeholder="Search roles, companies..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all text-sm"
                                />
                            </div>
                            <select
                                value={selectedDept}
                                onChange={(e) => setSelectedDept(e.target.value)}
                                className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all text-sm text-slate-600 font-medium"
                            >
                                <option>All Departments</option>
                                <option>Engineering</option>
                                <option>Data</option>
                                <option>Design</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {opportunities
                            .filter(opp => {
                                const matchesSearch = opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                    opp.company.toLowerCase().includes(searchQuery.toLowerCase());
                                const matchesDept = selectedDept === 'All Departments' || opp.department === selectedDept;
                                return matchesSearch && matchesDept;
                            })
                            .map((opp, i) => (
                                <OpportunityCard key={i} {...opp} />
                            ))}
                    </div>

                    {opportunities.filter(opp => {
                        const matchesSearch = opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            opp.company.toLowerCase().includes(searchQuery.toLowerCase());
                        const matchesDept = selectedDept === 'All Departments' || opp.department === selectedDept;
                        return matchesSearch && matchesDept;
                    }).length === 0 && (
                            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300 mt-8">
                                <Search size={48} className="text-slate-200 mx-auto mb-4" />
                                <h3 className="text-xl font-bold text-slate-900 mb-2">No roles found</h3>
                                <p className="text-slate-500">Try adjusting your search or filters to find what you're looking for.</p>
                            </div>
                        )}
                </div>
            </section>

            {/* Hiring Process Section */}
            <section className="py-32 bg-slate-900 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-brand-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-20">
                        <div className="text-brand-400 font-bold tracking-widest uppercase text-sm mb-3">Road to Joining</div>
                        <h2 className="text-3xl md:text-5xl font-bold mb-6 italic">Our Hiring Process</h2>
                        <p className="text-slate-400 max-w-2xl mx-auto">A transparent and rigorous journey designed to find the world's most capable technology and engineering visionaries.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {[
                            { step: "01", title: "Application Review", desc: "Our engineering experts personally review every submission for technical alignment and visionary potential." },
                            { step: "02", title: "Technical Synergy", desc: "A deep-dive technical dialogue focused on your expertise across our core technology and engineering domains." },
                            { step: "03", title: "Visionary Interview", desc: "Connect with our leadership team to discuss strategy, culture, and the future of global innovation." },
                            { step: "04", title: "Select & Join", desc: "Welcome to the ecosystem. Align with our mission and start building the future." }
                        ].map((s, i) => (
                            <div key={i} className="relative group">
                                <div className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-all duration-300 h-full">
                                    <div className="text-4xl font-bold text-brand-500/30 mb-6 group-hover:text-brand-400 transition-colors uppercase italic">{s.step}</div>
                                    <h3 className="text-xl font-bold mb-4">{s.title}</h3>
                                    <p className="text-slate-400 text-sm leading-relaxed text-justify">{s.desc}</p>
                                </div>
                                {i < 3 && (
                                    <div className="hidden md:block absolute top-1/2 -right-4 translate-x-full -translate-y-1/2 z-20">
                                        <ArrowRight size={24} className="text-brand-600/30" />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-brand-600 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <h2 className="text-3xl md:text-5xl font-bold mb-8">Unleash Your Potential</h2>
                    <p className="text-xl text-brand-100 mb-12 leading-relaxed font-light">
                        We are always seeking exceptional talent to join our ecosystem of innovation. If your specialization isn't listed, we still want to hear from you.
                    </p>
                    <Link to="/#contact" className="bg-white text-brand-600 px-12 py-5 rounded-2xl font-bold hover:bg-slate-50 hover:scale-105 transition-all shadow-[0_20px_40px_rgba(0,0,0,0.2)] inline-block active:scale-95">
                        Send General Application
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Careers;
