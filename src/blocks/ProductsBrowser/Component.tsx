// blocks/ProductsBrowser/Component.tsx
import { getPayload } from 'payload'
import config from '@/payload.config'
import type {
  ProductsBrowser as ProductsBrowserBlockType,
  Category,
  Product,
} from '@/payload-types'
import ProductsBrowserClient from './ProductsBrowserClient'

type Props = ProductsBrowserBlockType & { disableInnerContainer?: boolean }

const PAGE_SIZE = 4

export default async function ProductsBrowser(props: Props) {
  const { title, showCategoryFilter, defaultCategory } = props
  const payload = await getPayload({ config })

  // Categories (need image for <Media /> in the strip)
  const categoriesRes = await payload.find({
    collection: 'categories',
    depth: 1,
    limit: 500,
    sort: 'title',
    select: { id: true, title: true, slug: true, image: true },
  })

  const defaultCatId =
    typeof defaultCategory === 'object' ? defaultCategory?.id : (defaultCategory ?? undefined)

  const where = defaultCatId ? { category: { in: [defaultCatId] } } : undefined

  // Products: include subtitle & description
  const productsRes = await payload.find({
    collection: 'products',
    depth: 1,
    limit: PAGE_SIZE,
    sort: '-updatedAt',
    where,
    select: {
      id: true,
      title: true,
      subtitle: true,
      description: true,
      tag: true,
      slug: true,
      mainImage: true,
    },
  })

  const categories = categoriesRes.docs as unknown as Category[]
  const products = productsRes.docs as unknown as Product[]

  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        <ProductsBrowserClient
          showCategoryFilter={!!showCategoryFilter}
          pageSize={PAGE_SIZE}
          categories={categories.map((c) => ({
            id: c.id,
            title: c.title ?? '',
            slug: c.slug,
            image: (c as any).image ?? null, // pass full media doc for <Media />
          }))}
          initialCategoryId={defaultCatId ?? null}
          initialProducts={products.map((p) => ({
            id: p.id,
            title: p.title ?? '',
            subtitle: (p as any).subtitle ?? '',
            description: (p as any).description ?? '',
            tag: p.tag ?? '',
            slug: (p as any).slug,
            image: (p as any).mainImage ?? null, // full media for <Media />
          }))}
          initialHasNextPage={!!productsRes.hasNextPage}
        />
      </div>
    </section>
  )
}
