
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

// AboutLineBoxTransition animates a line from top center, down, left, down, right, up to form a frame

// Single path: downward line continues as box trace, then vertical segment above box is untraced
const AboutLineBoxTransition = ({ onComplete }) => {
  const boxRef = useRef();
  const verticalRef = useRef();
  // Store box dimensions to pass to onComplete
  const boxInfo = useRef(null);

  useEffect(() => {
  // pathRef and path are no longer used
    // Frame dimensions (responsive, left half, with margin)
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    // Responsive sizing: desktop ~48vw/48vh, mobile ~90vw/40vh
    const isMobile = vw < 700;
    const boxW = isMobile ? vw * 0.9 : vw * 0.48;
    const boxH = isMobile ? vh * 0.4 : vh * 0.48;
    const marginX = isMobile ? vw * 0.05 : vw * 0.04;
    const boxLeft = marginX;
    const boxTop = isMobile ? vh * 0.06 : vh * 0.26;
    const boxRight = boxLeft + boxW;
    const boxBottom = boxTop + boxH;
    const centerX = vw / 2;
    const startY = 0;
    // Save box info for static SVG
    boxInfo.current = { boxLeft, boxTop, boxW, boxH };
    // Path for vertical line and box
    const verticalD = `M ${centerX} ${startY} L ${centerX} ${boxTop}`;
    const boxD = [
      `M ${centerX} ${boxTop}`,
      `L ${boxLeft} ${boxTop}`,
      `L ${boxLeft} ${boxBottom}`,
      `L ${boxRight} ${boxBottom}`,
      `L ${boxRight} ${boxTop}`,
      `L ${boxLeft} ${boxTop}`
    ].join(' ');
    // Animate vertical line down
    const vertical = verticalRef.current;
    const box = boxRef.current;
    vertical.setAttribute('d', verticalD);
    box.setAttribute('d', boxD);
    const verticalLen = vertical.getTotalLength();
    const boxLen = box.getTotalLength();
    // Hide box initially
    box.style.strokeDasharray = boxLen;
    box.style.strokeDashoffset = boxLen;
    // Animate vertical line down
    vertical.style.strokeDasharray = verticalLen;
    vertical.style.strokeDashoffset = verticalLen;
    gsap.to(vertical, {
      strokeDashoffset: 0,
      duration: 0.8,
      ease: 'power2.inOut',
      onComplete: () => {
        // Animate box trace
        gsap.to(box, {
          strokeDashoffset: 0,
          duration: 1.4,
          ease: 'power2.inOut',
          onComplete: () => {
            // Untrace vertical line from top to box
            gsap.to(vertical, {
              strokeDashoffset: verticalLen,
              duration: 0.7,
              ease: 'power2.inOut',
              onComplete: () => {
                // Animation done, call onComplete with box info
                if (onComplete) onComplete(boxInfo.current);
              },
            });
          }
        });
      }
    });
  }, [onComplete]);

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
        ref={boxRef}
        stroke="#fff"
        strokeWidth={6}
        fill="none"
        strokeLinecap="square"
      />
      <path
        ref={verticalRef}
        stroke="#fff"
        strokeWidth={6}
        fill="none"
        strokeLinecap="square"
      />
    </svg>
  );
};

export default AboutLineBoxTransition;
