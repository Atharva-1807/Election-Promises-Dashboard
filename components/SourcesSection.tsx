import { Source } from '@/types'

interface SourcesSectionProps {
  sources: Source[]
}

export default function SourcesSection({ sources }: SourcesSectionProps) {
  if (sources.length === 0) {
    return null
  }

  return (
    <div id="sources" className="mb-12 sm:mb-14 md:mb-16 border-t border-gray-200/60 pt-8 sm:pt-10 md:pt-12">
      <h2 className="text-lg sm:text-xl font-semibold text-gray-950 mb-2">Sources</h2>
      <p className="text-sm text-gray-600 mb-5 sm:mb-6 md:mb-7">
        All promises are sourced from official manifestos and credible news reports.
      </p>
      <div className="space-y-2 sm:space-y-2.5">
        {sources.map((source) => (
          <a
            key={source.id}
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between group bg-white border border-teal-200/60 rounded-xl px-4 sm:px-5 py-3.5 sm:py-4 hover:border-teal-300/80 hover:shadow-md hover:shadow-teal-100/50 transition-all duration-200 min-h-[60px] sm:min-h-0"
          >
            <div className="flex-1 min-w-0 pr-3">
              <div className="text-sm font-medium text-teal-900 group-hover:text-teal-950 break-words">
                {source.title}
              </div>
              <div className="text-xs text-teal-600 mt-1">
                {source.governing_body}
              </div>
            </div>
            <svg
              className="w-4 h-4 text-teal-400 group-hover:text-teal-600 transition-colors flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        ))}
      </div>
    </div>
  )
}
