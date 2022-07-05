import { HTMLAttributes } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import { AnimateSharedLayout, motion } from 'framer-motion';

import { TabsContainer } from './styles';

export type TabsType = {
  id: string;
  label: string;
  link: string;
  count?: number
};

interface Props extends HTMLAttributes<HTMLDivElement> {
  tabs: TabsType[]
}

function Tabs ({ tabs, ...rest }: Props) {
  const { pathname } = useLocation();

  return (
    <TabsContainer {...rest}>
      <AnimateSharedLayout>
        {tabs.map(({ id, label, link, count }) => (
          <NavLink
            key={id}
            className="tab text-lg"
            activeClassName="active font-semibold"
            to={link}
          >
            <span className="tab-label">{label}</span>

            {link === pathname && (
              <motion.div
                className="tab-active"
                layoutId="underline"
                transition={{ duration: 0.2 }}
              />
            )}

            {Number(count) > 0 && <span className="tab-count">{count}</span>}
          </NavLink>
        ))}
      </AnimateSharedLayout>
    </TabsContainer>
  );
}

export default Tabs;
