'use client'

import { useState, useEffect, useMemo } from 'react'
import { GoverningBody, Party, Promise, Source, FAQ } from '@/types'
import Header from '@/components/Header'
import GoverningBodyFilter from '@/components/GoverningBodyFilter'
import PartyFilter from '@/components/PartyFilter'
import OverviewSection from '@/components/OverviewSection'
import PromisesSection from '@/components/PromisesSection'
import SourcesSection from '@/components/SourcesSection'
import FAQSection from '@/components/FAQSection'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import PartyDescriptions from '@/components/PartyDescriptions'

// Complete list of all parties matching database names exactly
const allParties: Party[] = [
  // PMC parties
  { id: 'BJP', name: 'BJP', governing_body: 'PMC' },
  { id: 'Indian National Congress', name: 'Indian National Congress', governing_body: 'PMC' },
  { id: 'Nationalist Congress Party', name: 'Nationalist Congress Party', governing_body: 'PMC' },
  { id: 'NCP Alliance', name: 'NCP Alliance', governing_body: 'PMC' },
  { id: 'Shiv Sena(UBT)', name: 'Shiv Sena(UBT)', governing_body: 'PMC' },
  { id: 'MNS', name: 'MNS', governing_body: 'PMC' },
  { id: 'AAP', name: 'AAP', governing_body: 'PMC' },
  { id: 'Shiv Sena(Shinde)', name: 'Shiv Sena(Shinde)', governing_body: 'PMC' },
  { id: 'Independent', name: 'Independent', governing_body: 'PMC' },

  // PCMC parties
  { id: 'BJP', name: 'BJP', governing_body: 'PCMC' },
  { id: 'Indian National Congress', name: 'Indian National Congress', governing_body: 'PCMC' },
  { id: 'Nationalist Congress Party', name: 'Nationalist Congress Party', governing_body: 'PCMC' },
  { id: 'NCP Alliance', name: 'NCP Alliance', governing_body: 'PCMC' },
  { id: 'Shiv Sena(UBT)', name: 'Shiv Sena(UBT)', governing_body: 'PCMC' },
  { id: 'MNS', name: 'MNS', governing_body: 'PCMC' },
  { id: 'AAP', name: 'AAP', governing_body: 'PCMC' },
  { id: 'Shiv Sena(Shinde)', name: 'Shiv Sena(Shinde)', governing_body: 'PCMC' },
  { id: 'Independent', name: 'Independent', governing_body: 'PCMC' },
]

// Mock data for UI development (canonical party names)
const mockParties: Party[] = allParties

const mockPromises: Promise[] = [
  {
    id: '1',
    promise_text: 'Complete the Pune Metro Phase 2 expansion connecting Hinjewadi to Shivajinagar by 2027',
    theme: 'Transport',
    specificity: 'High',
    party: 'BJP',
    party_id: 'BJP',
    governing_body: 'PMC',
  },
  {
    id: '2',
    promise_text: 'Ensure 24x7 water supply to all PMC areas within 3 years',
    theme: 'Water',
    specificity: 'High',
    party: 'BJP',
    party_id: 'BJP',
    governing_body: 'PMC',
  },
  {
    id: '3',
    promise_text: 'Build 50 new public gardens and parks across the city',
    theme: 'Environment',
    specificity: 'Medium',
    party: 'BJP',
    party_id: 'BJP',
    governing_body: 'PMC',
  },
  {
    id: '4',
    promise_text: 'Improve road infrastructure and reduce traffic congestion',
    theme: 'Infrastructure',
    specificity: 'Medium',
    party: 'Indian National Congress',
    party_id: 'Indian National Congress',
    governing_body: 'PMC',
  },
  {
    id: '5',
    promise_text: 'Establish 10 new primary health centers in underserved areas',
    theme: 'Health',
    specificity: 'High',
    party: 'Indian National Congress',
    party_id: 'Indian National Congress',
    governing_body: 'PMC',
  },
  {
    id: '6',
    promise_text: 'Implement comprehensive waste segregation and recycling program',
    theme: 'Waste Management',
    specificity: 'Low',
    party: 'Nationalist Congress Party',
    party_id: 'Nationalist Congress Party',
    governing_body: 'PMC',
  },
  {
    id: '7',
    promise_text: 'Expand public bus network with 100 new routes',
    theme: 'Transport',
    specificity: 'Medium',
    party: 'Shiv Sena(UBT)',
    party_id: 'Shiv Sena(UBT)',
    governing_body: 'PMC',
  },
  {
    id: '8',
    promise_text: 'Upgrade key arterial roads and junctions in PCMC to reduce bottlenecks',
    theme: 'Infrastructure',
    specificity: 'Medium',
    party: 'BJP',
    party_id: 'BJP',
    governing_body: 'PCMC',
  },
  {
    id: '9',
    promise_text: 'Set up additional primary health clinics in rapidly growing PCMC wards',
    theme: 'Health',
    specificity: 'High',
    party: 'Nationalist Congress Party',
    party_id: 'Nationalist Congress Party',
    governing_body: 'PCMC',
  },
]

