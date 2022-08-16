import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import styled from 'styled-components';
import { media } from 'styles/media';

import InfoTooltip from 'components/Tooltips/InfoTooltip';
import Button from 'ui/Button';
import Icon from 'ui/Icon';

import useAnimateNumber from 'hooks/useAnimateNumber';

import { getStableCoinTotalSupply, getSystemBalance } from 'store/system-balance/action-creators';
import { stableCoinTotalSupplySelector, systemBalanceSelector } from 'store/system-balance/selectors';

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

    ${media.lessThan('tablet')} {
      grid-template-columns: 1fr;
      gap: 16px;
    }
  }

  .saving__value {
    padding: 24px;
    display: grid;
    gap: 4px;

    ${media.lessThan('tablet')} {
      padding: 0;
      gap: 0;
    }

    &:not(:first-child) {
      border-left: 1px solid ${({ theme }) => theme.colors.blockDivider};

      ${media.lessThan('tablet')} {
        border-left: none;
      }
    }
  }
`;

function SavingBorrowingBlock () {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const systemBalance = useSelector(systemBalanceSelector);
  const systemBalanceRef = useAnimateNumber(systemBalance, '');

  const totalSupply = useSelector(stableCoinTotalSupplySelector);
  const totalSupplyRef = useAnimateNumber(totalSupply, '');

  useEffect(() => {
    dispatch(getSystemBalance());
    dispatch(getStableCoinTotalSupply());
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
