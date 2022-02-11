import { KUCHLANISH, PINTYPE, POSITION, TOOLTYPE } from "../components/Enums";
import { Komponent } from "../components/Komponent";
import { Pin } from "../components/Pin";

export class OR extends Komponent {
  public pins = {
    A: new Pin("A", PINTYPE.KIRISH),
    B: new Pin("B", PINTYPE.KIRISH),
    C: new Pin("C", PINTYPE.CHIQISH, POSITION.RIGHT),
  };
  constructor() {
    super("OR", TOOLTYPE.OR);
    this.setPins(this.pins);
  }

  Fire() {
    if (this.pins.A.state | this.pins.B.state) {
      this.pins.C.Write(KUCHLANISH.YUQORI);
    } else {
      this.pins.C.Write(KUCHLANISH.PAST);
    }
  }
}
