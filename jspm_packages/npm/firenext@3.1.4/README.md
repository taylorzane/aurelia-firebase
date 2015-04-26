# firenext

thin firebase wrapper to use promises and es6 generators.

## Examples

### promises

```js

var Firenext = require('Firenext'),
    firenext = new Firenext('https://some-db.firebaseio.com');

/*!
 *  setup db
 */

firenext.set({
  'user1': {},
  'user2': {},
  'user3': {}
});

/**
 * get user with `username`
 */

function getUser(username) {
  return firenext
    .child(username)
    .then(function(snapshot) {
      return snapshot.val();
    });
}

/*!
 * get your data
 */

Promise
  .all([getUser('user1'), getUser('user2')])
  .then(function(users) {
    console.log(users);
  });

```

### generators

> run with node --harmony

```js

var Firenext = require('Firenext'),
    firenext = new Firenext('https://some-db.firebaseio.com');

/*!
 *  setup db
 */

firenext.set({
  'user1': {},
  'user2': {},
  'user3': {}
});

/**
 * get user with `username`
 */

function getUser(username) {
  return firenext
    .child(username)
    .then(function(snapshot) {
      return snapshot.val();
    });
}

/*!
 * get your data, using co
 */

co(function* () {
   var user1 = yield getUser('user1');
   var user2 = yield getUser('user1');
   console.log(user1, user2);
})

```

# API

## Firenext(firebase)

create a new Firenext constructor using an existing firebase instance

### proxied methods
- [getAuth](http://www.firebase.com/docs/web/api/firebase/getAuth.html)
- [onAuth](http://www.firebase.com/docs/web/api/firebase/onAuth.html)
- [offAuth](http://www.firebase.com/docs/web/api/firebase/offAuth.html)
- [unauth](http://www.firebase.com/docs/web/api/firebase/unauth.html)
- [name](http://www.firebase.com/docs/web/api/firebase/name.html)
- [key](http://www.firebase.com/docs/web/api/firebase/key.html)
- [toString](http://www.firebase.com/docs/web/api/firebase/toString.html)
- [goOnline](http://www.firebase.com/docs/web/api/firebase/goOnline.html)
- [goOffline](http://www.firebase.com/docs/web/api/firebase/goOffline.html)
- [push](http://www.firebase.com/docs/web/api/firebase/push.html)
- [child](http://www.firebase.com/docs/web/api/firebase/child.html)
- [parent](http://www.firebase.com/docs/web/api/firebase/parent.html)
- [root](http://www.firebase.com/docs/web/api/firebase/root.html)

### promisified methods
- [authWithCustomToken](http://www.firebase.com/docs/web/api/firebase/authWithCustomToken.html)
- [authAnonymously](http://www.firebase.com/docs/web/api/firebase/authAnonymously.html)
- [authWithPassword](http://www.firebase.com/docs/web/api/firebase/authWithPassword.html)
- [authWithOAuthPopup](http://www.firebase.com/docs/web/api/firebase/authWithOAuthPopup.html)
- [authWithOAuthRedirect](http://www.firebase.com/docs/web/api/firebase/authWithOAuthRedirect.html)
- [authWithOAuthToken](http://www.firebase.com/docs/web/api/firebase/authWithOAuthToken.html)
- [set](http://www.firebase.com/docs/web/api/firebase/set.html)
- [update](http://www.firebase.com/docs/web/api/firebase/update.html)
- [remove](http://www.firebase.com/docs/web/api/firebase/remove.html)
- [setWithPriority](http://www.firebase.com/docs/web/api/firebase/setWithPriority.html)
- [setPriority](http://www.firebase.com/docs/web/api/firebase/setPriority.html)
- [changeEmail](https://www.firebase.com/docs/web/api/firebase/changeemail.html)

### transaction(updateFunction)

create a transaction and return a promise
the promise is fulfilled with the resulting data or is rejected if the transaction fails

### add(data)
push a new child and return a promise with the data

## Query

### proxied queries methods

- [limit](http://www.firebase.com/docs/web/api/query/limit.html)
- [limitToFirst](http://www.firebase.com/docs/web/api/query/limittofirst.html)
- [limitToLast](http://www.firebase.com/docs/web/api/query/limittolast.html)
- [orderByKey](http://www.firebase.com/docs/web/api/query/orderbykey.html)
- [orderByValue](http://www.firebase.com/docs/web/api/query/orderbyvalue.html)
- [orderByPriority](http://www.firebase.com/docs/web/api/query/orderbypriority.html)
- [startAt](http://www.firebase.com/docs/web/api/query/startat.html)
- [endAt](http://www.firebase.com/docs/web/api/query/endat.html)
- [equalTo](http://www.firebase.com/docs/web/api/query/equalto.html)
- [ref](http://www.firebase.com/docs/web/api/query/ref.html)
- [off](http://www.firebase.com/docs/web/api/query/off.html)

### wrapped methods
these methods wrap their callbacks with Firenext object

- [on](http://www.firebase.com/docs/web/api/query/on.html)
- [once](http://www.firebase.com/docs/web/api/query/once.html)

### exec
Execute a query and return a promise with the snapshot data

## DataSnapshot

### proxied methods
- [val](http://www.firebase.com/docs/web/api/datasnapshot/query/val.html)
- [hasChild](http://www.firebase.com/docs/web/api/datasnapshot/query/hasChild.html)
- [hasChildren](http://www.firebase.com/docs/web/api/datasnapshot/query/hasChildren.html)
- [name](http://www.firebase.com/docs/web/api/datasnapshot/query/name.html)
- [numChildren](http://www.firebase.com/docs/web/api/datasnapshot/query/numChildren.html)
- [getPriority](http://www.firebase.com/docs/web/api/datasnapshot/query/getPriority.html)
- [exportVal](http://www.firebase.com/docs/web/api/datasnapshot/query/exportVal.html)

### wrapped methods
these methods wrap their callbacks with Firenext object
- [child](http://www.firebase.com/docs/web/api/datasnapshot/query/child.html)
- [forEach](http://www.firebase.com/docs/web/api/datasnapshot/query/forEach.html)
- [ref](http://www.firebase.com/docs/web/api/datasnapshot/query/ref.html)

### map(fn)
map children with `fn` and return an array
