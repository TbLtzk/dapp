import React, {useMemo, useState} from "react";
import {Row, Col} from "react-bootstrap";

import TabsView from "components/Base/Tabs/TabsView";
import ModalWindow from "components/Base/ModalWindow";
import Button from "components/Base/Buttons/Button";
import Manage from "./MainTabs/Manage";
import Dashboard from "./MainTabs/Dashboard";

function TabsAuth() {
    // const [modalShow, setModalShow] = useState(false);
    const tabsItems = useMemo(() => {
        return (
            [
                {
                    label: "dashboard",
                    title: "Dashboard",
                    content: <Dashboard/>
                },
                {
                    label: "manage",
                    title: "Manage",
                    content: <Manage/>
                },
            ]
        )
    }, []);

    return (
        <Row>
            <Col xs={12}>
                <TabsView
                    tabsItems={tabsItems}
                />
                {/*<Button*/}
                {/*    title="Launch"*/}
                {/*    handleButton={() => setModalShow(true)}*/}
                {/*/>*/}
                {/*<ModalWindow*/}
                {/*    show={modalShow}*/}
                {/*    onHide={() => setModalShow(false)}*/}
                {/*    continueBtnTitle={"Confirm"}*/}
                {/*    content={*/}
                {/*        <>*/}
                {/*            <h4>QProposalS2</h4>*/}
                {/*            <p>*/}
                {/*                Cras mattis consectetur purus sit amet fermentum. Cras justo odio,*/}
                {/*                dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac*/}
                {/*                consectetur ac, vestibulum at eros.*/}
                {/*            </p>*/}

                {/*        </>*/}
                {/*    }*/}
                {/*/>*/}
            </Col>
        </Row>
    );
}

export default TabsAuth;

