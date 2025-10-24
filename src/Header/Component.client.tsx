'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import type { Header } from '@/payload-types'
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
  }, [pathname, setHeaderTheme])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
  }, [headerTheme, theme])

  // Hide-on-scroll (homepage only)
  const [isVisible, setIsVisible] = useState(true)
  const lastY = useRef(0)
  const ticking = useRef(false)

  useEffect(() => {
    if (!isHome) return
    const onScroll = () => {
      const y = window.scrollY
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          setIsVisible(y < lastY.current || y < 10)
          lastY.current = y
          ticking.current = false
        })
        ticking.current = true
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isHome])

  // Homepage top detection
  const [isTop, setIsTop] = useState(true)
  useEffect(() => {
    if (!isHome) {
      setIsTop(false)
      return
    }
    const onScroll = () => setIsTop(window.scrollY < 10)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isHome])

  // Background + text/logo
  const headerBg = isHome ? (isTop ? 'bg-transparent' : 'bg-black') : 'bg-[#FDFBE9]'
  const textColor = isHome ? (isTop ? 'text-white' : 'text-white') : 'text-black'
  const logoSrc = isHome ? '/headerlogo.svg' : '/headerlogo-black.svg'

  return (
    <header
      className={[
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out',
        headerBg,
        isHome ? (isVisible ? 'translate-y-0' : '-translate-y-full') : 'translate-y-0', // no hide animation on other pages
      ].join(' ')}
      {...(theme ? { 'data-theme': theme } : {})}
    >
      <div className="container mx-auto p-4">
        <div className="h-20 flex items-center justify-between">
          <Link href="/">
            <Image src={logoSrc} alt="Logo" width={100} height={100} />
          </Link>

          <div className={`flex gap-3 md:gap-8 ${textColor}`}>
            <Link className="text-sm md:text-base hover:underline" href="/catalog">
              Product Catalog
            </Link>
            <Link className="text-sm md:text-base hover:underline" href="/contact">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