const mockSources: Source[] = [
  {
    id: '1',
    source_name: 'BJP Maharashtra Official Manifesto 2024',
    source_url: 'https://example.com/bjp-manifesto',
    title: 'BJP Maharashtra Official Manifesto 2024',
    url: 'https://example.com/bjp-manifesto',
    governing_body: 'PMC',
  },
  {
    id: '2',
    source_name: 'Congress Pune Municipal Election Promises',
    source_url: 'https://example.com/congress-promises',
    title: 'Congress Pune Municipal Election Promises',
    url: 'https://example.com/congress-promises',
    governing_body: 'PMC',
  },
  {
    id: '3',
    source_name: 'NCP (SP) Local Body Election Document',
    source_url: 'https://example.com/ncp-document',
    title: 'NCP (SP) Local Body Election Document',
    url: 'https://example.com/ncp-document',
    governing_body: 'PMC',
  },
  {
    id: '4',
    source_name: 'Shiv Sena (UBT) PMC Election Manifesto',
    source_url: 'https://example.com/shivsena-ubt',
    title: 'Shiv Sena (UBT) PMC Election Manifesto',
    url: 'https://example.com/shivsena-ubt',
    governing_body: 'PMC',
  },
]

const mockFAQs: FAQ[] = [
  {
    id: '1',
    question: 'How to use this dashboard?',
    answer: 'Use the city toggle to switch between PMC and PCMC and view promises specific to each municipal corporation. You can then use the party selection checkboxes to choose one or more political parties and view the promises made by them. The content updates instantly based on your selection. Promises are displayed as individual cards and grouped by party, allowing you to scan, compare, or focus on a single party\'s commitments.',
  },
  {
    id: '2',
    question: 'Where does this data come from?',
    answer: 'All information shown in this dashboard is manually curated from publicly available sources, including: Official party manifestos, Election pamphlets and public releases, Credible news reports covering manifesto launches and campaign announcements. Promises are recorded verbatim, without interpretation, summarisation, or evaluation. A complete list of sources used for this dashboard is available at the bottom of the page, allowing users to verify where each promise originates.',
  },
  {
    id: '3',
    question: 'Scope & transparency note',
    answer: 'This dashboard is a work in progress and currently reflects a limited, curated set of publicly announced promises. Coverage will expand as more verified information becomes available.',
  },
]

