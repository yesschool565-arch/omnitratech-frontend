// Configuration
const API_URL = 'https://omnitratech-web.onrender.com/api';

// Data Cache
let cachedData = {
    services: [],
    industries: [],
    resources: [],
    jobs: []
};

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    loadData();
    initContactForm();
});

// ============ NAVBAR ============
function initNavbar() {
    const toggle = document.getElementById('navbarToggle');
    const menu = document.getElementById('navbarMenu');

    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        menu.classList.toggle('mobile-active');
    });

    // Close menu when link is clicked
    menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('active');
            menu.classList.remove('mobile-active');
        });
    });
}

// ============ DATA LOADING ============
async function loadData() {
    try {
        // Load services
        const servicesData = await fetchAPI('/services');
        cachedData.services = servicesData;
        renderServices(servicesData);

        // Load industries
        const industriesData = await fetchAPI('/industries');
        cachedData.industries = industriesData;
        renderIndustries(industriesData);

        // Load resources
        const resourcesData = await fetchAPI('/resources');
        cachedData.resources = resourcesData;
        renderResources(resourcesData);

        // Load jobs
        const jobsData = await fetchAPI('/jobs');
        cachedData.jobs = jobsData;
        renderJobs(jobsData);
    } catch (error) {
        console.error('Error loading data:', error);
        // Render fallback data
        renderFallbackData();
    }
}

async function fetchAPI(endpoint) {
    const response = await fetch(`${API_URL}${endpoint}`);
    if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
    }
    return response.json();
}

// ============ SERVICES RENDERING ============
function renderServices(services) {
    const grid = document.getElementById('servicesGrid');
    grid.innerHTML = '';

    const iconMap = {
        'BrainCircuit': '🧠',
        'Cloud': '☁️',
        'Factory': '🏭',
        'GitBranch': '🔀',
        'Building2': '🏢',
        'Shield': '🛡️'
    };

    services.forEach(service => {
        const icon = iconMap[service.iconName] || '⚙️';
        const card = document.createElement('div');
        card.className = 'service-card';
        card.innerHTML = `
            <div class="service-icon">${icon}</div>
            <h3>${service.title}</h3>
            <p>${service.description}</p>
            <a href="#" class="service-link">Learn more →</a>
        `;
        grid.appendChild(card);
    });
}

// ============ INDUSTRIES RENDERING ============
function renderIndustries(industries) {
    const grid = document.getElementById('industriesGrid');
    grid.innerHTML = '';

    const iconMap = {
        'Factory': '🏭',
        'HeartPulse': '❤️',
        'ShoppingBag': '🛍️',
        'Landmark': '🏛️',
        'Zap': '⚡',
        'Truck': '🚚',
        'Building2': '🏢',
        'Droplets': '💧',
        'HardHat': '👷'
    };

    industries.forEach(industry => {
        const icon = iconMap[industry.iconName] || '🏢';
        const card = document.createElement('div');
        card.className = 'industry-card';
        card.innerHTML = `
            <div class="industry-icon">${icon}</div>
            <h3>${industry.title}</h3>
            <p>${industry.description}</p>
        `;
        grid.appendChild(card);
    });
}

// ============ RESOURCES RENDERING ============
function renderResources(resources) {
    const grid = document.getElementById('resourcesGrid');
    grid.innerHTML = '';

    const iconMap = {
        'PDF': '📄',
        'Video': '🎥',
        'Blog': '📝'
    };

    resources.forEach(resource => {
        const icon = iconMap[resource.format] || '📄';
        const card = document.createElement('div');
        card.className = 'resource-card';
        const imageUrl = `https://picsum.photos/400/300?random=${Math.random()}`;
        card.innerHTML = `
            <div class="resource-image">
                <img src="${imageUrl}" alt="${resource.title}">
                <span class="resource-badge">${resource.format}</span>
            </div>
            <div class="resource-content">
                <div class="resource-date">${resource.date}</div>
                <h3>${resource.title}</h3>
                <a href="#">Read Now →</a>
            </div>
        `;
        grid.appendChild(card);
    });
}

// ============ JOBS RENDERING ============
function renderJobs(jobs) {
    const grid = document.getElementById('jobsGrid');
    grid.innerHTML = '';

    jobs.forEach(job => {
        const card = document.createElement('div');
        card.className = 'job-card';
        card.innerHTML = `
            <h3>${job.title}</h3>
            <div class="job-details">
                <div class="job-detail">📍 ${job.location}</div>
                <div class="job-detail">💼 ${job.type}</div>
                <div class="job-detail">🏢 ${job.department}</div>
            </div>
            <p>${job.tags ? job.tags.join(', ') : 'Engineering position'}</p>
            <button class="btn btn-primary" onclick="applyJob('${job.title}')">Apply Now</button>
        `;
        grid.appendChild(card);
    });
}

// ============ FALLBACK DATA ============
function renderFallbackData() {
    // Services fallback
    const servicesData = [
        { id: '1', title: 'AI & ML Services', description: 'Top-notch delivery of comprehensive GenAI and Agentic AI solutions.', iconName: 'BrainCircuit' },
        { id: '2', title: 'Cloud Operations', description: 'Intelligent cloud-based business operations powered by cognitive technologies.', iconName: 'Cloud' },
        { id: '3', title: 'Mechanical Solutions', description: 'Expert mechanical engineering and industrial systems design.', iconName: 'Factory' }
    ];
    renderServices(servicesData);

    // Industries fallback
    const industriesData = [
        { id: '1', title: 'Manufacturing', description: 'Digital solutions for modern manufacturing', iconName: 'Factory' },
        { id: '2', title: 'Healthcare', description: 'Health tech solutions for healthcare providers', iconName: 'HeartPulse' },
        { id: '3', title: 'Retail', description: 'Omnichannel commerce solutions', iconName: 'ShoppingBag' }
    ];
    renderIndustries(industriesData);

    // Resources fallback
    const resourcesData = [
        { id: '1', title: 'The Future of Industrial AI', category: 'AI & ML', format: 'PDF', date: 'Oct 24', readTime: '15 min' }
    ];
    renderResources(resourcesData);

    // Jobs fallback
    const jobsData = [
        { id: '1', title: 'Lead ML Engineer', department: 'Data/AI', location: 'Remote', type: 'FULL-TIME', tags: ['MLOps', 'Cloud'] }
    ];
    renderJobs(jobsData);
}

// ============ CONTACT FORM ============
function initContactForm() {
    const form = document.getElementById('contactForm');
    form.addEventListener('submit', handleSubmit);
}

async function handleSubmit(e) {
    e.preventDefault();

    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        company: document.getElementById('company').value,
        message: document.getElementById('message').value,
        type: 'General Enquiry',
        date: new Date().toISOString()
    };

    try {
        const response = await fetch(`${API_URL}/form-entries`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            alert('Thank you! Your message has been sent. We\'ll get back to you soon.');
            document.getElementById('contactForm').reset();
        } else {
            alert('Error submitting form. Please try again.');
        }
    } catch (error) {
        console.error('Form submission error:', error);
        alert('Error submitting form. Please try again.');
    }
}

// ============ JOB APPLICATION ============
function applyJob(jobTitle) {
    alert(`Application for "${jobTitle}" - Feature coming soon! Please email us at contact@omnitratech.com`);
}

// ============ SMOOTH SCROLLING ============
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    });
});

// ============ SCROLL NAVBAR EFFECT ============
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const scrollTop = window.scrollY || document.documentElement.scrollTop;

    if (scrollTop > 10) {
        navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

console.log('OmnitraTech App Loaded - Vanilla HTML/CSS/JS Version');
