// import { ParameterType } from '@q-dev/q-js-sdk';
// import { ConstitutionVotingInstance } from '@q-dev/q-js-sdk/lib/contracts/governance/constitution/ConstitutionVotingInstance';
// import { EmergencyUpdateVotingInstance } from '@q-dev/q-js-sdk/lib/contracts/governance/EmergencyUpdateVotingInstance';
// import { GeneralUpdateVotingInstance } from '@q-dev/q-js-sdk/lib/contracts/governance/GeneralUpdateVotingInstance';
// import { RootNodesMembershipVotingInstance } from '@q-dev/q-js-sdk/lib/contracts/governance/rootNodes/RootNodesMembershipVotingInstance';
// import { includes, uniqBy } from 'lodash';

// import { address } from 'components/Custom/LoadingMetaMask/LoadingMetaMask';

// import { transformToPercentage } from '../voting-helpers/base-voting-helper';

// import { getRootNodesInstance } from 'contracts/contract-instance';

// import { ZERO_ADDRESS } from 'constants/config';

// type VotingInstance =
//   | ConstitutionVotingInstance
//   | EmergencyUpdateVotingInstance
//   | GeneralUpdateVotingInstance
//   | RootNodesMembershipVotingInstance

// export async function getProposalStatus<T extends VotingInstance> (contract: T, id: string) {
//   const result = await contract.getStatus(id);
//   return result;
// }

// export async function hasUserVotedVetoed<T extends VotingInstance> (contract: T, id: string) {
//   if (address === ZERO_ADDRESS) return { userVetoed: false, userVoted: false };

//   let userVetoed;
//   if (contract.hasRootVetoed) {
//     userVetoed = await contract.hasRootVetoed(id, address);
//   }

//   const userVoted = await contract.hasUserVoted(id, address);
//   return { userVetoed, userVoted };
// }

// export async function getProposalStats<T extends VotingInstance> (contract: T, id: string) {
//   return contract.getProposalStats(id);
// }

// export async function getVetoesNumber<T extends VotingInstance> (contract: T, id: string) {
//   try {
//     if (contract.instance.methods.getVetosNumber) {
//       const result = await contract.instance.methods.getVetosNumber(id).call();
//       return result;
//     } else {
//       return 0;
//     }
//   } catch (err) {
//     return 0;
//   }
// }

// export function getVetoesPercentage<T extends VotingInstance> (contract: T, id: string) {
//   return contract.getVetoesPercentage(id);
// }

// export function voteAgainst<T extends VotingInstance> (contract: T, id: string, userAddress: string) {
//   if (address === ZERO_ADDRESS) return;

//   return contract.voteAgainst(id, { from: userAddress });
// }

// export async function voteFor (id: string, userAddress: string) {
//   if (address === ZERO_ADDRESS) return;

//   const result = await contract.voteFor(id, { from: userAddress });
//   return result;
// }

// export async function veto (id: string, userAddress: string) {
//   if (address === ZERO_ADDRESS) {
//     return true;
//   } else {
//     const contract = await this.getContractInstance();
//     const result = await contract.veto(id, { from: userAddress });
//     return result;
//   }
// }

// export async function execute (id: string, userAddress: string) {
//   if (address === ZERO_ADDRESS) {
//     return true;
//   } else {
//     const contract = await this.getContractInstance();
//     const promiseStatus = await this.getProposalStatus(id);
//     let result = null;
//     if (promiseStatus === '4') {
//       result = await contract.execute(id, { from: userAddress });
//     }
//     return result;
//   }
// }

// export async function approve (id: string, userAddress: string) {
//   if (address === ZERO_ADDRESS) {
//     return null;
//   } else {
//     const contract = await this.getContractInstance();
//     const result = await contract.aprove(id, { from: userAddress });
//     return result;
//   }
// }

// export async function getProposal (id: string, oneProposal: boolean) {
//   if (oneProposal) {
//     const pastEvents = await this.getPastEvents();
//     const propIds = pastEvents.map(({ id }) => id);
//     if (!propIds.includes(id)) {
//       return { error: true };
//     }
//   }
//   const contract = await this.getContractInstance();
//   const proposal = await contract.getProposalWithStatus(id);
//   const headerInfo = this.getProposalData(proposal, proposal.id, proposal.status);
//   const additionalInfo = await this.getProposalAdditionalData(proposal, id);
//   const userVotedVetoed = await this.hasUserVotedVetoed(id);
//   return { ...headerInfo, ...additionalInfo, ...userVotedVetoed };
// }

