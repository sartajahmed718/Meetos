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

export const initialWorkspace: Workspace = {
  id: 'ws-101',
  name: 'State AI Labs',
  slug: 'state-ai',
  logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
  primaryColor: '#6366f1',
  customDomain: 'meet.stateai.io',
  plan: 'ENTERPRISE',
  timezone: 'America/New_York',
};

export const initialUsers: UserProfile[] = [
  {
    id: 'usr-1',
    name: 'Alex Rivera',
    email: 'alex@stateai.io',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    role: 'OWNER',
    title: 'Founder & Chief Architect',
    bio: 'Building the future of autonomous scheduling and AI workforce tools.',
    company: 'State AI Labs',
    website: 'https://stateai.io',
    socials: {
      twitter: 'https://twitter.com/alexrivera',
      linkedin: 'https://linkedin.com/in/alexrivera',
      github: 'https://github.com/alexrivera',
    },
  },
  {
    id: 'usr-2',
    name: 'Sarah Chen',
    email: 'sarah@stateai.io',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    role: 'ADMIN',
    title: 'Head of Enterprise Sales',
    bio: 'Scaling high-velocity B2B SaaS revenue.',
    company: 'State AI Labs',
  },
  {
    id: 'usr-3',
    name: 'Marcus Vance',
    email: 'marcus@stateai.io',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    role: 'MANAGER',
    title: 'Lead Solutions Engineer',
    bio: 'Specialist in custom calendar routing & enterprise webhooks.',
    company: 'State AI Labs',
  },
  {
    id: 'usr-4',
    name: 'Elena Rostova',
    email: 'elena@stateai.io',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    role: 'MEMBER',
    title: 'Executive AI Advisor',
    bio: 'Advising Fortune 500 tech teams on AI automation.',
    company: 'State AI Labs',
  },
];

export const initialMeetingTypes: MeetingType[] = [
  {
    id: 'mt-1',
    title: '15 Min Discovery Call',
    slug: 'discovery-15m',
    description: 'A swift introductory session to evaluate mutual fit and understand your product requirements.',
    duration: 15,
    kind: 'ONE_ON_ONE',
    locationType: 'GOOGLE_MEET',
    color: '#6366f1',
    active: true,
    hostIds: ['usr-1'],
    customQuestions: [
      { id: 'q1', label: 'Company Name', type: 'company', required: true, placeholder: 'e.g. Acme Corp' },
      { id: 'q2', label: 'What is your primary goal for this call?', type: 'textarea', required: false, placeholder: 'Tell us briefly what you want to achieve...' },
    ],
    bufferBefore: 5,
    bufferAfter: 5,
  },
  {
    id: 'mt-2',
    title: '30 Min Product Demo (Round Robin)',
    slug: 'demo-30m',
    description: 'An interactive walkthrough of MeetOS features, custom domain routing, and workflow integrations.',
    duration: 30,
    kind: 'ROUND_ROBIN',
    locationType: 'ZOOM',
    color: '#10b981',
    active: true,
    hostIds: ['usr-2', 'usr-3'],
    customQuestions: [
      { id: 'q1', label: 'Work Email', type: 'text', required: true },
      { id: 'q2', label: 'Company Size', type: 'dropdown', required: true, options: ['1-10 employees', '11-50 employees', '51-200 employees', '201-1000 employees', '1000+ Enterprise'] },
      { id: 'q3', label: 'Estimated Monthly Budget', type: 'budget', required: true, options: ['$1,000 - $5,000', '$5,000 - $20,000', '$20,000+'] },
      { id: 'q4', label: 'Phone Number', type: 'phone', required: false },
    ],
    bufferBefore: 10,
    bufferAfter: 10,
  },
  {
    id: 'mt-3',
    title: 'Executive AI Strategy Session',
    slug: 'ai-strategy-60m',
    description: 'Paid 1-on-1 strategic consultation to map out your enterprise AI scheduling architecture.',
    duration: 60,
    kind: 'PAID',
    locationType: 'GOOGLE_MEET',
    price: 250,
    currency: 'USD',
    color: '#f59e0b',
    active: true,
    hostIds: ['usr-1'],
    customQuestions: [
      { id: 'q1', label: 'Current Calendar System', type: 'dropdown', required: true, options: ['Google Workspace', 'Microsoft 365', 'Custom Exchange', 'Cal.com / Calendly'] },
      { id: 'q2', label: 'Key Challenges to Resolve', type: 'textarea', required: true },
    ],
    bufferBefore: 15,
    bufferAfter: 15,
  },
  {
    id: 'mt-4',
    title: 'Technical Architecture Review (Collective)',
    slug: 'architecture-review',
    description: 'Deep dive technical session with our lead architects and solutions engineering team.',
    duration: 45,
    kind: 'COLLECTIVE',
    locationType: 'MS_TEAMS',
    color: '#ec4899',
    active: true,
    hostIds: ['usr-1', 'usr-3'],
    customQuestions: [
      { id: 'q1', label: 'Tech Stack Overview', type: 'textarea', required: true },
      { id: 'q2', label: 'API Security Requirements', type: 'checkbox', required: false, options: ['SSO / SAML 2.0', 'SOC2 Type II', 'HIPAA Compliance', 'Dedicated VPC'] },
    ],
    bufferBefore: 15,
    bufferAfter: 15,
  },
];

