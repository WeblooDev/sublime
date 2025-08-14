// Define the Block structure properly, explicitly typing the fields
import { Block } from 'payload'

export const CatalogSectionBlock: Block = {
  slug: 'catalogSectionBlock',
  interfaceName: 'CatalogSectionBlock',
  labels: {
    singular: 'Catalog Section',
    plural: 'Catalog Sections',
  },
  fields: [
    {
      name: 'backgroundImage',
      label: 'Background Image',
      type: 'upload',
      relationTo: 'media',
    },

    {
      name: 'description',
      label: 'Section Description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'title',
      label: 'Section Title',
      type: 'text',
      required: true,
    },
  ],
}
