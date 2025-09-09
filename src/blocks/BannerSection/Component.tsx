import React from 'react'
import { Media } from '@/components/Media'
import { CustomButton } from '@/components/CustomButton'
import type { BannerSectionBlock } from '@/payload-types'
import Image from 'next/image'

export const BannerSection: React.FC<BannerSectionBlock> = ({ backgroundImage }) => {
  return (
    <div>
      {/* Background image */}
      <div className="mt-[100px]">
        <Media
          resource={backgroundImage}
          imgClassName="w-full h-full "
        />
      </div>
    </div>
  )
}
