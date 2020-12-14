import React, {useMemo, useState} from "react";

import {Row} from "react-bootstrap";
import Button from "components/Base/Button";
import InputCheckbox from "components/Base/InputCheckbox";

import {Header, CardTitle, WrapBtnHeader, LabelStatus} from "./styles";

function ModalContent(props) {
    const {title, type} = props;
    const [stepCounter, setStepCounter] = useState(1);

    const switchProposalContentDependsOnType = useMemo(() => {
        return(
            <div>
                <p>
                    Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                    dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
                    consectetur ac, vestibulum at eros.
                </p>
                <InputCheckbox
                    name="constitutionUpdate"
                    checked={false}
                    handleChange={()=>{}}
                    label="Constitution Update"
                    value="constitutionUpdate"/>
            </div>

        )

    }, [type]);

    return (
        <>
            <h4 style={{textTransform: "capitalize"}}>{title}</h4>
            <p>Step {stepCounter} of 3</p>
            {switchProposalContentDependsOnType}
        </>
    );
}

export default ModalContent;

