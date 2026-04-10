import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';

interface Database {
  services: any[];
  resources: any[];
  jobs: any[];
  industries: any[];
  adminUsers: any[];
  footerLinks: any[];
  formEntries: any[];
  settings: any;
}

class DatabaseService {
  private dbPath: string;
  private db: Database;

  constructor() {
    const __dirname = join(fileURLToPath(import.meta.url), '..');
    this.dbPath = join(__dirname, '..', '..', 'data', 'database.json');
    this.ensureDataDirectory();
    this.db = this.loadDatabase();
  }

  private ensureDataDirectory() {
    const dataDir = join(this.dbPath, '..');
    if (!existsSync(dataDir)) {
      mkdirSync(dataDir, { recursive: true });
    }
  }

  private loadDatabase(): Database {
    try {
      if (existsSync(this.dbPath)) {
        const data = readFileSync(this.dbPath, 'utf-8');
        return JSON.parse(data);
      }
    } catch (error) {
      console.error('Error loading database:', error);
    }

    return {
      services: [],
      resources: [],
      jobs: [],
      industries: [],
      adminUsers: [
        {
          id: '1',
          username: process.env.ADMIN_USER || 'admin',
          password: process.env.ADMIN_PASSWORD || 'admin123',
          email: 'admin@omnitratech.com',
          createdAt: new Date().toISOString(),
        },
      ],
      footerLinks: [],
      formEntries: [],
      settings: {},
    };
  }

  private saveDatabase() {
    try {
      writeFileSync(this.dbPath, JSON.stringify(this.db, null, 2));
    } catch (error) {
      console.error('Error saving database:', error);
    }
  }

  // Services
  getServices() {
    return this.db.services;
  }

  addService(service: any) {
    const newService = {
      id: Date.now().toString(),
      ...service,
      createdAt: new Date().toISOString(),
    };
    this.db.services.push(newService);
    this.saveDatabase();
    return newService;
  }

  updateService(id: string, data: any) {
    const index = this.db.services.findIndex((s) => s.id === id);
    if (index !== -1) {
      this.db.services[index] = { ...this.db.services[index], ...data, updatedAt: new Date().toISOString() };
      this.saveDatabase();
      return this.db.services[index];
    }
    return null;
  }

  deleteService(id: string) {
    this.db.services = this.db.services.filter((s) => s.id !== id);
    this.saveDatabase();
  }

  // Resources
  getResources() {
    return this.db.resources;
  }

  addResource(resource: any) {
    const newResource = {
      id: Date.now().toString(),
      ...resource,
      createdAt: new Date().toISOString(),
    };
    this.db.resources.push(newResource);
    this.saveDatabase();
    return newResource;
  }

  updateResource(id: string, data: any) {
    const index = this.db.resources.findIndex((r) => r.id === id);
    if (index !== -1) {
      this.db.resources[index] = { ...this.db.resources[index], ...data, updatedAt: new Date().toISOString() };
      this.saveDatabase();
      return this.db.resources[index];
    }
    return null;
  }

  deleteResource(id: string) {
    this.db.resources = this.db.resources.filter((r) => r.id !== id);
    this.saveDatabase();
  }

  // Jobs
  getJobs() {
    return this.db.jobs;
  }

  addJob(job: any) {
    const newJob = {
      id: Date.now().toString(),
      ...job,
      createdAt: new Date().toISOString(),
    };
    this.db.jobs.push(newJob);
    this.saveDatabase();
    return newJob;
  }

  updateJob(id: string, data: any) {
    const index = this.db.jobs.findIndex((j) => j.id === id);
    if (index !== -1) {
      this.db.jobs[index] = { ...this.db.jobs[index], ...data, updatedAt: new Date().toISOString() };
      this.saveDatabase();
      return this.db.jobs[index];
    }
    return null;
  }

  deleteJob(id: string) {
    this.db.jobs = this.db.jobs.filter((j) => j.id !== id);
    this.saveDatabase();
  }

  // Industries
  getIndustries() {
    return this.db.industries;
  }

  addIndustry(industry: any) {
    const newIndustry = {
      id: Date.now().toString(),
      ...industry,
      createdAt: new Date().toISOString(),
    };
    this.db.industries.push(newIndustry);
    this.saveDatabase();
    return newIndustry;
  }

  updateIndustry(id: string, data: any) {
    const index = this.db.industries.findIndex((i) => i.id === id);
    if (index !== -1) {
      this.db.industries[index] = { ...this.db.industries[index], ...data, updatedAt: new Date().toISOString() };
      this.saveDatabase();
      return this.db.industries[index];
    }
    return null;
  }

  deleteIndustry(id: string) {
    this.db.industries = this.db.industries.filter((i) => i.id !== id);
    this.saveDatabase();
  }

  // Admin Users
  getAdminUser(username: string) {
    return this.db.adminUsers.find((u) => u.username === username);
  }

  validateAdmin(username: string, password: string) {
    const user = this.getAdminUser(username);
    return user && user.password === password;
  }

  // Footer Links
  getFooterLinks() {
    return this.db.footerLinks;
  }

  addFooterLink(link: any) {
    const newLink = {
      id: Date.now().toString(),
      ...link,
      createdAt: new Date().toISOString(),
    };
    this.db.footerLinks.push(newLink);
    this.saveDatabase();
    return newLink;
  }

  updateFooterLink(id: string, data: any) {
    const index = this.db.footerLinks.findIndex((l) => l.id === id);
    if (index !== -1) {
      this.db.footerLinks[index] = { ...this.db.footerLinks[index], ...data, updatedAt: new Date().toISOString() };
      this.saveDatabase();
      return this.db.footerLinks[index];
    }
    return null;
  }

  deleteFooterLink(id: string) {
    this.db.footerLinks = this.db.footerLinks.filter((l) => l.id !== id);
    this.saveDatabase();
  }

  // Form Entries
  getFormEntries() {
    return this.db.formEntries;
  }

  addFormEntry(entry: any) {
    const newEntry = {
      id: Date.now().toString(),
      ...entry,
      createdAt: new Date().toISOString(),
    };
    this.db.formEntries.push(newEntry);
    this.saveDatabase();
    return newEntry;
  }

  deleteFormEntry(id: string) {
    this.db.formEntries = this.db.formEntries.filter((e) => e.id !== id);
    this.saveDatabase();
  }

  clearFormEntries() {
    this.db.formEntries = [];
    this.saveDatabase();
  }

  // Settings
  getSettings() {
    return this.db.settings || {};
  }

  updateSettings(settings: any) {
    this.db.settings = settings;
    this.saveDatabase();
    return this.db.settings;
  }
}

export const db = new DatabaseService();
