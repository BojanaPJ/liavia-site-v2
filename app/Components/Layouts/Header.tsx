"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full bg-primary h-22 relative z-50">
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between h-full px-4 md:px-0">
        {/* Left: Logo + Desktop Nav */}
        <div className="flex items-center gap-40">
          <Link href="/">
            <Image
              src="/images/logo.png"
              width={140}
              height={32}
              alt="Logo"
              priority
              className="cursor-pointer"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-14 text-base font-medium text-black">
            <Link
              href="#what"
              className="hover:opacity-70   font-normal text-base"
            >
              What we do
            </Link>
            <Link
              href="#how"
              className="hover:opacity-70  font-normal text-base"
            >
              How it works
            </Link>
            <Link
              href="#security"
              className="hover:opacity-70 font-normal text-base"
            >
              Security & Safety
            </Link>
            <Link
              href="#who"
              className="hover:opacity-70 font-normal text-base"
            >
              Who we are
            </Link>
          </nav>
        </div>

        {/* Right: Desktop Career */}
        {/* <div className="hidden md:block">
          <Link
            href="#contact"
            className="px-4 py-1.5 rounded-full   tracking-wide text-[16px] font-normal  transition"
          >
            Career
          </Link>
        </div> */}

        {/* Mobile Hamburger */}
        <button
          onClick={() => setOpen(true)}
          className="md:hidden flex flex-col gap-1"
        >
          <span className="w-6 h-1 bg-black"></span>
          <span className="w-6 h-1 bg-black"></span>
          <span className="w-6 h-1 bg-black"></span>
        </button>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-[75%] max-w-[320px] z-50 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 flex flex-col h-full">
          {/* Close Button */}
          <button
            onClick={() => setOpen(false)}
            className="self-end mb-8 text-2xl"
          >
            ✕
          </button>

          {/* Menu */}
          <nav className="flex flex-col gap-6 text-lg font-medium">
            <Link
              href="#what"
              className="hover:opacity-70   font-normal text-base"
            >
              What we do
            </Link>
            <Link
              href="#how"
              className="hover:opacity-70  font-normal text-base"
            >
              How it works
            </Link>
            <Link
              href="#security"
              className="hover:opacity-70 font-normal text-base"
            >
              Security & Safety
            </Link>
            <Link
              href="#who"
              className="hover:opacity-70 font-normal text-base"
            >
              Who we are
            </Link>
          </nav>
        </div>
      </div>

      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/30 backdrop-blur-sm md:hidden"
        />
      )}
    </header>
  );
};

export default Header;
