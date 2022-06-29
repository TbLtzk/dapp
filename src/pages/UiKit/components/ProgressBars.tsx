import Progress from 'ui/Progress';

function ProgressBars () {
  return (
    <div className="block">
      <h2 className="typo-h2">Progress Bars</h2>
      <div className="block-content">
        <div className="row-list">
          <Progress value={0} max={100} />
          <Progress value={50} max={150} />
          <Progress value={150} max={150} />
        </div>
      </div>
    </div>
  );
}

export default ProgressBars;
