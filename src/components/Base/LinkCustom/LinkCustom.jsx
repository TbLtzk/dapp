import React from "react";
import PropTypes from 'prop-types';

import {Link} from "./styles";

function LinkCustom(props) {
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

LinkCustom.propTypes = {
    title: PropTypes.string,
    handleLink: PropTypes.func,
};

export default LinkCustom;

