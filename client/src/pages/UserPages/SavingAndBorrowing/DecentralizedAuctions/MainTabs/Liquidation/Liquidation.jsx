import React, { useEffect } from 'react';
import { drizzleReactHooks } from '@drizzle/react-plugin';
import { useDispatch, useSelector } from 'react-redux';
import { errorM, loadingProposals, proposalsArr } from 'store/selectors/voting/proposals';

import { Col } from 'react-bootstrap';

import ProposalsList from 'pages/UserPages/QGovernance/components/ProposalsList';
import { Title, WrapDescr } from '../../../../QGovernance/components/QTypeProposalsTabs/styles';

const { useDrizzle } = drizzleReactHooks;

function Liquidation() {
  const { drizzle } = useDrizzle();
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(getQProposals(drizzle));
  }, []);

  const loading = useSelector(loadingProposals);
  const errorMessage = useSelector(errorM);
  const proposals = useSelector(proposalsArr);

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

export default Liquidation;

