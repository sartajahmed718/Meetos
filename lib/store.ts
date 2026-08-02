'use client';

import { useState, useEffect } from 'react';
import {
  Workspace,
  UserProfile,
  MeetingType,
  Booking,
  Contact,
  AvailabilitySchedule,
  AutomationRule,
  IntegrationApp,
  StripeTransaction,
} from './types';
import {
  initialWorkspace,
  initialUsers,
  initialMeetingTypes,
  initialBookings,
  initialContacts,
  initialSchedule,
  initialAutomations,
  initialIntegrations,
  initialTransactions,
} from './mock-data';

const STORAGE_KEYS = {
  WORKSPACE: 'meetos_workspace',
  USERS: 'meetos_users',
  MEETING_TYPES: 'meetos_meeting_types',
  BOOKINGS: 'meetos_bookings',
  CONTACTS: 'meetos_contacts',
  SCHEDULE: 'meetos_schedule',
  AUTOMATIONS: 'meetos_automations',
  INTEGRATIONS: 'meetos_integrations',
  TRANSACTIONS: 'meetos_transactions',
  THEME: 'meetos_theme',
};

export function useMeetOSStore() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [workspace, setWorkspace] = useState<Workspace>(initialWorkspace);
  const [users, setUsers] = useState<UserProfile[]>(initialUsers);
  const [meetingTypes, setMeetingTypes] = useState<MeetingType[]>(initialMeetingTypes);
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [contacts, setContacts] = useState<Contact[]>(initialContacts);
  const [schedule, setSchedule] = useState<AvailabilitySchedule>(initialSchedule);
  const [automations, setAutomations] = useState<AutomationRule[]>(initialAutomations);
  const [integrations, setIntegrations] = useState<IntegrationApp[]>(initialIntegrations);
  const [transactions, setTransactions] = useState<StripeTransaction[]>(initialTransactions);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  // Load state from localStorage on mount
  useEffect(() => {
    try {
      const savedWorkspace = localStorage.getItem(STORAGE_KEYS.WORKSPACE);
      if (savedWorkspace) setWorkspace(JSON.parse(savedWorkspace));

      const savedUsers = localStorage.getItem(STORAGE_KEYS.USERS);
      if (savedUsers) setUsers(JSON.parse(savedUsers));

      const savedMeetingTypes = localStorage.getItem(STORAGE_KEYS.MEETING_TYPES);
      if (savedMeetingTypes) setMeetingTypes(JSON.parse(savedMeetingTypes));

      const savedBookings = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
      if (savedBookings) setBookings(JSON.parse(savedBookings));

      const savedContacts = localStorage.getItem(STORAGE_KEYS.CONTACTS);
      if (savedContacts) setContacts(JSON.parse(savedContacts));

      const savedSchedule = localStorage.getItem(STORAGE_KEYS.SCHEDULE);
      if (savedSchedule) setSchedule(JSON.parse(savedSchedule));

      const savedAutomations = localStorage.getItem(STORAGE_KEYS.AUTOMATIONS);
      if (savedAutomations) setAutomations(JSON.parse(savedAutomations));

      const savedIntegrations = localStorage.getItem(STORAGE_KEYS.INTEGRATIONS);
      if (savedIntegrations) setIntegrations(JSON.parse(savedIntegrations));

      const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME) as 'dark' | 'light';
      if (savedTheme) {
        setTheme(savedTheme);
        document.documentElement.classList.toggle('dark', savedTheme === 'dark');
      } else {
        document.documentElement.classList.add('dark');
      }
    } catch (e) {
      console.error('Error loading state from localStorage:', e);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // Save changes to localStorage
  const saveToStorage = (key: string, data: any) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.error('Error saving state to localStorage:', e);
    }
  };

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    document.documentElement.classList.toggle('dark', nextTheme === 'dark');
    saveToStorage(STORAGE_KEYS.THEME, nextTheme);
  };

  const updateWorkspace = (updates: Partial<Workspace>) => {
    setWorkspace((prev) => {
      const next = { ...prev, ...updates };
      saveToStorage(STORAGE_KEYS.WORKSPACE, next);
      return next;
    });
  };

  const addMeetingType = (newType: Omit<MeetingType, 'id'>) => {
    const typeWithId: MeetingType = {
      ...newType,
      id: `mt-${Date.now()}`,
    };
    setMeetingTypes((prev) => {
      const next = [typeWithId, ...prev];
      saveToStorage(STORAGE_KEYS.MEETING_TYPES, next);
      return next;
    });
    return typeWithId;
  };

  const updateMeetingType = (id: string, updates: Partial<MeetingType>) => {
    setMeetingTypes((prev) => {
      const next = prev.map((t) => (t.id === id ? { ...t, ...updates } : t));
      saveToStorage(STORAGE_KEYS.MEETING_TYPES, next);
      return next;
    });
  };

  const deleteMeetingType = (id: string) => {
    setMeetingTypes((prev) => {
      const next = prev.filter((t) => t.id !== id);
      saveToStorage(STORAGE_KEYS.MEETING_TYPES, next);
      return next;
    });
  };

  const addBooking = (newBookingData: Omit<Booking, 'id' | 'createdAt' | 'status'>) => {
    const bookingWithId: Booking = {
      ...newBookingData,
      id: `bk-${Date.now()}`,
      status: 'CONFIRMED',
      createdAt: new Date().toISOString(),
    };

    setBookings((prev) => {
      const next = [bookingWithId, ...prev];
      saveToStorage(STORAGE_KEYS.BOOKINGS, next);
      return next;
    });

    // Automatically update or create CRM contact
    setContacts((prevContacts) => {
      const existing = prevContacts.find((c) => c.email.toLowerCase() === newBookingData.guestEmail.toLowerCase());
      if (existing) {
        const next = prevContacts.map((c) =>
          c.id === existing.id
            ? {
                ...c,
                totalBookings: c.totalBookings + 1,
                lastMeetingDate: newBookingData.date,
              }
            : c
        );
        saveToStorage(STORAGE_KEYS.CONTACTS, next);
        return next;
      } else {
        const newContact: Contact = {
          id: `cnt-${Date.now()}`,
          name: newBookingData.guestName,
          email: newBookingData.guestEmail,
          phone: newBookingData.guestPhone,
          company: newBookingData.guestCompany || 'Unknown',
          tags: ['New Lead', 'Inbound'],
          leadStatus: 'LEAD',
          leadScore: 75,
          source: 'Web Booking',
          totalBookings: 1,
          lastMeetingDate: newBookingData.date,
          notes: [],
          tasks: [],
        };
        const next = [newContact, ...prevContacts];
        saveToStorage(STORAGE_KEYS.CONTACTS, next);
        return next;
      }
    });

    // If paid meeting, log transaction
    if (newBookingData.pricePaid && newBookingData.pricePaid > 0) {
      const newTx: StripeTransaction = {
        id: `tx-${Date.now()}`,
        bookingId: bookingWithId.id,
        customerName: newBookingData.guestName,
        customerEmail: newBookingData.guestEmail,
        amount: newBookingData.pricePaid,
        currency: newBookingData.currency || 'USD',
        status: 'PAID',
        date: newBookingData.date,
        invoiceUrl: '#',
      };
      setTransactions((prev) => {
        const next = [newTx, ...prev];
        saveToStorage(STORAGE_KEYS.TRANSACTIONS, next);
        return next;
      });
    }

    return bookingWithId;
  };

  const cancelBooking = (id: string) => {
    setBookings((prev) => {
      const next = prev.map((b) => (b.id === id ? { ...b, status: 'CANCELED' as const } : b));
      saveToStorage(STORAGE_KEYS.BOOKINGS, next);
      return next;
    });
  };

  const updateSchedule = (updates: Partial<AvailabilitySchedule>) => {
    setSchedule((prev) => {
      const next = { ...prev, ...updates };
      saveToStorage(STORAGE_KEYS.SCHEDULE, next);
      return next;
    });
  };

  const toggleIntegration = (id: string) => {
    setIntegrations((prev) => {
      const next = prev.map((i) => (i.id === id ? { ...i, connected: !i.connected } : i));
      saveToStorage(STORAGE_KEYS.INTEGRATIONS, next);
      return next;
    });
  };

  const toggleAutomation = (id: string) => {
    setAutomations((prev) => {
      const next = prev.map((a) => (a.id === id ? { ...a, active: !a.active } : a));
      saveToStorage(STORAGE_KEYS.AUTOMATIONS, next);
      return next;
    });
  };

  return {
    isInitialized,
    theme,
    toggleTheme,
    workspace,
    updateWorkspace,
    users,
    setUsers,
    meetingTypes,
    addMeetingType,
    updateMeetingType,
    deleteMeetingType,
    bookings,
    addBooking,
    cancelBooking,
    contacts,
    setContacts,
    schedule,
    updateSchedule,
    automations,
    toggleAutomation,
    integrations,
    toggleIntegration,
    transactions,
  };
}
