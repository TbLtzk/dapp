import { HTMLAttributes } from 'react';

import { Search as UiSearch } from '@q-dev/q-ui-kit';

import { useUser } from 'store/user/hooks';

import { LOAD_TYPES } from 'constants/statuses';

interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value: string;
  disabled?: boolean;
  onChange: (val: string) => void;
}

function Search ({
  value,
  disabled,
  onChange,
  ...rest
}: Props) {
  const { loadType } = useUser();
  const isDisabled = disabled || loadType !== LOAD_TYPES.loaded;

  return (
    <UiSearch
      value={value}
      disabled={isDisabled}
      onChange={onChange}
      {...rest}
    />
  );
};

export default Search;
