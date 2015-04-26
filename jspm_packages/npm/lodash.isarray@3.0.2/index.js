/* */ 
(function(process) {
  var arrayTag = '[object Array]',
      funcTag = '[object Function]';
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
  var nativeIsArray = isNative(nativeIsArray = Array.isArray) && nativeIsArray;
  var MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;
  function isLength(value) {
    return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
  }
  var isArray = nativeIsArray || function(value) {
    return isObjectLike(value) && isLength(value.length) && objToString.call(value) == arrayTag;
  };
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
  module.exports = isArray;
})(require("process"));
