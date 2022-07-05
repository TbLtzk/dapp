import { FC, ReactElement } from 'react';
import { Switch, useLocation } from 'react-router';

import { AnimatePresence } from 'framer-motion';

const TabSwitch: FC<{ children: ReactElement }> = ({ children }) => {
  const location = useLocation();

  return (
    <AnimatePresence exitBeforeEnter onExitComplete={() => window.scrollTo(0, 0)}>
      <Switch key={location.pathname} location={location}>
        {children}
      </Switch>
    </AnimatePresence>
  );
};

export default TabSwitch;
