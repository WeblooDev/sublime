import React from 'react'
import { Media } from '@/components/Media'
import { CustomButton } from '@/components/CustomButton'
import type { HeroSectionBlock } from '@/payload-types'
import Image from 'next/image'

export const HeroSection: React.FC<HeroSectionBlock> = ({
  backgroundImage,
  title,
  title2,
  description,
}) => {
  return (
    <section className="h-[100vh]">
      <div className="h-full relative ">
        {/* Background image */}
        <div className="h-full inset-0 z-0 bg-cover bg-center">
          {backgroundImage && (
            <Media fill priority resource={backgroundImage} imgClassName="w-full h-full  " />
          )}

          <div className="h-full w-[60%] relative p-20  flex flex-col items-start gap-8 justify-end ">
            <div>
              <h1 className="text-4xl md:text-6xl text-white ">{title}</h1>
              <h1 className="text-4xl md:text-6xl text-white ">{title2}</h1>
            </div>

            <p className="text-lg md:text-xl font-light text-white w-[60%] text-start">
              {description}
            </p>
            <CustomButton label="Explore Peptides" href="/produits" />
          </div>
        </div>
      </div>
    </section>
  )
}
