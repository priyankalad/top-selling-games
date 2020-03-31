import React from "react";
import { Link } from "react-router-dom";

export default function TableBody({ data }) {
  let rows = [];
  if (data.length > 0) {
    data.forEach((d, i) => {
      let row = (
        <tr key={i}>
          <th scope="row">{d["Rank"]}</th>
          <td>
            <Link className="btn btn-link" to={`/game/${d.Rank}`}>
              {d["Name"]}
            </Link>
          </td>
          <td>{d["Year"]}</td>
        </tr>
      );
      rows.push(row);
    });
  }
  return <tbody>{rows}</tbody>;
}
