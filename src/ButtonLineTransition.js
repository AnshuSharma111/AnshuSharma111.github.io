
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

// This component animates a line:
// 1. Traces the button border
// 2. Moves down the screen
// 3. Calls onComplete when done
const ButtonLineTransition = ({ buttonRect, onComplete }) => {
  const outlineRef = useRef();
  const downRef = useRef();

  useEffect(() => {
    if (!buttonRect) return;
    const outline = outlineRef.current;
    const down = downRef.current;
    // Calculate path: button outline, then down, with margin
    const OUTLINE_GAP = 16; // px gap between button and line
    const MARGIN = 30;
    const btnW = buttonRect.width;
    const btnH = buttonRect.height;
    const btnX = buttonRect.left;
    const btnY = buttonRect.top;
    const btnR = 12; // original border radius
    // Outline rectangle (larger than button)
    const outlineX = btnX - OUTLINE_GAP;
    const outlineY = btnY - OUTLINE_GAP;
    const outlineW = btnW + OUTLINE_GAP * 2;
    const outlineH = btnH + OUTLINE_GAP * 2;
    const outlineR = btnR + OUTLINE_GAP;
    const centerX = outlineX + outlineW / 2;
    const startY = outlineY + outlineH;
    const downStartY = startY + MARGIN;
    const downY = window.innerHeight + 100;
    // Path segments: outline, then downward line
    const outlinePath = [
      `M ${centerX} ${startY}`,
      `L ${outlineX + outlineR} ${startY}`,
      `A ${outlineR} ${outlineR} 0 0 1 ${outlineX} ${startY - outlineR}`,
      `L ${outlineX} ${outlineY + outlineR}`,
      `A ${outlineR} ${outlineR} 0 0 1 ${outlineX + outlineR} ${outlineY}`,
      `L ${outlineX + outlineW - outlineR} ${outlineY}`,
      `A ${outlineR} ${outlineR} 0 0 1 ${outlineX + outlineW} ${outlineY + outlineR}`,
      `L ${outlineX + outlineW} ${startY - outlineR}`,
      `A ${outlineR} ${outlineR} 0 0 1 ${outlineX + outlineW - outlineR} ${startY}`,
      `L ${centerX} ${startY}`
    ].join(' ');
    const downPath = [
      `M ${centerX} ${startY}`,
      `L ${centerX} ${downStartY}`,
      `L ${centerX} ${downY}`
    ].join(' ');

    // Animate outline first
    outline.setAttribute('d', outlinePath);
    const outlineLength = outline.getTotalLength();
    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;
    // Downward line setup
    down.setAttribute('d', downPath);
    const downLength = down.getTotalLength();
    down.style.strokeDasharray = downLength;
    down.style.strokeDashoffset = downLength;
    // Animate outline, then downward line
    gsap.to(outline, {
      strokeDashoffset: 0,
      duration: 1.2,
      ease: 'power2.inOut',
      onComplete: () => {
        gsap.to(down, {
          strokeDashoffset: 0,
          duration: 1.1,
          ease: 'power2.inOut',
          onComplete,
        });
      }
    });
  }, [buttonRect, onComplete]);

  if (!buttonRect) return null;
  return (
    <svg
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 2000,
      }}
    >
      <path
        ref={outlineRef}
        stroke="#fff"
        strokeWidth={6}
        fill="none"
        strokeLinecap="round"
      />
      <path
        ref={downRef}
        stroke="#fff"
        strokeWidth={6}
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default ButtonLineTransition;
