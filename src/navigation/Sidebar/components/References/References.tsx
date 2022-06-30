import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import Icon from 'ui/Icon';

import { ReferencesContainer } from './styles';

import { networkSelector } from 'store/user-inf/selectors';

import { chainIds, mainnetDocsUrl, testnetDocsUrl } from 'constants/config';
import { latestConstitution } from 'constants/constitution';

function References () {
  const { t } = useTranslation();
  const network = useSelector(networkSelector);

  const referenceLinks = [
    {
      title: t('CONSTITUTION'),
      href: latestConstitution,
    },
    {
      title: t('REPOSITORIES'),
      href: 'https://gitlab.com/q-dev',
    },
    {
      title: t('TUTORIALS'),
      href: network === chainIds.mainnet ? mainnetDocsUrl : testnetDocsUrl,
    },
  ];

  return (
    <ReferencesContainer>
      {referenceLinks.map(({ title, href }) => (
        <a
          key={href}
          className="reference-link text-md"
          href={href}
          target="_blank"
          rel="noreferrer"
        >
          <span className="reference-link-text">{title}</span>
          <Icon name="external-link" className="reference-link-icon" />
        </a>
      ))}
    </ReferencesContainer>
  );
}

export default References;