export const initialBookings: Booking[] = [
  {
    id: 'bk-101',
    meetingTypeId: 'mt-2',
    meetingTitle: '30 Min Product Demo (Round Robin)',
    guestName: 'Jessica Taylor',
    guestEmail: 'jessica.t@linear.app',
    guestPhone: '+1 (415) 890-1234',
    guestCompany: 'Linear Technologies',
    guestNotes: 'Looking to replace custom internal booking tools with MeetOS enterprise multi-tenant setup.',
    customAnswers: {
      'Company Size': '51-200 employees',
      'Estimated Monthly Budget': '$5,000 - $20,000',
    },
    date: '2026-08-01',
    time: '14:00',
    endTime: '14:30',
    timezone: 'America/New_York',
    status: 'CONFIRMED',
    locationType: 'ZOOM',
    locationUrl: 'https://zoom.us/j/98127391823',
    hostId: 'usr-2',
    hostName: 'Sarah Chen',
    hostEmail: 'sarah@stateai.io',
    createdAt: '2026-07-30T10:15:00Z',
    aiBriefing: {
      attendeeSummary: 'VP of Product Operations at Linear. Key decision maker evaluating scheduling automation for 150+ engineers & product managers.',
      companySummary: 'Linear builds high-performance issue tracking software with sleek aesthetics and real-time synchronization.',
      linkedinInsights: [
        'Ex-Stripe Senior Product Lead (4 yrs)',
        'Frequent speaker on UI craft and zero-latency engineering',
        'Recently posted about streamlining lead intake workflows'
      ],
      recentNews: [
        'Linear announced Series B funding round of $35M',
        'Expanded European operations with London hub'
      ],
      suggestedObjectives: [
        'Highlight MeetOS round-robin team distribution accuracy',
        'Showcase custom webhook triggers for Linear issues',
        'Demonstrate white-label custom domain setup'
      ],
      recommendedAgenda: [
        '00:00 - 05:00: Intro & Linear workflow requirements',
        '05:00 - 20:00: Live MeetOS Admin & Team Routing walkthrough',
        '20:00 - 30:00: Security & enterprise pricing discussion'
      ]
    }
  },
  {
    id: 'bk-102',
    meetingTypeId: 'mt-3',
    meetingTitle: 'Executive AI Strategy Session',
    guestName: 'David K. Miller',
    guestEmail: 'david@sequoiacap.com',
    guestCompany: 'Sequoia Capital',
    date: '2026-08-01',
    time: '16:00',
    endTime: '17:00',
    timezone: 'America/New_York',
    status: 'CONFIRMED',
    locationType: 'GOOGLE_MEET',
    locationUrl: 'https://meet.google.com/abc-defg-hij',
    hostId: 'usr-1',
    hostName: 'Alex Rivera',
    hostEmail: 'alex@stateai.io',
    pricePaid: 250,
    currency: 'USD',
    createdAt: '2026-07-29T14:22:00Z',
    aiBriefing: {
      attendeeSummary: 'Partner at Sequoia Capital focusing on AI infrastructure and developer productivity tools.',
      companySummary: 'Sequoia Capital is a global venture capital firm with over $85B under management.',
      linkedinInsights: [
        'Led investments in scale AI and developer tool platforms',
        'Strong technical background in distributed systems'
      ],
      recentNews: [
        'Sequoia launched $500M AI ecosystem fund',
        'David co-authored report on AI agent deployment in enterprise'
      ],
      suggestedObjectives: [
        'Present MeetOS ARR growth metrics and net expansion',
        'Demonstrate natural language AI scheduling agent',
        'Discuss strategic API distribution partnerships'
      ],
      recommendedAgenda: [
        '00:00 - 15:00: MeetOS Vision & Architecture',
        '15:00 - 45:00: Live Demo of AI Agents & Routing',
        '45:00 - 60:00: Q&A and next steps'
      ]
    }
  },
  {
    id: 'bk-103',
    meetingTypeId: 'mt-1',
    meetingTitle: '15 Min Discovery Call',
    guestName: 'Sophia Thorne',
    guestEmail: 'sophia@vercel.com',
    guestCompany: 'Vercel Inc.',
    date: '2026-08-02',
    time: '10:30',
    endTime: '10:45',
    timezone: 'America/Los_Angeles',
    status: 'CONFIRMED',
    locationType: 'GOOGLE_MEET',
    locationUrl: 'https://meet.google.com/xyz-uvwx-rst',
    hostId: 'usr-1',
    hostName: 'Alex Rivera',
    hostEmail: 'alex@stateai.io',
    createdAt: '2026-07-31T09:00:00Z',
  },
  {
    id: 'bk-104',
    meetingTypeId: 'mt-4',
    meetingTitle: 'Technical Architecture Review',
    guestName: 'Liam O\'Connor',
    guestEmail: 'liam@stripe.com',
    guestCompany: 'Stripe',
    date: '2026-07-30',
    time: '11:00',
    endTime: '11:45',
    timezone: 'America/New_York',
    status: 'COMPLETED',
    locationType: 'MS_TEAMS',
    locationUrl: 'https://teams.microsoft.com/l/meetup-join/12345',
    hostId: 'usr-3',
    hostName: 'Marcus Vance',
    hostEmail: 'marcus@stateai.io',
    createdAt: '2026-07-28T16:00:00Z',
  }
];

