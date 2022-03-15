import { KUCHLANISH, PINTYPE, POSITION, TOOLTYPE } from "../components/Enums";
import { Komponent } from "../components/Komponent";
import { Pin } from "../components/Pin";

export class Buffer extends Komponent {
  constructor() {
    super("BUFFER", TOOLTYPE.BUFFER);
    this.setPins({
      A: new Pin("A", PINTYPE.KIRISH),
      C: new Pin("C", PINTYPE.CHIQISH, POSITION.RIGHT),
    });
    this.setSize({
      width: 60,
      height: 30,
    });
  }

  Fire() {
    if (this.Pins.A.state & this.Pins.C.state) {
      this.Pins.C.Write(KUCHLANISH.YUQORI);
    } else {
      this.Pins.C.Write(KUCHLANISH.PAST);
    }
  }
}
