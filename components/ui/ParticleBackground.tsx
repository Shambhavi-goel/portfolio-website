"use client";

import { useCallback } from "react";
import { ParticlesProvider, Particles } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Engine } from "@tsparticles/engine";

export default function ParticleBackground() {
  const init = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <ParticlesProvider init={init}>
      <Particles
        id="tsparticles"
        className="absolute inset-0 z-0"
        options={{
          background: { color: { value: "transparent" } },
          fpsLimit: 60,
          interactivity: {
            events: {
              onHover: { enable: true, mode: "repulse" },
              resize: { enable: true },
            },
            modes: { repulse: { distance: 70, duration: 0.4 } },
          },
          particles: {
            color: { value: ["#18181B", "#71717A", "#A1A1AA", "#D4D4D8"] },
            links: {
              color: "#E4E4E7",
              distance: 130,
              enable: true,
              opacity: 0.5,
              width: 1,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: { default: "bounce" },
              random: true,
              speed: 0.45,
              straight: false,
            },
            number: { density: { enable: true }, value: 38 },
            opacity: {
              value: { min: 0.08, max: 0.25 },
              animation: { enable: true, speed: 0.5, sync: false },
            },
            shape: { type: "circle" },
            size: { value: { min: 1, max: 2 } },
          },
          detectRetina: true,
        }}
      />
    </ParticlesProvider>
  );
}
