import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { trimString } from '@q-dev/utils';
import styled from 'styled-components';

import CopyToClipboard from 'components/CopyToClipboard';
import InfoTooltip from 'components/Tooltips/InfoTooltip';
import Button from 'ui/Button';
import Dropdown from 'ui/Dropdown';
import Icon from 'ui/Icon';

import useNetworkConfig from 'hooks/useNetworkConfig';

import { useBaseVotingWeightInfo } from 'store/proposals/hooks';

import { formatDateDMY } from 'utils/date';

const StyledWrapper = styled.div`
  grid-area: constitution;
  padding: 16px 16px 16px 24px;

  .constitution__menu {
    background-color: ${({ theme }) => theme.colors.block};
    display: grid;
    width: max-content;
    min-width: 156px;
    padding: 4px 0;
    border-radius: 8px;
    box-shadow:
      0 4px 4px ${({ theme }) => theme.colors.blockShadowDark},
      0 -1px 2px ${({ theme }) => theme.colors.blockShadowLight};
  }

  .constitution__menu-link {
    display: flex;
    gap: 8px;
    align-items: center;
    padding: 8px 12px;
    transition: background-color 100ms ease-out;

    &:hover {
      background-color: ${({ theme }) => theme.colors.blockHover};
    }
  }

  .constitution__menu-btn {
    width: 32px;
    height: 32px;
    border-radius: 50%;
  }

  .constutition__hash {
    margin-top: 4px;
  }

  .constutition__date {
    margin-top: 16px;
  }
`;

function ConstitutionBlock () {
  const { t, i18n } = useTranslation();
  const { constitutionHash, getConstitutionHash } = useBaseVotingWeightInfo();
  const { constitutionUrl, constitutionUpdatedAt } = useNetworkConfig();

  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    getConstitutionHash();
  }, []);

  return (
    <StyledWrapper className="block">
      <div className="block__header">
        <h2 className="text-lg">
          <span>{t('CONSTITUTION')}</span>
          <InfoTooltip topic="constitution" />
        </h2>

        <Dropdown
          right
          open={menuOpen}
          trigger={(
            <Button
              icon
              alwaysEnabled
              className="constitution__menu-btn"
              look="ghost"
              active={menuOpen}
            >
              <Icon name="more-vertical" />
            </Button>
          )}
          onToggle={setMenuOpen}
        >
          <div className="constitution__menu">
            <a
              className="constitution__menu-link text-md"
              href={`${constitutionUrl}/constitution/latest`}
              target="_blank"
              rel="noreferrer"
            >
              <Icon name="download" />
              <span>{t('DOWNLOAD')}</span>
            </a>
            <a
              className="constitution__menu-link text-md"
              href={constitutionUrl}
              target="_blank"
              rel="noreferrer"
            >
              <Icon name="folder" />
              <span>{t('CHECK_ARCHIVE')}</span>
            </a>
          </div>
        </Dropdown>
      </div>

      <div className="constutition__hash text-xl font-semibold">
        <span>{trimString(constitutionHash)}</span>
        <CopyToClipboard value={constitutionHash} />
      </div>

      <p className="constutition__date text-sm font-light">
        {t('LAST_UPDATE', { date: formatDateDMY(constitutionUpdatedAt, i18n.language) })}
      </p>
    </StyledWrapper>
  );
};

export default ConstitutionBlock;
