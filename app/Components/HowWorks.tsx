"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BulletItem, ProcessStep, ProductSection } from "../types/sectionTypes";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────────────────────────────────────────
//  CONTENT
// ─────────────────────────────────────────────────────────────────────────────

const imageOverlayText =
  "LiaVia exposes internal dynamics and behaviours that will shape execution momentum of your plans";

const intro =
  "LiaVia exposes internal power dynamics and behaviours that will shape execution momentum by analysing your organization's communication patterns.";

const diagnostics: ProductSection = {
  tag: "LiaVia Diagnostics",
  // ✅ CLIENT: removed "roll-out" from sub-heading
  headline:
    "One-off diagnostic report that will show gap-to-cover between your strategic plan and your organisation's true execution capacity.",
  // ✅ CLIENT: subheadline same size/font as headline — no bold
  subheadline: "No noise. No disruptions. No extra work.",
  pills: ["Fast", "Quiet", "Relevant"],
  bullets: [
    // ✅ CLIENT: no bold anywhere except "What it takes" title
    {
      label: "What will slow you down",
      detail: "Bottlenecks and frictions already forming",
    },
    {
      label: "Why these keep happening",
      detail:
        "Uncover your power silos and unspoken values influencing follow-through",
    },
    {
      label: "How to fix it NOW",
      detail: "Concrete action to clear your roadblocks and remove drag",
    },
  ],
  whenToUse: undefined,
  steps: [
    {
      duration: "60m",
      title: "Context Scoping",
      subtitle: "confidential alignment",
    },
    {
      duration: "6d",
      title: "Sample Analysis",
      subtitle: "on site, GDPR compliant",
    },
    {
      duration: "60m",
      title: "Diagnostics",
      subtitle: "presentation + report",
    },
  ],
};

