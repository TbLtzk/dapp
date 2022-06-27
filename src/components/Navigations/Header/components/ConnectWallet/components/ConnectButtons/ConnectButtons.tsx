import { useEffect } from 'react';

import { WalletType } from 'connectors';

import Button from 'components/Base/Button';

import { useWeb3Context } from 'hooks/useWeb3Context';

function ConnectButtons () {
  const { connectWallet, loading, error, setError } = useWeb3Context();

  useEffect(() => {
    return () => {
      setError(false);
    };
  }, []);

  if (loading) {
    return <div className="connect-loading">Loading...</div>;
  }
  if (error) {
    return (
      <div className="connect-error">
        <p>Error while connecting to wallet, please refresh the page and try again</p>
      </div>
    );
  }
  return (
    <div className="connect_buttons">
      <Button
        alwaysEnabled
        style={{ width: '100%' }}
        onClick={() => connectWallet(WalletType.INJECTED, true)}
      >
        Connect with Metamask
      </Button>
      <Button
        alwaysEnabled
        style={{ width: '100%' }}
        onClick={() => connectWallet(WalletType.COINBASE, true)}
      >
        Connect with Coinbase
      </Button>

      <Button
        alwaysEnabled
        style={{ width: '100%' }}
        onClick={() => connectWallet(WalletType.WALLET_CONNECT, true)}
      >
        Connect with Wallet Connect
      </Button>
    </div>
  );
}

export default ConnectButtons;
