import React, { useEffect } from 'react';
import { drizzleReactHooks } from '@drizzle/react-plugin';
import { useDispatch, useSelector } from 'react-redux';
import { getQProposals } from 'store/actions/action-creaters/voting/qproposals';
import { errorM, loadingProposals, proposalsArr } from 'store/selectors/voting/qproposals';

import { Col } from 'react-bootstrap';

import QTypeProposalsTabs from 'pages/UserPages/QGovernance/components/QTypeProposalsTabs';
import ProposalsList from 'pages/UserPages/QGovernance/components/ProposalsList';

const { useDrizzle } = drizzleReactHooks;

function QProposals() {
  const { drizzle } = useDrizzle();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getQProposals(drizzle));
  }, []);

  const loading = useSelector(loadingProposals);
  const errorMessage = useSelector(errorM);
  const proposals = useSelector(proposalsArr);

  return (
    <Col xs={12}>
      <QTypeProposalsTabs
        activeDescr={proposals?.length + ' POLLS'}
        activeContent={
          <ProposalsList
            activeTab="q-proposals"
            proposals={proposals}
            loading={loading}
            errorMessage={errorMessage}
            proposalsKind="QProposals"
          />
        }
        votableDesc="0 POLLS"
        votableContent={<p>Only votable</p>}
      />
    </Col>

  );
}

export default QProposals;

