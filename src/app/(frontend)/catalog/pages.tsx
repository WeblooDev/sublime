// app/catalog/page.tsx
import { getPayload } from 'payload'
import config from '@/payload.config'
import { redirect, notFound } from 'next/navigation'

export default async function CatalogIndexPage() {
  const payload = await getPayload({ config })

  // Get categories; choose a default “landing” destination
  const cats = await payload.find({
    collection: 'categories',
    depth: 0,
    limit: 1,
    pagination: false,
    sort: 'title',
  })

  // If you want the “All” view by default:
  if (!cats?.docs) return notFound()
  redirect('/catalog/all')

  // OR, if you prefer the first category instead:
  // const first = cats.docs[0]
  // if (!first?.slug) return notFound()
  // redirect(`/catalog/${first.slug}`)
}
