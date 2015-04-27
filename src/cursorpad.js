import {inject} from 'aurelia-framework';
import Firebase from 'firenext';

export class CursorPad{
  constructor() {
    this.heading = 'This is a cursor pad.';
    this.app = {
      'cursorUp': false,
      'cursorLeft': false,
      'cursorRight': false,
      'select': false,
      'guide': false,
      'info': false,
      'menu': false,
      'exit': false,
      'channelUp': false,
      'channelDown': false,
      'volume': 50,
      'mute': false,
      'volumeUp': false,
      'volumeDown': false,
      'volumeMute': false,
      'volumeIsRelative': false
    };
  }

  /*  Contemplating staying with these two, just in case
      something weird happens with mouse events...
  setAttr(e) {
    this.app[e.srcElement.id] = true;
    console.log(`${e.srcElement.id} => ${this.app[e.srcElement.id]}`);
  }

  unsetAttr(e) {
    this.app[e.srcElement.id] = false;
    console.log(`${e.srcElement.id} => ${this.app[e.srcElement.id]}`);
  }
  */

  toggleAttr(e) {
    this.app[e.srcElement.id] = !this.app[e.srcElement.id];
    console.log(`${e.srcElement.id} => ${this.app[e.srcElement.id]}`);
  }

  volumeUp() {
    if (this.app.volume < 100) {
      this.app.volume += 1;
    }
  }

  volumeDown() {
    if (this.app.volume > 0) {
      this.app.volume -= 1;
    }
  }
}
