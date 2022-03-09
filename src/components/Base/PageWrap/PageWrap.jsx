import React, { useEffect, useRef } from 'react'
import PageTitle from 'components/Navigations/PageTitle'
import { ToTopContainer, WrapContainer, WrapContent } from './styles'
import { toTitleCase } from 'func/useful'
import useOnScreen from 'hooks/useOnScreen'

function PageWrap ({ children, headerTitle, headerExtra, wrapContentClasses }) {
  useEffect(() => {
    const title = headerTitle === 'Dashboard' ? 'Your HQ' : 'Your HQ - ' + toTitleCase(headerTitle)
    document.title = title
  }, [toTitleCase])

  const myRef = useRef()
  const isVisible = useOnScreen(myRef)

  return (
        <WrapContainer fluid>
            <PageTitle ref={myRef} header={headerTitle} extra={headerExtra} />
            <WrapContent className={wrapContentClasses}>{children}</WrapContent>
            <ToTopContainer isVisible={isVisible}>
                <i
                    onClick={() => myRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                    className="mdi mdi-arrow-up-bold-box btn-icon"
                />
            </ToTopContainer>
        </WrapContainer>
  )
}

export default PageWrap
