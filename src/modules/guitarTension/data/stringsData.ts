import type { GuitarString } from "@/modules/guitarTension/types/stringTension";
import { StringType } from "../enums/StringType";

interface Tuning {
  name: string;
  notes: string[];
}

interface StringSet {
  name: string;
  strings: GuitarString[];
}

export const stringsData: GuitarString[] = [
  {
    name: "PL007",
    diameter: 7,
    unitWeight: 0.0001937593,
    material: StringType.PlainSteelLockTwist,
  },
  {
    name: "PL008",
    diameter: 8,
    unitWeight: 0.00025322644,
    material: StringType.PlainSteelLockTwist,
  },
  {
    name: "PL0085",
    diameter: 8.5,
    unitWeight: 0.00028590658,
    material: StringType.PlainSteelLockTwist,
  },
  {
    name: "PL009",
    diameter: 9,
    unitWeight: 0.00032037252,
    material: StringType.PlainSteelLockTwist,
  },
  {
    name: "PL0095",
    diameter: 9.5,
    unitWeight: 0.00035698142,
    material: StringType.PlainSteelLockTwist,
  },
  {
    name: "PL010",
    diameter: 10,
    unitWeight: 0.0003955547,
    material: StringType.PlainSteelLockTwist,
  },
  {
    name: "PL0105",
    diameter: 10.5,
    unitWeight: 0.00043609236,
    material: StringType.PlainSteelLockTwist,
  },
  {
    name: "PL011",
    diameter: 11,
    unitWeight: 0.0004785944,
    material: StringType.PlainSteelLockTwist,
  },
  {
    name: "PL0115",
    diameter: 11.5,
    unitWeight: 0.0005232394,
    material: StringType.PlainSteelLockTwist,
  },
  {
    name: "PL012",
    diameter: 12,
    unitWeight: 0.0005696702,
    material: StringType.PlainSteelLockTwist,
  },
  {
    name: "PL013",
    diameter: 13,
    unitWeight: 0.00066860352,
    material: StringType.PlainSteelLockTwist,
  },
  {
    name: "PL0135",
    diameter: 13.5,
    unitWeight: 0.00072092746,
    material: StringType.PlainSteelLockTwist,
  },
  {
    name: "PL014",
    diameter: 14,
    unitWeight: 0.00077539436,
    material: StringType.PlainSteelLockTwist,
  },
  {
    name: "PL015",
    diameter: 15,
    unitWeight: 0.00089004272,
    material: StringType.PlainSteelLockTwist,
  },
  {
    name: "PL016",
    diameter: 16,
    unitWeight: 0.00101272718,
    material: StringType.PlainSteelLockTwist,
  },
  {
    name: "PL017",
    diameter: 17,
    unitWeight: 0.00114326916,
    material: StringType.PlainSteelLockTwist,
  },
  {
    name: "PL018",
    diameter: 18,
    unitWeight: 0.00128166866,
    material: StringType.PlainSteelLockTwist,
  },
  {
    name: "PL019",
    diameter: 19,
    unitWeight: 0.00142810426,
    material: StringType.PlainSteelLockTwist,
  },
  {
    name: "PL020",
    diameter: 20,
    unitWeight: 0.00158239738,
    material: StringType.PlainSteelLockTwist,
  },
  {
    name: "PL022",
    diameter: 22,
    unitWeight: 0.00191473476,
    material: StringType.PlainSteelLockTwist,
  },
  {
    name: "PL024",
    diameter: 24,
    unitWeight: 0.0022786808,
    material: StringType.PlainSteelLockTwist,
  },
  {
    name: "PL026",
    diameter: 26,
    unitWeight: 0.0026742355,
    material: StringType.PlainSteelLockTwist,
  },
  {
    name: "NW017",
    diameter: 17,
    unitWeight: 0.00098647592,
    material: StringType.NickelPlatedSteelRoundWound,
  },
  {
    name: "NW018",
    diameter: 18,
    unitWeight: 0.0011098747,
    material: StringType.NickelPlatedSteelRoundWound,
  },
  {
    name: "NW019",
    diameter: 19,
    unitWeight: 0.00124059526,
    material: StringType.NickelPlatedSteelRoundWound,
  },
  {
    name: "NW020",
    diameter: 20,
    unitWeight: 0.0013384571,
    material: StringType.NickelPlatedSteelRoundWound,
  },
  {
    name: "NW021",
    diameter: 21,
    unitWeight: 0.00148096394,
    material: StringType.NickelPlatedSteelRoundWound,
  },
  {
    name: "NW022",
    diameter: 22,
    unitWeight: 0.00164007872,
    material: StringType.NickelPlatedSteelRoundWound,
  },
  {
    name: "NW024",
    diameter: 24,
    unitWeight: 0.00193884306,
    material: StringType.NickelPlatedSteelRoundWound,
  },
  {
    name: "NW026",
    diameter: 26,
    unitWeight: 0.00226278718,
    material: StringType.NickelPlatedSteelRoundWound,
  },
  {
    name: "NW028",
    diameter: 28,
    unitWeight: 0.00261905428,
    material: StringType.NickelPlatedSteelRoundWound,
  },
  {
    name: "NW030",
    diameter: 30,
    unitWeight: 0.00307800488,
    material: StringType.NickelPlatedSteelRoundWound,
  },
  {
    name: "NW032",
    diameter: 32,
    unitWeight: 0.00345498726,
    material: StringType.NickelPlatedSteelRoundWound,
  },
  {
    name: "NW034",
    diameter: 34,
    unitWeight: 0.0038555422,
    material: StringType.NickelPlatedSteelRoundWound,
  },
  {
    name: "NW036",
    diameter: 36,
    unitWeight: 0.00427949112,
    material: StringType.NickelPlatedSteelRoundWound,
  },
  {
    name: "NW038",
    diameter: 38,
    unitWeight: 0.00472719118,
    material: StringType.NickelPlatedSteelRoundWound,
  },
  {
    name: "NW039",
    diameter: 39,
    unitWeight: 0.00498809656,
    material: StringType.NickelPlatedSteelRoundWound,
  },
  {
    name: "NW042",
    diameter: 42,
    unitWeight: 0.00576438382,
    material: StringType.NickelPlatedSteelRoundWound,
  },
  {
    name: "NW044",
    diameter: 44,
    unitWeight: 0.00628280156,
    material: StringType.NickelPlatedSteelRoundWound,
  },
  {
    name: "NW046",
    diameter: 46,
    unitWeight: 0.00682461328,
    material: StringType.NickelPlatedSteelRoundWound,
  },
  {
    name: "NW048",
    diameter: 48,
    unitWeight: 0.00738999756,
    material: StringType.NickelPlatedSteelRoundWound,
  },
  {
    name: "NW049",
    diameter: 49,
    unitWeight: 0.00768144012,
    material: StringType.NickelPlatedSteelRoundWound,
  },
  {
    name: "NW052",
    diameter: 52,
    unitWeight: 0.00859130522,
    material: StringType.NickelPlatedSteelRoundWound,
  },
  {
    name: "NW054",
    diameter: 54,
    unitWeight: 0.00961439004,
    material: StringType.NickelPlatedSteelRoundWound,
  },
  {
    name: "NW056",
    diameter: 56,
    unitWeight: 0.01028585084,
    material: StringType.NickelPlatedSteelRoundWound,
  },
  {
    name: "NW059",
    diameter: 59,
    unitWeight: 0.01146322878,
    material: StringType.NickelPlatedSteelRoundWound,
  },
  {
    name: "NW060",
    diameter: 60,
    unitWeight: 0.01188307036,
    material: StringType.NickelPlatedSteelRoundWound,
  },
  {
    name: "NW062",
    diameter: 62,
    unitWeight: 0.01262507026,
    material: StringType.NickelPlatedSteelRoundWound,
  },
  {
    name: "NW064",
    diameter: 64,
    unitWeight: 0.01339064272,
    material: StringType.NickelPlatedSteelRoundWound,
  },
  {
    name: "NW065",
    diameter: 65,
    unitWeight: 0.01382861017,
    material: StringType.NickelPlatedSteelRoundWound,
  },
  {
    name: "NW066",
    diameter: 66,
    unitWeight: 0.01426657762,
    material: StringType.NickelPlatedSteelRoundWound,
  },
  {
    name: "NW068",
    diameter: 68,
    unitWeight: 0.01511036812,
    material: StringType.NickelPlatedSteelRoundWound,
  },
  {
    name: "NW070",
    diameter: 70,
    unitWeight: 0.01594790832,
    material: StringType.NickelPlatedSteelRoundWound,
  },
  {
    name: "NW072",
    diameter: 72,
    unitWeight: 0.01680866392,
    material: StringType.NickelPlatedSteelRoundWound,
  },
  {
    name: "NW074",
    diameter: 74,
    unitWeight: 0.01765602602,
    material: StringType.NickelPlatedSteelRoundWound,
  },
  {
    name: "NW080",
    diameter: 80,
    unitWeight: 0.02053866438,
    material: StringType.NickelPlatedSteelRoundWound,
  },
];

