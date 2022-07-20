import { formatDate, formatDateRelative } from 'func/formatters';

function useEndTime (date: Date) {
  const endTimeText = date.getTime() > Date.now() ? 'Ends' : 'Ended';
  return {
    formatted: formatDate(date),
    relative: `${endTimeText} ${formatDateRelative(date)}`
  };
}

export default useEndTime;
