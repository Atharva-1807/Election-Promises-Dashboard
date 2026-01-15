import { Party, Promise, GoverningBody } from '@/types'

interface OverviewSectionProps {
  parties: Party[]
  promises: Promise[]
  selectedParties: string[]
  governingBody: GoverningBody
}

export default function OverviewSection({
  parties,
  promises,
  selectedParties,
  governingBody,
}: OverviewSectionProps) {
  const visibleParties = parties.filter((p) => selectedParties.includes(p.id))
  const visiblePromises = promises.filter((p) => selectedParties.includes(p.party) || selectedParties.includes(p.party_id || ''))

  const promisesByTheme = visiblePromises.reduce((acc, promise) => {
    acc[promise.theme] = (acc[promise.theme] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  return (
    <div className="mb-10 sm:mb-12 md:mb-14 bg-gradient-to-br from-blue-50/60 to-indigo-50/40 rounded-xl p-4 sm:p-5 md:p-6 border border-blue-200/60">
      <h2 className="text-base font-semibold text-gray-950 mb-2 sm:mb-3">
        Overview
      </h2>
      <p className="text-sm text-gray-600 leading-relaxed">
        This dashboard tracks publicly announced election promises made by political parties contesting the 2026 Pune and Pimpri-Chinchwad Municipal Elections, scheduled for January 15, 2026. It presents a fact-based view of what has been promised, with no opinions or rankings.
      </p>
    </div>
  )
}
