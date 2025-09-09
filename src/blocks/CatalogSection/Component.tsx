import React from 'react'
import { Media } from '@/components/Media'
import { CustomButton } from '@/components/CustomButton'
import type { CatalogSectionBlock } from '@/payload-types'
import Image from 'next/image'

export const CatalogSection: React.FC<CatalogSectionBlock> = ({
  backgroundImage,
  title,
  description,
}) => {
  return (
    <div>
      {/* Background image */}
      <div className="">
        <Media
          resource={backgroundImage}
          imgClassName="w-full h-full min-h-[200px] object-cover max-h-[500px] "
        />

        <div className="container mx-auto flex flex-col md:flex-row justify-between gap-4 items-start py-10">
          <h1 className="text-2xl md:text-4xl w-full md:w-[40%] ">{title}</h1>

          <p className="text-sm md:text-base w-full md:w-[40%] font-light ">{description}</p>
        </div>
      </div>
    </div>
  )
}
