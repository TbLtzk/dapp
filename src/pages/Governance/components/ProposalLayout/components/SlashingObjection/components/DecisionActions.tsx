import Button from 'components/Base/Button';
import Tooltip from 'components/Base/Tooltip';

import { escrowTypes } from 'constants/escrowTypes';

interface Props {
  recallDecision: boolean
  isRootNode: boolean
  onAction: (action: string) => void
}

function DecisionActions ({ recallDecision, isRootNode, onAction }: Props) {
  const voteToConfirmDecitionButton = isRootNode
    ? 'Any Root Node is obliged to vote and confirm proposed decision.'
    : 'User is not a Root Node';
  const executeDecisionButton = isRootNode
    ? 'Any Root Node can execute a Decision, clearing the escrow and distributing slashed amounts according final confirmed decision.'
    : 'User is not a Root Node';

  return (
    <div>
      <Tooltip shown additionalInfo="The proposer of the current proposed decision may take back the decision from voting.">
        <Button
          disabled={!recallDecision}
          style={{ margin: '10px', width: '175px' }}
          onClick={() => onAction(escrowTypes.recall)}
        >
          Recall Decision
        </Button>
      </Tooltip>

      <Tooltip shown additionalInfo={voteToConfirmDecitionButton}>
        <Button
          disabled={!isRootNode}
          style={{ margin: '10px', width: '175px' }}
          onClick={() => onAction(escrowTypes.confirm)}
        >
          Vote to confirm Decision
        </Button>
      </Tooltip>

      <Tooltip shown additionalInfo={executeDecisionButton}>
        <Button
          disabled={!isRootNode}
          style={{ margin: '10px', width: '175px' }}
          onClick={() => onAction(escrowTypes.execute)}
        >
          Execute Decision
        </Button>
      </Tooltip>
    </div>
  );
}

export default DecisionActions;
