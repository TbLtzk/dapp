import Icon from 'ui/Icon';
import Tooltip from 'ui/Tooltip';

function Tooltips () {
  return (
    <div className="block">
      <h2 className="text-h2">Tooltips</h2>
      <div className="block-content">
        <div
          style={{
            display: 'flex',
            gap: '16px'
          }}
        >
          <Tooltip trigger={<Icon name="expand-less" />}>
            Some tooltip content
          </Tooltip>

          <Tooltip
            trigger={<Icon name="expand-more" />}
            placement="bottom"
          >
            Some tooltip content
          </Tooltip>

          <Tooltip
            trigger={<Icon name="chevron-left" />}
            placement="left"
          >
            Some tooltip content
          </Tooltip>

          <Tooltip
            trigger={<Icon name="chevron-right" />}
            placement="right"
          >
            Some tooltip content
          </Tooltip>

          <Tooltip disabled trigger={<Icon name="cross" />}>
            Some tooltip content
          </Tooltip>
        </div>
      </div>
    </div>
  );
}

export default Tooltips;
