import React, {useState} from "react";
import {Accordion, Col} from "react-bootstrap";

import LoadingSpinner from "components/Base/LoadingSpinner";
import CardHeader from "pages/UserPages/QGovernance/components/ProposalsList/CardHeader";
import CardBody from "pages/UserPages/QGovernance/components/ProposalsList/CardBody";

import {CardBlock, LoadingW} from "./styles";

import {useDispatch, useSelector} from "react-redux";
import {userAddressMetamask} from "store/selectors/user-inf";
import {drizzleReactHooks} from "@drizzle/react-plugin";
import {
    setVoteProposalObj,
    setStepVoteCounter,
    setDisabledCreatedProposalBtn
} from "store/actions/action-creaters/voting/proposals";
import ModalVote from "pages/UserPages/QGovernance/components/CreateQProposalBtn/ModalVote";
import {remainDate} from "func/convertDate";

const {useDrizzle, useDrizzleState} = drizzleReactHooks;

function ProposalsList(props) {
    const {proposals, proposalsKind, loading, errorMessage, activeTab} = props;
    const {drizzle} = useDrizzle();
    const dispatch = useDispatch();
    const userAddress = useSelector(userAddressMetamask);
    const [modalShow, setModalShow] = useState(false);
    const [proposalId, setProposalId] = useState(null);
    const [vetoEndTime, setVetoEndTime] = useState(null);
    const [proposalContract, setProposalContract] = useState(null);


    const onProposalVote = async (id, contract, vetoEndTime) => {
        console.log("Vote", id);
        // try{
        //     const proposalVote = await drizzle.contracts.ConstitutionVoting.methods.voteFor(id, true).send(
        //         {from: userAddress});
        //     console.log("proposalVote", proposalVote);
        // }catch (e) {
        //     console.log("e", e);
        // }

        // const proposalVote = await drizzle.contracts.ConstitutionVoting.methods.veto.cacheSend(
        //     id, {from: userAddress});
        dispatch(setDisabledCreatedProposalBtn(true));
        setProposalId(id);
        setVetoEndTime(vetoEndTime);
        setProposalContract(contract);
        setModalShow(true);
    };

    return (
        <>
            <Accordion defaultActiveKey="0">
                {loading ? <LoadingW xs={12}><LoadingSpinner/></LoadingW> :
                    errorMessage ? <p>No proposals</p> :
                        proposals.length === 0
                            ? <p>No proposals</p>
                            : proposals.map((proposal, i) => {
                                //TODO: don`t show proposal if veto time === 0
                                // return remainDate(proposal.vetoEndTime) !== 0 ?
                                return <CardBlock key={proposal.id + proposal?.type}>
                                    <CardHeader
                                        title={proposal.title}
                                        status={proposal.status}
                                        handleVote={() => {
                                            onProposalVote(proposal.id, proposal.contract, proposal.vetoEndTime)
                                        }}
                                    />
                                    <CardBody
                                        id={proposal.id + proposal?.type}
                                        proposalType={proposal?.type}
                                        // mainText={"Text"}
                                        // date={convertToMonthDayYear(proposal.vetoEndTime)}
                                        vetoTime={proposal.vetoEndTime}
                                        // vetoTime={remainDate(proposal.vetoEndTime)}
                                        votingTime={proposal.votingEndTime}
                                        // votingTime={remainDate(proposal.votingEndTime)}
                                        // time={remainDate("7d 0h remaining")}
                                        proposalID={proposal.id}
                                        pollDetail={proposal}
                                        proposalsKind={proposalsKind}
                                        voteBreakdown={proposal}
                                    />
                                </CardBlock>
                                // : null
                            })
                }
            </Accordion>
            <ModalVote
                proposalContract={proposalContract}
                proposalId={proposalId}
                vetoEndTime={vetoEndTime}
                activeTab={activeTab}
                modalShow={modalShow}
                onHide={() => {
                    setModalShow(false);
                    dispatch(setVoteProposalObj({}));
                    dispatch(setStepVoteCounter(1));
                    dispatch(setDisabledCreatedProposalBtn(true));

                }}
            />
        </>
    );
}

export default ProposalsList;

