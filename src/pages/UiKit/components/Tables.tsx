import ValidatorsTable from 'components/Custom/Tables/ValidatorsTable';

function Tables () {
  return (
    <div>
      <h2 className="text-h2 block">Table: </h2>
      <div className="block-content">
        <ValidatorsTable tableType="validators-widened" />
      </div>
    </div>
  );
}

export default Tables;
