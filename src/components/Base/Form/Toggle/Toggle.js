import React from 'react';

import { motion } from 'framer-motion';

import { ToggleContaier } from './styles';

const Toggle = ({ checked, toggleSwitch, label }) => {
  return (
    <ToggleContaier checked={checked} onClick={toggleSwitch}>
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
    </ToggleContaier>
  );
};

export default Toggle;
