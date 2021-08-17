import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { setTransactionLoadingError } from "store/actions/action-creaters/transaction-handler";

import { errorMessage } from "store/selectors/transaction-handler";
import { useAlert } from "react-alert";

function Alert() {
    const dispatch = useDispatch();

    const errorTransaction = useSelector(errorMessage);
    const alert = useAlert();

    const createAlert = (error) => {
        if (error.message) {
            const message = error.message.split(":");
            return { header: message[0], text: message[1] };
        }
        if (error.status === false) {
            return { header: "Error", text: "Not enough balance on wallet account" };
        } else {
            return { header: "Unknown type of error", text: "No additional info" };
        }
    };

    const transactionHanlder = () => {
        if (errorTransaction !== null) {
            const getAlert = createAlert(errorTransaction);
            alert.error(getAlert);
            dispatch(setTransactionLoadingError(null));
        }
    };

    useEffect(() => {
        transactionHanlder();
    }, [errorTransaction, dispatch]);

    return <></>;
}

export default Alert;