// export async function getRootNodesNumber () {
//   const contract = await getRootNodesInstance();
//   return await contract.getSize();
// }

// export async function getProposalStatsData (id: string) {
//   const objRes = {};
//   const proposalStats = await this.getProposalStats(id);
//   const getVetoesNumber = await this.getVetoesNumber(id);
//   const rootNodesNumber = await this.getRootNodesNumber();
//   objRes.vetoesNumber = getVetoesNumber;
//   objRes.noVote = rootNodesNumber - getVetoesNumber;
//   objRes.vetoesPercentage = ((getVetoesNumber * 100) / rootNodesNumber).toFixed(2);
//   objRes.currentMajority = transformToPercentage(proposalStats.currentMajority);
//   objRes.currentQuorum = transformToPercentage(proposalStats.currentQuorum);
//   objRes.requiredMajority = transformToPercentage(proposalStats.requiredMajority);
//   objRes.requiredQuorum = transformToPercentage(proposalStats.requiredQuorum);
//   objRes.vetoThreshold = '50.00';
//   return objRes;
// }

// export async function getPastEvents (fromBlock = 0, toBlock = 'latest') {
//   const contract = await this.getContractInstance();

//   const pastEvents = await contract.instance.getPastEvents('ProposalCreated', {
//     fromBlock,
//     toBlock
//   });

//   return pastEvents.map((evt) => ({
//     blockNumber: evt.blockNumber,
//     id: evt.returnValues._id || evt.returnValues._proposalId,
//     contract: this.contractName
//   }));
// }

// export async function checkProposalsByStatus (proposals: any[]) {
//   const contract = await this.getContractInstance();
//   const activeIds = [];
//   const endedIds = [];
//   for (const proposal of proposals) {
//     const status = await contract.getStatus(proposal.id);
//     if (status === '0') {
//       continue;
//     } else if (status === '1' || status === '3' || status === '4') {
//       activeIds.push({ ...proposal, status });
//     } else {
//       endedIds.push({ ...proposal, status });
//     }
//   }
//   return [activeIds, endedIds];
// }

// export async function getNewProposalsAndCheckActive (activeProposals: any[], lastActiveBlock: number) {
//   const activeProposalsByContract = activeProposals.filter((proposal) => proposal.contract === this.contractName);
//   const newProposals = await this.getPastEvents(lastActiveBlock);
//   const proposals = uniqBy([...newProposals, ...activeProposalsByContract], 'id');
//   const proposalsWithStatus = await this.checkProposalsByStatus(proposals);
//   return proposalsWithStatus;
// }

// export async function getProposalsCount (minimalActiveBlockHeight: number) {
//   const allProposals = await this.getPastEvents();
//   const [activeIds] = await this.checkProposalsByStatus(
//     allProposals.filter((proposals) => proposals.blockNumber >= minimalActiveBlockHeight)
//   );

//   const transformToId = activeIds.map((item) => item.id);
//   const endedIds = allProposals.filter(({ id }) => !includes(transformToId, id));
//   return [activeIds, endedIds];
// }

// function transformParameterType (id: string) {
//   const type = ['None', 'Address', 'Uint', 'String', 'Byte', 'Boolean'];
//   return type[Number(id)];
// }

// export async function getParametersArr (id: string) {
//   const contract = await this.getContractInstance();
//   const result = await contract.getParametersArr(id);
//   return result;
// }

// export async function getProposalParametersData (id: string) {
//   const parameters = await this.getParametersArr(id);
//   return parameters.map((item) => {
//     let value = null;
//     switch (item.paramType) {
//       case ParameterType.ADDRESS:
//         value = item.addrValue;
//         break;
//       case ParameterType.BOOL:
//         value = item.boolValue;
//         break;
//       case ParameterType.STRING:
//         value = item.strValue;
//         break;
//       case ParameterType.UINT:
//         value = item.uintValue;
//         break;
//       case ParameterType.BYTE:
//         value = item.bytes32value;
//         break;
//     }
//     return {
//       parameterType: item.paramType,
//       parameterValue: value,
//       parameterKey: item.paramKey
//     };
//   });
// }
