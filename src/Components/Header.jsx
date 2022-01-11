import React, { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import "./CSS/HeaderCSS.css";
import axios from "axios";
import { cheerio } from "cheerio";

export const Header = () => {
  const [tmp, setTmp] = "";

  useEffect(() => {
    const getHtml = async () => {
      try {
        return await axios.get("https://onlydev.tistory.com/102");
      } catch (error) {
        console.error(error);
      }
    };
    getHtml()
      .then((html) => {
        // axios 응답 스키마 `data`는 서버가 제공한 응답(데이터)을 받는다.
        // load()는 인자로 html 문자열을 받아 cheerio 객체 반환
        const $ = cheerio.load(html.data);
        const data = {
          mainContents: $("div.entry-content > div > p:nth-child(25)").text(),
        };
        setTmp({
          mainContents: $("div.entry-content > div > p:nth-child(25)").text(),
        });
        return data;
      })
      .then((res) => console.log("gethtml: " + res));
  });

  return (
    <div className="TOP">
            {tmp}
      <nav className="navbar navbar-expand-lg navbar-light bg-light red">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            POLOL.GG
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
                to="/predict"
                title="경기 결과 예측"
              >
                AI PREDICT
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
