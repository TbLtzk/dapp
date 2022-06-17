import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from 'components/Base/Button';
import CopyToClipboard from 'components/Base/CopyToClipboard';
import CustomBlock from 'components/Base/CustomBlock';

import { getConstitutionHash } from 'store/voting/proposals/actions';
import { constitutionHash } from 'store/voting/proposals/selectors';

import { archiveConstitution, latestConstitution } from 'constants/constitution';

function Constitution () {
  const dispatch = useDispatch();
  const constitutionHashValue = useSelector(constitutionHash);

  useEffect(() => {
    dispatch(getConstitutionHash());
  }, [dispatch]);

  return (
    <CustomBlock title="Constitution">
      <h1>Constitution</h1>

      <h5>Hash:</h5>
      <div>
        <p className="card__hash">{constitutionHashValue}</p>
        <CopyToClipboard value={constitutionHashValue} />
      </div>

      <div className="card__actions">
        <a
          href={latestConstitution}
          target="_blank"
          rel="noreferrer"
        >
          <Button alwaysEnabled>
            <i className="mdi mdi-download" />
            <span>Download Latest</span>
          </Button>
        </a>
        <a
          href={archiveConstitution}
          target="_blank"
          rel="noreferrer"
        >
          <Button alwaysEnabled>
            <i className="mdi mdi-archive-outline" />
            <span>Check Archive</span>
          </Button>
        </a>
      </div>
    </CustomBlock>
  );
}

export default Constitution;
