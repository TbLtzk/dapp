import { Spinner } from 'react-bootstrap';

function LoadingSpinner ({ type = 'dark', className, size }) {
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
