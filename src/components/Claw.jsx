import React from 'react';

export default function Claw({ clawRef, prRef }) {
  return (
    <div className="claw" id="claw" ref={clawRef} aria-hidden="true">
      <div className="rod"></div>
      <div className="cab"></div>
      <svg className="loop" width="30" height="30" viewBox="0 0 30 30">
        <path
          d="M24 -200V4Q24 24 10 26"
          fill="none"
          stroke="#e85b9d"
          strokeWidth="11"
        />
        <path
          d="M24 -200V4Q24 24 10 26"
          fill="none"
          stroke="#ffa6d0"
          strokeWidth="3"
          strokeDasharray="2 4"
        />
      </svg>
      <div className="hub"></div>
      <svg
        className="pr"
        id="pr"
        ref={prRef}
        viewBox="0 0 100 60"
        preserveAspectRatio="none"
        width="200"
      >
        <defs>
          <linearGradient id="ch" x1="0" x2="1">
            <stop offset="0" stopColor="#2f3237" />
            <stop offset=".4" stopColor="#f4f5f7" />
            <stop offset=".75" stopColor="#a3a7ae" />
            <stop offset="1" stopColor="#33363b" />
          </linearGradient>
        </defs>
        <g fill="none" strokeLinecap="round" vectorEffect="non-scaling-stroke">
          <path
            d="M50 0C30 0 6 2 3 22L3 42Q3 56 16 58"
            stroke="url(#ch)"
            strokeWidth="7"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M50 0C70 0 94 2 97 22L97 42Q97 56 84 58"
            stroke="url(#ch)"
            strokeWidth="7"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M49 0C30 -1 5 1 2 22"
            stroke="#fff"
            strokeWidth="1.5"
            opacity=".8"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M51 0C70 -1 95 1 98 22"
            stroke="#fff"
            strokeWidth="1.5"
            opacity=".8"
            vectorEffect="non-scaling-stroke"
          />
        </g>
      </svg>
    </div>
  );
}
