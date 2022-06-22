import ModalStep from 'components/Base/ModalStep';

import { useBid } from '../BidModal';

function ConfirmStep ({ type, symbol }) {
  const { values, goBack, confirm } = useBid();

  return (
    <ModalStep
      onConfirm={confirm}
      onBack={goBack}
    >
      <h2>Chosen Data:</h2>

      <h5>Type</h5>
      <p className="text-capitalize">
        {type.replace('-', ' ')}
      </p>

      <h5>Bid</h5>
      <p>{`${values.bid} ${symbol}`}</p>
    </ModalStep>
  );
}

export default ConfirmStep;
