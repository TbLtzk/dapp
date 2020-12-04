import React from "react";
import {Accordion, Col} from "react-bootstrap";

import LoadingSpinner from "components/Base/LoadingSpinner";
import CardHeader from "pages/UserPages/QGovernance/components/ProposalsList/CardHeader";
import CardBody from "pages/UserPages/QGovernance/components/ProposalsList/CardBody";

import {CardBlock, LoadingW} from "./styles";

function ProposalsList(props) {
    const {proposals, loading, errorMessage} = props;
    const onProposalVote = (id) => {
        console.log("Vote")
    };

    return (
        <Accordion defaultActiveKey="0">
            {loading ? <LoadingW xs={12}><LoadingSpinner/></LoadingW> :
                errorMessage ? <Col xs={12}><p>No proposals</p></Col> :
                    !proposals
                        ? <Col xs={12}><p>No proposals</p></Col>
                        : proposals.map((proposal, i) => {
                            return (
                                <CardBlock key={proposal.id}>
                                    <CardHeader
                                        title={"Community Greenlight Poll - cUSDC (Compound USDC cToken)"}
                                        handleVote={() => {
                                            onProposalVote(proposal.id)
                                        }}
                                    />
                                    <CardBody
                                        id={"0"}
                                        mainText={"Text"}
                                        date={"October 19, 2020"}
                                        time={"7d 0h remaining"}
                                        proposalID={proposal.id}
                                        pollDetail={"pollDetail"}
                                        voteBreakdown={"VoteBreakdown"}
                                    />
                                </CardBlock>
                            )
                        })

            }
            {/*<CardBlock>*/}
            {/*    <CardHeader*/}
            {/*        title={"Community Greenlight Poll - cUSDC (Compound USDC cToken)"}*/}
            {/*        handleVote={onProposalVote}*/}
            {/*    />*/}
            {/*    <CardBody*/}
            {/*        id={"0"}*/}
            {/*        mainText={"Text"}*/}
            {/*        date={"October 19, 2020"}*/}
            {/*        time={"7d 0h remaining"}*/}
            {/*        proposalID={"434"}*/}
            {/*        pollDetail={"pollDetail"}*/}
            {/*        voteBreakdown={"VoteBreakdown"}*/}
            {/*    />*/}
            {/*</CardBlock>*/}

            {/*<CardBlock>*/}
            {/*    <CardHeader*/}
            {/*        title={"Community Greenlight Poll - cUSDC (Compound USDC cToken)"}*/}
            {/*        handleVote={onProposalVote}*/}
            {/*    />*/}
            {/*    <CardBody*/}
            {/*        id={"1"}*/}
            {/*        mainText={"Text"}*/}
            {/*        date={"October 19, 2020"}*/}
            {/*        time={"7d 0h remaining"}*/}
            {/*        proposalID={"434"}*/}
            {/*        pollDetail={"pollDetail"}*/}
            {/*        voteBreakdown={"VoteBreakdown"}*/}
            {/*    />*/}
            {/*</CardBlock>*/}
        </Accordion>
    );
}

export default ProposalsList;

