import type { SoundSampleInstrumentTypeEnum } from "@/modules/settings/services/enums/SoundSampleInstrumentTypeEnum";

export class SoundSample {
  constructor(
    public name: string,
    public instrumentType: SoundSampleInstrumentTypeEnum,
    public url: string
  ) {}
}