const app: ProductSection = {
  tag: "LiaVia App",
  headline:
    "Ring-fenced AI layer that sits on top of your internal comms systems turning your communication into action.",
  // ✅ CLIENT: same size/font as headline — no bold
  subheadline: "No noise. No extra work. Seamless integration.",
  pills: ["Fast", "Quiet", "Relevant"],
  bullets: [],
  continuousLevels: [
    {
      label: "Overview for Executives",
      detail: "MRI of your organisation's power silos and daily focus insights",
    },
    {
      label: "Execution Forecast for PMs",
      detail:
        "Data-driven predictor of upcoming bottlenecks, frictions and unspoken feedback that are about to derail execution success",
    },
    {
      label: "Success Game for Employees",
      detail:
        "Confidential, fully customised career plan matching their ambitions and abilities to your organisation's needs. Requires individual opt-in",
    },
  ],
  footerNote:
    "Continuous insights across 3 core levels, delivered on a strict need-to-know basis.",
  // ✅ CLIENT: changed to circles+line like Diagnostics, 3 steps only, numbers 1-2-3 inside circles
  steps: [
    {
      duration: "1",
      title: "LiaVia Calibrated For You",
      subtitle: "downloaded on your server",
    },
    {
      duration: "2",
      title: "Communication Data Ingested",
      subtitle: "anonymised pattern analysis",
    },
    {
      duration: "3",
      title: "Insights + Risk Detection",
      subtitle: "delivered to nominated contacts"
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
//  PILL
// ─────────────────────────────────────────────────────────────────────────────

function Pill({ label }: { label: string }) {
  return (
    <span
      className="inline-block px-3 py-1 rounded-full text-[11px] tracking-wide border"
      style={{
        color: "#1e1d18",
        borderColor: "rgba(173,120,28,0.35)",
        fontFamily: "var(--font-primary)",
      }}
    >
      {label}
    </span>
  );
}

function BulletRow({ item }: { item: BulletItem }) {
  return (
    <li className="flex gap-3 items-start py-1">
      <span
        className="shrink-0 w-1.5 h-1.5 rounded-full"
        style={{ background: "#AD781C", marginTop: "9px" }}
      />
      {/* ✅ CLIENT: no bold — same font size/weight as "What we do" body */}
      <p className="text-[14px] leading-relaxed" style={{ color: "#3d3b2e" }}>
        {item.label}
        {" — "}
        <span style={{ color: "#5a5640" }}>{item.detail}</span>
      </p>
    </li>
  );
}

function Timeline({ steps, title }: { steps: ProcessStep[]; title: string }) {
  return (
    <div className="mt-5">
      {/* ✅ CLIENT: only "What it takes" and "From access to action" stay bold */}
      <p className="text-[14px]  font-bold mb-3 leading-relaxed" style={{ color: "#3d3b2e" }}>
        {title}
      </p>
      <div className="flex flex-col sm:flex-row">
        {steps.map((step, i) => (
          <div
            key={i}
            className="flex sm:flex-col flex-row gap-3 sm:gap-0 sm:flex-1 relative"
          >
            {/* Connector line (desktop) */}
            {i < steps.length - 1 && (
              <div
                className="hidden sm:block absolute top-5 left-1/2 w-full h-px z-0"
                style={{ background: "rgba(173,120,28,0.25)" }}
              />
            )}
            {/* Circle with number */}
            <div className="relative z-10 flex sm:justify-center sm:mb-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-[12px] font-extralight shrink-0 text-white"
                style={{
                  background: "#AD781C",
                  fontFamily: "var(--font-primary)",
                }}
              >
                {step.duration}
              </div>
            </div>
            {/* Labels — no bold */}
            <div className="sm:text-center pb-5 sm:pb-0 sm:px-2">
              <p
                className="text-[13px] leading-tight"
                style={{ color: "#1e1d18" }}
              >
                {step.title}
              </p>
              <p
                className="text-[12px] mt-0.5 leading-tight"
                style={{ color: "#5a5640" }}
              >
                {step.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  PRODUCT CARD
// ─────────────────────────────────────────────────────────────────────────────

function ProductCard({
  product,
  animRef,
  wider = false,
}: {
  product: ProductSection;
  animRef: React.RefObject<HTMLDivElement | null>;
  wider?: boolean;
}) {
  const isApp = product.tag === "LiaVia App";

  return (
    <div
      ref={animRef}
      className={`rounded-2xl p-8 md:p-10 flex flex-col gap-5 ${
        wider ? "lg:col-span-8" : "lg:col-span-4"
      }`}
      style={{
        background: "rgba(255,255,255,0.45)",
        border: "1px solid rgba(173,120,28,0.35)", // ✅ CLIENT: golden-brown outline
      }}
    >
      {/* Logo + tag name */}
      <div className="flex items-center gap-2">
        <Image
          src="/images/logo-1.png"
          width={40}
          height={40}
          alt="LiaVia logo"
        />
        {/* ✅ CLIENT: no bold on tag — same font as rest */}
        <h5 className="text-2xl font-bold" style={{ color: "#1e1d18" }}>
          {product.tag}
        </h5>
      </div>

      {/* Headline — no bold */}
      {/* ✅ CLIENT: same font size/type as "What we do" body text */}
      <p
        className="text-[14px] leading-relaxed"
        style={{ color: "#3d3b2e" }}
      >
        {product.headline}
      </p>

      {/* Subheadline — same size as headline, no bold */}
      {/* ✅ CLIENT: "No noise..." same size/font as headline sentence above */}
      <p
        className="text-[14px] leading-relaxed"
        style={{ color: "#3d3b2e" }}
      >
        {product.subheadline}
      </p>

      {/* Pills */}
      <div className="flex gap-2 flex-wrap">
        {product.pills.map((p) => (
          <Pill key={p} label={p} />
        ))}
      </div>

      {/* Diagnostics bullets — no bold on labels */}
      {product.bullets.length > 0 && (
        <div>
          {/* ✅ CLIENT: "In under a week" label — no bold */}
          <p
            className="text-[14px] leading-relaxed"
            style={{ color: "#3d3b2e" }}
          >
            In under a week, uncover:
          </p>
          <ul className="flex flex-col">
            {product.bullets.map((b, i) => (
              <BulletRow key={i} item={b} />
            ))}
          </ul>
        </div>
      )}

      {/* Diagnostics: "What it takes" timeline — circles+line */}
      {!isApp && product.steps && (
        <Timeline steps={product.steps} title="What it takes" />
      )}

      {/* App: continuous levels — no bold */}
      {isApp && product.continuousLevels && (
        <div>
          {product.footerNote && (
            <p className="text-lg " style={{ color: "#3d3b2e" }}>
              {product.footerNote}
            </p>
          )}
          <ul className="flex flex-col">
            {product.continuousLevels.map((b, i) => (
              <BulletRow key={i} item={b} />
            ))}
          </ul>
        </div>
      )}

      {/* ✅ CLIENT: App timeline now circles+line (same as Diagnostics), 3 steps, numbers 1-2-3 */}
      {isApp && product.steps && (
        <Timeline
          steps={product.steps}
          title="From access to action, automatically"
        />
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  MAIN SECTION
// ─────────────────────────────────────────────────────────────────────────────

export default function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: { trigger: headingRef.current, start: "top 85%" },
        }
      );
      [card1Ref.current, card2Ref.current].forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power2.out",
            delay: i * 0.15,
            scrollTrigger: { trigger: el, start: "top 88%" },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="how" className="bg-primary relative z-40">
      {/* ── Body ── */}
      <div className="max-w-7xl w-full mx-auto">
        <div className="px-4 lg:px-0 py-20 ">
          <div ref={headingRef} className="mb-14 max-w-2xl">
            {/* ✅ CLIENT: "How it works" label — same size as "What we do" label */}
            <p
              className="text-lg mb-4 font-medium lg:text-left text-center"
              style={{ color: "#5a5640" }}
            >
              How it works
            </p>

            <h2 className="text-[42px] md:text-[56px] font-normal leading-[1.1] mb-6 lg:text-left text-center">
              Two ways to{" "}
              <span style={{ color: "#AD781C" }}>unlock your execution</span>{" "}
              potential
            </h2>

            {/* ✅ CLIENT: same font size as "What we do" body — text-[15px], no bold */}
            <p
              className="text-lg  lg:text-left text-center"
              style={{ color: "#3d3b2e" }}
            >
              {intro}
            </p>
          </div>

          {/* ✅ CLIENT: App box slightly wider — 5/12 + 7/12 col split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <ProductCard
              product={diagnostics}
              animRef={card1Ref}
              wider={false}
            />
            <ProductCard product={app} animRef={card2Ref} wider={true} />
          </div>
        </div>
      </div>
    </section>
  );
}
