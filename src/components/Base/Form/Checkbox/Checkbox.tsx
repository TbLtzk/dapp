import { motion, useMotionValue, useTransform } from 'framer-motion';

import { StyledCheckbox } from './styles';

type Props = {
  onCheck: () => void;
  check: boolean;
  invertedColors: boolean;
};

function Checkbox ({ check, onCheck, invertedColors = false }: Props) {
  const pathLength = useMotionValue<number>(0);
  const opacity = useTransform(pathLength, [0.05, 0.15], [0, 1]);

  return (
    <StyledCheckbox check={check} invertedColors={invertedColors}>
      <motion.div className="checkbox" onTap={onCheck}>
        <svg
          className="checkmark"
          xmlns="http://www.w3.org/2000/svg"
          height="100%"
          width="100%"
          viewBox="15 20 120 120"
        >
          <motion.path
            d="M38 74.707l24.647 24.646L116.5 45.5"
            fill="transparent"
            className="checkmark-path"
            strokeWidth="20"
            strokeLinecap="round"
            animate={{ pathLength: check ? 0.9 : 0 }}
            style={{ pathLength: pathLength, opacity: opacity }}
          />
        </svg>
      </motion.div>
    </StyledCheckbox>
  );
}

export default Checkbox;
