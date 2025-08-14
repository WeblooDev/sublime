// src/globals/CatalogAll.ts
import type { GlobalConfig } from 'payload'

// use CONFIGS (not components)
import { SubscribeSectionBlock } from '@/blocks/SubscribeSection/config'
import { CatalogSectionBlock } from '@/blocks/CatalogSection/config'
import { BestSellerProductsBlock } from '@/blocks/BestSellerProducts/config'

export const CatalogAll: GlobalConfig = {
  slug: 'catalogAll',
  label: 'Catalog: All',
  access: { read: () => true },
  fields: [
    {
      name: 'content',
      label: 'Content',
      type: 'group',
      fields: [
        {
          name: 'topLayout',
          label: 'Top Blocks',
          type: 'blocks',
          blocks: [CatalogSectionBlock, BestSellerProductsBlock, SubscribeSectionBlock],
          admin: { initCollapsed: true },
        },
        {
          name: 'bottomLayout',
          label: 'Bottom Blocks',
          type: 'blocks',
          blocks: [SubscribeSectionBlock, BestSellerProductsBlock, CatalogSectionBlock],
          admin: { initCollapsed: true },
        },
      ],
    },
  ],
}
