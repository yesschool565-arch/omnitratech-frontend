import { api } from './api';

export interface ServiceFeature {
  title: string;
  desc: string;
  iconName: string;
}

export interface ServiceModel {
  id: string;
  slug: string;
  title: string;
  description: string;
  iconName: string;
  fullDescription: string;
  benefits: string[];
  features: ServiceFeature[];
}

export interface ResourceModel {
  id: string;
  title: string;
  category: string;
  format: string;
  date: string;
  readTime: string;
}

export interface JobModel {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  tags: string[];
}

export interface IndustryFeature {
  title: string;
  desc: string;
  iconName: string;
}

export interface IndustryModel {
  id: string;
  slug: string;
  title: string;
  description: string;
  iconName: string;
  fullDescription: string;
  benefits: string[];
  features: IndustryFeature[];
}

export interface FooterLinkModel {
  id: string;
  column: 'Quick Links' | 'Services' | 'Resources';
  label: string;
  url: string;
}

// ============================================================
// Default data — used as fallback when API is unreachable
// ============================================================

const defaultServices: ServiceModel[] = [
    {
        id: '1',
        slug: 'ai-ml-services',
        title: 'AI & ML Services',
        description: 'Top-notch delivery of comprehensive GenAI and Agentic AI solutions tailored for enterprise success.',
        iconName: 'BrainCircuit',
        fullDescription: 'Leading the way in Generative AI and Agentic AI. We develop custom LLM applications, autonomous agents, and predictive models that transform productivity.',
        benefits: [
            'Custom LLM development',
            'Autonomous AI agents',
            'Predictive analytics',
            'NLP and Computer Vision'
        ],
        features: [
            { title: 'GenAI Tools', desc: 'Creative & functional AI.', iconName: 'Sparkles' },
            { title: 'Machine Learning', desc: 'Pattern-based intelligence.', iconName: 'Brain' },
            { title: 'Agentic Workflows', desc: 'Self-governing AI tasks.', iconName: 'Bot' }
        ]
    },
    {
        id: '2',
        slug: 'cloud-cognitive',
        title: 'Cloud Cognitive Business Operations',
        description: 'Intelligent cloud-based business operations powered by cognitive technologies.',
        iconName: 'Cloud',
        fullDescription: 'We help enterprises automate complex business processes using AI and cloud-native solutions. Our cognitive operations framework reduces manual effort while increasing accuracy and scalability.',
        benefits: [
            'Automated workflow management',
            'Real-time data processing',
            'Cognitive document processing',
            'Lower operational costs'
        ],
        features: [
            { title: 'Scalable Infrastructure', desc: 'Secure and flexible cloud foundations.', iconName: 'Zap' },
            { title: 'Smart Analytics', desc: 'Turn data into actionable insights.', iconName: 'BarChart' },
            { title: 'Process Automation', desc: 'AI-driven business efficiency.', iconName: 'Users' }
        ]
    },
    {
        id: '3',
        slug: 'mechanical-industrial',
        title: 'Mechanical & Industrial Solutions',
        description: 'Expert mechanical engineering and industrial systems design for complex environments.',
        iconName: 'Factory',
        fullDescription: 'We provide comprehensive mechanical engineering services, from initial design and simulation to industrial systems optimization. Our solutions are engineered for reliability and high performance in demanding environments.',
        benefits: [
            'Precision industrial design',
            'Advanced system simulation',
            'Energy efficiency optimization',
            'Reliability-centered maintenance'
        ],
        features: [
            { title: 'System Design', desc: 'Optimized mechanical layouts.', iconName: 'Layout' },
            { title: 'Finite Element Analysis', desc: 'Stress and fluid simulations.', iconName: 'Activity' },
            { title: 'Process Automation', desc: 'Smart industrial control.', iconName: 'Zap' }
        ]
    },
    {
        id: '4',
        slug: 'pipeline-design',
        title: 'Pipeline Design & Installation',
        description: 'Professional pipeline engineering, mapping, and installation services worldwide.',
        iconName: 'GitCommit',
        fullDescription: 'OmnitraTech specializes in the design and management of complex pipeline infrastructure. Our expertise covers route selection, structural integrity analysis, and overseeing full-scale installation projects.',
        benefits: [
            'End-to-end project management',
            'Advanced terrain mapping',
            'Integrity management systems',
            'Regulatory compliance mapping'
        ],
        features: [
            { title: 'Route Optimization', desc: 'Strategic pipeline pathing.', iconName: 'MapComponent' },
            { title: 'Structural Analysis', desc: 'Integrity monitoring systems.', iconName: 'Shield' },
            { title: 'Remote Monitoring', desc: 'IoT-enabled pipeline tracking.', iconName: 'Wifi' }
        ]
    },
    {
        id: '5',
        slug: 'enterprise-solutions',
        title: 'Enterprise Solutions',
        description: 'Scalable enterprise-grade solutions tailored to your business needs.',
        iconName: 'Building2',
        fullDescription: 'Custom enterprise software that integrates seamlessly with your existing workflow. From ERP systems to custom dashboards, we build it all.',
        benefits: [
            'Seamless API integrations',
            'Custom ERP/CRM development',
            'High-performance databases',
            'Legacy modernization'
        ],
        features: [
            { title: 'Microservices', desc: 'Decoupled, scalable arch.', iconName: 'Box' },
            { title: 'Custom Dashboards', desc: 'Visual business intelligence.', iconName: 'Layout' },
            { title: 'API Ecosystem', desc: 'Connected business tools.', iconName: 'LinkIcon' }
        ]
    },
    {
        id: '6',
        slug: 'cybersecurity',
        title: 'Cybersecurity Solutions',
        description: 'Comprehensive security solutions to protect your digital assets and infrastructure.',
        iconName: 'Shield',
        fullDescription: 'We provide end-to-end security services including threat detection, risk management, and regulatory compliance. Protect your enterprise from evolving cyber threats.',
        benefits: [
            '24/7 Threat monitoring',
            'Identity & access management',
            'Zero trust architecture',
            'Regulatory compliance (ISO/SOC2)'
        ],
        features: [
            { title: 'Managed Security', desc: 'Continuous protection.', iconName: 'Shield' },
            { title: 'Incident Response', desc: 'Fast mitigation of threats.', iconName: 'Zap' },
            { title: 'Risk Assessment', desc: 'Proactive vulnerability checks.', iconName: 'Search' }
        ]
    }
];

