import type { CollectionConfig } from 'payload'
import { slugField } from '@/fields/slug'

export const Products: CollectionConfig = {
  slug: 'products',
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'category', 'tag', 'updatedAt'] },
  access: { read: () => true },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'subtitle', type: 'text' },
    { name: 'description', type: 'textarea' },
    { name: 'tag', type: 'text' },
    { name: 'mainImage', type: 'upload', relationTo: 'media', required: true },
    { name: 'bestSeller', type: 'checkbox', defaultValue: false },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
      required: true,
    },
    ...slugField(),
  ],
}
