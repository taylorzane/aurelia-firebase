/*!
 * deps
 */

var Firebase = require('firebase');

/**
 * Firenext constructor
 *
 * @param {Firebase|String} ref
 */

function Firenext(ref) {
  this._ref = new Firebase(ref.toString());
}

/**
 * DataSnapshot constructor
 *
 * @param {Firebase} ref
 */

function DataSnapshot(data) {
  this._data = data;
}

/**
 * Query constructor
 *
 * @param {Firebase} query
 */

function Query(query) {
  this._query = query;
}

/*!
 * proxy properties
 */

Firenext.ServerValue = Firebase.ServerValue;

/*!
 * proxy methods
 */

[
  'getAuth',
  'unauth',
  'onAuth',
  'offAuth',
  'name',
  'key',
  'toString',
  'goOnline',
  'goOffline'
].forEach(function (method) {
  Firenext.prototype[method] = function() {
    return this._ref[method].apply(this._ref, arguments);
  };
});

/**
 * return relative url
 *
 * @return {String}
 */

Firenext.prototype.path = function() {
  return decodeURIComponent(this.toString().slice(this.root().toString().length));
};

/**
 * proxy push method
 * @see https://www.firebase.com/docs/web/api/firebase/push.html
 */

Firenext.prototype.push = function push(value, onComplete) {
  return new Firenext(this._ref.push(value, onComplete));
};

/**
 * get a semaphore lock
 */

Firenext.prototype.getLock = function getLock() {
  var registerCancel = this.onDisconnect().remove(),
      ref = this;


  return new Promise(function(fulfill, reject) {

    function acquire(data) {

      // if lock has a value stop here
      if (data.val()) return;

      // make sure we release lock if something bad happens
      registerCancel.catch(reject);

      return registerCancel

        // try to get the lock
        .then(function() {
          return ref.transaction(function(value) {
            if (value) return undefined;
            return true;
          });
        })

        // on success fulfill promise
        .then(function() {
          ref.off('value');
          fulfill();
        });
    }

    ref.on('value', acquire);
  });
};

/**
 * release a semaphore lock
 */

Firenext.prototype.releaseLock = function releaseLock() {
  this.onDisconnect().cancel().then(function() {
    return this.remove();
  }.bind(this));
};

/*!
 * denodeify methods
 */

[
  'set',
  'update',
  'remove',
  'setWithPriority',
  'setPriority',
  'createUser',
  'changeEmail'
].forEach(function (method) {
  Firenext.prototype[method] = function() {
    var args = Array.prototype.slice.call(arguments),
        ref = this._ref;

    return new Promise(function(fulfill, reject) {
      args.push(function(err, val) {
        if (err) return reject(err);
        fulfill(val);
      });

      ref[method].apply(ref, args);
    });
  };
});

/*!
 * denodeify cancel methods
 */

Firenext.prototype.onDisconnect = function() {
  var o = {},
      onDisconnect = this._ref.onDisconnect();

  [
    'set',
    'update',
    'remove',
    'cancel'
  ].forEach(function (method) {
    o[method] = function() {
      var args = Array.prototype.slice.call(arguments);

      return new Promise(function(fulfill, reject) {
        args.push(function(err, val) {
          if (err) return reject(err);
          fulfill(val);
        });

        onDisconnect[method].apply(onDisconnect, args);
      });
    };
  });

  return o;
};

/**
 * denodeify authWithCustomToken method
 * @see https://www.firebase.com/docs/web/api/firebase/authWithCustomToken.html
 */

Firenext.prototype.authWithCustomToken = function authWithCustomToken(authToken, options) {
  var ref = this._ref;

  return new Promise(function(fulfill, reject) {
    ref.authWithCustomToken(authToken, function(err, val) {
      if (err) return reject(err);
      fulfill(val);
    }, options);
  });
};

/**
 * denodeify authAnonymously method
 * @see https://www.firebase.com/docs/web/api/firebase/authAnonymously.html
 */

Firenext.prototype.authAnonymously = function authAnonymously(options) {
  var ref = this._ref;

  return new Promise(function(fulfill, reject) {
    ref.authAnonymously(function(err, val) {
      if (err) return reject(err);
      fulfill(val);
    }, options);
  });
};

/**
 * denodeify authWithPassword method
 * @see https://www.firebase.com/docs/web/api/firebase/authWithPassword.html
 */

Firenext.prototype.authWithPassword = function authWithPassword(credentials, options) {
  var ref = this._ref;

  return new Promise(function(fulfill, reject) {
    ref.authWithPassword(credentials, function(err, val) {
      if (err) return reject(err);
      fulfill(val);
    }, options);
  });
};

