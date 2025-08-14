import React from 'react'
import Image from 'next/image'
import type { ImageTextBlock } from '@/payload-types'

export const ImageText: React.FC<ImageTextBlock> = ({
  backgroundImage,
  title,
  description,
  reverse,
}) => {
  return (
    <section className="container mx-auto my-32">
      <div
        className={` flex items-center h-full gap-16 ${reverse ? 'flex-row-reverse' : 'flex-row'}`}
      >
        <div className="relative w-[50%] h-[420px] rounded-4xl">
          {backgroundImage && typeof backgroundImage !== 'string' && (
            <Image
              src={backgroundImage.url || ''}
              alt={backgroundImage.alt || title || ''}
              fill
              priority
              className="object-cover !rounded-4xl"
            />
          )}
        </div>

        <div className="w-[50%] flex flex-col gap-8">
          <h2 className="text-4xl">{title}</h2>

          <div className="flex flex-col gap-4">
            {Array.isArray(description) ? (
              description.map((desc, i) => (
                <p key={i} className="text-lg ">
                  {desc.paragraph}
                </p>
              ))
            ) : (
              <p className="text-lg ">{description}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
