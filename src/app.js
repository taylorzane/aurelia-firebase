import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import 'bootstrap';
import 'bootstrap/css/bootstrap.css!';

@inject(Router)
export class App {
  constructor(router) {
    this.router = router;
    this.router.configure(config => {
      config.title = 'Aurelia';
      config.map([
        { route: ['','welcome'],  moduleId: './welcome',    nav: true, title:'Welcome' },
        { route: 'firebase',      moduleId: './fb',         nav: true, title:'Firebase' },
        { route: 'cursorpad',     moduleId: './cursorpad',  nav: true, title: 'Cursor Pad' }
      ]);
    });
  }
}
