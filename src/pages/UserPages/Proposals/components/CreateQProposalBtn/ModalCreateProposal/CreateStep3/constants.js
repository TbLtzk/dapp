import { ParameterType } from '@q-dev/q-js-sdk';

console.log('ParameterType', ParameterType)

export const constUpdate = {
  inputTitle: 'Please provide exact Key-Name, Type and new Value for Parameter',
  inputsFirst: ['Parameter Key'],
  inputsObjFirst: 'parameter-key',
  inputsSecond: ['Value'],
  inputsObjSecond: 'value',
  radioBtnTitle: 'Parameter',
  radioBtnName: 'type-proposal',
  radioBtn: [
    {
      lbl: 'Address',
      value: ParameterType.ADDRESS
    },
    {
      lbl: 'Boolean',
      value: ParameterType.BOOL
    },
    {
      lbl: 'String',
      value: ParameterType.STRING
    },
    {
      lbl: 'Uint',
      value: ParameterType.UINT
    }],
};
