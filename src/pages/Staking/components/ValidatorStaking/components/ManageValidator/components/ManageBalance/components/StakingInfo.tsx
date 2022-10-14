import { useTranslation } from 'react-i18next';

import { media } from '@q-dev/q-ui-kit';
import { formatAsset } from '@q-dev/utils';
import styled from 'styled-components';
import { fromWei } from 'web3-utils';

import ValidatorMenu from './ValidatorMenu';

import { useValidators } from 'store/validators/hooks';

import { formatDateGMT, unixToDate } from 'utils/date';

const StyledWrapper = styled.div`
  grid-area: staking-info;

  .block__content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;

    ${media.lessThan('medium')} {
      grid-template-columns: 1fr;
      gap: 16px;
    }
  }
`;

function StakingInfo () {
  const { t, i18n } = useTranslation();
  const { validatorAccountableTotalStake, validatorWithdrawalInfo } = useValidators();

  return (
    <StyledWrapper className="block">
      <div className="block__header">
        <h3 className="text-h3">{t('VALIDATOR_STAKING')}</h3>
        <ValidatorMenu />
      </div>

      <div className="block__content">
        <div>
          <p className="color-secondary text-md">{t('STAKE_IN_VALIDATOR_RANKING')}</p>
          <p className="text-lg">{formatAsset(validatorAccountableTotalStake, 'Q')}</p>
        </div>
        <div>
          <p className="color-secondary text-md">{t('ANNOUNCED_FOR_WITHDRAWAL')}</p>
          <p className="text-lg">{formatAsset(fromWei(validatorWithdrawalInfo.amount || '0'), 'Q')}</p>
        </div>
        <div>
          <p className="color-secondary text-md">{t('ANNOUNCEMENT_STATUS')}</p>
          <p className="text-lg">{Number(validatorWithdrawalInfo.amount) > 0 ? t('PENDING') : '-'}</p>
        </div>
        <div>
          <p className="color-secondary text-md">{t('ANNOUNCEMENT_END')}</p>
          <p className="text-lg">
            {Number(validatorWithdrawalInfo.amount) > 0
              ? formatDateGMT(unixToDate(validatorWithdrawalInfo.endTime), i18n.language)
              : '-'}
          </p>
        </div>
      </div>
    </StyledWrapper>
  );
}

export default StakingInfo;
