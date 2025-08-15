import React from 'react'
import { Media } from '@/components/Media'
import type { FourItemsBlock } from '@/payload-types'

export const FourItems: React.FC<FourItemsBlock> = ({ items }) => {
  return (
    <section
      className="w-full bg-cover bg-center my-6"
      style={{ backgroundImage: "url('/section.png')" }}
    >
      <div className="container mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4 p-8">
        {items?.map((item, index) => (
          <div key={index} className="flex flex-col gap-4 items-center justify-between">
            {item.backgroundImage && (
              <Media resource={item.backgroundImage} imgClassName="h-auto w-auto" />
            )}
            <h3 className="text-base lg:text-xl text-white  text-center">{item.description}</h3>
          </div>
        ))}
      </div>
    </section>
  )
}
