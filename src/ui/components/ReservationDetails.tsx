import { CSSProperties } from "react";
import { Reservation } from "../../types";
import { Tables } from "./components/Tables";
import { Base_Name } from "../../constants";

type Props = {
  reservation: Reservation;
};

const containerStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 16,
};

export function ReservationDetails({ reservation }: Props) {
  const copyReservationUrl = () => {
    const url = `${window.location.origin}/${Base_Name}?confirmationCode=${reservation.confirmationCode}`;
    navigator.clipboard.writeText(url);
  };

  return (
    <div style={containerStyle}>
      <h5>
        Confirmation code: {reservation.confirmationCode}{" "}
        <button onClick={copyReservationUrl}>get a link</button>
      </h5>

      <Tables items={reservation.tables} />
    </div>
  );
}
