// Define the Block structure properly, explicitly typing the fields
import { Block } from 'payload'

export const ImageSectionBlock: Block = {
  slug: 'imageSectionBlock',
  interfaceName: 'ImageSectionBlock',
  labels: {
    singular: 'Image Section',
    plural: 'Image Sections',
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
      name: 'buttonText',
      label: 'Button Text',
      type: 'text',
      defaultValue: 'Get Started',
    },
    {
      name: 'linkText',
      label: 'Link Text',
      type: 'text',
      defaultValue: 'Learn More',
    },
  ],
}
