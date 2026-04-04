"use client";

import Link from "next/link";
import Image from "next/image";

export default function FooterTopCTA() {
  return (
    <section className="w-full bg-primary border-t relative z-40 border-[#cfc8b8]">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-16 lg:py-24 flex flex-col lg:flex-row items-center justify-between gap-10">
        {/* LEFT CONTENT */}
        <div className="w-full lg:w-[60%] lg:text-left text-center">
          <h2 className="text-4xl md:text-6xl lg:text-[72px] leading-[1.1] font-serif text-[#2d2c22] ">
           Design Your <span className="text-primary-gold">Momentum</span>
          </h2>

          {/* EMAIL */}
<Link
  href="mailto:hello@liavia.ai"
  target="_blank"
  className="inline-block mt-8 text-lg md:text-xl text-primary-gold font-normal"
>
  hello@liavia.ai
</Link>
</div>

{/* RIGHT SIDE (LOGO) */}
<div className="w-full lg:w-[40%] flex justify-center lg:justify-end">
  <div className="w-full max-w-xs lg:max-w-sm flex justify-center">
    <Image
      src="/images/logo-1.png"
      width={220}
      height={220}
      alt="LiaVia logo"
      className="object-contain"
      priority
    />
  </div>
</div>
