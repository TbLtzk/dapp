import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Button from 'ui/Button';

import CustomBlock from 'components/Base/CustomBlock';
import LoadingSpinner from 'components/Base/LoadingSpinner';
import InfoTooltip from 'components/Custom/InfoTooltip';

import Blockchain from './Blockchain';
import Constitution from './Constitution';

import { activeProposalsCountSelector, endedProposalsCountSelector, isProposalsLoadingSelector } from 'store/voting/proposals/selectors';

function InfBlocksUp () {
  const { t } = useTranslation();

  const activeProposalsCount = useSelector(activeProposalsCountSelector);
  const endedProposalsCount = useSelector(endedProposalsCountSelector);
  const isProposalsLoading = useSelector(isProposalsLoadingSelector);

  return (
    <>
      <Blockchain />
      <Constitution />
      <CustomBlock>
        <h1>
          <span>{t('GOVERNANCE')}</span>
          <InfoTooltip topic="governance" />
        </h1>

        <div className="card__two-columns">
          <div>
            <h5>{t('ACTIVE_PROPOSALS')}</h5>
            {isProposalsLoading ? <LoadingSpinner className="card__spinner" /> : <p>{activeProposalsCount}</p>}
          </div>
          <div>
            <h5>{t('PAST_PROPOSALS')}</h5>
            {isProposalsLoading ? <LoadingSpinner className="card__spinner" /> : <p>{endedProposalsCount}</p>}
          </div>
        </div>
        <Link to="/governance">
          <Button alwaysEnabled look="secondary">
            <i className="mdi mdi-arrow-right" />
            <span>{t('GO_TO_GOVERNANCE')}</span>
          </Button>
        </Link>
      </CustomBlock>
    </>
  );
}

export default InfBlocksUp;
