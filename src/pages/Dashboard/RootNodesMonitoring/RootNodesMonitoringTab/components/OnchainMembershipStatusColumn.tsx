
import { useTranslation } from 'react-i18next';

import styled from 'styled-components';
import { OnchainMembershipStatus } from 'typings/root-nodes';

interface Props {
  status: OnchainMembershipStatus;
}

const StyledWrapper = styled.p<{$status: OnchainMembershipStatus}>`
  display: flex;
  align-items: center;
  gap: 5px;

  &::before {
    display: inline-block;
    content: '';
    border-radius: 50%;
    height: 8px;
    width: 8px;
    margin-right: 4px;
    background-color: ${({ theme, $status }) => {
      switch ($status) {
        case 'member':
          return theme.colors.successMain;
        case 'not-member':
          return theme.colors.errorMain;
      }
    }};
  }
`;

function OnchainMembershipStatusColumn ({ status }: Props) {
  const { t } = useTranslation();

  const statusTextMap: Record<OnchainMembershipStatus, string> = {
    member: t('STATUS_ONCHAIN_MEMBER'),
    'not-member': t('STATUS_NOT_ONCHAIN_MEMBER'),
  };

  return (
    <StyledWrapper $status={status} className="font-semibold">
      {statusTextMap[status]}
    </StyledWrapper>
  );
}

export default OnchainMembershipStatusColumn;
