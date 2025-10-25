import React from 'react';

const RelativityFieldLines = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none opacity-50">
      <svg 
        className="w-full h-full" 
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1600 800"
        preserveAspectRatio="none"
      >
        <defs>
          {/* Gradient for field lines */}
          <linearGradient id="fieldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.2" />
            <stop offset="50%" stopColor="currentColor" stopOpacity="0.4" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.5" />
          </linearGradient>
        </defs>

        {/* Highly curved spacetime grid lines with animation */}
        <g className="text-black dark:text-purple-400">
          {/* Horizontal curved lines with more extreme curvature */}
          <path 
            d="M0,50 Q200,80 400,60 Q600,40 800,70 Q1000,100 1200,80 Q1400,60 1600,90" 
            stroke="url(#fieldGradient)" 
            strokeWidth="1" 
            fill="none"
          >
            <animate attributeName="d" 
              values="M0,50 Q200,80 400,60 Q600,40 800,70 Q1000,100 1200,80 Q1400,60 1600,90;
                      M0,60 Q200,90 400,70 Q600,50 800,80 Q1000,110 1200,90 Q1400,70 1600,100;
                      M0,50 Q200,80 400,60 Q600,40 800,70 Q1000,100 1200,80 Q1400,60 1600,90"
              dur="8s" repeatCount="indefinite"/>
          </path>
          
          <path 
            d="M0,120 Q200,160 400,140 Q600,120 800,150 Q1000,180 1200,160 Q1400,140 1600,170" 
            stroke="url(#fieldGradient)" 
            strokeWidth="1" 
            fill="none"
          >
            <animate attributeName="d" 
              values="M0,120 Q200,160 400,140 Q600,120 800,150 Q1000,180 1200,160 Q1400,140 1600,170;
                      M0,130 Q200,170 400,150 Q600,130 800,160 Q1000,190 1200,170 Q1400,150 1600,180;
                      M0,120 Q200,160 400,140 Q600,120 800,150 Q1000,180 1200,160 Q1400,140 1600,170"
              dur="10s" repeatCount="indefinite"/>
          </path>

          <path 
            d="M0,200 Q200,250 400,220 Q600,190 800,240 Q1000,290 1200,260 Q1400,230 1600,280" 
            stroke="url(#fieldGradient)" 
            strokeWidth="1.5" 
            fill="none"
          >
            <animate attributeName="d" 
              values="M0,200 Q200,250 400,220 Q600,190 800,240 Q1000,290 1200,260 Q1400,230 1600,280;
                      M0,210 Q200,260 400,230 Q600,200 800,250 Q1000,300 1200,270 Q1400,240 1600,290;
                      M0,200 Q200,250 400,220 Q600,190 800,240 Q1000,290 1200,260 Q1400,230 1600,280"
              dur="12s" repeatCount="indefinite"/>
          </path>

          <path 
            d="M0,300 Q200,370 400,320 Q600,270 800,350 Q1000,430 1200,380 Q1400,330 1600,410" 
            stroke="url(#fieldGradient)" 
            strokeWidth="2" 
            fill="none"
          >
            <animate attributeName="d" 
              values="M0,300 Q200,370 400,320 Q600,270 800,350 Q1000,430 1200,380 Q1400,330 1600,410;
                      M0,290 Q200,360 400,310 Q600,260 800,340 Q1000,420 1200,370 Q1400,320 1600,400;
                      M0,300 Q200,370 400,320 Q600,270 800,350 Q1000,430 1200,380 Q1400,330 1600,410"
              dur="14s" repeatCount="indefinite"/>
          </path>

          <path 
            d="M0,420 Q200,510 400,440 Q600,370 800,480 Q1000,590 1200,520 Q1400,450 1600,560" 
            stroke="url(#fieldGradient)" 
            strokeWidth="1.5" 
            fill="none"
          >
            <animate attributeName="d" 
              values="M0,420 Q200,510 400,440 Q600,370 800,480 Q1000,590 1200,520 Q1400,450 1600,560;
                      M0,430 Q200,520 400,450 Q600,380 800,490 Q1000,600 1200,530 Q1400,460 1600,570;
                      M0,420 Q200,510 400,440 Q600,370 800,480 Q1000,590 1200,520 Q1400,450 1600,560"
              dur="16s" repeatCount="indefinite"/>
          </path>

          <path 
            d="M0,550 Q200,660 400,570 Q600,480 800,620 Q1000,760 1200,680 Q1400,600 1600,740" 
            stroke="url(#fieldGradient)" 
            strokeWidth="1" 
            fill="none"
          >
            <animate attributeName="d" 
              values="M0,550 Q200,660 400,570 Q600,480 800,620 Q1000,760 1200,680 Q1400,600 1600,740;
                      M0,560 Q200,670 400,580 Q600,490 800,630 Q1000,770 1200,690 Q1400,610 1600,750;
                      M0,550 Q200,660 400,570 Q600,480 800,620 Q1000,760 1200,680 Q1400,600 1600,740"
              dur="18s" repeatCount="indefinite"/>
          </path>

          {/* Vertical curved lines with extreme curvature and animation */}
          <path 
            d="M150,0 Q180,200 160,400 Q140,600 170,800" 
            stroke="url(#fieldGradient)" 
            strokeWidth="1" 
            fill="none"
          >
            <animate attributeName="d" 
              values="M150,0 Q180,200 160,400 Q140,600 170,800;
                      M160,0 Q190,200 170,400 Q150,600 180,800;
                      M150,0 Q180,200 160,400 Q140,600 170,800"
              dur="9s" repeatCount="indefinite"/>
          </path>

          <path 
            d="M300,0 Q340,200 320,400 Q300,600 330,800" 
            stroke="url(#fieldGradient)" 
            strokeWidth="1" 
            fill="none"
          >
            <animate attributeName="d" 
              values="M300,0 Q340,200 320,400 Q300,600 330,800;
                      M310,0 Q350,200 330,400 Q310,600 340,800;
                      M300,0 Q340,200 320,400 Q300,600 330,800"
              dur="11s" repeatCount="indefinite"/>
          </path>

          <path 
            d="M500,0 Q560,200 520,400 Q480,600 540,800" 
            stroke="url(#fieldGradient)" 
            strokeWidth="1.5" 
            fill="none"
          >
            <animate attributeName="d" 
              values="M500,0 Q560,200 520,400 Q480,600 540,800;
                      M490,0 Q550,200 510,400 Q470,600 530,800;
                      M500,0 Q560,200 520,400 Q480,600 540,800"
              dur="13s" repeatCount="indefinite"/>
          </path>

          <path 
            d="M700,0 Q780,200 720,400 Q660,600 760,800" 
            stroke="url(#fieldGradient)" 
            strokeWidth="2" 
            fill="none"
          >
            <animate attributeName="d" 
              values="M700,0 Q780,200 720,400 Q660,600 760,800;
                      M710,0 Q790,200 730,400 Q670,600 770,800;
                      M700,0 Q780,200 720,400 Q660,600 760,800"
              dur="15s" repeatCount="indefinite"/>
          </path>

          <path 
            d="M900,0 Q1000,200 920,400 Q840,600 980,800" 
            stroke="url(#fieldGradient)" 
            strokeWidth="1.5" 
            fill="none"
          >
            <animate attributeName="d" 
              values="M900,0 Q1000,200 920,400 Q840,600 980,800;
                      M890,0 Q990,200 910,400 Q830,600 970,800;
                      M900,0 Q1000,200 920,400 Q840,600 980,800"
              dur="17s" repeatCount="indefinite"/>
          </path>

          <path 
            d="M1100,0 Q1220,200 1120,400 Q1020,600 1200,800" 
            stroke="url(#fieldGradient)" 
            strokeWidth="1" 
            fill="none"
          >
            <animate attributeName="d" 
              values="M1100,0 Q1220,200 1120,400 Q1020,600 1200,800;
                      M1110,0 Q1230,200 1130,400 Q1030,600 1210,800;
                      M1100,0 Q1220,200 1120,400 Q1020,600 1200,800"
              dur="19s" repeatCount="indefinite"/>
          </path>

          <path 
            d="M1300,0 Q1440,200 1320,400 Q1200,600 1420,800" 
            stroke="url(#fieldGradient)" 
            strokeWidth="1" 
            fill="none"
          >
            <animate attributeName="d" 
              values="M1300,0 Q1440,200 1320,400 Q1200,600 1420,800;
                      M1290,0 Q1430,200 1310,400 Q1190,600 1410,800;
                      M1300,0 Q1440,200 1320,400 Q1200,600 1420,800"
              dur="21s" repeatCount="indefinite"/>
          </path>
        </g>
      </svg>
    </div>
  );
};

export default RelativityFieldLines;
