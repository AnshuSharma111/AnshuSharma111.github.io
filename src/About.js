
import React, { useState } from 'react';
import AboutLineBoxTransition from './AboutLineBoxTransition';
import './About.css';

const About = () => {
  const [boxInfo, setBoxInfo] = useState(null);

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
          <div
            style={{
              position: 'absolute',
              top: boxInfo.boxTop,
              left: boxInfo.boxLeft,
              width: boxInfo.boxW,
              height: boxInfo.boxH,
              background: 'rgba(0,0,0,0.3)',
              borderRadius: 18,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontSize: 24,
            }}
          >
            {/* Video will go here */}
            Video Frame Placeholder
          </div>
        </>
      )}
    </div>
  );
};

export default About;
