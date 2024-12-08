import { CSSProperties, useCallback, useEffect, useState } from "react";
import { sampleRequest } from "../database/sampleRequest";
import {
  processRequest,
  shuffleReservationSeats,
} from "../seatingUtils/seatingUtils";
import { Reservation } from "../types";
import {
  getReservationByConfirmationCode,
  removeAllReservations,
  addReservation,
  updateReservation,
} from "../database";

import "./App.css";
import { ReservationDetails } from "./components/ReservationDetails";
import { useSearchParams } from "react-router";
import { Confirmation_Code_Key } from "../constants";

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
  const [reservation, setReservation] = useState<Reservation | null>(null);
  const [insertedCode, setInsertedCode] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isRetrieving, setIsRetrieving] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSubmit = async () => {
    setMessage("");

    const processedRequest = processRequest(sampleRequest);

    await addReservation(processedRequest);
    setReservation(processedRequest);
  };

  const retrieveReservation = useCallback(
    async (code: string) => {
      setSearchParams({ [Confirmation_Code_Key]: code });

      setMessage("");
      setIsRetrieving(true);

      const reservation = await getReservationByConfirmationCode(code);
      // Faking a delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (reservation) {
        setReservation(reservation);
      } else {
        setMessage("Reservation not found");
        setReservation(null);
      }

      setIsRetrieving(false);
    },
    [setSearchParams]
  );

  const handleShuffleSeats = async (reservation: Reservation) => {
    const shuffledReservation = shuffleReservationSeats(reservation);
    await updateReservation(shuffledReservation);

    setReservation(shuffledReservation);
  };

  const handleDeleteAll = () => {
    removeAllReservations();
    setReservation(null);
  };

  useEffect(() => {
    const urlCode = searchParams.get(Confirmation_Code_Key);

    if (urlCode) {
      setInsertedCode(urlCode);
      retrieveReservation(urlCode);
    }
  }, [searchParams, retrieveReservation]);

  return (
    <div className="App">
      <div className="App-header">
        <div style={headerStyle}>
          {reservation ? (
            <input
              type="submit"
              value="Shuffle seats"
              onClick={() => handleShuffleSeats(reservation)}
            />
          ) : (
            <input type="submit" value="Generate" onClick={handleSubmit} />
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              retrieveReservation(insertedCode);
            }}
          >
            <input
              required
              type="text"
              value={insertedCode}
              placeholder="Enter confirmation code"
              onChange={(e) => setInsertedCode(e.target.value)}
            />

            <input
              type="submit"
              value="Retrieve"
              disabled={isRetrieving || !insertedCode}
            />
          </form>
        </div>
        {isRetrieving && <h6>Retrieving...</h6>}
        {message && <h6>{message}</h6>}

        <input
          style={deleteAllButtonStyle}
          type="submit"
          value="Delete all reservations"
          onClick={handleDeleteAll}
        />

        {!isRetrieving && reservation && (
          <ReservationDetails reservation={reservation} />
        )}
      </div>
    </div>
  );
}
