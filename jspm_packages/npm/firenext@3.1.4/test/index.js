/* */ 
var chai = require("chai"),
    chaiAsPromised = require("chai-as-promised"),
    Firebase = require("firebase"),
    Firenext = require("../index");
chai.use(chaiAsPromised);
function wait(n) {
  return new Promise(function(fulfill) {
    setTimeout(fulfill, n);
  });
}
var TEST_URL = 'https://jogabo-test.firebaseio.com',
    firebase = new Firebase(TEST_URL),
    firenext = new Firenext(firebase),
    expect = chai.expect;
describe('firebase-next specs', function() {
  this.timeout(5000);
  before(function() {
    return firenext.set({
      child1: {text: 'foo'},
      child2: {text: 'bar'}
    });
  });
  describe('firebase', function() {
    it('should proxy regular methods', function() {
      expect(firenext).to.respondTo('getAuth');
      expect(firenext).to.respondTo('onAuth');
      expect(firenext).to.respondTo('offAuth');
      expect(firenext).to.respondTo('unauth');
      expect(firenext).to.respondTo('name');
      expect(firenext).to.respondTo('key');
      expect(firenext).to.respondTo('toString');
      expect(firenext).to.respondTo('goOnline');
      expect(firenext).to.respondTo('goOffline');
    });
    it('should denodeify set', function() {
      return firenext.child('child1').set({text: '.'});
    });
    it('should denodeify update', function() {
      return firenext.child('child1').update({text: '..'});
    });
    it('should denodeify setWithPriority', function() {
      return firenext.child('child1').setWithPriority({text: '.'}, 1);
    });
    it('should denodeify setPriority', function() {
      return firenext.child('child1').setPriority(2);
    });
    it('should denodeify remove methods', function() {
      return firenext.child('child1').remove();
    });
    it('should add child', function() {
      return firenext.add({msg: 'bar'});
    });
    it('should replicate child parent root methods', function() {
      var msgs = firenext.child('msgs');
      expect(msgs).to.be.an.instanceOf(Firenext);
      expect(msgs.root()).to.be.an.instanceOf(Firenext);
      expect(msgs.parent()).to.be.an.instanceOf(Firenext);
    });
    it('should return a sucessful transaction method', function() {
      return firenext.child('bar').transaction(function() {
        return {date: Date.now()};
      });
    });
    it('should return a failed transaction method', function() {
      return firenext.child('bar').transaction(function() {
        return undefined;
      }).catch(function(err) {
        expect(err.name).to.eq('CommitError');
        expect(err.data).to.be.ok;
      });
    });
    it('should return path', function() {
      expect(firenext.child('foo/bar').path()).to.eq('foo/bar');
    });
    it('should setOnce', function() {
      return firenext.child('child3').setOnce(true).then(function() {
        return firenext.child('child3').setOnce(false);
      }).then(function() {
        return expect(firenext.child('child3').val()).to.eventually.eq(true);
      });
    });
    it('should inc', function() {
      return firenext.child('child4').inc(1).then(function(v) {
        expect(v).to.eq(1);
        return firenext.child('child4').inc(1);
      }).then(function(v) {
        expect(v).to.eq(2);
        return firenext.child('child4').inc(-2);
      }).then(function(v) {
        expect(v).to.eq(0);
        return expect(firenext.child('child4').exists()).to.eventually.eq(false);
      });
    });
    it('should get lock / release lock', function() {
      var lockRef = firenext.child('lock');
      return lockRef.getLock().then(function() {
        wait(10).then(function() {
          return firenext.child('foo').inc(1);
        }).then(function() {
          return lockRef.releaseLock();
        });
        return lockRef.getLock().then(function() {
          expect(firenext.child('foo').inc(1)).to.eventually.eq(2);
        });
      });
    });
  });
  describe('firebase query', function() {
    before(function() {
      return firenext.set({
        child1: {text: 'foo'},
        child2: {text: 'bar'}
      });
    });
    it('should have public query methods', function() {
      ['on', 'off', 'once', 'orderByChild', 'orderByKey', 'orderByPriority', 'startAt', 'endAt', 'equalTo', 'limitToFirst', 'limitToLast', 'limit', 'ref', 'exec', 'val', 'exists', 'inc'].forEach(function(method) {
        expect(firenext).to.respondTo(method);
      });
    });
    it('should exec query', function() {
      return firenext.exec().then(function(results) {
        expect(results).to.be.ok;
        expect(results.numChildren()).to.eq(2);
      });
    });
    it('should val query', function() {
      return firenext.child('child1').val().then(function(results) {
        expect(results).to.deep.eq({text: 'foo'});
      });
    });
    it('should exists query', function() {
      return expect(Promise.all([firenext.child('child1').exists(), firenext.child('childx').exists()])).to.eventually.deep.eq([true, false]);
    });
  });
  describe('firebase datasnapshot', function() {
    before(function() {
      return firenext.set({
        child1: {text: 'foo'},
        child2: {text: 'bar'}
      });
    });
    it('should proxy methods', function() {
      return firenext.exec().then(function(snapshot) {
        expect(snapshot).to.respondTo('val');
        expect(snapshot).to.respondTo('child');
        expect(snapshot).to.respondTo('forEach');
        expect(snapshot).to.respondTo('hasChild');
        expect(snapshot).to.respondTo('hasChildren');
        expect(snapshot).to.respondTo('name');
        expect(snapshot).to.respondTo('key');
        expect(snapshot).to.respondTo('numChildren');
        expect(snapshot).to.respondTo('ref');
        expect(snapshot).to.respondTo('getPriority');
        expect(snapshot).to.respondTo('exportVal');
      });
    });
    it('should return firenext instance', function() {
      return firenext.exec().then(function(snapshot) {
        expect(snapshot.ref()).to.be.an.instanceOf(Firenext);
      });
    });
    it('should map children', function() {
      return firenext.exec().then(function(children) {
        var data = children.map(function(snap, i) {
          return {
            i: i,
            val: snap.val()
          };
        });
        expect(data).to.deep.eq([{
          i: 0,
          val: {text: 'foo'}
        }, {
          i: 1,
          val: {text: 'bar'}
        }]);
      });
    });
    it('should compare two snapshots', function() {
      Promise.all([firenext.child('alanisawesome').set('alanisawesome'), firenext.child('gracehop').set('gracehop'), firenext.child('physicsmarie').set('physicsmarie', 1), firenext.child('dennisplusplus').set('dennisplusplus', 2), firenext.child('doublehelix').setWithPriority('doublehelix', 'dna')]).then(function(arr) {
        var sortedArray = arr.sort(function(a, b) {
          return a.compareTo(b);
        }).map(function(data) {
          return data.name();
        });
        expect(arr[0]).compareTo(null).to.eq(1);
        expect(sortedArray).to.deep.eq(['alanisawesome', 'gracehop', 'physicsmarie', 'dennisplusplus', 'doublehelix']);
      });
    });
  });
});
