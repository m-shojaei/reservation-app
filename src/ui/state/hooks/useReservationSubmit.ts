import { Dispatch } from "react";
import { Action } from "..";
import { addReservation } from "../../../database";
import { sampleRequest } from "../../../database/sampleRequest";
import { processRequest } from "../../../seatingUtils/seatingUtils";

export function useReservationSubmit(dispatch: Dispatch<Action>) {
  return async () => {
    dispatch({ type: "SET_MESSAGE", payload: "" });

    const processedRequest = processRequest(sampleRequest);

    await addReservation(processedRequest);
    dispatch({ type: "SET_RESERVATION", payload: processedRequest });
  };
}
