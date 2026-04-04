"use client";

import { ModalProps } from "@/app/types/sectionTypes";
import Image from "next/image";
import { useState } from "react";

// ─── TYPES ────────────────────────────────────

// ─── CONTENT ──────────────────────────────────

const PRIVACY_CONTENT = {
  title: "Privacy Policy",
  sections: [
    {
      heading: null,
      body: "At LiaVia (`LiaVia`, `we`, `us`, or `our`), we take confidentiality and data protection seriously. This Privacy Policy describes how we collect and process your personal data when you are a user of our websites, supplier and business partner. This policy does not concern job applicants, as these receive a targeted privacy policy when applying for a job. LiaVia Ltd is the registered owner of the website www.liavia.ai and, as such, is responsible for processing the data associated with it.",
    },
    {
      heading: "What data we collect",
      body: null,
    },
    {
      heading: "Users of our website",
      body: "Technical Data: IP address, device type, operating system, browser type, and behaviour on our site. Communication Data: Emails, inquiries, or feedback sent to us. Purpose: To improve our services, ensure website functionality, provide relevant communication and services, enhance user experience, marketing and statistical analysis, and to answer inquiries sent to us.",
    },
    {
      heading: "Suppliers and business partners",
      body: "Identification Data: Name, job title, business email address, phone number. Professional Data: Company name, business address, department, primary responsibilities. Contractual Data: Purchase orders, invoices, agreements, and communication records. Verification Data: Copies of identity documents for compliance purposes.",
    },
    {
      heading: "Legal basis for processing",
      body: "We process personal data under GDPR bases: Legitimate Interests (Art. 6(1)(f)) for improving services and analytics. Contractual Obligations (Art. 6(1)(b)) when delivering requested services. Legal Compliance (Art. 6(1)(c)) as required by law.",
    },
    {
      heading: "Retention",
      body: "We retain data only for as long as necessary to fulfil the purposes for which it was collected. Upon request for deletion, we will aim to process and fulfil the request within 30 days, provided no legal or contractual obligations prevent the deletion.",
    },
    {
      heading: "Your rights",
      body: "You have the right to access your data, request correction or deletion, restrict processing, object to processing, and data portability. To exercise any of these rights, please contact us at hello@liavia.ai. If you believe your rights have been violated, you can lodge a complaint with the relevant Data Protection Authority. In Denmark, this is Datatilsynet.",
    },
    {
      heading: "Sharing your data",
      body: "We share data only to the extent necessary and in compliance with applicable data protection regulations. We work with trusted third-party service providers for data storage, processing, and analysis. These third parties act solely on our behalf and are prohibited from using your data for their own purposes. In certain cases, we may share your data to comply with legal obligations or court orders.",
    },
  ],
};

const COOKIE_CONTENT = {
  title: "Cookie Policy",
  sections: [
    {
      heading: null,
      body: "We use cookies to personalise content and ads, to provide social media features and to analyse our traffic. We also share information about your use of our site with our social media, advertising and analytics partners who may combine it with other information that you've provided to them or that they've collected from your use of their services.",
    },
    {
      heading: "What are cookies",
      body: "Cookies are small text files that can be used by websites to make a user's experience more efficient. The law states that we can store cookies on your device if they are strictly necessary for the operation of this site. For all other types of cookies we need your permission.",
    },
    {
      heading: "How we use cookies",
      body: "This site uses different types of cookies. Some cookies are placed by third party services that appear on our pages. We use cookies to recognise users during repeated visits and to collect information about them. This helps us customise and improve our website as well as target our marketing efforts toward content that is relevant to users. Cookies are also used for traffic measurement.",
    },
    {
      heading: "Your choices",
      body: "You can at any time change or withdraw your consent from the Cookie Declaration on our website. Please state your consent ID and date when you contact us regarding your consent. Learn more about how you can contact us and how we process personal data in our Privacy Policy.",
    },
  ],
};

// ─── MODAL ────────────────────────────────────