/**
 * denodeify authWithOAuthPopup method
 * @see https://www.firebase.com/docs/web/api/firebase/authWithOAuthPopup.html
 */

Firenext.prototype.authWithOAuthPopup = function authWithOAuthPopup(provider, options) {
  var ref = this._ref;

  return new Promise(function(fulfill, reject) {
    ref.authWithOAuthPopup(provider, function(err, val) {
      if (err) return reject(err);
      fulfill(val);
    }, options);
  });
};

/**
 * denodeify authWithOAuthRedirect method
 * @see https://www.firebase.com/docs/web/api/firebase/authWithOAuthRedirect.html
 */

Firenext.prototype.authWithOAuthRedirect = function authWithOAuthRedirect(provider, options) {
  var ref = this._ref;

  return new Promise(function(fulfill, reject) {
    ref.authWithOAuthRedirect(provider, function(err, val) {
      if (err) return reject(err);
      fulfill(val);
    }, options);
  });
};

/**
 * denodeify authWithOAuthToken method
 * @see https://www.firebase.com/docs/web/api/firebase/authWithOAuthToken.html
 */

Firenext.prototype.authWithOAuthToken = function authWithOAuthToken(provider, credentials, options) {
  var ref = this._ref;

  return new Promise(function(fulfill, reject) {
    ref.authWithOAuthRedirect(provider, credentials, function(err, val) {
      if (err) return reject(err);
      fulfill(val);
    }, options);
  });
};

/**
 * proxy child method
 * @see https://www.firebase.com/docs/web/api/firebase/child.html
 */

Firenext.prototype.child = function child(name) {
  return new Firenext(this._ref.child(name));
};

/**
 * proxy parent method
 * @see https://www.firebase.com/docs/web/api/firebase/parent.html
 */

Firenext.prototype.parent = function parent() {
  return new Firenext(this._ref.parent());
};

/**
 * proxy root method
 * @see https://www.firebase.com/docs/web/api/firebase/root.html
 */

Firenext.prototype.root = function root() {
  return new Firenext(this._ref.root());
};

function CommitError(data) {
  Error.call(this);
  this.message = 'Failed to commit transaction on ' + data.ref().toString();
  this.name = 'CommitError';
  this.data = data;
}

CommitError.prototype = Object.create(Error.prototype);
CommitError.prototype.constructor = CommitError;

/**
 * proxy transaction method
 * @see https://www.firebase.com/docs/web/api/firebase/child.html
 */

Firenext.prototype.transaction = function transaction(updateFunction, applyLocally) {
  var ref = this._ref;

  return new Promise(function(fulfill, reject) {
    ref.transaction(updateFunction, function(err, commited, snapshot) {
      if (err) return reject(err);
      if (!commited) return reject(new CommitError(new DataSnapshot(snapshot)));
      fulfill(new DataSnapshot(snapshot));
    }, applyLocally);
  });
};

/**
 * Only set data if it's not already there
 * @return Promise
 */

Firenext.prototype.setOnce = function(data) {
  return this.transaction(function(currentData) {
    if (currentData === null) { return data; }
    return currentData;
  });
};

/**
 * Increment value by `n`.
 * When no value, will set initial value to `n`
 * When result is 0, the child will be removed
 * @return Promise
 */

Firenext.prototype.inc = function(n) {

  function updateFunction(current) {
    var result = (current || 0) + n;
    return result || null;
  }

  return this.transaction(updateFunction)
    .then(function(data) {
      return data.val() || 0;
    });
};

/**
 * add method, similar to push but return promise
 * @see https://www.firebase.com/docs/web/api/firebase/push.html
 */

Firenext.prototype.add = function add(data) {
  return new Promise(function(fulfill, reject) {
    var child = this.push(data, function(err) {
      if (err) return reject(err);
      fulfill(child);
    });
  }.bind(this));
};

/*!
 * proxy query methods
 */

[
  'orderByChild',
  'orderByKey',
  'orderByPriority',
  'orderByValue',
  'startAt',
  'endAt',
  'equalTo',
  'limitToFirst',
  'limitToLast',
  'limit'
].forEach(function (method) {
  Query.prototype[method] = function() {
    return new Query(this._query[method].apply(this._query, arguments));
  };
});

/**
 * proxy ref method
 * @see https://www.firebase.com/docs/web/api/query/ref.html
 */

