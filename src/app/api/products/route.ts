// app/api/products/route.ts
import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'

const PAGE_SIZE = 4

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const page = Math.max(1, Number(searchParams.get('page') ?? 1))
  const limitParam = Number(searchParams.get('limit'))
  const limit = Number.isFinite(limitParam) ? Math.min(Math.max(1, limitParam), 60) : PAGE_SIZE
  const categoryId = searchParams.get('categoryId') || undefined

  const payload = await getPayload({ config })
  const where = categoryId ? { category: { in: [categoryId] } } : undefined

  const result = await payload.find({
    collection: 'products',
    depth: 1,
    page,
    limit,
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

  const res = NextResponse.json(result)
  res.headers.set('Cache-Control', 's-maxage=60, stale-while-revalidate=300')
  return res
}
