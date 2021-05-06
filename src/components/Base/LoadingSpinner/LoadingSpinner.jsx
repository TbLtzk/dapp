import React from "react";
import PropTypes from 'prop-types';

import {Spinner} from "react-bootstrap";

function LoadingSpinner(props) {
    const {type, className} = props;

    return (
        <Spinner animation="border" variant={type || 'dark'} className={className}/>
    );
}

LoadingSpinner.propTypes = {
    type: PropTypes.string,
};

LoadingSpinner.defaultProps = {
    type: 'dark',
};

export default LoadingSpinner;

