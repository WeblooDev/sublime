import type { Block } from 'payload'

export const ImageTextBlock: Block = {
  slug: 'imageTextBlock',
  interfaceName: 'ImageTextBlock',
  labels: {
    singular: 'Image Text',
    plural: 'Image Texts',
  },
  fields: [
    {
      name: 'backgroundImage',
      label: 'Background Image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'title',
      label: 'Section Title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      label: 'Section Description',
      type: 'array', // multiple paragraphs support
      fields: [
        {
          name: 'paragraph',
          label: 'Paragraph',
          type: 'text',
        },
      ],
    },
    {
      name: 'reverse',
      label: 'Reverse Layout',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
}
