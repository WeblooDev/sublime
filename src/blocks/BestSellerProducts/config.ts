import type { Block } from 'payload'

export const BestSellerProductsBlock: Block = {
  slug: 'bestSellerProductsBlock',
  interfaceName: 'BestSellerProductsBlock', // <-- so it appears in @/payload-types
  labels: { singular: 'Best Seller Products', plural: 'Best Seller Products' },
  fields: [
    { name: 'title', type: 'text', defaultValue: 'Best Sellers' },
    {
      name: 'limit',
      type: 'number',
      defaultValue: 6,
      admin: { step: 1, description: 'How many products to show' },
    },
    {
      name: 'layout',
      type: 'select',
      defaultValue: 'grid',
      options: [
        { label: 'Grid', value: 'grid' },
        { label: 'Alternating Rows', value: 'rows' },
      ],
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      required: false,
      admin: { description: 'Optional: restrict to one category' },
    },

    // 👇 CTA fields for the bottom button
    {
      name: 'cta',
      label: 'Bottom Button',
      type: 'group',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: false,
          admin: { placeholder: 'Shop all best sellers' },
        },
        { name: 'href', type: 'text', required: false, admin: { placeholder: '/shop' } },
        {
          name: 'newTab',
          type: 'checkbox',
          label: 'Open in new tab',
          defaultValue: false,
        },
        {
          name: 'align',
          type: 'select',
          defaultValue: 'center',
          options: [
            { label: 'Left', value: 'left' },
            { label: 'Center', value: 'center' },
            { label: 'Right', value: 'right' },
          ],
        },
      ],
    },
  ],
}
