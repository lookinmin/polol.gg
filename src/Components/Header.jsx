import React from "react";
import {
  Link,
  NavLink
} from "react-router-dom";
import "./CSS/HeaderCSS.css"

export const Header = () => {
  return (
    <div className="TOP">
      <nav className="navbar navbar-expand-lg navbar-light bg-light red">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">POLOL.GG</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <NavLink className="nav-link" activeClassName="active" to="/predict" title="경기 결과 예측">AI PREDICT</NavLink>
              <NavLink className="nav-link" activeClassName="active" to="/table" title="팀 순위">RANK</NavLink>
              <NavLink className="nav-link" activeClassName="active" to="/team" title="팀 별 정보">TEAM</NavLink>
              <NavLink className="nav-link" activeClassName="active" to="/players" title="선수 별 정보">PLAYERS</NavLink>
            </div>
          </div>
        </div>
      </nav>
    </div>
    
  )
}