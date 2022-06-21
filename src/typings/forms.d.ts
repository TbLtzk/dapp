import { ParameterType } from '@q-dev/q-js-sdk';

interface ConstitutionFormParameter {
  type: ParameterType
  key: string
  value: string
}

interface CreateProposalForm {
  hash: string
  classification: string
  externalLink: string
  isParamsChanged: boolean
  params: ConstitutionFormParameter[]
}
