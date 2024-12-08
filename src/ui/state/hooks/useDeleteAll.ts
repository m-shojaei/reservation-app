import { Dispatch } from "react";
import { Action } from "..";
import { removeAllReservations } from "../../../database";
import { useSearchParams } from "react-router";

export function useDeleteAll(dispatch: Dispatch<Action>) {
  const [, setSearchParams] = useSearchParams();
  return async () => {
    await removeAllReservations();
    dispatch({ type: "RESET" });

    setSearchParams({});
  };
}
