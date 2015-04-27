System.register(['aurelia-framework', 'firenext'], function (_export) {
  var inject, ObserverLocator, Firebase, _classCallCheck, _createClass, FB;

  return {
    setters: [function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
      ObserverLocator = _aureliaFramework.ObserverLocator;
    }, function (_firenext) {
      Firebase = _firenext['default'];
    }],
    execute: function () {
      'use strict';

      _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

      _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

      FB = (function () {
        function FB(observerLocator) {
          var _this = this;

          _classCallCheck(this, _FB);

          this.observerLocator = observerLocator;
          this.fb = new Firebase('https://ruby-auth.firebaseio.com');

          this.heading = 'This is a test of Aurelia and Firebase.';
          this.title = '';
          this.subtitle = '';

          this.authData = '';
          this.authed = false;

          this.fb.child('information').on('value', function (data) {
            _this.title = data.val() ? data.val().title : '';
            _this.subtitle = data.val() ? data.val().subtitle : '';
          });

          this.getAuth();
        }

        var _FB = FB;

        _createClass(_FB, [{
          key: 'createElement',
          value: function createElement(html) {
            var div = document.createElement('div');
            div.innerHTML = html;
            return div.firstChild;
          }
        }, {
          key: 'authWithFirebase',
          value: function authWithFirebase() {
            var _this2 = this;

            this.fb.authWithOAuthPopup('github', function (error, authData) {
              if (error) {
                console.log('Login Failed!', error);
              } else {
                console.log('Authenticated successfully with payload:', authData);
                _this2.authData = authData;
              }
            }).then(function (res) {
              console.log(res);
              _this2.authData = res;
              _this2.authed = true;
            }, function (err) {
              console.log('Authentication ERROR: ' + err);
              _this2.authData = '';
              _this2.authed = false;
            });
          }
        }, {
          key: 'getAuth',
          value: function getAuth() {
            var authData = this.fb.getAuth();
            if (authData !== null) {
              this.authData = authData;
              this.authed = true;
            } else {
              this.authData = '';
              this.authed = false;
            }
          }
        }, {
          key: 'logFb',
          value: function logFb() {
            var _this3 = this;

            var fbUpdate = this.fb.child('information').update({ title: this.title, subtitle: this.subtitle });

            fbUpdate.then(function (res) {
              _this3.notice = 'Successfully updated Firebase.';
              setTimeout(function () {
                _this3.notice = '';
              }, 5000);
            }, function (err) {
              alert(err.message);
            });
          }
        }]);

        FB = inject(ObserverLocator)(FB) || FB;
        return FB;
      })();

      _export('FB', FB);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,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