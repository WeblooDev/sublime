import { Block } from 'payload'

export const FourItemsBlock: Block = {
  slug: 'fourItemsBlock',
  interfaceName: 'FourItemsBlock',
  labels: {
    singular: 'Four Items',
    plural: 'Four Items',
  },
  fields: [
    {
      name: 'items',
      label: 'Items',
      type: 'array',
      minRows: 1,
      maxRows: 4, // since you want four
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
      ],
    },
  ],
}
