import React, {useEffect} from "react";
import {drizzleReactHooks} from "@drizzle/react-plugin";
import {useDispatch, useSelector} from "react-redux";
import {getConstitutionVotingProposals} from "store/actions/action-creaters/voting/constitution-voting";
import {errorM, loadingProposals, proposalsArr} from "store/selectors/voting/constitution-voting";
import ConstitutionVotingService from "api/contracts/Voting/ConstitutionVotingService";
import EmergencyUpdateVotingService from "api/contracts/Voting/EmergencyUpdateVotingService";

import {Col} from "react-bootstrap";

import QTypeProposalsTabs from "pages/UserPages/QGovernance/components/QTypeProposalsTabs";
import ProposalsList from "pages/UserPages/QGovernance/components/ProposalsList";

const {useDrizzle, useDrizzleState} = drizzleReactHooks;

function QProposals() {
    const {drizzle} = useDrizzle();
    const state = useDrizzleState(state => state);
    const dispatch = useDispatch();
    const constitutionVoting = new ConstitutionVotingService(drizzle, "ConstitutionVoting");
    const emergencyUpdateVoting = new EmergencyUpdateVotingService(drizzle, "EmergencyUpdateVoting");

    useEffect(() => {
        dispatch(getConstitutionVotingProposals([constitutionVoting, emergencyUpdateVoting]))

    }, []);

    const loading = useSelector(loadingProposals);
    const errorMessage = useSelector(errorM);
    const proposals = useSelector(proposalsArr);

    return (
        <Col xs={12}>
            <QTypeProposalsTabs
                activeDescr={proposals?.length + " POLLS"}
                activeContent={
                    <ProposalsList
                        activeTab="q-proposals"
                        typeList={"QProposals"}
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

