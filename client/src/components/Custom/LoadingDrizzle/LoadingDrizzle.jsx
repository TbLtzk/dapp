import React, {useEffect, useState, useCallback} from "react";
import Web3 from 'web3';
import {drizzleReactHooks} from "@drizzle/react-plugin";
import {useDispatch} from "react-redux";
import {setUserAddress} from "store/actions/action-creaters/user-inf";

import LoadingSpinner from "components/Base/LoadingSpinner";
import StartConfigurations from "pages/StartConfigurations";

import {WrapContainer} from "./styles";

const {useDrizzle, useDrizzleState} = drizzleReactHooks;
const web3 = new Web3(Web3.givenProvider);

function LoadingDrizzle({children}) {
    const [isMetaMask, setIsMetaMask] = useState('loading');
    const ethereum = window.ethereum;
    const {drizzle} = useDrizzle();
    const state = useDrizzleState(state => state);
    const drizzleStatus = useDrizzleState(state => state.drizzleStatus);

    const dispatch = useDispatch();

    useEffect(async () => {
        if (drizzleStatus.initialized) {
            web3.eth.getAccounts(function (err, accounts) {
                if (err != null) {
                    // console.error("An error occurred: " + err);
                    setIsMetaMask('error')
                } else if (accounts.length == 0) {
                    // console.log("User is not logged in to MetaMask");
                    setIsMetaMask('not-logged')
                } else {
                    // console.log("User is logged in to MetaMask");
                    setIsMetaMask('logged')
                }
            });
            ethereum?.on('accountsChanged', function (accounts) {
                if (drizzle) {
                    window.location.reload();
                }
            });
        } else {

            if (ethereum?.isMetaMask) {
                try {
                    const promise = await new Promise(function (resolve, reject) {
                        window.ethereum.enable();
                    });
                } catch (error) {
                    console.log('error', error)
                }
            } else {
                setIsMetaMask('loading')
            }
        }
    }, [web3, drizzleStatus, ethereum]);

    const accountHandler = useCallback(() => {
        switch (isMetaMask) {
            case 'logged':
                // const addressId = "0x64D4edeFE8bA86d3588B213b0A053e7B910Cad68";
                const addressId = state.accounts[0];
                dispatch(setUserAddress(addressId));
                return children;
            case 'not-logged':
                return <StartConfigurations error={'Waiting for login in MetaMask!'}/>;
            case 'error':
                return <StartConfigurations error={'Please install MetaMask!'}/>;
            case 'loading':
                return (
                    <WrapContainer>
                        <LoadingSpinner/>
                    </WrapContainer>
                );
            default:
                return (
                    <WrapContainer>
                        <LoadingSpinner/>
                    </WrapContainer>
                )
        }
    }, [isMetaMask]);

    return accountHandler()
}

export default LoadingDrizzle;

