import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

function Policy () {
  const { t } = useTranslation();

  return (
    <>
      <span>&nbsp;|&nbsp;</span>
      <div className="policy_container">
        <Link to="/data-privacy">
          <p> {t('DATA_PRIVACY')}</p>
        </Link>
        <span>&nbsp;|&nbsp;</span>
        <Link to="/imprint">
          <p>{t('IMPRINT')}</p>
        </Link>
      </div>
    </>
  );
}

export default Policy;
