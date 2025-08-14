// Define the Block structure properly, explicitly typing the fields
import { Block } from 'payload'

export const BannerSectionBlock: Block = {
  slug: 'bannerSectionBlock',
  interfaceName: 'BannerSectionBlock',
  labels: {
    singular: 'Banner Section',
    plural: 'Banner Sections',
  },
  fields: [
    {
      name: 'backgroundImage',
      label: 'Background Image',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}
