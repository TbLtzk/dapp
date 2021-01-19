import React, { useEffect, useMemo, useState } from 'react';

import { getOneProposal } from 'store/actions/action-creaters/voting/proposals';
import { errorM, loadingProposals, proposalsArr } from 'store/selectors/voting/proposals';
import { useDispatch, useSelector } from 'react-redux';
import { drizzleReactHooks } from '@drizzle/react-plugin';

import { Row, Col } from 'react-bootstrap';

import ProposalsList from 'pages/UserPages/QGovernance/components/ProposalsList';
import { checkCurrentTab, checkActiveTabByContract } from '../components/constants';
import { Title } from '../styles';

const { useDrizzle } = drizzleReactHooks;

function OneProposalPage(props) {
  const { params } = props;
  const { drizzle } = useDrizzle();
  const dispatch = useDispatch();
  const [empty, setEmpty] = useState(false);

  const proposal = useSelector(proposalsArr);
  const loading = useSelector(loadingProposals);
  const error = useSelector(errorM);

  useEffect(() => {
    if (params?.id && params?.contract && !isNaN((Number(params?.id)))) {
      setEmpty(false);
      dispatch(getOneProposal(drizzle, {
        id: params?.id,
        contract: params?.contract
      }));
    } else {
      setEmpty(true);
    }
  }, [dispatch, params]);

  const activeTab = useMemo(() => {
    return checkActiveTabByContract(proposal[0]?.contract);
  }, [proposal]);

  const proposalKind = useMemo(() => {
    return checkCurrentTab(activeTab);
  }, [activeTab]);

  return (
    <Row>
      <Col xs={8}>
        <Title>{activeTab ? `${activeTab?.replace(/-/g, ' ')}` : null}</Title>
        {empty ? <p>Wrong link</p> :
          <ProposalsList
            activeTab={activeTab}
            proposals={proposal}
            loading={loading}
            errorMessage={error}
            proposalsKind={proposalKind}
          />
        }
      </Col>
    </Row>
  );
}

export default OneProposalPage;

