import React from "react";
import { Table } from "react-bootstrap";

export const TeamRank = () => {
  return (
    <Table striped bordered hover className="tbRanked">
      <thead>
        <tr className="tabHead">
          <th className="ranking">RANK</th>
          <th className="teamN">TEAM NAME</th>
          <th className="predictRate">Win Rate</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Jacob</td>
          <td>Thornton</td>
        </tr>
      </tbody>
    </Table>
  );
};
