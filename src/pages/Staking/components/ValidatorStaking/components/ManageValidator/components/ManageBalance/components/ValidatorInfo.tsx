import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import styled from 'styled-components';
import { media } from 'styles/media';

import StatusBar, { StatusType } from 'components/Base/StatusBar';
import ExplorerAddress from 'components/Custom/ExplorerAddress';
import Button from 'ui/Button';

import { useEnterShortList, useGetValidatorRank, useIsUserActiveValidator } from '../hooks';

import { useParameters } from 'store/parameters/hooks';
import { useQVault } from 'store/q-vault/hooks';
import { useUser } from 'store/user/hooks';
import { useValidators } from 'store/validators/hooks';

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
  const user = useUser();
  const { walletBalance } = useQVault();
  const { isValidator, checkIsValidator, isValidatorInLongList } = useValidators();
  const { constitutionParameters } = useParameters();

  const maxNValidators = useMemo(() => {
    const maxNValidatorsType = constitutionParameters?.find(i => i.key === 'constitution.maxNValidators');
    return Number(maxNValidatorsType?.value || 0);
  }, [constitutionParameters]);

  const { validatorRank, validatorRankFormatted } = useGetValidatorRank();
  const isUserActiveValidator = useIsUserActiveValidator();
  const enterShortList = useEnterShortList();

  const validatorStatus = useMemo<{text: string; status: StatusType}>(() => {
    if (isValidatorInLongList) {
      if (validatorRank) {
        if (validatorRank <= maxNValidators) {
          return isUserActiveValidator
            ? { text: t('ACTIVE_VALIDATOR'), status: 'success' }
            : { text: t('INACTIVE_VALIDATOR'), status: 'danger' };
        }

        return { text: t('BACKUP_VALIDATOR'), status: 'warning' };
      }

      return { text: t('NOT_IN_SHORTLIST'), status: 'info' };
    }
    return { text: t('NOT_A_VALIDATOR'), status: 'info' };
  }, [isUserActiveValidator, isValidatorInLongList, validatorRank, t, maxNValidators]);

  useEffect(() => {
    checkIsValidator();
  }, []);

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
          <StatusBar status={validatorStatus.status}>
            <p className="text-lg">{validatorStatus.text}</p>
          </StatusBar>
        </div>
        <div>
          <p className="color-secondary text-md">{t('CURRENT_RANK')}</p>
          <p className="text-lg">{validatorRankFormatted}</p>
        </div>
        <div>
          <p className="color-secondary text-md">{t('AVAILABLE_Q_BALANCE')}</p>
          <p className="text-lg">{formatAsset(walletBalance, 'Q')}</p>
        </div>
        <div>
          <p className="color-secondary text-md">{t('ADDRESS')}</p>
          <div className="text-lg">
            {user.address === ZERO_ADDRESS
              ? '-'
              : <ExplorerAddress
                short
                iconed
                address={user.address}
              />}
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
}

export default ValidatorInfo;
