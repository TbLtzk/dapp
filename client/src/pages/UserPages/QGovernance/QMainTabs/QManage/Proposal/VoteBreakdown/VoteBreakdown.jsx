import React from "react";

import {Text, Title} from "./styles";

function VoteBreakdown() {

    return (
        <div>
            <Title>Description</Title>
            <Text>
                The Governance Facilitators have placed a governance poll into the voting system which asks whether the
                asset cUSDC (Compound USDC cToken) should be prioritized for inclusion in the Maker Protocol by the
                domain teams.
            </Text>
            <Text>
                If greenlight votes exceed defer votes, this poll is to be taken as a signal to domain teams that MKR
                Token Holders have approved further domain work with the aim of adding cUSDC (Compound USDC cToken) as a
                collateral asset to the Maker Protocol.
            </Text>
            <Title>External Reference</Title>
            <Text>
                https://www.reddit.com/r/Bitcoin/comments/jkmnjj/i_bought_a_used_truck_for_215_bitcoin/
            </Text>
        </div>
    );
}

export default VoteBreakdown;

