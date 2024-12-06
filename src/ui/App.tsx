import { CSSProperties, FormEventHandler, useState } from "react";
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

  const handleSubmit = async () => {
    setMessage("");
    console.log("Generating reservation...");

    const processedRequest = processRequest(sampleRequest);

    await addReservation(processedRequest);
    setReservation(processedRequest);
  };

  const handleRetrieve: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    console.log("Retrieving reservation...");

    setMessage("");
    setIsRetrieving(true);

    const reservation = await getReservationByConfirmationCode(insertedCode);
    // Faking a delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (reservation) {
      setReservation(reservation);
    } else {
      setMessage("Reservation not found");
      setReservation(null);
    }

    setIsRetrieving(false);
  };

  const handleShuffleSeats = async (reservation: Reservation) => {
    const shuffledReservation = shuffleReservationSeats(reservation);
    await updateReservation(shuffledReservation);

    setReservation(shuffledReservation);
  };

  const handleDeleteAll = () => {
    removeAllReservations();
    setReservation(null);
  };

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

          <form onSubmit={handleRetrieve}>
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
