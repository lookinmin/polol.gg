import React from "react";
import { useState } from "react";
import "./CSS/CirCleTable.css";

export const CircleTable = () => {
  return (
    <>
      <div className="menu">
        <input type="checkbox" id="toggle" />
        <label id="show-menu" for="toggle">
          <div className="btn">
            <i className="material-icons md-36 toggleBtn menuBtn">menu</i>
            <i className="material-icons md-36 toggleBtn closeBtn">close</i>
          </div>
          <div className="btn">
            <i className="material-icons md-36">1</i>
          </div>
          <div className="btn">
            <i className="material-icons md-36">2</i>
          </div>
          <div className="btn">
            <i className="material-icons md-36">3</i>
          </div>
          <div className="btn">
            <i className="material-icons md-36">4</i>
          </div>
          <div className="btn">
            <i className="material-icons md-36">5</i>
          </div>
          <div className="btn">
            <i className="material-icons md-36">6</i>
          </div>
          <div className="btn">
            <i className="material-icons md-36">7</i>
          </div>
          <div className="btn">
            <i className="material-icons md-36">8</i>
          </div>
          <div className="btn">
            <i className="material-icons md-36">9</i>
          </div>
          <div className="btn">
            <i className="material-icons md-36">10</i>
          </div>
        </label>
      </div>
    </>
  );
};