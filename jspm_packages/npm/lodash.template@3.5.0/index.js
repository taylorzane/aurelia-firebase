/* */ 
(function(process) {
  var baseCopy = require("lodash._basecopy"),
      baseToString = require("lodash._basetostring"),
      baseValues = require("lodash._basevalues"),
      isIterateeCall = require("lodash._isiterateecall"),
      reInterpolate = require("lodash._reinterpolate"),
      escape = require("lodash.escape"),
      isNative = require("lodash.isnative"),
      keys = require("lodash.keys"),
      restParam = require("lodash.restparam"),
      templateSettings = require("lodash.templatesettings");
  var errorTag = '[object Error]';
  var reEmptyStringLeading = /\b__p \+= '';/g,
      reEmptyStringMiddle = /\b(__p \+=) '' \+/g,
      reEmptyStringTrailing = /(__e\(.*?\)|\b__t\)) \+\n'';/g;
  var reEsTemplate = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g;
  var reNoMatch = /($^)/;
  var reUnescapedString = /['\n\r\u2028\u2029\\]/g;
  var stringEscapes = {
    '\\': '\\',
    "'": "'",
    '\n': 'n',
    '\r': 'r',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };
  function escapeStringChar(chr) {
    return '\\' + stringEscapes[chr];
  }
  function isObjectLike(value) {
    return !!value && typeof value == 'object';
  }
  var arrayProto = Array.prototype,
      objectProto = Object.prototype;
  var hasOwnProperty = objectProto.hasOwnProperty;
  var objToString = objectProto.toString;
  var getOwnPropertySymbols = isNative(getOwnPropertySymbols = Object.getOwnPropertySymbols) && getOwnPropertySymbols,
      push = arrayProto.push,
      preventExtensions = isNative(Object.preventExtensions = Object.preventExtensions) && preventExtensions;
  var nativeAssign = (function() {
    var object = {'1': 0},
        func = preventExtensions && isNative(func = Object.assign) && func;
    try {
      func(preventExtensions(object), 'xo');
    } catch (e) {}
    return !object[1] && func;
  }());
  function assignOwnDefaults(objectValue, sourceValue, key, object) {
    return (objectValue === undefined || !hasOwnProperty.call(object, key)) ? sourceValue : objectValue;
  }
  function assignWith(object, source, customizer) {
    var props = keys(source);
    push.apply(props, getSymbols(source));
    var index = -1,
        length = props.length;
    while (++index < length) {
      var key = props[index],
          value = object[key],
          result = customizer(value, source[key], key, object, source);
      if ((result === result ? (result !== value) : (value === value)) || (value === undefined && !(key in object))) {
        object[key] = result;
      }
    }
    return object;
  }
  var baseAssign = nativeAssign || function(object, source) {
    return source == null ? object : baseCopy(source, getSymbols(source), baseCopy(source, keys(source), object));
  };
  var getSymbols = !getOwnPropertySymbols ? constant([]) : function(object) {
    return getOwnPropertySymbols(toObject(object));
  };
  function toObject(value) {
    return isObject(value) ? value : Object(value);
  }
  function isError(value) {
    return isObjectLike(value) && typeof value.message == 'string' && objToString.call(value) == errorTag;
  }
  function isObject(value) {
    var type = typeof value;
    return type == 'function' || (!!value && type == 'object');
  }
  function template(string, options, otherOptions) {
    var settings = templateSettings.imports._.templateSettings || templateSettings;
    if (otherOptions && isIterateeCall(string, options, otherOptions)) {
      options = otherOptions = null;
    }
    string = baseToString(string);
    options = assignWith(baseAssign({}, otherOptions || options), settings, assignOwnDefaults);
    var imports = assignWith(baseAssign({}, options.imports), settings.imports, assignOwnDefaults),
        importsKeys = keys(imports),
        importsValues = baseValues(imports, importsKeys);
    var isEscaping,
        isEvaluating,
        index = 0,
        interpolate = options.interpolate || reNoMatch,
        source = "__p += '";
    var reDelimiters = RegExp((options.escape || reNoMatch).source + '|' + interpolate.source + '|' + (interpolate === reInterpolate ? reEsTemplate : reNoMatch).source + '|' + (options.evaluate || reNoMatch).source + '|$', 'g');
    var sourceURL = 'sourceURL' in options ? '//# sourceURL=' + options.sourceURL + '\n' : '';
    string.replace(reDelimiters, function(match, escapeValue, interpolateValue, esTemplateValue, evaluateValue, offset) {
      interpolateValue || (interpolateValue = esTemplateValue);
      source += string.slice(index, offset).replace(reUnescapedString, escapeStringChar);
      if (escapeValue) {
        isEscaping = true;
        source += "' +\n__e(" + escapeValue + ") +\n'";
      }
      if (evaluateValue) {
        isEvaluating = true;
        source += "';\n" + evaluateValue + ";\n__p += '";
      }
      if (interpolateValue) {
        source += "' +\n((__t = (" + interpolateValue + ")) == null ? '' : __t) +\n'";
      }
      index = offset + match.length;
      return match;
    });
    source += "';\n";
    var variable = options.variable;
    if (!variable) {
      source = 'with (obj) {\n' + source + '\n}\n';
    }
    source = (isEvaluating ? source.replace(reEmptyStringLeading, '') : source).replace(reEmptyStringMiddle, '$1').replace(reEmptyStringTrailing, '$1;');
    source = 'function(' + (variable || 'obj') + ') {\n' + (variable ? '' : 'obj || (obj = {});\n') + "var __t, __p = ''" + (isEscaping ? ', __e = _.escape' : '') + (isEvaluating ? ', __j = Array.prototype.join;\n' + "function print() { __p += __j.call(arguments, '') }\n" : ';\n') + source + 'return __p\n}';
    var result = attempt(function() {
      return Function(importsKeys, sourceURL + 'return ' + source).apply(undefined, importsValues);
    });
    result.source = source;
    if (isError(result)) {
      throw result;
    }
    return result;
  }
  var attempt = restParam(function(func, args) {
    try {
      return func.apply(undefined, args);
    } catch (e) {
      return isError(e) ? e : new Error(e);
    }
  });
  function constant(value) {
    return function() {
      return value;
    };
  }
  module.exports = template;
})(require("process"));
