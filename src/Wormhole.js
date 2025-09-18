import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const STAR_COUNT = 600;
const WORMHOLE_DURATION = 1; // seconds

function randomBetween(a, b) {
  return a + Math.random() * (b - a);
}

const Wormhole = ({ onComplete }) => {
  const canvasRef = useRef(null);
  const starsRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    let animationFrame;

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    }
    window.addEventListener('resize', resize);
    resize();

    // Initialize stars
    starsRef.current = Array.from({ length: STAR_COUNT }, () => ({
      x: randomBetween(-width/2, width/2),
      y: randomBetween(-height/2, height/2),
      z: randomBetween(0.2, 1),
      radius: randomBetween(0.5, 2.5),
      speed: randomBetween(0.5, 1.5),
    }));



    // Animate a custom object property to avoid GSAP warning
    const anim = { t: 0 };
    let progress = 0;
    const tl = gsap.timeline({
      onUpdate: () => {
        progress = anim.t;
      },
      onComplete: () => {
        window.removeEventListener('resize', resize);
        if (onComplete) onComplete();
      },
    });
    tl.to(anim, { duration: WORMHOLE_DURATION, t: 1, ease: 'power2.in' });

    function draw() {
      ctx.clearRect(0, 0, width, height);
      ctx.save();
      ctx.translate(width / 2, height / 2);
      for (const star of starsRef.current) {
        // Aggressive stretching: stars stretch fast, then shrink and disappear at the end
        let stretchProgress = progress < 0.85
          ? progress / 0.85 // 0 to 1 for first 85%
          : 1 - (progress - 0.85) / 0.15; // 1 to 0 for last 15%
        stretchProgress = Math.max(0, Math.min(1, stretchProgress));
        let z = star.z - stretchProgress * 4.5; // more aggressive tunnel
        if (z < 0.01) z = 0.01;
        const scale = 1 / z;
        // Draw as stretched ellipse for more speed effect
        ctx.save();
        ctx.beginPath();
        ctx.ellipse(
          star.x * scale,
          star.y * scale,
          star.radius * scale * (1 + stretchProgress * 2.5), // horizontal stretch
          star.radius * scale * (1 + stretchProgress * 0.5), // vertical stretch
          Math.atan2(star.y, star.x),
          0,
          2 * Math.PI
        );
        ctx.fillStyle = 'white';
        ctx.globalAlpha = Math.max(0.15, 1 - progress * 1.1);
        ctx.fill();
        ctx.restore();
      }
      ctx.restore();
      if (progress < 1) {
        animationFrame = requestAnimationFrame(draw);
      }
    }
    draw();
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrame);
      tl.kill();
    };
  }, [onComplete]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 1000,
        pointerEvents: 'none',
      }}
    />
  );
};

export default Wormhole;
