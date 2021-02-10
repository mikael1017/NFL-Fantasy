import React, { useEffect, useRef, useMemo } from "react";
import {
  useTable,
  useSortBy,
  useBlockLayout,
  useFilters,
  useGlobalFilter,
} from "react-table";
import { useSticky } from "react-table-sticky";
import { COLUMNS } from "./columns";
import { Styles } from "./TableStyles";
import SortUpIcon from "./Icons/SortUp.js";
import SortDownIcon from "./Icons/SortDown.js";
import { GlobalFilter } from "./GlobalFilter";
import "./table.css";

export default function DraftTable({ data, title }) {
  const columns = useMemo(() => COLUMNS, []);

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
      data,
    },
    useGlobalFilter,
    useSticky,
    useSortBy,
    useBlockLayout
  );

  const { globalFilter } = state;
  return (
    <>
      <div className="title">{title} </div>
      <GlobalFilter
        className="global-filter"
        filter={globalFilter}
        setFilter={setGlobalFilter}
      />
      <Styles>
        <div
          id="players"
          className="table sticky"
          style={{ width: 1000, height: 500 }}
          {...getTableProps()}
        >
          <div className="header">
            {headerGroups.map((headerGroup) => (
              <div className="tr" {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <>
                    <div
                      className="th"
                      {...column.getHeaderProps(column.getSortByToggleProps())}
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
                      }
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
                  {row.cells.map((cell) => (
                    <div className="td" {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </Styles>
    </>
  );
}
