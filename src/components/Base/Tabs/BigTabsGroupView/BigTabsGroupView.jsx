import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { TabsStyle, TabStyle } from './styles';

function BigTabsGroupView(props) {
  const { tabsItems, tabsHandler } = props;
  const [key, setKey] = useState(tabsItems[0]?.label);
  const [content, setContent] = useState(tabsItems[0]?.content);

  return (
    <TabsStyle
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => {
        setKey(k);
        tabsHandler(k);
      }}
    >
      {
        !tabsItems ? null :
          tabsItems.map((el, i) => {
            return (
              <TabStyle key={i} eventKey={el.label} title={el.title}>
                {key !== el.label ? <p></p> : tabsItems[0]?.content}
              </TabStyle>
            );

          })
      }
    </TabsStyle>
  );
}

BigTabsGroupView.propTypes = {
  tabsItems: PropTypes.array,
};

export default BigTabsGroupView;