export const initialContacts: Contact[] = [
  {
    id: 'cnt-1',
    name: 'Jessica Taylor',
    email: 'jessica.t@linear.app',
    phone: '+1 (415) 890-1234',
    company: 'Linear Technologies',
    website: 'https://linear.app',
    title: 'VP of Product Operations',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    tags: ['Enterprise', 'High-Intent', 'Saas'],
    leadStatus: 'QUALIFIED',
    leadScore: 94,
    source: 'Direct Web Booking',
    totalBookings: 2,
    lastMeetingDate: '2026-08-01',
    notes: [
      { id: 'n1', content: 'Evaluated custom domain SSL routing. Extremely impressed by AI briefing generator.', createdAt: '2026-07-30', author: 'Sarah Chen' }
    ],
    tasks: [
      { id: 't1', title: 'Send custom SOC2 compliance documentation', completed: false, dueDate: '2026-08-03' }
    ]
  },
  {
    id: 'cnt-2',
    name: 'David K. Miller',
    email: 'david@sequoiacap.com',
    company: 'Sequoia Capital',
    website: 'https://sequoiacap.com',
    title: 'Partner',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    tags: ['Investor', 'VIP'],
    leadStatus: 'CUSTOMER',
    leadScore: 98,
    source: 'Executive Referral',
    totalBookings: 3,
    lastMeetingDate: '2026-08-01',
    notes: [
      { id: 'n1', content: 'Booked paid consultation for AI scheduling roadmap review.', createdAt: '2026-07-29', author: 'Alex Rivera' }
    ],
    tasks: []
  },
  {
    id: 'cnt-3',
    name: 'Sophia Thorne',
    email: 'sophia@vercel.com',
    company: 'Vercel Inc.',
    website: 'https://vercel.com',
    title: 'Developer Experience Director',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    tags: ['Next.js', 'Inbound'],
    leadStatus: 'LEAD',
    leadScore: 82,
    source: 'Twitter Campaign',
    totalBookings: 1,
    lastMeetingDate: '2026-08-02',
    notes: [],
    tasks: []
  }
];

export const initialSchedule: AvailabilitySchedule = {
  id: 'sch-1',
  name: 'Default Working Hours',
  isDefault: true,
  timezone: 'America/New_York',
  bufferBefore: 10,
  bufferAfter: 10,
  holidayMode: false,
  days: [
    { day: 'monday', enabled: true, slots: [{ start: '09:00', end: '17:00' }] },
    { day: 'tuesday', enabled: true, slots: [{ start: '09:00', end: '17:00' }] },
    { day: 'wednesday', enabled: true, slots: [{ start: '09:00', end: '17:00' }] },
    { day: 'thursday', enabled: true, slots: [{ start: '09:00', end: '17:00' }] },
    { day: 'friday', enabled: true, slots: [{ start: '09:00', end: '16:00' }] },
    { day: 'saturday', enabled: false, slots: [] },
    { day: 'sunday', enabled: false, slots: [] },
  ],
  dateOverrides: [
    { date: '2026-08-15', slots: [{ start: '10:00', end: '14:00' }] }
  ]
};

