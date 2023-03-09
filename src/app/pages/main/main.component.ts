import {Component, OnInit} from '@angular/core';
import {Channel} from "../../models/channel";
import {GlobalService} from "../../services/global.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Settings} from "../../models/settings";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  channels: Channel[];
  constructor(
    private globalService: GlobalService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.globalService.settings$.subscribe((settings: Settings) => {
      this.channels = settings.channels.slice(0, settings.channelCount);
    });
  }

  openSettings(content?: any){
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

}
