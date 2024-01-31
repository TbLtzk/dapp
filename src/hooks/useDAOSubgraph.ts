import { useCallback, useRef } from 'react';

import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { ActiveDaoProposals, ActiveMinDaoProposals, AllDaoProposals, DaoProposal, FinishedDaoProposals } from 'gql-queries/dao-proposals';
import { DAOProposal, ProposalFilterStatus } from 'typings/proposals';

import useNetworkConfig from 'hooks/useNetworkConfig';

import { dateToUnix } from 'utils/date';

interface DaoProposalsOptions {
  timestamp: number;
  pageSize?: number;
  skipSize?: number;
  status?: ProposalFilterStatus;
}

function getDaoProposalsQueryByStatus (status?: ProposalFilterStatus) {
  switch (status) {
    case 'active':
      return ActiveDaoProposals;
    case 'ended':
      return FinishedDaoProposals;
    default:
      return AllDaoProposals;
  }
}

export function useDAOSubgraph () {
  const { daoSubgraph } = useNetworkConfig();
  const client = useRef(
    new ApolloClient({
      link: createHttpLink({
        uri: daoSubgraph,
      }),
      cache: new InMemoryCache(),
    })
  );

  async function getDaoProposals ({
    timestamp,
    pageSize,
    skipSize,
    status
  }: DaoProposalsOptions): Promise<DAOProposal[]> {
    const query = getDaoProposalsQueryByStatus(status);

    const { data: { proposals } } = await client.current.query<{ proposals: DAOProposal[]}>({
      query,
      fetchPolicy: 'no-cache',
      variables: {
        timestamp,
        pageSize,
        skip: skipSize,
      }
    });
    return proposals;
  }

  async function getActiveDaoProposalsCount (): Promise<number> {
    const { data: { proposals } } = await client.current.query<{ proposals: DAOProposal[]}>({
      query: ActiveMinDaoProposals,
      fetchPolicy: 'no-cache',
      variables: {
        timestamp: dateToUnix(),
        pageSize: 100,
      }
    });
    return proposals?.length || 0;
  }

  async function getDaoProposalById (id: string): Promise<DAOProposal> {
    const { data: { proposal } } = await client.current.query<{ proposal: DAOProposal}>({
      query: DaoProposal,
      fetchPolicy: 'no-cache',
      variables: { id }
    });
    return proposal;
  }

  return {
    getDaoProposals: useCallback(getDaoProposals, []),
    getDaoProposalById: useCallback(getDaoProposalById, []),
    getActiveDaoProposalsCount: useCallback(getActiveDaoProposalsCount, [])
  };
}
