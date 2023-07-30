import type { SoundSampleInstrumentTypeEnum } from "@/modules/settings/enums/SoundSampleInstrumentTypeEnum";

export class SoundSample {
  constructor(
    public name: string,
    public instrumentType: SoundSampleInstrumentTypeEnum,
    public url: string
  ) {}
}
