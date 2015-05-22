/**
Plain JavaScript replacement of jQuery .extend.
@module extend.js
@license Copyright (c) 2015 | James M. Devlin
*/

define(['./is'], function( is ) {

  var my = function _extend() {

    var options, name, src, copy, copyIsArray, clone, target = arguments[0] || {},
      i = 1,
      length = arguments.length,
      deep = false;

    // Handle a deep copy situation
    if (typeof target === "boolean") {
      deep = target;
      // Skip the boolean and the target
      target = arguments[i] || {};
      i++;
    }

    // Handle case when target is a string or something (possible in deep copy)
    //if (typeof target !== "object" && !jQuery.isFunction(target))
    if (typeof target !== "object" && typeof target !== "function")
      target = {};

    for (; i < length; i++) {
      // Only deal with non-null/undefined values
      if ((options = arguments[i]) !== null) {
        // Extend the base object
        for (name in options) {
          src = target[name];
          copy = options[name];

          // Prevent never-ending loop
          if (target === copy) continue;

          // Recurse if we're merging plain objects or arrays
          if (deep && copy && (is.plainObject(copy) || (copyIsArray = (copy.constructor === Array)))) {
            if (copyIsArray) {
              copyIsArray = false;
              clone = src && (src.constructor === Array) ? src : [];
            } else {
              clone = src && is.plainObject(src) ? src : {};
            }
            // Never move original objects, clone them
            target[name] = _extend(deep, clone, copy);
            // Don't bring in undefined values
          } else if (copy !== undefined) {
            target[name] = copy;
          }
        }
      }
    }

    // Return the modified object
    return target;
  };

  return my;
});
