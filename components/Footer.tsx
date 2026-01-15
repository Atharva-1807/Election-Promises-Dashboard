export default function Footer() {
  return (
    <footer className="mt-16 sm:mt-20 md:mt-24 pt-8 sm:pt-10 md:pt-12 border-t border-gray-200/60">
      <div className="space-y-4 sm:space-y-5">
        <div className="text-xs sm:text-sm text-gray-600 leading-relaxed">
          <p>
            This is a public-interest prototype. Data sourced from publicly available manifestos and news reports.{' '}
            <a 
              href="#sources" 
              className="text-gray-700 hover:text-gray-900 underline transition-colors"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('sources')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              View sources
            </a>
            .
          </p>
        </div>
        <div className="text-xs text-gray-500">
          Last updated: January 15, 2026
        </div>
        <div className="text-xs sm:text-sm text-gray-600 leading-relaxed italic">
          <p>
            This dashboard does not endorse or rank parties. It documents publicly stated promises only.
          </p>
        </div>
      </div>
    </footer>
  )
}
