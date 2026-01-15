import { Party } from '@/types'

interface PartyFilterProps {
  parties: Party[]
  selectedParties: string[]
  onToggleParty: (partyId: string) => void
  onSelectAll: () => void
}

export default function PartyFilter({
  parties,
  selectedParties,
  onToggleParty,
  onSelectAll,
}: PartyFilterProps) {
  const allSelected = selectedParties.length === parties.length

  return (
    <div className="mb-10 sm:mb-12 md:mb-14">
      <h2 className="text-base font-semibold text-gray-950 mb-3 sm:mb-4">
        Choose party/alliance
      </h2>
      <div className="bg-gray-100/60 border border-gray-200/60 rounded-xl p-3 sm:p-3.5">
        <div className="flex flex-wrap gap-2 sm:gap-2.5">
          <button
            onClick={onSelectAll}
            className={`flex items-center gap-2 sm:gap-2.5 px-3 sm:px-4 py-2.5 sm:py-2 text-sm font-medium rounded-lg border transition-all duration-200 min-h-[44px] sm:min-h-0 ${
              allSelected
                ? 'bg-gray-950 text-white border-gray-950 shadow-sm hover:bg-gray-900 active:bg-gray-900'
                : 'bg-white text-gray-700 border-gray-200/80 hover:bg-gray-50/80 hover:border-gray-300 active:bg-gray-100'
            }`}
          >
            <div className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 ${
              allSelected
                ? 'border-white bg-white'
                : 'border-gray-300 bg-white'
            }`}>
              {allSelected && (
                <svg className="w-3 h-3 text-gray-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
            <span className="whitespace-nowrap">All Parties</span>
          </button>
          {parties.map((party) => {
            const isSelected = selectedParties.includes(party.id)
            const displayName = party.allies
              ? `${party.name} (${party.allies})`
              : party.name

            return (
              <button
                key={party.id}
                onClick={() => onToggleParty(party.id)}
                className={`flex items-center gap-2 sm:gap-2.5 px-3 sm:px-4 py-2.5 sm:py-2 text-sm font-medium rounded-lg border transition-all duration-200 min-h-[44px] sm:min-h-0 ${
                  isSelected
                    ? 'bg-gray-950 text-white border-gray-950 shadow-sm hover:bg-gray-900 active:bg-gray-900'
                    : 'bg-white text-gray-700 border-gray-200/80 hover:bg-gray-50/80 hover:border-gray-300 active:bg-gray-100'
                }`}
              >
                <div className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                  isSelected
                    ? 'border-white bg-white'
                    : 'border-gray-300 bg-white'
                }`}>
                  {isSelected && (
                    <svg className="w-3 h-3 text-gray-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span className="whitespace-nowrap text-left">{displayName}</span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
