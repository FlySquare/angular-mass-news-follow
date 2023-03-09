import {Component, Input, OnInit} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {GlobalService} from "../../../services/global.service";
import {Channel} from "../../../models/channel";
import {Settings} from "../../../models/settings";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  @Input() modal: any;
  settings: Settings;

  constructor(
    private globalService: GlobalService,
  ) {
  }

  ngOnInit() {
    this.globalService.settings$.subscribe((settings: Settings) => {
      this.settings = settings;
    });
  }

  saveSettings() {
    this.globalService.updateSettings$(this.settings);
    alert('Settings saved');
    this.modal.close();
  }

  deleteChannel(channel: Channel) {
    this.settings.channels = this.settings.channels.filter((c: Channel) => c.id !== channel.id);
    this.globalService.updateSettings$(this.settings);
    alert('Channel deleted');
  }

  resetSettings() {
    this.globalService.getChannels().subscribe((channels: Channel[]) => {
      this.globalService.resetSettings(channels);
    });
    alert('Settings reset to default');
    this.modal.close();
  }

}
