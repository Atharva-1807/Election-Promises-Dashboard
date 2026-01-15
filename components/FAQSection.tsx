'use client'

import { useState } from 'react'
import { FAQ } from '@/types'

interface FAQSectionProps {
  faqs: FAQ[]
}

export default function FAQSection({ faqs }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  if (faqs.length === 0) {
    return null
  }

  return (
    <div className="mb-12 sm:mb-14 md:mb-16 border-t border-gray-200/60 pt-8 sm:pt-10 md:pt-12">
      <h2 className="text-lg sm:text-xl font-semibold text-gray-950 mb-5 sm:mb-6 md:mb-7">Frequently Asked Questions</h2>
      <div className="space-y-2 sm:space-y-2.5">
        {faqs.map((faq, index) => (
          <div key={faq.id} className="bg-white border border-violet-200/60 rounded-xl overflow-hidden hover:border-violet-300/80 hover:shadow-md hover:shadow-violet-100/50 transition-all duration-200">
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full px-4 sm:px-5 py-3.5 sm:py-4 text-left flex justify-between items-start hover:bg-violet-50/50 transition-colors group min-h-[60px] sm:min-h-0"
            >
              <span className="font-medium text-violet-900 text-sm pr-3 sm:pr-4 leading-relaxed flex-1 text-left">{faq.question}</span>
              <span className="text-violet-400 group-hover:text-violet-600 flex-shrink-0 mt-0.5">
                {openIndex === index ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                )}
              </span>
            </button>
            {openIndex === index && (
              <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-0 text-gray-600 text-sm leading-relaxed">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
