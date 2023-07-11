import { useTranslation } from 'react-i18next';

import { Icon, Progress, Tooltip } from '@q-dev/q-ui-kit';
import { formatAsset } from '@q-dev/utils';
import styled from 'styled-components';
import { BorrowingVault, StablecoinAsset } from 'typings/defi';

import Button from 'components/Button';

const StyledWrapper = styled.div`
  .vault-card-title-wrp {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .vault-card-borrowed {
    margin-top: 16px;
    margin-bottom: 8px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 4px;
  }

  .vault-card-collateral {
    margin-top: 20px;
  }

  .vault-card-liquidated {
    padding: 4px 12px;
    background-color: ${({ theme }) => theme.colors.tertiaryLight};
    border-radius: 32px;
  }
`;

interface Props {
  vault: BorrowingVault;
  onManageClick: (vault: BorrowingVault) => void;
  stablecoin: StablecoinAsset;
}

function VaultCard ({ vault, onManageClick, stablecoin }: Props) {
  const { t } = useTranslation();

  const LIQUIDATION_WARN_THRESHOLD = 0.9;
  const evaluatedCollateral = Number(vault.lockedCollateral) * Number(vault.assetPrice);
  const isCloseToLiquidation = Number(vault.outstandingDebt) > LIQUIDATION_WARN_THRESHOLD * evaluatedCollateral;

  return (
    <StyledWrapper className="block">
      <div className="block__header">
        <div className="vault-card-title-wrp">
          <h3 className="text-h3">{t('VAULT_NUMBER', { id: vault.id })}</h3>
          {isCloseToLiquidation && (
            <Tooltip trigger={<Icon name="warning" className="color-error" />}>
              {t('CLOSE_LIQUIDATION_TIP')}
            </Tooltip>
          )}
        </div>

        {vault.isLiquidated
          ? <p className="text-md color-secondary vault-card-liquidated">{t('LIQUIDATED')}</p>
          : (
            <Button
              compact
              look="ghost"
              disabled={vault.isLiquidated}
              onClick={() => onManageClick(vault)}
            >
              <Icon name="manage" />
              <span>{t('MANAGE')}</span>
            </Button>
          )
        }
      </div>

      <div className="vault-card-main">
        <p className="vault-card-borrowed">
          <span className="text-md color-secondary">
            {t('BORROWED')}
          </span>

          <span className="text-md font-semibold">
            {formatAsset(vault.outstandingDebt, stablecoin)} / {formatAsset(vault.borrowingLimit, stablecoin)}
          </span>
        </p>
        <Progress value={Number(vault.outstandingDebt)} max={Number(vault.borrowingLimit)} />
        <p className="vault-card-collateral text-md">
          <span className="font-light">{t('COLLATERAL_VALUE')}</span>
          {' '}
          <span>{formatAsset(vault.lockedCollateral, vault.colKey)}</span>
          {' '}
          <span className="font-light">≈ {formatAsset(evaluatedCollateral, stablecoin)}</span>
        </p>
      </div>
    </StyledWrapper>
  );
}

export default VaultCard;
