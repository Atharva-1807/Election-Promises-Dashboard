-- Database Schema for Election Promises Dashboard
-- Run these SQL commands in your Supabase SQL Editor

-- Create parties table
CREATE TABLE IF NOT EXISTS parties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  allies TEXT,
  governing_body TEXT NOT NULL CHECK (governing_body IN ('PMC', 'PCMC')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create promises table
CREATE TABLE IF NOT EXISTS promises (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  promise_text TEXT NOT NULL,
  theme TEXT NOT NULL,
  specificity TEXT NOT NULL CHECK (specificity IN ('High', 'Medium', 'Low')),
  party_id UUID NOT NULL REFERENCES parties(id) ON DELETE CASCADE,
  governing_body TEXT NOT NULL CHECK (governing_body IN ('PMC', 'PCMC')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create sources table
CREATE TABLE IF NOT EXISTS sources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  governing_body TEXT NOT NULL CHECK (governing_body IN ('PMC', 'PCMC')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create FAQs table
CREATE TABLE IF NOT EXISTS faqs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS) for read-only access
ALTER TABLE parties ENABLE ROW LEVEL SECURITY;
ALTER TABLE promises ENABLE ROW LEVEL SECURITY;
ALTER TABLE sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access on parties" ON parties
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access on promises" ON promises
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access on sources" ON sources
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access on faqs" ON faqs
  FOR SELECT USING (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_promises_governing_body ON promises(governing_body);
CREATE INDEX IF NOT EXISTS idx_promises_party_id ON promises(party_id);
CREATE INDEX IF NOT EXISTS idx_parties_governing_body ON parties(governing_body);
CREATE INDEX IF NOT EXISTS idx_sources_governing_body ON sources(governing_body);
