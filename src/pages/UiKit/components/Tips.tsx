import Button from 'ui/Button';
import Tip from 'ui/Tip';

function Tips () {
  return (
    <div className="block">
      <h2 className="text-h2">Tips</h2>
      <div className="block-content">
        <div className="row-list">
          <Tip type="info">Info tip</Tip>
          <Tip type="warning">Warning tip</Tip>
          <Tip compact type="info">Info tip compact</Tip>
          <Tip
            type="warning"
            action={<Button compact look="danger">Action</Button>}
            style={{ maxWidth: '340px' }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit
          </Tip>
        </div>
      </div>
    </div>
  );
}

export default Tips;
