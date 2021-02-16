import React, { Fragment } from 'react';

import { Link } from 'components/Custom/PageLists/styles';
import { Text } from './styles';

function ListDetails(props) {
  const { list } = props;
  return (
    <>
      {list?.map((elem) => {
        return (
          <Fragment key={elem.title}>
            <Text>{elem.title}:
              {elem.title === 'Remark'
                ? <Link href={'//' + elem.value} target="_blank">{elem.value}</Link>
                : elem.value
              }</Text>
          </Fragment>
        );
      })}
    </>
  );
}

export default ListDetails;

