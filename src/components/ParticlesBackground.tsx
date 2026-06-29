import { useCallback, useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";

export function ParticlesBackground() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setReady(true));
  }, []);

  const options: ISourceOptions = {
    fullScreen: { enable: false },
    background: { color: "transparent" },
    fpsLimit: 60,
    detectRetina: true,
    interactivity: {
      events: {
        onHover: { enable: true, mode: "grab" },
        onClick: { enable: true, mode: "push" },
      },
      modes: {
        grab: { distance: 180, links: { opacity: 0.6 } },
        push: { quantity: 3 },
      },
    },
    particles: {
      color: { value: ["#c084fc", "#67e8f9", "#86efac"] },
      links: {
        enable: true,
        color: "#9333ea",
        distance: 140,
        opacity: 0.25,
        width: 1,
      },
      move: {
        enable: true,
        speed: 0.8,
        outModes: { default: "out" },
      },
      number: { value: 70, density: { enable: true } },
      opacity: { value: { min: 0.2, max: 0.7 } },
      shape: { type: "circle" },
      size: { value: { min: 1, max: 3 } },
    },
  };

  if (!ready) return null;
  return (
    <Particles
      id="tsparticles"
      options={options}
      className="pointer-events-auto absolute inset-0 -z-10"
    />
  );
}
