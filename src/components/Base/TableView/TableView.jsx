import React from 'react';
import PropTypes from 'prop-types';

import { TableStyle } from './styles';

function TableView(props) {
  const { header, body, type } = props;

  return (
    <TableStyle responsive type={type || ''}>
      {!header ? null :
        <thead>
        <tr>
          {header.map((elem, i) => {
            return <th key={i}>{elem}</th>;
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
};

export default TableView;

