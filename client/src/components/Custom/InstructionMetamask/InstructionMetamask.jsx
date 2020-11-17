import React from "react";

import firefox from "assets/img/firefox.png";
import chrome from "assets/img/chrome.png";

import {WrapContainer, WrapImgs, Image} from "./styles"
import ConnectMetaMaskButton from "components/Custom/ConnectMetaMaskButton";

function InstructionMetamask() {

    return (
        <WrapContainer>
            <p>
                MetaMask is a browser plugin that allows users to make Ethereum transactions through regular websites.
            </p>
            <h4>To get started you need:</h4>
            <p>1. Install MetaMask for your browser (Supported Browsers: Chrome, Firefox)</p>
            <WrapImgs>
                <a href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn"
                   target="_blank">
                    <Image
                        alt="chrome logo"
                        src={chrome}
                        className="d-inline-block align-top"
                    />
                </a>
                <a href="https://addons.mozilla.org/en-US/firefox/addon/ether-metamask/" target="_blank">
                    <Image
                        alt="firefox logo"
                        src={firefox}
                        className="d-inline-block align-top"
                    />
                </a>
            </WrapImgs>
            <p>2. Click Add to Chrome to install MetaMask as Google Chrome extension.</p>
            <p>3. Click Add Extension.</p>
            <p>
                You have successfully installed MetaMask extension. That was easy, isn’t it? Now, it is time to add your
                existing cryptocurrency wallet.
                If you don’t have a wallet yet, you can create one straight away.
            </p>
            <h4>How to create a new wallet in MetaMask?</h4>
            <p>
                1. When the extension is installed, click on the icon in the upper right corner to open the MetaMask,
                read and accept the terms.
                Create a strong password and click Create.
            </p>
            <p>2. Create a strong password and click Create.</p>
            <p>
                3. You will see a 12 words seed phrase. Save seed words as a file or copy them to a safe place and click
                “I’ve copied it somewhere safe”.
            </p>
            <p> Congratulations! You have successfully created an account in MetaMask with a new wallet address!
                Now you can view your address on Etherscan (Ethereum blockchain explorer), check the QR code, copy your
                wallet’s address to clipboard or export your wallet’s private key.

            </p>
            <ConnectMetaMaskButton
                title="Connect to MetaMask"
            />
        </WrapContainer>
    );
}

export default InstructionMetamask;

