import type { Block } from 'payload'

export const CategoriesCatalogBlock: Block = {
  slug: 'categoriesCatalog',
  labels: { singular: 'Categories & Catalog', plural: 'Categories & Catalog' },
  interfaceName: 'CategoriesCatalogBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: false,
      admin: { description: 'Optional headline above the categories list.' },
    },
  ],
}
