import React from 'react';

import Button from 'components/Base/Button';
import Tooltip from 'components/Base/Tooltip';

import { slashingTypes } from 'constants/slashingTypes';

function SlashingActions ({ objection, isRootNode, onAction }) {
  const proposeDecisionButton = isRootNode
    ? 'Any Root Node can propose a decision that is based on an arbitral award or the explicit lack of such.'
    : 'User is not a Root Node';

  return (
    <div>
      <Tooltip shown additionalInfo="The slashed party can object to this executed slashing proposal and seek for an arbitral award.">
        <Button
          disabled={!objection}
          style={{ margin: '10px', width: '175px' }}
          onClick={() => onAction(slashingTypes.castObjection)}
        >
          Cast Objection
        </Button>
      </Tooltip>

      <Tooltip shown additionalInfo="Slashing proposer confirms that a slashed node has initiated a court appeal to receive an arbitral award.">
        <Button
          style={{ margin: '10px', width: '175px' }}
          onClick={() => onAction(slashingTypes.proposerRemark)}
        >
          Confirm appeal
        </Button>
      </Tooltip>

      <Tooltip shown additionalInfo={proposeDecisionButton}>
        <Button
          disabled={!isRootNode}
          style={{ margin: '10px', width: '175px' }}
          onClick={() => onAction(slashingTypes.proposeDecision)}
        >
          Propose Decision
        </Button>
      </Tooltip>
    </div>
  );
}

export default SlashingActions;
