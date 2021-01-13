import React from 'react';
import { Title, Text, Link } from './styles';

const EMPTY_ADDR = '0x0000000000000000000000000000000000000000';

function PollDetail(props) {
  const { pollDetail, proposalsKind } = props;

  const switchContentDependsOnKind = () => {
    switch (proposalsKind) {
      case 'QRootNodePanel':
        return (
          <>
            {!pollDetail.candidate || pollDetail.candidate === EMPTY_ADDR ? null :
              <Text>
                Proposal to Add Root Node: {pollDetail.candidate}
              </Text>
            }
            {!pollDetail.replaceDest || pollDetail.replaceDest === EMPTY_ADDR ? null :
              <Text>
                Proposal to Remove Root Node: {pollDetail.replaceDest}
              </Text>
            }
          </>
        );
      case 'QProposals':
        return (
          <>
            {!pollDetail.currentConstitutionHash ? null :
              <Text>
                Current constitution hash: {pollDetail.currentConstitutionHash}
              </Text>
            }
            {!pollDetail.currentConstitutionHash ? null :
              <Text>
                New constitution hash: {pollDetail.newConstitutionHash}
              </Text>
            }
            {!pollDetail.parameterKey ? null :
              <Text>
                Parameter key: {pollDetail.parameterKey}
              </Text>
            }
            {!pollDetail.addrValue ? null :
              <Text>
                addrValue: {pollDetail.addrValue}
              </Text>
            }
            {!String(pollDetail.boolValue) || !pollDetail?.boolValue ? null :
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
      case 'SlashingProposals':
        return (
          <>
            {!pollDetail.candidate ? null :
              <Text>
                Candidate: {pollDetail.candidate}
              </Text>
            }
            {!pollDetail.amountToSlash ? null :
              <Text>
                amountToSlash: {pollDetail.amountToSlash}Q
              </Text>
            }
          </>
        );
      case 'QExpertProposals':
        return (
          <>
            {pollDetail.kindVoting === 'membership' ?
              <>
                {!pollDetail.addressToAdd || pollDetail.addressToAdd === EMPTY_ADDR ? null :
                  <Text>
                    addressToAdd: {pollDetail.addressToAdd}
                  </Text>}

                {!pollDetail.addressToRemove || pollDetail.addressToRemove === EMPTY_ADDR ? null :
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

