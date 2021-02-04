import React, { useMemo } from "react";
import { useTable, useSortBy } from "react-table";
import { COLUMNS } from "./columns";
import "./DataTable.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { TableContainer } from "@material-ui/core";
import SortUpIcon from "./Icons/SortUp.js";
import SortDownIcon from "./Icons/SortDown.js";
import ReactToExcel from "react-html-table-to-excel";

export default function DataTable({ data, title }) {
  const columns = useMemo(() => COLUMNS, []);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
    },
    useSortBy
  );
  return (
    <>
      <div className="title">{title} </div>

      <DragDropContext
        onDragEnd={(param) => {
          if (!param.destination) {
            return;
          }
          const srcIdx = param.source.index;
          const desIdx = param.destination.index;
          rows.splice(desIdx, 0, rows.splice(srcIdx, 1)[0]);
        }}
      >
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <TableContainer
              style={{ maxHeight: 500, maxWidth: 800 }}
              className="table-container"
            >
              <table
                ref={provided.innerRef}
                id={"players" + title}
                {...getTableProps()}
              >
                <thead>
                  {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column) => (
                        <th
                          {...column.getHeaderProps(
                            column.getSortByToggleProps()
                          )}
                          className={
                            column.Header == "Name" ? "sticky-column" : "column"
                          }
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
                            {column.canFilter ? column.render("Filter") : null}
                          </div>
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                  {rows.map((row, i) => {
                    prepareRow(row);
                    return (
                      <Draggable
                        key={row.id}
                        draggableId={row.id}
                        index={i}
                        className="draggableRow"
                      >
                        {(provided, snapshot) => (
                          <tr
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            {...row.getRowProps()}
                            style={{
                              ...provided.draggableProps.style,
                              boxShadow: snapshot.isDragging
                                ? "0 0 .4rem #666"
                                : "none",
                            }}
                          >
                            {row.cells.map((cell) => {
                              return (
                                <td
                                  className={
                                    cell.column.Header == "Name"
                                      ? "sticky-cell"
                                      : "cells"
                                  }
                                  {...cell.getCellProps()}
                                >
                                  {cell.render("Cell")}
                                </td>
                              );
                            })}
                          </tr>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </tbody>
              </table>
            </TableContainer>
          )}
        </Droppable>
      </DragDropContext>
      <div>
        <ReactToExcel
          className="export-btn"
          table={"players" + title}
          filename={"NFL_Fantasy_Table (" + title + ")"}
          sheet="sheet 1"
          buttonText="Download as XLS"
        />
      </div>
    </>
  );
}
