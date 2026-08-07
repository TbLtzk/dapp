import { useTranslation } from 'react-i18next';

import { media } from '@q-dev/q-ui-kit';
import styled from 'styled-components';

import ExplorerAddress from 'components/Custom/ExplorerAddress';
import { isSameAddress } from 'pages/L0Governance/helpers/l0-governance-signing';
import {
  isGovernanceOperatorEligible,
  useL0GovernanceEligibility,
} from 'pages/L0Governance/hooks/L0GovernanceEligibilityContext';

const StyledWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24px;
  align-items: start;
  margin-bottom: 16px;
  padding-top: 8px;
  font-size: 14px;
  line-height: 20px;

  ${media.lessThan('tablet')} {
    grid-template-columns: minmax(0, 1fr);
    gap: 12px;
  }
`;

const StyledInfo = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const StyledAddresses = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const StyledRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
`;

const StyledLabel = styled.span`
  flex-shrink: 0;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const StyledWarning = styled.p`
  margin: 8px 0 0;
  color: ${({ theme }) => theme.colors.errorMain};
  font-size: 14px;
`;

function L0GovernanceSigningInfo () {
  const { t } = useTranslation();
  const {
    status,
    rootAccount,
    aliasAccount,
    signingAddress,
    connectedAddress,
  } = useL0GovernanceEligibility();

  const usesAlias = Boolean(aliasAccount);

  if (
    !usesAlias ||
    !isGovernanceOperatorEligible(status) ||
    !rootAccount ||
    !signingAddress
  ) {
    return null;
  }

  const connectedViaAlias = Boolean(
    connectedAddress && aliasAccount && isSameAddress(connectedAddress, aliasAccount),
  );

  return (
    <StyledWrapper>
      <div>
        <StyledInfo>
          {connectedViaAlias
            ? t('L0_SIGNING_ALIAS_INFO_CONNECTED_AS_ALIAS')
            : t('L0_SIGNING_ALIAS_INFO_ROOT_USES_ALIAS')}
        </StyledInfo>
        {status === 'signing-unavailable' && (
          <StyledWarning>
            {t('L0_SIGNING_ADDRESS_UNAVAILABLE')}
          </StyledWarning>
        )}
      </div>
      <StyledAddresses>
        <StyledRow>
          <StyledLabel>{t('L0_SIGNING_ROOT_ACCOUNT')}</StyledLabel>
          <ExplorerAddress
            short
            semibold
            address={rootAccount}
          />
        </StyledRow>
        <StyledRow>
          <StyledLabel>{t('L0_SIGNING_REQUIRED_ADDRESS')}</StyledLabel>
          <ExplorerAddress
            short
            semibold
            address={signingAddress}
          />
        </StyledRow>
      </StyledAddresses>
    </StyledWrapper>
  );
}

export default L0GovernanceSigningInfo;
