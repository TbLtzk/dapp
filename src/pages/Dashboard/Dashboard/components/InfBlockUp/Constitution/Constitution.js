import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import Button from 'components/Base/Button';
import CopyToClipboard from 'components/Base/CopyToClipboard';
import CustomBlock from 'components/Base/CustomBlock';

import { getConstitutionHash } from 'store/voting/proposals/actions';
import { constitutionHash } from 'store/voting/proposals/selectors';

import { archiveConstitution, latestConstitution } from 'constants/constitution';

function Constitution () {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const constitutionHashValue = useSelector(constitutionHash);

  useEffect(() => {
    dispatch(getConstitutionHash());
  }, [dispatch]);

  return (
    <CustomBlock title="Constitution">
      <h1>{t('CONSTITUTION')}</h1>

      <h5>{t('HASH')}</h5>
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
            <span>{t('DOWNLOAD_LATEST')}</span>
          </Button>
        </a>
        <a
          href={archiveConstitution}
          target="_blank"
          rel="noreferrer"
        >
          <Button alwaysEnabled>
            <i className="mdi mdi-archive-outline" />
            <span>{t('CHECK_ARCHIVE')}</span>
          </Button>
        </a>
      </div>
    </CustomBlock>
  );
}

export default Constitution;
