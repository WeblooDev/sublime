// app/catalog/page.tsx
import { getPayload } from 'payload'
import config from '@/payload.config'
import { redirect, notFound } from 'next/navigation'

export default async function CatalogIndexPage() {
  const payload = await getPayload({ config })

  const cats = await payload.find({
    collection: 'categories',
    depth: 0,
    limit: 1,
    pagination: false,
    sort: 'title',
  })

  if (!cats?.docs) return notFound()

}
