import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProposalsList } from 'store/actions/action-creaters/voting/proposals';
import { errorM, loadingProposals, proposalsArr } from 'store/selectors/voting/proposals';

import QTypeProposalsTabs from 'pages/UserPages/QGovernance/components/QTypeProposalsTabs';
import ProposalsList from 'pages/UserPages/QGovernance/components/ProposalsList';
import { checkCurrentTab } from '../constants';

import { Col } from 'react-bootstrap';

function TabContent(props) {
  const { activeTab } = props;
  const dispatch = useDispatch();

  const proposalKind = useMemo(() => {
    return checkCurrentTab(activeTab);
  }, [activeTab]);

  useEffect(() => {
    dispatch(getProposalsList(activeTab));
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

