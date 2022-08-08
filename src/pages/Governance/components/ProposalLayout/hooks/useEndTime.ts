import { useTranslation } from 'react-i18next';

import { formatDate, formatDateRelative } from 'utils/formatters';

function useEndTime (date: Date) {
  const { t, i18n } = useTranslation();
  const endTimeText = date.getTime() > Date.now() ? t('ENDS') : t('ENDED');
  return {
    formatted: formatDate(date),
    relative: date.getTime()
      ? `${endTimeText} ${formatDateRelative(date, i18n.language)}`
      : '–',
  };
}

export default useEndTime;
