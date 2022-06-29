import Tabs from 'ui/Tabs';

function Selects () {
  const tabs1 = [
    {
      id: 'q-proposal',
      label: 'Q Proposals',
      count: 0,
      link: '/ui-kit/tab1',
    },
    {
      id: 'root-node-panel',
      label: 'Root Node Panel',
      count: 3,
      link: '/ui-kit/tab2',
    },
    {
      id: 'expert-proposals',
      label: 'Expert Proposals',
      count: 1,
      link: '/ui-kit/tab3',
    },
  ];

  return (
    <div className="block">
      <h2 className="text-h2">Tabs</h2>
      <div className="block-content">
        <Tabs tabs={tabs1} />
      </div>
    </div>
  );
}

export default Selects;