const defaultResources: ResourceModel[] = [
  { id: '1', title: "The Future of Industrial AI", category: "AI & ML", format: "PDF Guide", date: "Oct 24", readTime: "15 min" }
];

const defaultJobs: JobModel[] = [
  { id: '1', title: "Lead ML Engineer", department: "Data/AI", location: "On Location", type: "FULL-TIME", tags: ["MLOps", "Cloud", "Predictive Modeling"] }
];

const defaultIndustries: IndustryModel[] = [
    {
        id: '1', slug: 'manufacturing', title: 'Manufacturing',
        description: 'Empowering the next generation of smart factories with AI-driven automation and IoT-integrated production lines.',
        iconName: 'Factory',
        fullDescription: 'OmnitraTech delivers cutting-edge solutions for the manufacturing sector, focusing on Industry 4.0 principles. We integrate AI, IoT, and advanced robotics to optimize production cycles, reduce downtime, and ensure peak operational efficiency.',
        benefits: ['Predictive maintenance for zero downtime', 'Real-time supply chain visibility', 'AI-optimized production schedules', 'IoT-enabled quality control'],
        features: [{ title: 'Smart Automation', desc: 'AI-driven robotics and workflows.', iconName: 'Settings' }, { title: 'Digital Twins', desc: 'Virtual modeling of production lines.', iconName: 'Cpu' }, { title: 'Inventory Analytics', desc: 'Real-time stock level optimization.', iconName: 'BarChart' }]
    },
    {
        id: '2', slug: 'healthcare', title: 'Healthcare',
        description: 'Revolutionizing patient care and clinical operations through secure AI diagnostics and data-driven healthcare management.',
        iconName: 'HeartPulse',
        fullDescription: 'Our healthcare solutions focus on enhancing patient outcomes and operational efficiency. We provide secure, HIPAA-compliant platforms for AI-assisted diagnostics, patient data management, and telemedicine infrastructure.',
        benefits: ['Enhanced diagnostic accuracy with AI', 'Secure patient data management', 'Optimized clinical workflows', 'Scalable telemedicine solutions'],
        features: [{ title: 'AI Diagnostics', desc: 'Advanced medical imaging analysis.', iconName: 'Brain' }, { title: 'Secure EMR', desc: 'Privacy-focused record management.', iconName: 'Shield' }, { title: 'Patient Portals', desc: 'Seamless digital patient interaction.', iconName: 'Users' }]
    },
    {
        id: '3', slug: 'retail-ecommerce', title: 'Retail & E-commerce',
        description: 'Driving growth with hyper-personalized shopping experiences, intelligent inventory, and global digital storefronts.',
        iconName: 'ShoppingBag',
        fullDescription: 'We help retailers transition to digital-first models. Our solutions include high-performance e-commerce platforms, AI-powered recommendation engines, and integrated warehouse management systems.',
        benefits: ['Hyper-personalized customer journeys', 'Omnichannel retail integration', 'Dynamic pricing optimization', 'Automated order fulfillment'],
        features: [{ title: 'AI Recommender', desc: 'Boost sales with smart suggestions.', iconName: 'Sparkles' }, { title: 'Headless Commerce', desc: 'Flexible, fast storefronts.', iconName: 'Globe' }, { title: 'Warehouse IoT', desc: 'Smart tracking for every item.', iconName: 'Truck' }]
    },
    {
        id: '4', slug: 'financial-services', title: 'Financial Services',
        description: 'Accelerating digital banking with secure fintech solutions, AI fraud detection, and automated compliance.',
        iconName: 'Landmark',
        fullDescription: 'OmnitraTech provides secure and scalable technology for the financial sector. We specialize in blockchain integration, AI-driven risk assessment, and high-frequency trading infrastructure.',
        benefits: ['Real-time fraud detection', 'Automated regulatory compliance', 'Enhanced risk management', 'Secure digital banking platforms'],
        features: [{ title: 'Fintech Security', desc: 'State-of-the-art encryption layers.', iconName: 'Shield' }, { title: 'Risk Analytics', desc: 'AI-based credit and risk scoring.', iconName: 'BarChart' }, { title: 'Legacy Migration', desc: 'Modernizing core banking systems.', iconName: 'Database' }]
    },
    {
        id: '5', slug: 'energy-utilities', title: 'Energy & Utilities',
        description: 'Optimizing grid management and sustainable energy production with smart sensors and predictive analytics.',
        iconName: 'Zap',
        fullDescription: 'Our energy solutions focus on grid modernization and renewable energy integration. We provide IoT-based monitoring for power plants and AI-driven demand forecasting for utility providers.',
        benefits: ['Smart grid load balancing', 'Renewable energy integration', 'Reduced operational hazards', 'Predictive asset maintenance'],
        features: [{ title: 'Grid IoT', desc: 'Real-time network monitoring.', iconName: 'Wifi' }, { title: 'Demand Forecast', desc: 'AI-driven consumption modeling.', iconName: 'BarChart' }, { title: 'Asset Lifecycle', desc: 'Maximizing engine/turbine life.', iconName: 'Settings' }]
    },
    {
        id: '6', slug: 'logistics-supply-chain', title: 'Logistics & Supply Chain',
        description: 'Streamlining global trade with autonomous tracking, route optimization, and intelligent warehouse systems.',
        iconName: 'Truck',
        fullDescription: 'We provide end-to-end visibility for global supply chains. Our solutions include autonomous fleet management, AI route optimization, and blockchain-based cargo tracking.',
        benefits: ['Reduced transportation costs', 'End-to-end cargo visibility', 'Optimized warehouse operations', 'Autonomous fleet integration'],
        features: [{ title: 'Route AI', desc: 'Fastest paths for every shipment.', iconName: 'MapPin' }, { title: 'Smart Warehousing', desc: 'Robotic picking and sorting.', iconName: 'Box' }, { title: 'Fleet Tracking', desc: 'Real-time GPS and health monitoring.', iconName: 'Truck' }]
    },
    {
        id: '7', slug: 'oil-gas', title: 'Oil & Gas',
        description: 'Enhancing upstream and downstream operations with digital engineering and real-time safety monitoring.',
        iconName: 'Droplets',
        fullDescription: 'OmnitraTech delivers specialized engineering and digital solutions for the Oil & Gas sector. We focus on pipeline integrity, refinery optimization, and environmental safety monitoring.',
        benefits: ['Enhanced field safety', 'Pipeline integrity management', 'Real-time refinery analytics', 'Automated regulatory reporting'],
        features: [{ title: 'Digital Oilfield', desc: 'Connected sensors for remote rigs.', iconName: 'Wifi' }, { title: 'Corrosion Sensing', desc: 'Predictive pipeline integrity.', iconName: 'Shield' }, { title: 'Yield Analytics', desc: 'Maximize refinery output.', iconName: 'BarChart' }]
    },
    {
        id: '8', slug: 'infrastructure-construction', title: 'Infrastructure & Construction',
        description: 'Digitizing the built environment with BIM, IoT site safety, and automated project management.',
        iconName: 'HardHat',
        fullDescription: 'We bring digital transformation to the construction site. Our solutions include BIM integration, IoT-based worker safety monitoring, and AI-driven project timeline forecasting.',
        benefits: ['Increased site safety', 'Reduced project delays', 'Waste reduction in materials', 'Digital twin for buildings'],
        features: [{ title: 'BIM Integration', desc: '3D modeling and data management.', iconName: 'Layout' }, { title: 'Safety IoT', desc: 'Real-time worker health/safety tags.', iconName: 'HardHat' }, { title: 'Timeline AI', desc: 'Predictive project scheduling.', iconName: 'Clock' }]
    }
];

