import { uid } from "uid";
import {
  Gender,
  Guest,
  Reservation,
  ReservationRequest,
  SeatingType,
  Table,
} from "../types";

const DEFAULT_SEATING_TYPE = SeatingType.nonTraditional;
const TABLE_CAPACITY = 6;

export function processRequest(request: ReservationRequest): Reservation {
  if (request.seatingType !== DEFAULT_SEATING_TYPE) {
    throw new Error("Seating type not supported yet!");
  }

  return {
    id: uid(),
    requestId: request.id,
    confirmationCode: uid(),
    seatingType: request.seatingType,
    tables: allocateTablesForGuests(request.guests),
  };
}

export function shuffleReservationSeats(reservation: Reservation): Reservation {
  return {
    ...reservation,
    tables: allocateTablesForGuests(
      reservation.tables.flatMap((x) => x.seats.map((y) => y.guest))
    ),
  };
}

// This function is oversimplified since this app only need to support the provided sample data
function allocateTablesForGuests(guests: Array<Guest>): Array<Table> {
  const tables = prepareTables(guests.length);

  const femaleGuests = guests.filter((x) => x.gender === Gender.female);
  tables.forEach((table) => {
    let seatCounter = 1;
    while (seatCounter <= TABLE_CAPACITY / 2) {
      const unseatedFemaleGuests = getUnseatedGuests(femaleGuests, tables);
      const randomUnseatedFemaleGuest = pickRandomItem(unseatedFemaleGuests)!;

      table.seats.push({
        guest: randomUnseatedFemaleGuest,
        number: seatCounter,
      });

      const partner = guests.find(
        (x) => x.id === randomUnseatedFemaleGuest!.partnerId
      )!;
      table.seats.push({
        guest: partner,
        number: seatCounter + 3, // The seat in front
      });

      seatCounter++;
    }
  });

  return tables;
}

function prepareTables(guestCount: number): Array<Table> {
  const tables = new Array<Table>();
  const neededTables = Math.ceil(guestCount / TABLE_CAPACITY);

  for (let i = 0; i < neededTables; i++) {
    const table: Table = {
      id: `table-${i + 1}`,
      capacity: TABLE_CAPACITY,
      seats: new Array(),
    };

    tables.push(table);
  }

  return tables;
}

function pickRandomItem<T>(items: Array<T>): T {
  return items[Math.floor(Math.random() * items.length)];
}

function getUnseatedGuests(
  guests: Array<Guest>,
  tables: Array<Table>
): Array<Guest> {
  const seatedGuestIds = new Set(
    tables.flatMap((table) => table.seats.map((seat) => seat.guest.id))
  );
  return guests.filter((guest) => !seatedGuestIds.has(guest.id));
}
