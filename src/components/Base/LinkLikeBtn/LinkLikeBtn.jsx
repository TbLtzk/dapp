import React from "react";
import PropTypes from 'prop-types';

import {LinkCustom} from "./styles";

function LinkLikeBtn(props) {
    const {title, type, path} = props;

    return (
        <LinkCustom
            href={path}
            type={type}
            variant="primary"
        >
            {title}
        </LinkCustom>
    );
}

LinkLikeBtn.propTypes = {
    title: PropTypes.string,
    path: PropTypes.string,
    type: PropTypes.string,
};


LinkLikeBtn.defaultProps = {
    type: 'main',
};

export default LinkLikeBtn;

