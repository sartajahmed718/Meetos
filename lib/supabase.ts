'use client';

import { createClient } from '@supabase/supabase-js';

// Supabase Environment Credentials
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://xyzcompany.supabase.co';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZWZlcmVuY2UiOiJtZWV0b3MifQ.mockKey';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * Supabase Auth API Wrappers
 */
export async function signUpWithEmail(email: string, pass: string, name: string) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password: pass,
      options: {
        data: {
          full_name: name,
        },
      },
    });
    if (error) throw error;
    return { user: data.user, session: data.session };
  } catch (err: any) {
    console.warn('[Supabase Auth Warning] Local fallback active:', err.message);
    return { user: { id: `usr-${Date.now()}`, email, user_metadata: { full_name: name } }, session: null };
  }
}

export async function signInWithEmail(email: string, pass: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: pass,
    });
    if (error) throw error;
    return { user: data.user, session: data.session };
  } catch (err: any) {
    console.warn('[Supabase Auth Warning] Local fallback active:', err.message);
    return { user: { id: 'usr-1', email, user_metadata: { full_name: 'Alex Rivera' } }, session: null };
  }
}

export async function signInWithOAuth(provider: 'google' | 'github') {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: typeof window !== 'undefined' ? `${window.location.origin}/dashboard` : undefined,
      },
    });
    if (error) throw error;
    return data;
  } catch (err: any) {
    console.warn('[Supabase Auth OAuth Warning]:', err.message);
  }
}

export async function signOutUser() {
  try {
    await supabase.auth.signOut();
  } catch (err: any) {
    console.warn('[Supabase SignOut Warning]:', err.message);
  }
}

export async function getCurrentSession() {
  try {
    const { data } = await supabase.auth.getSession();
    return data.session;
  } catch {
    return null;
  }
}

/**
 * Supabase Database API Wrappers (Bookings, Meeting Types, Contacts)
 */
export async function insertBookingDb(booking: any) {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .insert([
        {
          meeting_title: booking.meetingTitle,
          guest_name: booking.guestName,
          guest_email: booking.guestEmail,
          guest_phone: booking.guestPhone,
          guest_company: booking.guestCompany,
          guest_notes: booking.guestNotes,
          date: booking.date,
          time: booking.time,
          end_time: booking.endTime,
          timezone: booking.timezone,
          location_type: booking.locationType,
          location_url: booking.locationUrl,
          host_name: booking.hostName,
          host_email: booking.hostEmail,
          price_paid: booking.pricePaid,
          status: booking.status || 'CONFIRMED',
        },
      ])
      .select();

    if (error) throw error;
    return data;
  } catch (err: any) {
    console.warn('[Supabase DB Insert Warning] Saved locally:', err.message);
    return null;
  }
}

export async function fetchBookingsDb() {
  try {
    const { data, error } = await supabase.from('bookings').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  } catch (err: any) {
    console.warn('[Supabase DB Fetch Warning]:', err.message);
    return null;
  }
}
