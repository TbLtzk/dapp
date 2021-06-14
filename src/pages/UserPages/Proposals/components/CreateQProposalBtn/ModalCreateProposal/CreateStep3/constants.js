import { ParamType } from '@q-dev/q-js-sdk';

export const constUpdate = {
  inputTitle: 'Please provide exact Key-Name, Type and new Value for Parameter',
  inputsFirst: ['Parameter Key'],
  inputsObjFirst: 'parameter-key',
  inputsSecond: ['Value'],
  inputsObjSecond: 'value',
  radioBtnTitle: 'Choose type',
  radioBtnName: 'type-proposal',
  radioBtn: [
    {
      lbl: 'Address',
      value: ParamType.ADDRESS
    },
    {
      lbl: 'Boolean',
      value: ParamType.BOOL
    },
    {
      lbl: 'String',
      value: ParamType.STRING
    },
    {
      lbl: 'Uint',
      value: ParamType.UINT
    }],
};
