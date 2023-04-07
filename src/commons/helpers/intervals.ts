import { Interval } from "@tonaljs/tonal";

export function getIntervalStringName(intervalName: string): string {
  switch (Interval.num(intervalName)) {
    case 1:
      return "root";
    case 2:
      return "second";
    case 3:
      return "third";
    case 4:
      return "fourth";
    case 5:
      return "fifth";
    case 6:
      return "sixth";
    case 7:
      return "seventh";
    default:
      return "";
  }
}