import {inject} from 'aurelia-framework';
import {ObserverLocator} from 'aurelia-framework';
import Firebase from 'firenext';

@inject(ObserverLocator)
export class FB{
  constructor(observerLocator) {
    this.observerLocator = observerLocator;
    this.fb = new Firebase('https://ruby-auth.firebaseio.com');

    this.heading = 'This is a test of Aurelia and Firebase.';
    this.title = '';
    this.subtitle = '';

    this.authData = '';
    this.authed = false;

    this.fb.child('information').on("value", data => {
      this.title = data.val() ? data.val().title : "";
      this.subtitle = data.val() ? data.val().subtitle: "";
    });

    this.getAuth();
  }

  createElement(html) {
    var div = document.createElement('div');
    div.innerHTML = html;
    return div.firstChild;
  }

  authWithFirebase() {
    var oAuth = this.fb.authWithOAuthPopup("github", (error, authData) => {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        console.log("Authenticated successfully with payload:", authData);
        this.authData = authData;
      }
    });

    oAuth.then((res) => {
      console.log(res);
      this.authData = res;
      this.authed = true;
    }, (err) => {
      console.log(`Authentication ERROR: ${err}`);
      this.authData = '';
      this.authed = false;
    });
  }

  getAuth() {
    var authData = this.fb.getAuth();
    if (authData !== null) {
      this.authData = authData;
      this.authed = true;
    } else {
      this.authData = '';
      this.authed = false;
    }
  }

  logFb() {
    var fbUpdate = this.fb.child('information').update({"title": this.title, "subtitle": this.subtitle});

    fbUpdate.then(res => {
      this.notice = 'Successfully updated Firebase.';
      setTimeout(() => {this.notice = '';}, 5000);
    }, err => {
      alert(err.message);
    });
  }
}
