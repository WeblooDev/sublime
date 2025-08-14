// src/blocks/InfoMapSection/Component.tsx
import React from 'react'

type Props = any // fallback until payload-types are regenerated

export const DisclaimerSection: React.FC<Props> = (props) => {
  const { title, subtitle, description, smallText } = props || {}

  if (!title && !subtitle && !description) return null

  return (
    <section className="container my-20 mt-[160px] flex flex-col items-center justify-between gap-10">
      <img src="/Disclaimer.svg" alt="Disclaimer" />

      <h2 className="text-3xl md:text-5xl text-center">{title} </h2>
      <div className="flex flex-col gap-4 text-robot-bold">
        <p className="text-lg text-center ">{subtitle}</p>
        <p className="text-lg text-center">{description}</p>
        <p className="text-lg text-center">{smallText}</p>
      </div>
    </section>
  )
}

export default DisclaimerSection
