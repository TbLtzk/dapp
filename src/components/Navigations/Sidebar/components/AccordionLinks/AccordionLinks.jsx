import React, { useState } from "react";
import { Accordion } from "react-bootstrap";
import { AccordionIcon, LinkGroup } from "../../styles";

function AccordionLinks({ children, headerLink, openLink, open}) {
    const [isOpen, setIsOpen] = useState(open);

    const handleOpen = (state) => {
        openLink(isOpen);
        if (state) {
            setIsOpen(true);
        } else {
            setIsOpen(false);
        }
    };
    return (
        <Accordion activeKey={isOpen ? '0' : '1'} style={{ width: "100%" }} onSelect={handleOpen}>
            <LinkGroup>
                {headerLink}
                <Accordion.Toggle eventKey='0'>
                    <AccordionIcon state={isOpen}>
                        <i className="mdi mdi-chevron-down" />
                    </AccordionIcon>
                </Accordion.Toggle>
            </LinkGroup>
            <Accordion.Collapse eventKey='0'>{children}</Accordion.Collapse>
        </Accordion>
    );
}

AccordionLinks.defaultProps = {
    open: true,
    openLink: () => {},
};

export default AccordionLinks;
