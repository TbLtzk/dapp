import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import styled from 'styled-components';
import { media } from 'styles/media';

import { ProgressBarWrapper } from 'components/Base/ProgressBar/styles';
import ExplorerAddress from 'components/Custom/ExplorerAddress';
import Button from 'ui/Button';

import { useEnterShortList, useGetValidatorRank, useIsUserActiveValidator } from '../hooks';

import { accountBalance } from 'store/q-vault/selectors';
import { userAddressMetamask } from 'store/user-inf/selectors';
import { isUserValidatorSelector } from 'store/validators/selectors';

import { ZERO_ADDRESS } from 'constants/boundaries';
import { formatAsset } from 'utils/numbers';

const StyledWrapper = styled.div`
  grid-area: validator-info;

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

function ValidatorInfo () {
  const { t } = useTranslation();
  const userAddress = useSelector(userAddressMetamask);
  const walletBalance = useSelector(accountBalance);
  const isValidator = useSelector(isUserValidatorSelector);

  const validatorRank = useGetValidatorRank();
  const isUserActiveValidator = useIsUserActiveValidator();
  const enterShortList = useEnterShortList();

  const validator = useMemo(() => {
    if (isValidator) {
      return isUserActiveValidator
        ? { status: t('ACTIVE_VALIDATOR'), value: 1 }
        : { status: t('INACTIVE_VALIDATOR'), value: 81 };
    }
    return { status: t('NOT_A_VALIDATOR'), value: 100 };
  }, [isUserActiveValidator, isValidator]);

  return (
    <StyledWrapper className="block">
      <div className="block__header">
        <h3 className="text-h3">{t('MAIN_INFO')}</h3>
        {!isValidator && (
          <Button compact onClick={enterShortList}>
            {t('JOIN_VALIDATOR_RANKING')}
          </Button>
        )}
      </div>
      <div className="block__content">
        <div>
          <p className="color-secondary text-md">{t('STATUS')}</p>
          <ProgressBarWrapper value={validator.value}>
            <span />
            <p className="text-lg">{validator.status}</p>
          </ProgressBarWrapper>
        </div>
        <div>
          <p className="color-secondary text-md">{t('CURRENT_RANK')}</p>
          <p className="text-lg">{validatorRank}</p>
        </div>
        <div>
          <p className="color-secondary text-md">{t('AVAILABLE_Q_BALANCE')}</p>
          <p className="text-lg">{formatAsset(walletBalance, 'Q')}</p>
        </div>
        <div>
          <p className="color-secondary text-md">{t('ADDRESS')}</p>
          <div className="text-lg">
            {userAddress === ZERO_ADDRESS
              ? '-'
              : <ExplorerAddress
                short
                iconed
                address={userAddress}
              />}
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
}

export default ValidatorInfo;
