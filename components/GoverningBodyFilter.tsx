import { GoverningBody } from '@/types'

interface GoverningBodyFilterProps {
  selected: GoverningBody
  onSelect: (body: GoverningBody) => void
}

export default function GoverningBodyFilter({
  selected,
  onSelect,
}: GoverningBodyFilterProps) {
  return (
    <div className="mb-8 sm:mb-10 md:mb-12">
      <label className="block text-sm font-medium text-gray-700 mb-3 sm:mb-3.5">
        Select Governing Body
      </label>
      <div className="flex gap-2 sm:gap-2.5">
        <button
          onClick={() => onSelect('PMC')}
          className={`flex-1 sm:flex-none px-5 sm:px-6 py-3 sm:py-2.5 text-sm font-medium rounded-lg transition-all duration-200 min-h-[44px] sm:min-h-0 ${
            selected === 'PMC'
              ? 'bg-blue-600 text-white shadow-sm hover:bg-blue-700 active:bg-blue-700'
              : 'bg-white text-gray-700 border border-gray-200/80 hover:bg-blue-50/80 hover:border-blue-200 active:bg-blue-50'
          }`}
        >
          PMC
        </button>
        <button
          onClick={() => onSelect('PCMC')}
          className={`flex-1 sm:flex-none px-5 sm:px-6 py-3 sm:py-2.5 text-sm font-medium rounded-lg transition-all duration-200 min-h-[44px] sm:min-h-0 ${
            selected === 'PCMC'
              ? 'bg-blue-600 text-white shadow-sm hover:bg-blue-700 active:bg-blue-700'
              : 'bg-white text-gray-700 border border-gray-200/80 hover:bg-blue-50/80 hover:border-blue-200 active:bg-blue-50'
          }`}
        >
          PCMC
        </button>
      </div>
    </div>
  )
}
