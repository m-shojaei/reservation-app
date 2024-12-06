export type ReservationRequest = {
  id: number;
  tableCount: number;
  guests: Array<Guest>;
  seatingType: SeatingType;
};

export type Reservation = {
  id: string;
  requestId: number;
  tables: Array<Table>;
  seatingType: SeatingType;
  confirmationCode: string;
};

export enum SeatingType {
  random = "random",
  alternate = "alternate",
  traditional = "traditional",
  nonTraditional = "non-traditional",
}

export type Guest = {
  id: number;
  name: string;
  gender: Gender;
  partnerId: number;
};

export enum Gender {
  male = "male",
  female = "female",
}

export type Table = {
  id: string;
  capacity: number;
  seats: Array<Seat>;
};

export type Seat = {
  guest: Guest;
  number: number;
};
