import {Channel} from "./channel";

export class Settings{
  bgColor: string;
  cartColor: string;
  channelCount: number;
  autoPlay: number;
  channels: Channel[];

  prepare(input?: any) {
    Object.assign(this, input);
    if (input.autoPlay){
      this.autoPlay = Number(input.autoPlay);
    }
    return this;
  }
}
