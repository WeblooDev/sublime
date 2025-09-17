// src/app/(frontend)/catalog/[slug]/page.tsx
import { getPayload } from 'payload'
import config from '@/payload.config'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import RevealMore from '@/components/RevealMore'

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

// ----- Data fetching (server) -----
async function getData(slug: string) {
  const payload = await getPayload({ config })

  // 1) All categories for top bar (prepend virtual "All" later)
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
    return { categories: [], activeCategory: null, products: [] as Product[] }
  }

  // 3) Products (all or filtered by category) — NO pagination
  const productsRes =
    slug === 'all'
      ? await payload.find({
          collection: 'products',
          depth: 1,
          pagination: false, // get everything
          sort: 'title',
        })
      : await payload.find({
          collection: 'products',
          where: { category: { contains: (activeCategory as any).id } },
          depth: 1,
          pagination: false, // get everything
          sort: 'title',
        })

  return {
    categories: [ALL_VIRTUAL, ...realCategories],
    activeCategory,
    products: (productsRes.docs ?? []) as unknown as Product[],
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

export default async function CatalogByCategoryPage(props: {
  // Next 15: params can be a Promise for PPR
  params: Promise<RouteParams>
}) {
  const { slug } = await props.params

  const { categories, activeCategory, products } = await getData(slug)
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

  return (
    <div className="mt-[100px] bg-[#FDFBE9]">
      {/* TOP BLOCKS */}
      {topLayout.length > 0 && (
        <div className="mb-10">
          <RenderBlocks blocks={topLayout as any} />
        </div>
      )}

      {/* Categories bar (with All first) */}
      <div className="container p-4 md:p-0  flex flex-wrap justify-center md:justify-between items-center mb-10 gap-2 md:gap-4">
        {categories.map((c) => {
          const isActive = c.slug === (activeCategory as any).slug
          const img = (c as any)?.image?.url ?? null

          return (
            <Link
              key={c.id}
              href={`/catalog/${c.slug}`}
              className={`group relative rounded-[6px] overflow-hidden border text-left transition block focus:outline-none h-[110px] max-w-[150px] md:max-w-[auto] ${
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
                <h2 className={`text-base ${isActive ? 'text-black' : 'text-white'}`}>{c.title}</h2>
              </div>
            </Link>
          )
        })}
      </div>

      {/* PRODUCTS + Load more */}
      <RevealMore products={products} />

      {/* BOTTOM BLOCKS */}
      {bottomLayout.length > 0 && (
        <div className="mt-10">
          <RenderBlocks blocks={bottomLayout as any} />
        </div>
      )}
    </div>
  )
}
