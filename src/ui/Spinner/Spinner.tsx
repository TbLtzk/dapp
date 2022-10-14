import { HTMLAttributes } from 'react';

import { StyledSpinner } from './styles';

interface Props extends HTMLAttributes<SVGSVGElement> {
  size?: number;
  thickness?: number;
}

function Spinner ({
  size = 20,
  thickness = 2,
  ...rest
}: Props) {
  return (
    <StyledSpinner
      $size={size}
      $radius={size / 2 - 2 * thickness}
      {...rest}
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={size / 2 - 2 * thickness}
        fill="none"
        strokeWidth={thickness}
      />
    </StyledSpinner>
  );
}

export default Spinner;
