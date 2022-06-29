import { COLORS } from 'styles/colors';
import Tooltip from 'ui/Tooltip';

function Colors () {
  return (
    <div className="block">
      <h2 className="text-h2">Colors</h2>
      <div className="block-content">
        <div className="color-list">
          {Object.entries(COLORS).map(([name, color]) => (
            <Tooltip
              key={name}
              trigger={(
                <div className="color-item" style={{ backgroundColor: color }} />
              )}
            >
              {name}
            </Tooltip>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Colors;
