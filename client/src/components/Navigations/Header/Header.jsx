import React from "react";
import {Link} from "react-router-dom";
import {drizzleReactHooks} from "@drizzle/react-plugin";
import {useHistory} from "react-router-dom";

import {Container, Navbar, Nav} from "react-bootstrap";

import Button from "components/Base/Button"
import LogoImg from "components/Base/LogoImg"

import {navItems} from "./constants";

import {NavbarContainer, ListContainer, WrapBtn, LinkStyle} from "./styles";

const {useDrizzle, useDrizzleState} = drizzleReactHooks;

function Header() {
    const {drizzle} = useDrizzle();
    const state = useDrizzleState(state => state);
    const history = useHistory();

    // console.log('history', history.location.pathname);

    return (
        <header>
            <NavbarContainer bg="light" expand="lg">
                <Container fluid>
                    <Link to={'/'} className="navbar-brand">
                        <LogoImg/>
                    </Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <ListContainer id="basic-navbar-nav">
                        <Nav>
                            {
                                navItems.map((value, key) => {
                                    return (
                                        <Nav.Link to={'/' + value.location} key={key} href={'/' + value.location}
                                                  onClick={(e) => {
                                                      e.preventDefault();
                                                      history.push(value.location)
                                                  }}
                                                  className="nav-link"
                                                  highlight={Number(history.location.pathname === ('/' + value.location))}
                                        >
                                            {value.label}
                                        </Nav.Link>
                                    );
                                })
                            }
                            <WrapBtn>
                                <Button
                                    title={state.accounts[0] || "Connect Wallet"}
                                    disabled={state?.accounts[0]}
                                    handleButton={() => {
                                        console.log('click');
                                        window.ethereum.request({method: 'eth_requestAccounts'});
                                    }}
                                />
                            </WrapBtn>
                        </Nav>
                    </ListContainer>
                </Container>
            </NavbarContainer>
        </header>

    );
}

export default Header;

