import { Promise, Party } from '@/types'
import PromiseCard from './PromiseCard'

interface PromisesSectionProps {
  promises: Promise[]
  parties: Party[]
  selectedParties: string[]
}

export default function PromisesSection({
  promises,
  parties,
  selectedParties,
}: PromisesSectionProps) {
  // Show empty state when no parties are selected
  if (selectedParties.length === 0) {
    return (
      <div className="mb-12 sm:mb-14 md:mb-16">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-950 mb-6">Promises</h2>
        <div className="py-12 sm:py-16">
          <p className="text-sm sm:text-base text-gray-500 text-center">
            Select a party to view promises.
          </p>
        </div>
      </div>
    )
  }

  // Group promises by party and include parties with no promises
  const promisesByParty = selectedParties.reduce((acc, partyId) => {
    const party = parties.find((p) => p.id === partyId)
    if (party) {
      // Filter by party name (since party_id maps to party name)
      const partyPromises = promises.filter((p) => p.party === partyId || p.party_id === partyId)
      acc.push({
        party,
        promises: partyPromises,
      })
    }
    return acc
  }, [] as Array<{ party: Party; promises: Promise[] }>)

  return (
    <div className="mb-12 sm:mb-14 md:mb-16">
      <h2 className="text-lg sm:text-xl font-semibold text-gray-950 mb-6">Promises</h2>
      {promisesByParty.map(({ party, promises: partyPromises }) => {
        const displayName = party.allies
          ? `${party.name} (${party.allies})`
          : party.name

        return (
          <div key={party.id} className="mb-10 sm:mb-12 md:mb-14">
            <div className="mb-3 sm:mb-4 md:mb-5">
              <div className="text-lg sm:text-xl font-semibold text-indigo-700 leading-tight">
                {displayName}
              </div>
              <div className="text-sm text-gray-600 mt-1">
                {party.governing_body === 'PMC'
                  ? 'Pune Municipal Corporation'
                  : 'Pimpri-Chinchwad Municipal Corporation'}
              </div>
            </div>
            {partyPromises.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {partyPromises.map((promise) => (
                  <PromiseCard key={promise.id} promise={promise} />
                ))}
              </div>
            ) : (
              <div className="py-8 sm:py-10">
                <p className="text-sm sm:text-base text-gray-500 text-center">
                  No promises found, data being updated.
                </p>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
