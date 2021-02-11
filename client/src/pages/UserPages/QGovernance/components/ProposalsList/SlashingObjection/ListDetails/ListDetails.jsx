import React, { Fragment } from 'react';

import {Text} from './styles'

function ListDetails(props) {
  const { list } = props;
  return (
    <>
      {list?.map((elem) => {
        return (
          <Fragment key={elem.title}>
            <Text>{elem.title}: {elem.value}</Text>
          </Fragment>
        );
      })}
    </>
  );
}

export default ListDetails;

