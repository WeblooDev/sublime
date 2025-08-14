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
        <Media resource={backgroundImage} imgClassName="w-full h-full  " />

        <div className="container mx-auto flex justify-between gap-4 items-start py-10">
          <h1 className="text-lg md:text-3xl w-[50%] ">{title}</h1>

          <p className="text-sm md:text-base w-[30%] font-light ">{description}</p>
        </div>
      </div>
    </div>
  )
}
