import Buttons from './components/Buttons';
import Checks from './components/Checks';
import Colors from './components/Colors';
import Dropdowns from './components/Dropdowns';
import Icons from './components/Icons';
import Inputs from './components/Inputs';
import Menus from './components/Menus';
import Modals from './components/Modals';
import ProgressBars from './components/ProgressBars';
import Radios from './components/Radios';
import Searches from './components/Searches';
import Selects from './components/Selects';
import Switches from './components/Switches';
import Tables from './components/Tables';
import Tabs from './components/Tabs';
import Tags from './components/Tags';
import Toasts from './components/Toasts';
import Tooltips from './components/Tooltips';
import Typography from './components/Typography';
import { UiKitContainer } from './styles';

function UiKit () {
  return (
    <UiKitContainer>
      <h1 className="text-h1">UI Kit</h1>
      <Colors />
      <Icons />
      <Buttons />
      <Inputs />
      <Searches />
      <Selects />
      <Dropdowns />
      <Switches />
      <Checks />
      <Radios />
      <Toasts />
      <Typography />
      <Tooltips />
      <ProgressBars />
      <Tabs />
      <Menus />
      <Tags />
      <Modals />
      <Tables/>
    </UiKitContainer>
  );
}

export default UiKit;
