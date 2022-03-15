import { KUCHLANISH, PINTYPE, POSITION, TOOLTYPE } from "../components/Enums";
import { Komponent } from "../components/Komponent";
import { Pin } from "../components/Pin";

export class NOR extends Komponent {
  constructor() {
    super("OR", TOOLTYPE.OR);
    this.setPins({
      A: new Pin("A", PINTYPE.KIRISH),
      B: new Pin("B", PINTYPE.KIRISH),
      C: new Pin("C", PINTYPE.CHIQISH, POSITION.RIGHT),
    });
  }

  Fire() {
    if (!this.Pins.A.state || this.Pins.B.state) {
      this.Pins.C.Write(KUCHLANISH.YUQORI);
    } else {
      this.Pins.C.Write(KUCHLANISH.PAST);
    }
  }
}
