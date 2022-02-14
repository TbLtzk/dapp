import LogoImg from 'components/Base/LogoImg'
import React from 'react'
import { Link } from 'react-router-dom'
import Address from './components/Address'
import Network from './components/Network'
import { WrapLogo, HeaderWrapper, ElementsWrapper } from './styles'

function Header () {
  return (
        <HeaderWrapper>
            <WrapLogo>
                <Link to="/">
                    <LogoImg />
                </Link>
            </WrapLogo>
            <ElementsWrapper>
                <Network />
                <Address />
            </ElementsWrapper>
        </HeaderWrapper>
  )
}

export default React.memo(Header)
