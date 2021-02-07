import React, { useMemo, useEffect, useState } from "react";
import { useTable, useSortBy } from "react-table";
import { COLUMNS } from "./columns";
import "./DataTable.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { TableContainer } from "@material-ui/core";
import SortUpIcon from "./Icons/SortUp.js";
import SortDownIcon from "./Icons/SortDown.js";
import ReactToExcel from "react-html-table-to-excel";
import SaveIcon from "@material-ui/icons/Save";
import RestoreIcon from "@material-ui/icons/Restore";
import Button from "@material-ui/core/Button";

export default function DataTable({ data, title }) {
  const newData = data;
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

  function handleReset() {
    alert("Clicked reset button");
  }

  function handleSave() {
    if (localStorage.getItem(title) != null) {
      localStorage.removeItem(title);
    }
    localStorage.setItem(title, JSON.stringify(newData));
    alert("clicked save button");
    console.dir(localStorage.getItem(title));
  }

  function reOrder(newData, before, after) {
    if (before < after) {
      const original = newData[before];
      for (let i = before; i < after; i++) {
        newData[i] = newData[i + 1];
      }
      newData[after] = original;
    } else {
      //  after > before
      const original = newData[before];
      for (let i = after; i > before; i--) {
        newData[i] = newData[i - 1];
      }
      newData[after] = original;
    }
  }

  function renderSavedTable() {}

  function renderNewDataTable(paramData) {
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
            reOrder(newData, srcIdx, desIdx);
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
                              column.Header == "Name"
                                ? "sticky-column"
                                : "column"
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
                              {column.canFilter
                                ? column.render("Filter")
                                : null}
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
          <Button
            className="save-btn"
            color="primary"
            startIcon={<SaveIcon />}
            variant="contained"
            onClick={handleSave}
          >
            Save
          </Button>
          <Button
            className="reset-btn"
            color="secondary"
            startIcon={<RestoreIcon />}
            variant="contained"
            onClick={handleReset}
          >
            Restore
          </Button>
        </div>
      </>
    );
  }
  return localStorage.getItem(title) == null
    ? renderNewDataTable(data)
    : renderNewDataTable(newData);
}
