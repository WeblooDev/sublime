import React, { Fragment } from 'react'
import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { ImageText } from '@/blocks/ImageText/Component'
import { ImageSection } from '@/blocks/ImageSection/Component'
import { HeroSection } from '@/blocks/HeroSection/Component'
import { FourItems } from '@/blocks/FourItems/Component'
import { FaqSection } from '@/blocks/FaqSection/Component'
import TestimonialsSection from './TestimonialsSection/Components'
import { SubscribeSection } from './SubscribeSection/Component'
import CategoriesCatalogBlock from './CategoriesCatalog/Component'
import { CatalogSection } from './CatalogSection/Component'
import { BestSellerProducts } from './BestSellerProducts/Component'
import { InfoMapSection } from './InfoMapSection/Component'
import { DisclaimerSection } from './DisclaimerSection/Component'
import { BannerSection } from './BannerSection/Component'

const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  imageTextBlock: ImageText,
  imageSectionBlock: ImageSection,
  heroSectionBlock: HeroSection,
  fourItemsBlock: FourItems,
  faqSectionBlock: FaqSection,
  testimonialsBlock: TestimonialsSection,
  subscribeSectionBlock: SubscribeSection,
  categoriesCatalog: CategoriesCatalogBlock,
  catalogSectionBlock: CatalogSection,
  bestSellerProductsBlock: BestSellerProducts,
  infoMapSectionBlock: InfoMapSection,
  disclaimerSectionBlock: DisclaimerSection,
  bannerSectionBlock: BannerSection,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = ({ blocks }) => {
  const hasBlocks = Array.isArray(blocks) && blocks.length > 0

  if (!hasBlocks) return null

  return (
    <Fragment>
      {blocks.map((block, index) => {
        const { blockType } = block
        if (blockType && blockType in blockComponents) {
          const Block = (blockComponents as Record<string, any>)[blockType as string]
          if (Block) {
            return (
              <div key={index}>
                <Block {...block} disableInnerContainer />
              </div>
            )
          }
        }
        return null
      })}
    </Fragment>
  )
}

export default RenderBlocks
