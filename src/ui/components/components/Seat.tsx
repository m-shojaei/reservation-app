import { Guest } from "../../../types";

const styles: React.CSSProperties = {
  fontSize: 16,
  background: "black",
  border: "3px solid black",
  padding: 16,
};

type Props = {
  guest: Guest;
};

export function Seat({ guest }: Props) {
  return <div style={styles}>{guest.name}</div>;
}
