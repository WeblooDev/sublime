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
    <section className="container mx-auto my-12 md:my-20 lg:my-32">
      <div
        className={` flex items-center h-full gap-8 lg:gap-16 ${reverse ? ' flex-col lg:flex-row-reverse' : ' flex-col lg:flex-row'}`}
      >
        <div className="relative w-full lg:w-[50%] h-[420px] rounded-4xl">
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

        <div className="w-full lg:w-[50%] flex flex-col gap-4 lg:gap-8">
          <h2 className="text-2xl md:text-4xl">{title}</h2>

          <div className="flex flex-col gap-4">
            {Array.isArray(description) ? (
              description.map((desc, i) => (
                <p key={i} className="text-sm md:text-base lg:text-lg ">
                  {desc.paragraph}
                </p>
              ))
            ) : (
              <p className="text-sm md:text-base lg:text-lg ">{description}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
