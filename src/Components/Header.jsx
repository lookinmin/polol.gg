import React, { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import "./CSS/HeaderCSS.css";
import axios from "axios";
import { cheerio } from "cheerio";

export const Header = () => {
  const [tmp, setTmp] = "";

  return (
    <div className="TOP">
            {tmp}
      <nav className="navbar navbar-expand-lg navbar-light bg-light red">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            KILL.GG
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <NavLink
                className="nav-link"
                activeClassName="active"
                to="/tournament"
                title="경기 결과 예측"
              >
                TOURNAMENT
              </NavLink>
              <NavLink
                className="nav-link"
                activeClassName="active"
                to="/table"
                title="팀 순위"
              >
                RANK
              </NavLink>
              <NavLink
                className="nav-link"
                activeClassName="active"
                to="/team"
                title="팀 별 정보"
              >
                TEAM
              </NavLink>
              <NavLink
                className="nav-link"
                activeClassName="active"
                to="/players"
                title="선수 별 정보"
              >
                PLAYERS
              </NavLink>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};
