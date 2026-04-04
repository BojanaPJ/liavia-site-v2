"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

// ─── TYPES ────────────────────────────────────

interface SecurityPillar {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface ComplianceBadge {
  label: string;
}

// ─── CONTENT ──────────────────────────────────

const intro =
  "LiaVia is built on a foundation of strict data governance. We analyse patterns — not people. Everything runs on a need-to-know basis, and nothing leaves your environment without your explicit consent.";

const pillars: SecurityPillar[] = [
  {
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 22 22" fill="none">
        <path
          d="M11 2L3 6v5c0 4.42 3.42 8.56 8 9.56C16.58 19.56 20 15.42 20 11V6L11 2z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M8 11l2 2 4-4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Ring-fenced AI solution",
    description:
      "LiaVia operates as an isolated layer on top of your existing communication infrastructure, trained for a very specific analysis. No prompting, scope adjustment or information sharing / pooling, ever.",
  },
  {
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 22 22" fill="none">
        <rect
          x="3"
          y="10"
          width="16"
          height="10"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M7 10V7a4 4 0 118 0v3"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="11" cy="15" r="1.5" fill="currentColor" />
      </svg>
    ),
    title: "Strict need-to-know access",
    description:
      "Insights are delivered only to the role you identified and pre-approved. Executives see aggregate patterns, PMs see execution forecasts, employees see only their own career data. No cross-contamination.",
  },
  {
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 22 22" fill="none">
        <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M11 7v4l3 2"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
    title: "GDPR compliant by design",
    description:
      "All analysis is conducted on-site and in full compliance with GDPR. Data minimisation, purpose limitation, and retention controls are built into the core product — not bolted on.",
  },
  {
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 22 22" fill="none">
        <path
          d="M3 8l8-5 8 5v9a1 1 0 01-1 1H4a1 1 0 01-1-1V8z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M9 21V12h4v9"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "On-site analysis",
    description:
      "The diagnostic runs inside your environment be it Microsoft or some provider’s cloud tenancy. Raw communication data is never extracted or transmitted externally. Only the structured insight output is surfaced to your team.",
  },
  {
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 22 22" fill="none">
        <path
          d="M4 4h6v6H4zM12 4h6v6h-6zM4 12h6v6H4zM12 12h6v6h-6z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "You own your data",
    description:
      "LiaVia never claims ownership of your communications or outputs. Your data remains yours. You decide on the access, for how long, and when it is deleted.",
  },
  {
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 22 22" fill="none">
        <path
          d="M12 2a10 10 0 100 20A10 10 0 0012 2z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M2 12h4M16 12h4M12 2v4M12 16v4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
    title: "No third-party data sharing",
    description:
      "Your organisational data is never shared with, sold to, or used to train models for third parties. LiaVia's AI operates exclusively in service of your insights.",
  },
];

const badges: ComplianceBadge[] = [
  { label: "GDPR Compliant" },
  { label: "Data Stays On-Site" },
  { label: "No Data Pooling" },
  { label: "Zero Retention Default" },
  { label: "Individual Opt-In" },
  { label: "Encrypted in Transit" },
];

// ─── SUB-COMPONENTS ───────────────────────────

function PillarCard({
  pillar,
  animRef,
}: {
  pillar: SecurityPillar;
  animRef: (el: HTMLDivElement | null) => void;
}) {
  return (
    <div
      ref={animRef}
      className="rounded-2xl p-6 flex flex-col gap-4 bg-white/50 border border-gray-200"
    >
      <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-primary-gold text-white">
        {pillar.icon}
      </div>
      <h3 className="text-xl font-semibold leading-snug">{pillar.title}</h3>
      <p className="text-[14px] leading-relaxed" style={{ color: "#3d3b2e" }}>
        {pillar.description}
      </p>
    </div>
  );
}

function Badge({ label }: { label: string }) {
  return (
    <span
      style={{ fontFamily: "var(--font-primary)" }}
      className="inline-flex   items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium tracking-wide border border-gray-200 text-[#1e1d18]"
    >
      <p className="w-1.5 h-1.5 rounded-full shrink-0 bg-footer-bg" />
      {label}
    </span>
  );
}

// ─── MAIN SECTION ─────────────────────────────

export default function SecuritySafety() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

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

      gsap.fromTo(
        badgesRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: badgesRef.current, start: "top 88%" },
        }
      );

      cardRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: "power2.out",
            delay: (i % 3) * 0.1,
            scrollTrigger: { trigger: el, start: "top 90%" },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="security"
      className="bg-primary relative z-40 "
    >
      <div className="w-full max-w-7xl mx-auto bg-primary px-4 md:px-0 pb-20   ">
        {/* Header */}
        <div ref={headingRef} className="mb-10 max-w-full">
          <p className="text-lg font-sans font-medium text-[#5a5640] mb-4 lg:text-left text-center">
            Security &amp; Safety
          </p>

          <h2 className="text-[42px] md:text-[56px] font-normal leading-[1.1] mb-6 max-w-full lg:text-left text-center">
            Your{" "}
            <span className="text-primary-gold">data stays 100% safe,</span>{" "}
            GDPR compliant and under your control & ownership
          </h2>

          <p
            className="text-lg  lg:text-left text-center"
            style={{ color: "#3d3b2e" }}
          >
            {intro}
          </p>
        </div>

        {/* Compliance badges */}
        <div
          ref={badgesRef}
          className="flex flex-wrap gap-2 justify-center mb-12"
        >
          {badges.map((b) => (
            <Badge key={b.label} label={b.label} />
          ))}
        </div>

        {/* Pillar grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {pillars.map((pillar, i) => (
            <PillarCard
              key={i}
              pillar={pillar}
              animRef={(el) => (cardRefs.current[i] = el)}
            />
          ))}
        </div>

        {/* Bottom reassurance bar */}
        <div className="mt-12 rounded-2xl px-8 py-6 flex flex-col sm:flex-row sm:items-center gap-4 bg-primary-gold">
          <div className="flex-1">
            <p className="text-sm font-semibold text-white mb-1">
              Questions about how we handle your data?
            </p>
            <p className="text-sm text-white/60">
              We're happy to walk you through our security architecture before
              you commit to anything.
            </p>
          </div>
          <Link
            href="mailto:hello@liavia.ai"
            target="_blank"
            className="inline-flex items-center bg-white text-black w-32 gap-2 px-5 py-2.5 rounded-full text-sm font-medium shrink-0 transition-opacity "
          >
            Talk to us
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M3 7h8M7 3l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
