import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { ALinkStyle } from '../../styles';
import AccordionElements from '../AccordionElements';

import { networkSelector } from 'store/user-inf/selectors';

import { mainnetDocsUrl, testnetDocsUrl } from 'constants/config';
import { latestConstitution } from 'constants/constitution';

function References () {
  const { t } = useTranslation();
  const network = useSelector(networkSelector);

  const referencesItems = [
    {
      label: t('CONSTITUTION'),
      location: latestConstitution,
    },
    {
      label: t('REPOSITORIES'),
      location: 'https://gitlab.com/q-dev',
    },
    {
      label: t('TUTORIALS'),
      location: network === '35441' ? mainnetDocsUrl : testnetDocsUrl,
    },
  ];

  return (
    <AccordionElements margin="24px 0 24px 0" title={t('REFERENCES')}>
      {referencesItems.map((value, key) => (
        <ALinkStyle
          key={'references' + key}
          className="nav-link"
          href={value.location}
          target="_blank"
        >
          {value.label}
        </ALinkStyle>
      ))}
    </AccordionElements>
  );
}

export default References;
