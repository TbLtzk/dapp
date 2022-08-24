import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import styled from 'styled-components';

import AddressIcon from 'components/Custom/AddressIcon';
import InfoTooltip from 'components/Tooltips/InfoTooltip';
import Button from 'ui/Button';
import DonutChart from 'ui/DonutChart';
import Spinner from 'ui/Spinner';

import { getRootMembers } from 'store/root-node/action-creators';
import { loadingRootMembersSelector, rootMembersSelector } from 'store/root-node/selectors';

import { TABLE_TYPES } from 'constants/tableTypes';
import { formatNumber } from 'utils/numbers';

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
  const dispatch = useDispatch();

  const rootMembers = useSelector(rootMembersSelector);
  const isLoading = useSelector(loadingRootMembersSelector);

  useEffect(() => {
    dispatch(getRootMembers(TABLE_TYPES.rootNodesShort));
  }, [dispatch]);

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
        {isLoading
          ? (
            <div className="root-nodes__loading-wrp">
              <Spinner size={96} thickness={4} />
            </div>
          )
          : (
            <DonutChart
              totalLabel={t('TOTAL_STAKE')}
              formatValue={(val) => `${formatNumber(val, 2)} Q`}
              options={rootMembers.map((item: any) => ({
                label: item.address,
                value: item.stakeAmount,
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
