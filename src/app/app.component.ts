import {Component, OnInit} from '@angular/core';
import {GlobalService} from "./services/global.service";
import {Channel} from "./models/channel";
import {Settings} from "./models/settings";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private globalService: GlobalService,
  ) {
  }

  ngOnInit() {
    this.globalService.getSettings();
    this.globalService.settings$.subscribe((settings: Settings) => {
      if (typeof settings.bgColor === 'undefined') {
        this.globalService.getChannels().subscribe((channels: Channel[]) => {
          this.globalService.resetSettings(channels);
        });
      }
    });
  }
}
