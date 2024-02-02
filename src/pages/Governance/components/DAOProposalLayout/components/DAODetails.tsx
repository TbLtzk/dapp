import { useTranslation } from 'react-i18next';

import { DAOProposal } from 'typings/proposals';

import LinkViewer from 'pages/Governance/components/LinkViewer';

const HQ_DAO_LINK = 'https://hq.q-dao.tools';

interface Props {
  proposal: DAOProposal;
}

function DAODetails ({ proposal }: Props) {
  const { t } = useTranslation();

  return (
    <div className="block">
      <h2 className="text-h2">{t('DAO_DETAILS')}</h2>
      <div className="block__content">
        <div className="details-list single-column">
          <div className="details-list-item">
            <div className="details-item">
              <p className="text-md color-secondary">{t('DAO_NAME')}</p>
              <p className="text-md">{proposal.dao.name}</p>
            </div>

            <div className="details-item">
              <p className="text-md color-secondary">{t('DAO_REGISTRY_ADDRESS')}</p>
              <a
                href={`${HQ_DAO_LINK}/${proposal.dao.id}`}
                target="_blank"
                rel="noreferrer"
                className="link text-md"
                style={{ maxWidth: '100%' }}
              >
                <span className="ellipsis">{proposal.dao.id}</span>
              </a>
            </div>

            <div className="details-item">
              <p className="text-md color-secondary">{t('EXPERT_PANEL_NAME')}</p>
              <p className="text-md">{proposal.votingContract.expertPanelName}</p>
            </div>

            <div className="details-item">
              <p className="text-md color-secondary">{t('VOTING_SITUATION_NAME')}</p>
              <p className="text-md">{proposal.votingSituationName}</p>
            </div>

            <div className="details-item">
              <p className="text-md color-secondary">{t('VOTING_CONTRACT_ADDRESS')}</p>
              <p className="text-md ellipsis">{proposal.votingContract.id}</p>
            </div>

            <div className="details-item">
              <p className="text-md color-secondary">{t('VOTING_TARGET')}</p>
              <p className="text-md ellipsis">{proposal.votingTarget}</p>
            </div>

            <div className="details-item">
              <p className="text-md color-secondary">{t('CONSTITUTION_HASH')}</p>
              <p className="text-md ellipsis">{proposal.dao.constitutionHash}</p>
            </div>

            <div className="details-item">
              <p className="text-md color-secondary">{t('CONSTITUTION')}</p>
              <LinkViewer isCommonLink link={proposal.dao.constitutionSource} />
            </div>

            <div className="details-item">
              <p className="text-md color-secondary">{t('GOVERNANCE_SERVICE')}</p>
              <LinkViewer isCommonLink link={proposal.dao.governanceService} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DAODetails;
