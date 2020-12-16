import React from "react";
import PropTypes from 'prop-types';

import {Link} from "./styles";

function ButtonLink(props) {
    const {title, width, handleLink} = props;

    return (
        <Link
            width={width}
            variant="default"
            onClick={handleLink}
        >
            {title}
        </Link>
    );
}

ButtonLink.propTypes = {
    //TODO: can be string or object
    // title: PropTypes.string,
    handleLink: PropTypes.func,
};

export default ButtonLink;

