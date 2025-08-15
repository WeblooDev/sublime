// src/blocks/InfoMapSection/Component.tsx
import React from 'react'

type Props = any // fallback until payload-types are regenerated

export const InfoMapSection: React.FC<Props> = (props) => {
  const { title, subtitle, description, smallText, maps } = props || {}

  if (!title && !subtitle && !description && !Array.isArray(maps)) return null

  return (
    <section className="container my-20 mt-[160px]">
      {/* Headings */}
      <div className="mb-8">
        {title && <h2 className="text-3xl md:text-5xl ">{title}</h2>}
        {subtitle && <h3 className="text-lg md:text-[20px] mt-6">{subtitle}</h3>}
        {description && (
          <p className="mt-4 text-lg w-[60%] text-start font-roboto-bold">{description}</p>
        )}
      </div>

      {/* Map grid */}
      {Array.isArray(maps) && maps.length > 0 && (
        <div className="flex flex-col gap-10">
          {maps.map((group: any, i: number) => {
            const items = Array.isArray(group?.items) ? group.items : []
            return (
              <div key={i} className="flex flex-col gap-4 ">
                {group?.mapTitle && (
                  <h3 className="text-2xl md:text-3xl text-[#887B4D] mb-0 md:mb-4">
                    {group.mapTitle}
                  </h3>
                )}

                {items.length > 0 ? (
                  <ul className="list-disc pl-5 space-y-2">
                    {items.map((it: any, idx: number) => (
                      <li key={idx} className="text-sm md:text-lg">
                        {it?.text}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm opacity-60">No items added yet.</p>
                )}
              </div>
            )
          })}
        </div>
      )}

      {smallText && <p className="mt-2 text-sm opacity-70">{smallText}</p>}
    </section>
  )
}

export default InfoMapSection
