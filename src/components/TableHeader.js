import React from "react";

export default function TableHeader({ headers, sortBy, handleYearSorting }) {
  return (
    <>
      <thead>
        <tr>
          {headers.map((header, index) => {
            if (header.toLowerCase() == "year")
              return (
                <th
                  key={index}
                  onClick={handleYearSorting}
                  style={{ cursor: "pointer" }}
                >
                  {header}
                  {sortBy == "asc" ? (
                    <span role="img" aria-label="" className="ml-2">
                      🔼
                    </span>
                  ) : (
                    <span role="img" aria-label="" className="ml-2">
                      🔽
                    </span>
                  )}
                </th>
              );
            return <th key={index}>{header}</th>;
          })}
        </tr>
      </thead>
    </>
  );
}
