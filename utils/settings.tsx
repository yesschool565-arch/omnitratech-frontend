import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from './api';

export interface SiteSettings {
  heroBadge: string;
  heroTitle: string;
  heroDescription: string;
  aboutTitle: string;
  aboutDescription: string;
  servicesTitle: string;
  servicesDescription: string;
  serviceOverviewTitle: string;
  serviceCapabilitiesTitle: string;
  industryTransformTitle: string;
  industryCapabilitiesTitle: string;
  resourcesTitle: string;
  resourcesDescription: string;
  careersTitle: string;
  careersDescription: string;
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;
  footerDescription: string;
  socialLinkedin: string;
  socialTwitter: string;
  socialFacebook: string;
  socialInstagram: string;
}

const defaultSettings: SiteSettings = {
  heroBadge: "Leading Technology & Engineering Solutions Across Industries",
  heroTitle: "Engineering the Future with Intelligence",
  heroDescription: "OmnitraTech is a global leader delivering integrated technology and engineering solutions across diverse sectors. From advanced AI/ML implementations and robust cloud digital operations to specialized mechanical engineering, pipeline design, and gas industry services, we empower organizations with innovation-driven excellence and professional precision.",
  aboutTitle: "Architects of the Digital & Physical World",
  aboutDescription: "At OmnitraTech...",
  servicesTitle: "Expert Solutions for Every Need",
  servicesDescription: "We deliver advanced technology and engineering capabilities to solve complex challenges.",
  serviceOverviewTitle: "Service Overview",
  serviceCapabilitiesTitle: "Key Capabilities",
  industryTransformTitle: "How We Transform This Industry",
  industryCapabilitiesTitle: "Industry-Specific Capabilities",
  resourcesTitle: "Insights & Resources",
  resourcesDescription: "Stay ahead of the curve with our latest research, case studies, and technical deep-dives.",
  careersTitle: "Join Our Team of Innovators",
  careersDescription: "Help us solve complex challenges globally.",
  contactEmail: "contact@omnitratech.com",
  contactPhone: "+91 9112379666",
  contactAddress: "First Floor, Guruprasad Bulding, Opp. Adarsha Green City, Amravati, MH, India 444 605",
  footerDescription: "OmnitraTech delivers advanced technology and engineering solutions across AI/ML, Cloud Infrastructure, Mechanical Systems, Pipeline Engineering, and Gas Industry services.",
  socialLinkedin: "#",
  socialTwitter: "#",
  socialFacebook: "#",
  socialInstagram: "#",
};

interface SettingsContextType {
  settings: SiteSettings;
  updateSettings: (newSettings: SiteSettings) => Promise<void>;
  loading: boolean;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const data = await api.get<SiteSettings>('/settings');
        setSettings({ ...defaultSettings, ...data });
      } catch (err) {
        console.warn('Could not load settings from API, using defaults:', err);
      } finally {
        setLoading(false);
      }
    };
    loadSettings();
  }, []);

  const updateSettings = async (newSettings: SiteSettings) => {
    try {
      const saved = await api.put<SiteSettings>('/settings', newSettings);
      setSettings({ ...defaultSettings, ...saved });
    } catch (err) {
      console.error('Failed to save settings:', err);
      // Still update locally so the UI reflects the change
      setSettings(newSettings);
    }
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, loading }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
