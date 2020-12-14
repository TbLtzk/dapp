import React from "react";
import {drizzleReactHooks} from "@drizzle/react-plugin";
import {Title, Text, Link} from "./styles"

const {useDrizzle} = drizzleReactHooks;

function PollDetail(props) {
    const {pollDetail, proposalsKind} = props;
    const {drizzle} = useDrizzle();

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
            case "SlashingProposals":
                return (
                    <>
                        {!pollDetail.candidate ? null :
                            <Text>
                                Candidate: {pollDetail.candidate}
                            </Text>
                        }
                        {!pollDetail.amountToSlash ? null :
                            <Text>
                                amountToSlash: {pollDetail.amountToSlash * 100}%
                            </Text>
                        }
                    </>
                );
            case "QExpertProposals":
                return (
                    <>
                        {pollDetail.kindVoting === "membership" ?
                            <>
                                {!pollDetail.addressToAdd ? null :
                                    <Text>
                                        addressToAdd: {pollDetail.addressToAdd}
                                    </Text>}

                                {!pollDetail.addressToRemove ? null :
                                    <Text>
                                        addressToRemove: {pollDetail.addressToRemove}
                                    </Text>}
                            </>
                            : <>
                                {!pollDetail.parameterType ? null :
                                    <Text>
                                        parameterKey: {pollDetail.parameterType}
                                    </Text>
                                }
                                {!pollDetail.parameterKey ? null :
                                    <Text>
                                        parameterKey: {pollDetail.parameterKey}
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

