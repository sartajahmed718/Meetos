-- MeetOS AI Calendar Database Schema for Supabase PostgreSQL
-- Run this script in the Supabase SQL Editor (https://app.supabase.com)

-- 1. Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Workspaces Table
CREATE TABLE IF NOT EXISTS public.workspaces (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    custom_domain VARCHAR(255),
    primary_color VARCHAR(50) DEFAULT '#09090b',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Meeting Types Table
CREATE TABLE IF NOT EXISTS public.meeting_types (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL,
    description TEXT,
    duration INTEGER NOT NULL DEFAULT 30,
    kind VARCHAR(50) NOT NULL DEFAULT 'ONE_ON_ONE',
    location_type VARCHAR(50) NOT NULL DEFAULT 'GOOGLE_MEET',
    price NUMERIC(10, 2),
    currency VARCHAR(10) DEFAULT 'USD',
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Bookings Table
CREATE TABLE IF NOT EXISTS public.bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    meeting_title VARCHAR(255) NOT NULL,
    guest_name VARCHAR(255) NOT NULL,
    guest_email VARCHAR(255) NOT NULL,
    guest_phone VARCHAR(50),
    guest_company VARCHAR(255),
    guest_notes TEXT,
    date DATE NOT NULL,
    time VARCHAR(20) NOT NULL,
    end_time VARCHAR(20) NOT NULL,
    timezone VARCHAR(100) NOT NULL DEFAULT 'America/New_York',
    location_type VARCHAR(50) NOT NULL DEFAULT 'GOOGLE_MEET',
    location_url TEXT,
    host_name VARCHAR(255) NOT NULL,
    host_email VARCHAR(255) NOT NULL,
    price_paid NUMERIC(10, 2),
    status VARCHAR(50) NOT NULL DEFAULT 'CONFIRMED',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Contacts (CRM) Table
CREATE TABLE IF NOT EXISTS public.contacts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    company VARCHAR(255),
    title VARCHAR(255),
    lead_score INTEGER DEFAULT 80,
    lead_status VARCHAR(50) DEFAULT 'QUALIFIED',
    total_bookings INTEGER DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. Row Level Security (RLS) Policies
ALTER TABLE public.workspaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meeting_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

-- Allow public read access to active meeting types & public bookings
CREATE POLICY "Public Read Meeting Types" ON public.meeting_types FOR SELECT USING (active = true);
CREATE POLICY "Public Read Bookings" ON public.bookings FOR SELECT USING (true);
CREATE POLICY "Public Insert Bookings" ON public.bookings FOR INSERT WITH CHECK (true);
