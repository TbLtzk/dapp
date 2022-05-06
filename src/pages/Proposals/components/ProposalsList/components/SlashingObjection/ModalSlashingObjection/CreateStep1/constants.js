export const castObjection = {
  subtitleOne: 'The target of a slashing proposal has the right tp object the slashing.',
  subtitleTwo: 'Please provide a reference link to external source giving details of your objection',
  inputPlaceholderUp: ['External link'],
  inputTypes: ['external-link-optional'],
  inputUpObj: { 'external-link': '' }
};

export const proposeDecision = {
  subtitleOne: 'Members of the Root Node Panel check the objection and propose decision to confirm.',
  subtitleTwo: 'Please provide a reference link to external source giving details of your decision',
  inputPlaceholder: ['External link'],
  inputObj: { 'external-link': '' },
  inputLabelTwo: 'Please provide the adjusted percentage for slashing',
  inputPlaceholderTwo: ['%-Value'],
  inputObjTwo: { '%-value': '' },
  radioLabel: 'Did the target of the slashing neglect a formal appeal?',
  radioName: 'target-slashing-appeal',
  radioBtn: ['Yes', 'No']
};

export const proposerRemark = {
  subtitleOne: 'As the slashing objection proposer please provide a valid reason.',
  subtitleTwo: 'Please provide a remark about the objection.',
  inputPlaceholderUp: ['Proposer remark'],
  inputUpObj: { 'proposer-remark': '' }
};

export const slashingTypes = {
  castObjection: 'cast-objection',
  proposerRemark: 'proposer-remark',
  proposeDecision: 'propose-decision'
};

export const escrowTypes = {
  confirm: 'confirm',
  recall: 'recall',
  execute: 'execute'
};
