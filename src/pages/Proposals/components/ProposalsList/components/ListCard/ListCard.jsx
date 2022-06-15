import React, { useEffect, useState } from 'react';
import { Accordion } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import SkeletonProposalsLoading from 'components/Base/SkeletonLoading';
import CustomCardButtons from 'components/Custom/CustomCardButtons';

import CardCollapsedContent from '../CardCollapsedContent';
import ProposalContent from '../ProposalContent';

import { ListCardBody, ListCardHeader, ListCardWrp } from './styles';

import { theme } from 'store/theme/selectors';
import { transactionLoadingSelector } from 'store/transaction-handler/selectors';
import { voteDetailsSelector } from 'store/voting/proposals/selectors';

import { getProposal } from 'contracts/helpers/voting-helpers/base-voting-helper';

import { createShareText } from 'func/useful';

function ListCard ({ proposal, id, proposalsKind, onePage }) {
  const currentTheme = useSelector(theme);
  const transactionLoading = useSelector(transactionLoadingSelector);
  const [open, setOpen] = useState(false);
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

    return () => {
      setOpen(false);
      setProposalInfo(null);
    };
  }, []);

  async function loadProposal () {
    const result = await getProposal(proposal.contract, proposal.id);
    setProposalInfo(result);
  }

  return !proposalInfo
    ? <SkeletonProposalsLoading />
    : (
      <ListCardWrp palette={currentTheme}>
        <Accordion defaultActiveKey="0">
          <ListCardHeader>
            <div className="card__title">
              <h1> {proposalInfo?.title}</h1>
              {proposalInfo?.status ? <div className="list-card__status">{proposalInfo?.status}</div> : null}
            </div>
            <div className="card__buttons">
              <CustomCardButtons
                open={open}
                onePage={onePage}
                setOpen={() => setOpen(!open)}
                eventKey={id}
                shareText={createShareText('proposal', proposalInfo.contract, proposalInfo.id)}
              />
            </div>
          </ListCardHeader>
          <ListCardBody>
            <ProposalContent proposal={proposalInfo} />
            <Accordion.Collapse eventKey={id}>
              <CardCollapsedContent
                proposalInfo={proposalInfo}
                proposalsKind={proposalsKind}
                contract={proposal.contract}
                proposalId={proposal.id}
              />
            </Accordion.Collapse>
          </ListCardBody>
        </Accordion>
      </ListCardWrp>
    );
}

export default ListCard;
