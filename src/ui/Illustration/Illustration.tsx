import { HTMLAttributes } from 'react';

import Bulb from './components/Bulb';
import EmptyList from './components/EmptyList';

type IllustrationType = 'bulb' | 'empty-list';
interface Props extends HTMLAttributes<SVGAElement> {
  type: IllustrationType
}

function Illustration ({ type, ...rest }: Props) {
  const illustrationsMap: Record<IllustrationType, JSX.Element> = {
    bulb: <Bulb {...rest} />,
    'empty-list': <EmptyList {...rest} />,
  };

  return illustrationsMap[type];
}

export default Illustration;
