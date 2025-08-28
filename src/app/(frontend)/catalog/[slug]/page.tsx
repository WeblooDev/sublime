// src/app/(frontend)/catalog/[slug]/page.tsx
import { getPayload } from 'payload'
import config from '@/payload.config'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { RenderBlocks } from '@/blocks/RenderBlocks'

// ---- Types
type Catalog = {
  content?: {
    topLayout?: Array<Record<string, unknown>>
    bottomLayout?: Array<Record<string, unknown>>
    layout?: Array<Record<string, unknown>>
  }
}

type Category = {
  id: string
  title?: string
  slug?: string
  image?: { url?: string; alt?: string } | null
  catalog?: Catalog | string
}

type Product = {
  id: string
  title?: string
  subtitle?: string
  description?: string
  tag?: string
  mainImage?: any
  // supports multi-category (field name is `category` but it's an array)
  category?: Array<Category | string>
}

// Virtual "All" category for the tabs
const ALL_VIRTUAL: Category = {
  id: 'ALL',
  title: 'All Peptides',
  slug: 'all',
  image: { url: '/all.png', alt: 'All Peptides' },
  catalog: undefined,
}

async function getData(slug: string, page: number) {
  const payload = await getPayload({ config })

  // 1) All categories for top bar
  const allCategoriesRes = await payload.find({
    collection: 'categories',
    depth: 1,
    pagination: false,
    sort: 'title',
  })
  const realCategories = (allCategoriesRes.docs ?? []) as unknown as Category[]

  // 2) Active category (virtual if slug === 'all')
  let activeCategory: Category | null = null

  if (slug === 'all') {
    activeCategory = ALL_VIRTUAL
  } else {
    const categoriesRes = await payload.find({
      collection: 'categories',
      where: { slug: { equals: slug } },
      depth: 2, // resolves related catalog + its blocks
      limit: 1,
      pagination: false,
    })
    activeCategory = (categoriesRes.docs?.[0] as unknown as Category) ?? null
  }

  if (!activeCategory) {
    return { categories: [], activeCategory: null, products: [], pagination: null as any }
  }

  // 3) Products (all or filtered by category), with pagination (limit=4)
  const limit = 4
  const productsRes =
    slug === 'all'
      ? await payload.find({
          collection: 'products',
          depth: 1,
          pagination: true,
          limit,
          page,
          sort: 'title',
        })
      : await payload.find({
          collection: 'products',
          where: {
            // hasMany relationship field "category"
            category: { contains: (activeCategory as any).id },
          },
          depth: 1,
          pagination: true,
          limit,
          page,
          sort: 'title',
        })

  // derive safe locals to silence TS optional fields
  const pageNum = productsRes.page ?? page ?? 1
  const totalPages = productsRes.totalPages ?? 1

  return {
    // Prepend the virtual “All” tab
    categories: [ALL_VIRTUAL, ...realCategories],
    activeCategory,
    products: (productsRes.docs ?? []) as unknown as Product[],
    pagination: {
      page: pageNum,
      totalPages,
      hasPrevPage: pageNum > 1,
      hasNextPage: pageNum < totalPages,
      totalDocs: productsRes.totalDocs ?? 0,
    },
  }
}

// Fetch layouts for the virtual "All" from the Global
async function getAllLayouts() {
  const payload = await getPayload({ config })
  const all = await payload.findGlobal({ slug: 'catalogAll', depth: 2 })
  const top = ((all as any)?.content?.topLayout ?? []) as Array<Record<string, unknown>>
  const bottom = ((all as any)?.content?.bottomLayout ?? []) as Array<Record<string, unknown>>
  return { top, bottom }
}

type RouteParams = { slug: string }
type RouteSearch = { page?: string }

