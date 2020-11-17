import React, {useState, useEffect} from "react";

import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {detectEthereumProvider} from "store/actions/action-creaters/user-auth"
import {provider, loadingCheckProvider, errorM} from "store/selectors/user-auth"

import {Col} from "react-bootstrap";
import LoadingSpinner from "components/Base/LoadingSpinner";
import InstructionMetamask from "components/Custom/InstructionMetamask";

import {WrapContainer, WrapRow, WrapBlock} from "./styles"
import LoadingDrizzle from "components/Custom/LoadingDrizzle";

function StartConfigurations() {

    const history = useHistory();

    // const [address, setAddress] = useState('');

    // const ethereum = window.ethereum;
    // if (ethereum) {
    //     ethereum.on('accountsChanged', function (accounts) {
    //         console.log('accountsChanged', accounts[0]);
    //         // setAddress(accounts[0])
    //     });
    //     // console.log('chain id', ethereum.chainId)
    // }
    const providerObj = useSelector(provider);
    const loading = useSelector(loadingCheckProvider);
    const errorMessage = useSelector(errorM);

    console.log('providerObj CONFIGURATIONS', providerObj);
    console.log('loading CONFIGURATIONS', loading);
    console.log('errorMessage CONFIGURATIONS', errorMessage);

    const dispatch = useDispatch();

    useEffect(() => {
        if (!providerObj){
            dispatch(detectEthereumProvider())
        }
    }, []);

    return (
            <WrapContainer fluid>
                <WrapRow>
                    <Col xs={12}>
                        <WrapBlock block={!errorMessage}>
                            {
                                loading ? <LoadingSpinner/> :
                                    errorMessage
                                        ? <div>
                                            <h3>{errorMessage}</h3>
                                            <InstructionMetamask/>
                                        </div>
                                        : history.push("/welcome")
                            }


                            {/*<LinkLikeBtn*/}
                            {/*    type="white"*/}
                            {/*    title="Connect with Metamask"*/}
                            {/*    path="#"*/}
                            {/*    // handleButton={() => {*/}
                            {/*    //     console.log('click');*/}
                            {/*    //     window.ethereum.request({method: 'eth_requestAccounts'});*/}
                            {/*    // }}*/}
                            {/*/>*/}
                        </WrapBlock>
                    </Col>
                </WrapRow>
            </WrapContainer>
    );
}

export default StartConfigurations;

