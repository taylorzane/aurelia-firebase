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

          this.fb.child('information').on('value', function (data) {
            _this.title = data.val() ? data.val().title : '';
            _this.subtitle = data.val() ? data.val().subtitle : '';
          });
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

            this.fb.authWithOAuthRedirect('github', function (error, authData) {
              debugger;
              if (error) {
                console.log('Login Failed!', error);
              } else {
                debugger;
                console.log('Authenticated successfully with payload:', authData);
                _this2.authData = authData;
              }
            });
          }
        }, {
          key: 'logFb',
          value: function logFb() {
            this.fb.update({ information: { title: this.title, subtitle: this.subtitle } });
          }
        }]);

        FB = inject(ObserverLocator)(FB) || FB;
        return FB;
      })();

      _export('FB', FB);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZiLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7d0VBS2EsRUFBRTs7OztpQ0FMUCxNQUFNOzBDQUNOLGVBQWU7Ozs7Ozs7Ozs7O0FBSVYsUUFBRTtBQUNGLGlCQURBLEVBQUUsQ0FDRCxlQUFlLEVBQUU7Ozs7O0FBQzNCLGNBQUksQ0FBQyxlQUFlLEdBQUcsZUFBZSxDQUFDO0FBQ3ZDLGNBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxRQUFRLENBQUMsa0NBQWtDLENBQUMsQ0FBQzs7QUFFM0QsY0FBSSxDQUFDLE9BQU8sR0FBRyx5Q0FBeUMsQ0FBQztBQUN6RCxjQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztBQUNoQixjQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQzs7QUFFbkIsY0FBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7O0FBRW5CLGNBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsVUFBQSxJQUFJLEVBQUk7QUFDL0Msa0JBQUssS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztBQUNoRCxrQkFBSyxRQUFRLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxRQUFRLEdBQUUsRUFBRSxDQUFDO1dBQ3RELENBQUMsQ0FBQztTQUNKOztrQkFmVSxFQUFFOzs7O2lCQWlCQSx1QkFBQyxJQUFJLEVBQUU7QUFDbEIsZ0JBQUksR0FBRyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDeEMsZUFBRyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7QUFDckIsbUJBQU8sR0FBRyxDQUFDLFVBQVUsQ0FBQztXQUN2Qjs7O2lCQUVlLDRCQUFFOzs7QUFDaEIsZ0JBQUksQ0FBQyxFQUFFLENBQUMscUJBQXFCLENBQUMsUUFBUSxFQUFFLFVBQUMsS0FBSyxFQUFFLFFBQVEsRUFBSztBQUMzRCx1QkFBUTtBQUNSLGtCQUFJLEtBQUssRUFBRTtBQUNULHVCQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsRUFBRSxLQUFLLENBQUMsQ0FBQztlQUNyQyxNQUFNO0FBQ0wseUJBQVE7QUFDUix1QkFBTyxDQUFDLEdBQUcsQ0FBQywwQ0FBMEMsRUFBRSxRQUFRLENBQUMsQ0FBQztBQUNsRSx1QkFBSyxRQUFRLEdBQUcsUUFBUSxDQUFDO2VBQzFCO2FBQ0YsQ0FBQyxDQUFDO1dBQ0o7OztpQkFFSSxpQkFBRTtBQUNMLGdCQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFFLGFBQWUsRUFBQyxPQUFTLElBQUksQ0FBQyxLQUFLLEVBQUUsVUFBWSxJQUFJLENBQUMsUUFBUSxFQUFDLEVBQUUsQ0FBQyxDQUFDO1dBQ3JGOzs7QUF0Q1UsVUFBRSxHQURkLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FDWCxFQUFFLEtBQUYsRUFBRTtlQUFGLEVBQUU7OztvQkFBRixFQUFFIiwiZmlsZSI6ImZiLmpzIiwic291cmNlUm9vdCI6Ii9zcmMvIn0=