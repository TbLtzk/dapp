import { ReactNode, useEffect, useRef } from 'react';

import Alert from 'components/Custom/Alerts';

import useOnScreen from 'hooks/useOnScreen';

import { PageTitleActions, PageTitleName, PageTitleWrp, ToTopContainer, WrapContainer, WrapContent } from './styles';

import { toTitleCase } from 'func/useful';

interface Props {
  headerTitle: string,
  titleExtra?: ReactNode,
  headerExtra?: ReactNode,
  wrapContentClasses?: string,
  children: ReactNode,
}

function PageWrap ({
  headerTitle,
  titleExtra = null,
  headerExtra = null,
  wrapContentClasses = '',
  children,
}: Props) {
  const titleRef = useRef<HTMLElement>();
  const isVisible = useOnScreen(titleRef);

  useEffect(() => {
    const title = headerTitle === 'Dashboard'
      ? 'Your HQ'
      : 'Your HQ - ' + toTitleCase(headerTitle);
    document.title = title;
  }, [toTitleCase]);

  return (
    <WrapContainer fluid>
      <PageTitleWrp>
        <PageTitleName ref={titleRef}>
          <span>{headerTitle}</span>
          {titleExtra}
        </PageTitleName>

        <PageTitleActions>{headerExtra}</PageTitleActions>
        <Alert />
      </PageTitleWrp>

      <WrapContent className={wrapContentClasses}>{children}</WrapContent>
      <ToTopContainer isVisible={isVisible}>
        <i
          className="mdi mdi-arrow-up-bold-box"
          onClick={() => titleRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
        />
      </ToTopContainer>
    </WrapContainer>
  );
}

export default PageWrap;
