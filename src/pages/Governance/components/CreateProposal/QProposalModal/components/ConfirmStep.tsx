import { Fragment } from 'react';
import { useSelector } from 'react-redux';

import { Classification } from '@q-dev/q-js-sdk';

import ModalStep from 'components/Base/ModalStep';

import { useCreateProposal } from '../QProposalModal';

import { newParameterSelector } from 'store/voting/proposals/selectors';

import { getTypeName } from 'func/contractHelpers';

function ConfirmStep () {
  const { values, goBack, confirm } = useCreateProposal();
  const isNewParameter = useSelector(newParameterSelector);
  const isConstitutionType = values.type === 'constitution';

  const newParams = isConstitutionType && isNewParameter && (
    <p style={{ color: '#FF8550' }}>
      Warning: This proposal will be about creating and adding a NEW parameter. Please check combination of expert
      panel, type and key if you want to change an existing parameter instead.
    </p>
  );

  const classificationMap: Record<Classification, string> = {
    [Classification.BASIC]: 'Basic part',
    [Classification.DETAILED]: 'Detailed part',
    [Classification.FUNDAMENTAL]: 'Fundamental part',
  };

  return (
    <ModalStep
      onConfirm={confirm}
      onBack={goBack}
    >
      <h2>Chosen Data</h2>

      <h5>Type</h5>
      <p className="text-capitalize">{values.type.replace(/-/g, ' ')}</p>

      {isConstitutionType && (
        <>
          <h5>Classification</h5>
          <p>
            {classificationMap[values.classification]}
          </p>

          <h5>Hash:</h5>
          <p>{values.hash}</p>

          <h5>Change Constitution Parameter:</h5>
          <p className="text-capitalize">{values.isParamsChanged ? 'yes' : 'no'}</p>
          {newParams}
        </>
      )}

      <h5>External Link</h5>
      <p>{values.externalLink}</p>

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
    </ModalStep>
  );
}

export default ConfirmStep;
