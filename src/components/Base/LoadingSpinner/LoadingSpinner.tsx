import { Spinner } from 'react-bootstrap';

interface Props {
  type?: 'light' | 'dark';
  className?: string;
  size?: 'sm';
}

function LoadingSpinner ({ type = 'dark', className, size }: Props) {
  return (
    <Spinner
      animation="border"
      size={size}
      variant={type || 'dark'}
      className={className}
    />
  );
}

export default LoadingSpinner;
