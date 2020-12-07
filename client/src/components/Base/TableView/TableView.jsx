import React, {useState} from "react";
import PropTypes from 'prop-types';

import {TableStyle} from "./styles";

function TableView(props) {
    const {header, body} = props;

    return (
        <TableStyle responsive>
            {!header ? null :
                <thead>
                <tr>
                    {header.map((elem, i) => {
                        return <th key={i}>{elem}</th>
                    })}
                </tr>
                </thead>
            }
            <tbody>
                {body}
            </tbody>
        </TableStyle>
    );
}

TableView.propTypes = {
    header: PropTypes.array,
    // body: PropTypes.array,
};

export default TableView;

