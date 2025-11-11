'use client'

import React, { useMemo, useState } from 'react'
import Image from 'next/image'
import { Media } from '@/components/Media'
import type { Media as MediaType } from '@/payload-types'
import Link from 'next/link'

type Category = {
  id: string
  title?: string | null
  slug?: string | null
  image?: MediaType | { url?: string } | null
  catalog?: {
    title?: string | null
    image?: MediaType | { url?: string } | null
    list?: {
      title: string
      description: { text: string }[] // bullets
    }[]
  } | null
}

// helpers to render with <Media /> when we have a full media doc; fallback to next/image for url-only
function isPayloadMedia(m: unknown): m is MediaType {
  return !!m && typeof m === 'object' && 'mimeType' in (m as any)
}

function ThumbImage({ media, alt }: { media?: MediaType | { url?: string } | null; alt: string }) {
  if (!media) return null

  if (isPayloadMedia(media)) {
    return (
      <div className="h-[110px] w-[140px] lg:w-[190px] relative">
        <Media
          resource={media}
          fill
          imgClassName="object-cover transition-transform duration-300 group-hover:scale-105 relative z-0"
          priority={false}
        />
      </div>
    )
  }

  const url = (media as any)?.url as string | undefined
  if (!url) return null

  return (
    <div className="h-[110px] w-[140px] lg:w-[190px] relative">
      <Image
        src={url}
        alt={alt}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-105 relative z-0"
        sizes="(max-width: 1024px) 140px, 190px"
        priority={false}
      />
    </div>
  )
}

function LargeImage({ media, alt }: { media?: MediaType | { url?: string } | null; alt: string }) {
  if (!media) return null

  if (isPayloadMedia(media)) {
    return (
      <div className="w-full h-[380px] md:h-[550px] relative rounded-xl overflow-hidden">
        <Media resource={media} fill imgClassName="object-cover" priority={false} />
      </div>
    )
  }

  const url = (media as any)?.url as string | undefined
  if (!url) return null

  return (
    <Image
      src={url}
      alt={alt}
      width={1200}
      height={800}
      className="w-full object-cover rounded-xl h-[380px] md:h-[550px]"
      sizes="(max-width: 768px) 100vw, 50vw"
      priority={false}
    />
  )
}

export function InlineCatalog({ categories }: { categories: Category[] }) {
  const [activeId, setActiveId] = useState<string>(categories[0].id)

  const activeCategory = useMemo(
    () => categories.find((c) => c.id === activeId),
    [categories, activeId],
  )

  return (
    <>
      {/* Categories Row */}
      <div className="flex flex-wrap items-center gap-4 justify-center md:justify-between">
        {categories.map((cat) => {
          const isActive = cat.id === activeId
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveId(cat.id)}
              className={`group relative rounded-[6px] overflow-hidden border border-[#E1D08380] text-left transition ${
                isActive ? 'border-[#E1D083]' : 'hover:shadow'
              }`}
            >
              {/* Background highlight animation */}
              <div
                className={`absolute bottom-0 left-0 w-[140px] lg:w-[190px] bg-[#F5EC9B] z-10 transition-all duration-500 ease-in-out ${
                  isActive ? 'h-full' : 'h-0'
                }`}
              />

              <ThumbImage media={cat.image} alt={cat.title ?? ''} />

              <div className="p-1 absolute bottom-1 left-2 z-20">
                <h2 className={`text-sm lg:text-lg ${isActive ? 'text-black' : 'text-white'}`}>
                  {cat.title}
                </h2>
              </div>
            </button>
          )
        })}
      </div>

      {activeCategory && <ActiveCatalogPanel category={activeCategory} />}
    </>
  )
}

function ActiveCatalogPanel({ category }: { category: Category }) {
  const catSlug = category.slug ?? ''
  const catalog = category.catalog

  return (
    <div className="mt-12">
      <div className="flex flex-col lg:flex-row gap-12 justify-between">
3        <div className="w-full lg:w-[50%] relative">
          <LargeImage media={catalog?.image} alt={catalog?.title || category.title || ''} />
          <div className="pt-4 absolute bottom-6 lg:bottom-10 left-6 lg:left-10">
            <Link
              href="catalog"
              className="inline-flex items-center justify-center rounded-lg bg-[#E1D083] border border-[#E1D083] px-6 py-2 text-black hover:bg-black hover:text-[#E1D083]  text-sm md:text-base"
            >
              View Catalog
            </Link>
          </div>
        </div>

        <div className="w-full lg:w-[40%] flex flex-col gap-4">
          {Array.isArray(catalog?.list) && catalog.list.length > 0 && (
            <ul className="flex flex-col gap-2">
              {catalog.list.map((item, idx) => {
                const bullets = item.description?.map((b) => b.text).filter(Boolean) ?? []
                return (
                  <li key={idx} className="flex flex-col gap-2 mt-4">
                    <h2 className="text-2xl flex items-center gap-2">{item.title}</h2>

                    {bullets.length > 0 && (
                      <ul className="ml-[32px] flex flex-col gap-2">
                        {bullets.map((line, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <Image
                              src="/bullets.svg"
                              alt="bullet"
                              width={14}
                              height={14}
                              className="w-[14px] h-[14px]"
                            />
                            <span>{line}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                )
              })}
            </ul>
          )}
        </div>

      </div>
    </div>
  )
}
