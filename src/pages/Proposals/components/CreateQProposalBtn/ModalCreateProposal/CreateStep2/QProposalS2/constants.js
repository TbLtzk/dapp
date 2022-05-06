export const constUpdate = {
  subtitle: 'Constitution Updates change the underlying agreement upon which the Q system operates.',
  classificationTitle: 'Which part of the Constitution is affected',
  classificationValues: ['fundamental-part', 'basic-part', 'detailed-part'],
  classificationLabels: [
    'Fundamental Part \t| Preamble',
    'Basic Part \t\t\t| Main Body and Definitions',
    'Detailed Part \t\t| Selected Appendices'
  ],
  inputTitle: ['Please provide the new constitution Hash', 'Provide a reference link to external source'],
  inputs: ['Hash', 'External Link'],
  inputsObj: { hash: '', 'external-link': '' },
  radioBtnDownTitle: 'Does Your Proposal include a Change of a Constitution Parameter?',
  radioBtnDownName: 'change-constitution-parameter',
  radioBtnDown: ['No', 'Yes']
};
export const generalUpdate = {
  subtitle: 'General Q Updates gather the Community voice on ideas how to shape Q in the future.',
  inputTitle: 'Proposal Description',
  inputTitleDescr: ['Provide a reference link to external source'],
  inputs: ['External Link'],
  inputsObj: { 'external-link': '' }
};
export const emergencyUpdate = {
  subtitle: 'Emergency Updates enable Root Nodes to agree on an immediate update for the Q system.'
};
