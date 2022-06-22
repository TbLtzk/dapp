import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { ExternalLinksStyle } from '../../styles';

import { networkSelector } from 'store/user-inf/selectors';

import { mainnetDocsUrl, testnetDocsUrl } from 'constants/config';
import { latestConstitution } from 'constants/constitution';

function References () {
  const { t } = useTranslation();
  const network = useSelector(networkSelector);

  const referencesItems = [
    {
      id: 'constitution',
      label: t('CONSTITUTION'),
      location: latestConstitution,
    },
    {
      id: 'repo',
      label: t('REPOSITORIES'),
      location: 'https://gitlab.com/q-dev',
    },
    {
      id: 'tutorials',
      label: t('TUTORIALS'),
      location: network === '35441' ? mainnetDocsUrl : testnetDocsUrl,
    },
  ];

  return (
    <ExternalLinksStyle>
      {referencesItems.map(({ label, id, location }) => (
        <div key={id} className="external_link">
          <a
            key={id}
            href={location}
            target="_blank"
            rel="noreferrer"
          >
            {label}
            <i className="mdi mdi-open-in-new" />
          </a>
        </div>
      ))}
    </ExternalLinksStyle>
  );
}

export default References;
