"use client";

import { useEffect, useRef, useState } from "react";

type Labels = { label: string; hint: string; noise: string; clean: string };

type Point = { x: number; y: number; vx: number; vy: number; hx: number; hy: number; cls: 0 | 1; wake: number };

const N = 150;
const CENTERS = [
  { x: 0.31, y: 0.66 },
  { x: 0.7, y: 0.33 },
] as const;
const SPREAD = 0.085;
// Spring toward home: stiff enough to read as "fitting", damped so it never wobbles.
const STIFFNESS = 52;
const DAMPING = 11;
const PUSH_RADIUS = 0.13;
const PUSH = 3.2;

function gaussian() {
  const u = 1 - Math.random();
  const v = Math.random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));

function makePoints(): Point[] {
  return Array.from({ length: N }, (_, i) => {
    const cls = (i % 2) as 0 | 1;
    const c = CENTERS[cls];
    return {
      x: Math.random(),
      y: Math.random(),
      vx: 0,
      vy: 0,
      hx: clamp(c.x + gaussian() * SPREAD, 0.06, 0.94),
      hy: clamp(c.y + gaussian() * SPREAD, 0.06, 0.94),
      cls,
      wake: Math.random() * 0.7,
    };
  });
}

function scatter(points: Point[], strength = 1) {
  for (const p of points) {
    p.x = Math.random();
    p.y = Math.random();
    p.vx = (Math.random() - 0.5) * strength;
    p.vy = (Math.random() - 0.5) * strength;
    p.wake = Math.random() * 0.5;
  }
}

function settle(points: Point[]) {
  for (const p of points) {
    p.x = p.hx;
    p.y = p.hy;
    p.vx = p.vy = p.wake = 0;
  }
}

/**
 * The hero visual: noisy data that fits itself. Points start scattered, spring
 * into two clusters, and a decision boundary draws in once they have settled.
 * Pointer movement pushes points away (adds noise); they spring back.
 * Rendering stops whenever nothing is moving, and while the plot is off screen.
 * Under prefers-reduced-motion it draws the final state and the button swaps
 * between the messy and clean states instantly.
 */
