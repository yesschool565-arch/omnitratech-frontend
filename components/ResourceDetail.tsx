import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
    ArrowLeft,
    ArrowRight,
    Calendar,
    Clock,
    User,
    Share2,
    BookOpen,
    FileText,
    MonitorPlay,
    CheckCircle2,
    ExternalLink
} from 'lucide-react';

const ResourceDetail: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    const resourceData: Record<string, any> = {
        'mechanical-pipeline-case-study': {
            type: "Case Study",
            icon: <FileText className="w-6 h-6" />,
            title: "Integrated Mechanical & Pipeline Systems for Energy Infrastructure",
            date: "Jan 28, 2026",
            readTime: "15 min read",
            author: "Infrastructure Engineering Team",
            image: "https://picsum.photos/1200/600?random=1",
            content: [
                {
                    heading: "The Challenge",
                    text: "A major energy provider needed to expand their cross-border pipeline infrastructure while maintaining the highest safety standards and operational efficiency. The project required seamless integration of new mechanical systems with existing legacy assets."
                },
                {
                    heading: "Our Integrated Solution",
                    text: "We provided a complete engineering package that included CFD simulations for pipeline flow, structural design for compressor stations, and an IoT-based structural integrity monitoring system. Our multi-domain approach ensured that mechanical and digital systems worked in perfect harmony."
                },
                {
                    heading: "Key Results",
                    bullets: [
                        "Successfully installed 500km of high-pressure pipeline on schedule.",
                        "Implemented real-time structural health monitoring across all new sections.",
                        "Achieved a 12% improvement in system throughput via flow optimization.",
                        "Full compliance with international safety and environmental regulations."
                    ]
                }
            ]
        },
        'gas-industry-blog': {
            type: "Blog",
            icon: <BookOpen className="w-6 h-6" />,
            title: "Digital Transformation in the Gas Industry: Trends & Best Practices",
            date: "Feb 05, 2026",
            readTime: "10 min read",
            author: "Ashutosh, CTO @ OmnitraTech",
            image: "https://picsum.photos/1200/600?random=2",
            content: [
                {
                    heading: "A New Era for Gas",
                    text: "The gas industry is at a critical juncture. To meet rising global demand while adhering to stricter environmental standards, companies must embrace digital and engineering innovation concurrently."
                },
                {
                    heading: "Smart Processing Plants",
                    text: "Integrating AI-driven analytics with mechanical sensor data allows for predictive maintenance that can prevent costly downtime. 'Smart' plants aren't just about software; they're about the synergy between hardware and intelligence."
                },
                {
                    heading: "Safety Through Technology",
                    text: "Modern gas operations rely on autonomous monitoring systems. From drone-based pipeline inspections to embedded gas leak detection sensors, technology is making the industry safer than ever before."
                }
            ]
        },
        'cloud-engineering-tutorial': {
            type: "Tutorial",
            icon: <MonitorPlay className="w-6 h-6" />,
            title: "Optimizing Cloud Infrastructure for Engineering Design Workflows",
            date: "Feb 10, 2026",
            readTime: "20 min read",
            author: "Digital Operations Team",
            image: "https://picsum.photos/1200/600?random=3",
            content: [
                {
                    heading: "Introduction",
                    text: "Engineering design and simulation require massive computational power. Modern cloud infrastructure offers scalable solutions that can handle complex CAD and FEA workloads without the need for massive on-premise servers."
                },
                {
                    heading: "Setting Up High-Performance Computing (HPC)",
                    text: "Learn how to configure GPU-accelerated instances for real-time 3D rendering and large-scale mechanical simulations. We cover VPC setup, secure data transfer, and cost-optimized instance selection."
                },
                {
                    heading: "Collaborative Design in the Cloud",
                    text: "Discover how digital operations frameworks enable global engineering teams to work on the same models simultaneously, ensuring version control and reducing design cycles."
                }
            ]
        }
    };

    const resource = resourceData[slug || ''];

    if (!resource) {
        return (
            <div className="pt-32 pb-20 text-center">
                <h1 className="text-4xl font-bold text-slate-900 mb-6">Resource Not Found</h1>
                <p className="text-slate-600 mb-10">The resource you're looking for doesn't exist or has been moved.</p>
                <Link to="/#resources" className="text-brand-600 font-bold hover:underline flex items-center justify-center gap-2">
                    <ArrowLeft size={20} /> Back to Resources
                </Link>
            </div>
        );
    }

    return (
        <div className="pt-20">
            {/* Article Header */}
            <header className="bg-slate-50 py-16 border-b border-slate-200">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Link to="/#resources" className="inline-flex items-center text-brand-600 font-semibold mb-8 hover:gap-2 transition-all">
                        <ArrowLeft size={18} className="mr-2" /> Back to Resources
                    </Link>

                    <div className="flex items-center gap-3 mb-6">
                        <span className="bg-brand-100 text-brand-800 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-2 shadow-sm">
                            {resource.icon}
                            {resource.type}
                        </span>
                        <span className="text-slate-400">•</span>
                        <span className="text-slate-500 text-sm flex items-center gap-1">
                            <Clock size={14} /> {resource.readTime}
                        </span>
                    </div>

                    <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-8 leading-tight italic">
                        {resource.title}
                    </h1>

                    <div className="flex flex-wrap items-center justify-between gap-6 pt-8 border-t border-slate-200">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-brand-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg ring-4 ring-brand-50">
                                {resource.author.charAt(0)}
                            </div>
                            <div>
                                <p className="text-slate-900 font-bold tracking-tight">{resource.author}</p>
                                <p className="text-slate-500 text-xs font-semibold uppercase">{resource.date}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <button className="p-2.5 rounded-full border border-slate-200 text-slate-600 hover:bg-white hover:text-brand-600 hover:shadow-md transition-all">
                                <Share2 size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Article Content */}
            <main className="py-16 bg-white">
                <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-12 rounded-3xl overflow-hidden shadow-2xl ring-1 ring-slate-200">
                        <img src={resource.image} alt={resource.title} className="w-full h-auto object-cover" />
                    </div>

                    <div className="prose prose-slate prose-lg max-w-none">
                        {resource.content.map((section: any, idx: number) => (
                            <div key={idx} className="mb-12">
                                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3 italic">
                                    <div className="w-2 h-8 bg-brand-600 rounded-full"></div>
                                    {section.heading}
                                </h2>
                                {section.text && (
                                    <p className="text-lg text-slate-600 leading-relaxed mb-6 italic border-l-4 border-slate-100 pl-6 text-justify">
                                        {section.text}
                                    </p>
                                )}
                                {section.bullets && (
                                    <ul className="space-y-4">
                                        {section.bullets.map((bullet: string, bIdx: number) => (
                                            <li key={bIdx} className="flex gap-4 group">
                                                <CheckCircle2 className="w-6 h-6 text-brand-600 flex-shrink-0 mt-1 transition-transform group-hover:scale-110" />
                                                <span className="text-slate-700 font-medium italic">{bullet}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Call to Action */}
                    <div className="mt-20 p-10 bg-slate-900 rounded-3xl text-white relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-600/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:bg-brand-600/20 transition-all"></div>
                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                            <div className="text-center md:text-left">
                                <h3 className="text-3xl font-bold mb-3 italic tracking-tight">Ready to innovate with Technology?</h3>
                                <p className="text-slate-400 text-lg max-w-md italic">Connect with our engineering experts to tailored solutions for your business challenges.</p>
                            </div>
                            <Link to="/#contact" className="bg-brand-600 text-white px-10 py-5 rounded-xl font-bold hover:bg-brand-500 hover:scale-105 transition-all shadow-xl flex items-center gap-3 active:scale-95">
                                Contact Our Team <ArrowRight size={20} />
                            </Link>
                        </div>
                    </div>
                </article>
            </main>
        </div>
    );
};

export default ResourceDetail;
