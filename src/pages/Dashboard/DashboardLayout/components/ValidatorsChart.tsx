import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import styled from 'styled-components';

import AddressIcon from 'components/Custom/AddressIcon';
import InfoTooltip from 'components/Tooltips/InfoTooltip';
import Button from 'ui/Button';
import DonutChart from 'ui/DonutChart';
import Spinner from 'ui/Spinner';

import { useValidators } from 'store/validators/hooks';

import { RoutePaths } from 'constants/routes';
import { formatNumber } from 'utils/numbers';

const StyledWrapper = styled.div`
  grid-area: validators;
  
  .validators__header {
    margin-right: -8px;
  }

  .validators__loading-wrp {
    display: grid;
    place-content: center;
    padding: 40px;
  }
`;

function ValidatorsChart () {
  const { t } = useTranslation();
  const { validators, validatorsLoading, loadValidatorsShortList } = useValidators();

  useEffect(() => {
    loadValidatorsShortList();
  }, []);

  return (
    <StyledWrapper className="block">
      <div className="validators__header block__header">
        <h2 className="text-h3">
          <span>{t('VALIDATOR_STAKING')}</span>
          <InfoTooltip topic="validator-ranking" />
        </h2>

        <Link to={RoutePaths.stakingValidators}>
          <Button
            block
            compact
            alwaysEnabled
            look="ghost"
          >
            {t('SHOW_MORE')}
          </Button>
        </Link>
      </div>

      <div className="block__content">
        {validatorsLoading
          ? (
            <div className="validators__loading-wrp">
              <Spinner size={96} thickness={4} />
            </div>
          )
          : (
            <DonutChart
              totalLabel={t('TOTAL_STAKE')}
              formatValue={(val) => `${formatNumber(val, 2)} Q`}
              options={validators.map((item) => ({
                label: item.address,
                value: Number(item.balance),
                icon: <AddressIcon address={item.address} />,
              }))}
            />
          )}
      </div>
    </StyledWrapper>
  );
}

export default ValidatorsChart;
