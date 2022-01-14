import React, { useState } from "react";
import { useSelector } from "react-redux";
import { networkSelector } from "store/user-inf/selectors";
import AccordionLinks from "../AccordionLinks";
import CommonLinks from "../CommonLinks";
import { NetworkWrapper } from "./styles";

const networks = { 35443: "Testnet", 35442: "Devnet", 35441: "Mainnet" };

function Network() {
    const network = useSelector(networkSelector);
    const [state, setState] = useState(true);

    return (
        <div style={{ marginBottom: "16px" }}>
            <AccordionLinks
                headerLink={
                    <div>Network: {state ? <span style={{ color: "#87FF65" }}>{networks[network]}</span> : ""} </div>
                }
                openLink={setState}
                open={false}
            >
                <>
                    <div style={{ marginLeft: "10px" }}>
                        <div>- Mainet</div>
                        <div>- Devnet</div>
                        <div>- Testnet</div>
                    </div>
                </>
            </AccordionLinks>
        </div>
    );
}

export default Network;
