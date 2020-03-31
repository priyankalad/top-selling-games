import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function GameDetail(props) {
  let id = props.match.params.id;
  let [message, setMessage] = useState("");
  let [gameDetail, setGameDetail] = useState({});
  useEffect(() => {
    if (localStorage.getItem("games") == null) setMessage("No data found");
    else {
      let games = JSON.parse(localStorage.getItem("games"));
      let found = false;
      for (let i = 0; i < games.length; i++) {
        if (games[i].Rank == id) {
          found = true;
          setGameDetail(games[i]);
          break;
        }
      }
      setMessage(found ? "" : "Ooops..Game not found");
    }
  }, []);
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-12 text-danger h3">{message}</div>
      </div>
      <div className="row mb-4">
        <div className="col-12  h3 text-primary"> {gameDetail.Name}</div>
      </div>
      {Object.keys(gameDetail).map((key, index) =>
        key !== "Name" ? (
          <div key={index} className="row mt-2">
            <div className="col-2 font-weight-bold">{`${key}: `}</div>
            <div className="col-3">{gameDetail[key]}</div>
          </div>
        ) : (
          ""
        )
      )}
      <Link className="btn btn-link mt-5" to="/">
        Go to Games List
      </Link>
    </div>
  );
}
