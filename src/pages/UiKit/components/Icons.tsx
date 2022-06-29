import Icon from 'ui/Icon';
import icons from 'ui/Icon/icons.json';
import Tooltip from 'ui/Tooltip';

function Icons () {
  return (
    <div className="block">
      <h2 className="text-h2">Icons</h2>
      <div className="block-content">
        <div className="icon-list">
          {Object.keys(icons).map((icon) => (
            <Tooltip
              key={icon}
              trigger={(
                <Icon
                  className="icon"
                  name={icon as keyof typeof icons}
                />
              )}
            >
              {icon}
            </Tooltip>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Icons;
