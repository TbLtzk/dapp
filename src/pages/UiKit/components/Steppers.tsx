import Stepper from 'ui/Stepper';

function Steppers () {
  const steps = [
    { id: 'type', name: 'Type' },
    { id: 'details', name: 'Details' },
    { id: 'confirmation', name: 'Confirmation' },
  ];

  return (
    <div className="block">
      <h2 className="text-h2">Steppers</h2>
      <div className="block-content">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
          <Stepper steps={steps} current={0} />
          <Stepper steps={steps} current={1} />
          <Stepper steps={steps} current={2} />
        </div>
      </div>
    </div>
  );
}

export default Steppers;
