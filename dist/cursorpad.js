System.register(['aurelia-framework', 'firenext'], function (_export) {
  var inject, Firebase, _classCallCheck, _createClass, CursorPad;

  return {
    setters: [function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
    }, function (_firenext) {
      Firebase = _firenext['default'];
    }],
    execute: function () {
      'use strict';

      _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

      _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

      CursorPad = (function () {
        function CursorPad() {
          _classCallCheck(this, CursorPad);

          this.heading = 'This is a cursor pad.';
          this.app = {
            cursorUp: false,
            cursorLeft: false,
            cursorRight: false,
            select: false,
            guide: false,
            info: false,
            menu: false,
            exit: false,
            channelUp: false,
            channelDown: false,
            volume: 50,
            mute: false,
            volumeUp: false,
            volumeDown: false,
            volumeMute: false,
            volumeIsRelative: false
          };
        }

        _createClass(CursorPad, [{
          key: 'toggleAttr',
          value: function toggleAttr(e) {
            this.app[e.srcElement.id] = !this.app[e.srcElement.id];
            console.log('' + e.srcElement.id + ' => ' + this.app[e.srcElement.id]);
          }
        }, {
          key: 'volumeUp',
          value: function volumeUp() {
            if (this.app.volume < 100) {
              this.app.volume += 1;
            }
          }
        }, {
          key: 'volumeDown',
          value: function volumeDown() {
            if (this.app.volume > 0) {
              this.app.volume -= 1;
            }
          }
        }]);

        return CursorPad;
      })();

      _export('CursorPad', CursorPad);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImN1cnNvcnBhZC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO3VEQUdhLFNBQVM7Ozs7aUNBSGQsTUFBTTs7Ozs7Ozs7Ozs7QUFHRCxlQUFTO0FBQ1QsaUJBREEsU0FBUyxHQUNOO2dDQURILFNBQVM7O0FBRWxCLGNBQUksQ0FBQyxPQUFPLEdBQUcsdUJBQXVCLENBQUM7QUFDdkMsY0FBSSxDQUFDLEdBQUcsR0FBRztBQUNULHNCQUFZLEtBQUs7QUFDakIsd0JBQWMsS0FBSztBQUNuQix5QkFBZSxLQUFLO0FBQ3BCLG9CQUFVLEtBQUs7QUFDZixtQkFBUyxLQUFLO0FBQ2Qsa0JBQVEsS0FBSztBQUNiLGtCQUFRLEtBQUs7QUFDYixrQkFBUSxLQUFLO0FBQ2IsdUJBQWEsS0FBSztBQUNsQix5QkFBZSxLQUFLO0FBQ3BCLG9CQUFVLEVBQUU7QUFDWixrQkFBUSxLQUFLO0FBQ2Isc0JBQVksS0FBSztBQUNqQix3QkFBYyxLQUFLO0FBQ25CLHdCQUFjLEtBQUs7QUFDbkIsOEJBQW9CLEtBQUs7V0FDMUIsQ0FBQztTQUNIOztxQkFyQlUsU0FBUzs7aUJBb0NWLG9CQUFDLENBQUMsRUFBRTtBQUNaLGdCQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDdkQsbUJBQU8sQ0FBQyxHQUFHLE1BQUksQ0FBQyxDQUFDLFVBQVUsQ0FBQyxFQUFFLFlBQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFHLENBQUM7V0FDbkU7OztpQkFFTyxvQkFBRztBQUNULGdCQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLEdBQUcsRUFBRTtBQUN6QixrQkFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDO2FBQ3RCO1dBQ0Y7OztpQkFFUyxzQkFBRztBQUNYLGdCQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtBQUN2QixrQkFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDO2FBQ3RCO1dBQ0Y7OztlQW5EVSxTQUFTOzs7MkJBQVQsU0FBUyIsImZpbGUiOiJjdXJzb3JwYWQuanMiLCJzb3VyY2VSb290IjoiL3NyYy8ifQ==