// // src/endpoints/seed/index.ts
// import type { CollectionSlug, GlobalSlug, Payload, PayloadRequest, File } from 'payload'

// import { contactForm as contactFormData } from './contact-form'
// import { contact as contactPageData } from './contact-page'
// import { home } from './home'
// import { image1 } from './image-1'
// import { image2 } from './image-2'
// import { imageHero1 } from './image-hero-1'
// import { image3 } from './image-3' // <-- make sure this exists, or swap to an existing one
// import { post1 } from './post-1'
// import { post2 } from './post-2'
// import { post3 } from './post-3'

// const collections: CollectionSlug[] = [
//   'categories',
//   'media',
//   'pages',
//   'posts',
//   'forms',
//   'form-submissions',
//   'search',
// ]

// const globals: GlobalSlug[] = ['header', 'footer'] // (not strictly used; kept for clarity)

// /**
//  * Seeding helper to fetch a remote file and return a Payload-compatible File
//  */
// async function fetchFileByURL(url: string): Promise<File> {
//   const res = await fetch(url, { credentials: 'include', method: 'GET' })
//   if (!res.ok) throw new Error(`Failed to fetch file from ${url}, status: ${res.status}`)
//   const data = await res.arrayBuffer()
//   const name = url.split('/').pop() || `file-${Date.now()}`
//   const ext = name.split('.').pop() || 'webp'
//   return {
//     name,
//     data: Buffer.from(data),
//     mimetype: `image/${ext}`,
//     size: data.byteLength,
//   }
// }

// export const seed = async ({
//   payload,
//   req,
// }: {
//   payload: Payload
//   req: PayloadRequest
// }): Promise<void> => {
//   payload.logger.info('Seeding database...')

//   // Clear/prime globals before collection work
//   payload.logger.info(`— Clearing collections and globals...`)

//   // Clear header nav in a typed-safe way (fixes "navItems not in base type" TS error)
//   await Promise.all([
//     payload.updateGlobal<'header', true>({
//       slug: 'header',
//       data: { navItems: [] },
//       depth: 0,
//       context: { disableRevalidate: true },
//     }),
//   ])
  

//   // Delete documents from collections that actually exist in the runtime
//   await Promise.all(
//     collections
//       .filter((collection) => Boolean(payload.collections[collection]))
//       .map((collection) => payload.db.deleteMany({ collection, req, where: {} })),
//   )

//   // Delete versions only for versioned collections that actually exist
//   await Promise.all(
//     collections
//       .filter((collection) => Boolean(payload.collections[collection]?.config.versions))
//       .map((collection) => payload.db.deleteVersions({ collection, req, where: {} })),
//   )

//   payload.logger.info(`— Seeding demo author and user...`)

//   // Ensure we don't duplicate the demo author if the endpoint is re-run
//   await payload.delete({
//     collection: 'users',
//     depth: 0,
//     where: { email: { equals: 'demo-author@example.com' } },
//   })

//   const demoAuthor = await payload.create({
//     collection: 'users',
//     data: {
//       name: 'Demo Author',
//       email: 'demo-author@example.com',
//       password: 'password',
//     },
//   })

//   payload.logger.info(`— Seeding media...`)

//   // Fetch remote images
//   const [image1Buffer, image2Buffer, image3Buffer, hero1Buffer] = await Promise.all([
//     fetchFileByURL(
//       'https://raw.githubusercontent.com/payloadcms/payload/refs/heads/main/templates/website/src/endpoints/seed/image-post1.webp',
//     ),
//     fetchFileByURL(
//       'https://raw.githubusercontent.com/payloadcms/payload/refs/heads/main/templates/website/src/endpoints/seed/image-post2.webp',
//     ),
//     fetchFileByURL(
//       'https://raw.githubusercontent.com/payloadcms/payload/refs/heads/main/templates/website/src/endpoints/seed/image-post3.webp',
//     ),
//     fetchFileByURL(
//       'https://raw.githubusercontent.com/payloadcms/payload/refs/heads/main/templates/website/src/endpoints/seed/image-hero1.webp',
//     ),
//   ])

//   // Create media docs (note the corrected data object for the 3rd image)
//   const [image1Doc, image2Doc, image3Doc, imageHomeDoc] = await Promise.all([
//     payload.create({ collection: 'media', data: image1, file: image1Buffer }),
//     payload.create({ collection: 'media', data: image2, file: image2Buffer }),
//     payload.create({ collection: 'media', data: image3, file: image3Buffer }), // <-- fixed (was image2 before)
//     payload.create({ collection: 'media', data: imageHero1, file: hero1Buffer }),
//   ])

