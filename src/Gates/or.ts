import { PINTYPE } from "../components/Enums";
import { SPin } from "../components/SPin";
import { circuit } from "./circuit";

export class or extends circuit {
  public Pins: { [key: string]: SPin };
  constructor() {
    super({
      A: new SPin("A", PINTYPE.KIRISH),
      B: new SPin("B", PINTYPE.KIRISH),
      C: new SPin("C", PINTYPE.CHIQISH),
    });
  }
  Exec() {
    this.Pins["C"].Write(this.Pins["A"].state || this.Pins["B"].state);
  }
}