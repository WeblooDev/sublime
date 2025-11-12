import React from 'react'
import type { SubscribeSectionBlock } from '@/payload-types'

export const SubscribeSection: React.FC<SubscribeSectionBlock> = ({ title, description }) => {
  return (
    <section className="bg-[#F5EC9B] text-black py-20 px-6 flex flex-col gap-8 items-center">
      <div className="container flex flex-col items-center justify-center gap-4">
        <h3 className="text-2xl md:text-4xl text-center">{title}</h3>
        <p className="text-sm md:text-base font-light text-center">{description}</p>

        <div className="flex flex-col md:flex-row items-center gap-4">
          <input
            type="email"
            className="bg-white text-black border border-[#D4D4D4] px-6 py-4 rounded-[6px]"
            placeholder="Enter your email"
          />
          <button className="bg-black text-white px-6 py-4 rounded-[6px]">Subscribe</button>
        </div>
      </div>
    </section>
  )
}
