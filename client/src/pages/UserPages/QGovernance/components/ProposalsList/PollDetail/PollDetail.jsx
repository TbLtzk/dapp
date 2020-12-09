import React from "react";

import {Title, Text, Link} from "./styles"

function PollDetail(props) {
    const {pollDetail, proposalsKind} = props;

    const switchContentDependsOnKind = () => {
        switch (proposalsKind) {
            case "QRootNodePanel":
                return (
                    <>
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
                    </>
                );
            case "QProposals":
                return (
                    <>
                        {!pollDetail.constitutionHash ? null :
                            <Text>
                                Constitution hash: {pollDetail.constitutionHash}
                            </Text>
                        }
                        {!pollDetail.addrValue ? null :
                            <Text>
                                addrValue: {pollDetail.addrValue}
                            </Text>
                        }
                        {!String(pollDetail.boolValue) ? null :
                            <Text>
                                boolValue: {String(pollDetail.boolValue)}
                            </Text>
                        }
                        {!pollDetail.bytes32Value ? null :
                            <Text>
                                bytes32Value: {pollDetail.bytes32Value}
                            </Text>
                        }
                        {!pollDetail.strValue ? null :
                            <Text>
                                strValue: {pollDetail.strValue}
                            </Text>
                        }
                        {!pollDetail.uintValue ? null :
                            <Text>
                                uintValue: {pollDetail.uintValue}
                            </Text>
                        }
                    </>
                );
            default:
                return null;
        }

    };

    return (
        <div>
            <Title>Description</Title>
            {switchContentDependsOnKind()}
            <Title>External Reference</Title>
            <Link href={pollDetail.remark} target="_blank">{pollDetail.remark}</Link>
        </div>
    );
}

export default PollDetail;