const defaultFooterLinks: FooterLinkModel[] = [
  { id: '1', column: 'Quick Links', label: 'Home', url: '/' },
  { id: '2', column: 'Quick Links', label: 'About Us', url: '/#about' },
  { id: '3', column: 'Quick Links', label: 'Industries', url: '/#industries' },
  { id: '4', column: 'Quick Links', label: 'Careers', url: '/careers' },
  { id: '5', column: 'Quick Links', label: 'Contact', url: '/#contact' },
  { id: '6', column: 'Services', label: 'AI & ML Services', url: '/solutions/ai-ml-services' },
  { id: '7', column: 'Services', label: 'Cloud & Digital Operations', url: '/solutions/cloud-cognitive' },
  { id: '8', column: 'Services', label: 'Mechanical & Industrial', url: '/solutions/mechanical-industrial' },
  { id: '9', column: 'Services', label: 'Pipeline Design & Installation', url: '/solutions/pipeline-design' },
  { id: '10', column: 'Services', label: 'Gas Industry Solutions', url: '/solutions/gas-industry' },
  { id: '11', column: 'Services', label: 'Digital Marketing', url: '/solutions/digital-marketing' },
  { id: '12', column: 'Services', label: 'Consulting & Cybersecurity', url: '/solutions/enterprise-solutions' },
  { id: '13', column: 'Resources', label: 'Blog', url: '/#resources' },
  { id: '14', column: 'Resources', label: 'Case Studies', url: '/#resources' },
  { id: '15', column: 'Resources', label: 'Whitepapers', url: '/#resources' },
  { id: '16', column: 'Resources', label: 'Tutorials', url: '/#resources' },
  { id: '17', column: 'Resources', label: 'Company Updates', url: '/#resources' }
];

