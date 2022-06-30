import { useSelector } from 'react-redux';

import CustomBlock from 'components/Base/CustomBlock';
import LoadingSpinner from 'components/Base/LoadingSpinner';
import PopperTooltip from 'components/Base/PopperTooltip';
import GnosisSafeTooltip from 'components/Custom/GnosisSafeTooltip';

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
  emptyMsg = 'No parameters',
}) {
  const network = useSelector(networkSelector);
  const baseDocsUrl = network === chainIds.mainnet
    ? mainnetDocsUrl
    : testnetDocsUrl;

  const renderTable = () => {
    if (loading && !parameters.length) {
      return (
        <>
          <LoadingSpinner />
        </>
      );
    }

    return errorMsg || !parameters.length
      ? <BlockParagraph>{errorMsg || emptyMsg}</BlockParagraph>
      : <ParametersTable parameters={parameters} />;
  };

  return (
    <CustomBlock>
      <ParametersBlockTitle>
        {title}
        {docsId && (
          <PopperTooltip
            trigger={(
              <DocsLink
                href={`${baseDocsUrl}/system-parameters${docsId}`}
                target="_blank"
              >
                <i className="mdi mdi-open-in-new" style={{ cursor: 'pointer' }} />
              </DocsLink>
            )}
          >
            View documentation
          </PopperTooltip>
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
