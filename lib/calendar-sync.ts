'use client';

/**
 * Calendar Sync Engine for MeetOS
 * Generates Google Calendar, Microsoft Outlook, and iCal (.ics) events
 * ensuring both the host and attendee have real-time schedule awareness.
 */

export interface CalendarEventDetails {
  title: string;
  description?: string;
  location?: string;
  startDate: string; // YYYY-MM-DD
  startTime: string; // HH:mm (e.g. 14:00)
  durationMinutes: number;
  hostName: string;
  hostEmail: string;
  guestName: string;
  guestEmail: string;
  timezone?: string;
}

/**
 * Helper to convert YYYY-MM-DD and HH:mm into ISO/UTC timestamp strings for calendar URLs
 */
export function formatCalendarDates(startDate: string, startTime: string, durationMinutes: number) {
  // Parse date & time
  const [year, month, day] = startDate.split('-').map(Number);
  const [hours, minutes] = startTime.split(':').map(Number);

  const start = new Date(Date.UTC(year, month - 1, day, hours, minutes));
  const end = new Date(start.getTime() + durationMinutes * 60 * 1000);

  const formatIso = (date: Date) =>
    date.toISOString().replace(/-|:|\.\d\d\d/g, '');

  return {
    startIso: formatIso(start),
    endIso: formatIso(end),
    startFormatted: start.toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' }),
    endFormatted: end.toLocaleString('en-US', { timeStyle: 'short' }),
  };
}

/**
 * Generate Google Calendar Direct Add URL
 */
export function generateGoogleCalendarUrl(event: CalendarEventDetails): string {
  const { startIso, endIso } = formatCalendarDates(
    event.startDate,
    event.startTime,
    event.durationMinutes
  );

  const title = encodeURIComponent(`${event.title} (${event.hostName} & ${event.guestName})`);
  const details = encodeURIComponent(
    `${event.description || 'Scheduled via MeetOS AI Calendar'}\n\nHost: ${event.hostName} (${event.hostEmail})\nGuest: ${event.guestName} (${event.guestEmail})\nMeeting Link: ${event.location || 'https://meet.google.com/meetos-live-call'}`
  );
  const location = encodeURIComponent(event.location || 'Google Meet Video Call');
  const addEmails = encodeURIComponent(`${event.guestEmail},${event.hostEmail}`);

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startIso}/${endIso}&details=${details}&location=${location}&add=${addEmails}`;
}

/**
 * Generate Microsoft Outlook / Office 365 Direct Add URL
 */
export function generateOutlookCalendarUrl(event: CalendarEventDetails): string {
  const [year, month, day] = event.startDate.split('-').map(Number);
  const [hours, minutes] = event.startTime.split(':').map(Number);

  const start = new Date(Date.UTC(year, month - 1, day, hours, minutes));
  const end = new Date(start.getTime() + event.durationMinutes * 60 * 1000);

  const subject = encodeURIComponent(`${event.title} (${event.hostName} & ${event.guestName})`);
  const body = encodeURIComponent(
    `${event.description || 'Scheduled via MeetOS AI'}\n\nHost: ${event.hostName}\nGuest: ${event.guestName}`
  );
  const location = encodeURIComponent(event.location || 'Microsoft Teams / Video Call');

  return `https://outlook.live.com/calendar/0/deeplink/compose?subject=${subject}&startdt=${start.toISOString()}&enddt=${end.toISOString()}&body=${body}&location=${location}`;
}

/**
 * Generate iCal (.ics) Blob Data URL for Apple Calendar, iCal, Thunderbird
 */
export function generateIcsFileDownload(event: CalendarEventDetails): string {
  const { startIso, endIso } = formatCalendarDates(
    event.startDate,
    event.startTime,
    event.durationMinutes
  );

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//MeetOS State AI Calendar//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:REQUEST',
    'BEGIN:VEVENT',
    `UID:meetos-${Date.now()}@stateai.io`,
    `DTSTAMP:${startIso}`,
    `DTSTART:${startIso}`,
    `DTEND:${endIso}`,
    `SUMMARY:${event.title} - ${event.hostName} & ${event.guestName}`,
    `DESCRIPTION:${event.description || 'Scheduled via MeetOS AI Calendar'}\\nHost: ${event.hostName} (${event.hostEmail})\\nGuest: ${event.guestName} (${event.guestEmail})`,
    `LOCATION:${event.location || 'Google Meet Video Call'}`,
    `ORGANIZER;CN=${event.hostName}:mailto:${event.hostEmail}`,
    `ATTENDEE;CUTYPE=INDIVIDUAL;ROLE=REQ-PARTICIPANT;PARTSTAT=NEEDS-ACTION;CN=${event.guestName}:mailto:${event.guestEmail}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  return `data:text/calendar;charset=utf8,${encodeURIComponent(icsContent)}`;
}
