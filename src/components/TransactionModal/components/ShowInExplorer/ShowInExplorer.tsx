import { useTranslation } from 'react-i18next';

import { ExplorerLink } from 'components/Custom/ExplorerAddress/styles';

import useNetworkConfig from 'hooks/useNetworkConfig';

interface Props {
  hash: string;
}

function ShowInExplorer ({ hash }:Props) {
  const { t } = useTranslation();
  const { explorerUrl } = useNetworkConfig();

  return (
    <ExplorerLink
      style={{ marginTop: '10px' }}
      href={`${explorerUrl}/tx/${hash}`}
      target="_blank"
      rel="noreferrer"
      title={t('VIEW_ON_EXPLORER')}
    >
      <span className="text-md font-light color-secondary">{t('VIEW_ON_EXPLORER')}</span>
    </ExplorerLink>
  );
}

export default ShowInExplorer;
