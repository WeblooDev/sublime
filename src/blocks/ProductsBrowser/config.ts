// blocks/ProductsBrowser/config.ts
import type { Block } from 'payload'

export const ProductsBrowserBlock: Block = {
  slug: 'productsBrowser',
  interfaceName: 'ProductsBrowser',
  labels: { singular: 'Products Browser', plural: 'Products Browsers' },
  fields: [
    { name: 'title', type: 'text', required: true, defaultValue: 'All Products' },
    {
      name: 'showCategoryFilter',
      type: 'checkbox',
      defaultValue: true,
      admin: { description: 'Show a category filter dropdown above the products list' },
    },
    {
      name: 'defaultCategory',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: false,
      admin: { description: 'Optional default category to pre-filter the list' },
    },
    {
      name: 'pageSize',
      type: 'number',
      min: 1,
      max: 60,
      defaultValue: 12,
      admin: { description: 'Products per page (API + initial render)' },
    },
  ],
}
