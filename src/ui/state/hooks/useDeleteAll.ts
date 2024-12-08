import { Dispatch } from "react";
import { Action } from "..";
import { removeAllReservations } from "../../../database";

export function useDeleteAll(dispatch: Dispatch<Action>) {
  return async () => {
    removeAllReservations();
    dispatch({ type: "RESET" });
  };
}
