import React, {useEffect} from "react";

import {proposalsQExpert, loadingQExpert, errorQExpert} from "store/selectors/voting/expert-voting"
import {getQExpertProposals} from "store/actions/action-creaters/voting/expert-voting"

import {Col} from "react-bootstrap";

import QTypeProposalsTabs from "pages/UserPages/QGovernance/components/QTypeProposalsTabs";
import ProposalsList from "pages/UserPages/QGovernance/components/ProposalsList";

import ContractRegistryService from "api/contracts/ContractRegistryService";

import {drizzleReactHooks} from "@drizzle/react-plugin";
import {useDispatch, useSelector} from "react-redux";

const {useDrizzle} = drizzleReactHooks;

function QExpertProposals() {
    const {drizzle} = useDrizzle();
    const dispatch = useDispatch();

    const contractRegistry = new ContractRegistryService(drizzle);

    const loading = useSelector(loadingQExpert);
    const error = useSelector(errorQExpert);
    const proposals = useSelector(proposalsQExpert);

    useEffect(() => {
        dispatch(getQExpertProposals(drizzle));
    }, [dispatch]);

    useEffect(async () => {
        // contractRegistry.getAddress().then((address) => {
        //     console.log('EPDR_ParametersVoting address', address);
        // });

    }, []);

    return (
        <Col xs={12}>
            <QTypeProposalsTabs
                activeDescr={proposals?.length + " Proposals"}
                activeContent={
                    <ProposalsList
                        activeTab="expert"
                        proposals={proposals}
                        loading={loading}
                        errorMessage={error}
                        proposalsKind="QExpertProposals"
                    />
                }
                votableDesc="0 Proposals"
                votableContent={<p>Only votable</p>}
            />
        </Col>

    );
}

export default QExpertProposals;

