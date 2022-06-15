import { useState } from 'react';

import { TabsStyle } from './styles';

function Tabs ({ tabs, additionalBlock }) {
  const [currentTab, setCurrentTab] = useState(tabs[0].id);

  const handleSetCurrentTab = (selected) => setCurrentTab(selected);

  return (
    <TabsStyle>
      <div className="tabs__titles">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`tab__title ${currentTab === tab.id ? ' active' : ''}`}
            onClick={() => handleSetCurrentTab(tab.id)}
          >
            {tab.title}
          </div>
        ))}
      </div>
      <div className="tabs__content">
        {tabs.map((tab) => (
          <div key={tab.id} className={`tab__content ${currentTab === tab.id ? 'active' : ''}`}>
            {tab.content}
          </div>
        ))}
        {additionalBlock}
      </div>
    </TabsStyle>
  );
}

export default Tabs;
