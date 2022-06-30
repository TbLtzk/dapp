import { useEffect } from 'react';

import { WalletType } from 'connectors';
import { useWeb3Context } from 'context/Web3ContextProvider';

import Button from 'components/Base/Button';

function ConnectButtons () {
  const { connectWallet, success, loading, error, setError } = useWeb3Context();

  useEffect(() => {
    return () => {
      setError(null);
    };
  }, []);

  if (success) {
    return (
      <div className="connect">
        <h5>Success!</h5>
        <p>Refreshing the page...</p>
      </div>
    );
  }
  if (loading) {
    return <div className="connect-loading">Loading...</div>;
  }
  if (error) {
    return (
      <div className="connect">
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
        <div className="connect-btn">
          <img
            src="/icons/metamask.svg"
            alt="metamask"
            className="icon"
          />
          <p> Connect with Metamask</p>
        </div>
      </Button>
      <Button
        alwaysEnabled
        style={{ width: '100%' }}
        onClick={() => connectWallet(WalletType.COINBASE, true)}
      >
        <div className="connect-btn">
          <img
            src="/icons/coinbase.png"
            alt="metamask"
            className="icon"
          />
          <p> Connect with Coinbase</p>
        </div>
      </Button>

      {/* TODO: add bridge between dApp and connect to wallet
       <Button
        alwaysEnabled
        style={{ width: '100%' }}
        onClick={() => connectWallet(WalletType.WALLET_CONNECT, true)}
      >
        Connect with Wallet Connect
      </Button> */}
    </div>
  );
}

export default ConnectButtons;
