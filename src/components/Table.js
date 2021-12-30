import React from "react";
import { useSortBy, useTable } from "react-table";

export const Table = ({columns, data}) => {
    const {
        getTableProps, // table props from react-table
        getTableBodyProps, // table body props from react-table
        headerGroups, // headerGroups, if your table has groupings
        rows, // rows for the table based on the data passed
        prepareRow // Prepare the row (this function needs to be called for each row before getting the row props)
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
      useSortBy,
      );
    
      return (
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
      );
}