import { HTMLAttributes, ReactNode, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import Button from 'ui/Button';
import Icon from 'ui/Icon';

import useOnScreen from 'hooks/useOnScreen';

import { PageLayoutContainer } from './styles';

import { toTitleCase } from 'utils/useful';

interface Props extends HTMLAttributes<HTMLDivElement> {
  title: string,
  titleExtra?: ReactNode,
  action?: ReactNode,
}

function PageLayout ({
  title,
  titleExtra,
  action,
  children,
  ...rest
}: Props) {
  const { t } = useTranslation();

  const titleRef = useRef<HTMLDivElement>(null);
  const isTitleVisible = useOnScreen(titleRef);

  useEffect(() => {
    const documentTitle = title === 'Dashboard'
      ? 'Your HQ'
      : `${toTitleCase(title)} | Your HQ`;
    document.title = documentTitle;
  }, [toTitleCase]);

  return (
    <PageLayoutContainer {...rest}>
      <div className="page-title-wrp">
        <h1
          ref={titleRef}
          className="page-title text-h1"
        >
          <span>{t(title)}</span>
          {titleExtra}
        </h1>

        <div className="page-title-actions">{action}</div>
      </div>

      <div className="page-content">{children}</div>

      <Button
        icon
        alwaysEnabled
        look="primary"
        className="page-top-btn"
        style={{ right: isTitleVisible ? '-50px' : '' }}
        onClick={() => titleRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
      >
        <Icon name="expand-less" />
      </Button>
    </PageLayoutContainer>
  );
}

export default PageLayout;
