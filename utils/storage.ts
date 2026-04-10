import { api } from './api';

export type InquiryType = 'General Enquiry' | 'Job Application';

export interface FormEntry {
  id: string;
  name: string;
  email: string;
  company: string;
  message: string;
  type: InquiryType;
  date: string;
}

export const saveFormEntry = async (entry: Omit<FormEntry, 'id' | 'date'>): Promise<FormEntry> => {
  return await api.post<FormEntry>('/form-entries', entry);
};

export const getFormEntries = async (): Promise<FormEntry[]> => {
  try {
    return await api.get<FormEntry[]>('/form-entries');
  } catch {
    return [];
  }
};

export const clearFormEntries = async (): Promise<void> => {
  await api.delete('/form-entries');
};
