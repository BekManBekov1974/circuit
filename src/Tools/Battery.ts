import { KUCHLANISH, PINTYPE, POSITION, TOOLTYPE } from "../components/Enums";
import { Komponent } from "../components/Komponent";
import { Pin } from "../components/Pin";

export class Battery extends Komponent {
  public Pins = {
    OUT: new Pin("OUT", PINTYPE.CHIQISH, POSITION.RIGHT),
  };
  constructor() {
    super("BATT", TOOLTYPE.BATTERY);
    this.setPins(this.Pins);
    this.setSize({ width: 60, height: 30 });
  }

  setState(kuchlanish: KUCHLANISH) {
    this.Pins.OUT.Write(kuchlanish);
  }
}
