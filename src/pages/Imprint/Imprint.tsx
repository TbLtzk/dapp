import { useTranslation } from 'react-i18next';

import CustomBlock from 'components/Base/CustomBlock';
import PageWrap from 'components/Base/PageWrap';
import { PolicyContainer } from 'pages/DataPrivacy/styles';

function Imprint () {
  const { t } = useTranslation();

  return (
    <PageWrap pageHeader={t('IMPRINT')}>
      <PolicyContainer>
        <CustomBlock>

          <h5>Responsible for the content of the website:</h5>
          <h1>Q Development AG</h1>
          <ul>
            <li>Landstrasse 40</li>
            <li>9495 Triesen</li>
            <li>Liechtenstein</li>
            <li>FL-Nummer: FL-000.2.643.198-4</li>
            <li>(Commercial Register of Liechtenstein)</li>
            <li>Suliervisory Authority: Amt für Volkswirtschaft, Vaduz</li>
          </ul>

          <h1>Contact us</h1>
          <ul>
            <li>Email: info@qdev.li</li>
            <li>Phone: +423 230 00 72</li>
          </ul>

          <h1>Disclaimer (limitation of liability)</h1>
          <p>
            The information provided on this website has been carefully checked and is regularly updated. However, no
            guarantee can be given that all information is complete, correct and up-to-date at all times. This applies
            in particular to links to other websites to which direct or indirect reference is made. Q Development AG
            does not accept any liability for damages or consequential damages arising out of access to its website or
            parts thereof. All information can be supplemented, removed or changed without prior notice.
          </p>
        </CustomBlock>
      </PolicyContainer>
    </PageWrap>
  );
}

export default Imprint;
