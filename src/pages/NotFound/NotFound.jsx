import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import Button from 'components/Base/Button';

import { NotFoundContainer } from './styles';

function NotFound () {
  const { t } = useTranslation();
  return (
    <NotFoundContainer>
      <h5>{t('PAGE_DOES_NOT_EXIST')}</h5>
      <Link to="/">
        <Button alwaysEnabled style={{ width: '100%' }}>
          <i className="mdi mdi-home" />
          <span>{t('HOME')}</span>
        </Button>
      </Link>
    </NotFoundContainer>
  );
}

export default NotFound;
