"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function HowItWorksSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const wrapper = wrapperRef.current;
    const heading = headingRef.current;

    if (!section || !wrapper || !heading) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        wrapper,
        { width: "55%", borderRadius: "28px" },
        {
          width: "100%",
          borderRadius: "0px",
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "top top",
            scrub: 1,
          },
        }
      );

      gsap.fromTo(
        heading,
        { y: 0 },
        {
          y: -150,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 50%",
            end: "top top",
            scrub: 1,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-primary">
      <div className="max-w-7xl w-full mx-auto flex justify-center items-center pt-20 relative z-40">
        <div
          ref={wrapperRef}
          className="relative overflow-hidden h-125 w-full mx-4 lg:mx-0 rounded-4xl! will-change-[width,border-radius]"
        >
          <Image
            src="/images/abstract-representation.jpg"
            alt="Abstract network visualization"
            fill
            sizes="100vw"
            className="object-cover object-top brightness-125"
            priority
          />

          {/* Lightened premium overlay */}
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/5 to-black/10" />

          {/* Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            <h2
              ref={headingRef}
              className="text-[42px] lg:text-[56px] font-normal leading-[1.1] text-white max-w-225"
            >
              LiaVia exposes internal dynamics and behaviours that shape the
              execution momentum of your plans
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}
