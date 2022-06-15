
import { TipWrapper } from './styles';

function InfoTip ({ children, ...rest }) {
  return (
    <TipWrapper {...rest}>
      <i className="mdi mdi-information" />
      {children}
    </TipWrapper>
  );
}

export default InfoTip;
