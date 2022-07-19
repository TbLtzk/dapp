import Icon, { IconName } from 'ui/Icon';

import { StyledLink } from './styles';

interface Props {
  to: string;
  title: string;
  icon?: IconName;
  count?: number;
  accordion?: boolean;
  exact?: boolean;
}

function SidebarLink ({ to, title, icon, count = 0, exact = true }: Props) {
  return (
    <StyledLink
      className="text-md"
      exact={exact}
      to={to}
    >
      <div className="q-sidebar-link-group">
        {icon && <Icon name={icon} />}
        <span>{title}</span>
      </div>
      {count > 0 && (
        <div className="q-sidebar-link-group">
          <span className="q-sidebar-link-count text-sm font-semibold">{count}</span>
        </div>
      )}
    </StyledLink>
  );
}

export default SidebarLink;
