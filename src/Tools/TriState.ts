import { KUCHLANISH, PINTYPE, POSITION, TOOLTYPE } from "../components/Enums";
import { Komponent } from "../components/Komponent";
import { Pin } from "../components/Pin";

export class TriState extends Komponent {
  public Pins = {
    IN: new Pin("IN", PINTYPE.KIRISH),
    IN1: new Pin("IN", PINTYPE.KIRISH, POSITION.TOP),
    OUT: new Pin("OUT", PINTYPE.CHIQISH, POSITION.RIGHT),
  };
  constructor() {
    super("TRISTATE", TOOLTYPE.TRISTATE);
    this.setPins(this.Pins);
    this.setSize({ width: 80, height: 30 });
  }
  setState(kuchlanish: KUCHLANISH) {
    this.Pins.OUT.Write(kuchlanish);
  }
}