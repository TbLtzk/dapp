import React from "react";
import PropTypes from 'prop-types';

import {ButtonCustom} from "./styles";

function Button(props) {
    const {title, type, handleButton} = props;

    return (
        <ButtonCustom
            type={type}
            variant="primary"
            onClick={handleButton}
        >
            {title}
        </ButtonCustom>
    );
}

Button.propTypes = {
    title: PropTypes.string,
    type: PropTypes.string,
    handleButton: PropTypes.func,
};


Button.defaultProps = {
    type: 'main',
};

export default Button;

