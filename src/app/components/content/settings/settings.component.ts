import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {GlobalService} from "../../../services/global.service";
import {Channel} from "../../../models/channel";
import {Settings} from "../../../models/settings";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {
  @Input() modal: any;
  settings: Settings;
  dbChannels: Channel[] = [];
  customChannelUrl: string = '';
  showChannels = false;
  alertSettings = {
    type: '',
    message: ''
  }
  regexControl = {
    youtube: /^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+$/,
    twitch: /^(https?:\/\/)?(www\.)?(twitch\.tv)\/.+$/,
  }

  settingsSubscription: Subscription;
  channelsSubscription: Subscription;

  constructor(
    private globalService: GlobalService,
    private modalService: NgbModal
  ) {
  }

  open(content?: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }
  ngOnInit() {
   this.settingsSubscription = this.globalService.settings$.subscribe((settings: Settings) => {
      this.settings = settings;
     this.channelsSubscription = this.globalService.getChannels().subscribe((channels: Channel[]) => {
        this.dbChannels = channels.filter((c: Channel) => !this.settings.channels.find((s: Channel) => s.fullUrl === c.fullUrl));
      });
    });
  }

  ngOnDestroy() {
    this.settingsSubscription.unsubscribe();
    this.channelsSubscription.unsubscribe();
  }

  showAlert(type: string, message: string) {
    this.alertSettings = {
      type: type,
      message: message
    }
    setTimeout(() => {
      this.alertSettings = {
        type: '',
        message: ''
      }
    },3000);
  }

  addChannel(channel?: Channel){
    if (channel) {
      this.settings.channels.push(channel);
    }else{
      if (this.customChannelUrlValid()){
         this.settings.channels.push(new Channel().prepare({
           name:'Özel Kanal',
           provider:this.findProvider(),
           fullUrl:this.customChannelUrl,
           isCustom:true
         }));
         this.showAlert('success', 'Kanal eklendi!');
      }else{
        this.showAlert('danger', 'Lütfen geçerli bir kanal adresi giriniz!');
        return;
      }
    }
    this.saveSettings(false);
  }

  findProvider(){
    if (this.regexControl.youtube.test(this.customChannelUrl)){
      return 'youtube';
    }
    if (this.regexControl.twitch.test(this.customChannelUrl)){
      return 'twitch';
    }
    return '';
  }

  customChannelUrlValid(){
    let error = 0;
    if (this.customChannelUrl === '') {
      error++;
    }
    if(!this.regexControl.youtube.test(this.customChannelUrl) && !this.regexControl.twitch.test(this.customChannelUrl)){
      error++;
    }
    return error === 0;
  }

  saveSettings(dismiss = true) {
    this.globalService.updateSettings$(this.settings);
    this.showAlert('success', 'Ayarlar kaydedildi!')
    if (dismiss) {
      this.modal.close();
    }
  }

  deleteChannel(channel: Channel) {
    this.settings.channels = this.settings.channels.filter((c: Channel) => c.id !== channel.id);
    this.globalService.updateSettings$(this.settings);
    this.showAlert('success', 'Kanal silindi!')
  }

  resetSettings() {
    this.globalService.getChannels().subscribe((channels: Channel[]) => {
      this.globalService.resetSettings(channels);
    });
    this.showAlert('success', 'Ayarlar sıfırlandı!')
    this.modal.close();
  }

}
