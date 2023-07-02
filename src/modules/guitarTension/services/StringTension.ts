import { Note } from "@tonaljs/tonal";
import type {GuitarString} from "@/modules/guitarTension/types/stringTension";

export class StringTension {
  #newtonCoefficient = 9.81;

  constructor(
    public string: GuitarString,
    public note: Note,
    public diapason: number = 0.648, // (in meters) default diapason 25.5 in
  ) {}

  getSizeInMeter(): number {
    return this.string.diameter / 39.37;
  }

  /**
   * Get tension of string in Newtons
   * m * F² * 4 * L²
   *
   * F frequency in Hz
   * L string length in m (scale)
   * m unit weight in kg/m
   *
   * @return number tension in newtons (N)
   */
  getTension(): number {
    return (
      this.string.unitWeight *
      Math.pow(Note.freq(this.note.name), 2) *
      4 *
      Math.pow(this.diapason, 2)
    );
  }

  /**
   * Convert string tension in Kg
   */
  getTensionInKg(): number {
    return this.getTension() / 9.81;
  }
}