export default async function CatalogByCategoryPage(props: {
  // Next 15: params/searchParams can be Promises for PPR
  params: Promise<RouteParams>
  searchParams?: Promise<RouteSearch>
}) {
  const { slug } = await props.params
  const sp = (await props.searchParams) ?? {}
  const currentPage = Math.max(1, parseInt(sp.page ?? '1', 10) || 1)

  const { categories, activeCategory, products, pagination } = await getData(slug, currentPage)
  if (!activeCategory) return notFound()

  const isAll = slug === 'all'

  // Real category layouts
  const catTop = ((activeCategory as any)?.catalog?.content?.topLayout ?? []) as Array<
    Record<string, unknown>
  >
  const catBottom = ((activeCategory as any)?.catalog?.content?.bottomLayout ?? []) as Array<
    Record<string, unknown>
  >

  // All layouts (from the Global) when needed
  let topLayout: Array<Record<string, unknown>> = []
  let bottomLayout: Array<Record<string, unknown>> = []

  if (isAll) {
    const { top, bottom } = await getAllLayouts()
    topLayout = top
    bottomLayout = bottom
  } else {
    topLayout = catTop
    bottomLayout = catBottom
  }

  const totalPages = pagination?.totalPages ?? 1
  const hasPrev = pagination?.hasPrevPage ?? currentPage > 1
  const hasNext = pagination?.hasNextPage ?? currentPage < totalPages

  return (
    <div className="mt-[100px] bg-[#FDFBE9]">
      {/* TOP BLOCKS */}
      {topLayout.length > 0 && (
        <div className="mb-10">
          <RenderBlocks blocks={topLayout as any} />
        </div>
      )}

      {/* Categories bar (with All first) */}
      <div className="container p-4 md:p-0 flex flex-wrap justify-center  md:justify-between items-center  mb-10">
        {categories.map((c) => {
          const isActive = c.slug === (activeCategory as any).slug
          const img = (c as any)?.image?.url ?? null

          return (
            <Link
              key={c.id}
              href={`/catalog/${c.slug}`}
              className={`group relative rounded-[6px] overflow-hidden border text-left transition block focus:outline-none h-[110px] ${
                isActive ? 'border-[#E1D083]' : 'border-[#E1D08380] hover:shadow'
              }`}
              aria-current={isActive ? 'page' : undefined}
              prefetch={false}
            >
              <div
                className={`absolute bottom-0 left-0 w-[190px] bg-[#F5EC9B] z-10 transition-all duration-500 ease-in-out ${
                  isActive ? 'h-full' : 'h-0'
                }`}
              />
              <div className="h-[110px] w-[190px] relative z-0">
                {img ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={img}
                    alt={c.title ?? ''}
                    className="h-full w-[190px] object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="h-[110px] w-[190px] bg-neutral-100" />
                )}
              </div>
              <div className="absolute bottom-2 left-4 z-20 p-0">
                <h2 className={`text-base  ${isActive ? 'text-black' : 'text-white'}`}>
                  {c.title}
                </h2>
              </div>
            </Link>
          )
        })}
      </div>

      {/* PRODUCTS */}
      <div className="container flex flex-col gap-10 items-center w-full bg-[#F7EFD5] rounded-2xl my-20">
        {products.map((p, i) => {
          const img =
            typeof (p as any).mainImage === 'object' && (p as any).mainImage?.url
              ? (p as any).mainImage.url
              : null
          const isReverse = i % 2 === 1 // 0-based: 0=row, 1=reverse, 2=row, 3=reverse...

          return (
            <div
              key={p.id}
              className={`flex flex-col gap-6 lg:gap-0 lg:flex-row ${isReverse ? 'lg:flex-row-reverse' : ''} items-center justify-center w-full p-4 md:p-10`}
            >
              {img && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={img} alt={p.title || ''} className="object-cover w-full lg:w-[40%]" />
                //                                              ^^^^^^ fixed w/full -> w-full
              )}

              <div
                className={`p-4 lg:p-8 flex flex-col gap-6 bg-black text-white w-auto lg:w-[50%]
                      rounded-2xl lg:rounded-none
                      ${isReverse ? 'lg:rounded-l-2xl' : 'lg:rounded-r-2xl'}`}
              >
                <div className="flex flex-col gap-2">
                  <h3 className=" text-2xl sm:text-3xl md:text-4xl lg:text-6xl">{p.title}</h3>
                  {p.subtitle && <p className="text-sm">{p.subtitle}</p>}
                </div>
                {p.description && <p className="text-sm">{p.description}</p>}
                {p.tag && <span className="text-xs uppercase">{p.tag}</span>}
              </div>
            </div>
          )
        })}
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="container my-8 flex items-center justify-center gap-2">
          {/* Prev */}
          <Link
            aria-disabled={!hasPrev}
            className={` h-[40px] w-[40px] flex items-center justify-center border rounded-full  bg-black text-white ${hasPrev ? 'hover:bg-black hover:text-white' : 'opacity-20 pointer-events-none'}`}
            href={`/catalog/${slug}?page=${Math.max(1, currentPage - 1)}`}
            prefetch={false}
          >
            <img src="/prev.svg" alt="prev" className="w-5 h-5" />
          </Link>

          {/* Page numbers (simple) */}
          {Array.from({ length: totalPages }).map((_, idx) => {
            const p = idx + 1
            const active = p === currentPage
            return (
              <Link
                key={p}
                href={`/catalog/${slug}?page=${p}`}
                prefetch={false}
                className={` h-[40px] w-[40px] flex items-center justify-center rounded-full  border ${active ? 'bg-[#E1D083] text-black' : 'hover:bg-black hover:text-white'}`}
              >
                {p}
              </Link>
            )
          })}

          {/* Next */}
          <Link
            aria-disabled={!hasNext}
            className={` h-[40px] w-[40px] flex items-center justify-center border rounded-full  bg-black text-white ${hasNext ? 'hover:bg-black hover:text-white' : 'opacity-40 pointer-events-none'}`}
            href={`/catalog/${slug}?page=${Math.min(totalPages, currentPage + 1)}`}
            prefetch={false}
          >
            <img src="/next.svg" alt="next" className="w-5 h-5" />
          </Link>
        </div>
      )}

      {/* BOTTOM BLOCKS */}
      {bottomLayout.length > 0 && (
        <div className="mt-10">
          <RenderBlocks blocks={bottomLayout as any} />
        </div>
      )}
    </div>
  )
}
