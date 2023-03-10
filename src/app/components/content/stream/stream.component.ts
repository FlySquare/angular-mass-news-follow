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
  customParams: string = '';
  constructor(
    private globalService: GlobalService
  ) {}

  ngOnInit(): void {
    this.settingsSubscriber = this.globalService.settings$.subscribe((settings) => {
      this.settings = settings;
      this.globalService.showSettings(settings);
      this.setUrlSettings();
    });
  }

  setUrlSettings(){
    if (this.settings.autoPlay){
      if (this.channel.provider === 'twitch'){
        this.customParams = '&autoplay=true';
      }else{
        this.customParams = '?autoplay=1';
      }
    }else{
      if (this.channel.provider === 'twitch'){
        this.customParams = '&autoplay=false';
      }else{
        this.customParams = '?autoplay=0';
      }
    }
  }


}
