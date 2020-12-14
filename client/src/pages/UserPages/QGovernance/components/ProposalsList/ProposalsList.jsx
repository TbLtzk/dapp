import React from "react";
import {Accordion, Col} from "react-bootstrap";

import LoadingSpinner from "components/Base/LoadingSpinner";
import CardHeader from "pages/UserPages/QGovernance/components/ProposalsList/CardHeader";
import CardBody from "pages/UserPages/QGovernance/components/ProposalsList/CardBody";

import {CardBlock, LoadingW} from "./styles";

function ProposalsList(props) {
    const {proposals, proposalsKind, loading, errorMessage} = props;

    const onProposalVote = (id) => {
        console.log("Vote", id)
    };

    return (
        <Accordion defaultActiveKey="0">
            {loading ? <LoadingW xs={12}><LoadingSpinner/></LoadingW> :
                errorMessage ? <Col xs={12}><p>No proposals</p></Col> :
                    !proposals
                        ? <Col xs={12}><p>No proposals</p></Col>
                        : proposals.map((proposal, i) => {
                            return (
                                <CardBlock key={proposal.id + proposal?.type}>
                                    <CardHeader
                                        title={proposal.title}
                                        status={proposal.status}
                                        handleVote={() => {
                                            onProposalVote(proposal.id)
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
                            )
                        })

            }
        </Accordion>
    );
}

export default ProposalsList;

