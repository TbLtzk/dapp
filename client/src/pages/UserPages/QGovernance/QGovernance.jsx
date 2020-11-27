import React, {useMemo, useState} from "react";
import {Row, Col} from "react-bootstrap";

import TabsView from "components/Base/Tabs/TabsView";
import ModalWindow from "components/Base/ModalWindow";
import Button from "components/Base/Button";
import QManage from "./QManage";
import QDashboard from "./QDashboard";

function QGovernance() {
    // const [modalShow, setModalShow] = useState(false);
    const tabsItems = useMemo(() => {
        return (
            [
                {
                    label: "dashboard",
                    title: "Dashboard",
                    content: <QDashboard/>
                },
                {
                    label: "manage",
                    title: "Manage",
                    content: <QManage/>
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
                {/*            <h4>Modal</h4>*/}
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

export default QGovernance;

