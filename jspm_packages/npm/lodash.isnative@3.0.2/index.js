/* */ 
(function(process) {
  var funcTag = '[object Function]';
  var reRegExpChars = /[.*+?^${}()|[\]\/\\]/g,
      reHasRegExpChars = RegExp(reRegExpChars.source);
  var reIsHostCtor = /^\[object .+?Constructor\]$/;
  function baseToString(value) {
    if (typeof value == 'string') {
      return value;
    }
    return value == null ? '' : (value + '');
  }
  function isObjectLike(value) {
    return !!value && typeof value == 'object';
  }
  var objectProto = Object.prototype;
  var fnToString = Function.prototype.toString;
  var objToString = objectProto.toString;
  var reIsNative = RegExp('^' + escapeRegExp(objToString).replace(/toString|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');
  function isNative(value) {
    if (value == null) {
      return false;
    }
    if (objToString.call(value) == funcTag) {
      return reIsNative.test(fnToString.call(value));
    }
    return isObjectLike(value) && reIsHostCtor.test(value);
  }
  function escapeRegExp(string) {
    string = baseToString(string);
    return (string && reHasRegExpChars.test(string)) ? string.replace(reRegExpChars, '\\$&') : string;
  }
  module.exports = isNative;
})(require("process"));
