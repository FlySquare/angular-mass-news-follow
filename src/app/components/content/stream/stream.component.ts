import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Channel} from "../../../models/channel";
import {GlobalService} from "../../../services/global.service";
import {Subscription} from "rxjs";
import {Settings} from "../../../models/settings";

@Component({
  selector: 'app-stream',
  templateUrl: './stream.component.html',
  styleUrls: ['./stream.component.scss']
})
export class StreamComponent implements OnInit{
  @Input() channel: Channel;
  settings: Settings = new Settings();
  settingsSubscriber: Subscription;
  constructor(
    private globalService: GlobalService
  ) {}

  ngOnInit(): void {
    this.settingsSubscriber = this.globalService.settings$.subscribe((settings) => {
      this.settings = settings;
    });
  }


}
