import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import Spinner from 'ui/Spinner';
import Switch from 'ui/Switch';
import Tooltip from 'ui/Tooltip';

import CustomBlock from 'components/Base/CustomBlock';

import GnosisSafeTooltip from '../GnosisSafeTooltip';
import ParametersTable from '../ParametersTable';

import { BlockParagraph, DocsLink, ParametersBlockSubtitle, ParametersBlockTitle } from './styles';

import { networkSelector } from 'store/user-inf/selectors';

import { chainIds, mainnetDocsUrl, testnetDocsUrl } from 'constants/config';

interface Props {
  title: string;
  subtitle: string;
  docsId?: string;
  parameters: any[];
  gnosisSafeAddress?: string;
  loading: boolean;
  errorMsg: string;
  emptyMsg?: string;
}

function ParametersBlock ({
  title,
  subtitle,
  docsId = '',
  gnosisSafeAddress = '',
  parameters = [],
  loading = false,
  errorMsg = '',
  emptyMsg = 'NO_PARAMETERS',
}: Props) {
  const { t } = useTranslation();
  const [isSimplifiedMode, setIsSimplifiedMode] = useState(false);

  const network = useSelector(networkSelector);
  const baseDocsUrl = network === chainIds.mainnet
    ? mainnetDocsUrl
    : testnetDocsUrl;

  const renderTable = () => {
    if (loading && !parameters.length) {
      return (
        <div style={{ display: 'flex', justifyContent: 'center', margin: '24px auto' }}>
          <Spinner size={32} />
        </div>
      );
    }

    return errorMsg || !parameters.length
      ? <BlockParagraph>{errorMsg || t(emptyMsg)}</BlockParagraph>
      : <ParametersTable parameters={parameters} simplified={isSimplifiedMode} />;
  };

  return (
    <CustomBlock style={{ paddingTop: '0' }}>
      <ParametersBlockTitle>
        <div className="parameters-block-title__content">
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
        </div>
        <Switch
          className="parameters-switch"
          value={isSimplifiedMode}
          label={t('SIMPLIFIED_VIEW')}
          onChange={() => setIsSimplifiedMode(!isSimplifiedMode)}
        />
      </ParametersBlockTitle>
      <ParametersBlockSubtitle title={subtitle}>
        {subtitle}
      </ParametersBlockSubtitle>
      {renderTable()}
    </CustomBlock>
  );
}

export default ParametersBlock;
