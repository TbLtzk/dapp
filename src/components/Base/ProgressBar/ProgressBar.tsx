import { ProgressBarWrapper } from './styles';

const ProgressBar = ({ value }: { value: string | number }) => {
  return (
    <ProgressBarWrapper value={Number(value)}>
      <span> </span>
      {value} %
    </ProgressBarWrapper>
  );
};

export default ProgressBar;
