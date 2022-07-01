import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ConnectionInfo, Web3Adapter } from '@q-dev/q-js-sdk';
import Modal from 'ui/Modal';

import CopyToClipboard from 'components/Base/CopyToClipboard';

import useInterval from 'hooks/useInterval';

import packageJson from '../../../../../package.json';

import { VersionsContainer } from './styles';

import { getNowTimeWithGMT } from 'func/convertDate';

interface Props {
  open: boolean
  onClose: () => void
}

function VersionModal ({ open, onClose }: Props) {
  const { t } = useTranslation();
  const web3Adapter = new Web3Adapter(window.web3);

  const [time, setTime] = useState(getNowTimeWithGMT('DD.MM.YYYY HH:mm'));
  const [connectionInfo, setConnectionInfo] = useState<ConnectionInfo | null>(null);

  useInterval(() => {
    setTime(getNowTimeWithGMT('DD.MM.YYYY HH:mm'));
  }, 50000);

  async function loadConnectionInfo () {
    const info = await web3Adapter?.getConnectionInfo();
    setConnectionInfo(info);
  }

  useEffect(() => {
    if (web3Adapter) {
      loadConnectionInfo();
    }
  }, []);

  const versionGroups = [
    {
      title: t('MAIN'),
      items: [
        {
          name: 'dApp',
          value: packageJson.version,
        },
        {
          name: t('YOUR_CURRENT_TIME'),
          value: time,
        },
      ]
    },
    {
      title: t('MODULES'),
      items: [
        {
          name: 'Web3.js',
          value: web3Adapter?.web3.version,
        },
        {
          name: 'Q.js SDK',
          value: web3Adapter?.SDK_VERSION,
        },
      ],
    },
    {
      title: t('Q_CLIENT'),
      items: [
        {
          name: 'RPC URL',
          value: connectionInfo?.rpcUrl,
        },
        {
          name: t('NETWORK') + ' ID',
          value: connectionInfo?.networkId,
        },
        {
          name: t('NODE_INFO'),
          value: connectionInfo?.nodeInfo,
        },
      ],
    }
  ];

  return (
    <Modal
      open={open}
      title={t('VERSION_INFORMATION')}
      width={600}
      onClose={onClose}
    >
      <VersionsContainer>
        {versionGroups.map((group, i) => (
          <div
            key={String(i)}
            className="version-group"
          >
            <h3 className="text-h3">{group.title}</h3>
            <div className="version-group-items">
              {group.items.map((item) => (
                <div key={item.name}>
                  <p className="text-md font-light">{item.name}</p>
                  <p className="text-md">
                    <span>{item.value}</span>
                    <CopyToClipboard value={item.name + '-' + item.value} />
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </VersionsContainer>
    </Modal>
  );
}

export default VersionModal;
