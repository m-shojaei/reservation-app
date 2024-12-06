import { CSSProperties } from "react";
import { Seat as SeatType } from "../../../types";
import { Seat } from "./Seat";

const styles: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

type Props = {
  seats: Array<SeatType>;
  placement: "top" | "bottom";
};

export function SeatsRow({ seats, placement }: Props) {
  // I'm usually not a fan of Non-Null Assertions,
  // but using it here since we're dealing with the sample data
  return (
    <div style={styles}>
      {placement === "top" ? (
        <>
          <Seat guest={seats.find((x) => x.number === 1)!.guest} />
          <Seat guest={seats.find((x) => x.number === 2)!.guest} />
          <Seat guest={seats.find((x) => x.number === 3)!.guest} />
        </>
      ) : (
        <>
          <Seat guest={seats.find((x) => x.number === 4)!.guest} />
          <Seat guest={seats.find((x) => x.number === 5)!.guest} />
          <Seat guest={seats.find((x) => x.number === 6)!.guest} />
        </>
      )}
    </div>
  );
}
