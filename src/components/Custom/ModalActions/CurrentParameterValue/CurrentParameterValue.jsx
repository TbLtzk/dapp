import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { getParameterValueByKey } from 'store/actions/action-creaters/parameters';
import { arrayParameterKeysByType, parameterValueByKey } from 'store/selectors/parameters';

import { SubTitle } from './styles';

const keyNotFound = 'Value not found. Key does not exist yet?';

function CurrentParameterValue(props) {
  const { typePanel, typeParameter, parameterKey } = props;
  const dispatch = useDispatch();

  const [currentParameterValue, setCurrentParameterValue] = useState('');

  const parameterByKeyValue = useSelector(parameterValueByKey);
  const parameterKeysByType = useSelector(arrayParameterKeysByType);

  useEffect(() => {
    if (typePanel && typeParameter && parameterKey) {
      if (parameterKeysByType?.length !== 0) {
        const foundValue = parameterKeysByType.find(value => parameterKey == value);
        if (foundValue) {
          dispatch(getParameterValueByKey(typePanel, typeParameter, parameterKey));
          setCurrentParameterValue(parameterByKeyValue);
        } else {
          setCurrentParameterValue(keyNotFound);
        }
      } else {
        setCurrentParameterValue(keyNotFound);
      }
    }

  }, [parameterKeysByType, parameterByKeyValue, typePanel, typeParameter, parameterKey]);

  return (
    <SubTitle>{`Current Value: ${currentParameterValue}`} </SubTitle>
  );
}

export default CurrentParameterValue;


