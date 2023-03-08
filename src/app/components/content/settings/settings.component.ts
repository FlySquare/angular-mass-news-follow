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
  settings: Settings = this.globalService.getSettings();
  constructor(
    private globalService: GlobalService,
  ) { }

  ngOnInit() {
    console.log(this.settings);
  }

  saveSettings(){
    this.globalService.setSettings(this.settings);
    alert('Settings saved');
    this.modal.close();
  }

  resetSettings(){
    this.globalService.getChannels().subscribe((channels: Channel[]) => {
      this.globalService.resetSettings(channels);
    });
    alert('Settings reset to default');
    this.modal.close();
  }

}
