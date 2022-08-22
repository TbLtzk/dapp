import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import styled from 'styled-components';
import { media } from 'styles/media';
import { fromWei } from 'web3-utils';

import ValidatorMenu from './ValidatorMenu';

import { validatorAcountableTotalStakeSelector, validatorWithdrawalInfo } from 'store/validators/selectors';

import { formatDateGMT, unixToDate } from 'utils/date';
import { formatAsset } from 'utils/numbers';

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
  const { t } = useTranslation();

  const userAccountableTotalStake = useSelector(validatorAcountableTotalStakeSelector);
  const withdrawalInfo = useSelector(validatorWithdrawalInfo);

  return (
    <StyledWrapper className="block">
      <div className="block__header">
        <h3 className="text-h3">{t('VALIDATOR_STAKING')}</h3>
        <ValidatorMenu />
      </div>

      <div className="block__content">
        <div>
          <p className="color-secondary text-md">{t('STAKE_IN_VALIDATOR_RANKING')}</p>
          <p className="text-lg">{formatAsset(userAccountableTotalStake, 'Q')}</p>
        </div>
        <div>
          <p className="color-secondary text-md">{t('ANNOUNCE_WITHDRAWAL')}</p>
          <p className="text-lg">{formatAsset(fromWei(withdrawalInfo.amount || '0'), 'Q')}</p>
        </div>
        <div>
          <p className="color-secondary text-md">{t('ANNOUNCEMENT_STATUS')}</p>
          <p className="text-lg">{Number(withdrawalInfo?.amount) > 0 ? t('PENDING') : '-'}</p>
        </div>
        <div>
          <p className="color-secondary text-md">{t('ANNOUNCEMENT_END')}</p>
          <p className="text-lg">
            {withdrawalInfo && Number(withdrawalInfo?.amount) > 0
              ? formatDateGMT(unixToDate(withdrawalInfo.endTime))
              : '-'}
          </p>
        </div>
      </div>
    </StyledWrapper>
  );
}

export default StakingInfo;
