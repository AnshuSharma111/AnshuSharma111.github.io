
import React, { useState, useEffect } from 'react';
import AboutLineBoxTransition from './AboutLineBoxTransition';
import './About.css';

const About = () => {
  const [boxInfo, setBoxInfo] = useState(null);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    if (boxInfo) {
      const timeout = setTimeout(() => setShowVideo(true), 300);
      return () => clearTimeout(timeout);
    } else {
      setShowVideo(false);
    }
  }, [boxInfo]);

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      {!boxInfo && (
        <AboutLineBoxTransition onComplete={setBoxInfo} />
      )}
      {boxInfo && (
        <>
          {/* Static SVG frame in same spot/dimensions as animated trace */}
          <svg
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              pointerEvents: 'none',
              zIndex: 2000,
            }}
          >
            <rect
              x={boxInfo.boxLeft}
              y={boxInfo.boxTop}
              width={boxInfo.boxW}
              height={boxInfo.boxH}
              stroke="#fff"
              strokeWidth={6}
              fill="none"
              rx={0}
            />
          </svg>
          <video
            src="/frame_vid.mp4"
            autoPlay
            loop
            muted
            playsInline
            style={{
              position: 'absolute',
              top: boxInfo.boxTop,
              left: boxInfo.boxLeft,
              width: boxInfo.boxW,
              height: boxInfo.boxH,
              objectFit: 'cover',
              border: 'none',
              borderRadius: 0,
              boxShadow: '0 0 24px 0 #000a',
              opacity: showVideo ? 1 : 0,
              transition: 'opacity 0.8s',
              zIndex: 2100,
            }}
          />
        </>
      )}
    </div>
  );
};

export default About;
