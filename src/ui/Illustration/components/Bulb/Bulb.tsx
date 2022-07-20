import { HTMLAttributes } from 'react';

import { StyledBulb } from './styles';

function Bulb (props: HTMLAttributes<SVGElement>) {
  return (
    <StyledBulb
      width="220"
      height="195"
      viewBox="0 0 220 195"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle
        cx="110"
        cy="88"
        r="80"
        className="bg"
      />
      <circle
        cx="26"
        cy="28"
        r="8"
        className="circle"
      />
      <circle
        cx="198"
        cy="134"
        r="6"
        className="circle"
      />
      <circle
        cx="25"
        cy="146"
        r="10"
        className="circle"
      />
      <circle
        cx="210"
        cy="54"
        r="10"
        className="circle"
      />
      <circle
        cx="191"
        cy="19"
        r="7"
        className="circle"
      />
      <g filter="url(#filter0_dd_2027_15967)">
        <ellipse
          rx="5.95647"
          ry="9.36682"
          transform="matrix(0.933437 -0.358741 0.361221 0.93248 172.485 67.0966)"
          className="inner-dark"
        />
        <path d="M71.1217 153.494C96.7786 158.013 121.356 143.19 129.815 119.525C131.621 114.472 135.661 110.417 140.537 108.176C142.543 107.254 144.443 106.121 145.78 104.788C150.064 100.513 156.846 90.6441 153.87 76.0386C150.895 61.4331 137.771 58.6186 132.132 59.1339C127.747 59.5346 122.755 61.6526 117.401 61.3965C114.282 61.2472 111.565 59.4898 108.94 57.7921L108.833 57.7231C103.084 54.0048 96.5079 51.3502 89.3365 50.087C60.6954 45.042 33.3998 64.1006 28.3699 92.6556C23.34 121.211 42.4806 148.449 71.1217 153.494Z" fill="url(#paint0_linear_2027_15967)"/>
        <path d="M139.697 59.7552C144.74 61.2643 150.207 65.5884 153.065 76.9222C154.847 83.9849 154.17 89.7783 152.513 94.3552L168.184 88.6713C174.934 86.2233 178.406 78.7725 175.941 72.0294L172.199 61.7955C169.733 55.0524 162.263 51.5706 155.514 54.0186L139.697 59.7552Z" className="inner-medium" />
        <path
          d="M158.775 56.7861C165.915 62.0671 171.767 74.6647 170.478 81.9812"
          className="inner-stroke-light"
          strokeLinecap="round"
        />
        <path
          d="M151.152 59.9697C158.293 65.2507 164.144 77.8482 162.856 85.1648"
          strokeLinecap="round"
          className="inner-stroke-light"
        />
        <path d="M137.614 60.29C133.879 61.6921 133.303 68.595 134.588 76.1357C135.121 79.2648 136.305 82.248 137.867 85.0144C142.329 92.9199 146.15 97.1271 150.347 96.0364C150.589 95.8677 150.816 95.6522 151.028 95.3937C153.004 90.7824 154.005 84.7348 152.096 77.1667C149.911 68.5053 146.218 64.1915 142.538 62.0609C140.891 61.1073 139.212 60.5704 137.614 60.29Z" className="inner-dark" />
        <path
          d="M140.43 72.1617C109.536 84.3215 98.9784 86.9879 86.9789 86.3829C74.9794 85.7779 69.5119 85.3177 66.5502 87.8135C63.5885 90.3092 65.3736 91.6294 66.901 94.413C68.4283 97.1966 72.5754 101.774 76.3414 98.0875C79.389 95.104 78.9261 92.0051 75.0122 91.3156C68.0074 90.0818 67.4492 97.0241 68.7188 101.271C69.9884 105.518 71.2843 106.752 74.2794 109.794C77.2744 112.836 83.489 111.919 85.644 108.275C87.7991 104.632 83.1907 99.294 78.6491 105.032C74.1075 110.77 77.9689 117.485 80.3888 120.928C82.8087 124.372 82.5509 125.835 87.8992 121.245C90.0279 119.418 93.9082 117.275 97.7031 111.405C103.249 102.827 109.404 99.3853 116.941 96.6897C122.97 94.5331 137.365 89.5587 143.809 87.341"
          className="inner-stroke-medium"
          strokeLinecap="round"
        />
      </g>
      <defs>
        <filter
          id="filter0_dd_2027_15967"
          x="-0.737549"
          y="31.1963"
          width="204.781"
          height="178.677"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feMorphology
            radius="4"
            operator="erode"
            in="SourceAlpha"
            result="effect1_dropShadow_2027_15967"
          />
          <feOffset dy="8"/>
          <feGaussianBlur stdDeviation="4"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0.0627451 0 0 0 0 0.0941176 0 0 0 0 0.156863 0 0 0 0.03 0"/>
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_2027_15967"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feMorphology
            radius="4"
            operator="erode"
            in="SourceAlpha"
            result="effect2_dropShadow_2027_15967"
          />
          <feOffset dy="20"/>
          <feGaussianBlur stdDeviation="12"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0.0627451 0 0 0 0 0.0941176 0 0 0 0 0.156863 0 0 0 0.08 0"/>
          <feBlend
            mode="normal"
            in2="effect1_dropShadow_2027_15967"
            result="effect2_dropShadow_2027_15967"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect2_dropShadow_2027_15967"
            result="shape"
          />
        </filter>
        <linearGradient
          id="paint0_linear_2027_15967"
          x1="98.1171"
          y1="51.6337"
          x2="76.8949"
          y2="162.366"
          gradientUnits="userSpaceOnUse"
        >
          <stop className="gradient-a" />
          <stop offset="1" className="gradient-b" />
        </linearGradient>
      </defs>
    </StyledBulb>

  );
}

export default Bulb;
