import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { ExplorerLink } from 'components/Custom/ExplorerAddress/styles';

import { networkSelector } from 'store/user-inf/selectors';

import { getExplorerUrlByChainId } from 'func/appConfig';

interface Props {
  hash: string;
}

function ShowInExplorer ({ hash }:Props) {
  const { t } = useTranslation();

  const network = useSelector(networkSelector);
  const explorerUrl = getExplorerUrlByChainId(network);

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
