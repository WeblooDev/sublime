import type { CollectionConfig } from 'payload'
import { slugField } from '@/fields/slug'

export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'slug', 'updatedAt'] },
  access: { read: () => true },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'image', type: 'upload', relationTo: 'media', required: true },
    {
      name: 'catalog',
      type: 'relationship',
      relationTo: 'catalogs',
      required: true,
      hasMany: false,
    },
    ...slugField(),
  ],
}