// ============================================================
// Async API-backed CMS helpers (with fallback to defaults)
// ============================================================

function createAPIHelper<T extends { id: string }>(endpoint: string, fallbackData: T[]) {
  return {
    getAll: async (): Promise<T[]> => {
      try {
        return await api.get<T[]>(endpoint);
      } catch (err) {
        console.warn(`API ${endpoint} unavailable, using defaults:`, err);
        return fallbackData;
      }
    },
    add: async (item: Omit<T, 'id'>): Promise<T> => {
      return await api.post<T>(endpoint, item);
    },
    update: async (id: string, updated: Partial<T>): Promise<T> => {
      return await api.put<T>(`${endpoint}/${id}`, updated);
    },
    remove: async (id: string): Promise<void> => {
      await api.delete(`${endpoint}/${id}`);
    }
  };
}

export const CMSServices = createAPIHelper<ServiceModel>('/services', defaultServices);
export const CMSResources = createAPIHelper<ResourceModel>('/resources', defaultResources);
export const CMSJobs = createAPIHelper<JobModel>('/jobs', defaultJobs);
export const CMSIndustries = createAPIHelper<IndustryModel>('/industries', defaultIndustries);
export const CMSFooterLinks = createAPIHelper<FooterLinkModel>('/footer-links', defaultFooterLinks);
