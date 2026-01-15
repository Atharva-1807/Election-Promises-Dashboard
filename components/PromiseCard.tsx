import { Promise } from '@/types'

interface PromiseCardProps {
  promise: Promise
}

export default function PromiseCard({ promise }: PromiseCardProps) {
  return (
    <div className="bg-white border border-gray-200/60 rounded-xl p-4 sm:p-5 md:p-6 hover:border-indigo-300/80 hover:shadow-md hover:shadow-indigo-100/50 transition-all duration-200 group">
      <p className="text-sm sm:text-[15px] text-gray-900 mb-4 sm:mb-5 leading-relaxed">
        {promise.promise_text || 'No promise text available'}
      </p>
      <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
        <span className="px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs font-medium text-indigo-700 bg-indigo-50 rounded-md border border-indigo-200/60">
          {promise.theme}
        </span>
      </div>
    </div>
  )
}
