import { Dispatch, useCallback } from "react";

import { Action } from "../";

import { useSearchParams } from "react-router";
import { getReservationByConfirmationCode } from "../../../database";
import { Confirmation_Code_Key } from "../../../constants";

export function useRetrieveReservation(dispatch: Dispatch<Action>) {
  const [, setSearchParams] = useSearchParams();

  return useCallback(
    async (code: string) => {
      setSearchParams({ [Confirmation_Code_Key]: code });

      dispatch({ type: "SET_MESSAGE", payload: "" });
      dispatch({ type: "SET_IS_RETRIEVING", payload: true });

      const reservation = await getReservationByConfirmationCode(code);
      // Faking a delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (reservation) {
        dispatch({ type: "SET_RESERVATION", payload: reservation });
      } else {
        dispatch({ type: "SET_MESSAGE", payload: "Reservation not found" });
        dispatch({ type: "SET_RESERVATION", payload: undefined });
      }

      dispatch({ type: "SET_IS_RETRIEVING", payload: false });
    },
    [setSearchParams]
  );
}
