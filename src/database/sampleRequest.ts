import { Gender, ReservationRequest, SeatingType } from "../types";

export const sampleRequest: ReservationRequest = {
  id: 1,
  seatingType: SeatingType.nonTraditional,
  tableCount: 2,
  guests: [
    {
      id: 1,
      name: "Marvin Jiroudek",
      gender: Gender.male,
      partnerId: 7,
    },
    {
      id: 2,
      name: "Arnaldo Tabour",
      gender: Gender.male,
      partnerId: 8,
    },
    {
      id: 3,
      name: "Worden Rentalll",
      gender: Gender.male,
      partnerId: 9,
    },
    {
      id: 4,
      name: "Nickolaus MacNess",
      gender: Gender.male,
      partnerId: 10,
    },
    {
      id: 5,
      name: "Barnie Polkinghorne",
      gender: Gender.male,
      partnerId: 11,
    },
    {
      id: 6,
      name: "Lindsay Kneal",
      gender: Gender.male,
      partnerId: 12,
    },
    {
      id: 7,
      name: "Faustine Woolgar",
      gender: Gender.female,
      partnerId: 1,
    },
    {
      id: 8,
      name: "Genni Lythgoe",
      gender: Gender.female,
      partnerId: 2,
    },
    {
      id: 9,
      name: "Liv Hambers",
      gender: Gender.female,
      partnerId: 3,
    },
    {
      id: 10,
      name: "Dione Golden",
      gender: Gender.female,
      partnerId: 4,
    },
    {
      id: 11,
      name: "Marris Elwin",
      gender: Gender.female,
      partnerId: 5,
    },
    {
      id: 12,
      name: "Sonia Terrill",
      gender: Gender.female,
      partnerId: 6,
    },
  ],
};
