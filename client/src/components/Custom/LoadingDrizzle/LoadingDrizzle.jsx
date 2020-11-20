import React, {useEffect, useState, useCallback} from "react";
import Web3 from 'web3';
import {drizzleReactHooks} from "@drizzle/react-plugin";

import LoadingSpinner from "components/Base/LoadingSpinner";
import StartConfigurations from "pages/StartConfigurations";

import {WrapContainer} from "./styles";

const {useDrizzle, useDrizzleState} = drizzleReactHooks;
const web3 = new Web3(Web3.givenProvider);

function LoadingDrizzle({children}) {
    const [isMetaMask, setIsMetaMask] = useState('loading');
    const ethereum = window.ethereum;
    const {drizzle} = useDrizzle();
    const drizzleStatus = useDrizzleState(state => state.drizzleStatus);
    console.log('drizzle drizzle Loading', drizzle);

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
                    console.log('promise!', promise);
                    // Request account access if needed
                    // promise
                    //     .then(
                    //         result => {
                    //             // первая функция-обработчик - запустится при вызове resolve
                    //             alert("Fulfilled: " + result); // result - аргумент resolve
                    //         },
                    //         error => {
                    //             // вторая функция - запустится при вызове reject
                    //             alert("Rejected: " + error); // error - аргумент reject
                    //         }
                    //     );

                    // Acccounts now exposed
                    // resolve(web3);
                    // console.log('resolve')
                } catch (error) {
                    // console.log('reject')
                    // reject(error);
                }
                // setIsMetaMask('not-logged')
            } else {
                setIsMetaMask('loading')
            }
        }
    }, [web3, drizzleStatus, ethereum]);

    console.log('isMetaMask', isMetaMask);

    const accountHandler = useCallback(() => {
        switch (isMetaMask) {
            case 'logged':
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

