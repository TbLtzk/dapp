import { HTMLAttributes } from 'react';

import { motion, useMotionValue, useTransform } from 'framer-motion';
import { uniqueId } from 'lodash';

import { CheckContainer } from './styles';

interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value: boolean
  label?: string
  disabled?: boolean
  onChange: (value: boolean) => void
};

function Check ({
  value,
  label,
  disabled = false,
  onChange,
  ...rest
}: Props) {
  const inputId = `check-${uniqueId()}`;

  const pathLength = useMotionValue<number>(0);
  const opacity = useTransform(pathLength, [0.05, 0.15], [0, 1]);

  return (
    <CheckContainer
      $checked={value}
      $disabled={disabled}
      {...rest}
    >
      <input
        id={inputId}
        className="check-input"
        type="checkbox"
        checked={value}
        disabled={disabled}
        onChange={() => onChange(!value)}
      />

      <motion.div className="check-frame">
        <svg
          className="check-icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="15 20 120 120"
        >
          <motion.path
            d="M38 74.707l24.647 24.646L116.5 45.5"
            fill="transparent"
            className="check-path"
            strokeWidth="20"
            strokeLinejoin="round"
            strokeLinecap="round"
            animate={{ pathLength: value ? 0.9 : 0 }}
            style={{ pathLength, opacity }}
          />
        </svg>
      </motion.div>

      <label
        htmlFor={inputId}
        className="check-label text-md"
      >
        {label}
      </label>
    </CheckContainer>
  );
}

export default Check;