export const tunings: Tuning[] = [
  {
    name: "Standard",
    notes: ["E4", "B3", "G3", "D3", "A2", "E2"],
  },
  {
    name: "Drop D",
    notes: ["E4", "B3", "G3", "D3", "A2", "D2"],
  },
  {
    name: "1/2 step down",
    notes: ["Eb4", "Bb3", "F3", "C3", "G2", "Eb2"],
  },
  {
    name: "1 step down",
    notes: ["D4", "A3", "F3", "C3", "G2", "D2"],
  },
  {
    name: "Drop C",
    notes: ["D4", "A3", "F3", "C3", "G2", "C2"],
  },
  {
    name: "2 step down",
    notes: ["C4", "G3", "Eb3", "Bb2", "F2", "C2"],
  },
  {
    name: "Standard 7 strings",
    notes: ["E4", "B3", "G3", "D3", "A2", "E2", "B1"],
  },
  {
    name: "Standard 8 strings",
    notes: ["E4", "B3", "G3", "D3", "A2", "E2", "B1", "Gb1"],
  },
];

export const stringSets: StringSet[] = [
  {
    name: "EXL110 (10-46)",
    strings: getGuitarStringsFromList([
      "PL010",
      "PL013",
      "PL017",
      "NW026",
      "NW036",
      "NW046",
    ]),
  },
  {
    name: "EXL120 (9-42)",
    strings: getGuitarStringsFromList([
      "PL009",
      "PL011",
      "PL016",
      "NW024",
      "NW032",
      "NW042",
    ]),
  },
  {
    name: "EXL120+ (9.5-44)",
    strings: getGuitarStringsFromList([
      "PL0095",
      "PL0115",
      "PL016",
      "NW024",
      "NW034",
      "NW044",
    ]),
  },
  {
    name: "EXL125 (9-46)",
    strings: getGuitarStringsFromList([
      "PL009",
      "PL011",
      "PL016",
      "NW026",
      "NW036",
      "NW046",
    ]),
  },
  {
    name: "EXL130 (8-38)",
    strings: getGuitarStringsFromList([
      "PL008",
      "PL010",
      "PL015",
      "NW021",
      "NW030",
      "NW038",
    ]),
  },
  {
    name: "EXL115 (11-49)",
    strings: getGuitarStringsFromList([
      "PL011",
      "PL014",
      "PL018",
      "NW028",
      "NW038",
      "NW049",
    ]),
  },
  {
    name: "EXL115W (11-49)",
    strings: getGuitarStringsFromList([
      "PL011",
      "PL014",
      "NW021",
      "NW028",
      "NW038",
      "NW049",
    ]),
  },
  {
    name: "EXL116 (11-52)",
    strings: getGuitarStringsFromList([
      "PL011",
      "PL014",
      "PL018",
      "NW030",
      "NW042",
      "NW052",
    ]),
  },
  {
    name: "EXL117 (11-56)",
    strings: getGuitarStringsFromList([
      "PL011",
      "PL014",
      "PL019",
      "NW032",
      "NW044",
      "NW056",
    ]),
  },
  {
    name: "EXL110-7 (10-59)",
    strings: getGuitarStringsFromList([
      "PL010",
      "PL013",
      "PL017",
      "NW026",
      "NW036",
      "NW046",
      "NW059",
    ]),
  },
  {
    name: "EXL120-7 (9-54)",
    strings: getGuitarStringsFromList([
      "PL009",
      "PL011",
      "PL016",
      "NW024",
      "NW032",
      "NW042",
      "NW054",
    ]),
  },
  {
    name: "EXL120-8 (9-65)",
    strings: getGuitarStringsFromList([
      "PL009",
      "PL011",
      "PL016",
      "NW024",
      "NW032",
      "NW042",
      "NW054",
      "NW065",
    ]),
  },
  {
    name: "EXL140-8 (10-74)",
    strings: getGuitarStringsFromList([
      "PL010",
      "PL013",
      "PL017",
      "NW030",
      "NW042",
      "NW054",
      "NW064",
      "NW074",
    ]),
  },
];

export function getGuitarString(string: string): GuitarString {
  return stringsData.find(
    (guitarString: GuitarString) => guitarString.name === string
  );
}

export function getGuitarStringsFromList(list: string[]): GuitarString[] {
  return stringsData.filter((string: GuitarString) =>
    list.includes(string.name)
  );
}
