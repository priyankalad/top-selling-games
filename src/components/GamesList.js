import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "./Pagination";
import Search from "./Search";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";

GamesList.defaultProps = {
  enablePagination: false
};

export default function GamesList({ enablePagination }) {
  const [games, setGames] = useState([]);
  let [searchList, setSearchList] = useState([]);
  let [rowsToDisplay, setRowsToDisplay] = useState([]);
  let [sortBy, setSortBy] = useState("asc");

  let headers = ["Rank", "Name", "Year"];

  useEffect(() => {
    axios
      .get("http://starlord.hackerearth.com/TopSellingGames")
      .then(res => {
        let { data } = res;
        localStorage.setItem("games", JSON.stringify(data));
        sortYears(data);
        setGames(data);
        setSearchList(data);
        setRowsToDisplay(data);
      })
      .catch(err => console.error(err));
  }, []);

  let handlePageChange = rowsToDisplay => {
    setRowsToDisplay(rowsToDisplay);
  };

  let handleYearSorting = () => {
    let updatedSortBy = sortBy === "asc" ? "desc" : "asc";
    sortYears(searchList, updatedSortBy);
    setSearchList(searchList);
    setRowsToDisplay(searchList);
    setSortBy(updatedSortBy);
  };

  let handleSearch = searchBy => {
    if (searchBy) {
      let searchVal = searchBy.toLowerCase();
      setSearchList(
        games.filter(game => {
          let gameName = game["Name"].toLowerCase();
          return gameName.includes(searchVal) || searchVal.includes(gameName);
        })
      );
    } else {
      setSearchList(games);
    }
  };

  let sortYears = (data, orderBy = "asc") => {
    data.sort((a, b) => {
      let yearA = isNaN(a.Year) ? 0 : a.Year;
      let yearB = isNaN(b.Year) ? 0 : b.Year;
      return orderBy === "asc" ? yearA - yearB : yearB - yearA;
    });
  };
  return (
    <div className="container">
      <h1 className="text-center text-primary">Top Selling Games</h1>
      <div className="row mt-3">
        <div className="col-6 d-inline-flex">
          <Search handleSearch={handleSearch} />
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-12">
          {searchList && searchList.length > 0 ? (
            <table className="table">
              <TableHeader
                headers={headers}
                sortBy={sortBy}
                handleYearSorting={handleYearSorting}
              />
              <TableBody data={rowsToDisplay} />
            </table>
          ) : (
            <p className="text-center">No data found</p>
          )}
        </div>
      </div>
      {searchList.length > 0 && enablePagination ? (
        <div className="row">
          <div className="col-12">
            <Pagination
              data={searchList}
              handlePageChange={handlePageChange}
              showPages={10}
              rowsPerPage={20}
            />
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
