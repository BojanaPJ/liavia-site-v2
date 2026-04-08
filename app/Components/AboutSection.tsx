"use client";

import Image from "next/image";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ParticleSphere from "./ParticleSphere";

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Heading animation
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

      // Content paragraphs stagger
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

      // Image animation
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { opacity: 0, scale: 0.95 },
          {
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: imageRef.current,
              start: "top 85%",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="bg-primary relative z-40">
      <div ref={sectionRef} className="w-full max-w-7xl mx-auto   " id="who">
        <div className="w-full px-4 lg:px-0   flex flex-col lg:flex-row items-center gap-14 lg:gap-20">
          {/* LEFT CONTENT */}
          <div className="w-full lg:flex-[0_0_60%] flex flex-col justify-center text-center lg:text-left">
            <p className="text-lg mb-4 font-sans font-medium text-[#5a5640]">
              Who we are
            </p>

            {/* Heading */}
            <h1
              ref={headingRef}
              className="text-4xl lg:text-[54px] font-medium leading-[1.1] mb-6 text-footer-bg"
            >
              Turning{" "} 
              <span className="text-primary-gold">
                reality <br /> into perception          
              </span>
            </h1>

            {/* Content */}
            <div
              ref={contentRef}
              className="space-y-4 text-base lg:text-lg leading-[1.75] font-sans font-light text-[#3d3b2e]"
            >
              <p>
                Our founders joined forces in 2025 to develop a novel solution
                to{" "}
                <span className="  text-[#3d3b2e]">
                  the age-old problem:
                </span>{" "}
                <span className="  text-[#3d3b2e]">
                  Perception =&gt; Reality
                </span>
              </p>

              <p>
                With decades of combined experience across cognitive 
                behaviour research, strategy and change execution,
                we are on a mission to make:{" "}
                <span className="  text-[#3d3b2e]">
                  Reality =&gt; Perception
                </span>
                .
              </p>

              <p className="font-medium  text-footer-bg">
                Our mantra of getting there: Fast. Quiet. Relevant.
              </p>

              <p>
  It forms the basis of everything we do: how we operate, how we develop, and how we deliver. 
  In a world full of noise, we do not want to add to it. Instead, LiaVia hunts for truth that leads the way forward.
</p>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="w-full lg:w-5/12 flex items-stretch flex-1">
            {/* <div
              ref={imageRef}
              className="relative w-full h-75 md:h-100 lg:h-140 rounded-2xl overflow-hidden"
            >
              <Image
                src="/images/logo.png"
                alt="LiaVia Logo"
                fill
                className="object-contain"
              />
            </div> */}
            <div className="w-full       relative z-40">
              {" "}
              <ParticleSphere />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
