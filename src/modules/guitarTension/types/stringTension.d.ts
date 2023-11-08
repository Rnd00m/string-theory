import { StringType } from "@/modules/guitarTension/enums/StringType";

export type GuitarString = {
  name: string;
  diameter: number; // Size of the string in inches (most common usage of string size)
  unitWeight: number; // Weight of the string in kg
  material: StringType;
};

export type StringNotePair = {
  string: GuitarString;
  note: Note;
};

export type TensionParameterUpdateEvent = {
  note: Note;
  string: GuitarString;
  index: number;
};
