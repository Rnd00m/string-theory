import { Interval } from "@tonaljs/tonal";

function getIntervalStringName(intervalName: string): string {
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

/**
 * List intervals between two given intervals
 */
function getIntervalsList(from: Interval, to: Interval): Interval[] {
  const intervalsList: Interval[] = [];
  let currentInterval: Interval = from;
  let semitonesNumber: number = currentInterval.semitones;

  intervalsList.push(currentInterval);

  while (currentInterval.semitones < to.semitones) {
    semitonesNumber += 1;

    currentInterval = Interval.get(Interval.fromSemitones(semitonesNumber));

    intervalsList.push(currentInterval);
  }

  return intervalsList;
}

export { getIntervalStringName, getIntervalsList };
