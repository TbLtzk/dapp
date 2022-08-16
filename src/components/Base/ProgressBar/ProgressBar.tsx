import { ProgressBarWrapper } from './styles';

import { formatNumberFixed } from 'utils/numbers';

const ProgressBar = ({ value }: { value: string | number }) => {
  return (
    <ProgressBarWrapper value={Number(value)}>
      <span/>
      {formatNumberFixed(value, 2)} %
    </ProgressBarWrapper>
  );
};

export default ProgressBar;
