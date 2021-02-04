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
import "./DataTable.css";
import { Styles } from "./TableStyles";
import SortUpIcon from "./Icons/SortUp.js";
import SortDownIcon from "./Icons/SortDown.js";
import { GlobalFilter } from "./GlobalFilter";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { TableContainer } from "@material-ui/core";

export default function StickyTable({ data, title }) {
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
    useFilters,
    useGlobalFilter,
    useSticky,
    useSortBy
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
      <DragDropContext>
        <Styles>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                // style={{
                //   background: snapshot.isDraggingOver
                //     ? "lightblue"
                //     : "lightgrey",
                //   padding: 4,
                //   width: 250,
                //   minHeight: 500,
                // }}
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
                            <div className="filter">
                              {column.canFilter
                                ? column.render("Filter")
                                : null}
                            </div>
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
                      <Draggable
                        key={row.id}
                        draggableId={row.id}
                        index={row.index}
                        className="draggableRow"
                      >
                        {(provided, snapshot) => {
                          return (
                            <div
                              className="tr"
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              // style={{
                              //   userSelect: "none",
                              //   padding: 16,
                              //   margin: "0 0 8px 0",
                              //   minHeight: "50px",
                              //   backgroundColor: snapshot.isDragging
                              //     ? "#263B4A"
                              //     : "#456C86",
                              //   color: "white",
                              //   ...provided.draggableProps.style,
                              // }}
                              {...row.getRowProps()}
                            >
                              {row.cells.map((cell) => (
                                <div className="td" {...cell.getCellProps()}>
                                  {cell.render("Cell")}
                                </div>
                              ))}
                            </div>
                          );
                        }}
                      </Draggable>
                    );
                  })}
                </div>
              </div>
            )}
          </Droppable>
        </Styles>
      </DragDropContext>
    </>
  );
}
