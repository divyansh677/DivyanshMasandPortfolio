"use client";
import React, { useId, useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import type { Container } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import { motion, useAnimation } from "framer-motion";
import { cn } from "@/lib/utils";

type ParticlesProps = {
  id?: string;
  className?: string;
  background?: string;
  particleSize?: number;
  minSize?: number;
  maxSize?: number;
  speed?: number;
  particleColor?: string;
  particleDensity?: number;
  children?: React.ReactNode;
};

export const SparklesCore = (props: ParticlesProps) => {
  const {
    id,
    className,
    background,
    minSize,
    maxSize,
    speed,
    particleColor,
    particleDensity,
    children,
  } = props;

  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const controls = useAnimation();

  const particlesLoaded = async (container?: Container) => {
    if (container) {
      controls.start({
        opacity: 1,
        transition: { duration: 1 },
      });
    }
  };

  const generatedId = useId();

  return (
    <motion.div
      animate={controls}
      className={cn("relative w-full h-full opacity-0", className)}
      style={{ zIndex: 0 }}
    >
      {init && (
        <Particles
          id={id || generatedId}
          className="absolute inset-0 w-full h-full pointer-events-none"
          particlesLoaded={particlesLoaded}
          options={{
            background: { color: { value: "transparent" } },
            fullScreen: { enable: false, zIndex: -1 },
            fpsLimit: 120,
            interactivity: {
              events: { onClick: { enable: true, mode: "push" } },
              modes: { push: { quantity: 4 } },
            },
            particles: {
              color: { value: particleColor || "#ffffff" },
              move: {
                enable: true,
                speed: speed || 1,
                direction: "none",
                outModes: { default: "out" },
              },
              number: {
                density: { enable: true, width: 400, height: 400 },
                value: particleDensity || 100,
              },
              opacity: {
                value: { min: 0.1, max: 0.5 },
                animation: { enable: true, speed: 1, startValue: "random" },
              },
              shape: { type: "circle" },
              size: {
                value: { min: minSize || 1, max: maxSize || 3 },
                animation: { enable: true, speed: 3, startValue: "random" },
              },
            },
            detectRetina: true,
          }}
        />
      )}
      <div
        className="relative z-10 w-full h-full"
        style={{
          backdropFilter: "blur(0px)", // Adjust blur if desired
          background: "transparent",
        }}
      >
        {children}
      </div>
    </motion.div>
  );
};
