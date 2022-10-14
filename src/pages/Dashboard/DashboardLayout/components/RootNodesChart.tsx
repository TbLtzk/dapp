import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { Spinner } from '@q-dev/q-ui-kit';
import { formatNumber } from '@q-dev/utils';
import styled from 'styled-components';

import Button from 'components/Button';
import AddressIcon from 'components/Custom/AddressIcon';
import DonutChart from 'components/DonutChart';
import InfoTooltip from 'components/Tooltips/InfoTooltip';

import { useRootNodes } from 'store/root-nodes/hooks';

const StyledWrapper = styled.div`
  grid-area: root;

  .root-nodes__header {
    margin-right: -8px;
  }

  .root-nodes__loading-wrp {
    display: grid;
    place-content: center;
    padding: 40px;
  }
`;

function RootNodesChart () {
  const { t } = useTranslation();
  const { rootMembers, rootMembersLoading, getRootMembers } = useRootNodes();

  useEffect(() => {
    getRootMembers();
  }, []);

  return (
    <StyledWrapper className="block">
      <div className="root-nodes__header block__header">
        <h3 className="text-h3">
          <span>{t('ROOT_NODE_STAKING')}</span>
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
            <div className="root-nodes__loading-wrp">
              <Spinner size={96} thickness={4} />
            </div>
          )
          : (
            <DonutChart
              totalLabel={t('TOTAL_STAKE')}
              formatValue={(val) => `${formatNumber(val, 2)} Q`}
              options={rootMembers.map((item) => ({
                label: item.address,
                value: Number(item.stakeAmount),
                icon: <AddressIcon address={item.address} />,
                isAddress: true
              }))}
            />
          )}
      </div>
    </StyledWrapper>
  );
}

export default RootNodesChart;
