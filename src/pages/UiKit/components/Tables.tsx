import ValidatorsTable from 'components/Custom/Tables/ValidatorsTable';

import TABLE_TYPES from 'constants/tableTypes';

function Tables () {
  return (
    <div>
      <h2 className="text-h2 block">Table: </h2>
      <div className="block-content">
        <ValidatorsTable tableType={TABLE_TYPES.validatorsWidened} />
      </div>
    </div>
  );
}

export default Tables;
