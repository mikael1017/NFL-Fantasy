import React, { useEffect, useRef, useMemo, useState } from "react";
import {
  useTable,
  useSortBy,
  useBlockLayout,
  useGlobalFilter,
  useRowSelect,
} from "react-table";
import { useSticky } from "react-table-sticky";
import { COLUMNS } from "./columns";
import { Styles } from "./TableStyles";
import SortUpIcon from "./Icons/SortUp.js";
import SortDownIcon from "./Icons/SortDown.js";
import { GlobalFilter } from "./GlobalFilter";
import "./table.css";
import { Checkbox } from "./Checkbox.js";
import Button from "@material-ui/core/Button";

export default function DraftTable({ data, title }) {
  const columns = useMemo(() => COLUMNS, []);
  const [isSelected, setSelected] = useState(false);
  const [selectedRow, setSelectedRow] = useState();

  //    called when checkbox is clicked
  //    update variable isSelected where it stores if row is stored or not
  function handleSelect(e) {
    setSelected(e.target.checked);
    setSelectedRow(
      JSON.stringify(
        {
          selectedFlatRows: selectedFlatRows.map((row) => row.original),
        },
        null,
        2
      )
    );
    console.dir(selectedRow);
  }

  function handleSelectedRow(e) {
    selectedFlatRows.map((row) => row.original);
  }
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
    selectedFlatRows,
  } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSticky,
    useSortBy,
    useBlockLayout,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => {
        return [
          {
            accessor: "selection",
            sticky: "left",
            Header: ({ getToggleAllRowsSelectedProps }) => (
              <Checkbox {...getToggleAllRowsSelectedProps()} />
            ),
            Cell: ({ row }) => (
              <Checkbox
                onClick={handleSelect}
                className="check-column"
                {...row.getToggleRowSelectedProps()}
              />
            ),
          },
          ...columns,
        ];
      });
    }
  );

  const { globalFilter } = state;
  return (
    <>
      <div id="table-container">
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
      <div className="draft-btn">
        <Button
          color="primary"
          // startIcon={<SaveIcon />}
          variant="contained"
        >
          Draft
        </Button>
      </div>
      <pre>
        <code>
          {console.log(selectedFlatRows.map((row) => row.original))}
          {JSON.stringify(
            {
              selectedFlatRows: selectedFlatRows.map((row) => row.original),
            },
            null,
            2
          )}
        </code>
      </pre>
    </>
  );
}
