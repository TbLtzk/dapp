import { Classification, ParameterType } from '@q-dev/q-js-sdk';

type Options<T> = {
  value: T
  label: string
}[]

interface FormParameter {
  type: ParameterType
  key: string
  value: string
}

type ExpertType = 'fees-incentives' | 'defi' | 'root-node'

interface QProposalForm {
  type: 'constitution' | 'emergency' | 'general'
  hash: string
  classification: Classification
  externalLink: string
  isParamsChanged: boolean
  params: FormParameter[]
}

interface RootNodeProposalForm {
  type: 'add-root-node' | 'remove-root-node'
  hash: string
  address: string
  externalLink: string
  isRemovingNode: boolean
}

interface SlashingProposalForm {
  type: 'root-slashing' | 'validator-slashing'
  externalLink: string
  address: string
  percent: string
}

interface ExpertProposalForm {
  type: 'add-expert' | 'remove-expert' | 'parameter-vote'
  panelType: ExpertType
  address: string
  externalLink: string
  params: FormParameter[]
}

type CreateProposalForm = QProposalForm | RootNodeProposalForm | SlashingProposalForm | ExpertProposalForm;
