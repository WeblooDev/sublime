'use client'

import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { Media } from '@/components/Media'
import type { FaqSectionBlock } from '@/payload-types'

export const FaqSection: React.FC<FaqSectionBlock> = ({ title, subtitle, image, faqs }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-12 items-stretch h-full">
        {/* Left side - Image (from Payload media) */}
        <div className="relative h-full min-h-[320px]">
          {image ? (
            <Media
              resource={image}
              // No fill -> no absolute positioning
              imgClassName="w-full h-full object-cover rounded-lg shadow-lg"
            />
          ) : (
            <div className="w-full h-full min-h-[320px] rounded-lg bg-muted/30" />
          )}
        </div>

        <div className="flex flex-col gap-8 justify-center">
          <div>
            <h2 className="text-4xl  mb-2">{title}</h2>
          </div>

          <div className="flex flex-col gap-8">
            {faqs?.map((faq, index) => (
              <div
                key={index}
                className="overflow-hidden transition-all duration-300 py-4 border-b border-[#E5E5E5]"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="cursor-pointer">
                  <div className="flex items-center justify-between ">
                    <p className="text-base font-roboto-bold ">{faq.question}</p>
                    <ChevronDown
                      className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${
                        hoveredIndex === index ? 'rotate-180' : ''
                      }`}
                    />
                  </div>

                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      hoveredIndex === index ? 'max-h-40 opacity-100 mt-4' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className="text-base ">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}

            {/* Optional: empty state */}
            {!faqs?.length && (
              <p className="text-sm text-muted-foreground">No FAQs yet. Add items in the CMS.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
