import React from 'react'

import InstructionMetamask from 'pages/StartConfigurations/InstructionMetamask'

import StartConfigurationStyleLayout from 'components/Base/StartConfigurationStyleLayout'
import { WrapContainer } from './styles'
import { useSelector } from 'react-redux'
import { loadTypeSelector, networkSelector } from 'store/user-inf/selectors'
import { LOAD_TYPES } from 'constants/statuses'
import { Redirect } from 'react-router'
import { networks } from 'constants/config'

const titles = {
  [LOAD_TYPES.notInstalled]: 'Metamask not installed',
  [LOAD_TYPES.wrongNetwork]: 'Wrong network',
  [LOAD_TYPES.notLogged]: 'PLease, login'
}

function StartConfigurations () {
  const network = useSelector(networkSelector)
  const loadType = useSelector(loadTypeSelector)
  const title = titles[loadType]

  if (networks[network]) {
    return <Redirect to="/" />
  }
  return (
        <StartConfigurationStyleLayout>
            <WrapContainer>
                <h3>{title}</h3>
                <InstructionMetamask />
            </WrapContainer>
        </StartConfigurationStyleLayout>
  )
}

export default StartConfigurations
