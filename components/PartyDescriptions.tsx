import { GoverningBody, Party } from '@/types'

interface PartyDescriptionsProps {
  parties: Party[]
  selectedParties: string[]
  governingBody: GoverningBody
}

const partyDescriptions: Record<
  GoverningBody,
  Record<string, string>
> = {
  PMC: {
    'BJP':
      'Senior partner in Mahayuti, contesting most seats with smaller allocations to allies; some friendly contests in select wards.',
    'Shiv Sena(Shinde)':
      'Contesting as part of Mahayuti in select wards alongside BJP; friendly contests possible where local candidates are strong.',
    'Indian National Congress':
      'Core opposition presence in PMC, contesting a large number of seats.',
    'Shiv Sena(UBT)':
      'Opposition bloc member with a tactical seat-sharing understanding with MNS to coordinate Marathi-centric votes.',
    'MNS':
      'Contesting selectively, coordinating with Shiv Sena(UBT) in several wards.',
    'Nationalist Congress Party':
      'Part of the local "NCP Reunion" understanding: separate symbols, joint campaigning, and a shared manifesto in several areas.',
    'NCP Alliance':
      'Aligned in the local "NCP Reunion" to consolidate the NCP vote base while retaining separate symbols.',
    'AAP':
      'Contesting independently across almost all wards, focusing on IT corridors (Hinjewadi, Baner, Balewadi) and central peth areas; positioning as an alternative for voters dissatisfied with traditional blocs.',
    'Independent':
      'Includes rebels from major parties and smaller groups.',
  },
  PCMC: {
    'BJP':
      'Contesting nearly all seats as part of Mahayuti; some candidates supported as independents and a few won unopposed.',
    'Nationalist Congress Party':
      'Contesting a large number of seats; aligned with Mahayuti at state level but operating via a local-level understanding.',
    'NCP Alliance':
      'Contesting as part of the NCP alliance, working to consolidate the NCP vote base.',
    'Shiv Sena(Shinde)':
      'Contesting selectively in PCMC; some candidates supported as independents within the Mahayuti context.',
    'Shiv Sena(UBT)':
      'Opposition front presence, focused on Marathi-majority and traditional support areas.',
    'Indian National Congress':
      'Core opposition presence in PCMC, contesting a large number of seats.',
    'MNS':
      'Contesting selectively, coordinating with opposition parties in several wards.',
    'AAP':
      'Contesting independently across nearly all seats, with strong focus on industrial belts (Bhosari, Nigdi, Chikhali); targeting working-class and middle-class voters.',
    'Independent':
      'Includes rebels from major parties and smaller groups such as VBA.',
  },
}

export default function PartyDescriptions({
  parties,
  selectedParties,
  governingBody,
}: PartyDescriptionsProps) {
  const descriptions = selectedParties
    .map((id) => {
      const party = parties.find((p) => p.id === id)
      const description = partyDescriptions[governingBody]?.[id]
      if (!party || !description) return null
      return { name: party.name, id, description }
    })
    .filter(Boolean) as Array<{ name: string; id: string; description: string }>

  if (descriptions.length === 0) return null

  return (
    <div className="mb-8 sm:mb-10">
      <div className="flex flex-col gap-3 sm:gap-4">
        {descriptions.map((item) => (
          <div
            key={item.id}
            className="bg-gradient-to-r from-cyan-50/50 to-blue-50/50 border border-cyan-200/60 rounded-lg px-4 py-3 sm:px-5 sm:py-4 shadow-[0_1px_2px_rgba(0,0,0,0.03)]"
          >
            <div className="text-sm font-semibold text-cyan-800 mb-1">
              {item.name}
            </div>
            <div className="text-sm text-gray-700 leading-relaxed">
              {item.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
