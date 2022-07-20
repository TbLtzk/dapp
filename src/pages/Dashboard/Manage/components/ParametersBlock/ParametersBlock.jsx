import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import Tooltip from 'ui/Tooltip';

import CustomBlock from 'components/Base/CustomBlock';
import LoadingSpinner from 'components/Base/LoadingSpinner';

import GnosisSafeTooltip from '../GnosisSafeTooltip';
import ParametersTable from '../ParametersTable';

import { BlockParagraph, DocsLink, ParametersBlockTitle } from './styles';

import { networkSelector } from 'store/user-inf/selectors';

import { chainIds, mainnetDocsUrl, testnetDocsUrl } from 'constants/config';

function ParametersBlock ({
  title,
  subtitle,
  docsId = '',
  gnosisSafeAddress = '',
  parameters = [],
  loading = false,
  errorMsg = '',
  emptyMsg = 'NO_PARAMETERS',
}) {
  const { t } = useTranslation();

  const network = useSelector(networkSelector);
  const baseDocsUrl = network === chainIds.mainnet
    ? mainnetDocsUrl
    : testnetDocsUrl;

  const renderTable = () => {
    if (loading && !parameters.length) {
      return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <LoadingSpinner />
        </div>
      );
    }

    return errorMsg || !parameters.length
      ? <BlockParagraph>{errorMsg || t(emptyMsg)}</BlockParagraph>
      : <ParametersTable parameters={parameters} />;
  };

  return (
    <CustomBlock>
      <ParametersBlockTitle>
        {title}
        {docsId && (
          <Tooltip
            trigger={(
              <DocsLink
                href={`${baseDocsUrl}/system-parameters${docsId}`}
                target="_blank"
              >
                <i className="mdi mdi-open-in-new" style={{ cursor: 'pointer' }} />
              </DocsLink>
            )}
          >
            {t('VIEW_DOCUMENTATION')}
          </Tooltip>
        )}

        {gnosisSafeAddress && (
          <GnosisSafeTooltip address={gnosisSafeAddress}/>
        )}
      </ParametersBlockTitle>
      <h5>{subtitle}</h5>
      {renderTable()}
    </CustomBlock>
  );
}

export default ParametersBlock;