export const initialAutomations: AutomationRule[] = [
  {
    id: 'aut-1',
    name: 'Instant Slack Channel Notification',
    trigger: 'BOOKING_CREATED',
    active: true,
    actions: [
      { type: 'SLACK_NOTIF', config: { channel: '#new-bookings', format: 'rich-card' } },
      { type: 'SEND_EMAIL', config: { template: 'confirmation-guest', subject: 'Your Meeting with State AI is Confirmed' } }
    ]
  },
  {
    id: 'aut-2',
    name: 'HubSpot Deal Creation & CRM Sync',
    trigger: 'BOOKING_CREATED',
    active: true,
    actions: [
      { type: 'CRM_SYNC', config: { provider: 'hubspot', pipeline: 'Sales Inbound' } },
      { type: 'CREATE_ZOOM', config: { autoRecord: true } }
    ]
  },
  {
    id: 'aut-3',
    name: '24-Hour Pre-Meeting SMS Reminder',
    trigger: 'REMINDER_24H',
    active: true,
    actions: [
      { type: 'SEND_SMS', config: { body: 'Hi {{guest_name}}, your meeting with {{host_name}} is in 24 hours. Join link: {{location_url}}' } }
    ]
  }
];

export const initialIntegrations: IntegrationApp[] = [
  { id: 'int-1', name: 'Google Calendar', category: 'CALENDAR', description: 'Two-way real-time calendar synchronization & conflict prevention.', icon: 'Calendar', connected: true, syncStatus: 'Live', lastSynced: '2 mins ago' },
  { id: 'int-2', name: 'Microsoft Outlook', category: 'CALENDAR', description: 'Enterprise Office 365 calendar & Exchange server integration.', icon: 'Mail', connected: true, syncStatus: 'Live', lastSynced: '5 mins ago' },
  { id: 'int-3', name: 'Google Meet', category: 'VIDEO', description: 'Automatically generate unique Google Meet room URLs for every booking.', icon: 'Video', connected: true },
  { id: 'int-4', name: 'Zoom Video Communications', category: 'VIDEO', description: 'Generate instant passcode-protected Zoom meetings with cloud recording.', icon: 'Video', connected: true },
  { id: 'int-5', name: 'Stripe Payments', category: 'PAYMENT', description: 'Collect instant payment before booking confirmation with global currencies.', icon: 'CreditCard', connected: true },
  { id: 'int-6', name: 'Slack Workspaces', category: 'COMMUNICATION', description: 'Real-time booking alerts, daily agendas, and team round-robin notifications.', icon: 'MessageSquare', connected: true },
  { id: 'int-7', name: 'HubSpot CRM', category: 'CRM', description: 'Auto-create deals, update lead stages, and attach meeting notes.', icon: 'Database', connected: true },
  { id: 'int-8', name: 'Salesforce Enterprise', category: 'CRM', description: 'Bidirectional sync with Salesforce Contacts, Leads, and Opportunities.', icon: 'Database', connected: false },
  { id: 'int-9', name: 'Zapier & Make Webhooks', category: 'AUTOMATION', description: 'Trigger custom serverless workflows across 5,000+ web applications.', icon: 'Zap', connected: true },
];

export const initialTransactions: StripeTransaction[] = [
  { id: 'tx-801', bookingId: 'bk-102', customerName: 'David K. Miller', customerEmail: 'david@sequoiacap.com', amount: 250, currency: 'USD', status: 'PAID', date: '2026-07-29', invoiceUrl: '#' },
  { id: 'tx-800', bookingId: 'bk-099', customerName: 'Marcus Aurelius', customerEmail: 'marcus@stoic.io', amount: 500, currency: 'USD', status: 'PAID', date: '2026-07-25', invoiceUrl: '#' },
  { id: 'tx-799', bookingId: 'bk-095', customerName: 'Chen Wei', customerEmail: 'wei@techventures.cn', amount: 250, currency: 'USD', status: 'PAID', date: '2026-07-20', invoiceUrl: '#' },
];
