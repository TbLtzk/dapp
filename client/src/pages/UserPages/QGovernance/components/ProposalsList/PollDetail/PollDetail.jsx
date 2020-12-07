import React from "react";

import {Title, Text} from "./styles"

function PollDetail(props) {
    const {pollDetail} = props;

    return (
        <div>
            <Title>Description</Title>
            {!pollDetail.candidate ? null :
                <Text>
                    Proposal to Add Root Node: {pollDetail.candidate}
                </Text>
            }
            {!pollDetail.replaceDest ? null :
                <Text>
                    Proposal to Remove Root Node: {pollDetail.replaceDest}
                </Text>
            }
            <Title>External Reference</Title>
            <Text>
                {pollDetail.remark}
            </Text>
        </div>
    );
}

export default PollDetail;

