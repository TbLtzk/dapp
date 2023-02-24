import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Dropdown, Icon } from '@q-dev/q-ui-kit';
import styled from 'styled-components';
import { Asset } from 'typings/defi';

import Button from 'components/Button';

import useNetworkConfig from 'hooks/useNetworkConfig';

import { addBorrowTokenToWallet } from 'contracts/helpers/borrowing-core';
import { addQUSDTokenToWallet } from 'contracts/helpers/saving-assets-helper';

const StyledDropdown = styled(Dropdown)`
  .asset-menu {
    background-color: ${({ theme }) => theme.colors.backgroundPrimary};
    display: grid;
    width: max-content;
    min-width: 156px;
    padding: 4px 0;
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid ${({ theme }) => theme.colors.borderSecondary};
    box-shadow:
      0 4px 4px ${({ theme }) => theme.colors.blockShadowDark},
      0 -1px 2px ${({ theme }) => theme.colors.blockShadowLight};
  }

  .asset-menu-item {
    display: flex;
    gap: 8px;
    align-items: center;
    padding: 8px 12px;
    transition: background-color 100ms ease-out;
    background-color: transparent;
    border: none;
    color: ${({ theme }) => theme.colors.textPrimary};

    &:hover {
      background-color: ${({ theme }) => theme.colors.tertiaryLight};
    }
  }

  .asset-menu-btn {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    margin-top: -8px;
    margin-right: -8px;
  }

  .asset-menu-icon {
    width: 20px;
    height: auto;
  }
`;

interface Props {
  asset: 'QUSD' | Asset;
  contractAddress?: string;
}

function AssetMenu ({ asset, contractAddress }: Props) {
  const { t } = useTranslation();
  const { explorerUrl } = useNetworkConfig();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <StyledDropdown
      right
      open={menuOpen}
      trigger={(
        <Button
          icon
          alwaysEnabled
          className="asset-menu-btn"
          look="ghost"
          active={menuOpen}
        >
          <Icon name="more-vertical" />
        </Button>
      )}
      onToggle={setMenuOpen}
    >
      <div className="asset-menu">
        <button
          className="asset-menu-item text-md"
          onClick={() => asset === 'QUSD'
            ? addQUSDTokenToWallet()
            : addBorrowTokenToWallet(asset)
          }
        >
          <img
            className="asset-menu-icon"
            src="/icons/metamask.svg"
            alt="metamask"
          />
          <span>{t('ADD_TO_WALLET')}</span>
        </button>
        {contractAddress && (
          <a
            className="asset-menu-item text-md"
            href={`${explorerUrl}/address/${contractAddress}`}
            target="_blank"
            rel="noreferrer"
          >
            <Icon name="external-link" />
            <span>{t('VIEW_CONTRACT')}</span>
          </a>
        )}
      </div>
    </StyledDropdown>
  );
};

export default AssetMenu;
