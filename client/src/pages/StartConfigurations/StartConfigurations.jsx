import React, {useEffect} from "react";

import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {detectEthereumProvider} from "store/actions/action-creaters/user-auth"
import {provider, loadingCheckProvider, errorM} from "store/selectors/user-auth"
import {drizzleReactHooks} from "@drizzle/react-plugin";

import {Col} from "react-bootstrap";
import LoadingSpinner from "components/Base/LoadingSpinner";
import InstructionMetamask from "pages/StartConfigurations/InstructionMetamask";

import {WrapContainer, WrapRow, WrapBlock} from "./styles"

const {useDrizzle, useDrizzleState} = drizzleReactHooks;

function StartConfigurations(props) {
    const {children, error} = props;
    const history = useHistory();

    const {drizzle} = useDrizzle();
    const drizzleState = useDrizzleState(state => state);
    const drizzleStatus = useDrizzleState(state => state.drizzleStatus);

    const providerObj = useSelector(provider);
    const loading = useSelector(loadingCheckProvider);
    const errorMessage = useSelector(errorM);

    const dispatch = useDispatch();

    useEffect(() => {
        if (!providerObj && !error) {
            dispatch(detectEthereumProvider())
        }
    }, [dispatch]);

    const showInstructions = (errorMessage) => {
        return (
            <div>
                <h3>{errorMessage}</h3>
                <InstructionMetamask/>
            </div>
        )
    };

    const checkMetaMask = () => {
        if (error) {
            return showInstructions(error);
        } else {
            if (loading) {
                return <LoadingSpinner/>
            } else {
                return errorMessage
                    ? showInstructions(errorMessage)
                    : children ? children : history.push("/welcome")
            }
        }
    };


    return (
        <WrapContainer fluid>
            <WrapRow>
                <Col xs={12}>
                    <WrapBlock block={!error || !errorMessage}>
                        {checkMetaMask()}
                    </WrapBlock>
                </Col>
            </WrapRow>
        </WrapContainer>
    );
}

export default StartConfigurations;

