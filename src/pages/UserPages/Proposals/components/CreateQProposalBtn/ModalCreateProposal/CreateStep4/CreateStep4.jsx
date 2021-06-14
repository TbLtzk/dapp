import React, { useCallback, useEffect, useState, Fragment } from 'react';

import { useSelector } from 'react-redux';
import { formObject } from 'store/selectors/voting/proposals';
import { PROPOSALS_TYPES } from 'constants/statuses';
import { ParamType } from '@q-dev/q-js-sdk';

function CreateStep4(props) {
  const { activeTab } = props;
  const formData = useSelector(formObject);
  const [params, setParams] = useState([{
    type: '',
    key: '',
    value: ''
  }]);

  useEffect(() => {
    if (formData['type-proposal']) {
      setParams(
        formData['type-proposal'].reduce((types, item, index) => {
          types.push({
            type: item,
            key: formData['parameter-key'][index],
            value: formData['value'][index],
          });
          return types;
        }, [])
      );
    }
  }, []);

  function getTypeName(typeId) {
    switch (+typeId){
      case ParamType.ADDRESS:
        return 'Address'
      case ParamType.BOOL:
        return 'Boolean'
      case ParamType.STRING:
        return 'String'
      case ParamType.UINT:
        return 'Uint'
    }
  }

  const contentSwitcher = useCallback(() => {
    switch (activeTab) {
      case PROPOSALS_TYPES.proposals:
        if (formData['change-constitution-parameter'] === 'yes') {
          return (
            <div>
              <h2>Chosen data</h2>
              <h5>Type</h5>
              <p>{formData?.first?.replace(/-/g, ' ')}</p>
              <h5>Classification</h5>
              <p>{formData?.classification?.replace(/-/g, ' ')}</p>
              <h5>External link</h5>
              <p>{formData['external-link']}</p>
              <h5>Hash</h5>
              <p>{formData.hash}</p>
              <h5>Change Constitution Parameter</h5>
              <p>{formData['change-constitution-parameter']}</p>
              {params.map((item, index) => {
                return <Fragment key={index + 'param'}>
                  <h5>Parameter key #{index + 1}</h5>
                  <p>{item.key}</p>
                  <h5>Type Proposal</h5>
                  <p>{getTypeName(item.type)}</p>
                  <h5>Value</h5>
                  <p>{item.value}</p>
                </Fragment>;
              })}
            </div>
          );
        }
        break;
      default:
        return null;
    }

  }, [activeTab, params]);

  return (
    <>
      {contentSwitcher()}
    </>
  );
}

export default CreateStep4;

