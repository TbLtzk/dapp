import { ReactNode } from 'react';

import Button from 'ui/Button';
import Icon, { IconName } from 'ui/Icon';

import { StyledFormBlock } from './styles';

interface Props {
  icon?: IconName;
  title: string;
  disabled?: boolean;
  onAction?: () => void;
  children: ReactNode | ReactNode[];
}

function FormBlock ({
  icon,
  title,
  disabled = false,
  onAction,
  children
}: Props) {
  return (
    <StyledFormBlock $disabled={disabled}>
      {icon && (
        <Button
          icon
          disabled={disabled}
          className="form-block__edit-btn"
          look="ghost"
          onClick={onAction}
        >
          <Icon name={icon} />
        </Button>
      )}

      <p className="form-block__title text-lg font-semibold">
        {title}
      </p>

      <div className="form-block__content">
        {children}
      </div>
    </StyledFormBlock>
  );
}

export default FormBlock;
