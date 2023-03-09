import {Injectable} from '@angular/core';
import {Channel} from "../models/channel";
import {BehaviorSubject, map, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Response} from "../models/Response";
import {Settings} from "../models/settings";

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  settings$: BehaviorSubject<Settings> = new BehaviorSubject<Settings>(new Settings());

  constructor(
    private http: HttpClient
  ) {
  }

  getChannels(): Observable<Channel[]> {
    return this.http.get('/assets/channels.json').pipe(
      map((response: Response) => response.data.map((channel: Channel) => new Channel().prepare(channel)))
    );
  }

  updateSettings$(settings: Object) {
    const newSettings = new Settings().prepare(settings);
    this.settings$.next(newSettings);
    this.setSettings(newSettings);
    this.showSettings(newSettings);
  }

  showSettings(settings: Settings): void {
    document.body.style.backgroundColor = settings.bgColor;
    Array.from(document.getElementsByTagName('app-stream')).forEach((cart: any) => {
      cart.style.backgroundColor = settings.cartColor;
    });
  }

  getSettings() {
    this.updateSettings$(JSON.parse(localStorage.getItem('settings')) ?? new Settings());
  }

  resetSettings(channels: Channel[]): void {
    const settings = {
      bgColor: '#4b4a4a',
      cartColor: '#FFFFFF',
      channelCount: 12,
      autoPlay: 0,
      channels: channels,
    }
    this.updateSettings$(settings);
  }

  setSettings(settings: Settings): void {
    localStorage.setItem('settings', JSON.stringify(settings));
  }
}
