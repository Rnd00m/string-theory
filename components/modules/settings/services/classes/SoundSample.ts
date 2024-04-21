import type { SoundSampleInstrumentTypeEnum } from "@/components/modules/settings/enums/SoundSampleInstrumentTypeEnum";

export class SoundSample {
  constructor(
    public name: string,
    public instrumentType: SoundSampleInstrumentTypeEnum,
    public url: string
  ) {}

  toJSON () {
    return { ...this }
  }
}
