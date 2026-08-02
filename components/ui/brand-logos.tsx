'use client';

import React from 'react';

export function GoogleCalendarLogo({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M38 10H10C7.79086 10 6 11.7909 6 14V38C6 40.2091 7.79086 42 10 42H38C40.2091 42 42 40.2091 42 38V14C42 11.7909 40.2091 10 38 10Z" fill="#F4F5F7" />
      <path d="M34 6V14M14 6V14" stroke="#4285F4" strokeWidth="4" strokeLinecap="round" />
      <path d="M6 18H42" stroke="#4285F4" strokeWidth="4" />
      <rect x="12" y="24" width="6" height="6" rx="1.5" fill="#4285F4" />
      <rect x="21" y="24" width="6" height="6" rx="1.5" fill="#EA4335" />
      <rect x="30" y="24" width="6" height="6" rx="1.5" fill="#FBBC05" />
      <rect x="12" y="32" width="6" height="6" rx="1.5" fill="#34A853" />
      <rect x="21" y="32" width="6" height="6" rx="1.5" fill="#4285F4" />
      <rect x="30" y="32" width="6" height="6" rx="1.5" fill="#EA4335" />
    </svg>
  );
}

export function OutlookLogo({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M28 8H40C41.1046 8 42 8.89543 42 10V38C42 39.1046 41.1046 40 40 40H28V8Z" fill="#0078D4" />
      <path d="M28 8L6 14V34L28 40V8Z" fill="#106EBE" />
      <path d="M17 19C14.2386 19 12 21.2386 12 24C12 26.7614 14.2386 29 17 29C19.7614 29 22 26.7614 22 24C22 21.2386 19.7614 19 17 19Z" fill="white" />
    </svg>
  );
}

export function GoogleMeetLogo({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="12" width="24" height="24" rx="4" fill="#00832D" />
      <path d="M30 18L42 12V36L30 30V18Z" fill="#006622" />
      <path d="M30 18L42 12V24L30 22V18Z" fill="#00AA47" />
      <circle cx="18" cy="24" r="5" fill="#26A69A" />
    </svg>
  );
}

export function ZoomLogo({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="48" rx="12" fill="#2D8CFF" />
      <path d="M11 17C11 15.3431 12.3431 14 14 14H26C27.6569 14 29 15.3431 29 17V31C29 32.6569 27.6569 34 26 34H14C12.3431 34 11 32.6569 11 31V17Z" fill="white" />
      <path d="M31 20.5L37 16V32L31 27.5V20.5Z" fill="white" />
    </svg>
  );
}

export function SlackLogo({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M19 8C19 6.34315 17.6569 5 16 5C14.3431 5 13 6.34315 13 8V19H16C17.6569 19 19 17.6569 19 16V8Z" fill="#E01E5A" />
      <path d="M8 19C6.34315 19 5 17.6569 5 16C5 14.3431 6.34315 13 8 13H16V16C16 17.6569 14.6569 19 13 19H8Z" fill="#E01E5A" />
      <path d="M29 8C29 6.34315 30.3431 5 32 5C33.6569 5 35 6.34315 35 8V16C35 17.6569 33.6569 19 32 19H29V8Z" fill="#36C5F0" />
      <path d="M32 19C33.6569 19 35 17.6569 35 16C35 14.3431 33.6569 13 32 13V16C32 17.6569 30.6569 19 29 19H32Z" fill="#36C5F0" />
      <path d="M29 40C29 41.6569 30.3431 43 32 43C33.6569 43 35 41.6569 35 40V29H32C30.3431 29 29 30.3431 29 32V40Z" fill="#2EB67D" />
      <path d="M40 29C41.6569 29 43 30.3431 43 32C43 33.6569 41.6569 35 40 35H32V32C32 30.3431 33.3431 29 35 29H40Z" fill="#2EB67D" />
      <path d="M19 40C19 41.6569 17.6569 43 16 43C14.3431 43 13 41.6569 13 40V32C13 30.3431 14.3431 29 16 29H19V40Z" fill="#ECB22E" />
      <path d="M16 29C14.3431 29 13 30.3431 13 32C13 33.6569 14.3431 35 16 35V32C16 30.3431 17.3431 29 19 29H16Z" fill="#ECB22E" />
    </svg>
  );
}

export function StripeLogo({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="48" rx="12" fill="#635BFF" />
      <path d="M22.5 19.5C22.5 18.5 23.3 17.8 24.8 17.8C26.5 17.8 28.5 18.3 29.8 19.1V14.5C28.4 13.8 26.6 13.5 24.8 13.5C20.2 13.5 17.2 16 17.2 19.8C17.2 26 25.7 25 25.7 28.3C25.7 29.5 24.5 30.2 23 30.2C21.1 30.2 18.8 29.4 17.2 28.4V33.1C19 34.1 21.1 34.5 23.1 34.5C27.9 34.5 31.1 32 31.1 28C31.1 21.3 22.5 22.5 22.5 19.5Z" fill="white" />
    </svg>
  );
}

export function HubSpotLogo({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="48" rx="12" fill="#FF7A59" />
      <circle cx="24" cy="24" r="8" stroke="white" strokeWidth="4" fill="none" />
      <circle cx="24" cy="12" r="3" fill="white" />
      <line x1="24" y1="15" x2="24" y2="16" stroke="white" strokeWidth="4" />
      <circle cx="35" cy="29" r="3" fill="white" />
      <line x1="30" y1="26.5" x2="33" y2="28" stroke="white" strokeWidth="4" />
    </svg>
  );
}

export function SalesforceLogo({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="48" rx="12" fill="#00A1E0" />
      <path d="M21 16C22.2 14.2 24.2 13 26.5 13C29.6 13 32.2 15.1 33 18C34.2 18.2 35.2 18.9 35.8 19.9C36.4 20.9 36.6 22.2 36.3 23.3C37.3 24.3 38 25.7 38 27.2C38 30.4 35.4 33 32.2 33H16C12.7 33 10 30.3 10 27C10 24.1 12.1 21.7 15 21.1C15.3 18.7 17.3 16.8 19.8 16.2C20.2 16.1 20.6 16 21 16Z" fill="white" />
    </svg>
  );
}

export function ZapierLogo({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="48" rx="12" fill="#FF4F00" />
      <path d="M26 10L14 26H23L22 38L34 22H25L26 10Z" fill="white" stroke="white" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}
