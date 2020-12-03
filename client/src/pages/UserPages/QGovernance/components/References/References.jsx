import React from "react";
import {Row, Col} from "react-bootstrap";
import {useHistory} from "react-router-dom";

import CustomBlock from "components/Base/CustomBlock";
import ButtonLinkArrow from "components/Base/ButtonLinkArrow";
import ButtonLink from "components/Base/ButtonLink";

import {arrayLinks} from "pages/UserPages/QGovernance/components/References/constants"

import {
    WrapTitleBlock, Title, WrapTitle, BlockWrap, WrapBtnView, WrapDescrLink
} from "pages/UserPages/QGovernance/components/References/styles";

function References() {
    const history = useHistory();

    return (
        <BlockWrap>
            <WrapTitleBlock>
                <WrapTitle md={7}><Title>References</Title></WrapTitle>
                <WrapBtnView md={5}>
                    <ButtonLinkArrow
                        title="View Details"
                        path="/#"
                    />
                </WrapBtnView>
            </WrapTitleBlock>
            <CustomBlock>
                <Row>
                    {arrayLinks.map((el, i) => {
                        return (
                            <WrapDescrLink md={12} key={i}>
                                <ButtonLink
                                    title={el.title}
                                    handleLink={() => history.push(el.path)}
                                />
                            </WrapDescrLink>
                        )
                    })}
                </Row>

            </CustomBlock>
        </BlockWrap>


    );
}

export default References;

