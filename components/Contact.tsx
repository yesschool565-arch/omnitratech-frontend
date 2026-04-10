import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { saveFormEntry, InquiryType } from '../utils/storage';
import { useSettings } from '../utils/settings';

const Contact: React.FC = () => {
  const { settings } = useSettings();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    type: 'General Enquiry' as InquiryType
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await saveFormEntry(formData);
      alert('Thank you for contacting OmnitraTech! We will get back to you shortly.');
      setFormData({ name: '', email: '', company: '', message: '', type: 'General Enquiry' });
    } catch (err) {
      alert('There was an error submitting your form. Please try again.');
    }
  };

  return (
    <section id="contact" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              Let's Build Integrated Solutions Together
            </h2>
            <p className="text-lg text-slate-600 mb-10 text-justify">
              Ready to harness the power of advanced technology and engineering? Our multidisciplinary experts are ready to discuss your specific needs and deliver solutions that drive measurable results.
            </p>

            <div className="space-y-8">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-brand-100 text-brand-600">
                    <Mail size={24} />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-slate-900">Email</h3>
                  <p className="mt-1 text-slate-600">{settings.contactEmail}</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-brand-100 text-brand-600">
                    <Phone size={24} />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-slate-900">Phone</h3>
                  <p className="mt-1 text-slate-600">{settings.contactPhone}</p>
                  <p className="mt-1 text-slate-600">Mon-Fri 9am to 6pm IST</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-brand-100 text-brand-600">
                    <MapPin size={24} />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-slate-900">Headquarter Operations</h3>
                  <p className="mt-1 text-slate-600">
                    {settings.contactAddress}
                  </p>
                </div>
              </div>


            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10 border border-slate-100">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Send us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="type" className="block text-sm font-medium text-slate-700 mb-1">Inquiry Type</label>
                <select
                  name="type"
                  id="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                >
                  <option value="General Enquiry">General Enquiry</option>
                  <option value="Job Application">Job Application</option>
                </select>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                  placeholder="john@company.com"
                />
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-slate-700 mb-1">Company</label>
                <input
                  type="text"
                  name="company"
                  id="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                  placeholder="Your Company Ltd."
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">Message</label>
                <textarea
                  name="message"
                  id="message"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all resize-none"
                  placeholder="How can we help you?"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center px-6 py-4 border border-transparent text-base font-semibold rounded-lg text-white bg-brand-600 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 transition-colors"
              >
                Send Message
                <Send size={18} className="ml-2" />
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;