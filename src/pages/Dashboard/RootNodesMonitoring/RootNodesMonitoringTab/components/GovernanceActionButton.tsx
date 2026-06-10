import { ReactNode } from 'react';

import { Tooltip } from '@q-dev/q-ui-kit';

import Button from 'components/Button';
import { L0GovernanceActionGuardResult } from 'pages/L0Governance/hooks/useL0GovernanceActionGuard';

interface Props {
  guard: L0GovernanceActionGuardResult;
  loading?: boolean;
  onClick: () => void;
  children: ReactNode;
}

function GovernanceActionButton ({ guard, loading, onClick, children }: Props) {
  const showTooltip = !guard.enabled && guard.disabledReasons.length > 0;

  const button = (
    <Button
      alwaysEnabled
      compact
      disabled={!guard.enabled}
      loading={loading}
      onClick={onClick}
    >
      {children}
    </Button>
  );

  if (!showTooltip) {
    return button;
  }

  return (
    <Tooltip
      disabled={!showTooltip}
      trigger={<span>{button}</span>}
    >
      {guard.disabledReasons[0]}
    </Tooltip>
  );
}

export default GovernanceActionButton;
