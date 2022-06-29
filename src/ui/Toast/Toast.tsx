import { HTMLAttributes } from 'react';

import Icon from 'ui/Icon';
import { IconName } from 'ui/Icon/Icon';

import { ToastContainer } from './styles';

export type ToastType = 'success' | 'error' | 'info';
interface Props extends HTMLAttributes<HTMLDivElement> {
  type?: ToastType
  text: string
  onClose: () => void
}

function Toast ({
  type = 'info',
  text,
  onClose = () => {},
  ...rest
}: Props) {
  const iconsMap: Record<ToastType, IconName> = {
    info: 'info',
    success: 'check-circle',
    error: 'cross-circle',
  };

  const titleMap: Record<ToastType, string> = {
    info: 'Info',
    success: 'Success',
    error: 'Error',
  };

  return (
    <ToastContainer $type={type} {...rest}>
      <div className="toast-main">
        <div className="toast-icon-wrp">
          <Icon name={iconsMap[type]} />
        </div>

        <div className="toast-content">
          <h3 className="text-lg font-semibold">{titleMap[type]}</h3>
          <p className="toast-text text-sm">{text}</p>
        </div>

        <button className="toast-close" onClick={onClose}>
          <Icon name="cross" />
        </button>
      </div>
    </ToastContainer>
  );
};

export default Toast;
