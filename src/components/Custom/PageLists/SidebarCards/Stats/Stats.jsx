import React, { Fragment } from 'react';
import { useHistory } from 'react-router-dom';

import Button from 'components/Base/Button';
import CustomBlock from 'components/Base/CustomBlock';

function Stats ({ statsData, type }) {
  const history = useHistory();

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
        <Button
          alwaysEnabled
          look="white"
          onClick={() => history.push('q-vault')}
        >
          Manage vault
        </Button>
      </div>
    </CustomBlock>
  );
}

export default Stats;
