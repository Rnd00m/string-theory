import { StringType } from "@/modules/guitarTension/enums/StringType";
import type { StringTension } from "@/modules/guitarTension/services/StringTension";

declare type GuitarString = {
  name: string;
  diameter: number; // Size of the string in inches (most common usage of string size)
  unitWeight: number; // Weight of the string in kg
  material: StringType;
};

declare type StringNotePair = {
  string: GuitarString;
  note: Note;
};

declare type TensionParameterUpdateEvent = {
  note: Note;
  string: GuitarString;
  index: number;
};
