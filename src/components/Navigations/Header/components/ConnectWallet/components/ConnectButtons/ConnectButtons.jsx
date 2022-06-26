import { coinbaseWallet, metaMask, walletConnect } from 'connectors';

import Button from 'components/Base/Button';

import { useWeb3Context } from 'hooks/useWeb3Context';

function ConnectButtons () {
  const { connectWallet, loading, error } = useWeb3Context();

  if (loading) {
    return <div>Loading</div>;
  }
  if (error) {
    return <div>Error</div>;
  }
  return (
    <div className="connect_buttons">
      <Button
        alwaysEnabled
        style={{ width: '100%' }}
        onClick={() => connectWallet(metaMask)}
      >
        Connect with Metamask
      </Button>
      <Button
        alwaysEnabled
        style={{ width: '100%' }}
        onClick={() => connectWallet(coinbaseWallet)}
      >
        Connect with Coinbase
      </Button>

      <Button
        alwaysEnabled
        style={{ width: '100%' }}
        onClick={() => connectWallet(walletConnect)}
      >
        Connect with Wallet Connect
      </Button>
    </div>
  );
}

export default ConnectButtons;
