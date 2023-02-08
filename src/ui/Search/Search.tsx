import { HTMLAttributes } from 'react';

import Button from 'ui/Button';
import Icon from 'ui/Icon';

import { SearchContainer } from './styles';

import { useUser } from 'store/user/hooks';

import { LOAD_TYPES } from 'constants/statuses';

interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value: string;
  disabled?: boolean;
  alwaysEnabled?: boolean;
  onChange: (val: string) => void;
}

function Search ({
  value,
  disabled,
  alwaysEnabled,
  onChange,
  ...rest
}: Props) {
  const { loadType } = useUser();
  const isDisabled = disabled ||
    (!alwaysEnabled && loadType !== LOAD_TYPES.loaded);

  return (
    <SearchContainer className="search-container" $disabled={isDisabled}>
      <Icon className="search-icon" name="search" />
      <input
        className="text-md"
        value={value}
        type="search"
        autoComplete="off"
        disabled={isDisabled}
        onChange={(e) => onChange((e.target as HTMLInputElement).value)}
        {...rest}
      />

      {value && !isDisabled && (
        <Button
          icon
          className="search-reset"
          look="ghost"
          onClick={() => onChange('')}
        >
          <Icon name="cross" />
        </Button>
      )}
    </SearchContainer>
  );
};

export default Search;