function Modal({ title, onClose, children }: ModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 sm:p-8"
      style={{ background: "rgba(0,0,0,0.5)" }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl max-h-[80vh] rounded-2xl flex flex-col overflow-hidden"
        style={{ background: "#eae6dc" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal header */}
        <div
          className="flex items-center justify-between px-7 py-5 border-b shrink-0"
          style={{ borderColor: "rgba(30,29,24,0.12)" }}
        >
          <h2 className="text-xl font-normal">{title}</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:opacity-70"
            style={{ background: "rgba(30,29,24,0.08)", color: "#1e1d18" }}
            aria-label="Close"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M2 2l10 10M12 2L2 12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Modal body */}
        <div className="overflow-y-auto px-7 py-6 flex flex-col gap-5">
          {children}
        </div>
      </div>
    </div>
  );
}

function PolicyContent({
  sections,
}: {
  sections: { heading: string | null; body: string | null }[];
}) {
  return (
    <>
      {sections.map((s, i) => (
        <div key={i} className="flex flex-col gap-1.5">
          {s.heading && (
            <h3 className="text-sm font-semibold" style={{ color: "#1e1d18" }}>
              {s.heading}
            </h3>
          )}
          {s.body && (
            <p className="text-sm leading-relaxed" style={{ color: "#5a5640" }}>
              {s.body}
            </p>
          )}
        </div>
      ))}
    </>
  );
}

// ─── FOOTER ───────────────────────────────────

export default function Footer() {
  const [openModal, setOpenModal] = useState<"privacy" | "cookie" | null>(null);

  return (
    <>
      <footer className="bg-primary relative z-40">
        <div className="px-4 w-full max-w-7xl mx-auto lg:px-0 py-16 pt-20 text-center   lg:text-left">
          <div
            className="w-full h-px mb-12"
            style={{ background: "rgba(30,29,24,0.12)" }}
          />

          {/* Top Content: Left & Right */}
          <div
            className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-14 pb-14 border-b"
            style={{ borderColor: "rgba(255,255,255,0.08)" }}
          >
            {/* Left Content */}
            <div className="flex-1 lg:pr-8">
              <p className="text-sm tracking-[0.12em] uppercase mb-4 text-footer-bg font-medium">
                Contact
              </p>

              <h2 className="text-[38px] md:text-[56px] font-normal leading-[1.1] mb-6 text-footer-bg">
                Design Your Momentum
              </h2>

              <a
                href="mailto:hello@liavia.ai"
                className="inline-flex items-center gap-2 text-base transition-opacity hover:opacity-70 mb-6"
              >
                hello@liavia.ai
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M3 7h8M7 3l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>

            {/* Right Content */}
            <div className="shrink-0 w-37 lg:w-70 mx-auto lg:mx-0">
              <Image
                src="/images/logo.png"
                alt="LiaVia Logo"
                width={240}
                height={240}
                className="object-contain"
              />
            </div>
          </div>

          {/* Bottom: Legal Row */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-footer-bg">
            <p className="text-xs">
              © {new Date().getFullYear()} LiaVia Ltd. All rights reserved.
            </p>

            <div className="flex items-center gap-6 justify-center lg:justify-start">
              <button
                onClick={() => setOpenModal("privacy")}
                className="text-xs transition-opacity hover:opacity-70 cursor-pointer"
              >
                Privacy Policy
              </button>
              <button
                onClick={() => setOpenModal("cookie")}
                className="text-xs transition-opacity hover:opacity-70 cursor-pointer"
              >
                Cookie Policy
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {openModal === "privacy" && (
        <Modal title={PRIVACY_CONTENT.title} onClose={() => setOpenModal(null)}>
          <PolicyContent sections={PRIVACY_CONTENT.sections} />
        </Modal>
      )}

      {openModal === "cookie" && (
        <Modal title={COOKIE_CONTENT.title} onClose={() => setOpenModal(null)}>
          <PolicyContent sections={COOKIE_CONTENT.sections} />
        </Modal>
      )}
    </>
  );
}