export default function Dashboard() {
  const [governingBody, setGoverningBody] = useState<GoverningBody>('PMC')
  const [parties, setParties] = useState<Party[]>([])
  const [promises, setPromises] = useState<Promise[]>([])
  const [sources, setSources] = useState<Source[]>([])
  const [faqs, setFaqs] = useState<FAQ[]>([])
  const [selectedParties, setSelectedParties] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch parties when governing body changes
  // Since there's no parties table, extract unique parties from promises
  useEffect(() => {
    async function fetchParties() {
      // Use mock data if Supabase is not configured
      if (!isSupabaseConfigured() || !supabase) {
        const filteredParties = mockParties.filter((p) => p.governing_body === governingBody)
        setParties(filteredParties)
        // Do not auto-select parties - let users choose
        setSelectedParties([])
        return
      }

      try {
        // Get all parties for the current governing body
        const allPartiesForBody = allParties.filter((p) => p.governing_body === governingBody)
        
        // Fetch promises to get alliance info for parties that have data
        const { data: promisesData, error } = await supabase
          .from('Promises')
          .select('party, alliance, governing_body')
          .eq('governing_body', governingBody)

        if (error) throw error

        // Create a map of parties with alliance info from promises
        const partyAllianceMap = new Map<string, string>()
        promisesData?.forEach((p: any) => {
          if (p.party && p.alliance && !partyAllianceMap.has(p.party)) {
            partyAllianceMap.set(p.party, p.alliance)
          }
        })

        // Merge alliance info into all parties
        const partiesWithAlliance = allPartiesForBody.map((party) => ({
          ...party,
          allies: partyAllianceMap.get(party.name) || undefined,
        }))

        setParties(partiesWithAlliance)
        // Do not auto-select parties - let users choose
        setSelectedParties([])
      } catch (error) {
        console.error('Error fetching parties:', error)
        // Fall back to all parties list
        const allPartiesForBody = allParties.filter((p) => p.governing_body === governingBody)
        setParties(allPartiesForBody)
      }
    }

    fetchParties()
  }, [governingBody])

  // Fetch promises when governing body changes
  useEffect(() => {
    async function fetchPromises() {
      // Use mock data if Supabase is not configured
      if (!isSupabaseConfigured() || !supabase) {
        const filteredPromises = mockPromises.filter((p) => p.governing_body === governingBody)
        setPromises(filteredPromises)
        return
      }

      try {
        const { data, error } = await supabase
          .from('Promises')
          .select('*')
          .eq('governing_body', governingBody)
          .order('created_at', { ascending: false })

        if (error) throw error

        // Map the data to match expected format
        const mappedPromises = (data || []).map((p: any) => {
          const mapped = {
            ...p,
            promise_text: p.Promise_text || p.promise_text, // Handle case-sensitive column name
            party_id: p.party, // Use party name as party_id for compatibility
            // Set default specificity if not available (could derive from source_category)
            specificity: p.source_category === 'High' ? 'High' : 
                        p.source_category === 'Medium' ? 'Medium' : 
                        p.source_category === 'Low' ? 'Low' : 'Medium' as 'High' | 'Medium' | 'Low',
          }
          return mapped
        })

        console.log('Fetched promises:', mappedPromises.length, 'First promise:', mappedPromises[0])
        setPromises(mappedPromises)
      } catch (error) {
        console.error('Error fetching promises:', error)
        setPromises([])
      }
    }

    fetchPromises()
  }, [governingBody])

  // Fetch sources when governing body changes
  useEffect(() => {
    async function fetchSources() {
      // Use mock data if Supabase is not configured
      if (!isSupabaseConfigured() || !supabase) {
        const filteredSources = mockSources.filter((s) => s.governing_body === governingBody)
        setSources(filteredSources)
        return
      }

      try {
        const { data, error } = await supabase
          .from('Sources')
          .select('*')
          .order('source_name')

        if (error) throw error

        // Map the data to match expected format
        const mappedSources = (data || []).map((s: any) => ({
          ...s,
          title: s.source_name, // Map source_name to title
          url: s.source_url, // Map source_url to url
          governing_body: governingBody, // Add governing_body for compatibility
        }))

        setSources(mappedSources)
      } catch (error) {
        console.error('Error fetching sources:', error)
        setSources([])
      }
    }

    fetchSources()
  }, [governingBody])

  // Fetch FAQs (not filtered by governing body)
  useEffect(() => {
    async function fetchFAQs() {
      // Use mock data if Supabase is not configured
      if (!isSupabaseConfigured() || !supabase) {
        setFaqs(mockFAQs)
        setLoading(false)
        return
      }

      try {
        const { data, error } = await supabase
          .from('faqs')
          .select('*')
          .order('id')

        if (error) throw error
        // Use mock FAQs if no data from Supabase
        setFaqs(data && data.length > 0 ? data : mockFAQs)
      } catch (error) {
        console.error('Error fetching FAQs:', error)
        // Fall back to mock FAQs if table doesn't exist
        setFaqs(mockFAQs)
      } finally {
        setLoading(false)
      }
    }

    fetchFAQs()
  }, [])

  // Filter promises based on selected parties
  const filteredPromises = useMemo(() => {
    if (selectedParties.length === 0) return []
    return promises.filter((p) => selectedParties.includes(p.party) || selectedParties.includes(p.party_id || ''))
  }, [promises, selectedParties])

  const handleToggleParty = (partyId: string) => {
    setSelectedParties((prev) => {
      if (prev.includes(partyId)) {
        return prev.filter((id) => id !== partyId)
      } else {
        return [...prev, partyId]
      }
    })
  }

  const handleSelectAll = () => {
    if (selectedParties.length === parties.length) {
      setSelectedParties([])
    } else {
      setSelectedParties(parties.map((p) => p.id))
    }
  }

  return (
    <main className="min-h-screen bg-gray-50/30">
      <div className="max-w-[1150px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-8 sm:py-12 md:py-16">
        <Header />
        {loading ? (
          <div className="text-sm text-gray-500">Loading...</div>
        ) : (
          <>
            <OverviewSection
              parties={parties}
              promises={promises}
              selectedParties={selectedParties}
              governingBody={governingBody}
            />
            <div className="border-t border-gray-200/70 my-6 sm:my-8" />
            <GoverningBodyFilter
              selected={governingBody}
              onSelect={setGoverningBody}
            />
            <PartyFilter
              parties={parties}
              selectedParties={selectedParties}
              onToggleParty={handleToggleParty}
              onSelectAll={handleSelectAll}
            />
            <PartyDescriptions
              parties={parties}
              selectedParties={selectedParties}
              governingBody={governingBody}
            />
            <PromisesSection
              promises={filteredPromises}
              parties={parties}
              selectedParties={selectedParties}
            />
            <SourcesSection sources={sources} />
            <FAQSection faqs={faqs} />
          </>
        )}
      </div>
    </main>
  )
}
