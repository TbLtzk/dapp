import { ParameterType } from '@q-dev/q-js-sdk'

export const addNewExpert = {
  subtitle: 'Nominate an Expert to add to an Expert Panel',
  radioDescr: 'Select the Panel to which you want to add an Expert',
  radioBtnName: 'type-proposal',
  radioBtn: [
    'Q Fees & Incentives Membership Panel',
    'Q DeFi (Decentralized Finance) Membership Panel',
    'Q Root Node Selection Expert Panel'
  ],
  subtitleInputUp: 'Provide Candidate Q Address',
  inputTitleDescrUp: 'Candidate to add',
  inputUp: ['Address'],
  inputUpObj: { address: '' },
  subtitleInputDown: 'Provide a reference link to external source',
  inputDown: ['External Link'],
  inputDownObj: { 'external-link': '' }
}

export const removeExpert = {
  subtitle: 'Nominate an Expert to Remove from an Expert Panel',
  radioDescr: 'Select the Panel to which you want to remove an Expert',
  radioBtnName: 'type-proposal',
  radioBtn: [
    'Q Fees & Incentives Membership Panel',
    'Q DeFi (Decentralized Finance) Membership Panel',
    'Q Root Node Selection Expert Panel'
  ],
  subtitleInputUp: 'Provide Candidate Q Address',
  inputTitleDescrUp: 'Expert to remove',
  inputUp: ['Address'],
  inputUpObj: { address: '' },
  subtitleInputDown: 'Provide a reference link to external source',
  inputDown: ['External Link'],
  inputDownObj: { 'external-link': '' }
}

export const parameterVote = {
  subtitle: 'Create a Proposal to Change a Q System Parameter.',
  radioDescr: 'Select the Panel which governs the parameter',
  radioBtnName: 'type-proposal',
  radioBtn: [
    'Q Fees & Incentives Membership Panel',
    'Q DeFi (Decentralized Finance) Membership Panel',
    'Q Root Node Selection Expert Panel'
  ],
  subtitleInputUp: 'Please provide exact Key-Name, Type and new Value for Parameter',
  inputUp: ['Key'],
  labelsArr: ['Key'],
  inputUpObj: {
    key: ''
  },
  inputUpSecond: ['Value'],
  subtitleUpSecond: 'Current Value',
  inputUpObjSecond: {
    value: ''
  },
  radioBtnTitleDown: 'Choose type',
  radioBtnNameDown: 'type-value-proposal',
  radioBtnDown: [
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
    }
  ],
  subtitleInputDown: 'Provide a reference link to external source',
  inputDown: ['External Link'],
  inputDownObj: { 'external-link': '' },
  parameterKey: 'parameter-key',
  parameterValue: 'parameter-value',
  parameterType: 'parameter-type',
  parameterNotExist: 'parameter-not-exist'
}
