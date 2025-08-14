// payload/collections/Catalogs.ts
import type { CollectionConfig } from 'payload'
import { slugField } from '@/fields/slug'
import { SubscribeSectionBlock } from '@/blocks/SubscribeSection/config'
import { CatalogSectionBlock } from '@/blocks/CatalogSection/config'

export const Catalogs: CollectionConfig = {
  slug: 'catalogs',
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'slug', 'updatedAt'] },
  access: { read: () => true },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'image', type: 'upload', relationTo: 'media', required: true },
    {
      name: 'list',
      type: 'array',
      labels: { singular: 'Item', plural: 'Items' },
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true },
      ],
    },

    // 👇 add two zones
    {
      name: 'content',
      label: 'Content',
      type: 'group',
      fields: [
        {
          name: 'topLayout',
          label: 'Top Blocks',
          type: 'blocks',
          blocks: [CatalogSectionBlock /*, ...other blocks */],
          admin: { initCollapsed: true },
        },
        {
          name: 'bottomLayout',
          label: 'Bottom Blocks',
          type: 'blocks',
          blocks: [SubscribeSectionBlock /*, ...other blocks */],
          admin: { initCollapsed: true },
        },
      ],
    },

    ...slugField(),
  ],
}
