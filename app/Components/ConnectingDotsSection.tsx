"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionDotCanvas from "./SectionDots"; // the canvas component

gsap.registerPlugin(ScrollTrigger);

export default function CopenhagenSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const ctaRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 85%",
            },
          }
        );
      }

      if (contentRef.current) {
        gsap.fromTo(
          Array.from(contentRef.current.children),
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: {
              trigger: contentRef.current,
              start: "top 85%",
            },
          }
        );
      }

      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current,
          { opacity: 0, y: 20, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ctaRef.current,
              start: "top 90%",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="bg-primary relative font-serif">
      <div
        id="what"
        ref={sectionRef}
        className="max-w-7xl w-full mx-auto flex flex-col lg:flex-row items-stretch min-h-[90vh] overflow-hidden relative"
      >
        {/* Left Content */}
        <div className="px-4 lg:px-0 flex-1 pt-20 flex flex-col justify-center z-10 text-center lg:text-left max-w-2xl">
          <p className="text-lg mb-4 font-sans font-medium text-[#5a5640]">
            What we do
          </p>

          <h1
            ref={headingRef}
            className="text-4xl lg:text-[54px] font-medium leading-[1.1] mb-6 text-footer-bg"
          >
            Connecting{" "}
            <span className="text-primary-gold">
              perception
              <br />
              to execution momentum
            </span>
          </h1>

          <div
            ref={contentRef}
            className="space-y-4 text-base lg:text-lg leading-[1.75] font-sans font-light text-[#3d3b2e]"
          >
            <p>
              LiaVia exposes internal power dynamics and behaviours that shape
              execution momentum by analysing your organization’s communication
              patterns.
            </p>

            {/* Fixed quotes */}
            <p className="font-medium text-[#3d3b2e]">
              “Perception is reality”, they say
            </p>

            <p className="font-medium text-[#3d3b2e]">
              “Then let’s make sure our perception is objective and
              data-driven”, we say
            </p>

            <p>
              At the heart of our solution is an AI-powered, proprietary
              framework that draws on cognitive and organisational behaviour
              research to root your perceptions in your operational reality.
            </p>

            <p className="font-medium text-primary-gold">
              Because strong ideas need strong execution.
            </p>

            <p>
              You’ve set the course. Made the plan. Now use LiaVia to land it
              with precision.
            </p>

            <p className="text-sm text-[#5a5640]">
              Makes sense? We hope so. In any case, let’s talk.
            </p>
          </div>

          {/* CTA */}
          <div
            ref={ctaRef}
            className="mt-8 flex lg:justify-start justify-center"
          >
            <Link href="mailto:hello@liavia.ai" target="_blank">
              <button className="group relative inline-flex items-center overflow-hidden pr-3 rounded-full mt-8 bg-primary-gold hover:bg-dark-gold p-1 shadow-primary transition">
                <span className="relative z-10 flex items-center gap-2 py-1 px-3 font-bold text-white cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-arrow-right-icon lucide-arrow-right"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                  <span className="text-sm whitespace-nowrap font-normal">
                    let’s talk
                  </span>
                </span>
              </button>
            </Link>
          </div>
        </div>

        {/* Right Dot Canvas */}
        <SectionDotCanvas sectionId="what" />
      </div>
    </section>
  );
}
