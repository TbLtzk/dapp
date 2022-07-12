
import Icon, { IconName } from 'ui/Icon';

import { StyledLink } from './styles';

interface Props {
  to: string
  title: string
  icon?: IconName
  count?: number
  accordion?: boolean
  exact?: boolean
}

function SidebarLink ({
  to,
  title,
  icon,
  count = 0,
  accordion = false,
  exact = true,
}: Props) {
  return (
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
      </div>
    </StyledLink>

  );
}

export default SidebarLink;
