import type { Block } from 'payload'

export const FaqSectionBlock: Block = {
  slug: 'faqSectionBlock',
  interfaceName: 'FaqSectionBlock', // will generate types in payload-types
  labels: {
    singular: 'Faq Section',
    plural: 'Faq Sections',
  },
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
      admin: { placeholder: 'FAQ' },
    },
    {
      name: 'subtitle',
      label: 'Subtitle',
      type: 'text',
      admin: { placeholder: 'Find answers to commonly asked questions' },
    },
    {
      name: 'image',
      label: 'Side Image',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'faqs',
      label: 'FAQs',
      type: 'array',
      minRows: 1,
      labels: { singular: 'FAQ', plural: 'FAQs' },
      fields: [
        {
          name: 'question',
          label: 'Question',
          type: 'text',
          required: true,
        },
        {
          name: 'answer',
          label: 'Answer',
          type: 'textarea', // keep simple; switch to richText if you prefer
          required: true,
        },
      ],
    },
  ],
}
