import { Dispatch } from "react";
import { Action } from "..";
import { updateReservation } from "../../../database";
import { shuffleReservationSeats } from "../../../seatingUtils/seatingUtils";
import { Reservation } from "../../../types";

export function useShuffleSeats(dispatch: Dispatch<Action>) {
  return async (reservation: Reservation) => {
    const shuffledReservation = shuffleReservationSeats(reservation);
    await updateReservation(shuffledReservation);

    dispatch({ type: "SET_RESERVATION", payload: shuffledReservation });
  };
}
