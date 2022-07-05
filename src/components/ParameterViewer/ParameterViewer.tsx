
import { FormParameter } from 'typings/forms';
import Tip from 'ui/Tip';

import { ParameterViewerContainer } from './styles';

import { getTypeName } from 'func/contractHelpers';

interface Props {
  parameter: FormParameter
  index: number
}

function ParameterViewer ({ parameter, index }: Props) {
  return (
    <ParameterViewerContainer>
      <p className="text-md">
        Parameter {index + 1}
      </p>

      {parameter.isNew && (
        <Tip type="warning">
          You're going to create a new parameter.
          Please check combination of type and key if you want to change an existing parameter instead
        </Tip>
      )}

      <div>
        <p className="text-md color-secondary">
          Key
        </p>
        <p className="text-lg" title={parameter.key}>
          {parameter.key}
        </p>
      </div>

      <div>
        <p className="text-md color-secondary">
          Value
        </p>
        <p className="text-lg" title={parameter.value}>
          <span>{parameter.value}</span>
          <span
            className="font-light color-secondary"
            style={{ marginLeft: '4px' }}
          >
            {getTypeName(parameter.type)?.toUpperCase()}
          </span>
        </p>
      </div>
    </ParameterViewerContainer>
  );
}

export default ParameterViewer;
