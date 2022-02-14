import React from "react";
import { Table } from "react-bootstrap";
import "./Champions.css";
import axios from "axios";
import { useEffect } from "react";

export const TeamRank = () => {
  useEffect(() => {
    const callApi = async () => {
      const res = await axios.get("http://localhost:3002/");
    };

    callApi();
  });
  return (
    <div className="finalRank">
      <h2 id="finalResult">LCK 2022 Spring 최종 순위 예측</h2>
      <Table striped bordered hover className="tbRanked">
        <thead>
          <tr className="tabHead">
            <th className="ranking">RANK</th>
            <th className="teamN">TEAM NAME</th>
          </tr>
        </thead>
        <tbody></tbody>
      </Table>
    </div>
  );
};
