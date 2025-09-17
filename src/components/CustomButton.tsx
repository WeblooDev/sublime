import React from 'react'
import Link from 'next/link'

interface CustomButtonProps {
  label: string
  href: string
}

export const CustomButton: React.FC<CustomButtonProps> = ({ label, href }) => {
  return (
    <Link
      href={href}
      className="bg-[#A0915B] border border-[#A0915B]  text-white hover:bg-black hover:border-white rounded-[6px] text-[14px] lg:text-[16px]  px-[2rem] lg:px-[3.5rem] py-[0.7rem] lg:py-[0.9rem] transition-colors duration-300 inline-block"
    >
      {label}
    </Link>
  )
}
