import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { Spinner } from '@q-dev/q-ui-kit';
import styled from 'styled-components';

import Button from 'components/Button';
import InfoTooltip from 'components/Tooltips/InfoTooltip';

import RootNodesList from './RootNodesList';

import { useRootNodes } from 'store/root-nodes/hooks';

const StyledWrapper = styled.div`
  grid-area: root;

  .root-nodes-block__header {
    margin-right: -8px;
  }

  .root-nodes-block__loading-wrp {
    display: grid;
    place-content: center;
    padding: 40px;
  }
`;

function RootNodesBlock () {
  const { t } = useTranslation();
  const { rootMembersLoading, getRootMembers } = useRootNodes();

  useEffect(() => {
    getRootMembers();
  }, []);

  return (
    <StyledWrapper className="block">
      <div className="root-nodes-block__header block__header">
        <h3 className="text-h3">
          <span>{t('ROOT_NODE_LIST')}</span>
          <InfoTooltip topic="root-node-panel" />
        </h3>

        <Link to="/staking/root-node-staking">
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
        {rootMembersLoading
          ? (
            <div className="root-nodes-block__loading-wrp">
              <Spinner size={96} thickness={4} />
            </div>
          )
          : <RootNodesList />
        }
      </div>
    </StyledWrapper>
  );
}

export default RootNodesBlock;
