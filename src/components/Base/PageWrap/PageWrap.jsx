import React, { useEffect, useRef } from 'react';

import PageTitle from 'components/Navigations/PageTitle';

import useOnScreen from 'hooks/useOnScreen';

import { ToTopContainer, WrapContainer, WrapContent } from './styles';

import { toTitleCase } from 'func/useful';

function PageWrap ({ children, headerTitle, headerExtra, wrapContentClasses }) {
  useEffect(() => {
    const title = headerTitle === 'Dashboard' ? 'Your HQ' : 'Your HQ - ' + toTitleCase(headerTitle);
    document.title = title;
  }, [toTitleCase]);

  const myRef = useRef();
  const isVisible = useOnScreen(myRef);

  return (
    <WrapContainer fluid>
      <PageTitle
        ref={myRef}
        header={headerTitle}
        extra={headerExtra}
      />
      <WrapContent className={wrapContentClasses}>{children}</WrapContent>
      <ToTopContainer isVisible={isVisible}>
        <i
          className="mdi mdi-arrow-up-bold-box"
          onClick={() => myRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })}
        />
      </ToTopContainer>
    </WrapContainer>
  );
}

export default PageWrap;
