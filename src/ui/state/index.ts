import { Reservation } from "../../types";

export type State = {
  insertedCode: string;
  message: string;
  isRetrieving: boolean;
  reservation?: Reservation;
};

export type Action =
  | { type: "SET_RESERVATION"; payload?: Reservation }
  | { type: "SET_INSERTED_CODE"; payload: string }
  | { type: "SET_MESSAGE"; payload: string }
  | { type: "SET_IS_RETRIEVING"; payload: boolean }
  | { type: "RESET" };

export const initialState: State = {
  reservation: undefined,
  insertedCode: "",
  message: "",
  isRetrieving: false,
};

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_RESERVATION":
      return { ...state, reservation: action.payload };
    case "SET_INSERTED_CODE":
      return { ...state, insertedCode: action.payload };
    case "SET_MESSAGE":
      return { ...state, message: action.payload };
    case "SET_IS_RETRIEVING":
      return { ...state, isRetrieving: action.payload };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}
