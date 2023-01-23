
import { useMemo } from 'react';

import { formatNumber } from '@q-dev/utils';
import styled from 'styled-components';

import AddressIcon from 'components/Custom/AddressIcon';
import ExplorerAddress from 'components/Custom/ExplorerAddress';

import { useRootNodes } from 'store/root-nodes/hooks';

export const RootNodesListContainer = styled.div`
  display: grid;
  gap: 16px;

  .root-nodes-list__item {
    display: grid;
    gap: 12px;
    grid-template-columns: minmax(0, 0.75fr) minmax(0, 0.25fr);
  }

  .root-nodes-list__lbl {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .root-nodes-list__icon {
    transform: scale(0.8);
    width: 20px;
  }

  .root-nodes-list__val {
    text-align: right;
  }
`;

function RootNodesList () {
  const { rootMembers } = useRootNodes();

  const items = useMemo(() => rootMembers.slice(0, 15), [rootMembers]);

  return (
    <RootNodesListContainer>
      {items.map((item) => (
        <div key={item.address} className="root-nodes-list__item">
          <div className="root-nodes-list__lbl">
            <div className="root-nodes-list__icon">
              <AddressIcon address={item.address} />
            </div>
            <ExplorerAddress
              semibold
              className="text-md"
              address={item.address}
            />
          </div>

          <p className="root-nodes-list__val text-md">{`${formatNumber(item.stakeAmount, 2)} Q`}</p>
        </div>
      ))}
    </RootNodesListContainer>
  );
};

export default RootNodesList;
