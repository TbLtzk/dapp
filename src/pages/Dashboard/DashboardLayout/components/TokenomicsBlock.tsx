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
import useInfinityNumber from 'hooks/useInfinityNumber';

import { getSystemReserveBalance } from 'store/system-balance/action-creators';
import { systemReserveBalanceSelector } from 'store/system-balance/selectors';
import { getDefaultAllocationProxy } from 'store/tokenomics/action-creators';
import { defaultAllocationProxySelector } from 'store/tokenomics/selectors';

import { RoutePaths } from 'constants/routes';

const StyledWrapper = styled.div`
  grid-area: tokenomics;
  padding: 16px 16px 16px 24px;

  .tokenomics__header {
    display: flex;
    align-items: center;
  }

  .tokenomics__header-icon {
    font-size: 24px;
    margin-right: 8px;
  }

  .tokenomics__values {
    margin-top: 8px;
    display: grid;
    grid-template-columns: 1fr 1fr;

    ${media.lessThan('tablet')} {
      grid-template-columns: 1fr;
      gap: 16px;
    }
  }

  .tokenomics__value {
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

function TokenomicsBlock () {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const reserveBalance = useSelector(systemReserveBalanceSelector);
  const reserveBalanceRef = useInfinityNumber(reserveBalance, ' Q');

  const allocationProxy = useSelector(defaultAllocationProxySelector);
  const allocationProxyRef = useAnimateNumber(allocationProxy, ' Q');

  useEffect(() => {
    dispatch(getDefaultAllocationProxy(false));
    dispatch(getSystemReserveBalance());
  }, []);

  return (
    <StyledWrapper className="block">
      <div className="block__header">
        <h2 className="tokenomics__header text-lg">
          <Icon className="tokenomics__header-icon" name="reward" />
          <span>{t('TOKENOMICS')}</span>
          <InfoTooltip topic="tokenomics" />
        </h2>

        <Link to={RoutePaths.dashboardTokenomics}>
          <Button
            icon
            block
            look="ghost"
          >
            <Icon name="chevron-right" />
          </Button>
        </Link>
      </div>

      <div className="tokenomics__values">
        <div className="tokenomics__value">
          <p ref={reserveBalanceRef} className="text-xl font-semibold">0 Q</p>
          <p className="text-md color-secondary">{t('Q_SYSTEM_RESERVE')}</p>
        </div>

        <div className="tokenomics__value">
          <p ref={allocationProxyRef} className="text-xl font-semibold" />
          <p className="text-md color-secondary">{t('DEFAULT_ALLOCATION_PROXY')}</p>
        </div>
      </div>
    </StyledWrapper>
  );
}

export default TokenomicsBlock;