export function SignalPlot({ labels }: { labels: Labels }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const api = useRef<{ toggle: () => void } | null>(null);
  const [messy, setMessy] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const reduce = motionQuery.matches;
    setReduced(reduce);

    const points = makePoints();
    let boundary = 0; // 0..1, how much of the boundary line is drawn
    let pointer: { x: number; y: number } | null = null;
    let width = 0;
    let height = 0;
    let raf = 0;
    let last = 0;
    let visible = true;
    let colors = { a: "#1f2ad4", b: "#ee5b43", grid: "rgba(31,42,212,.12)", muted: "rgba(31,42,212,.35)" };
    let isMessy = false;

    if (reduce) settle(points), (boundary = 1);

    const readColors = () => {
      const cs = getComputedStyle(canvas);
      colors = {
        a: cs.getPropertyValue("--plot-a").trim() || colors.a,
        b: cs.getPropertyValue("--plot-b").trim() || colors.b,
        grid: cs.getPropertyValue("--plot-grid").trim() || colors.grid,
        muted: cs.getPropertyValue("--plot-muted").trim() || colors.muted,
      };
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const s = Math.min(width, height);

      // Light grid: it organises the plot, it is not decoration.
      ctx.strokeStyle = colors.grid;
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let i = 1; i < 5; i++) {
        const gx = Math.round((width * i) / 5) + 0.5;
        const gy = Math.round((height * i) / 5) + 0.5;
        ctx.moveTo(gx, 0);
        ctx.lineTo(gx, height);
        ctx.moveTo(0, gy);
        ctx.lineTo(width, gy);
      }
      ctx.stroke();

      // Decision boundary: perpendicular bisector of the two cluster centres.
      if (boundary > 0) {
        const mx = (CENTERS[0].x + CENTERS[1].x) / 2;
        const my = (CENTERS[0].y + CENTERS[1].y) / 2;
        const dx = CENTERS[1].y - CENTERS[0].y;
        const dy = -(CENTERS[1].x - CENTERS[0].x);
        const len = Math.hypot(dx, dy);
        const ux = dx / len;
        const uy = dy / len;
        const reach = 0.75 * boundary;
        ctx.strokeStyle = colors.b;
        ctx.lineWidth = 2;
        ctx.setLineDash([6, 6]);
        ctx.beginPath();
        ctx.moveTo((mx - ux * reach) * width, (my - uy * reach) * height);
        ctx.lineTo((mx + ux * reach) * width, (my + uy * reach) * height);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      const r = Math.max(2.6, s * 0.011);
      for (const p of points) {
        const off = Math.hypot(p.x - p.hx, p.y - p.hy);
        // Points only take their class colour once they are close to home.
        const fit = 1 - clamp(off / 0.12, 0, 1);
        ctx.globalAlpha = 1;
        ctx.fillStyle = colors.muted;
        ctx.beginPath();
        if (p.cls === 0) ctx.arc(p.x * width, p.y * height, r, 0, Math.PI * 2);
        else ctx.rect(p.x * width - r, p.y * height - r, r * 2, r * 2);
        ctx.fill();
        if (fit > 0) {
          ctx.globalAlpha = fit;
          ctx.fillStyle = p.cls === 0 ? colors.a : colors.b;
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
    };

    const step = (dt: number) => {
      let energy = 0;
      for (const p of points) {
        if (p.wake > 0) {
          p.wake -= dt;
          energy += 1;
          continue;
        }
        if (!isMessy) {
          p.vx += (STIFFNESS * (p.hx - p.x) - DAMPING * p.vx) * dt;
          p.vy += (STIFFNESS * (p.hy - p.y) - DAMPING * p.vy) * dt;
        } else {
          p.vx *= 1 - Math.min(1, 3 * dt);
          p.vy *= 1 - Math.min(1, 3 * dt);
        }
        if (pointer) {
          const ax = (p.x - pointer.x) * (width / Math.min(width, height));
          const ay = (p.y - pointer.y) * (height / Math.min(width, height));
          const d = Math.hypot(ax, ay);
          if (d < PUSH_RADIUS && d > 1e-4) {
            const f = (1 - d / PUSH_RADIUS) * PUSH;
            p.vx += (ax / d) * f * dt * 10;
            p.vy += (ay / d) * f * dt * 10;
            energy += 1;
          }
        }
        p.x = clamp(p.x + p.vx * dt, 0.02, 0.98);
        p.y = clamp(p.y + p.vy * dt, 0.02, 0.98);
        energy += Math.abs(p.vx) + Math.abs(p.vy) + (isMessy ? 0 : Math.abs(p.hx - p.x) + Math.abs(p.hy - p.y));
      }
      const settled = !isMessy && energy / N < 0.0015;
      if (settled && boundary < 1) {
        boundary = Math.min(1, boundary + dt * 2.4);
        energy += 1;
      }
      if (!settled && boundary > 0 && (isMessy || energy / N > 0.02)) boundary = Math.max(0, boundary - dt * 4);
      return energy / N > 0.0015 || (boundary > 0 && boundary < 1) || (isMessy && energy / N > 0.0005);
    };

    const frame = (now: number) => {
      const dt = Math.min(0.033, (now - last) / 1000 || 0.016);
      last = now;
      const moving = step(dt);
      draw();
      raf = moving && visible ? requestAnimationFrame(frame) : 0;
    };

    const kick = () => {
      if (reduce || raf || !visible) return;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };

    const toPlot = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      return { x: (e.clientX - rect.left) / rect.width, y: (e.clientY - rect.top) / rect.height };
    };
    const onMove = (e: PointerEvent) => {
      if (reduce || e.pointerType === "touch") return;
      pointer = toPlot(e);
      kick();
    };
    const onLeave = () => {
      pointer = null;
      kick();
    };

    api.current = {
      toggle: () => {
        isMessy = !isMessy;
        setMessy(isMessy);
        if (reduce) {
          if (isMessy) scatter(points, 0), (boundary = 0);
          else settle(points), (boundary = 1);
          draw();
          return;
        }
        if (isMessy) scatter(points, 0.6);
        kick();
      },
    };

    readColors();
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) kick();
    });
    io.observe(canvas);
    const schemeQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const onScheme = () => {
      readColors();
      draw();
    };
    schemeQuery.addEventListener("change", onScheme);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);
    kick();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      schemeQuery.removeEventListener("change", onScheme);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
      api.current = null;
    };
  }, []);

  return (
    <figure className="plot">
      <div className="plot-frame">
        <canvas ref={canvasRef} className="plot-canvas" role="img" aria-label={labels.label} />
        <span className="plot-axis plot-axis--x" aria-hidden="true">
          x₁
        </span>
        <span className="plot-axis plot-axis--y" aria-hidden="true">
          x₂
        </span>
      </div>
      <figcaption className="plot-caption">
        {!reduced && <span className="plot-hint">{labels.hint}</span>}
        <button type="button" className="plot-btn" onClick={() => api.current?.toggle()}>
          {messy ? labels.clean : labels.noise}
        </button>
      </figcaption>
    </figure>
  );
}
