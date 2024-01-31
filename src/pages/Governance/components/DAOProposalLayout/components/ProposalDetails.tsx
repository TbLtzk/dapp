import { useTranslation } from 'react-i18next';

import { DAOProposal } from 'typings/proposals';

import LinkViewer from 'pages/Governance/components/LinkViewer';

import RemarkViewer from './RemarkViewer';

interface Props {
  proposal: DAOProposal;
}

function ProposalDetails ({ proposal }: Props) {
  const { t } = useTranslation();

  return (
    <div className="block">
      <h2 className="text-h2">{t('PROPOSAL_DETAILS')}</h2>
      <div className="block__content">
        <div className="details-list single-column">
          <div className="details-list-item">
            <div className="details-item">
              <p className="text-md color-secondary">{t('DESCRIPTION')}</p>
              <RemarkViewer remark={proposal.proposalDescription}/>
            </div>

            <div className="details-item">
              <p className="text-md color-secondary">{t('VOTING_TARGET')}</p>
              <p className="text-md ellipsis">{proposal.votingTarget}</p>
            </div>

            <div className="details-item">
              <p className="text-md color-secondary">{t('EXTERNAL_LINK_WITH_ABI')}</p>
              <LinkViewer isCommonLink link={proposal.abiExternalLink} />
            </div>

            <div className="details-item">
              <p className="text-md color-secondary">{t('CALL_DATA')}</p>
              <p className="text-md break-word">{proposal.calldata}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProposalDetails;
