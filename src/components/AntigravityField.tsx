import { useEffect, useRef } from "react";

/**
 * Antigravity-inspired field: hundreds of tiny drifting dashes that float
 * upward slowly and are pushed away (antigravity) from the cursor,
 * then ease back to their orbit. Colors follow the theme's neon hues.
 */
type P = {
  x: number;
  y: number;
  bx: number;
  by: number;
  vx: number;
  vy: number;
  len: number;
  rot: number;
  spin: number;
  hue: number;
  alpha: number;
};

export function AntigravityField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let parts: P[] = [];
    const pointer = { x: -9999, y: -9999, active: false };
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const build = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(320, Math.max(90, Math.round((w * h) / 9000)));
      parts = Array.from({ length: count }, () => {
        const x = Math.random() * w;
        const y = Math.random() * h;
        return {
          x,
          y,
          bx: x,
          by: y,
          vx: 0,
          vy: 0,
          len: 3 + Math.random() * 7,
          rot: Math.random() * Math.PI,
          spin: (Math.random() - 0.5) * 0.004,
          hue: Math.random(),
          alpha: 0.25 + Math.random() * 0.55,
        };
      });
    };

    build();
    const onResize = () => build();
    window.addEventListener("resize", onResize);

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      pointer.x = e.clientX - r.left;
      pointer.y = e.clientY - r.top;
      pointer.active = true;
    };
    const onLeave = () => {
      pointer.active = false;
      pointer.x = -9999;
      pointer.y = -9999;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);

    const readHues = () => {
      const cs = getComputedStyle(document.documentElement);
      const g = (n: string, f: number) => {
        const v = parseFloat(cs.getPropertyValue(n));
        return Number.isFinite(v) ? v : f;
      };
      return [g("--neon-h", 310), g("--neon-h2", 200), g("--neon-h3", 150)];
    };

    let hues = readHues();
    let frame = 0;
    let raf = 0;
    const R = 190;

    const tick = () => {
      frame++;
      if (frame % 20 === 0) hues = readHues();
      ctx.clearRect(0, 0, w, h);

      for (const p of parts) {
        // gentle float
        p.by -= 0.05;
        if (p.by < -20) p.by = h + 20;
        p.bx += Math.sin((frame + p.len * 40) * 0.003) * 0.12;

        // antigravity repulsion from cursor
        if (pointer.active) {
          const dx = p.x - pointer.x;
          const dy = p.y - pointer.y;
          const d = Math.hypot(dx, dy) || 1;
          if (d < R) {
            const f = (1 - d / R) ** 2 * 2.4;
            p.vx += (dx / d) * f;
            p.vy += (dy / d) * f;
            // slight orbital swirl
            p.vx += (-dy / d) * f * 0.35;
            p.vy += (dx / d) * f * 0.35;
          }
        }

        // spring back to base + damping
        p.vx += (p.bx - p.x) * 0.012;
        p.vy += (p.by - p.y) * 0.012;
        p.vx *= 0.92;
        p.vy *= 0.92;
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.spin + (p.vx + p.vy) * 0.002;

        const hue = hues[Math.floor(p.hue * 3) % 3];
        const speed = Math.min(1, Math.hypot(p.vx, p.vy) / 6);
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.strokeStyle = `oklch(0.78 0.2 ${hue} / ${p.alpha * (0.6 + speed * 0.8)})`;
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(-p.len / 2, 0);
        ctx.lineTo(p.len / 2 + speed * 10, 0);
        ctx.stroke();
        ctx.restore();
      }

      raf = requestAnimationFrame(tick);
    };

    if (!reduce) raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full"
    />
  );
}
