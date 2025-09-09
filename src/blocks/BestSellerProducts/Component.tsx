// /blocks/BestSellerProducts/Component.tsx
import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { CustomButton } from '@/components/CustomButton'
import type { BestSellerProductsBlock } from '@/payload-types'

type MediaFile = { url?: string | null } | null
type ProductDoc = {
  id: string
  title?: string
  subtitle?: string
  description?: string
  mainImage?: MediaFile | { url?: string }
}

export async function BestSellerProducts(props: BestSellerProductsBlock) {
  const {
    title = 'Best Sellers',
    limit = 6,
    layout = 'grid',
    category,
    cta, // { label?, href?, newTab?, align? } - we'll use label, href, align
  } = (props as any) || {}

  const payload = await getPayload({ config })

  const categoryId =
    typeof category === 'string'
      ? category
      : typeof category === 'object' && category?.id
        ? category.id
        : undefined

  const where: any = { bestSeller: { equals: true } }
  if (categoryId) where.category = { equals: categoryId }

  const res = await payload.find({
    collection: 'products',
    where,
    depth: 1,
    limit,
    pagination: false,
    sort: '-updatedAt',
  })

  const products = (res.docs ?? []) as ProductDoc[]
  if (!products.length) return null

  const alignClass =
    cta?.align === 'left'
      ? 'justify-start'
      : cta?.align === 'right'
        ? 'justify-end'
        : 'justify-center'

  return (
    <section className="container my-12 lg:my-24 flex flex-col gap-8 items-center">
      {title && <h2 className="text-2xl md:text-4xl  mb-6">{title}</h2>}

      {layout === 'rows' ? (
        <div className="flex flex-col gap-10">
          {products.map((p, i) => {
            const img = (p as any)?.mainImage?.url ?? null
            const isReverse = i % 2 === 1

            return (
              <div
                key={p.id}
                className={`flex flex-col lg:flex-row ${isReverse ? 'lg:flex-row-reverse' : ''} items-center justify-center w-full gap-8 p-6`}
              >
                {img && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={img}
                    alt={p.title || ''}
                    className="object-cover w-full lg:w-[40%] rounded-2xl"
                  />
                )}

                <div
                  className={`p-6 flex flex-col gap-4 bg-black text-white w-full lg:w-[50%]
                              rounded-2xl lg:rounded-none
                              ${isReverse ? 'lg:rounded-l-2xl' : 'lg:rounded-r-2xl'}`}
                >
                  <h3 className="text-2xl">{p.title}</h3>
                  {p.subtitle && <p className="text-sm ">{p.subtitle}</p>}
                  {p.description && <p className="text-sm ">{p.description}</p>}
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
          {products.map((p) => {
            const img = (p as any)?.mainImage?.url ?? null
            return (
              <div
                key={p.id}
                className="rounded-xl overflow-hidden hover:bg-[black] hover:text-[#F5EC9B] 
                border border-[#E5E5E5] hover:border-[#F5EC9B] hover:shadow transition p-6 pb-8"
              >
                <img
                  src={img}
                  alt={p.title || ''}
                  className="w-full h-[305px] object-cover rounded-[6px]"
                />
                <div className=" flex flex-col gap-4 py-4">
                  <h3 className="text-xl md:text-2xl ">{p.title}</h3>
                  {p.subtitle && <p className="text-base ">{p.subtitle}</p>}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Bottom CTA using your CustomButton */}
      {cta?.label && (
        <div className={`mt-8 flex ${alignClass}`}>
          <CustomButton label={cta.label} href={cta.href || '#'} />
        </div>
      )}
    </section>
  )
}
