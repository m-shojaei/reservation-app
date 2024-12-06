import { CSSProperties } from "react";
import { Table } from "../../../types";
import { SeatsRow } from "./SeatsRow";

const containerStyles: CSSProperties = {
  width: 600,
  display: "flex",
  flexDirection: "column",
  gap: 16,
};

const tableHeaderStyle: CSSProperties = {
  width: "100%",
  height: 120,
  border: "5px solid black",
  backgroundColor: "#664433",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

type Props = {
  number: number;
  table: Table;
};

export function ReservationTable({ number, table }: Props) {
  return (
    <div style={containerStyles}>
      <SeatsRow seats={table.seats} placement="top" />

      <div style={tableHeaderStyle}>
        <h5>Table {number}</h5>
      </div>

      <SeatsRow seats={table.seats} placement="bottom" />
    </div>
  );
}
