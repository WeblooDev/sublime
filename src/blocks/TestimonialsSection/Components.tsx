'use client'

import React from 'react'
import { Card } from '@/components/ui/card'
import { Media } from '@/components/Media'
import type { TestimonialsBlock } from '@/payload-types'

export default function TestimonialsSection({ title, testimonials }: TestimonialsBlock) {
  return (
    <section
      className="w-full bg-cover bg-center my-6 py-16"
      style={{ backgroundImage: "url('/testimonial.png')" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl text-white">{title}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials?.map((t, i) => (
            <Card key={i} className="p-6 bg-white text-black rounded-[6px]">
              <div className="flex items-center gap-4 mb-4">
                {t.photo ? (
                  <Media resource={t.photo} imgClassName="w-12 h-12 rounded-full object-cover" />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-muted" />
                )}
                <div>
                  <h3 className="font-semibold text-lg">{t.name}</h3>
                  {t.role && <p className="text-sm ">{t.role}</p>}
                </div>
              </div>

              <p className="text-base text-[#404040]">{t.testimonial}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
