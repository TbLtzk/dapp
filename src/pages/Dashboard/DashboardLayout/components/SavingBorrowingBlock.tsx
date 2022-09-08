import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { Icon, media } from '@q-dev/q-ui-kit';
import styled from 'styled-components';

import Button from 'components/Button';
import InfoTooltip from 'components/Tooltips/InfoTooltip';

import useAnimateNumber from 'hooks/useAnimateNumber';

import { useSystemBalance } from 'store/system-balance/hooks';

import { RoutePaths } from 'constants/routes';

const StyledWrapper = styled.div`
  grid-area: saving;
  padding: 16px 16px 16px 24px;

  .saving__header {
    display: flex;
    align-items: center;
  }

  .saving__header-icon {
    font-size: 24px;
    margin-right: 8px;
  }

  .saving__values {
    margin-top: 8px;
    display: grid;
    grid-template-columns: 1fr 1fr;

    ${media.lessThan('large')} {
      grid-template-columns: 1fr;
      gap: 16px;
    }
  }

  .saving__value {
    padding: 24px;
    display: grid;
    gap: 4px;

    ${media.lessThan('large')} {
      padding: 0;
      gap: 0;
    }

    &:not(:first-child) {
      border-left: 1px solid ${({ theme }) => theme.colors.blockDivider};

      ${media.lessThan('large')} {
        border-left: none;
      }
    }
  }
`;

function SavingBorrowingBlock () {
  const { t } = useTranslation();
  const {
    systemBalance,
    stableCoinTotalSupply,
    getSystemBalance,
    getStableCoinTotalSupply,
  } = useSystemBalance();

  const systemBalanceRef = useAnimateNumber(systemBalance, '');
  const totalSupplyRef = useAnimateNumber(stableCoinTotalSupply, '');

  useEffect(() => {
    getSystemBalance();
    getStableCoinTotalSupply();
  }, []);

  return (
    <StyledWrapper className="block">
      <div className="block__header">
        <h2 className="saving__header text-lg">
          <Icon className="saving__header-icon" name="coins" />
          <span>{t('SAVING_BORROWING')}</span>
          <InfoTooltip topic="saving-borrowing" />
        </h2>

        <Link to={RoutePaths.dashboardSavingBorrowing}>
          <Button
            icon
            block
            look="ghost"
          >
            <Icon name="chevron-right" />
          </Button>
        </Link>
      </div>

      <div className="saving__values">
        <div className="saving__value">
          <p ref={systemBalanceRef} className="text-xl font-semibold">0</p>
          <p className="text-md color-secondary">{t('QUSD_SYSTEM_BALANCE')}</p>
        </div>

        <div className="saving__value">
          <p ref={totalSupplyRef} className="text-xl font-semibold">0</p>
          <p className="text-md color-secondary">{t('QUSD_TOTAL_SUPPLY')}</p>
        </div>
      </div>
    </StyledWrapper>
  );
}

export default SavingBorrowingBlock;
