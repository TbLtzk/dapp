import { Classification, ParameterType } from '@q-dev/q-js-sdk';

export type Option<T> = {
  value: T
  label: string
}
export type Options<T> = Option<T>[];
export type RadioOptions<T> = (Option<T> & { tip?: string })[]

interface FormParameter {
  type: ParameterType
  key: string
  value: string
  isNew?: boolean
}

interface FormDelegation {
  address: string
  amount: string
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
  type: 'add-root-node' | 'remove-root-node' | 'exit-root-node'
  hash: string
  address: string
  externalLink: string
}

interface SlashingProposalForm {
  type: 'root-slashing' | 'validator-slashing'
  externalLink: string
  address: string
  percent: string
  amount: string
}

interface ExpertProposalForm {
  type: 'add-expert' | 'remove-expert' | 'parameter-vote'
  panelType: ExpertType
  address: string
  externalLink: string
  params: FormParameter[]
}

type CreateProposalForm = QProposalForm | RootNodeProposalForm | SlashingProposalForm | ExpertProposalForm;
