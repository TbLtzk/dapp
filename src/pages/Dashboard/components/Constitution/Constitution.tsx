import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import CopyToClipboard from 'components/CopyToClipboard';
import InfoTooltip from 'components/Tooltips/InfoTooltip';
import Button from 'ui/Button';

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
    <div className="block">
      <h2 className="text-h3">
        <span>{t('CONSTITUTION')}</span>
        <InfoTooltip topic="constitution" />
      </h2>

      <div className="block__tight-content">
        <div>
          <p className="text-sm color-secondary">{t('HASH')}</p>
          <div style={{ display: 'flex' }}>
            <span className="text-lg font-semibold ellipsis">{constitutionHashValue}</span>
            <CopyToClipboard value={constitutionHashValue} />
          </div>
        </div>

        <div className="block__actions">
          <a
            href={latestConstitution}
            target="_blank"
            rel="noreferrer"
          >
            <Button alwaysEnabled>
              <i className="mdi mdi-download" />
              <span>{t('DOWNLOAD_LATEST_VERSION')}</span>
            </Button>
          </a>
          <a
            href={archiveConstitution}
            target="_blank"
            rel="noreferrer"
          >
            <Button alwaysEnabled look="secondary">
              <i className="mdi mdi-archive-outline" />
              <span>{t('CHECK_ARCHIVE')}</span>
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Constitution;
