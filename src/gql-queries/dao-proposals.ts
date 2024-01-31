import { gql } from '@apollo/client';

const DAOVotingContractFields = gql`
  fragment daoVotingContractFields on VotingContract {
    expertPanelName
    id
    votingSituationNames
  }
`;

const DAOFields = gql`
  fragment daoFields on DAOEntry {
    name
    id
    governanceService
    constitutionSource
    constitutionHash
  }
`;

const ProposalFields = gql`
  fragment proposalFields on Proposal {
    id
    requiredVetoQuorum
    participants
    proposalDescription
    vetoed
    abiExternalLink
    calldata
    currentVetoQuorum
    vetoStartTimestamp
    vetoEndTimestamp
    proposalId
    votingSituationName
    votingTarget
    dao {
      ...daoFields
    }
    votingContract { 
      ...daoVotingContractFields
    }
  }
${DAOFields}
${DAOVotingContractFields}`;

export const DaoProposal = gql`
  query DAOProposal($id: String!) {
    proposal(id: $id) {
      ...proposalFields
    }
  }
${ProposalFields}`;

export const AllDaoProposals = gql`
  query AllDAOProposals($timestamp: Int!, $pageSize: Int, $skip: Int) {
    proposals(
      first: $pageSize,
      skip: $skip,
      orderBy: vetoStartTimestamp,
      orderDirection: desc,
      where: {vetoStartTimestamp_lte: $timestamp}
    ) {
      ...proposalFields
    }
  }
${ProposalFields}`;

export const ActiveDaoProposals = gql`
  query ActiveDAOProposals($timestamp: Int!, $pageSize: Int, $skip: Int) {
    proposals(
      first: $pageSize,
      skip: $skip,
      orderBy: vetoStartTimestamp,
      orderDirection: desc,
      where: {vetoStartTimestamp_lte: $timestamp, vetoEndTimestamp_gte: $timestamp}
    ) {
      ...proposalFields
    }
  }
${ProposalFields}`;

export const FinishedDaoProposals = gql`
  query FinishedDAOProposals($timestamp: Int!, $pageSize: Int, $skip: Int) {
    proposals(
      first: $pageSize,
      skip: $skip,
      orderBy: vetoStartTimestamp,
      orderDirection: desc,
      where: {vetoEndTimestamp_lt: $timestamp}
    ) {
      ...proposalFields
    }
  }
${ProposalFields}`;

export const ActiveMinDaoProposals = gql`
  query ActiveMinDAOProposals($timestamp: Int!, $pageSize: Int) {
    proposals(
      first: $pageSize,
      orderBy: vetoStartTimestamp,
      where: {vetoStartTimestamp_lte: $timestamp, vetoEndTimestamp_gte: $timestamp}
    ) {
      id
    }
  }
`;
