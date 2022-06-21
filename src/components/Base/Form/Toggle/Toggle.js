import React from 'react';

import { motion } from 'framer-motion';

import { ToggleContainer } from './styles';

const Toggle = ({ checked, toggleSwitch, label }) => {
  return (
    <ToggleContainer checked={checked} onClick={toggleSwitch}>
      <label className="toggle-label">{label}</label>
      <div className="toggle-background">
        <motion.div
          layout
          className="toggle-circle"
          transition={{
            type: 'spring',
            stiffness: 700,
            damping: 30,
          }}
        />
      </div>
    </ToggleContainer>
  );
};

export default Toggle;
