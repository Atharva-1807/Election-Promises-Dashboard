# Election Promises Dashboard

This is a read-only dashboard that allows users to view and filter
municipal election promises made by political parties.

## Purpose

The website helps citizens clearly understand who promised what during municipal elections, without bias or commentary. The experience prioritises clarity, neutrality, and trust.

## Key Constraints

- Read-only (no editing from UI)
- Neutral, factual presentation
- No scoring, ranking, or opinions
- Filters: city (PMC / PCMC), party
- Data comes from Supabase (public read access)

## UI Principles

- Clean, minimal, text-first
- Calm interface (inspired by Claude)
- Card-based layout for promises
- Generous spacing and clear typography
- Informational, not opinionated

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Supabase (read-only)
- Deployed on Vercel

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- A Supabase account and project

### Installation

1. Clone the repository and install dependencies:

```bash
npm install
```

2. Set up your Supabase project:

   - Create a new project in [Supabase](https://supabase.com)
   - Run the SQL schema from `database-schema.sql` in your Supabase SQL Editor
   - Get your project URL and anon key from Settings > API

3. Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
.
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Main dashboard page
│   └── globals.css         # Global styles
├── components/
│   ├── Header.tsx          # Dashboard header
│   ├── GoverningBodyFilter.tsx  # PMC/PCMC toggle
│   ├── PartyFilter.tsx    # Party selection
│   ├── OverviewSection.tsx # Overview statistics
│   ├── PromisesSection.tsx # Promises display
│   ├── PromiseCard.tsx    # Individual promise card
│   ├── SourcesSection.tsx # Sources listing
│   └── FAQSection.tsx     # Expandable FAQs
├── lib/
│   └── supabase.ts        # Supabase client
├── types/
│   └── index.ts           # TypeScript types
└── database-schema.sql    # Database schema
```

## Features

- **Governing Body Filter**: Toggle between PMC and PCMC to view promises for different municipal corporations
- **Party Filter**: Select one or more parties to view their promises
- **Promise Cards**: Each promise displayed with theme and specificity level
- **Overview Section**: Summary statistics of selected parties and promises
- **Sources**: Links to official manifestos and credible news articles
- **FAQs**: Expandable sections explaining data sources and dashboard purpose

## Database Schema

The dashboard expects the following tables in Supabase:

- `parties`: Political parties and their allies
- `promises`: Individual election promises
- `sources`: Source links for promises
- `faqs`: Frequently asked questions

See `database-schema.sql` for the complete schema with Row Level Security policies.

## Deployment

### Vercel

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add your environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy

The dashboard will be automatically deployed on every push to your main branch.

## Contributing

This is a neutral, factual dashboard. Contributions should maintain the principle of neutrality and avoid any form of political commentary or bias.
