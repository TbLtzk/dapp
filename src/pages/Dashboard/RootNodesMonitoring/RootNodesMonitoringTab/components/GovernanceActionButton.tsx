import { ReactNode, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Modal, Tooltip } from '@q-dev/q-ui-kit';
import styled from 'styled-components';

import Button from 'components/Button';
import { L0GovernanceActionGuardResult } from 'pages/L0Governance/hooks/useL0GovernanceActionGuard';
import { L0GovernanceAdvisory } from 'pages/L0Governance/hooks/useL0GovernanceAdvisoryGuard';

const StyledAdvisoryButton = styled(Button)`
  &&& {
    background: transparent;
    border: 1px solid ${({ theme }) => theme.colors.warningSecondary};
    color: ${({ theme }) => theme.colors.textPrimary};

    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.tertiaryLight};
      border-color: ${({ theme }) => theme.colors.warningSecondary};
      color: ${({ theme }) => theme.colors.textPrimary};
    }
  }
`;

const StyledAdvisoryTooltipList = styled.ul`
  margin: 0;
  padding-left: 16px;
`;

const StyledAdvisoryList = styled.ul`
  margin: 0;
  padding-left: 20px;
`;

const StyledModalActions = styled.div`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  margin-top: 16px;
`;

interface Props {
  guard: L0GovernanceActionGuardResult;
  advisories?: L0GovernanceAdvisory[];
  loading?: boolean;
  onClick: () => void;
  children: ReactNode;
}

function GovernanceActionButton ({
  guard,
  advisories = [],
  loading,
  onClick,
  children,
}: Props) {
  const { t } = useTranslation();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const showDisabledTooltip = !guard.enabled && guard.disabledReasons.length > 0;
  const hasAdvisories = guard.enabled && advisories.length > 0;

  const advisoryTooltip = useMemo(() => (
    <StyledAdvisoryTooltipList>
      {advisories.map((advisory) => (
        <li key={advisory.id}>{advisory.title}</li>
      ))}
    </StyledAdvisoryTooltipList>
  ), [advisories]);

  const handleClick = () => {
    if (!guard.enabled) {
      return;
    }

    if (hasAdvisories) {
      setIsConfirmOpen(true);
      return;
    }

    onClick();
  };

  const handleConfirm = () => {
    setIsConfirmOpen(false);
    onClick();
  };

  const ActionButton = hasAdvisories ? StyledAdvisoryButton : Button;

  const button = (
    <ActionButton
      alwaysEnabled
      compact
      disabled={!guard.enabled}
      loading={loading}
      look={hasAdvisories ? 'secondary' : undefined}
      onClick={handleClick}
    >
      {children}
    </ActionButton>
  );

  const wrappedButton = showDisabledTooltip
    ? (
      <Tooltip
        disabled={!showDisabledTooltip}
        trigger={<span>{button}</span>}
      >
        {guard.disabledReasons[0]}
      </Tooltip>
    )
    : hasAdvisories
      ? (
        <Tooltip trigger={<span>{button}</span>}>
          {advisoryTooltip}
        </Tooltip>
      )
      : button;

  return (
    <>
      {wrappedButton}

      <Modal
        open={isConfirmOpen}
        title={t('L0_ADVISORY_CONFIRM_TITLE')}
        onClose={() => setIsConfirmOpen(false)}
      >
        <StyledAdvisoryList>
          {advisories.map((advisory) => (
            <li key={advisory.id}>
              <strong>{advisory.title}</strong>
              <p>{advisory.message}</p>
            </li>
          ))}
        </StyledAdvisoryList>

        <StyledModalActions>
          <Button look="ghost" onClick={() => setIsConfirmOpen(false)}>
            {t('L0_ADVISORY_CANCEL')}
          </Button>
          <Button look="danger" onClick={handleConfirm}>
            {t('L0_ADVISORY_CONTINUE_ANYWAY')}
          </Button>
        </StyledModalActions>
      </Modal>
    </>
  );
}

export default GovernanceActionButton;
