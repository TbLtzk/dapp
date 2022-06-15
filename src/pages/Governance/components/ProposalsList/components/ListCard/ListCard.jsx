import { useEffect, useState } from 'react';
import { Accordion } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import SkeletonProposalsLoading from 'components/Base/SkeletonLoading';

import ProposalContent from '../ProposalContent';

import { ListCardBody, ListCardHeader, ListCardWrp, ProposalLink } from './styles';

import { theme } from 'store/theme/selectors';
import { transactionLoadingSelector } from 'store/transaction-handler/selectors';
import { voteDetailsSelector } from 'store/voting/proposals/selectors';

import { getProposal } from 'contracts/helpers/voting-helpers/base-voting-helper';

function ListCard ({ proposal, id }) {
  const currentTheme = useSelector(theme);
  const transactionLoading = useSelector(transactionLoadingSelector);
  const [proposalInfo, setProposalInfo] = useState(null);

  const voteDetails = useSelector(voteDetailsSelector);
  useEffect(() => {
    const isCurrentProposal = proposal.contract === voteDetails.contract &&
      proposal.id === voteDetails.proposalId;

    if (!transactionLoading && isCurrentProposal) {
      loadProposal();
    }
  }, [transactionLoading]);

  useEffect(() => {
    loadProposal();
    return () => setProposalInfo(null);
  }, []);

  async function loadProposal () {
    const result = await getProposal(proposal.contract, proposal.id);
    setProposalInfo(result);
  }

  return !proposalInfo
    ? <SkeletonProposalsLoading />
    : (
      <ProposalLink to={`/governance/proposal/${proposal.contract}/${proposal.id}`}>
        <ListCardWrp palette={currentTheme}>
          <Accordion defaultActiveKey="0">
            <ListCardHeader>
              <div className="card__title">
                <h1> {proposalInfo?.title}</h1>
                {proposalInfo?.status ? <div className="list-card__status">{proposalInfo?.status}</div> : null}
              </div>
            </ListCardHeader>
            <ListCardBody>
              <ProposalContent proposal={proposalInfo} />
            </ListCardBody>
          </Accordion>
        </ListCardWrp>
      </ProposalLink>
    );
}

export default ListCard;
