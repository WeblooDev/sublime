import type { Block } from 'payload'

export const CategoriesCatalogBlock: Block = {
  slug: 'categoriesCatalog',
  interfaceName: 'CategoriesCatalogBlock',
  labels: {
    singular: 'Categories & Catalog',
    plural: 'Categories & Catalog',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: false,
      admin: {
        description: 'Optional headline above the categories list.',
      },
    },
  ],
}

export default CategoriesCatalogBlock
