import React, { useEffect, useRef, useMemo, useState } from "react";
import {
  useTable,
  useSortBy,
  useBlockLayout,
  useGlobalFilter,
  useRowSelect,
  toggleAllRowsSelected,
} from "react-table";
import { useSticky } from "react-table-sticky";
import { COLUMNS } from "./columns";
import { Styles } from "./TableStyles";
import SortUpIcon from "./Icons/SortUp.js";
import SortDownIcon from "./Icons/SortDown.js";
import { GlobalFilter } from "./GlobalFilter";
import "./table.css";

export default function DraftTeam({ teamNumber, data }) {
  const columns = useMemo(() => COLUMNS, []);
  console.log(data);
  const [newData, setNewData] = useState();
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data: data,
    },
    useGlobalFilter,
    useSticky,
    useSortBy,
    useBlockLayout,
    useRowSelect
  );

  useEffect(() => {
    const interval = setInterval(getPlayers(teamNumber), 1000);
    console.log(data);
    console.log(newData);
  }, []);
  if (!newData) {
    return <div>not loaded {teamNumber} </div>;
  }

  function getPlayers(teamNumber) {
    fetch(`/draftapi/draft/${teamNumber}/`)
      .then((response) => {
        if (!response.ok) {
          return {};
        } else {
          return response.json();
        }
      })
      .then((data) => {
        setNewData(data);
      });
  }

  const { globalFilter } = state;

  return (
    <>
      <div id="table-container">
        <div className="title">{teamNumber} </div>
        <GlobalFilter
          className="global-filter"
          filter={globalFilter}
          setFilter={setGlobalFilter}
        />
        <Styles>
          <div
            id="players"
            className="table sticky"
            style={{ width: 300, height: 500 }}
            {...getTableProps()}
          >
            <div className="header">
              {headerGroups.map((headerGroup) => (
                <div className="tr" {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <>
                      <div
                        className="th"
                        {...column.getHeaderProps(
                          column.getSortByToggleProps()
                        )}
                      >
                        {column.render("Header")}
                        <span className="sort-icon">
                          {column.isSorted ? (
                            column.isSortedDesc ? (
                              <SortUpIcon />
                            ) : (
                              <SortDownIcon />
                            )
                          ) : (
                            ""
                          )}
                        </span>
                      </div>
                    </>
                  ))}
                </div>
              ))}
            </div>
            <div className="body" {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);

                return (
                  <div className="tr" {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <div className="td" {...cell.getCellProps()}>
                          {cell.render("Cell")}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </Styles>
      </div>
    </>
  );
}
