import React, { useEffect } from 'react';
import { drizzleReactHooks } from '@drizzle/react-plugin';
import { useDispatch, useSelector } from 'react-redux';
import { getQProposals } from 'store/actions/action-creaters/voting/qproposals';
import { errorM, loadingProposals, proposalsArr } from 'store/selectors/voting/qproposals';

import { Col } from 'react-bootstrap';

import ProposalsList from '../ProposalsList';
import { Title, WrapDescr } from '../../../../QGovernance/components/QTypeProposalsTabs/styles';
import { getPastEvents, bn } from '../../../../../../api/contracts/Voting/handler/commonFunc';
import { userAddressMetamask } from '../../../../../../store/selectors/user-inf';

const { useDrizzle } = drizzleReactHooks;

function TabContent(props) {
  const { activeTab } = props;
  const { drizzle } = useDrizzle();
  const dispatch = useDispatch();
  console.log('drizzle', drizzle);
  const userAddress = useSelector(userAddressMetamask);

  useEffect(() => {
    dispatch(getQProposals(drizzle));
  }, []);

  const loading = useSelector(loadingProposals);
  const errorMessage = useSelector(errorM);
  const proposals = useSelector(proposalsArr);

  useEffect(async () => {
    // const result = await getPastEvents(drizzle, 'LiquidationAuction', 'AuctionStarted');
    // const result = await drizzle.contracts.LiquidationAuction.methods.auctions().call();
    // const vaultId = 0;
    // const bid = bn(100);
    // const result = await drizzle.contracts.LiquidationAuction.methods.startAuction(
    //   userAddress, vaultId, bid)
    //   .send({ from: userAddress });
    // console.log('LiquidationAuction', result);

  }, []);

  return (
    <Col xs={12}>
      <Title>Active Auctions</Title>
      <WrapDescr>{proposals?.length + ' auctions'}</WrapDescr>
      <ProposalsList
        activeTab="q-proposals"
        proposals={proposals}
        loading={loading}
        errorMessage={errorMessage}
        proposalsKind="Liquidation"
      />
    </Col>

  );
}

export default TabContent;

