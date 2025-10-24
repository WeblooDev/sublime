// payload/collections/Catalogs.ts
import type { CollectionConfig } from 'payload'
import { slugField } from '@/fields/slug'

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
        {
          name: 'description',
          label: 'Bullets',
          type: 'array',
          labels: { singular: 'Bullet', plural: 'Bullets' },
          fields: [{ name: 'text', type: 'text', required: true }],
        },
      ],
    },

    ...slugField(),
  ],
}
