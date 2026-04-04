"use client";

import Link from "next/link";

export default function VideoHero() {
  return (
    <section className="bg-primary">
      <div className="  flex items-center justify-start relative z-40">
        <div className="relative w-full     h-[60vh] sm:h-[70vh] lg:h-[75vh] overflow-hidden  ">
          {/* Background Video */}
          <video
            className="absolute inset-0 w-full h-full object-cover"
            src="/videos/network-video.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/10"></div>

          {/* Content */}
          <div className="relative z-10 grid h-full grid-rows-[1fr_auto_1fr] text-white px-4   lg:px-6">
            {/* Center Title */}
            <div className="row-start-2 gap-y-2 lg:gap-y-0 flex flex-col items-center justify-center text-center px-2">
              <h1
                className="font-serif font-light leading-[1.05]
          text-4xl   lg:text-[94px]"
              >
                Momentum. By Design.
              </h1>

              <Link href="mailto:hello@liavia.ai" target="_blank">
                <button className="group relative inline-flex items-center overflow-hidden   pr-3 rounded-full    w-40   p-1">
                  {/* Expanding bg */}
                  <span className="absolute left-1  h-10 w-10 rounded-full  bg-primary-gold hover:bg-dark-gold     transition-all duration-300 ease-in-out group-hover:w-[calc(100%-0.5rem)]"></span>

                  {/* Content */}
                  <span className="relative z-10 flex items-center gap-3 py-1 pl-1 font-bold  text-white cursor-pointer">
                    <span className="flex h-8 w-8 items-center justify-center">
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
                    </span>

                    <span className="whitespace-nowrap text-sm font-normal">
                      See how it works
                    </span>
                  </span>
                </button>
              </Link>
            </div>

            {/* Bottom Row */}
            <div className="row-start-3 lg:flex-row flex-col flex items-start justify-end gap-3 lg:items-end lg:justify-between pb-6 sm:pb-8">
              {/* Scroll */}

              <div className="flex items-center gap-2 text-sm sm:text-base md:text-lg">
                <Link
                  href="#who"
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-arrow-down-icon lucide-arrow-down animate-arrow-down"
                  >
                    <path d="M12 5v14" />
                    <path d="m19 12-7 7-7-7" />
                  </svg>
                  <span>Scroll</span>
                </Link>
              </div>
              <div>
                <p
                  className="w-full  
          text-xs   lg:text-[18px] font-normal max-w-4xl "
                >
                  Strategy sets direction. Execution sets trajectory.
                  <br />
                  LiaVia maps your true delivery capacity so your momentum
                  compounds, not dissipates.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
