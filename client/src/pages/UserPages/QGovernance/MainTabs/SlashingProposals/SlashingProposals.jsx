import React, {useEffect} from "react";

import {getSlashingVotingProposals} from "store/actions/action-creaters/voting/slashing-voting";
import {proposalsSlashing, loadingProposalsSlashing, errorMSlashing,} from "store/selectors/voting/shashing-voting";

import {Col} from "react-bootstrap";

import QTypeProposalsTabs from "pages/UserPages/QGovernance/components/QTypeProposalsTabs";
import ProposalsList from "pages/UserPages/QGovernance/components/ProposalsList";

import {drizzleReactHooks} from "@drizzle/react-plugin";
import {useDispatch, useSelector} from "react-redux";

const {useDrizzle} = drizzleReactHooks;

function SlashingProposals() {
    const {drizzle} = useDrizzle();
    const dispatch = useDispatch();

    const loading = useSelector(loadingProposalsSlashing);
    const errorMessage = useSelector(errorMSlashing);
    const proposals = useSelector(proposalsSlashing);

    useEffect(() => {
        dispatch(getSlashingVotingProposals(drizzle))
    }, [dispatch]);

    return (
        <Col xs={12}>
            <QTypeProposalsTabs
                activeDescr={proposals?.length + " POLLS"}
                activeContent={
                    <ProposalsList
                        activeTab="slashing"
                        proposals={proposals}
                        loading={loading}
                        errorMessage={errorMessage}
                        proposalsKind="SlashingProposals"
                    />
                }
                votableDesc="0 POLLS"
                votableContent={<p>Only votable</p>}
            />
        </Col>

    );
}

export default SlashingProposals;

