import Toast from 'ui/Toast';

function Toasts () {
  return (
    <div className="block">
      <h2 className="typo-h2">Toasts</h2>
      <div className="block-content">
        <div className="row-list">
          <Toast
            type="info"
            text="Info toast"
            onClose={() => {}}
          />

          <Toast
            type="success"
            text="Success toast"
            onClose={() => {}}
          />

          <Toast
            type="error"
            text="Error toast"
            onClose={() => {}}
          />
        </div>
      </div>
    </div>
  );
}

export default Toasts;
