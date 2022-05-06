import React, { Fragment } from 'react';

const ListDetails = ({ list }) =>
  list.map((elem) =>
    elem.value
      ? (
        <Fragment key={elem.title}>
          <h5>{elem.title}</h5>
          {elem.title === 'Remark'
            ? (
              <a
                href={'//' + elem.value}
                target="_blank"
                rel="noreferrer"
              >
                {elem.value}
              </a>
            )
            : (
              <p title={elem.value}>{elem.value}</p>
            )}
        </Fragment>
      )
      : null
  );

export default ListDetails;
