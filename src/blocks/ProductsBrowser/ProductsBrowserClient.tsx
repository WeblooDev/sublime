// blocks/ProductsBrowser/ProductsBrowserClient.tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import Skeleton from 'react-loading-skeleton'
import { Media } from '@/components/Media'

type Cat = {
  id: string
  title: string
  slug?: string | null
  image: any | null
}

type Card = {
  id: string
  title: string
  subtitle?: string
  description?: string
  tag?: string
  slug?: string
  image: any | null
}

export default function ProductsBrowserClient({
  showCategoryFilter,
  pageSize,
  categories,
  initialCategoryId,
  initialProducts,
  initialHasNextPage,
}: {
  showCategoryFilter: boolean
  pageSize: number
  categories: Cat[]
  initialCategoryId: string | null
  initialProducts: Card[]
  initialHasNextPage: boolean
}) {
  const [categoryId, setCategoryId] = useState<string | null>(initialCategoryId)
  const [items, setItems] = useState<Card[]>(initialProducts.slice(0, pageSize))
  const [page, setPage] = useState(1)
  const [hasNext, setHasNext] = useState(initialHasNextPage)
  const [loading, setLoading] = useState(false)

  // ...
  const didMount = useRef(false)

  // 👇 add these 2 lines
  // keep your refs
  const catStripRef = useRef<HTMLDivElement | null>(null)
  const scrollCats = (dir: number) =>
    catStripRef.current?.scrollBy({
      left: dir * catStripRef.current.clientWidth, // one page
      behavior: 'smooth',
    })

  // ...

  const fetchPage = async (nextPage: number, nextCategoryId: string | null, replace = false) => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      params.set('limit', String(pageSize))
      params.set('page', String(nextPage))
      if (nextCategoryId) params.set('categoryId', nextCategoryId)

      const res = await fetch(`/api/products?${params.toString()}`, { cache: 'no-store' })
      const data = await res.json()

      const cards: Card[] =
        (data?.docs ?? []).map((p: any) => ({
          id: p.id,
          title: p.title ?? '',
          subtitle: p.subtitle ?? '',
          description: p.description ?? '',
          tag: p.tag ?? '',
          slug: p.slug,
          image: p.mainImage ?? null,
        })) ?? []

      setItems((prev) => (replace ? cards : [...prev, ...cards]))
      setPage(data?.page ?? nextPage)
      setHasNext(!!data?.hasNextPage)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true
      return
    }
    setPage(1)
    setHasNext(true)
    fetchPage(1, categoryId, true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId])

  const allItem: Cat = { id: '__ALL__', title: 'All', slug: null, image: null }
  const catList = [allItem, ...categories]

  return (
    <div className="space-y-8">
      {/* Category strip (unchanged except skeleton already present) */}
      {showCategoryFilter && (
        <div className="space-y-3">
          <div className="relative">
            {/* arrows visible on <xl */}
            <button
              type="button"
              aria-label="Scroll categories left"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                scrollCats(-1)
              }}
              className="xl:hidden absolute left-0 top-1/2 -translate-y-1/2 z-50
                 bg-black/70 text-white rounded-full w-8 h-8 grid place-items-center
                 pointer-events-auto"
            >
              ‹
            </button>
            <button
              type="button"
              aria-label="Scroll categories right"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                scrollCats(1)
              }}
              className="xl:hidden absolute right-0 top-1/2 -translate-y-1/2 z-50
                 bg-black/70 text-white rounded-full w-8 h-8 grid place-items-center
                 pointer-events-auto"
            >
              ›
            </button>

            <div
              ref={catStripRef}
              className="
                overflow-x-auto pb-1 -mx-1 px-8 xl:px-1
      grid grid-flow-col auto-cols-[calc(100vw/6)] gap-4
      xl:auto-cols-auto xl:grid-flow-row xl:grid-cols-none xl:flex xl:justify-between
            "
            >
              {loading && items.length === 0
                ? Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="shrink-0">
                      <div className="rounded-xl overflow-hidden">
                        <Skeleton height={112} />
                      </div>
                    </div>
                  ))
                : catList.map((c) => {
                    const isActive =
                      (categoryId === null && c.id === '__ALL__') ||
                      (categoryId !== null && c.id === categoryId)

                    return (
                      <button
                        key={c.id}
                        onClick={() => setCategoryId(c.id === '__ALL__' ? null : c.id)}
                        className={clsx('group shrink-0 rounded-xl transition')}
                        aria-pressed={isActive}
                      >
                        <div className="w-[calc(100vw/10)]">
                          <div className="relative aspect-[183/108] rounded-xl overflow-hidden">
                            {/* Image (z-0) */}
                            <div className="absolute inset-0 z-0">
                              {c.id === '__ALL__' ? (
                                <img
                                  src="/any.webp"
                                  alt="All"
                                  className="h-full w-full object-cover"
                                />
                              ) : c.image ? (
                                <Media resource={c.image} fill imgClassName="object-cover" />
                              ) : (
                                <div className="h-full w-full grid place-items-center text-xs text-neutral-500 bg-neutral-100">
                                  {c.title}
                                </div>
                              )}
                            </div>

                            {/* Active overlay (z-10): full F5EC9B; no borders/rings */}
                            <div
                              className={clsx(
                                'absolute inset-0 z-10 bg-[#F5EC9B] transition-opacity duration-200',
                                isActive ? 'opacity-100' : 'opacity-0',
                              )}
                              aria-hidden="true"
                            />

                            {/* Title (z-20): white normally, black when active */}
                            <div className="absolute inset-x-0 bottom-0 z-20 p-2">
                              <h2
                                className={clsx(
                                  'text-base text-center truncate',
                                  isActive ? 'text-black' : 'text-white',
                                )}
                              >
                                {c.title}
                              </h2>
                            </div>
                          </div>
                        </div>
                      </button>
                    )
                  })}
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col  gap-10 items-center w-full bg-[#F7EFD5] rounded-2xl py-10 my-20">
        {items.map((card, i) => {
          const isReversed = i % 2 === 1

          return (
            <article
              key={card.id}
              className="flex flex-col gap-6 lg:gap-0 lg:flex-row  items-center justify-center w-full p-4 md:p-10"
            >
              <div
                className={clsx(
                  'w-full flex  flex-col items-center justify-center',
                  isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row',
                )}
              >
                {card.image && (
                  <div className="relative w-full lg:w-[40%]">
                    <div className="relative aspect-[499/520]">
                      <Media resource={card.image} fill imgClassName="object-cover w-full " />
                    </div>
                  </div>
                )}

                {/* Text */}
                <div className="p-4 lg:p-8 flex flex-col gap-6 bg-black text-white w-[100%] lg:w-[50%]">
                  <h3 className=" text-2xl sm:text-3xl md:text-4xl lg:text-5xl">{card.title}</h3>
                  {card.subtitle && <div className="text-sm ">{card.subtitle}</div>}

                  {card.description && (
                    <p className="text-sm leading-relaxed 0">{card.description}</p>
                  )}
                  {card.tag && <div className="text-xs uppercase tracking-wide ">{card.tag}</div>}
                </div>
              </div>
            </article>
          )
        })}
      </div>

      {/* Load more */}
      {hasNext && (
        <div className="flex justify-center">
          <button
            disabled={loading}
            onClick={() => fetchPage(page + 1, categoryId)}
            className="px-5 py-2.5 rounded-lg border border-black bg-black text-white hover:bg-white hover:text-black"
          >
            {loading ? 'Loading…' : 'Load more'}
          </button>
        </div>
      )}
    </div>
  )
}
