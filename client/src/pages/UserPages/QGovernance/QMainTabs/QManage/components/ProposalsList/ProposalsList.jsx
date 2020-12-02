import React from "react";
import {Accordion} from "react-bootstrap";

import CardHeader from "./CardHeader";
import CardBody from "./CardBody";

import {CardBlock} from "./styles";

function ProposalsList() {

    const onProposalVote = () => {
        console.log("Vote")
    };

    return (
        <Accordion defaultActiveKey="0">
            <CardBlock>
                <CardHeader
                    title={"Community Greenlight Poll - cUSDC (Compound USDC cToken)"}
                    handleVote={onProposalVote}
                />
                <CardBody
                    id={"0"}
                    mainText={"Text"}
                    date={"October 19, 2020"}
                    time={"7d 0h remaining"}
                    proposalID={"434"}
                    pollDetail={"pollDetail"}
                    voteBreakdown={"VoteBreakdown"}
                />
            </CardBlock>

            <CardBlock>
                <CardHeader
                    title={"Community Greenlight Poll - cUSDC (Compound USDC cToken)"}
                    handleVote={onProposalVote}
                />
                <CardBody
                    id={"1"}
                    mainText={"Text"}
                    date={"October 19, 2020"}
                    time={"7d 0h remaining"}
                    proposalID={"434"}
                    pollDetail={"pollDetail"}
                    voteBreakdown={"VoteBreakdown"}
                />
            </CardBlock>
        </Accordion>
    );
}

export default ProposalsList;

