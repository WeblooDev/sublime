import React from 'react'
import { Media } from '@/components/Media'
import { CustomButton } from '@/components/CustomButton'
import type { ImageSectionBlock } from '@/payload-types'
import Image from 'next/image'

export const ImageSection: React.FC<ImageSectionBlock> = ({
  backgroundImage,

  description,
}) => {
  return (
    <section className="">
      <div className=" mt-[30px] md:mt-[60px] lg:mt-[120px] relative ">
        {/* Background image */}
        <div className=" inset-0 z-0 bg-cover bg-center">
          {backgroundImage && (
            <Media
              fill
              priority
              resource={backgroundImage}
              imgClassName="w-full h-full rounded-4xl "
            />
          )}

          <div className=" relative p-10  flex flex-col items-center gap-8">
            <Image
              src="/sublime.svg"
              alt="Sublime"
              width={100}
              height={100}
              className="!w-auto !h-auto"
            />
            <p className="text-sm md:text-base lg:text-lg  text-white max-w-3xl text-center">
              {description}
            </p>
            <CustomButton label="Visit Website" href="https://sublimemd.com/" />
          </div>
        </div>
      </div>
    </section>
  )
}
