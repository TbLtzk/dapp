import { HTMLAttributes } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import { AnimateSharedLayout, motion } from 'framer-motion';

import { TabsContainer } from './styles';

interface Props extends HTMLAttributes<HTMLDivElement> {
  tabs: {
    id: string;
    label: string;
    link: string;
    count?: number;
  }[];
}

function Tabs ({ tabs, ...rest }: Props) {
  const { pathname } = useLocation();

  return (
    <TabsContainer {...rest}>
      <AnimateSharedLayout>
        {tabs.map(({ id, label, link, count }) => (
          <NavLink
            key={id}
            className="tab"
            activeClassName="active"
            to={link}
          >
            <h3 className="text-lg tab-label">{label}</h3>
            {link === pathname && <motion.div className="tab-active" layoutId="underline" />}
            {Number(count) > 0 && <span className="tab-count">{count}</span>}
          </NavLink>
        ))}
      </AnimateSharedLayout>
    </TabsContainer>
  );
}

export default Tabs;
