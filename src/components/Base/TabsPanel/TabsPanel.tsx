import { HTMLAttributes } from 'react';
import { NavLink } from 'react-router-dom';

import { TabsStyle } from './styles';

interface Props extends HTMLAttributes<HTMLDivElement> {
  tabs: {
    label: string
    link: string
    count?: number
  }[]
}

function TabsPanel ({ tabs, ...rest }: Props) {
  return (
    <TabsStyle {...rest}>
      {tabs.map(({ label, count, link }) => (
        <NavLink
          key={label}
          className="tab"
          activeClassName="active"
          to={link}
        >
          <span className="tab-label">{label}</span>
          {Number(count) > 0 && (
            <span className="tab-count">{count}</span>
          )}
        </NavLink>
      ))}
    </TabsStyle>
  );
}

export default TabsPanel;
