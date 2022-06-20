
import ListDetails from './ListDetails';

function ObjectionDetails ({ objection }: { objection: Record<string, string> }) {
  const list = [
    {
      title: 'Status',
      value: objection.statusObjection
    },
    {
      title: 'Remark',
      value: objection.remark,
      link: true
    },
    {
      title: 'Proposer Remark',
      value: String(objection.proposerRemark)
    },
    {
      title: 'Candidate Appeal Confirmation',
      value: String(objection.appealConfirmed)
    },
    {
      title: 'Executed',
      value: String(objection.executed)
    },
    {
      title: 'Slashed Amount',
      value: objection.slashedAmount + ' Q'
    },
    {
      title: 'Objection End Time',
      value: objection.objectionEndTime
    },
    {
      title: 'Appeal End Time',
      value: objection.appealEndTime
    }
  ];

  return (
    <div>
      <h6>Objection</h6>
      <ListDetails list={list} />
    </div>
  );
}

export default ObjectionDetails;
