'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'
import Image from 'next/image'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  const isHome = pathname === '/'

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  // hide-on-scroll
  const [isVisible, setIsVisible] = useState(true)
  const lastY = useRef(0)
  const ticking = useRef(false)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          if (y < lastY.current || y < 10) {
            setIsVisible(true)
          } else {
            setIsVisible(false)
          }
          lastY.current = y
          ticking.current = false
        })
        ticking.current = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={[
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out',
        isHome ? 'bg-transparent' : 'bg-[#FDFBE9]',
        isVisible ? 'translate-y-0' : '-translate-y-full',
      ].join(' ')}
      {...(theme ? { 'data-theme': theme } : {})}
    >
      <div className="container mx-auto p-4">
        <div className="h-20 flex items-center justify-between">
          <Link href="/">
            <Image
              src={isHome ? '/headerlogo.svg' : '/headerlogo-black.svg'}
              alt="Logo"
              width={100}
              height={100}
            />
          </Link>

          <div className={`flex gap-8 ${isHome ? 'text-white' : 'text-black'}`}>
            <Link className="text-base hover:underline" href="/catalog/all">
              Product Catalog
            </Link>
            <Link className="text-base hover:underline" href="/contact">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
