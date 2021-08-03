export const addRootNode = {
  subtitle: 'Add Your account as a Candidate for the Root Node Panel. Optionally provide a Root Node to Remove.',
  inputTitleDescr: ['Provide current constitution Hash to declare your consent', 'Provide a reference link to external source'],
  inputs: ['Hash', 'External Link'],
  inputsObj: { hash: '', 'external-link': '' },
  radioBtnTitle: 'Do you want to remove a current Root Node',
  radioBtnDownName: 'remove-current',
  radioBtnDown: ['No', 'Yes'],
  inputTitleDown: 'Root Node to Remove',
  inputDown: ['Address'],
  inputDownObj: { address: '' }
}

export const removeRootNode = {
  subtitle: 'Nominate a Root Node to Remove',
  inputTitleDescr: ['Root Node to Remove', 'Provide a reference link to external source'],
  inputs: ['Address', 'External Link'],
  inputsObj: { address: '', 'external-link': '' }
}
