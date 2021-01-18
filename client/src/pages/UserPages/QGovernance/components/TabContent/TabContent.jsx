import React, { useEffect, useMemo } from 'react';
import { drizzleReactHooks } from '@drizzle/react-plugin';
import { useDispatch, useSelector } from 'react-redux';
import { getProposalsList } from 'store/actions/action-creaters/voting/proposals';
import { errorM, loadingProposals, proposalsArr } from 'store/selectors/voting/proposals';

import { Col } from 'react-bootstrap';

import QTypeProposalsTabs from 'pages/UserPages/QGovernance/components/QTypeProposalsTabs';
import ProposalsList from 'pages/UserPages/QGovernance/components/ProposalsList';
import { checkCurrentTab } from '../constants';

const { useDrizzle } = drizzleReactHooks;

function TabContent(props) {
  const { activeTab } = props;
  const { drizzle } = useDrizzle();
  const dispatch = useDispatch();

  console.log('activeTab', activeTab);

  const proposalKind = useMemo(() => {
    return checkCurrentTab(activeTab);
  }, [activeTab]);
  console.log("proposalKind", proposalKind);

  useEffect(() => {
    dispatch(getProposalsList(drizzle, activeTab));
  }, [activeTab]);

  const loading = useSelector(loadingProposals);
  const errorMessage = useSelector(errorM);
  const proposals = useSelector(proposalsArr);

  return (
    <Col xs={12}>
      <QTypeProposalsTabs
        activeDescr={proposals?.length + ' Proposals'}
        activeContent={
          <ProposalsList
            activeTab={activeTab}
            proposals={proposals}
            loading={loading}
            errorMessage={errorMessage}
            proposalsKind={proposalKind}
          />
        }
        votableDesc="0 Proposals"
        votableContent={<p>Only votable</p>}
      />
    </Col>

  );
}

export default TabContent;

