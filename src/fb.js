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

    this.fb.child('information').on("value", data => {
      this.title = data.val() ? data.val().title : "";
      this.subtitle = data.val() ? data.val().subtitle: "";
    });
  }

  createElement(html) {
    var div = document.createElement('div');
    div.innerHTML = html;
    return div.firstChild;
  }

  authWithFirebase(){
    this.fb.authWithOAuthRedirect("github", (error, authData) => {
      debugger
      if (error) {
        console.log("Login Failed!", error);
      } else {
        debugger
        console.log("Authenticated successfully with payload:", authData);
        this.authData = authData;
      }
    });
  }

  logFb(){
    this.fb.update({ "information": {"title": this.title, "subtitle": this.subtitle} });
  }
}
