'use client'

import React, { useMemo, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { CustomButton } from '@/components/CustomButton'

type Category = {
  id: string
  title?: string | null
  slug?: string | null
  image?: { url?: string } | null
  catalog?: {
    title?: string | null
    image?: { url?: string } | null
    list?: { title: string; description: string }[]
  } | null
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
      <div className="flex items-center gap-4 justify-between">
        {categories.map((cat) => {
          const img = cat.image?.url ?? null
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
                className={`absolute bottom-0 left-0 w-[190px] bg-[#F5EC9B] z-10 transition-all duration-500 ease-in-out ${
                  isActive ? 'h-full' : 'h-0'
                }`}
              />

              {img && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={img}
                  alt={cat.title ?? ''}
                  className="h-[110px] w-[190px] object-cover transition-transform duration-300 group-hover:scale-105 relative z-0"
                />
              )}

              <div className="p-1 absolute bottom-1 left-2  z-20">
                <h2 className={`text-lg ${isActive ? 'text-black' : 'text-white'}`}>{cat.title}</h2>
              </div>
            </button>
          )
        })}
      </div>

      {/* Inline Catalog for the active category */}
      {activeCategory && <ActiveCatalogPanel category={activeCategory} />}
    </>
  )
}

function ActiveCatalogPanel({ category }: { category: Category }) {
  const catSlug = category.slug ?? ''
  const catalog = category.catalog
  const image = catalog?.image?.url ?? null

  return (
    <div className="mt-12 ">
      <div className="flex flex-col lg:flex-row gap-12 justify-between">
        <div className="w-[50%] relative">
          {image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={image}
              alt={catalog?.title || category.title || ''}
              className="w-full h-full object-cover rounded-xl"
            />
          )}
          <div className="pt-4 absolute bottom-10 left-10">
            <CustomButton label="View Catalog" href={`/catalog/${catSlug}`} />
          </div>
        </div>
        <div className="w-[40%] flex flex-col gap-4">
          {Array.isArray(catalog?.list) && catalog!.list!.length > 0 && (
            <ul className="flex flex-col gap-8">
              {catalog!.list!.map((item, idx) => (
                <li key={idx} className="flex flex-col gap-2 mt-4">
                  <h2 className="text-2xl flex items-center gap-2  ">
                    <Image
                      src="bullets.svg"
                      alt="bullet"
                      width={20}
                      height={20}
                      className="w-[23px] h-[23px] "
                    />
                    {item.title}
                  </h2>
                  <p className="ml-[32px] text-base w-[90%]">{item.description}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
