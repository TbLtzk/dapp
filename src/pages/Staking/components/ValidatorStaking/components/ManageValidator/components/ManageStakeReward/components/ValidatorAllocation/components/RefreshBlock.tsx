import { ReactNode } from 'react';

import styled from 'styled-components';

import Button from 'ui/Button';

const StyledBlock = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

interface Props {
  title: string;
  children: ReactNode;
  onClick: () => void;
  loading:boolean;
  icon: string;
  disabled?: boolean;
}

function RefreshBlock ({ title, children, onClick, loading, icon, disabled = false }: Props) {
  return (
    <StyledBlock className="block__content">
      <div>
        <p className="color-secondary text-md">{title}</p>
        {children}
      </div>

      <Button
        icon
        disabled={disabled}
        style={{ width: '40px' }}
        loading={loading}
        onClick={onClick}
      >
        {!loading && <i className={icon} />}
      </Button>
    </StyledBlock>
  );
}

export default RefreshBlock;
