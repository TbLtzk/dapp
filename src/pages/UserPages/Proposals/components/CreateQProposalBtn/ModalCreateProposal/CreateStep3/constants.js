import { ParameterType } from '@q-dev/q-js-sdk'

export const constUpdate = {
  inputTitle: 'Please provide exact Key-Name, Type and new Value for Parameter',
  inputsFirst: ['Parameter Key'],
  inputsObjFirst: 'parameter-key',
  inputsSecond: ['Value'],
  inputsObjSecond: 'parameter-value',
  radioBtnTitle: 'Parameter',
  radioBtnName: 'parameter-type',
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
    }]
}
