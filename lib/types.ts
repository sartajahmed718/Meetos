export type Role = 'OWNER' | 'ADMIN' | 'MANAGER' | 'MEMBER';

export interface Workspace {
  id: string;
  name: string;
  slug: string;
  logo?: string;
  primaryColor: string;
  customDomain?: string;
  plan: 'FREE' | 'PRO' | 'ENTERPRISE';
  timezone: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: Role;
  title?: string;
  bio?: string;
  company?: string;
  website?: string;
  socials?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}

export type LocationType = 'GOOGLE_MEET' | 'ZOOM' | 'MS_TEAMS' | 'PHONE' | 'IN_PERSON';

export type EventKind = 'ONE_ON_ONE' | 'ROUND_ROBIN' | 'COLLECTIVE' | 'GROUP' | 'PAID';

export type FormFieldType = 
  | 'text'
  | 'textarea'
  | 'dropdown'
  | 'checkbox'
  | 'radio'
  | 'phone'
  | 'file'
  | 'company'
  | 'website'
  | 'budget'
  | 'industry';

export interface CustomQuestion {
  id: string;
  label: string;
  type: FormFieldType;
  required: boolean;
  options?: string[]; // For dropdown/radio/checkbox
  placeholder?: string;
}

export interface MeetingType {
  id: string;
  title: string;
  slug: string;
  description: string;
  duration: number; // in minutes (15, 30, 45, 60, 90, custom)
  kind: EventKind;
  locationType: LocationType;
  price?: number;
  currency?: string;
  color: string;
  active: boolean;
  hostIds: string[];
  customQuestions: CustomQuestion[];
  bufferBefore?: number;
  bufferAfter?: number;
  maxBookingNoticeDays?: number;
}

export interface AIBriefing {
  attendeeSummary: string;
  companySummary: string;
  linkedinInsights: string[];
  recentNews: string[];
  suggestedObjectives: string[];
  recommendedAgenda: string[];
}

export interface Booking {
  id: string;
  meetingTypeId: string;
  meetingTitle: string;
  guestName: string;
  guestEmail: string;
  guestPhone?: string;
  guestCompany?: string;
  guestNotes?: string;
  customAnswers?: Record<string, any>;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  endTime: string; // HH:mm
  timezone: string;
  status: 'CONFIRMED' | 'CANCELED' | 'COMPLETED' | 'RESCHEDULED';
  locationType: LocationType;
  locationUrl: string;
  hostId: string;
  hostName: string;
  hostEmail: string;
  pricePaid?: number;
  currency?: string;
  createdAt: string;
  aiBriefing?: AIBriefing;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  website?: string;
  title?: string;
  avatar?: string;
  tags: string[];
  leadStatus: 'LEAD' | 'QUALIFIED' | 'CUSTOMER' | 'CHURNED';
  leadScore: number; // 0-100
  source: string;
  notes: { id: string; content: string; createdAt: string; author: string }[];
  totalBookings: number;
  lastMeetingDate?: string;
  tasks: { id: string; title: string; completed: boolean; dueDate?: string }[];
}

export interface DayAvailability {
  day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
  enabled: boolean;
  slots: { start: string; end: string }[];
}

export interface AvailabilitySchedule {
  id: string;
  name: string;
  isDefault: boolean;
  timezone: string;
  days: DayAvailability[];
  bufferBefore: number; // mins
  bufferAfter: number; // mins
  holidayMode: boolean;
  dateOverrides: { date: string; slots: { start: string; end: string }[] }[];
}

export interface AutomationRule {
  id: string;
  name: string;
  trigger: 'BOOKING_CREATED' | 'BOOKING_CANCELED' | 'PAYMENT_SUCCESS' | 'REMINDER_24H' | 'FOLLOWUP_1H';
  active: boolean;
  actions: {
    type: 'SEND_EMAIL' | 'SEND_SMS' | 'SEND_WHATSAPP' | 'SLACK_NOTIF' | 'DISCORD_NOTIF' | 'CREATE_ZOOM' | 'CRM_SYNC' | 'WEBHOOK';
    config: Record<string, any>;
  }[];
}

export interface IntegrationApp {
  id: string;
  name: string;
  category: 'CALENDAR' | 'VIDEO' | 'CRM' | 'COMMUNICATION' | 'PAYMENT' | 'AUTOMATION';
  description: string;
  icon: string;
  connected: boolean;
  syncStatus?: string;
  lastSynced?: string;
}

export interface StripeTransaction {
  id: string;
  bookingId: string;
  customerName: string;
  customerEmail: string;
  amount: number;
  currency: string;
  status: 'PAID' | 'REFUNDED' | 'PENDING';
  date: string;
  invoiceUrl: string;
}

export interface AIChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  actionPayload?: {
    type: 'SUGGEST_SLOTS' | 'MEETING_BRIEF' | 'EMAIL_DRAFT' | 'ROUTING_RESULT';
    data: any;
  };
}
