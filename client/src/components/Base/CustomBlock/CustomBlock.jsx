import React from "react";

import {Block} from "./styles"

function CustomBlock(props) {
    const {children} = props;

    return (
        <Block>
            {children}
        </Block>
    );
}

export default CustomBlock;

