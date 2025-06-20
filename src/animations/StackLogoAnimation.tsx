// components/StackLogoAnimation.tsx
"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { CSSPlugin } from "gsap/CSSPlugin";

gsap.registerPlugin(CSSPlugin);
gsap.config({ force3D: true });

const StackLogoAnimation = () => {
  const barsRef = useRef<HTMLDivElement[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(barsRef.current, {
        scale: (i) => 1 - i * 0.05,
        opacity: (i) => 1 - i * 0.15,
        y: (i) => i * -1,
        zIndex: (i) => 10 - i,
        backgroundColor: "#ffffff",
        transformOrigin: "center center",
      });

      const tl = gsap.timeline({ delay: 0.3 });

      tl.to(barsRef.current, {
        y: (i) => i * 36,
        scale: 1,
        opacity: 1,
        duration: 0.8,
        ease: "power2.inOut",
        stagger: 0.1,
      })

      .to(
        barsRef.current,
        {
          y: (i) => [
            -50,
            -15,
            0
          ][i],
          x: (i) => [
            -60,
            -20,
            30
          ][i],
          rotationZ: (i) => [
            -100,
            -70,
            -35
          ][i],
          duration: 0.8,
          ease: "back.out(1.5)",
        },
        "+=0.4"
      )
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-32 h-32">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          ref={(el) => {
            if (el) barsRef.current[i] = el;
          }}
          style={{
            transform: `translate(-50%, -50%) scale(${1 - i * 0.05})`,
            opacity: `${1 - i * 0.15}`,
            top: `calc(50% + ${i * -4}px)`,
            zIndex: `${10 - i}`,
            transformOrigin: "center center",
          }}
          className="absolute left-1/2 w-48 h-6 rounded bg-white"
        />
      ))}
    </div>
  );
};

export default StackLogoAnimation;
