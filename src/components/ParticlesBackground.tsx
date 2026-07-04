import Particles, { ParticlesProvider, useParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Engine, ISourceOptions } from "@tsparticles/engine";
import type { ReactNode } from "react";

const init = async (engine: Engine) => {
  await loadSlim(engine);
};

export function ParticlesRoot({ children }: { children: ReactNode }) {
  return <ParticlesProvider init={init}>{children}</ParticlesProvider>;
}

const options: ISourceOptions = {
  fullScreen: { enable: false },
  background: { color: "transparent" },
  fpsLimit: 60,
  detectRetina: true,
  interactivity: {
    events: {
      onHover: { enable: true, mode: "grab" },
    },
    modes: {
      grab: { distance: 160, links: { opacity: 0.35 } },
    },
  },
  particles: {
    color: { value: ["#efe7d6", "#e56a3a"] },
    links: {
      enable: true,
      color: "#efe7d6",
      distance: 130,
      opacity: 0.08,
      width: 1,
    },
    move: { enable: true, speed: 0.35, outModes: { default: "out" } },
    number: { value: 42, density: { enable: true } },
    opacity: { value: { min: 0.15, max: 0.45 } },
    shape: { type: "circle" },
    size: { value: { min: 0.6, max: 1.6 } },
  },
};

export function ParticlesBackground() {
  const { loaded } = useParticlesProvider();
  if (!loaded) return null;
  return (
    <Particles
      id="tsparticles"
      options={options}
      className="pointer-events-auto absolute inset-0 -z-10"
    />
  );
}
