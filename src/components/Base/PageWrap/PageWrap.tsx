import { ReactNode, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import Alert from 'components/Custom/Alerts';

import useOnScreen from 'hooks/useOnScreen';

import { PageWrapContainer, ToTopContainer } from './styles';

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
    <PageWrapContainer>
      <div className="page-title-wrp">
        <h1
          ref={titleRef}
          className="page-title text-h1"
        >
          <span>{t(pageHeader)}</span>
          {pageTooltip}
        </h1>

        <div className="page-title-actions">{pageButton}</div>
        <Alert />
      </div>

      <div className={`page-content ${wrapContentClasses}`}>
        {children}
      </div>

      <ToTopContainer isVisible={isVisible}>
        <i
          className="mdi mdi-arrow-up-bold-box"
          onClick={() => titleRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
        />
      </ToTopContainer>
    </PageWrapContainer>
  );
}

export default PageWrap;
