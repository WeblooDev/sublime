// Server component: fetches categories and passes normalized data to client
import { getPayload } from 'payload'
import config from '@/payload.config'
import React from 'react'
import { InlineCatalog } from './InlineCatalog.client'
import type { CategoriesCatalogBlock as CategoriesCatalogBlockType } from '@/payload-types'

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
      description: { text: string }[]
    }[]
  } | null
}

async function fetchCategories(): Promise<ServerCategory[]> {
  const payload = await getPayload({ config })
  const res = await payload.find({
    collection: 'categories',
    depth: 2,
    pagination: false,
    sort: 'title',
  })

  return (res.docs ?? []).map((d: any) => {
    const list = Array.isArray(d?.catalog?.list)
      ? d.catalog.list.map((it: any) => {
          const bullets: { text: string }[] = Array.isArray(it?.description)
            ? it.description
                .map((b: any) =>
                  typeof b === 'string'
                    ? { text: b.trim() }
                    : { text: String(b?.text ?? '').trim() },
                )
                .filter((b: { text: string }) => !!b.text)
            : typeof it?.description === 'string'
              ? it.description
                  .split(/\r?\n/)
                  .map((s: string) => s.trim())
                  .filter(Boolean)
                  .map((text: string) => ({ text }))
              : []

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
      image: d.image?.url ? { url: d.image.url } : null,
      catalog: d.catalog
        ? {
            title: d.catalog.title ?? null,
            image: d.catalog.image?.url ? { url: d.catalog.image.url } : null,
            list,
          }
        : null,
    }
  })
}

export default async function CategoriesCatalogBlock(props: CategoriesCatalogBlockType) {
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

        <InlineCatalog categories={categories} />
      </div>
    </section>
  )
}
