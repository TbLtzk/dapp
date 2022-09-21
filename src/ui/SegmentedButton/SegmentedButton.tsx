import { HTMLAttributes } from 'react';

import { AnimateSharedLayout, motion } from 'framer-motion';
import { Options } from 'typings/forms';

import { SegmentedButtonContainer } from './styles';

type ValueType = number | string | boolean;
interface Props<T extends ValueType> extends Omit<HTMLAttributes<HTMLDivElement>, 'value' | 'onChange'> {
  value: T;
  light?: boolean;
  options?: Options<T>;
  onChange?: (value: T) => void;
}

function SegmentedButton<T extends ValueType> ({
  value,
  light = false,
  options = [],
  onChange = () => {},
  ...rest
}: Props<T>) {
  const handleChange = (selected: T) => {
    if (selected !== value) {
      onChange(selected);
    }
  };

  return (
    <SegmentedButtonContainer $light={light} {...rest}>
      <AnimateSharedLayout>
        {options.map((option) => (
          <button
            key={String(option.value)}
            className={`segmented-button-item text-md ${value === option.value ? 'active' : ''}`}
            type="button"
            onClick={() => handleChange(option.value)}
          >
            <span className="segmented-button-item-lbl">
              {option.label}
            </span>
            {value === option.value && (
              <motion.div layoutId="segmented-bg" className="segmented-button-item-active" />
            )}
          </button>
        ))}
      </AnimateSharedLayout>
    </SegmentedButtonContainer>
  );
};

export default SegmentedButton;
