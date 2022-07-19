import { useTranslation } from 'react-i18next';

import { FormParameter } from 'typings/forms';
import Tip from 'ui/Tip';

import { ParameterViewerContainer } from './styles';

import { getTypeName } from 'func/contractHelpers';

interface Props {
  parameter: FormParameter;
  index: number;
}

function ParameterViewer ({ parameter, index }: Props) {
  const { t } = useTranslation();

  return (
    <ParameterViewerContainer>
      <p className="text-md">
        {t('PARAMETER')} {index + 1}
      </p>

      {parameter.isNew && (
        <Tip type="warning">
          {t('GOING_TO_CREATE_A_NEW_PARAMETER')}
        </Tip>
      )}

      <div>
        <p className="text-md color-secondary">{t('KEY')}</p>
        <p className="text-lg" title={parameter.key}>
          {parameter.key}
        </p>
      </div>

      <div>
        <p className="text-md color-secondary">{t('VALUE')}</p>
        <p className="text-lg" title={parameter.value}>
          <span>{parameter.value}</span>
          <span className="font-light color-secondary" style={{ marginLeft: '4px' }}>
            {getTypeName(parameter.type)?.toUpperCase()}
          </span>
        </p>
      </div>
    </ParameterViewerContainer>
  );
}

export default ParameterViewer;
