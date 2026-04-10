import React, { useState, useEffect } from 'react';
import { getFormEntries, FormEntry } from '../utils/storage';
import { useSettings } from '../utils/settings';
import { CMSServices, CMSResources, CMSJobs, CMSIndustries, IndustryModel, IndustryFeature, ServiceModel, ResourceModel, JobModel, CMSFooterLinks, FooterLinkModel } from '../utils/cms';
import { Trash2, MessageSquare, Briefcase, Calendar, Folder, ArrowLeft, Settings, Layers, Box, FileText, Plus, Save, X, Factory, Edit3, Link2, Lock, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { verifyToken, login as apiLogin, logout as apiLogout } from '../utils/api';

type Tab = 'Enquiries' | 'Applications' | 'Settings' | 'Services' | 'Resources' | 'Jobs' | 'Industries' | 'Footer';

const AdminDashboard: React.FC = () => {
  const [entries, setEntries] = useState<FormEntry[]>([]);
  const [activeTab, setActiveTab] = useState<Tab>('Enquiries');

  
  // Settings Hook
  const { settings, updateSettings } = useSettings();
  const [localSettings, setLocalSettings] = useState(settings);

  // CMS States
  const [services, setServices] = useState<ServiceModel[]>([]);
  const [resources, setResources] = useState<ResourceModel[]>([]);
  const [jobs, setJobs] = useState<JobModel[]>([]);
  const [industries, setIndustries] = useState<IndustryModel[]>([]);
  const [footerLinks, setFooterLinks] = useState<FooterLinkModel[]>([]);

  // Auth States
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [authError, setAuthError] = useState('');
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  // Form Toggles
  const [showAddService, setShowAddService] = useState(false);
  const [showAddResource, setShowAddResource] = useState(false);
  const [showAddJob, setShowAddJob] = useState(false);
  const [showAddIndustry, setShowAddIndustry] = useState(false);
  const [showAddFooterLink, setShowAddFooterLink] = useState(false);

  // Edit States
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [editingResourceId, setEditingResourceId] = useState<string | null>(null);
  const [editingJobId, setEditingJobId] = useState<string | null>(null);
  const [editingIndustryId, setEditingIndustryId] = useState<string | null>(null);
  const [editingFooterLinkId, setEditingFooterLinkId] = useState<string | null>(null);

  // Initial Form States
  const initServiceState: Omit<ServiceModel, 'id'> = { title: '', slug: '', description: '', fullDescription: '', iconName: 'Cloud', benefits: [''], features: [{ title: '', desc: '', iconName: 'Settings' }] };
  const initResourceState = { title: '', category: 'Blog', format: 'PDF', date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric'}), readTime: '5 min' };
  const initJobState = { title: '', department: 'Engineering', location: 'Remote', type: 'FULL-TIME', tags: '' };
  const initIndustryState = { title: '', slug: '', description: '', fullDescription: '', iconName: 'Factory', benefits: [''], features: [{ title: '', desc: '', iconName: 'Settings' }] };
  const initFooterLinkState: Omit<FooterLinkModel, 'id'> = { column: 'Quick Links', label: '', url: '' };

  // New Item States
  const [newService, setNewService] = useState(initServiceState);
  const [newResource, setNewResource] = useState(initResourceState);
  const [newJob, setNewJob] = useState(initJobState);
  const [newIndustry, setNewIndustry] = useState<Omit<IndustryModel, 'id'>>(initIndustryState);
  const [newFooterLink, setNewFooterLink] = useState(initFooterLinkState);

  useEffect(() => {
    window.scrollTo(0, 0);
    verifyToken().then((valid) => {
      setIsAuthenticated(valid);
      setIsCheckingAuth(false);
      if (valid) {
        loadDashboardData();
      }
    });
  }, []);

  const loadDashboardData = async () => {
    try {
      const [enqs, servs, res, jbs, inds, fLinks] = await Promise.all([
        getFormEntries(),
        CMSServices.getAll(),
        CMSResources.getAll(),
        CMSJobs.getAll(),
        CMSIndustries.getAll(),
        CMSFooterLinks.getAll()
      ]);
      setEntries(enqs as FormEntry[]);
      setServices(servs as ServiceModel[]);
      setResources(res as ResourceModel[]);
      setJobs(jbs as JobModel[]);
      setIndustries(inds as IndustryModel[]);
      setFooterLinks(fLinks as FooterLinkModel[]);
    } catch (err) {
      console.error("Failed to load CMS data:", err);
      alert('Failed to load data. Please refresh the page.');
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    try {
      await apiLogin(credentials.username, credentials.password);
      setIsAuthenticated(true);
      loadDashboardData();
    } catch (err: any) {
      setAuthError(err.message || 'Login failed');
    }
  };

  const handleLogout = () => {
    apiLogout();
    setIsAuthenticated(false);
    setEntries([]); // Clear sensitive local state
  };

  useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);

  const saveSettings = async () => {
    try {
      await updateSettings(localSettings);
      setLocalSettings(localSettings); // Refresh the local state
      alert('Settings saved successfully!');
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Failed to save settings. Please try again.');
    }
  };

  const handleSettingsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setLocalSettings(prev => ({ ...prev, [name]: value }));
  };

  // --- SUBMITS ---
  const handleEditService = (item: ServiceModel) => {
      setNewService({ title: item.title, slug: item.slug, description: item.description, fullDescription: item.fullDescription, iconName: item.iconName, benefits: item.benefits, features: item.features });
      setEditingServiceId(item.id);
      setShowAddService(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const handleAddNewService = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const finalService = {
          ...newService,
          slug: newService.title.toLowerCase().replace(/ /g, '-').replace(/[^a-z0-9-]/g, ''),
          benefits: newService.benefits.filter(b => b.trim() !== ''),
          features: newService.features.filter(f => f.title.trim() !== '')
      };
      if (editingServiceId) {
          await CMSServices.update(editingServiceId, finalService);
          alert('Service updated successfully!');
      } else {
          await CMSServices.add(finalService);
          alert('Service added successfully!');
      }
      // Reload data from server
      const updatedServices = await CMSServices.getAll();
      setServices(updatedServices);
      setShowAddService(false);
      setNewService(initServiceState);
      setEditingServiceId(null);
    } catch (error) {
      console.error('Error saving service:', error);
      alert('Failed to save service. Please try again.');
    }
  };

  const handleEditResource = (item: ResourceModel) => {
      setNewResource({ title: item.title, category: item.category, format: item.format, date: item.date, readTime: item.readTime });
      setEditingResourceId(item.id);
      setShowAddResource(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  const handleAddNewResource = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingResourceId) {
          await CMSResources.update(editingResourceId, newResource);
          alert('Resource updated successfully!');
      } else {
          await CMSResources.add(newResource);
          alert('Resource added successfully!');
      }
      // Reload data from server
      const updatedResources = await CMSResources.getAll();
      setResources(updatedResources);
      setShowAddResource(false);
      setNewResource(initResourceState);
      setEditingResourceId(null);
    } catch (error) {
      console.error('Error saving resource:', error);
      alert('Failed to save resource. Please try again.');
    }
  };

  const handleEditJob = (item: JobModel) => {
      setNewJob({ title: item.title, department: item.department, location: item.location, type: item.type, tags: item.tags.join(', ') });
      setEditingJobId(item.id);
      setShowAddJob(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  const handleAddNewJob = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = { ...newJob, tags: newJob.tags.split(',').map(s=>s.trim()).filter(Boolean) };
      if (editingJobId) {
          await CMSJobs.update(editingJobId, payload);
          alert('Job updated successfully!');
      } else {
          await CMSJobs.add(payload);
          alert('Job posted successfully!');
      }
      // Reload data from server
      const updatedJobs = await CMSJobs.getAll();
      setJobs(updatedJobs);
      setShowAddJob(false);
      setNewJob(initJobState);
      setEditingJobId(null);
    } catch (error) {
      console.error('Error saving job:', error);
      alert('Failed to save job. Please try again.');
    }
  };

  const handleEditIndustry = (industry: IndustryModel) => {
    setNewIndustry({
        title: industry.title, slug: industry.slug, description: industry.description, fullDescription: industry.fullDescription,
        iconName: industry.iconName, benefits: industry.benefits, features: industry.features
    });
    setEditingIndustryId(industry.id);
    setShowAddIndustry(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const handleAddNewIndustry = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const finalIndustry = {
          ...newIndustry,
          slug: newIndustry.title.toLowerCase().replace(/ /g, '-').replace(/[^a-z0-9-]/g, ''),
          benefits: newIndustry.benefits.filter(b => b.trim() !== ''),
          features: newIndustry.features.filter(f => f.title.trim() !== '')
      };
      if (editingIndustryId) {
          await CMSIndustries.update(editingIndustryId, finalIndustry);
          alert('Industry updated successfully!');
      } else {
          await CMSIndustries.add(finalIndustry);
          alert('Industry added successfully!');
      }
      // Reload data from server
      const updatedIndustries = await CMSIndustries.getAll();
      setIndustries(updatedIndustries);
      setShowAddIndustry(false);
      setEditingIndustryId(null);
      setNewIndustry(initIndustryState);
    } catch (error) {
      console.error('Error saving industry:', error);
      alert('Failed to save industry. Please try again.');
    }
  };

  const handleEditFooterLink = (link: FooterLinkModel) => {
    setNewFooterLink({ column: link.column, label: link.label, url: link.url });
    setEditingFooterLinkId(link.id);
    setShowAddFooterLink(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const handleAddNewFooterLink = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingFooterLinkId) {
          await CMSFooterLinks.update(editingFooterLinkId, newFooterLink);
          alert('Link updated successfully!');
      } else {
          await CMSFooterLinks.add(newFooterLink);
          alert('Link added successfully!');
      }
      // Reload data from server
      const updatedLinks = await CMSFooterLinks.getAll();
      setFooterLinks(updatedLinks);
      setShowAddFooterLink(false);
      setEditingFooterLinkId(null);
      setNewFooterLink(initFooterLinkState);
    } catch (error) {
      console.error('Error saving footer link:', error);
      alert('Failed to save link. Please try again.');
    }
  };

  const autoGenerateUrl = (label: string, column: string) => {
    if (!label) return '';
    const slug = label.trim().toLowerCase().replace(/ /g, '-').replace(/[^a-z0-9-]/g, '');
    if (column === 'Services') return `/solutions/${slug}`;
    if (column === 'Quick Links') {
        if (slug === 'home') return '/';
        if (slug === 'careers') return '/careers';
        return `/#${slug}`;
    }
    if (column === 'Resources') return `/#resources`;
    return '';
  };

  // --- RENDERS ---
  const renderEnquiries = () => {
    const filtered = entries.filter((e) => e.type === 'General Enquiry').sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return renderTable(filtered);
  };

  const renderApplications = () => {
    const filtered = entries.filter((e) => e.type === 'Job Application').sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return renderTable(filtered);
  };

  const renderTable = (filteredEntries: FormEntry[]) => (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="py-4 px-6 text-sm font-semibold text-slate-600">Date</th>
              <th className="py-4 px-6 text-sm font-semibold text-slate-600">Name</th>
              <th className="py-4 px-6 text-sm font-semibold text-slate-600">Email</th>
              <th className="py-4 px-6 text-sm font-semibold text-slate-600">Company</th>
              <th className="py-4 px-6 text-sm font-semibold text-slate-600">Message</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredEntries.length === 0 ? (
              <tr><td colSpan={5} className="py-12 text-center text-slate-500">No records found.</td></tr>
            ) : (
              filteredEntries.map((entry) => (
                <tr key={entry.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-6 text-sm text-slate-500"><div className="flex items-center gap-2"><Calendar size={14} className="text-slate-400" />{new Date(entry.date).toLocaleDateString()}</div></td>
                  <td className="py-4 px-6 text-sm font-medium text-slate-900">{entry.name}</td>
                  <td className="py-4 px-6 text-sm text-brand-600 hover:underline"><a href={`mailto:${entry.email}`}>{entry.email}</a></td>
                  <td className="py-4 px-6 text-sm text-slate-600">{entry.company || '-'}</td>
                  <td className="py-4 px-6 text-sm text-slate-600 max-w-xs truncate" title={entry.message}>{entry.message}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 space-y-6">
      <h2 className="text-xl font-bold text-slate-900 border-b pb-4">Global Site Settings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <h3 className="col-span-full font-bold text-slate-700 mt-4 border-b pb-2">Home & Navigation</h3>
        <div><label className="block text-sm font-medium text-slate-700">Hero Badge</label><input type="text" name="heroBadge" value={localSettings.heroBadge || ''} onChange={handleSettingsChange} className="mt-1 w-full p-2 border rounded-md" /></div>
        <div><label className="block text-sm font-medium text-slate-700">Hero Title</label><input type="text" name="heroTitle" value={localSettings.heroTitle || ''} onChange={handleSettingsChange} className="mt-1 w-full p-2 border rounded-md" /></div>
        <div className="md:col-span-2"><label className="block text-sm font-medium text-slate-700">Hero Description</label><textarea name="heroDescription" value={localSettings.heroDescription || ''} onChange={handleSettingsChange} rows={3} className="mt-1 w-full p-2 border rounded-md" /></div>
        
        <h3 className="col-span-full font-bold text-slate-700 mt-4 border-b pb-2">About Us Section</h3>
        <div><label className="block text-sm font-medium text-slate-700">About Title</label><input type="text" name="aboutTitle" value={localSettings.aboutTitle || ''} onChange={handleSettingsChange} className="mt-1 w-full p-2 border rounded-md" /></div>
        <div className="md:col-span-2"><label className="block text-sm font-medium text-slate-700">About Description</label><textarea name="aboutDescription" value={localSettings.aboutDescription || ''} onChange={handleSettingsChange} rows={3} className="mt-1 w-full p-2 border rounded-md" /></div>

        <h3 className="col-span-full font-bold text-slate-700 mt-4 border-b pb-2">Services Section</h3>
        <div><label className="block text-sm font-medium text-slate-700">Services Title (Homepage)</label><input type="text" name="servicesTitle" value={localSettings.servicesTitle || ''} onChange={handleSettingsChange} className="mt-1 w-full p-2 border rounded-md" /></div>
        <div className="md:col-span-2"><label className="block text-sm font-medium text-slate-700">Services Description (Homepage)</label><textarea name="servicesDescription" value={localSettings.servicesDescription || ''} onChange={handleSettingsChange} rows={2} className="mt-1 w-full p-2 border rounded-md" /></div>
        <div><label className="block text-sm font-medium text-slate-700">Service Overview Sub-title</label><input type="text" name="serviceOverviewTitle" value={localSettings.serviceOverviewTitle || ''} onChange={handleSettingsChange} className="mt-1 w-full p-2 border rounded-md" /></div>
        <div><label className="block text-sm font-medium text-slate-700">Service Capabilities Sub-title</label><input type="text" name="serviceCapabilitiesTitle" value={localSettings.serviceCapabilitiesTitle || ''} onChange={handleSettingsChange} className="mt-1 w-full p-2 border rounded-md" /></div>

        <h3 className="col-span-full font-bold text-slate-700 mt-4 border-b pb-2">Industries Section</h3>
        <div><label className="block text-sm font-medium text-slate-700">Industry Transform Title</label><input type="text" name="industryTransformTitle" value={localSettings.industryTransformTitle || ''} onChange={handleSettingsChange} className="mt-1 w-full p-2 border rounded-md" /></div>
        <div><label className="block text-sm font-medium text-slate-700">Industry Capabilities Title</label><input type="text" name="industryCapabilitiesTitle" value={localSettings.industryCapabilitiesTitle || ''} onChange={handleSettingsChange} className="mt-1 w-full p-2 border rounded-md" /></div>

        <h3 className="col-span-full font-bold text-slate-700 mt-4 border-b pb-2">Resources Section</h3>
        <div><label className="block text-sm font-medium text-slate-700">Resources Title</label><input type="text" name="resourcesTitle" value={localSettings.resourcesTitle || ''} onChange={handleSettingsChange} className="mt-1 w-full p-2 border rounded-md" /></div>
        <div className="md:col-span-2"><label className="block text-sm font-medium text-slate-700">Resources Description</label><textarea name="resourcesDescription" value={localSettings.resourcesDescription || ''} onChange={handleSettingsChange} rows={2} className="mt-1 w-full p-2 border rounded-md" /></div>

        <h3 className="col-span-full font-bold text-slate-700 mt-4 border-b pb-2">Careers Section</h3>
        <div><label className="block text-sm font-medium text-slate-700">Careers Title</label><input type="text" name="careersTitle" value={localSettings.careersTitle || ''} onChange={handleSettingsChange} className="mt-1 w-full p-2 border rounded-md" /></div>
        <div className="md:col-span-2"><label className="block text-sm font-medium text-slate-700">Careers Description</label><textarea name="careersDescription" value={localSettings.careersDescription || ''} onChange={handleSettingsChange} rows={2} className="mt-1 w-full p-2 border rounded-md" /></div>

        <h3 className="col-span-full font-bold text-slate-700 mt-4 border-b pb-2">Contact & Footer Area</h3>
        <div><label className="block text-sm font-medium text-slate-700">Contact Email</label><input type="email" name="contactEmail" value={localSettings.contactEmail || ''} onChange={handleSettingsChange} className="mt-1 w-full p-2 border rounded-md" /></div>
        <div><label className="block text-sm font-medium text-slate-700">Contact Phone</label><input type="text" name="contactPhone" value={localSettings.contactPhone || ''} onChange={handleSettingsChange} className="mt-1 w-full p-2 border rounded-md" /></div>
        <div className="md:col-span-2"><label className="block text-sm font-medium text-slate-700">Contact Address</label><input type="text" name="contactAddress" value={localSettings.contactAddress || ''} onChange={handleSettingsChange} className="mt-1 w-full p-2 border rounded-md" /></div>
        <div className="md:col-span-2"><label className="block text-sm font-medium text-slate-700">Footer Description</label><textarea name="footerDescription" value={localSettings.footerDescription || ''} onChange={handleSettingsChange} rows={2} className="mt-1 w-full p-2 border rounded-md" /></div>

        <h3 className="col-span-full font-bold text-slate-700 mt-6 border-b pb-2">Social Media Links</h3>
        <div><label className="block text-sm font-medium text-slate-700">LinkedIn URL</label><input type="url" name="socialLinkedin" value={localSettings.socialLinkedin || ''} onChange={handleSettingsChange} className="mt-1 w-full p-2 border rounded-md" placeholder="https://linkedin.com/company/..." /></div>
        <div><label className="block text-sm font-medium text-slate-700">Twitter / X URL</label><input type="url" name="socialTwitter" value={localSettings.socialTwitter || ''} onChange={handleSettingsChange} className="mt-1 w-full p-2 border rounded-md" placeholder="https://twitter.com/..." /></div>
        <div><label className="block text-sm font-medium text-slate-700">Facebook URL</label><input type="url" name="socialFacebook" value={localSettings.socialFacebook || ''} onChange={handleSettingsChange} className="mt-1 w-full p-2 border rounded-md" placeholder="https://facebook.com/..." /></div>
        <div><label className="block text-sm font-medium text-slate-700">Instagram URL</label><input type="url" name="socialInstagram" value={localSettings.socialInstagram || ''} onChange={handleSettingsChange} className="mt-1 w-full p-2 border rounded-md" placeholder="https://instagram.com/..." /></div>

      </div>
      <button onClick={saveSettings} className="flex items-center gap-2 bg-brand-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-brand-700"><Save size={18}/> Save Settings</button>
    </div>
  );

  const renderServicesCMS = () => (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 flex flex-col gap-6">
      <div className="flex justify-between items-center border-b pb-4">
        <h2 className="text-xl font-bold text-slate-900">Services CMS</h2>
        <button onClick={() => {
            if(showAddService && !editingServiceId) setShowAddService(false);
            else { setEditingServiceId(null); setNewService(initServiceState); setShowAddService(true); }
        }} className="bg-brand-600 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2 hover:bg-brand-700">
          {showAddService && !editingServiceId ? <X size={16}/> : <Plus size={16}/>} {showAddService && !editingServiceId ? 'Cancel' : 'Add Service'}
        </button>
      </div>

      {showAddService && (
        <form onSubmit={handleAddNewService} className="bg-slate-50 p-6 rounded-xl border border-slate-200">
          <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">{editingServiceId ? 'Edit Service' : 'Create New Service'}</h3>
              {editingServiceId && (
                  <button type="button" onClick={() => { setShowAddService(false); setEditingServiceId(null); setNewService(initServiceState); }} className="text-slate-500 hover:text-red-500"><X size={20} /></button>
              )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div><label className="block text-sm font-medium text-slate-700">Title</label><input required type="text" value={newService.title} onChange={e => setNewService({...newService, title: e.target.value})} className="mt-1 w-full p-2 border rounded-md" /></div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Icon Name</label>
              <select value={newService.iconName} onChange={e => setNewService({...newService, iconName: e.target.value})} className="mt-1 w-full p-2 border rounded-md">
                <option value="Cloud">Cloud</option><option value="Briefcase">Briefcase</option><option value="Shield">Shield</option>
                <option value="Building2">Building</option><option value="Wifi">Wifi</option><option value="BrainCircuit">Brain</option>
                <option value="Megaphone">Megaphone</option><option value="Factory">Factory</option><option value="GitCommit">Pipes</option>
              </select>
            </div>
            <div className="md:col-span-2"><label className="block text-sm font-medium text-slate-700">Card Description</label><textarea required value={newService.description} onChange={e => setNewService({...newService, description: e.target.value})} rows={2} className="mt-1 w-full p-2 border rounded-md" /></div>
            <div className="md:col-span-2"><label className="block text-sm font-medium text-slate-700">Full Service Overview</label><textarea required value={newService.fullDescription} onChange={e => setNewService({...newService, fullDescription: e.target.value})} rows={3} className="mt-1 w-full p-2 border rounded-md" /></div>
          </div>

          <div className="mb-6 p-4 border border-dashed border-slate-300 rounded-lg">
              <h4 className="font-bold text-slate-800 mb-2">Benefits</h4>
              {newService.benefits.map((b, i) => (
                  <div key={i} className="flex gap-2 mb-2">
                      <input type="text" value={b} onChange={e => {
                          const nb = [...newService.benefits];
                          nb[i] = e.target.value;
                          setNewService({...newService, benefits: nb});
                      }} className="flex-grow p-2 border rounded-md shadow-sm" placeholder={`Benefit #${i+1}`} />
                      <button type="button" onClick={() => {
                          const nb = [...newService.benefits];
                          nb.splice(i, 1);
                          setNewService({...newService, benefits: nb});
                      }} className="px-3 bg-red-100 text-red-600 rounded-md"><Trash2 size={16}/></button>
                  </div>
              ))}
              <button type="button" onClick={() => setNewService({...newService, benefits: [...newService.benefits, '']})} className="text-sm font-medium text-brand-600 flex items-center gap-1 mt-2"><Plus size={14} /> Add Another Benefit</button>
          </div>

          <div className="p-4 border border-dashed border-slate-300 rounded-lg">
              <h4 className="font-bold text-slate-800 mb-2">Key Capabilities (Features)</h4>
              {newService.features.map((f, i) => (
                  <div key={i} className="flex flex-col gap-2 mb-4 bg-white p-3 rounded-lg border border-slate-100 shadow-sm">
                      <div className="flex justify-between"><span className="text-sm font-bold">Feature #{i+1}</span><button type="button" onClick={() => {
                          const nf = [...newService.features];
                          nf.splice(i, 1);
                          setNewService({...newService, features: nf});
                      }} className="text-red-500"><X size={16}/></button></div>
                      <input type="text" placeholder="Title" value={f.title} onChange={e => {
                          const nf = [...newService.features]; nf[i].title = e.target.value; setNewService({...newService, features: nf});
                      }} className="p-2 border rounded-md" />
                      <input type="text" placeholder="Description" value={f.desc} onChange={e => {
                          const nf = [...newService.features]; nf[i].desc = e.target.value; setNewService({...newService, features: nf});
                      }} className="p-2 border rounded-md" />
                      <select value={f.iconName} onChange={e => {
                           const nf = [...newService.features]; nf[i].iconName = e.target.value; setNewService({...newService, features: nf});
                      }} className="p-2 border rounded-md text-sm">
                          <option value="Settings">Settings</option><option value="Cpu">CPU</option><option value="BarChart">Chart</option><option value="Shield">Shield</option><option value="Lightning">Lightning</option><option value="Search">Search</option><option value="Network">Network</option>
                      </select>
                  </div>
              ))}
              <button type="button" onClick={() => setNewService({...newService, features: [...newService.features, {title:'', desc:'', iconName:'Settings'}]})} className="text-sm font-medium text-brand-600 flex items-center gap-1 mt-2"><Plus size={14} /> Add Another Feature</button>
          </div>

          <button type="submit" className="mt-4 bg-brand-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-brand-700">{editingServiceId ? 'Update Service' : 'Publish Service'}</button>
        </form>
      )}

      <ul className="space-y-4">
        {services.map(item => (
          <li key={item.id} className="flex justify-between items-center p-4 border rounded-xl hover:bg-slate-50">
            <div>
              <h3 className="font-bold text-slate-900">{item.title}</h3>
              <p className="text-sm text-slate-500 line-clamp-1">{item.description}</p>
            </div>
            <div className="flex gap-2">
                <button onClick={() => handleEditService(item)} className="p-2 text-brand-600 hover:bg-brand-50 rounded-lg"><Edit3 size={18}/></button>
                <button onClick={() => { if(confirm('Delete?')) { CMSServices.remove(item.id); setServices(CMSServices.getAll()); } }} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={18}/></button>
            </div>
          </li>
        ))}
        {services.length === 0 && <p className="text-slate-500">No entries found.</p>}
      </ul>
    </div>
  );

  const renderResourcesCMS = () => (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 flex flex-col gap-6">
      <div className="flex justify-between items-center border-b pb-4">
        <h2 className="text-xl font-bold text-slate-900">Resources CMS</h2>
        <button onClick={() => {
            if(showAddResource && !editingResourceId) setShowAddResource(false);
            else { setEditingResourceId(null); setNewResource(initResourceState); setShowAddResource(true); }
        }} className="bg-brand-600 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2 hover:bg-brand-700">
          {showAddResource && !editingResourceId ? <X size={16}/> : <Plus size={16}/>} {showAddResource && !editingResourceId ? 'Cancel' : 'Add Resource'}
        </button>
      </div>

      {showAddResource && (
        <form onSubmit={handleAddNewResource} className="bg-slate-50 p-6 rounded-xl border border-slate-200">
          <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">{editingResourceId ? 'Edit Resource' : 'Create New Resource'}</h3>
              {editingResourceId && (
                  <button type="button" onClick={() => { setShowAddResource(false); setEditingResourceId(null); setNewResource(initResourceState); }} className="text-slate-500 hover:text-red-500"><X size={20} /></button>
              )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-slate-700">Title</label><input required type="text" value={newResource.title} onChange={e => setNewResource({...newResource, title: e.target.value})} className="mt-1 w-full p-2 border rounded-md" /></div>
            <div><label className="block text-sm font-medium text-slate-700">Category</label><input required type="text" value={newResource.category} onChange={e => setNewResource({...newResource, category: e.target.value})} className="mt-1 w-full p-2 border rounded-md" placeholder="e.g. Case Study, Blog" /></div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Format Icon</label>
              <select value={newResource.format} onChange={e => setNewResource({...newResource, format: e.target.value})} className="mt-1 w-full p-2 border rounded-md">
                <option value="PDF">PDF</option>
                <option value="Video">Video</option>
                <option value="Blog">Blog</option>
              </select>
            </div>
            <div><label className="block text-sm font-medium text-slate-700">Read Time</label><input required type="text" value={newResource.readTime} onChange={e => setNewResource({...newResource, readTime: e.target.value})} className="mt-1 w-full p-2 border rounded-md" placeholder="e.g. 5 min" /></div>
          </div>
          <button type="submit" className="mt-4 bg-brand-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-brand-700">{editingResourceId ? 'Update Resource' : 'Save Resource'}</button>
        </form>
      )}

      <ul className="space-y-4">
        {resources.map(item => (
          <li key={item.id} className="flex justify-between items-center p-4 border rounded-xl hover:bg-slate-50">
            <div>
              <h3 className="font-bold text-slate-900">{item.title}</h3>
              <p className="text-sm text-slate-500">{item.category} • {item.format} • {item.date}</p>
            </div>
            <div className="flex gap-2">
                <button onClick={() => handleEditResource(item)} className="p-2 text-brand-600 hover:bg-brand-50 rounded-lg"><Edit3 size={18}/></button>
                <button onClick={() => { if(confirm('Delete?')) { CMSResources.remove(item.id); setResources(CMSResources.getAll()); } }} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={18}/></button>
            </div>
          </li>
        ))}
        {resources.length === 0 && <p className="text-slate-500">No entries found.</p>}
      </ul>
    </div>
  );

  const renderJobsCMS = () => (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 flex flex-col gap-6">
      <div className="flex justify-between items-center border-b pb-4">
        <h2 className="text-xl font-bold text-slate-900">Jobs CMS</h2>
        <button onClick={() => {
            if(showAddJob && !editingJobId) setShowAddJob(false);
            else { setEditingJobId(null); setNewJob(initJobState); setShowAddJob(true); }
        }} className="bg-brand-600 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2 hover:bg-brand-700">
          {showAddJob && !editingJobId ? <X size={16}/> : <Plus size={16}/>} {showAddJob && !editingJobId ? 'Cancel' : 'Add Job Openings'}
        </button>
      </div>

      {showAddJob && (
        <form onSubmit={handleAddNewJob} className="bg-slate-50 p-6 rounded-xl border border-slate-200">
          <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">{editingJobId ? 'Edit Job' : 'Post New Job'}</h3>
              {editingJobId && (
                  <button type="button" onClick={() => { setShowAddJob(false); setEditingJobId(null); setNewJob(initJobState); }} className="text-slate-500 hover:text-red-500"><X size={20} /></button>
              )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-slate-700">Job Title</label><input required type="text" value={newJob.title} onChange={e => setNewJob({...newJob, title: e.target.value})} className="mt-1 w-full p-2 border rounded-md" /></div>
            <div><label className="block text-sm font-medium text-slate-700">Department</label><input required type="text" value={newJob.department} onChange={e => setNewJob({...newJob, department: e.target.value})} className="mt-1 w-full p-2 border rounded-md" /></div>
            <div><label className="block text-sm font-medium text-slate-700">Location</label><input required type="text" value={newJob.location} onChange={e => setNewJob({...newJob, location: e.target.value})} className="mt-1 w-full p-2 border rounded-md" /></div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Job Type</label>
              <select value={newJob.type} onChange={e => setNewJob({...newJob, type: e.target.value})} className="mt-1 w-full p-2 border rounded-md">
                <option value="FULL-TIME">Full-Time</option>
                <option value="INTERNSHIP">Internship</option>
                <option value="CONTRACT">Contract</option>
              </select>
            </div>
            <div className="md:col-span-2"><label className="block text-sm font-medium text-slate-700">Tags (comma separated)</label><input type="text" value={newJob.tags} onChange={e => setNewJob({...newJob, tags: e.target.value})} placeholder="e.g. React, Node, DevOps" className="mt-1 w-full p-2 border rounded-md" /></div>
          </div>
          <button type="submit" className="mt-4 bg-brand-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-brand-700">{editingJobId ? 'Update Job' : 'Publish Job'}</button>
        </form>
      )}

      <ul className="space-y-4">
        {jobs.map(item => (
          <li key={item.id} className="flex justify-between items-center p-4 border rounded-xl hover:bg-slate-50">
            <div>
              <h3 className="font-bold text-slate-900">{item.title}</h3>
              <p className="text-sm text-slate-500">{item.department} • {item.location} • {item.type}</p>
              <div className="flex gap-2 mt-2">
                {item.tags.map((tag, i) => <span key={i} className="text-xs bg-slate-200 text-slate-700 px-2 py-1 rounded-md">{tag}</span>)}
              </div>
            </div>
            <div className="flex gap-2">
                <button onClick={() => handleEditJob(item)} className="p-2 text-brand-600 hover:bg-brand-50 rounded-lg"><Edit3 size={18}/></button>
                <button onClick={() => { if(confirm('Delete?')) { CMSJobs.remove(item.id); setJobs(CMSJobs.getAll()); } }} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={18}/></button>
            </div>
          </li>
        ))}
        {jobs.length === 0 && <p className="text-slate-500">No entries found.</p>}
      </ul>
    </div>
  );

  const renderIndustriesCMS = () => (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 flex flex-col gap-6">
      <div className="flex justify-between items-center border-b pb-4">
        <h2 className="text-xl font-bold text-slate-900">Industries CMS</h2>
        <button onClick={() => {
            if(showAddIndustry && !editingIndustryId) setShowAddIndustry(false);
            else { setEditingIndustryId(null); setNewIndustry(initIndustryState); setShowAddIndustry(true); }
        }} className="bg-brand-600 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2 hover:bg-brand-700">
          {showAddIndustry && !editingIndustryId ? <X size={16}/> : <Plus size={16}/>} {showAddIndustry && !editingIndustryId ? 'Cancel' : 'Add Industry'}
        </button>
      </div>

      {showAddIndustry && (
        <form onSubmit={handleAddNewIndustry} className="bg-slate-50 p-6 rounded-xl border border-slate-200">
          <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">{editingIndustryId ? 'Edit Industry' : 'Create New Industry'}</h3>
              {editingIndustryId && (
                  <button type="button" onClick={() => { setShowAddIndustry(false); setEditingIndustryId(null); setNewIndustry(initIndustryState); }} className="text-slate-500 hover:text-red-500"><X size={20} /></button>
              )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div><label className="block text-sm font-medium text-slate-700">Industry Name</label><input required type="text" value={newIndustry.title} onChange={e => setNewIndustry({...newIndustry, title: e.target.value})} className="mt-1 w-full p-2 border rounded-md" /></div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Main Icon</label>
              <select value={newIndustry.iconName} onChange={e => setNewIndustry({...newIndustry, iconName: e.target.value})} className="mt-1 w-full p-2 border rounded-md">
                <option value="Factory">Factory</option><option value="HeartPulse">Heart</option><option value="ShoppingBag">Shopping</option>
                <option value="Landmark">Bank</option><option value="Zap">Zap</option><option value="Truck">Truck</option><option value="Droplets">Water</option><option value="HardHat">Hardhat</option>
              </select>
            </div>
            <div className="md:col-span-2"><label className="block text-sm font-medium text-slate-700">Short Card Description</label><textarea required value={newIndustry.description} onChange={e => setNewIndustry({...newIndustry, description: e.target.value})} rows={2} className="mt-1 w-full p-2 border rounded-md" /></div>
            <div className="md:col-span-2"><label className="block text-sm font-medium text-slate-700">Full Detail Description</label><textarea required value={newIndustry.fullDescription} onChange={e => setNewIndustry({...newIndustry, fullDescription: e.target.value})} rows={3} className="mt-1 w-full p-2 border rounded-md" /></div>
          </div>

          <div className="mb-6 p-4 border border-dashed border-slate-300 rounded-lg">
              <h4 className="font-bold text-slate-800 mb-2">Benefits</h4>
              {newIndustry.benefits.map((b, i) => (
                  <div key={i} className="flex gap-2 mb-2">
                      <input type="text" value={b} onChange={e => {
                          const nb = [...newIndustry.benefits];
                          nb[i] = e.target.value;
                          setNewIndustry({...newIndustry, benefits: nb});
                      }} className="flex-grow p-2 border rounded-md shadow-sm" placeholder={`Benefit #${i+1}`} />
                      <button type="button" onClick={() => {
                          const nb = [...newIndustry.benefits];
                          nb.splice(i, 1);
                          setNewIndustry({...newIndustry, benefits: nb});
                      }} className="px-3 bg-red-100 text-red-600 rounded-md"><Trash2 size={16}/></button>
                  </div>
              ))}
              <button type="button" onClick={() => setNewIndustry({...newIndustry, benefits: [...newIndustry.benefits, '']})} className="text-sm font-medium text-brand-600 flex items-center gap-1 mt-2"><Plus size={14} /> Add Another Benefit</button>
          </div>

          <div className="p-4 border border-dashed border-slate-300 rounded-lg">
              <h4 className="font-bold text-slate-800 mb-2">Detailed Features</h4>
              {newIndustry.features.map((f, i) => (
                  <div key={i} className="flex flex-col gap-2 mb-4 bg-white p-3 rounded-lg border border-slate-100 shadow-sm">
                      <div className="flex justify-between"><span className="text-sm font-bold">Feature #{i+1}</span><button type="button" onClick={() => {
                          const nf = [...newIndustry.features];
                          nf.splice(i, 1);
                          setNewIndustry({...newIndustry, features: nf});
                      }} className="text-red-500"><X size={16}/></button></div>
                      <input type="text" placeholder="Title" value={f.title} onChange={e => {
                          const nf = [...newIndustry.features]; nf[i].title = e.target.value; setNewIndustry({...newIndustry, features: nf});
                      }} className="p-2 border rounded-md" />
                      <input type="text" placeholder="Description" value={f.desc} onChange={e => {
                          const nf = [...newIndustry.features]; nf[i].desc = e.target.value; setNewIndustry({...newIndustry, features: nf});
                      }} className="p-2 border rounded-md" />
                      <select value={f.iconName} onChange={e => {
                           const nf = [...newIndustry.features]; nf[i].iconName = e.target.value; setNewIndustry({...newIndustry, features: nf});
                      }} className="p-2 border rounded-md text-sm">
                          <option value="Settings">Settings</option><option value="Cpu">CPU</option><option value="BarChart">Chart</option><option value="Shield">Shield</option><option value="Brain">Brain</option>
                      </select>
                  </div>
              ))}
              <button type="button" onClick={() => setNewIndustry({...newIndustry, features: [...newIndustry.features, {title:'', desc:'', iconName:'Settings'}]})} className="text-sm font-medium text-brand-600 flex items-center gap-1 mt-2"><Plus size={14} /> Add Another Feature</button>
          </div>

          <button type="submit" className="mt-8 bg-brand-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-brand-700 w-full md:w-auto">
              {editingIndustryId ? 'Update Industry Details' : 'Publish Industry'}
          </button>
        </form>
      )}

      <ul className="space-y-4">
        {industries.map(item => (
          <li key={item.id} className="flex justify-between items-center p-4 border rounded-xl hover:bg-slate-50">
            <div>
              <h3 className="font-bold text-slate-900">{item.title}</h3>
              <p className="text-sm text-slate-500 line-clamp-1">{item.description}</p>
            </div>
            <div className="flex gap-2">
                <button onClick={() => handleEditIndustry(item)} className="p-2 text-brand-600 hover:bg-brand-50 rounded-lg"><Edit3 size={18}/></button>
                <button onClick={() => { if(confirm('Are you sure you want to delete this industry?')) { CMSIndustries.remove(item.id); setIndustries(CMSIndustries.getAll()); } }} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={18}/></button>
            </div>
          </li>
        ))}
        {industries.length === 0 && <p className="text-slate-500">No entries found.</p>}
      </ul>
    </div>
  );

  const renderFooterCMS = () => (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 flex flex-col gap-6">
      <div className="flex justify-between items-center border-b pb-4">
        <h2 className="text-xl font-bold text-slate-900">Footer Links CMS</h2>
        <button onClick={() => {
            if(showAddFooterLink && !editingFooterLinkId) setShowAddFooterLink(false);
            else { setEditingFooterLinkId(null); setNewFooterLink(initFooterLinkState); setShowAddFooterLink(true); }
        }} className="bg-brand-600 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2 hover:bg-brand-700">
          {showAddFooterLink && !editingFooterLinkId ? <X size={16}/> : <Plus size={16}/>} {showAddFooterLink && !editingFooterLinkId ? 'Cancel' : 'Add Link'}
        </button>
      </div>

      {showAddFooterLink && (
        <form onSubmit={handleAddNewFooterLink} className="bg-slate-50 p-6 rounded-xl border border-slate-200">
          <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">{editingFooterLinkId ? 'Edit Link' : 'Create New Link'}</h3>
              {editingFooterLinkId && (
                  <button type="button" onClick={() => { setShowAddFooterLink(false); setEditingFooterLinkId(null); setNewFooterLink(initFooterLinkState); }} className="text-slate-500 hover:text-red-500"><X size={20} /></button>
              )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div><label className="block text-sm font-medium text-slate-700">Display Label</label><input required type="text" value={newFooterLink.label} onChange={e => {
                const label = e.target.value;
                setNewFooterLink({...newFooterLink, label, url: autoGenerateUrl(label, newFooterLink.column)});
            }} className="mt-1 w-full p-2 border rounded-md" /></div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Column</label>
              <select value={newFooterLink.column} onChange={e => {
                  const column = e.target.value as any;
                  setNewFooterLink({...newFooterLink, column, url: autoGenerateUrl(newFooterLink.label, column)});
              }} className="mt-1 w-full p-2 border rounded-md">
                <option value="Quick Links">Quick Links</option>
                <option value="Services">Services (Center)</option>
                <option value="Resources">Resources (Right)</option>
              </select>
            </div>
            <div className="md:col-span-2"><label className="block text-sm font-medium text-slate-700">Destination URL path</label><input required type="text" value={newFooterLink.url} onChange={e => setNewFooterLink({...newFooterLink, url: e.target.value})} className="mt-1 w-full p-2 border rounded-md" placeholder="/solutions/ai-ml-services" /></div>
          </div>

          <button type="submit" className="mt-4 bg-brand-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-brand-700 w-full md:w-auto">
              {editingFooterLinkId ? 'Update Link' : 'Add Link'}
          </button>
        </form>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {['Quick Links', 'Services', 'Resources'].map((col) => (
        <div key={col} className="bg-slate-50 p-6 rounded-xl border border-slate-100">
            <h4 className="font-bold text-slate-700 border-b border-slate-200 pb-2 mb-4">{col} Column</h4>
            <ul className="space-y-3">
            {footerLinks.filter(l => l.column === col).map(item => (
            <li key={item.id} className="flex justify-between items-center p-3 border border-slate-200 rounded-xl hover:bg-white bg-slate-50 shadow-sm transition-colors">
                <div>
                <h3 className="font-bold text-slate-900 text-sm whitespace-nowrap overflow-hidden text-ellipsis max-w-[140px]" title={item.label}>{item.label}</h3>
                <p className="text-[10px] text-slate-500 font-mono mt-1 whitespace-nowrap overflow-hidden text-ellipsis max-w-[140px]" title={item.url}>{item.url}</p>
                </div>
                <div className="flex gap-1">
                    <button onClick={() => handleEditFooterLink(item)} className="p-1.5 text-brand-600 hover:bg-brand-50 rounded-lg"><Edit3 size={14}/></button>
                    <button onClick={() => { if(confirm('Remove this link?')) { CMSFooterLinks.remove(item.id); setFooterLinks(CMSFooterLinks.getAll()); } }} className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={14}/></button>
                </div>
            </li>
            ))}
            {footerLinks.filter(l => l.column === col).length === 0 && <p className="text-sm text-slate-400 italic">No links configured.</p>}
            </ul>
        </div>
      ))}
      </div>
      
    </div>
  );

  // --- MAIN RENDER ---
  if (isCheckingAuth) {
      return <div className="min-h-screen bg-slate-50 flex items-center justify-center"><p className="text-slate-500 font-medium animate-pulse">Loading secure area...</p></div>;
  }

  if (!isAuthenticated) {
      return (
          <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
              <div className="sm:mx-auto sm:w-full sm:max-w-md">
                 <div className="flex justify-center text-brand-600 mb-4"><Lock size={48} /></div>
                 <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900 border-none pb-0">OmnitraTech Admin</h2>
                 <p className="mt-2 text-center text-sm text-slate-600">Please sign in to access the secure dashboard.</p>
              </div>
              <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
                  <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-slate-200">
                      <form className="space-y-6" onSubmit={handleLogin}>
                          {authError && <div className="p-3 rounded-md bg-red-50 text-red-600 text-sm font-medium">{authError}</div>}
                          <div>
                              <label className="block text-sm font-medium text-slate-700">Username</label>
                              <div className="mt-1"><input required type="text" value={credentials.username} onChange={e => setCredentials({...credentials, username: e.target.value})} className="appearance-none block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-brand-500 focus:border-brand-500 sm:text-sm" /></div>
                          </div>
                          <div>
                              <label className="block text-sm font-medium text-slate-700">Password</label>
                              <div className="mt-1"><input required type="password" value={credentials.password} onChange={e => setCredentials({...credentials, password: e.target.value})} className="appearance-none block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-brand-500 focus:border-brand-500 sm:text-sm" /></div>
                          </div>
                          <div>
                              <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-600 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500">Sign in</button>
                          </div>
                      </form>
                  </div>
                  <div className="mt-6 text-center"><Link to="/" className="text-sm font-medium text-brand-600 hover:text-brand-500 flex justify-center items-center gap-1"><ArrowLeft size={14}/> Return to website</Link></div>
              </div>
          </div>
      );
  }

  return (
    <div className="pt-8 min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Link to="/" className="inline-flex items-center gap-2 text-brand-600 hover:text-brand-700 font-medium mb-8 transition-colors">
          <ArrowLeft size={16} /> Back to Website
        </Link>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Admin Panel</h1>
            <p className="text-slate-600 mt-2">Manage settings, forms, and dynamic CMS content.</p>
          </div>
          <div className="flex gap-3">
            <button onClick={handleLogout} className="flex items-center gap-2 bg-slate-200 text-slate-700 px-4 py-2 rounded-lg hover:bg-slate-300 transition-colors font-medium border border-slate-300 shadow-sm">
              <LogOut size={18} /> Logout
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-8 bg-slate-200 p-1.5 rounded-xl w-fit xl:flex-nowrap">
          {[
            { id: 'Enquiries', icon: MessageSquare },
            { id: 'Applications', icon: Briefcase },
            { id: 'Settings', icon: Settings },
            { id: 'Services', icon: Layers },
            { id: 'Resources', icon: FileText },
            { id: 'Jobs', icon: Box },
            { id: 'Industries', icon: Factory },
            { id: 'Footer', icon: Link2 },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as Tab)}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                activeTab === tab.id ? 'bg-white text-brand-600 shadow-sm' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-300'
              }`}
            >
              <tab.icon size={16} /> <span className="hidden sm:inline">{tab.id}</span>
            </button>
          ))}
        </div>

        {/* Active Tab Content */}
        {activeTab === 'Enquiries' && renderEnquiries()}
        {activeTab === 'Applications' && renderApplications()}
        {activeTab === 'Settings' && renderSettings()}
        {activeTab === 'Services' && renderServicesCMS()}
        {activeTab === 'Resources' && renderResourcesCMS()}
        {activeTab === 'Jobs' && renderJobsCMS()}
        {activeTab === 'Industries' && renderIndustriesCMS()}
        {activeTab === 'Footer' && renderFooterCMS()}
      </div>
    </div>
  );
};

export default AdminDashboard;
