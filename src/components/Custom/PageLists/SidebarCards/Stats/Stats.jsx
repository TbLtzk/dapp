import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import Button from 'components/Base/Button';
import CustomBlock from 'components/Base/CustomBlock';

function Stats ({ statsData, type }) {
  return (
    <CustomBlock>
      <h1>{type} Stats</h1>
      {statsData?.map((elem) => (
        <Fragment key={elem.title}>
          <h5>{elem.title}</h5>
          <p title={elem.value}>{elem.value}</p>
        </Fragment>
      ))}
      <div className="card__actions">
        <Link to="/q-vault">
          <Button alwaysEnabled look="white">
            Manage vault
          </Button>
        </Link>
      </div>
    </CustomBlock>
  );
}

export default Stats;
