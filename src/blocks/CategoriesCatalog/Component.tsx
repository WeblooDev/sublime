// Server component: fetches data only
import { getPayload } from 'payload'
import config from '@/payload.config'
import React from 'react'
import { InlineCatalog } from './InlineCatalog.client'

// Use the SAME shape the client expects
type ServerCategory = {
  id: string
  title?: string | null
  slug?: string | null
  image?: { url?: string } | null
  catalog?: {
    title?: string | null
    image?: { url?: string } | null
    list?: {
      title: string
      description: { text: string }[] // <-- align with client
    }[]
  } | null
}

async function fetchCategories(): Promise<ServerCategory[]> {
  const payload = await getPayload({ config })
  const res = await payload.find({
    collection: 'categories',
    depth: 2, // populate catalog and image
    pagination: false,
    sort: 'title',
  })

  const docs = (res.docs ?? []) as any[]

  return docs.map((d) => {
    const list = Array.isArray(d?.catalog?.list)
      ? d.catalog.list.map((it: any) => {
          // Normalize description into { text }[]
          let bullets: { text: string }[] = []

          if (Array.isArray(it?.description)) {
            // Could be string[] or {text}[]
            bullets = it.description
              .map((b: any) =>
                typeof b === 'string' ? { text: b.trim() } : { text: String(b?.text ?? '').trim() },
              )
              .filter((b: { text: string }) => !!b.text)
          } else if (typeof it?.description === 'string') {
            bullets = it.description
              .split(/\r?\n/)
              .map((s: string) => s.trim())
              .filter(Boolean)
              .map((text: string) => ({ text }))
          } else {
            bullets = []
          }

          return {
            title: String(it?.title ?? ''),
            description: bullets,
          }
        })
      : []

    return {
      id: String(d.id),
      title: d.title ?? null,
      slug: d.slug ?? null,
      image: d.image && typeof d.image === 'object' && d.image?.url ? { url: d.image.url } : null,
      catalog: d.catalog
        ? {
            title: d.catalog.title ?? null,
            image:
              d.catalog.image && typeof d.catalog.image === 'object' && d.catalog.image?.url
                ? { url: d.catalog.image.url }
                : null,
            list,
          }
        : null,
    }
  })
}

export default async function CategoriesCatalogBlock(props: { title?: string | null }) {
  const categories = await fetchCategories()
  if (!categories.length) return null

  return (
    <section className="bg-black text-white">
      <div className="container py-20">
        <div className="flex flex-col lg:flex-row gap-4 justify-between items-center mb-8 text-center md:text-start">
          {props.title && <h2 className="text-2xl md:text-4xl">{props.title}</h2>}
          <p className="text-sm md:text-base lg:text-lg w-[80%] lg:w-[40%]">
            Explore our curated range of medical-grade peptides, each designed to target specific
            health goals.
          </p>
        </div>

        {/* All interactivity is in the client component */}
        <InlineCatalog categories={categories} />
      </div>
    </section>
  )
}
