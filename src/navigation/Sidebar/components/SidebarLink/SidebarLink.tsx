import { ReactNode, useState } from 'react';
import { Accordion } from 'react-bootstrap';

import Icon, { IconName } from 'ui/Icon';

import { AccordionContent, StyledLink } from './styles';

interface Props {
  to: string
  title: string
  icon?: IconName
  count?: number
  accordion?: boolean
  exact?: boolean
  children?: ReactNode
}

function SidebarLink ({
  to,
  title,
  icon,
  count = 0,
  accordion = false,
  exact = true,
  children
}: Props) {
  const [isOpen, setIsOpen] = useState(localStorage.getItem(to) || '0');

  const toggleMenu = (val: string | null) => {
    setIsOpen(val || '0');
    localStorage.setItem(to, val || '0');
  };

  return (
    // TODO: Remove accordion when links are flattened
    <Accordion
      activeKey={isOpen}
      onSelect={toggleMenu}
    >
      <StyledLink
        className="text-md"
        exact={exact}
        activeClassName={accordion ? '' : 'active font-bold'}
        to={to}
      >
        <div className="sidebar-link-group">
          {icon && <Icon name={icon} />}
          <span>{title}</span>
        </div>

        <div className="sidebar-link-group">
          {count > 0 && (
            <span className="sidebar-link-count text-sm font-semibold">{count}</span>
          )}
          {accordion && (
            <Icon
              name={isOpen === '0' ? 'expand-more' : 'expand-less'}
              onClick={() => toggleMenu(isOpen === '0' ? '1' : '0')}
            />
          )}
        </div>
      </StyledLink>

      {children && (
        <Accordion.Collapse eventKey="1">
          <AccordionContent>{children}</AccordionContent>
        </Accordion.Collapse>
      )}
    </Accordion>
  );
}

export default SidebarLink;