Query.prototype.ref = function ref() {
  return this._query.ref();
};

/**
 * proxy on method
 * @see https://www.firebase.com/docs/web/api/query/on.html
 */

Query.prototype.on = function on(eventType, callback, cancelCallback, context) {
  var wrappedCallback = callback && function(snapshot, str) {
    return callback(new DataSnapshot(snapshot), str);
  };

  return this._query.on(eventType, wrappedCallback, cancelCallback, context);
};

/**
 * proxy once method
 * @see https://www.firebase.com/docs/web/api/query/on.html
 */

Query.prototype.once = function once(eventType, successCallback, failureCallback, context) {
  var wrappedCallback = successCallback && function(snapshot, str) {
    return successCallback(new DataSnapshot(snapshot), str);
  };

  return this._query.once(eventType, wrappedCallback, failureCallback, context);
};

/**
 * proxy off method
 * @see https://www.firebase.com/docs/web/api/query/off.html
 */

Query.prototype.off = function off(eventType, callback, context) {
  return this._query.off(eventType, callback, context);
};

/**
 * exec query and return promise of a snapshot
 * @return Promise
 */

Query.prototype.exec = function exec() {
  return new Promise(function(fulfill, reject) {
    this.once('value', fulfill, reject);
  }.bind(this));
};

/**
 * exec query and return promise of a snapshot value
 * @return Promise
 */

Query.prototype.val = function() {
  return this.exec().then(function(data) {
    return data.val();
  });
};

/**
 * exec query and verify that data exists at this node
 * @return Promise
 */

Query.prototype.exists = function() {
  return this.exec().then(function(data) {
    return data.exists();
  });
};

/*!
 * proxy snapshot methods
 */

[
  'val',
  'hasChild',
  'hasChildren',
  'key',
  'name',
  'numChildren',
  'getPriority',
  'exportVal',
  'exists'
].forEach(function(name) {
  DataSnapshot.prototype[name] = function() {
    return this._data[name].apply(this._data, arguments);
  };
});

/**
 * proxy child method
 * @see https://www.firebase.com/docs/web/api/datasnapshot/child.html
 */

DataSnapshot.prototype.child = function child(childPath) {
  return new DataSnapshot(this._data.child(childPath));
};

/**
 * proxy forEach method
 * @see https://www.firebase.com/docs/web/api/datasnapshot/foreach.html
 */

DataSnapshot.prototype.forEach = function forEach(childAction) {
  var i = 0;
  return this._data.forEach(function (child) {
    return childAction(new DataSnapshot(child), i++);
  });
};

/**
 * map datasnapchot
 */

DataSnapshot.prototype.map = function map(childAction) {
  var arr = [];

  this.forEach(function (child, i) {
    arr.push(childAction(child, i));
  });

  return arr;
};

/**
 * proxy ref method
 * @see https://www.firebase.com/docs/web/api/datasnapshot/ref.html
 */

DataSnapshot.prototype.ref = function() {
  return new Firenext(this._data.ref());
};

/**
 * compare two snapshots
 * @see https://www.firebase.com/docs/web/guide/retrieving-data.html#section-ordered-data
 * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
 *
 * @param {DataSnapshot} a
 * @param {DataSnapshot} b
 * @return {Number}
 */

function compare(a, b) {

  // when priority is identical
  if (a.getPriority() === b.getPriority()) {
     if (a.key() < b.key()) return -1;
     if (a.key() > b.key()) return 1;
     return 0;
  }

  // when priority is not set
  if (!a.getPriority()) return -1;
  if (!b.getPriority()) return 1;

  // when priority is set
  if (a.getPriority() < b.getPriority()) return -1;
  if (a.getPriority() > b.getPriority()) return 1;

  return 0;
}

/*!
 * compare to other snapshot
 *
 * @param  {DataSnapshot} other
 * @return {Number}
 */

DataSnapshot.prototype.compareTo = function compareTo(other) {
  if (!other) return 1;
  return compare(this, other);
};

/*!
 * attch methods to Firenext
 */

[
  'orderByChild',
  'orderByKey',
  'orderByPriority',
  'orderByValue',
  'startAt',
  'endAt',
  'equalTo',
  'limitToFirst',
  'limitToLast',
  'limit',
  'ref',
  'on',
  'once',
  'off',
  'exec',
  'exists',
  'val'
].forEach(function (method) {
  Firenext.prototype[method] = function() {
    var query = new Query(this._ref);
    return query[method].apply(query, arguments);
  };
});

/*!
 * exports
 */

module.exports = Firenext;