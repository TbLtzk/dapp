import React from "react";
import PropTypes from 'prop-types';

import {ButtonCustom} from "./styles";

function Button(props) {
    const {title, handleButton} = props;

    return (
        <ButtonCustom
            variant="primary"
            onClick={handleButton}
        >
            {title}
        </ButtonCustom>
    );
}

Button.propTypes = {
    title: PropTypes.string,
    handleButton: PropTypes.func,
};

export default Button;

