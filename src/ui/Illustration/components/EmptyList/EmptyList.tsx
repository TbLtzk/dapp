import { HTMLAttributes } from 'react';

import { StyledEmptyList } from './styles';

function EmptyList (props: HTMLAttributes<SVGElement>) {
  return (
    <StyledEmptyList
      width="224"
      height="198"
      viewBox="0 0 224 198"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle
        cx="112"
        cy="88"
        r="80"
        className="bg"
      />
      <g filter="url(#filter0_dd_2113_16263)">
        <rect
          x="92"
          y="18"
          width="112"
          height="44"
          rx="8"
          className="item-bg"
        />
        <path d="M138.25 28H105.75C103.679 28 102 29.7909 102 32C102 34.2091 103.679 36 105.75 36H138.25C140.321 36 142 34.2091 142 32C142 29.7909 140.321 28 138.25 28Z" className="item-primary"/>
        <path d="M162.16 44H105.84C103.719 44 102 45.7909 102 48C102 50.2091 103.719 52 105.84 52H162.16C164.281 52 166 50.2091 166 48C166 45.7909 164.281 44 162.16 44Z" className="item-secondary"/>
      </g>
      <g filter="url(#filter1_dd_2113_16263)">
        <rect
          x="20"
          y="66"
          width="112"
          height="44"
          rx="8"
          className="item-bg"
        />
        <path d="M66.25 76H33.75C31.6789 76 30 77.7909 30 80C30 82.2091 31.6789 84 33.75 84H66.25C68.3211 84 70 82.2091 70 80C70 77.7909 68.3211 76 66.25 76Z" className="item-primary"/>
        <path d="M90.16 92H33.84C31.7192 92 30 93.7909 30 96C30 98.2091 31.7192 100 33.84 100H90.16C92.2808 100 94 98.2091 94 96C94 93.7909 92.2808 92 90.16 92Z" className="item-secondary"/>
      </g>
      <g filter="url(#filter2_dd_2113_16263)">
        <rect
          x="92"
          y="114"
          width="112"
          height="44"
          rx="8"
          className="item-bg"
        />
        <path d="M138.25 124H105.75C103.679 124 102 125.791 102 128C102 130.209 103.679 132 105.75 132H138.25C140.321 132 142 130.209 142 128C142 125.791 140.321 124 138.25 124Z" className="item-primary"/>
        <path d="M162.16 140H105.84C103.719 140 102 141.791 102 144C102 146.209 103.719 148 105.84 148H162.16C164.281 148 166 146.209 166 144C166 141.791 164.281 140 162.16 140Z" className="item-secondary"/>
      </g>
      <defs>
        <filter
          id="filter0_dd_2113_16263"
          x="72"
          y="18"
          width="152"
          height="84"
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
            result="effect1_dropShadow_2113_16263"
          />
          <feOffset dy="8"/>
          <feGaussianBlur stdDeviation="4"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0.0627451 0 0 0 0 0.0941176 0 0 0 0 0.156863 0 0 0 0.03 0"/>
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_2113_16263"
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
            result="effect2_dropShadow_2113_16263"
          />
          <feOffset dy="20"/>
          <feGaussianBlur stdDeviation="12"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0.0627451 0 0 0 0 0.0941176 0 0 0 0 0.156863 0 0 0 0.08 0"/>
          <feBlend
            mode="normal"
            in2="effect1_dropShadow_2113_16263"
            result="effect2_dropShadow_2113_16263"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect2_dropShadow_2113_16263"
            result="shape"
          />
        </filter>
        <filter
          id="filter1_dd_2113_16263"
          x="0"
          y="66"
          width="152"
          height="84"
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
            result="effect1_dropShadow_2113_16263"
          />
          <feOffset dy="8"/>
          <feGaussianBlur stdDeviation="4"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0.0627451 0 0 0 0 0.0941176 0 0 0 0 0.156863 0 0 0 0.03 0"/>
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_2113_16263"
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
            result="effect2_dropShadow_2113_16263"
          />
          <feOffset dy="20"/>
          <feGaussianBlur stdDeviation="12"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0.0627451 0 0 0 0 0.0941176 0 0 0 0 0.156863 0 0 0 0.08 0"/>
          <feBlend
            mode="normal"
            in2="effect1_dropShadow_2113_16263"
            result="effect2_dropShadow_2113_16263"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect2_dropShadow_2113_16263"
            result="shape"
          />
        </filter>
        <filter
          id="filter2_dd_2113_16263"
          x="72"
          y="114"
          width="152"
          height="84"
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
            result="effect1_dropShadow_2113_16263"
          />
          <feOffset dy="8"/>
          <feGaussianBlur stdDeviation="4"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0.0627451 0 0 0 0 0.0941176 0 0 0 0 0.156863 0 0 0 0.03 0"/>
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_2113_16263"
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
            result="effect2_dropShadow_2113_16263"
          />
          <feOffset dy="20"/>
          <feGaussianBlur stdDeviation="12"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0.0627451 0 0 0 0 0.0941176 0 0 0 0 0.156863 0 0 0 0.08 0"/>
          <feBlend
            mode="normal"
            in2="effect1_dropShadow_2113_16263"
            result="effect2_dropShadow_2113_16263"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect2_dropShadow_2113_16263"
            result="shape"
          />
        </filter>
      </defs>
    </StyledEmptyList>
  );
}

export default EmptyList;
