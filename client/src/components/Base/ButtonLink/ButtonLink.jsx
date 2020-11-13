import React from "react";
import PropTypes from 'prop-types';

import {Link} from "./styles";

function ButtonLink(props) {
    const {title, handleLink} = props;

    return (
        <Link
            variant="default"
            onClick={handleLink}
        >
            {title}
        </Link>
    );
}

ButtonLink.propTypes = {
    title: PropTypes.string,
    handleLink: PropTypes.func,
};

export default ButtonLink;

