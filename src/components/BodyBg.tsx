// components/BodyBg.tsx
'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export function BodyBg() {
  const pathname = usePathname()

  useEffect(() => {
    const isCatalog = pathname.startsWith('/catalog')
    const cls = 'bg-[#FDFBE9]'
    if (isCatalog) document.body.classList.add(cls)
    else document.body.classList.remove(cls)

    // cleanup when unmounting / navigating
    return () => document.body.classList.remove(cls)
  }, [pathname])

  return null
}
