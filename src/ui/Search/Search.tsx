import { HTMLAttributes } from 'react';

import { useWeb3Context } from 'context/Web3ContextProvider';

import Button from 'ui/Button';
import Icon from 'ui/Icon';

import { SearchContainer } from './styles';

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
  const { isConnected, isRightNetwork } = useWeb3Context();
  const isDisabled = disabled || !isConnected || !isRightNetwork;

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
