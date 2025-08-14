import type { Block } from 'payload'

export const TestimonialsBlock: Block = {
  slug: 'testimonialsBlock',
  interfaceName: 'TestimonialsBlock',
  labels: {
    singular: 'Testimonials',
    plural: 'Testimonials',
  },
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
      defaultValue: 'What Our Clients Say',
    },
    {
      name: 'subtitle',
      label: 'Subtitle',
      type: 'text',
    },
    {
      name: 'testimonials',
      label: 'Testimonials',
      type: 'array',
      minRows: 1,
      labels: { singular: 'Testimonial', plural: 'Testimonials' },
      fields: [
        {
          name: 'name',
          label: 'Name',
          type: 'text',
          required: true,
        },
        {
          name: 'role',
          label: 'Role/Title',
          type: 'text',
        },
        {
          name: 'photo',
          label: 'Photo',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'testimonial',
          label: 'Testimonial',
          type: 'textarea',
          required: true,
        },
      ],
    },
  ],
}
