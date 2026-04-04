"use client";

import { JSX, useEffect, useRef } from "react";
import * as THREE from "three";

export default function ParticleSphere(): JSX.Element {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 3;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // ==============================
    // 🌍 PARTICLES
    // ==============================
    const count = 5000;
    const radius = 1.2;

    const positions: number[] = [];
    const originalPositions: number[] = [];

    for (let i = 0; i < count; i++) {
      const i2 = i + 0.5;

      const phi = Math.acos(1 - (2 * i2) / count);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i2;

      let x = radius * Math.cos(theta) * Math.sin(phi);
      let y = radius * Math.sin(theta) * Math.sin(phi);
      let z = radius * Math.cos(phi);

      const lat = y / radius;
      const noise = Math.sin(theta * 0.5) * Math.cos(phi * 2);

      // create gaps
      if (Math.random() > 0.6 + noise * 0.2 + Math.abs(lat) * 0.3) continue;

      const variation = 1 + Math.random() * 0.05;

      x *= variation;
      y *= variation;
      z *= variation;

      positions.push(x, y, z);
      originalPositions.push(x, y, z);
    }

    const geometry = new THREE.BufferGeometry();
    const positionAttr = new THREE.Float32BufferAttribute(positions, 3);
    geometry.setAttribute("position", positionAttr);

    // ==============================
    // 🎨 MATERIAL WITH CUSTOM COLORS
    // ==============================
    const BASE_COLOR = new THREE.Color("#B17F15"); // golden
    const HOVER_COLOR = new THREE.Color("#8C640F"); // darker gold

    const material = new THREE.PointsMaterial({
      color: BASE_COLOR,
      size: 0.012,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // ==============================
    // 🖱️ MOUSE INTERACTION
    // ==============================
    const mouse = new THREE.Vector2(999, 999); // offscreen initially
    const raycaster = new THREE.Raycaster();

    container.addEventListener("mousemove", (e) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    });

    container.addEventListener("mouseleave", () => {
      mouse.x = 999;
      mouse.y = 999;
    });

    // ==============================
    // 🎬 ANIMATION
    // ==============================
    const clock = new THREE.Clock();
    const interactionRadius = 0.15;

    const animate = () => {
      requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // slow rotation
      points.rotation.y = elapsed * 0.12;

      // raycast
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObject(points);
      let mousePoint: THREE.Vector3 | null = null;
      if (intersects.length > 0) mousePoint = intersects[0].point;

      const posArray = positionAttr.array as Float32Array;

      for (let i = 0; i < posArray.length; i += 3) {
        const ox = originalPositions[i];
        const oy = originalPositions[i + 1];
        const oz = originalPositions[i + 2];

        let nx = ox;
        let ny = oy;
        let nz = oz;

        if (mousePoint) {
          const dx = ox - mousePoint.x;
          const dy = oy - mousePoint.y;
          const dz = oz - mousePoint.z;

          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
          if (dist < interactionRadius) {
            const force = (interactionRadius - dist) * 0.3;
            nx += (mousePoint.x - ox) * force;
            ny += (mousePoint.y - oy) * force;
            nz += (mousePoint.z - oz) * force;

            // lerp color toward hover
            material.color.lerp(HOVER_COLOR, 0.05);

            // slightly larger
            material.size += (0.02 - material.size) * 0.05;
          }
        }

        // smooth return
        posArray[i] += (nx - posArray[i]) * 0.1;
        posArray[i + 1] += (ny - posArray[i + 1]) * 0.1;
        posArray[i + 2] += (nz - posArray[i + 2]) * 0.1;
      }

      // reset when not interacting
      if (!mousePoint) {
        material.size += (0.012 - material.size) * 0.05;
        material.color.lerp(BASE_COLOR, 0.05);
      }

      positionAttr.needsUpdate = true;
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="w-full bg-primary " id="particle">
      <div
        ref={mountRef}
        className="
          w-full 
          h-70      
          sm:h-90      
          md:h-105     
          lg:h-130      
          xl:h-135
       
         "
      />
    </div>
  );
}
