import { CSSProperties, useEffect, useReducer } from "react";
import { useSearchParams } from "react-router";

import { initialState, reducer } from "./state";
import { ReservationDetails } from "./components/ReservationDetails";
import { Confirmation_Code_Key } from "../constants";
import { useDeleteAll } from "./state/hooks/useDeleteAll";
import { useReservationSubmit } from "./state/hooks/useReservationSubmit";
import { useRetrieveReservation } from "./state/hooks/useRetrieveReservation";
import { useShuffleSeats } from "./state/hooks/useShuffleSeats";

import "./App.css";

const headerStyle: CSSProperties = {
  position: "fixed",
  top: 10,
  left: 10,
  display: "flex",
  flexDirection: "column",
  gap: 10,
};

const deleteAllButtonStyle: CSSProperties = {
  position: "absolute",
  bottom: 10,
  right: 10,
};

export function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [searchParams] = useSearchParams();

  const retrieveReservation = useRetrieveReservation(dispatch);
  const handleSubmit = useReservationSubmit(dispatch);
  const handleShuffleSeats = useShuffleSeats(dispatch);
  const handleDeleteAll = useDeleteAll(dispatch);

  useEffect(() => {
    const urlCode = searchParams.get(Confirmation_Code_Key);

    if (urlCode) {
      dispatch({ type: "SET_INSERTED_CODE", payload: urlCode });
      retrieveReservation(urlCode);
    }
  }, [searchParams, retrieveReservation]);

  return (
    <div className="App">
      <div className="App-header">
        <div style={headerStyle}>
          {state.reservation ? (
            <input
              type="submit"
              value="Shuffle seats"
              onClick={() => handleShuffleSeats(state.reservation!)}
            />
          ) : (
            <input type="submit" value="Generate" onClick={handleSubmit} />
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              retrieveReservation(state.insertedCode);
            }}
          >
            <input
              required
              type="text"
              value={state.insertedCode}
              placeholder="Enter confirmation code"
              onChange={(e) =>
                dispatch({ type: "SET_INSERTED_CODE", payload: e.target.value })
              }
            />

            <input
              type="submit"
              value="Retrieve"
              disabled={state.isRetrieving || !state.insertedCode}
            />
          </form>
        </div>
        {state.isRetrieving && <h6>Retrieving...</h6>}
        {state.message && <h6>{state.message}</h6>}

        <input
          style={deleteAllButtonStyle}
          type="submit"
          value="Delete all reservations"
          onClick={handleDeleteAll}
        />

        {!state.isRetrieving && state.reservation && (
          <ReservationDetails reservation={state.reservation} />
        )}
      </div>
    </div>
  );
}
