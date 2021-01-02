import React, {useEffect, useMemo} from "react";

import {getEndedProposals} from "store/actions/action-creaters/voting/proposals";
import {endedProposals, loadingEndedProposals, errorEnded} from "store/selectors/voting/proposals";
import {useDispatch, useSelector} from "react-redux";
import {drizzleReactHooks} from "@drizzle/react-plugin";

import {useLocation} from "react-router-dom";

import ProposalsList from "pages/UserPages/QGovernance/components/ProposalsList";

import {Row, Col} from "react-bootstrap";
import {Title} from "./styles";

const {useDrizzle} = drizzleReactHooks;

function EndedProposals() {
  const location = useLocation();
  const {drizzle} = useDrizzle();
  const dispatch = useDispatch();

  const endedArr = useSelector(endedProposals);
  const loading = useSelector(loadingEndedProposals);
  const error = useSelector(errorEnded);

  useEffect(() => {
    dispatch(getEndedProposals(drizzle, location?.state?.activeTab));
  }, []);

  const proposalKind = useMemo(() => {
    switch (location?.state?.activeTab) {
      case "q-proposals":
        return "QProposals";
      case "q-root-node-panel":
        return "QRootNodePanel";
      case "q-expert-proposals":
        return "QExpertProposals";
      case "slashing-proposals":
        return "SlashingProposals";
    }

  }, [location?.state?.activeTab]);

  return (
      <Row>
        <Col xs={8}>
          <Title>Ended {location?.state?.activeTab?.replace(/-/g, " ")}</Title>
          <ProposalsList
              activeTab={location?.state?.activeTab}
              proposals={endedArr}
              loading={loading}
              errorMessage={error}
              proposalsKind={proposalKind}
          />
        </Col>

      </Row>

  );
}

export default EndedProposals;

