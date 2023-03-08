import {Injectable} from '@angular/core';
import {Channel} from "../models/channel";
import {map, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Response} from "../models/Response";
import {Settings} from "../models/settings";

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(
    private http: HttpClient
  ) {
  }

  getChannels(): Observable<Channel[]> {
    return this.http.get('/assets/channels.json').pipe(
      map((response: Response) => response.data.map((channel: Channel) => new Channel().prepare(channel)))
    );
  }

  getSettings(): Settings{
    return JSON.parse(localStorage.getItem('settings')) ?? undefined;
  }

  resetSettings(channels: Channel[]): void {
      const settings = {
        bgColor: '#4b4a4a',
        cartColor: '#FFFFFF',
        channelCount: 12,
        channels: channels,
      }
      this.setSettings(settings);
  }

  setSettings(settings: Settings): void {
    localStorage.setItem('settings', JSON.stringify(settings));
  }
}
