import React, { useState, useEffect } from 'react';
import { Linkedin, Twitter, Facebook, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSettings } from '../utils/settings';
import { CMSFooterLinks, FooterLinkModel } from '../utils/cms';

const Footer: React.FC = () => {
  const { settings } = useSettings();
  const [links, setLinks] = useState<FooterLinkModel[]>([]);

  useEffect(() => {
      CMSFooterLinks.getAll().then(setLinks);
  }, []);

  const quickLinks = links.filter(l => l.column === 'Quick Links');
  const servicesLinks = links.filter(l => l.column === 'Services');
  const resourcesLinks = links.filter(l => l.column === 'Resources');
  
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand Column */}
          <div className="space-y-4">
            <div className="mb-6">
              <img
                src="/Logo.jpeg"
                alt="OmnitraTech Logo"
                className="h-16 w-auto object-contain"
              />
            </div>
            <p className="text-sm leading-relaxed text-slate-400 text-justify">
              {settings.footerDescription}
            </p>
            <div className="flex space-x-4 pt-2">
              <a href={settings.socialLinkedin || "#"} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors"><Linkedin size={20} /></a>
              <a href={settings.socialTwitter || "#"} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors"><Twitter size={20} /></a>
              <a href={settings.socialFacebook || "#"} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors"><Facebook size={20} /></a>
              <a href={settings.socialInstagram || "#"} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors"><Instagram size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map(l => (
                  <li key={l.id}><Link to={l.url} className="text-sm hover:text-brand-400 transition-colors">{l.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-6">Services</h4>
            <ul className="space-y-3">
              {servicesLinks.map(l => (
                  <li key={l.id}><Link to={l.url} className="text-sm hover:text-brand-400 transition-colors">{l.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-semibold mb-6">Resources</h4>
            <ul className="space-y-3">
              {resourcesLinks.map(l => (
                  <li key={l.id}><Link to={l.url} className="text-sm hover:text-brand-400 transition-colors">{l.label}</Link></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
          <p>&copy; 2026 OmnitraTech. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;