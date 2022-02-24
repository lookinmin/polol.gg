import { Link, NavLink } from "react-router-dom";
import "./CSS/HeaderCSS.css";
import { useMediaQuery } from "react-responsive";
import { Navbar, Nav, Container } from 'react-bootstrap';
import React from "react";

export const Header = () => {

  return (
    <div className="TOP">
      
    <Navbar bg="light" expand="lg">
      <Container>
        <Link className="navbar-brand" to="/">KILL.GG</Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <div className="navbar-nav">
              <NavLink className="nav-link" activeClassName="active" to="/playoff" title="플레이오프">PlayOffs</NavLink>
              <NavLink className="nav-link" activeClassName="active" to="/table" title="팀 순위">RANK</NavLink>
              <NavLink className="nav-link" activeClassName="active" to="/team" title="팀 별 정보">TEAM</NavLink>
              <NavLink className="nav-link" activeClassName="active" to="/players" title="선수 별 정보">PLAYERS</NavLink>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    
    </div>
  );
};