//   payload.logger.info(`— Seeding categories...`)

//   // Your Category type requires `image` and `catalog`.
//   // TEMP unblocker: use a minimal catalog object and cast to any during seeding.
//   const makeCategory = (title: string, slug: string, imageId: string) =>
//     ({
//       title,
//       breadcrumbs: [{ label: title, url: `/${slug}` }],
//       image: imageId, // relation to media
//       catalog: {} as any, // TODO: replace with your real Catalog shape when finalized
//     } as any)

//   const [
//     techCat,
//     newsCat,
//     financeCat,
//     designCat,
//     softwareCat,
//     engineeringCat,
//   ] = await Promise.all([
//     payload.create({ collection: 'categories', data: makeCategory('Technology', 'technology', image1Doc.id) }),
//     payload.create({ collection: 'categories', data: makeCategory('News', 'news', image2Doc.id) }),
//     payload.create({ collection: 'categories', data: makeCategory('Finance', 'finance', image3Doc.id) }),
//     payload.create({ collection: 'categories', data: makeCategory('Design', 'design', image1Doc.id) }),
//     payload.create({ collection: 'categories', data: makeCategory('Software', 'software', image2Doc.id) }),
//     payload.create({ collection: 'categories', data: makeCategory('Engineering', 'engineering', image3Doc.id) }),
//   ])

//   payload.logger.info(`— Seeding posts...`)

//   // Create posts in order to preserve createdAt sorting expectations
//   const post1Doc = await payload.create({
//     collection: 'posts',
//     depth: 0,
//     context: { disableRevalidate: true },
//     data: post1({ heroImage: image1Doc, blockImage: image2Doc, author: demoAuthor }),
//   })

//   const post2Doc = await payload.create({
//     collection: 'posts',
//     depth: 0,
//     context: { disableRevalidate: true },
//     data: post2({ heroImage: image2Doc, blockImage: image3Doc, author: demoAuthor }),
//   })

//   const post3Doc = await payload.create({
//     collection: 'posts',
//     depth: 0,
//     context: { disableRevalidate: true },
//     data: post3({ heroImage: image3Doc, blockImage: image1Doc, author: demoAuthor }),
//   })

//   // Link related posts
//   await payload.update({
//     id: post1Doc.id,
//     collection: 'posts',
//     data: { relatedPosts: [post2Doc.id, post3Doc.id] },
//   })
//   await payload.update({
//     id: post2Doc.id,
//     collection: 'posts',
//     data: { relatedPosts: [post1Doc.id, post3Doc.id] },
//   })
//   await payload.update({
//     id: post3Doc.id,
//     collection: 'posts',
//     data: { relatedPosts: [post1Doc.id, post2Doc.id] },
//   })

//   payload.logger.info(`— Seeding contact form & pages...`)

//   const contactForm = await payload.create({
//     collection: 'forms',
//     depth: 0,
//     data: contactFormData,
//   })

//   const [_, contactPage] = await Promise.all([
//     payload.create({
//       collection: 'pages',
//       depth: 0,
//       data: home({ heroImage: imageHomeDoc, metaImage: image2Doc }),
//     }),
//     payload.create({
//       collection: 'pages',
//       depth: 0,
//       data: contactPageData({ contactForm }),
//     }),
//   ])

//   payload.logger.info(`— Seeding globals...`)

//   await Promise.all([
//     payload.updateGlobal<'header'>({
//       slug: 'header',
//       data: {
//         navItems: [
//           { link: { type: 'custom', label: 'Posts', url: '/posts' } },
//           {
//             link: {
//               type: 'reference',
//               label: 'Contact',
//               reference: { relationTo: 'pages', value: contactPage.id },
//             },
//           },
//         ],
//       },
//     }),
//     payload.updateGlobal<'footer'>({
//       slug: 'footer',
//       data: {
//         navItems: [
//           { link: { type: 'custom', label: 'Admin', url: '/admin' } },
//           {
//             link: {
//               type: 'custom',
//               label: 'Source Code',
//               newTab: true,
//               url: 'https://github.com/payloadcms/payload/tree/main/templates/website',
//             },
//           },
//           { link: { type: 'custom', label: 'Payload', newTab: true, url: 'https://payloadcms.com/' } },
//         ],
//       },
//     }),
//   ])

//   payload.logger.info('Seeded database successfully!')
// }
