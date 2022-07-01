import { ReactElement } from 'react';
import { Route } from 'react-router';

import { motion } from 'framer-motion';
// TODO: add proper animation
const tabsVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};

interface Props {
  exact: boolean;
  children: ReactElement;
  path: string;
}

const TabRoute = ({ children, exact, path }: Props) => (
  <Route exact={exact} path={path}>
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{
        duration: 0.1,
        easings: 'easeInOut'
      }}
      variants={tabsVariants}
    >
      {children}
    </motion.div>
  </Route>
);

export default TabRoute;
