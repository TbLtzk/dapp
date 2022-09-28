import { HTMLAttributes } from 'react';

import { motion } from 'framer-motion';
import uniqueId from 'lodash/uniqueId';

import { SwitchContainer } from './styles';

interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value: boolean;
  label: string;
  disabled?: boolean;
  onChange: (val: boolean) => void;
}

function Switch ({
  value,
  label,
  disabled = false,
  onChange,
  ...rest
}: Props) {
  const inputId = `switch-${uniqueId()}`;

  return (
    <SwitchContainer
      $checked={value}
      $disabled={disabled}
      {...rest}
    >
      <label
        htmlFor={inputId}
        className="switch-label text-lg"
      >
        {label}
      </label>

      <input
        id={inputId}
        className="switch-input"
        type="checkbox"
        checked={value}
        disabled={disabled}
        onChange={() => onChange(!value)}
      />

      <div className="switch-background">
        <motion.div
          layout
          className="switch-circle"
          transition={{
            type: 'spring',
            stiffness: 700,
            damping: 30,
          }}
        />
      </div>
    </SwitchContainer>
  );
};

export default Switch;
