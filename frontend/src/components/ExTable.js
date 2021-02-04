import React, { useEffect, useRef, useMemo } from "react";
import { useTable, useFilters, useBlockLayout } from "react-table";
import { COLUMNS } from "./columns";
import "./DataTable.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useSticky } from "react-table-sticky";
import { Styles } from "./TableStyles";
export default function ExTable({ data, title }) {
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
    useSticky
  );
  return (
    <DragDropContext>
      <Droppable droppalbeId="droppable">
        {(provided, snapshot) => (
          <table ref={provided.innerRef} id="players" {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()}>
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <Draggable
                    key={row.id}
                    draggableId={row.id}
                    index={row.index}
                    className="draggableRow"
                  >
                    {(provided, snapshot) => (
                      <tr
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        {...row.getRowProps()}
                      >
                        {row.cells.map((cell) => {
                          return (
                            <td {...cell.getCellProps()}>
                              {cell.render("Cell")}
                            </td>
                          );
                        })}
                      </tr>
                    )}
                  </Draggable>
                );
              })}
            </tbody>
          </table>
        )}
      </Droppable>
    </DragDropContext>
  );
}
