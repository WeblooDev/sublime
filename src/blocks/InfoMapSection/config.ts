// src/blocks/InfoMapSection/config.ts
import type { Block } from 'payload'

export const InfoMapSectionBlock: Block = {
  slug: 'infoMapSectionBlock',
  interfaceName: 'InfoMapSectionBlock',
  labels: { singular: 'Info + Map Section', plural: 'Info + Map Sections' },
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
      name: 'smallText',
      label: 'Small Text',
      type: 'text',
      required: false,
      admin: { placeholder: 'Tiny caption / helper text' },
    },
    {
      name: 'maps',
      label: 'Map Groups',
      type: 'array',
      labels: { singular: 'Map Group', plural: 'Map Groups' },
      required: true,
      fields: [
        { name: 'mapTitle', label: 'Group Title', type: 'text', required: true },
        {
          name: 'items',
          label: 'Items',
          type: 'array',
          labels: { singular: 'Item', plural: 'Items' },
          minRows: 1,
          fields: [{ name: 'text', label: 'Text', type: 'text', required: true }],
        },
      ],
    },
  ],
}
