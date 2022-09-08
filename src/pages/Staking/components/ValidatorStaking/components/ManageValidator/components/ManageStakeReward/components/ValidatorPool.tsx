import { useTranslation } from 'react-i18next';

import { media } from '@q-dev/q-ui-kit';
import styled from 'styled-components';

import { useValidators } from 'store/validators/hooks';

import { formatAsset } from 'utils/numbers';

const StyledWrapper = styled.div`
  .content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
  }

  ${media.lessThan('medium')} {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .balance-overview-refresh {
    display: flex;
    gap: 16px;
    align-items: center;

    ${media.lessThan('medium')} {
      justify-content: space-between;
    }
  }

  .balance-overview-refresh-icon {
    font-size: 20px;
  }
`;

function ValidatorPool () {
  const { t } = useTranslation();
  const {
    validatorTotalStake,
    validatorDelegatedStake,
    validatorAccountableTotalStake,
    validatorAccountableSelfStake
  } = useValidators();

  const validatorPoolInfo = [
    {
      id: 'total-stake',
      label: t('TOTAL_STAKE'),
      value: formatAsset(validatorTotalStake, 'Q'),
    },
    {
      id: 'own-stake',
      label: t('VALIDATOR_OWN_STAKE'),
      value: formatAsset(validatorAccountableSelfStake, 'Q'),
    },
    {
      id: 'delegated-stake',
      label: t('DELEGATED_STAKE'),
      value: formatAsset(validatorDelegatedStake, 'Q'),
    },
    {
      id: 'accountable-stake',
      label: t('ACCOUNTABLE_STAKE'),
      value: formatAsset(validatorAccountableTotalStake, 'Q'),
    },
  ];

  return (
    <StyledWrapper className="block">
      <div className="block__header">
        <h3 className="text-h3">{t('VALIDATOR_POOL')}</h3>
      </div>
      <div className="content block__content">
        {validatorPoolInfo.map(({ id, label, value }) => (
          <div key={id}>
            <p className="color-secondary text-md">{label}</p>
            <p className="color-primary text-md">{value}</p>
          </div>
        ))}
      </div>
    </StyledWrapper>
  );
}

export default ValidatorPool;
