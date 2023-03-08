import {Component, Input} from '@angular/core';
import {Channel} from "../../../models/channel";

@Component({
  selector: 'app-stream',
  templateUrl: './stream.component.html',
  styleUrls: ['./stream.component.scss']
})
export class StreamComponent {
  @Input() channel: Channel;

}
