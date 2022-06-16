import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import PageTitle from 'components/Navigations/PageTitle';

import useOnScreen from 'hooks/useOnScreen';

import { ToTopContainer, WrapContainer, WrapContent } from './styles';

import { toTitleCase } from 'func/useful';

function PageWrap ({ pageHeader, pageTooltip, pageButton, wrapContentClasses, children }) {
  useEffect(() => {
    const title = pageHeader === 'Dashboard' ? 'Your HQ' : 'Your HQ - ' + toTitleCase(pageHeader);
    document.title = title;
  }, [toTitleCase]);
  const { t } = useTranslation();

  const myRef = useRef();
  const isVisible = useOnScreen(myRef);
  const header = (
    <>
      <span>{t(pageHeader)}</span>
      {pageTooltip}
    </>
  );

  return (
    <WrapContainer fluid>
      <PageTitle
        ref={myRef}
        header={header}
        extra={pageButton}
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
