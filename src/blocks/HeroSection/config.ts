// Define the Block structure properly, explicitly typing the fields
import { Block } from 'payload'

export const HeroSectionBlock: Block = {
  slug: 'heroSectionBlock',
  interfaceName: 'HeroSectionBlock',
  labels: {
    singular: 'Hero Section',
    plural: 'Hero Sections',
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
    {
      name: 'title2',
      label: 'Section Title 2',
      type: 'text',
      required: true,
    },
  ],
}
