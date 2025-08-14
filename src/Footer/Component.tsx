import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Footer } from '@/payload-types'
import Image from 'next/image'

export async function Footer() {
  const footerData: Footer = await getCachedGlobal('footer', 1)()

  return (
    <footer className=" bg-black  text-white py-8">
      <div className="container mx-auto flex flex-col gap-8">
        <div className="flex items-start justify-between w-full gap-10">
          <div className="flex flex-col gap-6 w-[40%] items-start">
            <Link href="/">
              <Image
                src="/footerLogo.svg"
                alt="Sublime"
                width={100}
                height={100}
                className="!w-auto !h-[82.0002212524414px]"
              />
            </Link>
            <p className="text-[14px] text-[#A3A3A3]  font-light w-[70%]">
              Peptide products are not FDA approved. The decision to use them should only be made by
              a Medical Professional and their patient. Sublime Vitality does not give medical
              advice or make medical claims.
            </p>
          </div>

          <div className="flex flex-col gap-2 w-[20%] items-start">
            <h3 className="text-[16px] my-4">Quick Links</h3>
            <Link className="text-[14px] text-[#A3A3A3] hover:text-white hover:underline" href="/">
              Home
            </Link>
            <Link
              className="text-[14px] text-[#A3A3A3] hover:text-white hover:underline"
              href="/catalog/all"
            >
              Product Catalog
            </Link>
            <Link
              className="text-[14px] text-[#A3A3A3] hover:text-white hover:underline"
              href="/contact"
            >
              Contact Us
            </Link>
          </div>

          <div className="flex flex-col gap-2 w-[20%] items-start">
            <h3 className="text-[16px] my-4">Legal</h3>
            <Link
              className="text-[14px] text-[#A3A3A3] hover:text-white hover:underline"
              href="/terms--conditions"
            >
              Terms
            </Link>
            <Link
              className="text-[14px] text-[#A3A3A3] hover:text-white hover:underline"
              href="/privacy-policy"
            >
              Privacy{' '}
            </Link>
            <Link
              className="text-[14px] text-[#A3A3A3] hover:text-white hover:underline"
              href="/medical-disclaimer"
            >
              Medical Disclaimer
            </Link>
          </div>

          <div className="flex flex-col gap-2 w-[20%] items-start">
            <h3 className="text-[16px] my-4">Follow Us</h3>
            <Link className="text-[14px] text-[#A3A3A3]" href="/">
              <Image
                src="/ig.svg"
                alt="Instagram"
                width={20}
                height={20}
                className="hover:scale-110 transition-all"
              />
            </Link>
          </div>
        </div>

        <div className="w-full h-[1px] bg-[#A3A3A3]"></div>

        <p className="text-[14px] text-[#A3A3A3] text-center">
          © 2025 Sublime Vitality. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
