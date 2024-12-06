import localforage from "localforage";
import { Reservation } from "../types";

const reservationsKey = "reservations";

export async function getReservationByConfirmationCode(
  confirmationCode: string,
): Promise<Reservation | null> {
  const reservations = await getReservations();
  const reservation = reservations.find(
    (x) => x.confirmationCode === confirmationCode,
  );

  return reservation || null;
}

export async function addReservation(reservation: Reservation): Promise<void> {
  const storedData = await getReservations();

  storedData.push(reservation);
  await localforage.setItem("reservations", JSON.stringify(storedData));
}

export async function updateReservation(
  reservation: Reservation,
): Promise<void> {
  const storedData = await getReservations();
  const index = storedData.findIndex(
    (x) => x.confirmationCode === reservation.confirmationCode,
  );

  storedData[index] = reservation;
  await localforage.setItem("reservations", JSON.stringify(storedData));
}

export async function removeAllReservations(): Promise<void> {
  await localforage.removeItem(reservationsKey);
}

async function getReservations(): Promise<Reservation[]> {
  const storedData = await localforage.getItem<string>(reservationsKey);
  const parsedData: Array<Reservation> =
    storedData && storedData.length ? JSON.parse(storedData) : [];

  return parsedData;
}
