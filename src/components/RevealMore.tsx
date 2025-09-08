'use client'
import { useState } from 'react'

type Product = {
  id: string
  title?: string
  subtitle?: string
  description?: string
  tag?: string
  mainImage?: any
}

export default function RevealMore({ products }: { products: Product[] }) {
  const [visible, setVisible] = useState(4)

  const items = products.slice(0, visible)

  return (
    <div className="container flex flex-col gap-10 items-center w-full bg-[#F7EFD5] rounded-2xl py-10 my-20">
      {items.map((p, i) => {
        const img =
          typeof (p as any).mainImage === 'object' && (p as any).mainImage?.url
            ? (p as any).mainImage.url
            : null
        const isReverse = i % 2 === 1

        return (
          <div
            key={p.id}
            className={`flex flex-col gap-6 lg:gap-0 lg:flex-row ${isReverse ? 'lg:flex-row-reverse' : ''} items-center justify-center w-full p-4 md:p-10`}
          >
            {img && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={img} alt={p.title || ''} className="object-cover w-full lg:w-[40%]" />
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

      {visible < products.length && (
        <button
          onClick={() => setVisible((v) => v + 6)}
          className=" bg-black text-white px-6 py-4 rounded-[6px] hover:bg-[#a0915b] transition-colors duration-300 cursor-pointer"
        >
          Load More
        </button>
      )}
    </div>
  )
}
