"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export function NexusBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Smooth mouse coordinates
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let w: number, h: number;
    const gridSize = 40;
    const dots: { x: number; y: number; ox: number; oy: number }[] = [];

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      
      dots.length = 0;
      for (let x = 0; x <= w; x += gridSize) {
        for (let y = 0; y <= h; y += gridSize) {
          dots.push({ x, y, ox: x, oy: y });
        }
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    resize();

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      
      const mx = springX.get();
      const my = springY.get();

      // Draw Grid Lines with balanced visibility
      ctx.strokeStyle = "rgba(0, 240, 255, 0.2)";
      ctx.lineWidth = 1;
      ctx.shadowBlur = 8;
      ctx.shadowColor = "rgba(0, 240, 255, 0.3)";

      // Vertical lines with distortion
      for (let x = 0; x <= w; x += gridSize) {
        ctx.beginPath();
        for (let y = 0; y <= h; y += 10) {
          const dx = mx - x;
          const dy = my - y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const force = Math.max(0, (300 - dist) / 300);
          const offsetX = dx * force * 0.7;
          
          if (y === 0) ctx.moveTo(x - offsetX, y);
          else ctx.lineTo(x - offsetX, y);
        }
        ctx.stroke();
      }

      // Horizontal lines with distortion
      for (let y = 0; y <= h; y += gridSize) {
        ctx.beginPath();
        for (let x = 0; x <= w; x += 10) {
          const dx = mx - x;
          const dy = my - y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const force = Math.max(0, (300 - dist) / 300);
          const offsetY = dy * force * 0.7;
          
          if (x === 0) ctx.moveTo(x, y - offsetY);
          else ctx.lineTo(x, y - offsetY);
        }
        ctx.stroke();
      }

      // Draw Connection Dots with subtle glow
      ctx.shadowBlur = 10;
      dots.forEach((dot) => {
        const dx = mx - dot.ox;
        const dy = my - dot.oy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 200) {
          const force = (200 - dist) / 200;
          const offsetX = dx * force * 0.5;
          const offsetY = dy * force * 0.5;
          
          dot.x = dot.ox - offsetX;
          dot.y = dot.oy - offsetY;
          
          const opacity = force * 0.7;
          ctx.fillStyle = `rgba(0, 240, 255, ${opacity})`;
          ctx.beginPath();
          ctx.arc(dot.x, dot.y, 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [springX, springY, mouseX, mouseY]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-[1] opacity-100"
    />
  );
}
