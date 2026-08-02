import { AIBriefing, Booking, MeetingType, UserProfile } from './types';

export function parseAISchedulePrompt(prompt: string, meetingTypes: MeetingType[], hosts: UserProfile[]) {
  const lower = prompt.toLowerCase();
  
  // Detect duration
  let duration = 30;
  if (lower.includes('15') || lower.includes('fifteen')) duration = 15;
  else if (lower.includes('45') || lower.includes('forty five')) duration = 45;
  else if (lower.includes('60') || lower.includes('hour') || lower.includes('one hour')) duration = 60;
  else if (lower.includes('90')) duration = 90;

  // Match meeting type
  let matchedType = meetingTypes.find((m) => m.duration === duration) || meetingTypes[0];
  if (lower.includes('demo')) {
    const demoType = meetingTypes.find((m) => m.title.toLowerCase().includes('demo'));
    if (demoType) matchedType = demoType;
  } else if (lower.includes('strategy') || lower.includes('consultation')) {
    const stratType = meetingTypes.find((m) => m.title.toLowerCase().includes('strategy'));
    if (stratType) matchedType = stratType;
  }

  // Match host
  let matchedHost = hosts[0];
  if (lower.includes('sarah')) {
    const sarah = hosts.find((h) => h.name.toLowerCase().includes('sarah'));
    if (sarah) matchedHost = sarah;
  } else if (lower.includes('marcus')) {
    const marcus = hosts.find((h) => h.name.toLowerCase().includes('marcus'));
    if (marcus) matchedHost = marcus;
  } else if (lower.includes('elena')) {
    const elena = hosts.find((h) => h.name.toLowerCase().includes('elena'));
    if (elena) matchedHost = elena;
  }

  // Generate suggested slots for next week
  const today = new Date();
  const slots = [];
  for (let i = 1; i <= 5; i++) {
    const candidateDate = new Date(today);
    candidateDate.setDate(today.getDate() + i + (i > 3 ? 2 : 0)); // Skip weekend roughly
    const dateStr = candidateDate.toISOString().split('T')[0];
    
    slots.push(
      { date: dateStr, time: '10:00', label: `${dateStr} at 10:00 AM EST` },
      { date: dateStr, time: '14:00', label: `${dateStr} at 2:00 PM EST` },
      { date: dateStr, time: '16:00', label: `${dateStr} at 4:00 PM EST` }
    );
  }

  return {
    parsedDuration: duration,
    meetingType: matchedType,
    assignedHost: matchedHost,
    suggestedSlots: slots.slice(0, 4),
    aiExplanation: `Based on your request "${prompt}", I selected the **${matchedType.title}** (${duration} mins) hosted by **${matchedHost.name}**. Here are the top 4 conflict-free time slots tailored for peak focus & high conversion.`,
  };
}

export function generateAIMeetingPrep(guestName: string, guestCompany: string, guestEmail: string, meetingTitle: string): AIBriefing {
  const company = guestCompany || (guestEmail.includes('@') ? guestEmail.split('@')[1].split('.')[0] : 'InnovateCorp');
  const capitalizedCompany = company.charAt(0).toUpperCase() + company.slice(1);

  return {
    attendeeSummary: `${guestName} is a senior leader at ${capitalizedCompany}. Strong track record in scaling digital infrastructure and streamlining team operations.`,
    companySummary: `${capitalizedCompany} is an industry player focusing on software operations, customer expansion, and modern cloud architecture.`,
    linkedinInsights: [
      `10+ years experience in tech leadership & product scaling`,
      `Active advocate for automated workflow tooling and developer UX`,
      `Recently shared insights on optimizing operational efficiency`
    ],
    recentNews: [
      `${capitalizedCompany} recently expanded product lineup to target mid-market enterprise accounts`,
      `Featured in TechCrunch for innovative remote workforce strategy`
    ],
    suggestedObjectives: [
      `Identify pain points in ${capitalizedCompany}'s current scheduling pipeline`,
      `Demonstrate MeetOS round-robin routing & custom domain integration`,
      `Secure agreement for a pilot workspace onboarding`
    ],
    recommendedAgenda: [
      `00:00 - 05:00: Warm welcomes & context alignment`,
      `05:00 - 20:00: Live demonstration of MeetOS AI features`,
      `20:00 - 30:00: Next steps & pilot launch timeline`
    ]
  };
}

export function generateAIFollowUpEmail(booking: Booking): { subject: string; body: string } {
  return {
    subject: `Follow-up: ${booking.meetingTitle} with State AI`,
    body: `Hi ${booking.guestName},

Thank you for joining our call regarding "${booking.meetingTitle}" today!

Key Takeaways & Action Items:
1. We reviewed ${booking.guestCompany || 'your team'}'s current scheduling workflow.
2. MeetOS AI features can automate lead routing and eliminate scheduling friction.
3. Next step: We'll set up your dedicated workspace on MeetOS with custom domain support.

If you have any questions before our next session, feel free to reply directly to this email or book another time slot:
https://meet.stateai.io/book/${booking.hostId}/${booking.meetingTypeId}

Best regards,
${booking.hostName}
State AI Labs`
  };
}

export function evaluateAIRouting(leadData: { budget: string; companySize: string; country: string; industry: string }, hosts: UserProfile[]) {
  const budget = leadData.budget || '';
  const size = leadData.companySize || '';

  let recommendedHost = hosts[0];
  let reason = 'Routed to Lead Account Executive based on standard round-robin balancing.';

  if (budget.includes('20,000') || size.includes('1000+') || size.includes('201-1000')) {
    const sarah = hosts.find((h) => h.role === 'ADMIN' || h.name.includes('Sarah'));
    if (sarah) {
      recommendedHost = sarah;
      reason = 'High-Value Enterprise Lead matched to Head of Enterprise Sales (Sarah Chen).';
    }
  } else if (leadData.industry.toLowerCase().includes('tech') || leadData.industry.toLowerCase().includes('engineer')) {
    const marcus = hosts.find((h) => h.name.includes('Marcus'));
    if (marcus) {
      recommendedHost = marcus;
      reason = 'Technical Engineering lead routed to Solutions Engineer (Marcus Vance).';
    }
  }

  return {
    recommendedHost,
    reason,
    leadScore: Math.floor(Math.random() * 15) + 85, // 85 - 99 score
  };
}
