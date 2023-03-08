import {Component, OnInit} from '@angular/core';
import {Channel} from "../../models/channel";
import {GlobalService} from "../../services/global.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

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
    this.globalService.getChannels().subscribe((channels: Channel[]) => {
      if (typeof this.globalService.getSettings() === 'undefined') {
        this.globalService.resetSettings(channels);
      }
      //this.channels = channels;
    });
  }

  openSettings(content?: any){
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

}
