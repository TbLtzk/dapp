import detectEthereumProvider from '@metamask/detect-provider';

export async function detectMetamask() {
    try {
        const provider = await detectEthereumProvider();
        if (!provider) {
            throw new Error('Please install MetaMask!');
        }
        if (provider) {
            const accounts = await provider.request({method: 'eth_requestAccounts'});
            const account = accounts[0];
            // console.log('ACCOUNT', account);
            // const balance = await provider.getBalance(account);
            // console.log('BALANCE', balance);

            return {provider, account};
        }
    } catch (e) {
        console.log('e', e);
        throw new Error('Please install MetaMask!');
    }
}

export async function getAccountData() {
    try {
        const provider = await detectEthereumProvider();

        const accounts = await provider.request({method: 'eth_requestAccounts'});
        const account = accounts[0];
        return {id: account};
    } catch (e) {
        throw new Error('Please install MetaMask!');
    }
}
