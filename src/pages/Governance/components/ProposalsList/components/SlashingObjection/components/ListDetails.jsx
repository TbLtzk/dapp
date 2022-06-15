import React, { Fragment } from 'react';

const ListDetails = ({ list }) => {
  return list.map((item) => Boolean(item.value) && (
    <Fragment key={item.title}>
      <h5>{item.title}</h5>
      {item.link
        ? (
          <a
            href={'//' + item.value}
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'block',
              marginBottom: '15px'
            }}
          >
            {item.value}
          </a>
        )
        : <p title={item.value}>{item.value}</p>
      }
    </Fragment>
  ));
};

export default ListDetails;
