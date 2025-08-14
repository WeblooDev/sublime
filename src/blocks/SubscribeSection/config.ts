import { Block } from 'payload'

export const SubscribeSectionBlock: Block = {
  slug: 'subscribeSectionBlock',
  interfaceName: 'SubscribeSectionBlock',
  labels: {
    singular: 'Subscribe Section',
    plural: 'Subscribe Sections',
  },

  fields: [
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
