// src/blocks/InfoMapSection/config.ts
import type { Block } from 'payload'

export const DisclaimerSectionBlock: Block = {
  slug: 'disclaimerSectionBlock',
  interfaceName: 'DisclaimerSectionBlock',
  labels: { singular: 'Disclaimer Section', plural: 'Disclaimer Sections' },
  fields: [
    { name: 'title', type: 'text', required: false, admin: { placeholder: 'Main title' } },
    { name: 'subtitle', type: 'text', required: false, admin: { placeholder: 'Subtitle' } },
    {
      name: 'description',
      type: 'textarea',
      required: false,
      admin: { placeholder: 'A short description for this section' },
    },
    {
      name: 'subtitle1',
      type: 'text',
      required: false,
      admin: { placeholder: 'Subtitle' },
    },
    {
      name: 'subtitle2',
      type: 'text',
      required: false,
      admin: { placeholder: 'Subtitle' },
    },
    {
      name: 'smallText',
      label: 'Small Text',
      type: 'text',
      required: false,
      admin: { placeholder: 'Tiny caption / helper text' },
    },
  ],
}
