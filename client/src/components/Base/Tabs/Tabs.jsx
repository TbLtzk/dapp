import React, {useState} from "react";
import PropTypes from 'prop-types';

import TabsView from "components/Base/Tabs/TabsView";
import ButtonTabs from "components/Base/Tabs/ButtonTabs";
import BigTabsView from "components/Base/Tabs/BigTabsView";

function Tabs(props) {
    const {type} = props;

    const tabsSwitcher = () => {
        switch (type) {
            case "default" :
                return <TabsView/>;
            case "buttons" :
                return <ButtonTabs/>;
            case "big" :
                return <BigTabsView/>;
            default:
                return TabsView;
        }

    };

    return (
        tabsSwitcher()
    );
}

Tabs.propTypes = {
    tabsItems: PropTypes.array,
};

export default Tabs;

