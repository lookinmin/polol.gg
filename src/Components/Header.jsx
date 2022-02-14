import { Link, NavLink } from "react-router-dom";
import "./CSS/HeaderCSS.css";
import { useMediaQuery } from "react-responsive";
import { Button } from 'react-bootstrap';
import React, {useState, useEffect} from "react";

export const Header = () => {
  const limitWidth = useMediaQuery({minWidth : 1350});
  const actWidth = useMediaQuery({maxWidth : 1349.999});

  return (
    <div className="TOP">
      <nav className="navbar navbar-expand-lg navbar-light bg-light red">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">KILL.GG</Link>
          {actWidth && 
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav">
                <NavLink className="nav-link" activeClassName="active" to="/playoff" title="플레이오프"><img src="img/playoff.png" width="35px" height="auto"></img></NavLink>
                <NavLink className="nav-link" activeClassName="active" to="/table" title="팀 순위"><img src="img/pie.png" width="35px" height="auto"></img></NavLink>
                <NavLink className="nav-link" activeClassName="active" to="/team" title="팀 별 정보"><img src="img/jigsaw.png" width="35px" height="auto"></img></NavLink>
                <NavLink className="nav-link" activeClassName="active" to="/players" title="선수 별 정보"><img src="img/group.png" width="38px" height="auto"></img></NavLink>
              </div>
          </div>
          }
          
          {limitWidth && 
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav">
                <NavLink className="nav-link" activeClassName="active" to="/playoff" title="플레이오프">Play-Off</NavLink>
                <NavLink className="nav-link" activeClassName="active" to="/table" title="팀 순위">RANK</NavLink>
                <NavLink className="nav-link" activeClassName="active" to="/team" title="팀 별 정보">TEAM</NavLink>
                <NavLink className="nav-link" activeClassName="active" to="/players" title="선수 별 정보">PLAYERS</NavLink>
              </div>
            </div>
          }
        </div>
      </nav>
    </div>
  );
};
