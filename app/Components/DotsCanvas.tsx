"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ✅ Adaptive particle count (mobile friendly)
const getCount = () => (window.innerWidth < 768 ? 900 : 2000);

// ✅ Exact palette (unchanged)
const PALETTES = [
  [199, 147, 40],
  [173, 120, 28],
  [140, 95, 15],
  [210, 170, 80],
  [255, 245, 220],
  [240, 220, 170],
  [160, 110, 50],
  [120, 75, 30],
  [190, 140, 70],
];

interface Dot {
  ox: number;
  oy: number;
  tx: number;
  ty: number;
  x: number;
  y: number;
  size: number;
  alpha: number;
  color: number[];
}

function blobShape(t: number) {
  return (
    1 +
    0.22 * Math.cos(2 * t) +
    0.15 * Math.cos(3 * t + 0.5) +
    0.1 * Math.cos(5 * t - 0.3) +
    0.08 * Math.cos(7 * t + 1.2) +
    0.06 * Math.sin(4 * t + 0.8) +
    0.05 * Math.cos(9 * t - 0.9)
  );
}

export default function GlobalDotCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotsRef = useRef<Dot[]>([]);
  const progressRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    let COUNT = getCount();

    // ✅ Device pixel ratio fix (sharp + performant)
    const setSize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);

      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;

      canvas.style.width = "100vw";
      canvas.style.height = "100vh";

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    setSize();

    // ✅ Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // ✅ Generate dots
    const generateDots = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;

      const cx = w * 0.75;
      const cy = h * 0.5;
      const radius = w * 0.22;

      dotsRef.current = Array.from({ length: COUNT }, () => {
        const t = Math.random() * Math.PI * 2;
        const r = Math.sqrt(Math.random()) * blobShape(t);

        const ox = cx + Math.cos(t) * r * radius;
        const oy = cy + Math.sin(t) * r * radius * 0.7;

        return {
          ox,
          oy,
          tx: Math.random() * w,
          ty: Math.random() * h,
          x: ox,
          y: oy,
          size: 1 + Math.random() * 1.5,
          alpha: 0.5 + Math.random() * 0.5,
          color: PALETTES[Math.floor(Math.random() * PALETTES.length)],
        };
      });
    };

    generateDots();

    // ✅ Scroll animation
    ScrollTrigger.create({
      trigger: "#what",
      start: "top top",
      end: "bottom top",
      scrub: 1.5,
      onUpdate: (self) => {
        progressRef.current = self.progress;
      },
    });

    // ✅ Draw loop
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const progress = progressRef.current;
      const mouse = mouseRef.current;

      for (const d of dotsRef.current) {
        const targetX = d.ox + (d.tx - d.ox) * progress;
        const targetY = d.oy + (d.ty - d.oy) * progress;

        // ✅ base movement
        d.x += (targetX - d.x) * 0.08;
        d.y += (targetY - d.y) * 0.08;

        // ✅ hover interaction (LOCAL only)
        const dx = mouse.x - d.x;
        const dy = mouse.y - d.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        const influenceRadius = 80; // 👈 only nearby particles

        if (dist < influenceRadius) {
          const force = (1 - dist / influenceRadius) * 0.3;

          d.x += dx * force * 0.08;
          d.y += dy * force * 0.08;
        }

        const [r, g, b] = d.color;

        ctx.beginPath();
        ctx.arc(d.x, d.y, d.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${d.alpha})`;
        ctx.fill();
      }

      requestAnimationFrame(draw);
    };

    draw();

    // ✅ Resize handling (optimized)
    const handleResize = () => {
      COUNT = getCount();
      setSize();
      generateDots();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 20,
      }}
    />
  );
}
