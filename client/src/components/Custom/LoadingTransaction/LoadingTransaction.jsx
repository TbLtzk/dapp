import React from "react";

import {useSelector} from "react-redux";
import {transactionLoading, errorMessage} from "store/selectors/transaction-handler";

import LoadingSpinner from "components/Base/LoadingSpinner";

import {Wrap, Shadow, WrapLoading, WrapText, Text} from "./styles"
import {Col} from "react-bootstrap";

function LoadingTransaction() {

    const loading = useSelector(transactionLoading);
    const error = useSelector(errorMessage);

    return (
        <>
            {loading ?
                <Wrap>
                    <WrapLoading>
                        <WrapText>
                            <Text>Transaction loading</Text>
                            <LoadingSpinner type="light"/>
                        </WrapText>
                    </WrapLoading>
                    <Shadow></Shadow>
                </Wrap>
                //TODO - show error if transaction failed
                : error ? <Col xs={12}><p>{error}></p></Col> : null
            }

        </>

    );
}

export default LoadingTransaction;

