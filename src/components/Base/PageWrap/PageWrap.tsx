import { ReactNode, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import Alert from 'components/Custom/Alerts';

import useOnScreen from 'hooks/useOnScreen';

import { PageTitleActions, PageTitleName, PageTitleWrp, ToTopContainer, WrapContainer, WrapContent } from './styles';

import { toTitleCase } from 'func/useful';

interface Props {
  pageHeader: string,
  pageTooltip?: ReactNode,
  pageButton?: ReactNode,
  wrapContentClasses?: string,
  children: ReactNode,
}

function PageWrap ({
  pageHeader,
  pageTooltip = null,
  pageButton = null,
  wrapContentClasses = '',
  children,
}: Props) {
  const { t } = useTranslation();

  const titleRef = useRef<HTMLDivElement>(null);
  const isVisible = useOnScreen(titleRef);

  useEffect(() => {
    const title = pageHeader === 'Dashboard'
      ? 'Your HQ'
      : 'Your HQ - ' + toTitleCase(pageHeader);
    document.title = title;
  }, [toTitleCase]);

  return (
    <WrapContainer fluid>
      <PageTitleWrp>
        <PageTitleName ref={titleRef}>
          <span>{t(pageHeader)}</span>
          {pageTooltip}
        </PageTitleName>

        <PageTitleActions>{pageButton}</PageTitleActions>
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
