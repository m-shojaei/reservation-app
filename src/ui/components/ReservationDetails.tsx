import { CSSProperties } from "react";
import { Reservation } from "../../types";
import { Tables } from "./components/Tables";

type Props = {
  reservation: Reservation;
};

const containerStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 16,
};

export function ReservationDetails({ reservation }: Props) {
  return (
    <div style={containerStyle}>
      <h5>Confirmation code: {reservation.confirmationCode}</h5>

      <Tables items={reservation.tables} />
    </div>
  );
}
