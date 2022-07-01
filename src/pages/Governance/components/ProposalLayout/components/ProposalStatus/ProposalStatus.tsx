import { StyledStatus } from './styles';

function ProposalStatus ({ status }: { status: string }) {
  return (
    <StyledStatus className={`list-card__status ${status.toLowerCase()}`}>
      {status}
    </StyledStatus>
  );
}

export default ProposalStatus;
