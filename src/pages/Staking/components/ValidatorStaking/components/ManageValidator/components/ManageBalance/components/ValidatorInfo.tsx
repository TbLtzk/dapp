import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { media } from '@q-dev/q-ui-kit';
import { formatAsset } from '@q-dev/utils';
import { useWeb3Context } from 'context/Web3ContextProvider';
import styled from 'styled-components';

import ValidatorStatusBar from 'components/Base/ValidatorStatusBar';
import Button from 'components/Button';
import ExplorerAddress from 'components/Custom/ExplorerAddress';

import useNetworkConfig from 'hooks/useNetworkConfig';
import { useGetValidatorRank, useValidatorStatus } from 'hooks/useValidatorStatus';

import { useEnterShortList } from '../hooks';

import { useQVault } from 'store/q-vault/hooks';
import { useValidators } from 'store/validators/hooks';

import { ZERO_ADDRESS } from 'constants/boundaries';

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
  const { address } = useWeb3Context();
  const { qTicker } = useNetworkConfig();
  const { walletBalance } = useQVault();
  const { isValidator, checkIsValidator } = useValidators();
  const { validatorRank } = useGetValidatorRank(address);
  const validatorStatus = useValidatorStatus(address);
  const enterShortList = useEnterShortList();

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
        {
          validatorStatus &&
          <div>
            <p className="color-secondary text-md">{t('STATUS')}</p>
            <ValidatorStatusBar status={validatorStatus.status}>
              <p className="text-lg">{validatorStatus.title}</p>
            </ValidatorStatusBar>
          </div>
        }
        <div>
          <p className="color-secondary text-md">{t('CURRENT_RANK')}</p>
          <p className="text-lg">{validatorRank ? `# ${validatorRank}` : '–'}</p>
        </div>
        <div>
          <p className="color-secondary text-md">{t('AVAILABLE_QGOV_BALANCE')}</p>
          <p className="text-lg">{formatAsset(walletBalance, qTicker)}</p>
        </div>
        <div>
          <p className="color-secondary text-md">{t('ADDRESS')}</p>
          <div className="text-lg">
            {address === ZERO_ADDRESS
              ? '-'
              : <ExplorerAddress
                short
                iconed
                address={address}
              />}
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
}

export default ValidatorInfo;
