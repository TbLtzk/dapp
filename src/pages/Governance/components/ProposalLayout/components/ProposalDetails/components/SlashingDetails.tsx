import { useTranslation } from 'react-i18next';

import { formatAsset } from '@q-dev/utils';
import { Proposal } from 'typings/proposals';

import ExplorerAddress from 'components/Custom/ExplorerAddress';

import LinkViewer from '../../LinkViewer';

interface Props {
  proposal: Proposal;
}

function SlashingDetails ({ proposal }: Props) {
  const { t } = useTranslation();

  return (
    <div className="details-list-item">
      <div className="details-item">
        <p className="text-md color-secondary">{t('CANDIDATE')}</p>
        <ExplorerAddress
          short
          iconed
          className="text-md"
          address={proposal.candidate}
        />
      </div>

      <div className="details-item">
        <p className="text-md color-secondary">{t('DETAILS_AMOUNT_TO_SLASH')}</p>
        <p className="text-md">{formatAsset(proposal.amountToSlash, 'Q')}</p>
      </div>

      <div className="details-item">
        <p className="text-md color-secondary">{t('EXTERNAL_SOURCE')}</p>
        <LinkViewer link={proposal.remark} />
      </div>
    </div>
  );
}

export default SlashingDetails;
