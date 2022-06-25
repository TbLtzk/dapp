import Button from 'components/Base/Button';
import { WalletType } from 'components/Custom/Web3ContextProvider/walletOptions';

import { useWeb3Context } from 'hooks/useWeb3Context';

import { getParametersDependsOnUrl } from 'func/useful';

function ConnectButtons() {
  const { connectWallet, loading, error } = useWeb3Context();
  const { chainId } = getParametersDependsOnUrl();
  if (loading) {
    return <div>Loading</div>;
  }
  if (error) {
    return <div>Error</div>;
  }
  return (
    <div className="connect_buttons">
      <Button alwaysEnabled style={{ width: '100%' }} onClick={() => connectWallet(WalletType.INJECTED, chainId)}>
        Connect with Metamask
      </Button>
      <Button alwaysEnabled style={{ width: '100%' }} onClick={() => connectWallet(WalletType.WALLET_LINK, chainId)}>
        Connect with Coinbase
      </Button>

      <Button alwaysEnabled style={{ width: '100%' }} onClick={() => connectWallet(WalletType.WALLET_CONNECT, chainId)}>
        Connect with Wallet Connect
      </Button>
    </div>
  );
}

export default ConnectButtons;
