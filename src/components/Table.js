import React, { useState } from "react";
import { useSortBy, useTable } from "react-table";

export const Table = ({columns, data, filter}) => {

  const [filterInput, setFilterInput] = useState("");

  const handleFilterChange = (e) => {
    const value = e.target.value || undefined;
    setFilterInput(value);
    filter.onChange(e);
  };

  const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
    } = useTable({
      sortTypes: {
        alphanumeric: (row1, row2, columnName) => {
          const rowOneColumn = row1.values[columnName];
          const rowTwoColumn = row2.values[columnName];
          if (isNaN(rowOneColumn)) {
              return rowOneColumn.toUpperCase() >
                  rowTwoColumn.toUpperCase()
                  ? 1
                  : -1;
          }
          return Number(rowOneColumn) > Number(rowTwoColumn) ? 1 : -1;
        }
      },
      columns,
      data
    },
    useSortBy
  );
  
  return (
    <>
      <input
        value={filterInput}
        onChange={(e) => handleFilterChange(e)}
        placeholder={filter.placeholder}
      />
      {filter.searchOnClick && 
        <button
          type="button"
          onClick={filter.searchOnClick}
        >
          Buscar
        </button>
      }
      <table className="table table-bordered table-hover" {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th 
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  {...column.getHeaderProps({
                    style: { width: column.width, maxWidth: column.maxWidth, textAlign: column.textAlign, overflow: column.overflow, cursor: column.cursor } 
                  })}
                >
                  {column.render("Header")}
                  <i className={
                    column.isSorted
                    ? column.isSortedDesc
                      ? "table-icon fa fa-arrow-down"
                      : "table-icon fa fa-arrow-up"
                    : ""
                  }></i>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}