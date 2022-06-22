import { Fragment } from 'react';
import { useSelector } from 'react-redux';

import ModalStep from 'components/Base/ModalStep';

import { useCreateProposal } from '../ExpertProposalModal';

import { newParameterSelector } from 'store/voting/proposals/selectors';

import { getTypeName } from 'func/contractHelpers';

function ConfirmStep () {
  const { values, goBack, confirm } = useCreateProposal();
  const isNewParameter = useSelector(newParameterSelector);
  const isParameterVote = values.type === 'parameter-vote';

  return (
    <ModalStep
      onConfirm={confirm}
      onBack={goBack}
    >
      {isParameterVote && isNewParameter && (
        <p style={{ color: '#FF8550' }}>
          Warning: This proposal will be about creating and adding a NEW parameter. Please check combination of expert
          panel, type and key if you want to change an existing parameter instead.
        </p>
      )}

      <h5>Type:</h5>
      <p className="text-capitalize">{values.type.replace(/-/g, ' ')}</p>

      <h5>{isParameterVote ? 'Add Parameter:' : 'Panel to Add an Expert:'}</h5>
      <p className="text-capitalize">{values.panelType.replace(/-/g, ' ')}</p>

      {!isParameterVote
        ? (
          <>
            <h5>Candidate Q Address:</h5>
            <p>{values.address}</p>
          </>
        )
        : (
          <>
            {values.params.map((param, index) => (
              <Fragment key={index + param.key}>
                <h4>Parameter #{index + 1}</h4>
                <div className="modal__column-1-2-2">
                  <div>
                    <h5>Type</h5>
                    <p title={getTypeName(param.type)}>{getTypeName(param.type)}</p>
                  </div>

                  <div>
                    <h5>Key</h5>
                    <p title={param.key}>{param.key}</p>
                  </div>

                  <div>
                    <h5>Value</h5>
                    <p title={param.value}>{param.value}</p>
                  </div>
                </div>
              </Fragment>
            ))}
          </>
        )}

      <h5>External link:</h5>
      <p>{values.externalLink}</p>
    </ModalStep>
  );
}

export default ConfirmStep;
