import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { setNewParameter } from 'store/voting/proposals/action-creators';

import { getParameterKeysByType, getParameterValueByKey } from 'contracts/helpers/parameters-helper';

const keyNotFound = 'No value found. Please check or proceed to create a new parameter.';

function CurrentParameterValue ({ typeContract, parameterType, parameterKey }) {
  const [currentValue, setCurrentValue] = useState(null);
  const [keys, setKeys] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (typeContract && parameterType) {
      getParameterKeysByType(typeContract, parameterType)
        .then((data) => setKeys(data));
    }
  }, [typeContract, parameterType]);

  useEffect(() => {
    if (keys) {
      if (typeContract && parameterType && parameterKey) {
        if (keys.includes(parameterKey)) {
          getParameterValueByKey(typeContract, parameterType, parameterKey).then((data) => setCurrentValue(data));
          dispatch(setNewParameter(false));
        } else {
          setCurrentValue(keyNotFound);
          dispatch(setNewParameter(true));
        }
      }
    } else {
      setCurrentValue('');
    }
  }, [parameterKey, keys, dispatch]);

  return <h4 style={{ margin: '10px 0 20px 0' }}>{`Current value: ${currentValue}`} </h4>;
}

export default CurrentParameterValue;
