export type GoverningBody = 'PMC' | 'PCMC'

export interface Promise {
  id: string
  promise_text: string
  theme: string
  specificity?: 'High' | 'Medium' | 'Low' // Optional since not in DB
  party: string // Text field, not UUID reference
  party_id?: string // Derived from party name for compatibility
  alliance?: string
  is_independent?: boolean
  source_id?: string
  source_category?: string
  governing_body: GoverningBody
  created_at?: string
}

export interface Party {
  id: string // Derived from party name
  name: string
  allies?: string // From alliance field
  governing_body: GoverningBody
}

export interface Source {
  id: string
  source_name: string // Maps to title
  source_url: string // Maps to url
  source_type?: string
  published_date?: string
  notes?: string
  source_id?: string
  created_at?: string
  // For compatibility
  title?: string // Maps to source_name
  url?: string // Maps to source_url
  governing_body?: GoverningBody // Not in actual table, but needed for filtering
}

export interface FAQ {
  id: string
  question: string
  answer: string
}
