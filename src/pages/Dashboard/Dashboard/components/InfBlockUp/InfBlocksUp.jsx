import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Button from 'components/Base/Button';
import CustomBlock from 'components/Base/CustomBlock';
import LoadingSpinner from 'components/Base/LoadingSpinner';

import Blockchain from './Blockchain';
import Constitution from './Constitution';

import { activeProposalsCountSelector, endedProposalsCountSelector, isProposalsLoadingSelector } from 'store/voting/proposals/selectors';

function InfBlocksUp () {
  const activeProposalsCount = useSelector(activeProposalsCountSelector);
  const endedProposalsCount = useSelector(endedProposalsCountSelector);
  const isProposalsLoading = useSelector(isProposalsLoadingSelector);

  return (
    <>
      <Blockchain />
      <Constitution />
      <CustomBlock title="Governance">
        <h1>Governance</h1>

        <div className="card__two-columns">
          <div>
            <h5>Active Proposals</h5>
            {isProposalsLoading ? <LoadingSpinner className="card__spinner" /> : <p>{activeProposalsCount}</p>}
          </div>
          <div>
            <h5>Past Proposals</h5>
            {isProposalsLoading ? <LoadingSpinner className="card__spinner" /> : <p>{endedProposalsCount}</p>}
          </div>
        </div>
        <Link to="/governance">
          <Button alwaysEnabled look="white">
            <i className="mdi mdi-arrow-right" />
            <span>Go to Governance</span>
          </Button>
        </Link>
      </CustomBlock>
    </>
  );
}

export default InfBlocksUp;
