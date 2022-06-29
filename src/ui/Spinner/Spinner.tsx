import { HTMLAttributes } from 'react';

import { StyledSpinner } from './styles';

interface Props extends HTMLAttributes<SVGSVGElement> {
  size?: number
}

function Spinner ({ size = 20, ...rest }: Props) {
  return (
    <StyledSpinner
      $size={size}
      {...rest}
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={size / 2.5}
        fill="none"
        strokeWidth="2"
      />
    </StyledSpinner>
  );
}

export default Spinner;
