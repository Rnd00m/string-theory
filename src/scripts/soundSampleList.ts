import { SoundSample } from "@/scripts/classes/SoundSample";
import { SoundSampleInstrumentTypeEnum } from "@/scripts/classes/SoundSampleInstrumentTypeEnum";

export const soundSampleList: SoundSample[] = [
  new SoundSample(
    "Acoustic Guitar Steel",
    SoundSampleInstrumentTypeEnum.Guitar,
    "/sound-samples/acoustic_guitar_steel_mp3/"
  ),
  new SoundSample(
    "Acoustic Guitar Nylon",
    SoundSampleInstrumentTypeEnum.Guitar,
    "/sound-samples/acoustic_guitar_nylon_mp3/"
  ),
  new SoundSample(
    "Electric Guitar Clean",
    SoundSampleInstrumentTypeEnum.Guitar,
    "/sound-samples/electric_guitar_clean_mp3/"
  ),
  new SoundSample(
    "Distorsion Guitar",
    SoundSampleInstrumentTypeEnum.Guitar,
    "/sound-samples/distortion_guitar_mp3/"
  ),
  new SoundSample(
    "Acoustic Bass",
    SoundSampleInstrumentTypeEnum.Bass,
    "/sound-samples/acoustic_bass_mp3/"
  ),
  new SoundSample(
    "Electric Bass Finger",
    SoundSampleInstrumentTypeEnum.Bass,
    "/sound-samples/electric_bass_finger_mp3/"
  ),
  new SoundSample(
    "Electric Bass Pick",
    SoundSampleInstrumentTypeEnum.Bass,
    "/sound-samples/electric_bass_pick_mp3/"
  ),
];