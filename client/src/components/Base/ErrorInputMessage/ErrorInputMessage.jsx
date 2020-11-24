import React from "react";
import PropTypes from 'prop-types';

import {ErrorMessage} from './styles';

function ErrorInputMessage(props) {
    const {message} = props;
    return (
        <ErrorMessage>{message}</ErrorMessage>
    );
}

ErrorInputMessage.propTypes = {
    message: PropTypes.string,
};

ErrorInputMessage.defaultProps = {
    message: '',
};

export default ErrorInputMessage;



