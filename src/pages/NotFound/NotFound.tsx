import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import Button from 'components/Button';

import { NotFoundContainer } from './styles';

interface Props {
  title?: string;
}
function NotFound ({ title }: Props) {
  const { t } = useTranslation();
  return (
    <NotFoundContainer>
      <p className="text-xl font-semibold">
        {title || t('PAGE_DOES_NOT_EXIST')}
      </p>

      <Link to="/">
        <Button
          block
          alwaysEnabled
        >
          <i className="mdi mdi-home" />
          <span>{t('HOME')}</span>
        </Button>
      </Link>
    </NotFoundContainer>
  );
}

export default NotFound;
