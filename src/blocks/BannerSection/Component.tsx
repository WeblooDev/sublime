import React from 'react'
import { Media } from '@/components/Media'
import { CustomButton } from '@/components/CustomButton'
import type { BannerSectionBlock } from '@/payload-types'

export const BannerSection: React.FC<BannerSectionBlock> = ({ backgroundImage, title }) => {
  return (
    <div>
      <div className="mt-[100px]">
        <Media resource={backgroundImage} imgClassName="w-full h-full " />
      </div>

      <div className="flex flex-col gap-4 justify-center items-center py-8">
        <h1 className="text-2xl md:text-3xl lg:text-4xl text-center">{title}</h1>
      </div>
    </div>
  )
}
