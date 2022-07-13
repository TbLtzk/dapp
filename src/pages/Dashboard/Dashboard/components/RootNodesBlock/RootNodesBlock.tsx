import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Button from 'ui/Button';
import DonutChart from 'ui/DonutChart';
import Spinner from 'ui/Spinner';

import AddressIcon from 'components/Custom/AddressIcon';
import InfoTooltip from 'components/Custom/InfoTooltip';

import { getRootMembers } from 'store/root-node/action-creators';
import { loadingRootMembersSelector, rootMembersSelector } from 'store/root-node/selectors';

import TABLE_TYPES from 'constants/tableTypes';
import { formatNumber } from 'func/formatters';
import { trimAddress } from 'func/useful';

function RootNodesBlock () {
  const dispatch = useDispatch();

  const rootMembers = useSelector(rootMembersSelector);
  const isLoading = useSelector(loadingRootMembersSelector);

  useEffect(() => {
    dispatch(getRootMembers(TABLE_TYPES.rootNodesShort));
  }, [dispatch]);

  return (
    <div className="block">
      <div className="block__header">
        <h3 className="text-h3">
          <span>Root Node Staking</span>
          <InfoTooltip topic="root-node-panel" />
        </h3>

        <Link to="/staking/root-node-staking">
          <Button
            block
            compact
            alwaysEnabled
            look="ghost"
          >
            Show more
          </Button>
        </Link>
      </div>

      <div className="block__content">
        {isLoading
          ? (
            <div
              style={{
                display: 'grid',
                placeContent: 'center',
                padding: '40px'
              }}
            >
              <Spinner size={96} thickness={4} />
            </div>
          )
          : (
            <DonutChart
              totalLabel="Total Stake"
              formatValue={(val) => `${formatNumber(val, 2)} Q`}
              options={rootMembers.map((item: any) => ({
                label: trimAddress(item.address),
                value: item.stakeAmount,
                icon: <AddressIcon address={item.address} />,
              }))}
            />
          )}
      </div>
    </div>
  );
}

export default RootNodesBlock;
