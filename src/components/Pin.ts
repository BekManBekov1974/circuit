import { Komponent } from "./Komponent";
import { PINTYPE, QUTB, WIRESTATE, TOOLTYPE, POSITION } from "./Enums";
import { v4 as uuid } from "uuid";
import { Wire } from "./Wire";
import { XOR } from "../Tools/Xor";
import { AND } from "../Tools/And";
import { OR } from "../Tools/Or";
import { SEGMENT7 } from "../Tools/Segment7";
import { PinPayload } from "./Interfaces";
import { createEl, diffLeft } from "../utils/index";

interface CHILD {
  komponent: Komponent;
  pins: Array<Pin>;
}
interface CHILDS {
  [name: string]: CHILD;
}

export class Pin {
  private name: string = null;
  private activePin: string = null;
  public Pins: CHILDS = {}; // Shu pinga ulangan komponenta
  public PinType: PINTYPE = PINTYPE.NEYTRAL;
  public Wires: Array<Wire> = [];
  public state: boolean = false;
  public Qutb: QUTB = QUTB.MANFIY; //Hozircha zarur emas
  public position: POSITION;
  public pinContainer: HTMLElement;
  public parentElement: Komponent;
  public onBeginConnect: (e: MouseEvent, payload: PinPayload) => {} | void;
  public onMoveConnect: (e: MouseEvent, payload: PinPayload) => {} | void;
  public onEndConnect: (e: MouseEvent, payload: PinPayload) => {} | void;
  pinId: string;
  label: string = "";
  inputPins: { [key: string]: Pin } = {};
  constructor(
    name: string,
    pinType: PINTYPE,
    position: POSITION = POSITION.LEFT,
    label: string = null
  ) {
    this.label = label;
    this.pinId = uuid();
    this.PinType = pinType;
    this.name = name;
    this.parentElement;
    this.position = position ? position : POSITION.LEFT;
    this.pinContainer = createEl("div");
    this.pinContainer.classList.add(...["elpin", position ? position : "left"]);
    if (label) {
      this.pinContainer.innerHTML = `<span>${label}</span>`;
    }
    this.pinContainer.onmousedown = (e) => {
      e.stopPropagation();
      this.onBeginConnect(e, {
        pinType: this.PinType,
        name: this.name,
        pos: this.getPos(),
      });

      let ref = (e: MouseEvent) => {
        this.onMoveConnect(e, {
          pinType: this.PinType,
          name: this.name,
          pos: this.getPos(),
        });
      };

      let refUp = (e: MouseEvent) => {
        document.removeEventListener("mousemove", ref);
        document.removeEventListener("mouseup", refUp);
      };
      document.addEventListener("mousemove", ref);
      document.addEventListener("mouseup", refUp);
    };

    this.pinContainer.onmouseup = (e: MouseEvent) => {
      this.onEndConnect(e, {
        pinType: this.PinType,
        name: this.name,
        pos: this.getPos(),
      });
    };
  }

  getPos() {
    let pos = this.pinContainer.getBoundingClientRect();
    return {
      x: pos.left + pos.width / 2 - diffLeft,
      y: pos.top + pos.height / 2,
    };
  }

  updateWire() {
    this.Wires.forEach((wire) => {
      if (this.PinType == PINTYPE.CHIQISH) {
        wire.setStartPos(this.getPos());
      } else if (this.PinType == PINTYPE.KIRISH) {
        wire.setStopPos(this.getPos());
      }
    });
  }

  setParent(parent: Komponent) {
    this.parentElement = parent;
  }

  Write(kuchlanish: boolean) {
    if (kuchlanish !== this.state) {
      if (kuchlanish && this.PinType == PINTYPE.CHIQISH) {
        this.Wires.forEach((wire) => {
          wire.setState(kuchlanish);
        });
      } else if (this.PinType == PINTYPE.CHIQISH) {
        this.Wires.forEach((wire) => {
          wire.setState(false);
        });
      }
      this.state = kuchlanish;
      for (const key in this.Pins) {
        this.Pins[key].pins.forEach((pin) => {
          pin.Write(kuchlanish);
        });
        this.Pins[key].komponent.Fire();

        // this.Pins[key].komponent.detectPinsStates();
      }
    }
  }

  addPin(komponent: Komponent = null, pinName: Pin = null) {
    let a = komponent.uuid;
    if (this.Pins[a]) {
      this.Pins[a].pins.push(pinName);
    } else {
      this.Pins[a] = {
        komponent: komponent,
        pins: [pinName],
      };
    }
  }

  addWire(wire: Wire = null) {
    this.Wires.push(wire);
  }

  getComponents() {
    let buf = [];
    for (const key in this.Pins) {
      buf.push(this.Pins[key].komponent);
    }
    return buf;
  }
}
