import { CSSProperties } from "react";
import { Table } from "../../../types";
import { ReservationTable } from "./ReservationTable";

const style: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 100,
};

type Props = {
  items: Array<Table>;
};

export function Tables({ items }: Props) {
  return (
    <div style={style}>
      {items.map((table, index) => (
        <ReservationTable key={table.id} number={index + 1} table={table} />
      ))}
    </div>
  );
}
