import LogoImg from 'components/Base/LogoImg'
import { LOAD_TYPES } from 'constants/statuses'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { loadTypeSelector } from 'store/user-inf/selectors'
import Address from './components/Address'
import ConnectButtons from './components/ConnectButtons'
import Network from './components/Network'
import { WrapLogo, HeaderWrapper, ElementsWrapper } from './styles'

function Header () {
  const loadType = useSelector(loadTypeSelector)

  return (
        <HeaderWrapper>
            <WrapLogo>
                <Link to="/">
                    <LogoImg />
                </Link>
            </WrapLogo>
            <ElementsWrapper>
                <Network />
                <ConnectButtons />
                {loadType === LOAD_TYPES.loaded ? <Address /> : null}
            </ElementsWrapper>
        </HeaderWrapper>
  )
}

export default React.memo(Header)
