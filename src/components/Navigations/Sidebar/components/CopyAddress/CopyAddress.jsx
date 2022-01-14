import Button from "components/Base/Buttons/Button";
import React, { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { useSelector } from "react-redux";
import { networkSelector, userAddressMetamask } from "store/user-inf/selectors";
import Network from "../Network";

const networks = { 35443: "Testnet", 35442: "Devnet", 35441: "Mainnet" };

function CopyAddress() {
    const userAddress = useSelector(userAddressMetamask);
    const network = useSelector(networkSelector);

    const [copy, setCopy] = useState(false);

    function handleCopy() {
        setCopy(true);
        setTimeout(() => {
            setCopy(false);
        }, 3000);
    }

    const title = copy ? (
        "Copied!"
    ) : (
        <span style={{ display: "flex", justifyContent: "space-between" }}>
            <span>
                <i className="mdi mdi-content-copy" /> {userAddress.substring(0, 20) + "..."}
            </span>
            <span style={{ color: "#87FF65" }}>{networks[network]}</span>
        </span>
    );
    // dont forget icon
    return (
        <CopyToClipboard text={userAddress}>
            <span title={userAddress}>
                <Button width="100%" type="white" title={copy ? "Copied!" : userAddress} handleButton={handleCopy} />
            </span>
        </CopyToClipboard>
    );
}

export default CopyAddress;
