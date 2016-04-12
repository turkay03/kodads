(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

exports.__esModule = true;

var _import = require('./handlebars/base');

var base = _interopRequireWildcard(_import);

// Each of these augment the Handlebars object. No need to setup here.
// (This is done to easily share code between commonjs and browse envs)

var _SafeString = require('./handlebars/safe-string');

var _SafeString2 = _interopRequireWildcard(_SafeString);

var _Exception = require('./handlebars/exception');

var _Exception2 = _interopRequireWildcard(_Exception);

var _import2 = require('./handlebars/utils');

var Utils = _interopRequireWildcard(_import2);

var _import3 = require('./handlebars/runtime');

var runtime = _interopRequireWildcard(_import3);

var _noConflict = require('./handlebars/no-conflict');

var _noConflict2 = _interopRequireWildcard(_noConflict);

// For compatibility and usage outside of module systems, make the Handlebars object a namespace
function create() {
  var hb = new base.HandlebarsEnvironment();

  Utils.extend(hb, base);
  hb.SafeString = _SafeString2['default'];
  hb.Exception = _Exception2['default'];
  hb.Utils = Utils;
  hb.escapeExpression = Utils.escapeExpression;

  hb.VM = runtime;
  hb.template = function (spec) {
    return runtime.template(spec, hb);
  };

  return hb;
}

var inst = create();
inst.create = create;

_noConflict2['default'](inst);

inst['default'] = inst;

exports['default'] = inst;
module.exports = exports['default'];
},{"./handlebars/base":2,"./handlebars/exception":3,"./handlebars/no-conflict":4,"./handlebars/runtime":5,"./handlebars/safe-string":6,"./handlebars/utils":7}],2:[function(require,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

exports.__esModule = true;
exports.HandlebarsEnvironment = HandlebarsEnvironment;
exports.createFrame = createFrame;

var _import = require('./utils');

var Utils = _interopRequireWildcard(_import);

var _Exception = require('./exception');

var _Exception2 = _interopRequireWildcard(_Exception);

var VERSION = '3.0.1';
exports.VERSION = VERSION;
var COMPILER_REVISION = 6;

exports.COMPILER_REVISION = COMPILER_REVISION;
var REVISION_CHANGES = {
  1: '<= 1.0.rc.2', // 1.0.rc.2 is actually rev2 but doesn't report it
  2: '== 1.0.0-rc.3',
  3: '== 1.0.0-rc.4',
  4: '== 1.x.x',
  5: '== 2.0.0-alpha.x',
  6: '>= 2.0.0-beta.1'
};

exports.REVISION_CHANGES = REVISION_CHANGES;
var isArray = Utils.isArray,
    isFunction = Utils.isFunction,
    toString = Utils.toString,
    objectType = '[object Object]';

function HandlebarsEnvironment(helpers, partials) {
  this.helpers = helpers || {};
  this.partials = partials || {};

  registerDefaultHelpers(this);
}

HandlebarsEnvironment.prototype = {
  constructor: HandlebarsEnvironment,

  logger: logger,
  log: log,

  registerHelper: function registerHelper(name, fn) {
    if (toString.call(name) === objectType) {
      if (fn) {
        throw new _Exception2['default']('Arg not supported with multiple helpers');
      }
      Utils.extend(this.helpers, name);
    } else {
      this.helpers[name] = fn;
    }
  },
  unregisterHelper: function unregisterHelper(name) {
    delete this.helpers[name];
  },

  registerPartial: function registerPartial(name, partial) {
    if (toString.call(name) === objectType) {
      Utils.extend(this.partials, name);
    } else {
      if (typeof partial === 'undefined') {
        throw new _Exception2['default']('Attempting to register a partial as undefined');
      }
      this.partials[name] = partial;
    }
  },
  unregisterPartial: function unregisterPartial(name) {
    delete this.partials[name];
  }
};

function registerDefaultHelpers(instance) {
  instance.registerHelper('helperMissing', function () {
    if (arguments.length === 1) {
      // A missing field in a {{foo}} constuct.
      return undefined;
    } else {
      // Someone is actually trying to call something, blow up.
      throw new _Exception2['default']('Missing helper: "' + arguments[arguments.length - 1].name + '"');
    }
  });

  instance.registerHelper('blockHelperMissing', function (context, options) {
    var inverse = options.inverse,
        fn = options.fn;

    if (context === true) {
      return fn(this);
    } else if (context === false || context == null) {
      return inverse(this);
    } else if (isArray(context)) {
      if (context.length > 0) {
        if (options.ids) {
          options.ids = [options.name];
        }

        return instance.helpers.each(context, options);
      } else {
        return inverse(this);
      }
    } else {
      if (options.data && options.ids) {
        var data = createFrame(options.data);
        data.contextPath = Utils.appendContextPath(options.data.contextPath, options.name);
        options = { data: data };
      }

      return fn(context, options);
    }
  });

  instance.registerHelper('each', function (context, options) {
    if (!options) {
      throw new _Exception2['default']('Must pass iterator to #each');
    }

    var fn = options.fn,
        inverse = options.inverse,
        i = 0,
        ret = '',
        data = undefined,
        contextPath = undefined;

    if (options.data && options.ids) {
      contextPath = Utils.appendContextPath(options.data.contextPath, options.ids[0]) + '.';
    }

    if (isFunction(context)) {
      context = context.call(this);
    }

    if (options.data) {
      data = createFrame(options.data);
    }

    function execIteration(field, index, last) {
      if (data) {
        data.key = field;
        data.index = index;
        data.first = index === 0;
        data.last = !!last;

        if (contextPath) {
          data.contextPath = contextPath + field;
        }
      }

      ret = ret + fn(context[field], {
        data: data,
        blockParams: Utils.blockParams([context[field], field], [contextPath + field, null])
      });
    }

    if (context && typeof context === 'object') {
      if (isArray(context)) {
        for (var j = context.length; i < j; i++) {
          execIteration(i, i, i === context.length - 1);
        }
      } else {
        var priorKey = undefined;

        for (var key in context) {
          if (context.hasOwnProperty(key)) {
            // We're running the iterations one step out of sync so we can detect
            // the last iteration without have to scan the object twice and create
            // an itermediate keys array.
            if (priorKey) {
              execIteration(priorKey, i - 1);
            }
            priorKey = key;
            i++;
          }
        }
        if (priorKey) {
          execIteration(priorKey, i - 1, true);
        }
      }
    }

    if (i === 0) {
      ret = inverse(this);
    }

    return ret;
  });

  instance.registerHelper('if', function (conditional, options) {
    if (isFunction(conditional)) {
      conditional = conditional.call(this);
    }

    // Default behavior is to render the positive path if the value is truthy and not empty.
    // The `includeZero` option may be set to treat the condtional as purely not empty based on the
    // behavior of isEmpty. Effectively this determines if 0 is handled by the positive path or negative.
    if (!options.hash.includeZero && !conditional || Utils.isEmpty(conditional)) {
      return options.inverse(this);
    } else {
      return options.fn(this);
    }
  });

  instance.registerHelper('unless', function (conditional, options) {
    return instance.helpers['if'].call(this, conditional, { fn: options.inverse, inverse: options.fn, hash: options.hash });
  });

  instance.registerHelper('with', function (context, options) {
    if (isFunction(context)) {
      context = context.call(this);
    }

    var fn = options.fn;

    if (!Utils.isEmpty(context)) {
      if (options.data && options.ids) {
        var data = createFrame(options.data);
        data.contextPath = Utils.appendContextPath(options.data.contextPath, options.ids[0]);
        options = { data: data };
      }

      return fn(context, options);
    } else {
      return options.inverse(this);
    }
  });

  instance.registerHelper('log', function (message, options) {
    var level = options.data && options.data.level != null ? parseInt(options.data.level, 10) : 1;
    instance.log(level, message);
  });

  instance.registerHelper('lookup', function (obj, field) {
    return obj && obj[field];
  });
}

var logger = {
  methodMap: { 0: 'debug', 1: 'info', 2: 'warn', 3: 'error' },

  // State enum
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3,
  level: 1,

  // Can be overridden in the host environment
  log: function log(level, message) {
    if (typeof console !== 'undefined' && logger.level <= level) {
      var method = logger.methodMap[level];
      (console[method] || console.log).call(console, message); // eslint-disable-line no-console
    }
  }
};

exports.logger = logger;
var log = logger.log;

exports.log = log;

function createFrame(object) {
  var frame = Utils.extend({}, object);
  frame._parent = object;
  return frame;
}

/* [args, ]options */
},{"./exception":3,"./utils":7}],3:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var errorProps = ['description', 'fileName', 'lineNumber', 'message', 'name', 'number', 'stack'];

function Exception(message, node) {
  var loc = node && node.loc,
      line = undefined,
      column = undefined;
  if (loc) {
    line = loc.start.line;
    column = loc.start.column;

    message += ' - ' + line + ':' + column;
  }

  var tmp = Error.prototype.constructor.call(this, message);

  // Unfortunately errors are not enumerable in Chrome (at least), so `for prop in tmp` doesn't work.
  for (var idx = 0; idx < errorProps.length; idx++) {
    this[errorProps[idx]] = tmp[errorProps[idx]];
  }

  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, Exception);
  }

  if (loc) {
    this.lineNumber = line;
    this.column = column;
  }
}

Exception.prototype = new Error();

exports['default'] = Exception;
module.exports = exports['default'];
},{}],4:[function(require,module,exports){
(function (global){
'use strict';

exports.__esModule = true;
/*global window */

exports['default'] = function (Handlebars) {
  /* istanbul ignore next */
  var root = typeof global !== 'undefined' ? global : window,
      $Handlebars = root.Handlebars;
  /* istanbul ignore next */
  Handlebars.noConflict = function () {
    if (root.Handlebars === Handlebars) {
      root.Handlebars = $Handlebars;
    }
  };
};

module.exports = exports['default'];
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],5:[function(require,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

exports.__esModule = true;
exports.checkRevision = checkRevision;

// TODO: Remove this line and break up compilePartial

exports.template = template;
exports.wrapProgram = wrapProgram;
exports.resolvePartial = resolvePartial;
exports.invokePartial = invokePartial;
exports.noop = noop;

var _import = require('./utils');

var Utils = _interopRequireWildcard(_import);

var _Exception = require('./exception');

var _Exception2 = _interopRequireWildcard(_Exception);

var _COMPILER_REVISION$REVISION_CHANGES$createFrame = require('./base');

function checkRevision(compilerInfo) {
  var compilerRevision = compilerInfo && compilerInfo[0] || 1,
      currentRevision = _COMPILER_REVISION$REVISION_CHANGES$createFrame.COMPILER_REVISION;

  if (compilerRevision !== currentRevision) {
    if (compilerRevision < currentRevision) {
      var runtimeVersions = _COMPILER_REVISION$REVISION_CHANGES$createFrame.REVISION_CHANGES[currentRevision],
          compilerVersions = _COMPILER_REVISION$REVISION_CHANGES$createFrame.REVISION_CHANGES[compilerRevision];
      throw new _Exception2['default']('Template was precompiled with an older version of Handlebars than the current runtime. ' + 'Please update your precompiler to a newer version (' + runtimeVersions + ') or downgrade your runtime to an older version (' + compilerVersions + ').');
    } else {
      // Use the embedded version info since the runtime doesn't know about this revision yet
      throw new _Exception2['default']('Template was precompiled with a newer version of Handlebars than the current runtime. ' + 'Please update your runtime to a newer version (' + compilerInfo[1] + ').');
    }
  }
}

function template(templateSpec, env) {
  /* istanbul ignore next */
  if (!env) {
    throw new _Exception2['default']('No environment passed to template');
  }
  if (!templateSpec || !templateSpec.main) {
    throw new _Exception2['default']('Unknown template object: ' + typeof templateSpec);
  }

  // Note: Using env.VM references rather than local var references throughout this section to allow
  // for external users to override these as psuedo-supported APIs.
  env.VM.checkRevision(templateSpec.compiler);

  function invokePartialWrapper(partial, context, options) {
    if (options.hash) {
      context = Utils.extend({}, context, options.hash);
    }

    partial = env.VM.resolvePartial.call(this, partial, context, options);
    var result = env.VM.invokePartial.call(this, partial, context, options);

    if (result == null && env.compile) {
      options.partials[options.name] = env.compile(partial, templateSpec.compilerOptions, env);
      result = options.partials[options.name](context, options);
    }
    if (result != null) {
      if (options.indent) {
        var lines = result.split('\n');
        for (var i = 0, l = lines.length; i < l; i++) {
          if (!lines[i] && i + 1 === l) {
            break;
          }

          lines[i] = options.indent + lines[i];
        }
        result = lines.join('\n');
      }
      return result;
    } else {
      throw new _Exception2['default']('The partial ' + options.name + ' could not be compiled when running in runtime-only mode');
    }
  }

  // Just add water
  var container = {
    strict: function strict(obj, name) {
      if (!(name in obj)) {
        throw new _Exception2['default']('"' + name + '" not defined in ' + obj);
      }
      return obj[name];
    },
    lookup: function lookup(depths, name) {
      var len = depths.length;
      for (var i = 0; i < len; i++) {
        if (depths[i] && depths[i][name] != null) {
          return depths[i][name];
        }
      }
    },
    lambda: function lambda(current, context) {
      return typeof current === 'function' ? current.call(context) : current;
    },

    escapeExpression: Utils.escapeExpression,
    invokePartial: invokePartialWrapper,

    fn: function fn(i) {
      return templateSpec[i];
    },

    programs: [],
    program: function program(i, data, declaredBlockParams, blockParams, depths) {
      var programWrapper = this.programs[i],
          fn = this.fn(i);
      if (data || depths || blockParams || declaredBlockParams) {
        programWrapper = wrapProgram(this, i, fn, data, declaredBlockParams, blockParams, depths);
      } else if (!programWrapper) {
        programWrapper = this.programs[i] = wrapProgram(this, i, fn);
      }
      return programWrapper;
    },

    data: function data(value, depth) {
      while (value && depth--) {
        value = value._parent;
      }
      return value;
    },
    merge: function merge(param, common) {
      var obj = param || common;

      if (param && common && param !== common) {
        obj = Utils.extend({}, common, param);
      }

      return obj;
    },

    noop: env.VM.noop,
    compilerInfo: templateSpec.compiler
  };

  function ret(context) {
    var options = arguments[1] === undefined ? {} : arguments[1];

    var data = options.data;

    ret._setup(options);
    if (!options.partial && templateSpec.useData) {
      data = initData(context, data);
    }
    var depths = undefined,
        blockParams = templateSpec.useBlockParams ? [] : undefined;
    if (templateSpec.useDepths) {
      depths = options.depths ? [context].concat(options.depths) : [context];
    }

    return templateSpec.main.call(container, context, container.helpers, container.partials, data, blockParams, depths);
  }
  ret.isTop = true;

  ret._setup = function (options) {
    if (!options.partial) {
      container.helpers = container.merge(options.helpers, env.helpers);

      if (templateSpec.usePartial) {
        container.partials = container.merge(options.partials, env.partials);
      }
    } else {
      container.helpers = options.helpers;
      container.partials = options.partials;
    }
  };

  ret._child = function (i, data, blockParams, depths) {
    if (templateSpec.useBlockParams && !blockParams) {
      throw new _Exception2['default']('must pass block params');
    }
    if (templateSpec.useDepths && !depths) {
      throw new _Exception2['default']('must pass parent depths');
    }

    return wrapProgram(container, i, templateSpec[i], data, 0, blockParams, depths);
  };
  return ret;
}

function wrapProgram(container, i, fn, data, declaredBlockParams, blockParams, depths) {
  function prog(context) {
    var options = arguments[1] === undefined ? {} : arguments[1];

    return fn.call(container, context, container.helpers, container.partials, options.data || data, blockParams && [options.blockParams].concat(blockParams), depths && [context].concat(depths));
  }
  prog.program = i;
  prog.depth = depths ? depths.length : 0;
  prog.blockParams = declaredBlockParams || 0;
  return prog;
}

function resolvePartial(partial, context, options) {
  if (!partial) {
    partial = options.partials[options.name];
  } else if (!partial.call && !options.name) {
    // This is a dynamic partial that returned a string
    options.name = partial;
    partial = options.partials[partial];
  }
  return partial;
}

function invokePartial(partial, context, options) {
  options.partial = true;

  if (partial === undefined) {
    throw new _Exception2['default']('The partial ' + options.name + ' could not be found');
  } else if (partial instanceof Function) {
    return partial(context, options);
  }
}

function noop() {
  return '';
}

function initData(context, data) {
  if (!data || !('root' in data)) {
    data = data ? _COMPILER_REVISION$REVISION_CHANGES$createFrame.createFrame(data) : {};
    data.root = context;
  }
  return data;
}
},{"./base":2,"./exception":3,"./utils":7}],6:[function(require,module,exports){
'use strict';

exports.__esModule = true;
// Build out our basic SafeString type
function SafeString(string) {
  this.string = string;
}

SafeString.prototype.toString = SafeString.prototype.toHTML = function () {
  return '' + this.string;
};

exports['default'] = SafeString;
module.exports = exports['default'];
},{}],7:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports.extend = extend;

// Older IE versions do not directly support indexOf so we must implement our own, sadly.
exports.indexOf = indexOf;
exports.escapeExpression = escapeExpression;
exports.isEmpty = isEmpty;
exports.blockParams = blockParams;
exports.appendContextPath = appendContextPath;
var escape = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  '\'': '&#x27;',
  '`': '&#x60;'
};

var badChars = /[&<>"'`]/g,
    possible = /[&<>"'`]/;

function escapeChar(chr) {
  return escape[chr];
}

function extend(obj /* , ...source */) {
  for (var i = 1; i < arguments.length; i++) {
    for (var key in arguments[i]) {
      if (Object.prototype.hasOwnProperty.call(arguments[i], key)) {
        obj[key] = arguments[i][key];
      }
    }
  }

  return obj;
}

var toString = Object.prototype.toString;

exports.toString = toString;
// Sourced from lodash
// https://github.com/bestiejs/lodash/blob/master/LICENSE.txt
/*eslint-disable func-style, no-var */
var isFunction = function isFunction(value) {
  return typeof value === 'function';
};
// fallback for older versions of Chrome and Safari
/* istanbul ignore next */
if (isFunction(/x/)) {
  exports.isFunction = isFunction = function (value) {
    return typeof value === 'function' && toString.call(value) === '[object Function]';
  };
}
var isFunction;
exports.isFunction = isFunction;
/*eslint-enable func-style, no-var */

/* istanbul ignore next */
var isArray = Array.isArray || function (value) {
  return value && typeof value === 'object' ? toString.call(value) === '[object Array]' : false;
};exports.isArray = isArray;

function indexOf(array, value) {
  for (var i = 0, len = array.length; i < len; i++) {
    if (array[i] === value) {
      return i;
    }
  }
  return -1;
}

function escapeExpression(string) {
  if (typeof string !== 'string') {
    // don't escape SafeStrings, since they're already safe
    if (string && string.toHTML) {
      return string.toHTML();
    } else if (string == null) {
      return '';
    } else if (!string) {
      return string + '';
    }

    // Force a string conversion as this will be done by the append regardless and
    // the regex test will do this transparently behind the scenes, causing issues if
    // an object's to string has escaped characters in it.
    string = '' + string;
  }

  if (!possible.test(string)) {
    return string;
  }
  return string.replace(badChars, escapeChar);
}

function isEmpty(value) {
  if (!value && value !== 0) {
    return true;
  } else if (isArray(value) && value.length === 0) {
    return true;
  } else {
    return false;
  }
}

function blockParams(params, ids) {
  params.path = ids;
  return params;
}

function appendContextPath(contextPath, id) {
  return (contextPath ? contextPath + '.' : '') + id;
}
},{}],8:[function(require,module,exports){
// Create a simple path alias to allow browserify to resolve
// the runtime on a supported path.
module.exports = require('./dist/cjs/handlebars.runtime')['default'];

},{"./dist/cjs/handlebars.runtime":1}],9:[function(require,module,exports){
module.exports = require("handlebars/runtime")["default"];

},{"handlebars/runtime":8}],10:[function(require,module,exports){
'use strict';
//var $ = require('jquery');
window.dyg={};
window.segmentify = require("./modules/segmentify/segmentify");
window.dyg.pubsub = require("./modules/utility/pubsub");
window.dyg.millipiyango = require("./modules/millipiyango/millipiyango");
var moduleLocator = require("./moduleLocator/moduleLocator");
moduleLocator.init()
/*
var user = require("./modules/utility/user");
user.init();
*/


},{"./moduleLocator/moduleLocator":11,"./modules/millipiyango/millipiyango":23,"./modules/segmentify/segmentify":30,"./modules/utility/pubsub":39}],11:[function(require,module,exports){
'use strict';

var page = require("../modules/utility/page");
var device = require("../modules/utility/device");
var engageya = require("../modules/engageya/engageya");
var mixpanel = require("../modules/mixpanel/mixpanel");
var pv = require("../modules/pv/pv");

require('../modules/idSpecific/1bb8feb5-10b6-43cf-9c2a-d35826d6d9e8.js');require('../modules/idSpecific/6ba0a20b-b1ac-492a-81d1-5518c82830b5.js');require('../modules/idSpecific/76cd67ee-1e90-4c8f-8238-2e8bfee68284.js');require('../modules/idSpecific/98f107f0-0f1a-496b-806a-8460f78383ef.js');require('../modules/idSpecific/a308bebe-3d9b-4c1f-a98b-702fdbf96f3c.js');require('../modules/idSpecific/cd99a78e-425b-4039-aad9-3e8a8fafa406.js');require('../modules/idSpecific/df234e19-cbc3-49ee-a09d-1a8c02f1086f.js');

exports.init = function() {

//TO DO: remove
if (false && page.ENV()!="production") {
    var millipiyango = require("../modules/millipiyango/millipiyango");
      millipiyango.renderMilliPiyangoWidgetBefore(".socialLikes");
}


    if (page.isArticle()) {
        try {
            var relatedModule = require("../modules/idSpecific/" + page.getMetaTagByProperty("dyg:target") + ".js");
            if (relatedModule) {
                relatedModule.init();
            }
        }
        catch (e) {
            console.log(e);
        }

        pv.init();

        engageya.renderSubStoryRecommendationWidget();
    }
    
    if (page.isMainPage()) {
        window.segmentify.bindHeadlineClickEventHandlers();
        if (page.ENV() == 'staging') {
            //engageya.renderSubSiteHeadlineRecommendationWidget();
        }
    }
    if (page.isGallery()) {
        if (page.ENV() == 'staging'|| page.ENV() == 'production') {
            engageya.renderSubGalleryRecommendationWidget();
            
        }
    }
    if (page.isVideo()) {
        if (page.ENV() == 'xstaging' || page.ENV() == 'xproduction') {
            //engageya.renderSubVideoRecommendationWidget();
        }
    }
    //page.onCategory("saglik")
    if (page.ENV() == 'staging') {
        mixpanel.init();
    }
};
},{"../modules/engageya/engageya":12,"../modules/idSpecific/1bb8feb5-10b6-43cf-9c2a-d35826d6d9e8.js":15,"../modules/idSpecific/6ba0a20b-b1ac-492a-81d1-5518c82830b5.js":16,"../modules/idSpecific/76cd67ee-1e90-4c8f-8238-2e8bfee68284.js":17,"../modules/idSpecific/98f107f0-0f1a-496b-806a-8460f78383ef.js":18,"../modules/idSpecific/a308bebe-3d9b-4c1f-a98b-702fdbf96f3c.js":19,"../modules/idSpecific/cd99a78e-425b-4039-aad9-3e8a8fafa406.js":20,"../modules/idSpecific/df234e19-cbc3-49ee-a09d-1a8c02f1086f.js":21,"../modules/millipiyango/millipiyango":23,"../modules/mixpanel/mixpanel":28,"../modules/pv/pv":29,"../modules/utility/device":37,"../modules/utility/page":38}],12:[function(require,module,exports){
'use strict';

var page = require("../utility/page");
var device = require("../utility/device");

var bindWidgetClickEventHandlers = function() {
    $(document).ready(function() {
        $(".ew_tracking_block a").off('click.ew_track').on('click.ew_track', function(e) {
            var $this = $(this);
            var href = $this.attr("href");
            var action = href.indexOf("http%3A%2F%2Fwww.ntv.com.tr") > -1 ? "ew-widget-item-internal-click" : "ew-widget-item-external-click";
            TrackWidgetItemClick(action, href);
        });
    });
};

var TrackWidgetItemClick = function(_action, _href) {
    return;
    var action = _action;
    var href = _href;
    ga('ntvcomtr.send', 'event', {
        'eventCategory': 'ew-widget-item-click',
        'eventAction': action,
        'eventLabel': href,
        'hitCallback': function() {
            console.log("sent : {category:'" + "ew-widget-item-click" + "', action:'" + action + "', label:'" + href + "'}");
        },
        'hitCallbackFail': function() {
            console.log("not sent : {category:'" + "ew-widget-item-click" + "', action:'" + action + "', label:'" + href + "'}");
            TrackWidgetItemClick(action,href);
        }
    });
}


var TrackWidgetImpression = function(_action, _label) {
    return;
    var action = _action;
    var label = _label;
    bindWidgetClickEventHandlers();
    ga('ntvcomtr.send', 'event', {
        'eventCategory': 'ew-widget-impression',
        'eventAction': action,
        'eventLabel': label,
        'hitCallback': function() {
            console.log("{category:'" + "ew-widget-impression" + "', action:'" + action + "', label:'" + label + "'}");
        },
        'hitCallbackFail': function() {
            TrackWidgetImpression(action, label);
        }
    });
};


exports.renderSubSiteHeadlineRecommendationWidget = function() {
    $(document).ready(function() {
            var $SiteHeadline = $(".large.headline.at.homepage:first");
            var temp = require("./templates/SubSiteHeadlineRecomendationWidget.hbs");
            var data = {};
            var rv = $(temp(data));
            $SiteHeadline.after(rv);

            TrackWidgetImpression("subsiteheadline", window.location.href);
            
        (function(E,n,G,A,g,Y,a){E['EngageyaObject']=g;E[g]=E[g]||function(){ (E[g].q=E[g].q||[]).push(arguments)},E[g].l=1*new Date();Y=n.createElement(G), a=n.getElementsByTagName(G)[0];Y.async=1;Y.src=A;a.parentNode.insertBefore(Y,a)})(window,document,'script','//widget.engageya.com/engageya_loader.js','__engWidget');
        __engWidget('createWidget',{wwei:'SubSiteHeadlineRecomendationWidget',pubid:158041,webid:116302,wid:84336});    
       
     });
};

exports.renderSubStoryRecommendationWidget = function() {
    
        $(window).on("load", function() {
            var currentarticleurl = $("aside div.story-nav ol li.current a").attr("href");
            //console.log(currentarticleurl);
            var caid = currentarticleurl.substr(currentarticleurl.indexOf(",") + 1);
            //console.log(caid);
            var currentarticle = $("article[data-url*='" + caid + "']");
            //console.log(currentarticle);
            if (currentarticle.has("#EW_" + caid).length === 0) {
                currentarticle.append(function() {
                    return "<div id='EW_" + caid + "' class='ew-substory ew_tracking_block' style='display:block;'></div>";
                });
                //console.log("EW_" + caid + " : substory div added.");
            }
            //console.log("EW_" + caid + " : Engageya call made");
            
            TrackWidgetImpression("substory-onload",window.location.href);
            
            (function(E, n, G, A, g, Y, a) {
                E['EngageyaObject'] = g;
                E[g] = E[g] || function() {
                    (E[g].q = E[g].q || []).push(arguments)
                }, E[g].l = 1 * new Date();
                Y = n.createElement(G), a = n.getElementsByTagName(G)[0];
                Y.async = 1;
                Y.src = A;
                a.parentNode.insertBefore(Y, a)
            })(window, document, 'script', '//widget.engageya.com/engageya_loader.js', '__engWidget');
            __engWidget('createWidget', {
                wwei: 'EW_' + caid,
                pubid: 158041,
                webid: 116302,
                wid: 77759
            });
            
             
        });

    $(window).on('popstate', function(e) {
        var currentarticleurl = $("aside div.story-nav ol li.current a").attr("href");
        //console.log(currentarticleurl);
        var caid = currentarticleurl.substr(currentarticleurl.indexOf(",") + 1);
        //console.log(caid);
        var currentarticle = $("article[data-url*='" + caid + "']");
        //console.log(currentarticle);
        if (currentarticle.has("#EW_" + caid).length === 0) {
            currentarticle.append(function() {
                return "<div id='EW_" + caid + "' class='ew-substory ew_tracking_block' style='display:block;'></div>";
            });
            //console.log("EW_" + caid + " : substory div added.");
            //console.log("EW_" + caid + " : Engageya call made");
            
            TrackWidgetImpression("substory-onpop",window.location.href);
            
            (function(E, n, G, A, g, Y, a) {
                E['EngageyaObject'] = g;
                E[g] = E[g] || function() {
                    (E[g].q = E[g].q || []).push(arguments)
                }, E[g].l = 1 * new Date();
                Y = n.createElement(G), a = n.getElementsByTagName(G)[0];
                Y.async = 1;
                Y.src = A;
                a.parentNode.insertBefore(Y, a)
            })(window, document, 'script', '//widget.engageya.com/engageya_loader.js', '__engWidget');
            __engWidget('createWidget', {
                wwei: 'EW_' + caid,
                pubid: 158041,
                webid: 116302,
                wid: 77759
            });
            
        };

    });

};

exports.renderSubGalleryRecommendationWidget = function() {
    try {
        /*
        if (device.isPhone()) {
            return false;
        }
        */
        $(window).on("load", function() {
            renderEngageyaWidget();
            justifyWidgetOffsetOnGallery(false,true);
            /*
            // select the target node       
            var target = document.querySelector('.ros');
            // create an observer instance
            var observer = new MutationObserver(function(mutations) {
                console.log(mutations.length + " mutations");
                justifyWidgetOffsetOnGallery(true);
            });
            // configuration of the observer:
            var config = {
                attributes: true,
                childList: true,
                characterData: true
            };
            // pass in the target node, as well as the observer options
            observer.observe(target, config);
            */
        });

        window.dyg.pubsub.events.on("DFP.markupChanged", function() {
            console.log("DFP.markupChanged");
            justifyWidgetOffsetOnGallery(true,true);
        });

        $(window).on('popstate', function(e) {
            //window.dyg.pubsub || window.dyg.pubsub.events.emit("DFP.markupChanged");
            justifyWidgetOffsetOnGallery(true,false);
        });


    }
    catch (e) {
        console.log(e);
    }

};

exports.renderSubVideoRecommendationWidget = function() {
        try {
            $(window).on("load",function() {
                renderEngageyaWidget();
            });
        }
        catch (e) {console.log(e);}
};

var renderEngageyaWidget = function() {

     $(document).ready(function() {
        var temp = require("./templates/trendingStoriesOnPhotoGallerandVideoPages.hbs");
        var data = {};
        var rv = $(temp(data));
        $("body>article:first").after(rv);

        TrackWidgetImpression("subgalleryorvideo-galleries",window.location.href);
        TrackWidgetImpression("subgalleryorvideo-videos",window.location.href);
        TrackWidgetImpression("subgalleryorvideo-stories",window.location.href);

        (function(E,n,G,A,g,Y,a){E['EngageyaObject']=g;E[g]=E[g]||function(){ (E[g].q=E[g].q||[]).push(arguments)},E[g].l=1*new Date();Y=n.createElement(G), a=n.getElementsByTagName(G)[0];Y.async=1;Y.src=A;a.parentNode.insertBefore(Y,a)})(window,document,'script','//widget.engageya.com/engageya_loader.js','__engWidget');
        __engWidget('createWidget',{wwei:'ew-trending-galleries',pubid:158041,webid:120483,wid:81474});
        
        (function(E,n,G,A,g,Y,a){E['EngageyaObject']=g;E[g]=E[g]||function(){ (E[g].q=E[g].q||[]).push(arguments)},E[g].l=1*new Date();Y=n.createElement(G), a=n.getElementsByTagName(G)[0];Y.async=1;Y.src=A;a.parentNode.insertBefore(Y,a)})(window,document,'script','//widget.engageya.com/engageya_loader.js','__engWidget');
        __engWidget('createWidget',{wwei:'ew-trending-videos',pubid:158041,webid:120484,wid:82727});
        
        (function(E,n,G,A,g,Y,a){E['EngageyaObject']=g;E[g]=E[g]||function(){ (E[g].q=E[g].q||[]).push(arguments)},E[g].l=1*new Date();Y=n.createElement(G), a=n.getElementsByTagName(G)[0];Y.async=1;Y.src=A;a.parentNode.insertBefore(Y,a)})(window,document,'script','//widget.engageya.com/engageya_loader.js','__engWidget');
        __engWidget('createWidget',{wwei:'ew-trending-stories',pubid:158041,webid:116302,wid:82726});
        

     });
}

var justifyWidgetOffsetOnGallery = function(isOnPop,DFPMarkupChanged) {
    try {
        $(document).ready(function() {
            if (!page.isGallery()) {
                return false;
            }
            var regex = new RegExp("(.+)\/galeri\/(.+)\/(.+)(,|%2c|%2C)(.+)\/(.+)");
            var curl = regex.test(window.location.href) ? window.location.href : $("link[rel='canonical']").attr("href");
            var pictureId = curl.slice(curl.lastIndexOf("/") + 1);
            console.log(pictureId);
            var cPic = $("article:first li img[src*='" + pictureId + "']");
            console.log(cPic);
            var topPos1 = cPic.offset().top + cPic.height() + 20;
            
            var $ros = $(".ros").first();
            var $ros1 = $ros.find("div:first");
            var rosHeight = $.trim($ros.html()) == "" || $ros.css("display") == "none" || $ros1.css("display") == "none" ? 0 : $ros.height();
            rosHeight = DFPMarkupChanged ? rosHeight : 0 ;
            var $aside = cPic.parents('li').find("aside"); 
            var topPos2 = $aside.offset().top + $aside.height() + rosHeight + 20;
            
            
            var topPos = topPos1 > topPos2 ? topPos1 : topPos2;
            
            console.log("topPos1 : " + topPos1);
            console.log("rosHeight : " + rosHeight);
            console.log("topPos2 : " + topPos2);
            
            var $rs = $(".recommended-stories");
            
            console.log($rs.css("top"));
            
            $rs.css("position", "absolute");
            $rs.css("left", "0px");

            if (isOnPop) {
                $rs.animate({
                    top: topPos
                }, 250);
            }
            else {
                $rs.css("top", topPos);
            }
            
            console.log($rs.css("top"));
        });
    }
    catch (e) {
        console.log(e);
    }
};
},{"../utility/device":37,"../utility/page":38,"./templates/SubSiteHeadlineRecomendationWidget.hbs":13,"./templates/trendingStoriesOnPhotoGallerandVideoPages.hbs":14}],13:[function(require,module,exports){
// hbsfy compiled Handlebars template
var HandlebarsCompiler = require('hbsfy/runtime');
module.exports = HandlebarsCompiler.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<style>\n #SubSiteHeadlineRecomendationWidget{width:100%;}\n</style>\n<div id=\"SubSiteHeadlineRecomendationWidget\" class=\"ew_tracking_block\"></div>";
},"useData":true});

},{"hbsfy/runtime":9}],14:[function(require,module,exports){
// hbsfy compiled Handlebars template
var HandlebarsCompiler = require('hbsfy/runtime');
module.exports = HandlebarsCompiler.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<style>\n.recommended-stories{width:100%; background-color:#2d2f33!important;margin-top:20px; z-index:2!important; }\n.recommended-stories .content{margin: 0 auto;}\n.recommended-stories>div>div {margin: 10px 5px 10px 5px; float: left; width:310px;}\n\n@media (max-width:640px) \n{\n    .recommended-stories .content{width:320px;height:1500px;}\n}\n@media(min-width:640px) and (max-width:960px)\n{\n    .recommended-stories .content{width:640px;height:500px;} \n    .recommended-stories #ew-trending-stories{display:none;}\n}\n@media(min-width:960px) \n{\n    .recommended-stories .content{width:960px;height:500px;} \n}\n</style>\n<div class=\"recommended-stories\" class=\"ew_tracking_block\">\n    <div class=\"content\">\n        <div id=\"ew-trending-galleries\">\n\n        </div>\n        <div id=\"ew-trending-videos\">\n\n        </div>\n        <div id=\"ew-trending-stories\">\n          \n        </div>\n    </div>\n</div>";
},"useData":true});

},{"hbsfy/runtime":9}],15:[function(require,module,exports){
'use strict';
//millipiyango
var page = require("../utility/page");
var device = require("../utility/device");
var millipiyango = require("../millipiyango/millipiyango");

exports.init = function() {
    $(document).ready(function() {
        if (page.ENV() != "production") {
            millipiyango.renderMilliPiyangoWidgetBefore(".socialLikes");
        }
        else {
             millipiyango.renderMilliPiyangoWidgetBefore(".socialLikes");
            //$(".socialLikes").before('<div style="position:relative;overflow:hidden;width:590px;height:470px;border:none;"><iframe frameborder="0" style="position:absolute;top:-130px;left:-95px;width:700px;height:470px;border:none;" scrolling="no" src="http://www.millipiyango.gov.tr/sonuclar/_cs_piyango.php"></iframe></div>');
        }
    });
};

},{"../millipiyango/millipiyango":23,"../utility/device":37,"../utility/page":38}],16:[function(require,module,exports){
'use strict';

var device = require("../utility/device");
var iframeTemplate = require("./templates/iframe.hbs");

exports.init = function() {

    var _height = device.isDesktop() ? 770 : 1100;
    var rv = $(iframeTemplate({
        src: "http://tercih.ntv.com.tr/yatay-gecis/index2.php",
        height: _height
    }));

    $(document).ready(function() {
        $(".socialLikes").before(rv);
    });

};

},{"../utility/device":37,"./templates/iframe.hbs":22}],17:[function(require,module,exports){
'use strict';

var device = require("../utility/device");
var iframeTemplate = require("./templates/iframe.hbs");

exports.init = function() {
    $(document).ready(function() {

        var _height = device.isDesktop() ? 1000 : 1300;
        var rv = $(iframeTemplate({
            src: "http://tercih.ntv.com.tr/kullanici-form2.php",
            height: _height
        }));

        $(document).ready(function() {
            $(".socialLikes").before(rv);
        });

    });
};

},{"../utility/device":37,"./templates/iframe.hbs":22}],18:[function(require,module,exports){
'use strict';
//lingo başvuru formu
exports.init = function() {
    $(document).ready(function() {
       $(".socialLikes").before('<iframe scrolling="no" src="https://docs.google.com/forms/d/1luIkDdHHyDk1Awy8J-ANbOCZyyXVRiKzkCTYOJhPSWA/viewform?embedded=true" width="100%" height="1040" frameborder="0" marginheight="0" marginwidth="0">Loading...</iframe>');
    });
};

},{}],19:[function(require,module,exports){
'use strict';

var device = require("../utility/device");
var iframeTemplate = require("./templates/iframe.hbs");

exports.init = function() {

    var _height = device.isDesktop() ? 210 : 210;
    var rv = $(iframeTemplate({
        src: "http://tercih.ntv.com.tr/ek-yerlestirme/index2.php",
        height: _height
    }));

    $(document).ready(function() {
        $(".socialLikes").before(rv);
    });

};

},{"../utility/device":37,"./templates/iframe.hbs":22}],20:[function(require,module,exports){
'use strict';

var device = require("../utility/device");
var iframeTemplate = require("./templates/iframe.hbs");

exports.init = function() {

    var _height = device.isDesktop() ? 90 : 90;
    var rv = $(iframeTemplate({
        src: "http://tercih.ntv.com.tr/dgs/index2.php",
        height: _height
    }));

    $(document).ready(function() {
        $(".socialLikes").before(rv);
    });

};

},{"../utility/device":37,"./templates/iframe.hbs":22}],21:[function(require,module,exports){
'use strict';
//millipiyango
var page = require("../utility/page");
var device = require("../utility/device");
var millipiyango = require("../millipiyango/millipiyango");

exports.init = function() {
    $(document).ready(function() {
        if (page.ENV() != "production") {
            millipiyango.renderMilliPiyangoWidgetBefore(".socialLikes");
        }
        else {
             millipiyango.renderMilliPiyangoWidgetBefore(".socialLikes");
            //$(".socialLikes").before('<div style="position:relative;overflow:hidden;width:590px;height:470px;border:none;"><iframe frameborder="0" style="position:absolute;top:-130px;left:-95px;width:700px;height:470px;border:none;" scrolling="no" src="http://www.millipiyango.gov.tr/sonuclar/_cs_piyango.php"></iframe></div>');
        }


    });
};

},{"../millipiyango/millipiyango":23,"../utility/device":37,"../utility/page":38}],22:[function(require,module,exports){
// hbsfy compiled Handlebars template
var HandlebarsCompiler = require('hbsfy/runtime');
module.exports = HandlebarsCompiler.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<iframe scrolling=\"no\" src=\""
    + alias3(((helper = (helper = helpers.src || (depth0 != null ? depth0.src : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"src","hash":{},"data":data}) : helper)))
    + "\" width=\"100%\" height=\""
    + alias3(((helper = (helper = helpers.height || (depth0 != null ? depth0.height : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"height","hash":{},"data":data}) : helper)))
    + "\" frameborder=\"0\" marginheight=\"0\" marginwidth=\"0\">Loading...</iframe>";
},"useData":true});

},{"hbsfy/runtime":9}],23:[function(require,module,exports){
'use strict';

var Handlebars = require("hbsfy/runtime");
var page = require("../utility/page");
var device = require("../utility/device");
var hane = 6;

Handlebars.registerHelper("converttotitle", function(value, options) {
    var rv = "";

    if (value > 1 && value < hane) {
        rv = "Son " + value + " hanesine göre ";
    }
    else if (value == 1) {
        rv = "Amorti olarak "
    }
    else if (value == 0) {
        rv = "Teselli olarak "
    }
    return rv;
});

Handlebars.registerHelper("converttodate", function(value, options) {
    return value.substr(6, 2) + "/" + value.substr(4, 2) + "/" + value.substr(0, 4);
});

Handlebars.registerHelper("converttocurrency", function(value, options) {
    return value.toLocaleString('tr-TR');
});

exports.renderNative = function(selector) {
    this.renderMilliPiyangoWidgetBefore(selector);
};

exports.renderMilliPiyangoWidgetBefore = function(selector) {
    $(document).ready(function() {
        //$.getJSON("http://www.ntv.com.tr/sonuclar/listCekilisleriTarihleri.php?tur=piyango", function(response) {});
        
            var $target = $(selector);
            var temp = require("./templates/millipiyango.hbs");
            var data = {
                "dates": cl
            };
            var rv = $(temp(data));
            $target.before(rv);
            var $container = $(".milli-piyango-widget-container");

            $container.find("#date").on("keypress", function(e) {
                if (e.keyCode == 13) {
                    e.preventDefault();
                    $container.find("#search").click();
                }
            });

            $container.find("#ticket").on("keypress", function(e) {

                if (e.keyCode == 13) {
                    e.preventDefault();
                    $container.find("#search").click();
                }
            });

            $container.find("#search").on("click", function() {
                var date = $container.find("#date").val();
                var ticket = $container.find("#ticket").val();
                renderNotification(date, ticket);
            });

            $container.find("#date").on("change", function() {
                $container.find(".notification").html("");
                $container.find(".results").html("");
            });


            $container.find("#clear").on("click", function() {
                // $container.find("#date").val("0");
                $container.find("#ticket").val("");
                $container.find(".notification").html("");
                $container.find(".results").html("");
            });

            $container.find("#list").on("click", function() {
                var date = $container.find("#date").val();
                var ticket = $container.find("#ticket").val();
                renderTamListe(date, ticket);
            });
        
    });
};

var renderNotification = function(date, ticket) {
    $(document).ready(function() {

        var $container = $(".milli-piyango-widget-container");

        var temp = require("./templates/notification.lost.hbs");
        var data = {
            "message": "Biletinize ikramiye isabet etmemiştir"
        };
        var rv = $(temp(data));

        if (date == "0") {
            data = {
                "message": "Lütfen bir çekiliş tarihi seçiniz."
            };
            rv = $(temp(data));
            $container.find(".notification").html("").append(rv);

            $(".close").on("click", function(e) {
                e.preventDefault();
                $container.find("#clear").click();
            });

            return;
        }



       // $.getJSON("http://www.ntv.com.tr/sonuclar/cekilisler/piyango/" + date + ".json", function(res) {});
            
            var res= r20151231;
            
            hane = res.haneSayisi;

            if (ticket.length != hane) {
                data = {
                    "message": "Bilet Numaranız " + hane + " haneli olmalıdır."
                };
                rv = $(temp(data));
                $container.find(".notification").html("").append(rv);

                $(".close").on("click", function(e) {
                    e.preventDefault();
                    $container.find("#clear").click();
                });

                return;
            }

            var asc = false;
            var prop = "ikramiye";
            var sonuclar = res.sonuclar.sort(function(a, b) {
                if (asc) return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
                else return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
            });

            //console.log(sonuclar);

            for (var i = 0; i < sonuclar.length; i++) {
                var ch = sonuclar[i].haneSayisi;
                ch = ch == 0 ? hane : ch;
                for (var j = 0; j < sonuclar[i].numaralar.length; j++) {
                    if (ticket.substr(hane - ch, ch) == sonuclar[i].numaralar[j]) {

                        temp = require("./templates/notification.win.hbs");
                        data = {
                            "ticket": ticket,
                            "ikramiye": sonuclar[i].ikramiye,
                            "haneSayisi": sonuclar[i].haneSayisi
                        };
                        rv = $(temp(data));
                        $container.find(".notification").html("").append(rv);

                        $(".close").on("click", function(e) {
                            e.preventDefault();
                            $container.find("#clear").click();
                        });

                        return;
                    }
                }
            }

            $container.find(".notification").html("").append(rv);

            $(".close").on("click", function(e) {
                e.preventDefault();
                $container.find("#clear").click();
            });

        });

};

var renderTamListe = function(date, ticket) {
    $(document).ready(function() {
        var $container = $(".milli-piyango-widget-container");

        if (date == "0") {
            var temp = require("./templates/notification.lost.hbs");
            var data = {
                "message": "Lütfen bir çekiliş tarihi seçiniz."
            };
            var rv = $(temp(data));
            $container.find(".notification").html("").append(rv);
            return;
        }


        //$.getJSON("http://www.ntv.com.tr/sonuclar/cekilisler/piyango/" + date + ".json", function(res) {});
        
        var res=r20151231;
        
            hane = res.haneSayisi;
            var temp = require("./templates/tamliste.hbs");
            var data = res;
            var rv = $(temp(data));
            $container.find(".results").html("").append(rv);
        
    });
};


var cl = [{"tarih":"20151231","tarihView":"31-12-2015"}];

var r20151231 = {"cekilisAdi":"31/12/2015 BÄ°LET KONTROL ÅžUBE MÃœDÃœRLÃœÄžÃœ GERÃ‡EK","cekilisTarihi":"20151231","haneSayisi":7,"sonuclar":[{"haneSayisi":7,"tip":"$7_RAKAM","ikramiye":55000000,"numaralar":["0556013"]},{"haneSayisi":7,"tip":"$7_RAKAM","ikramiye":5000000,"numaralar":["0034521"]},{"haneSayisi":7,"tip":"$7_RAKAM","ikramiye":3000000,"numaralar":["8452687"]},{"haneSayisi":7,"tip":"$7_RAKAM","ikramiye":2000000,"numaralar":["1437122"]},{"haneSayisi":7,"tip":"$7_RAKAM","ikramiye":1000000,"numaralar":["9894945"]},{"haneSayisi":7,"tip":"$7_RAKAM","ikramiye":500000,"numaralar":["8869898"]},{"haneSayisi":7,"tip":"$7_RAKAM","ikramiye":100000,"numaralar":["7160191","8677273","2855115","1687389","8009701","5485944","4793831","6118681","3606636","6026745","5649912","4534488","0535757","7768073","7588160","2336284","3710743","0516155","3508070","1808152"]},{"haneSayisi":7,"tip":"$7_RAKAM","ikramiye":50000,"numaralar":["7752651","4259825","0085430","9129798","4785701","0211561","0549310","3584146","1695321","6395928","2512394","8949567","5588753","2371598","1619003","2004789","9717530","1359716","0632944","9513477","0747818","4365731","1358227","5719952","7552845","4857407","6936252","5863351","3813570","6737516"]},{"haneSayisi":7,"tip":"$7_RAKAM","ikramiye":10000,"numaralar":["7682619","4276586","2534687","2637525","6145300","8371056","7827317","7520456","5265780","0737419","5869173","3956552","3315970","2988769","7727566","6042148","2729029","3098220","1267064","2537897","0328086","4748948","3066104","8577494","6123994","6252751","7555021","3904416","1178257","0972924","6340331","7759971","3394990","3774505","5797955","2118986","6746918","4170230","9362177","1254960","1385710","7352163","9812481","5518070","5456968","8356943","6802067","1322163","1413346","8658815"]},{"haneSayisi":7,"tip":"$7_RAKAM","ikramiye":5000,"numaralar":["9839031","6935711","5682817","7576260","0855860","5493977","0400406","7178659","4948595","4369084","0444897","1894690","3861525","9203684","2527305","1200822","7948231","2110343","1044328","2359021","2369322","4782267","5515027","6684847","6700736","8481790","4228722","1784839","2850045","3676441","0001123","2813688","2124263","2835213","8892561","8234295","9769911","8635784","8400592","9918211","1004537","8101657","5678785","0066357","3564193","9619944","9832628","4821056","3749073","2720392","3055257","8934496","5739984","2832125","6196799","0290329","8418252","9050043","9100533","3202376","6213241","1225343","7924195","6524258","3920025","2833777","1865620","4200396","5722555","0819435","8617527","8221169","3715278","5660212","0455208","4236263","9873962","6422269","0853058","2340319","3031522","6376382","7332737","0482842","4000129","2905077","8252030","1416295","6151572","3238322","4579457","7212102","7707441","0111306","2612884","1873713","5950919","5453771","2186996","5368745"]},{"haneSayisi":7,"tip":"$7_RAKAM","ikramiye":3000,"numaralar":["0630120","3386405","9855584","8413156","8659007","3767690","5340631","8291175","2412708","9282413","0393102","2344774","2022485","0705567","2845782","7876211","9594911","3092558","8071974","5476491","0579341","4683659","1916836","3526212","8361414","5105374","8917360","0235351","6840492","2201418","8331662","6275377","9623496","2254957","1152271","0715263","7015720","5070660","6760532","0387418","9242384","9893027","2409240","5982019","6495013","3212305","3760418","4464151","2061192","6175464","9151078","2555482","3551151","6876836","8159134","3266399","2353718","9801049","4259063","5606502","0509423","1946307","0260494","4340802","7879967","9751037","5599282","3831082","0327944","5502127","3185665","6374198","8310249","6577233","9278585","2738091","1994143","7004222","2331511","1775534","4285013","1986161","8669851","2816057","5295968","7982156","0959221","6730194","8562002","2461628","5046355","4766034","4893082","0009141","4242542","4158363","4281221","8451280","2740969","0374249","1452132","6314401","4413602","2329610","4194126","6626244","7452774","5277378","4933542","4728751","1127095","3282146","8698662","6705274","5041999","0024253","3642817","2192032","0774719","3221370","3857683","4006889","8540824","8266613","5118075","6391147","0021912","3979204","4254917","9734492","7405126","1094505","0731963","2042458","3044267","8696725","0185770","7698900","2184652","1845508","1117418","5391785","0310157","8467295","7701007","3767806","5971193","9321516","8324626","4985739","0158346","4019507","7282291","9519562","1918682","5958376","6664330","1259434","4036932","9173872","2116250","4601094","8958729","0690793","0630922","6030167","9219223","2590510","5861826","5596472","6752267","5196462","1809095","5849417","4692602","3449397","1914292","0835195","0940072","1110563","0155587","5192542","7457068","2329112","0564941","0108511","7384199","6990222","2708158","8991164","7388541","8314547","5883813","1331566","4084607","2650582","2092550","8164560","4855385","9916096"]},{"haneSayisi":7,"tip":"$7_RAKAM","ikramiye":2000,"numaralar":["6619723","0674025","9097120","3170676","3226426","3244069","4186215","1622666","7343341","7976042","5404142","4312515","2034212","5084621","4815627","0521673","2092380","4530576","2180163","1499777","3564633","4339093","0401018","0702478","6037217","3841443","7392119","5933592","6470728","2924851","3847443","8934176","8936625","2804227","9921700","2421785","5420155","7677203","2128140","9306014","2830111","8471457","6844070","6327930","8802323","4814362","3363176","6152087","4596100","3502140","4237200","2870448","2186615","8102502","9975955","7835011","0052076","3524299","5309548","1475211","9453573","2041603","1148472","2364828","4013077","6117689","9400584","0265602","8479896","4159346","1002782","1958860","7252248","9117060","9399222","6475773","4922392","1046839","1994956","2706083","5001017","1742893","2511241","2956161","6507256","2096104","6766877","2085508","9607245","9735476","6634980","7242712","1626856","6700274","6246004","4636961","9119313","4219491","1722507","6418073","5392491","1812089","2588995","2902902","0558327","7536271","7965620","7834308","0149072","4701235","3983917","2077749","9286538","3181081","2963025","3189785","8103791","3057745","7510498","3649666","3503109","4435201","2708512","3848669","9061803","3022789","0342735","8541905","5242053","1344160","3960538","7586871","3724767","8657824","1862738","2507639","2567309","9052018","7941060","9039481","2030849","5880930","6267231","4842981","5801625","7218508","7303115","8380012","7746697","4860516","1064433","6053022","6431722","4529202","3756229","1671156","7637502","2207291","5928413","3889004","7823519","0862118","3741970","7663129","0080288","7594049","2339393","3842814","6386573","6681725","5110402","7726909","8411210","9464018","7534222","4408734","3544913","7543580","8310539","1758160","2053691","7998248","0647210","5725013","2836595","1120278","4108012","6412474","1042606","0037398","2105269","6504891","5686889","9741247","5141593","9686720","1420136","9552136","0591996","7319748","1736873","5862847","7289393","9009424","8077226","6001540","1468481","7681470","0042610","1437616","1472841","7339721","8819262","9369104","5094624","2730219","5358701","6831035","8611621","3623920","7293375","4445174","8978911","0044543","7007927","1940597","8334984","5127442","6713972","3235733","6042198","8116262","5631410","9399206","2455172","7143297","5972649","8766062","6052091","3580425","8884074","5737142","7958900","8984231","3376554","4184092","0913829","7276111","4600486","0805869","3351227","5884653","4608468","2222741","2036332","8882358","1366107","2451982","3486478","4889501","1918071","6276670","4552521","4207752","2800244","6368145","2201817","4226078","9842714","0357154","3804505","2120458","2576601","2499509","4151614","3688674","2893087","2647520","3965757","7765327","9733343","4211257","6453606","5284017","2831530","9003283","0991382","7188444","1655540","8260403","8421822","2980190","5557967","9472185","3621197","3852993","9242438","1425427","0515198","8186846"]},{"haneSayisi":7,"tip":"$7_RAKAM","ikramiye":1000,"numaralar":["0447165","7948434","1380530","1379718","5262274","0070631","2455308","5582172","3250631","2621626","3730253","5953046","8718871","7314298","4563796","4667387","4406167","5471067","1013127","1903723","6355012","3552908","4779226","1706100","7165814","8758940","0022436","0018703","8844404","2326208","1192191","4804297","6774500","4149926","2112006","6811689","2506892","3761227","1194804","7816169","2419388","6308949","2663861","0018101","3728521","7578707","5412191","4215459","7691928","0042956","4377552","2633441","8254430","0912381","1033618","2403322","8415977","1027519","4524172","8979845","7372354","9069846","3368731","9800570","9369866","4549054","7866753","0097395","3283135","9528782","0965354","6510832","1674379","7903396","3524589","8867138","4521876","5644083","6267426","5078696","4532893","0933355","8852331","5689814","1866529","5722081","6346025","3845267","4556701","0821565","9622576","4605896","2171193","1462972","9767923","2672728","5292932","8208405","4684439","7764607","9043729","4857178","2681994","0263194","6810917","6742170","8351834","7830961","8969002","8158933","6507900","4372788","9074132","3844761","2764601","6046544","1363858","3863491","3921138","9442459","0520910","6734003","5215304","7841842","0750325","1042961","7637489","7991234","7028325","6264632","3302883","2404214","4890314","6113142","8209278","2896135","4557937","5395695","6132726","6512642","0743278","5866185","5177101","9079318","5854517","6604511","2382573","7716046","1445411","7747862","1332881","5652296","0119693","7585556","4475748","2412881","2371107","2400359","6183588","2720277","5670772","1855687","6424106","7851363","0239304","1500655","2964821","1150109","2692699","6575700","1514180","3714227","1942637","9710090","0830646","8028821","9792137","2704291","6739171","8571362","4912825","2579315","3043722","5934945","0383126","0163935","2233004","2034165","1416867","2200952","3382052","0596758","9320980","0273244","3654157","6977207","6416303","6356371","1883959","9353162","2430523","2133083","0292616","6797523","8858638","2736427","4355143","4231020","9758851","7221055","8458543","6033512","7266170","1604149","3545891","6769445","0354765","4429322","5514785","1474287","6285791","4947507","7382468","4363495","2302255","5183154","1977826","2741623","7575348","4919534","0309704","8363361","8679704","3337327","3525573","5973130","5264612","1702341","2219227","6499522","1382327","5320171","9405387","8794108","8921000","6567035","2892872","1217969","3883793","1119517","0074654","2728461","8900100","8305466","2222293","8586149","8778027","5056625","5826930","3358306","4291141","1924914","2945949","0733841","0164957","2578238","5234575","5205300","8339735","2515670","2703535","1107595","4670586","1967344","0632054","2729189","4078659","5295017","1237756","4922360","6406768","6888599","2719151","3282570","8852879","6103660","9151822","3053479","9700815","1895704","0883408","1821200","3346694","0797124","9508821","6849701","8271976","9514075","3527546","5955925","8326976","4707744","1409554","2680851","7331927","0560883","8645237","7546444","1386161","4523376","0042541","5380615","5595475","8838771","0326028","7722889","0756184","2206720","4961357","9700149","7689224","8627463","1847823","0703165","0050213","9977221","1305273","8291172","6462207","8037994","6316827","6544927","0245561","5327117","2842740","0915633","5750188","0333269","1134657","5308519","0330558","2703869","1188755","8557470","4378819","4302069","2477944","4509498","7858795","1316161","0408035","6660408","6742209","6636331","8530795","0968864","6254813","7115790","4270414","6139985","4790838","5799601","5560567","2743308","1646900","4524945","3926778","2538312","7627529","8684222","7773459","2589126","9565274","3224559","5007507","3149268","8777174","9746606","2919920","8129295","0396043","1544842","7105355","9481325","1583584","3025482","3684327","5354173","0529830","5020483","3508767","4982753","5574371","9774048","9177034","6132163","5926296","9971960","8861980","2801459","9758433","3367123","5191186","1796641","4114981","2191163","2273904","2035360","0357403","5955646","5402048","7886115","3687961","7509375","9262553","0544691","3805801","1387031","4040503","8266047","0614103","0773042","0624138","3680192","4538716","8138247","3252769","6382738","8506034","2598766","2264685","1865008","5038556","3932650","3790184","9702533","4524134","2151348","4090141","2468158","1606383","2024206","5729264","8116722","4045926","7964967","6809035","2479531","8637156","2105419","4051752","0055468","3332241","6702168","8978610","5429997","2061123","7229101","1032970","0547820","8016945","9273907","6565425","9699692","6253914","0701654","8675978","9602916","5306903","1402597","6572895","0524763","2852033","4300814","7065714","8114020","7661155","7828504","4494115","2876006","3795419","5526231","8924879","7644198","8949941","9391023","3030783","5836376","0674790","5716811","9412557","2348305","4518828","0612223","5573031","6075825","7430876","7636795","9004049","7527116"]},{"haneSayisi":6,"tip":"SON_ALTI_RAKAM","ikramiye":500,"numaralar":["561951","581088","106843","329106","274540","508565","343571","303924","020546","217519","318038","749212","907807","152717","149002","195016","413684","849119","892559","984613","325300","618407","556210","997181","856411","646182","581468","822581","295699","019423","370842","726863","297495","964065","817835","707119","035412","425196","508546","689240","451099","648825","899570","963073","276638","778655","895839","069384","833779","949822","009055","631028","021437","026645","740710","065960","881390","639147","624812","840606","559931","407560","137583","111454","257669","688347","679114","713084","800970","167323","420902","063991","505203","310502","091260","586906","282692","934021","271990","010653","976423","726781","217849","825051","171523","198936","684433","234119","087465","869850","755773","526121","692627","733203","390441","304079","178009","407508","585228","487719"]},{"haneSayisi":5,"tip":"SON_BES_RAKAM","ikramiye":350,"numaralar":["25983","16970","57341","56812","52707","91204","32743","98985","91157","93610","58387","74225","38224","52626","46641","25364","08411","12824","97579","70631","42180","25682","20967","67213","26885","82784","41091","21839","89065","64840","53565","93204","47464","64471","32616","16886","43488","73256","48641","48233","03004","10635","09615","67732","53211","76196","53020","68459","03991","63934","93456","34998","09745","36178","29831","54826","63018","40993","01792","02155","13911","57602","26252","42227","64925","58653","59560","42462","13300","00728","07974","70861","98402","95507","52119","84949","66306","99637","41087","82678"]},{"haneSayisi":4,"tip":"SON_DORT_RAKAM","ikramiye":250,"numaralar":["9796","2461","3657","8852","2616","1589","8406","2072","3297","8672","9760","3620","8509","5139","8735","2986","9899","6922","9017","0689","0560","3176","8024","9131","3143","1179","9752","2495","1522","6153","1717","3043","3323","7808","8309","2484","5019","9822","4192","8526"]},{"haneSayisi":3,"tip":"SON_UC_RAKAM","ikramiye":150,"numaralar":["899","481","111","884","080","421","047","585","131","153","282","409","402","761","702","128","610","220","343","048"]},{"haneSayisi":2,"tip":"SON_IKI_RAKAM","ikramiye":100,"numaralar":["83","21","75","29","76","18","55"]},{"haneSayisi":1,"tip":"AMORTI","ikramiye":50,"numaralar":["2","8"]},{"haneSayisi":0,"tip":"TESELLI","ikramiye":55000,"numaralar":["0456013","0556019","0506013","2556013","0566013","0551013","1556013","0557013","0556063","0556023","0256013","0556017","0556083","0556018","0556113","0956013","0556613","0556513","0556003","0552013","3556013","0526013","0756013","0556010","0556014","0156013","0550013","0516013","5556013","0556043","0556033","0558013","0556011","9556013","0556016","0553013","0586013","0559013","0556015","7556013","0556012","8556013","0576013","0546013","0056013","0596013","0356013","0556213","0556073","0556813","0536013","0554013","4556013","0556713","0556313","0656013","0556053","0555013","0556913","0556093","6556013","0556413","0856013"]}],"buyukIkrKazananIlIlceler":[{"il":"01","ilView":"ADANA","ilce":"00100","ilceView":"MERKEZ"},{"il":"34","ilView":"Ä°STANBUL","ilce":"03400","ilceView":"MERKEZ"},{"il":"34","ilView":"Ä°STANBUL","ilce":"03400","ilceView":"MERKEZ"},{"il":"34","ilView":"Ä°STANBUL","ilce":"03400","ilceView":"MERKEZ"}]};
},{"../utility/device":37,"../utility/page":38,"./templates/millipiyango.hbs":24,"./templates/notification.lost.hbs":25,"./templates/notification.win.hbs":26,"./templates/tamliste.hbs":27,"hbsfy/runtime":9}],24:[function(require,module,exports){
// hbsfy compiled Handlebars template
var HandlebarsCompiler = require('hbsfy/runtime');
module.exports = HandlebarsCompiler.template({"1":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "         <option value=\""
    + alias3(((helper = (helper = helpers.tarih || (depth0 != null ? depth0.tarih : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"tarih","hash":{},"data":data}) : helper)))
    + "\">"
    + alias3(((helper = (helper = helpers.tarihView || (depth0 != null ? depth0.tarihView : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"tarihView","hash":{},"data":data}) : helper)))
    + "</option>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<style>\n .milli-piyango-widget-container .logo { background-image:url('data:image/png;base64,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');}\n    .milli-piyango-widget-container .logo {width: 28px;height: 28px;border-radius: 50%;position: absolute;top: 4px;left: 8px;background-size: cover;}\n    .milli-piyango-widget-container {font-family:Arial; margin-top:20px;position:relative; width: 100%; box-sizing: border-box;}\n         .milli-piyango-widget-container input, .milli-piyango-widget-container label, .milli-piyango-widget-container select{display:block;    vertical-align: middle;width: 222px;\n    padding: 5px;\n    box-sizing: border-box;\n    cursor: pointer; font-weight:400;}\n     .milli-piyango-widget-container button {\n    margin-top: 10px;\n    cursor: pointer;\n    background-color: #007fbd;\n    border: none;\n    padding: 10px 15px;\n    color: #fff;\n}\n    .milli-piyango-widget-container .results>div {width:100%; clear:both;height:inherit;}\n    .milli-piyango-widget-container h2{background-color: #e3e6ea;padding: 5px 5px 3px 42px; margin:0px!important;border: 1px solid #d8d8d8; border-bottom: 2px solid #d8d8d8!important; font-size: 22px;box-sizing: border-box; }\n    \n        .milli-piyango-widget-container h3{background-color: #e3e6ea;padding: 5px; ;border: 1px solid #d8d8d8; border-bottom: 2px solid #d8d8d8!important; font-size: 20px;box-sizing: border-box; margin:10px 0px;}\n        \n            .milli-piyango-widget-container h4{padding: 20px 0px 5px 0px; border-bottom: 2px solid #d8d8d8!important; font-size: 18px;box-sizing: border-box;  width:100%; display:block;}\n            \n\n    .milli-piyango-widget-container .results div ul {width:100%; clear:right; box-sizing:padding-box;}\n    .milli-piyango-widget-container ul li {float:left; margin:5px!important; width:72px; list-style-type:none!important;}\n    .milli-piyango-widget-container ul li:last-child {clear:right;}\n    .milli-piyango-widget-container .info{margin-top:10px; padding:20px; border-radius:5px;}\n    .milli-piyango-widget-container .info p{margin-top:5px;}\n    .milli-piyango-widget-container .red{background-color: rgb(255, 89, 89);}\n    .milli-piyango-widget-container .green{background-color: rgb(204, 255, 102);}\n    \n    .milli-piyango-widget-container .close{display:none;}\n    \n    @media (max-width:640px){\n        .milli-piyango-widget-container .close{display:block !important; text-decoration:none;color:black!important ; position: absolute;top:10px;right:10px; font-size:12px;font-weight:700; cursor:pointer; padding:10px;}\n        .milli-piyango-widget-container {width:260px;}\n        .milli-piyango-widget-container h2{font-size:16px;padding-top: 8px !important;padding-bottom: 8px !important; margin-bottom:10px !important;}\n        .milli-piyango-widget-container input, .milli-piyango-widget-container select{ width:100%; }\n        .milli-piyango-widget-container #clear, .milli-piyango-widget-container #list {display:none;}\n        .milli-piyango-widget-container #search {width:100%; font-size:20px;font-weight:700;}\n        .milli-piyango-widget-container label{font-weight:700;}\n        .milli-piyango-widget-container .notification{position: absolute;top: 0;left: 0;width: 100%;margin: 0px;box-sizing: border-box;height:inherit;}\n        .milli-piyango-widget-container .info{width: 100%;margin: 0px;box-sizing: border-box;height: 230px; padding-top:40px!important;}\n        .milli-piyango-widget-container .info.green p:last-child{display:none;}\n        \n    }\n\n</style>\n<div class=\"milli-piyango-widget-container\">\n    <div class=\"logo\"></div>\n    <h2>Milli Piyango Çekiliş Sonuçları</h2>\n    <form>\n    <label for=\"date\">Çekiliş Tarihi</label>\n    <select id=\"date\" name=\"date\">\n        <option value=\"0\">Seçiniz</option>\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.dates : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "    </select>\n    <label for=\"ticket\">Bilet No</label>\n    <input  id=\"ticket\" name=\"ticket\" type=\"number\" value=\"\">\n    <button id=\"search\" type=\"button\">Ara</button>\n    <button id=\"clear\" type=\"button\">Temizle</button>\n    <button id=\"list\" type=\"button\">Tam Liste</button>\n    </form>\n    <div class=\"notification\"></div>\n    <div class=\"results\"></div>\n</div>";
},"useData":true});

},{"hbsfy/runtime":9}],25:[function(require,module,exports){
// hbsfy compiled Handlebars template
var HandlebarsCompiler = require('hbsfy/runtime');
module.exports = HandlebarsCompiler.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper;

  return "<div class=\"info red\">\n    <a href=\"#\" class=\"close\">Kapat (X)</a>\n    <p>"
    + this.escapeExpression(((helper = (helper = helpers.message || (depth0 != null ? depth0.message : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"message","hash":{},"data":data}) : helper)))
    + "</p>\n</div>";
},"useData":true});

},{"hbsfy/runtime":9}],26:[function(require,module,exports){
// hbsfy compiled Handlebars template
var HandlebarsCompiler = require('hbsfy/runtime');
module.exports = HandlebarsCompiler.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2=this.escapeExpression;

  return "<div class=\"info green\">\n       <a href=\"#\" class=\"close\">Kapat (X)</a>\n        <p>"
    + alias2(((helper = (helper = helpers.ticket || (depth0 != null ? depth0.ticket : depth0)) != null ? helper : alias1),(typeof helper === "function" ? helper.call(depth0,{"name":"ticket","hash":{},"data":data}) : helper)))
    + " numaralı biletiniz "
    + alias2((helpers.converttotitle || (depth0 && depth0.converttotitle) || alias1).call(depth0,(depth0 != null ? depth0.haneSayisi : depth0),{"name":"converttotitle","hash":{},"data":data}))
    + " </p>\n        <p><b>"
    + alias2((helpers.converttocurrency || (depth0 && depth0.converttocurrency) || alias1).call(depth0,(depth0 != null ? depth0.ikramiye : depth0),{"name":"converttocurrency","hash":{},"data":data}))
    + " TL</b> ikramiye kazandı.</p>\n        <p>Biletiniz tam ise ikramiyenin tamamını, yarım ise yarısını, çeyrek ise dörtte birini alabilirsiniz.</p>\n        <p>ÖNEMLİ UYARI: Milli Piyango biletlerinde ikramiyeler bir yıllık zamanaşımı süresine tabi olup, çekiliş tarihinden itibaren bir yıl içinde ibraz edilmeyen biletlerin ikramiyeleri zamanaşımına uğrar ve bu biletlere ikramiye ödemesi yapılmaz.</p>\n</div>";
},"useData":true});

},{"hbsfy/runtime":9}],27:[function(require,module,exports){
// hbsfy compiled Handlebars template
var HandlebarsCompiler = require('hbsfy/runtime');
module.exports = HandlebarsCompiler.template({"1":function(depth0,helpers,partials,data) {
    var stack1, alias1=helpers.helperMissing, alias2=this.escapeExpression;

  return "<div>\n    <h4>"
    + alias2((helpers.converttotitle || (depth0 && depth0.converttotitle) || alias1).call(depth0,(depth0 != null ? depth0.haneSayisi : depth0),{"name":"converttotitle","hash":{},"data":data}))
    + alias2((helpers.converttocurrency || (depth0 && depth0.converttocurrency) || alias1).call(depth0,(depth0 != null ? depth0.ikramiye : depth0),{"name":"converttocurrency","hash":{},"data":data}))
    + " TL ikramiye kazanan numaralar </h4>\n    <ul>\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.numaralar : depth0),{"name":"each","hash":{},"fn":this.program(2, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "    </ul>\n</div>\n";
},"2":function(depth0,helpers,partials,data) {
    return "        <li>"
    + this.escapeExpression(this.lambda(depth0, depth0))
    + "</li>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<h3> "
    + this.escapeExpression((helpers.converttodate || (depth0 && depth0.converttodate) || helpers.helperMissing).call(depth0,(depth0 != null ? depth0.cekilisTarihi : depth0),{"name":"converttodate","hash":{},"data":data}))
    + " Tarihli Kazanan Tüm Biletlerin Listesi</h3> \n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.sonuclar : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "</div>\n</br>";
},"useData":true});

},{"hbsfy/runtime":9}],28:[function(require,module,exports){
'use strict';

var page = require("../../modules/utility/page");

exports.init = function() {
(function(e,b){if(!b.__SV){var a,f,i,g;window.mixpanel=b;b._i=[];b.init=function(a,e,d){function f(b,h){var a=h.split(".");2==a.length&&(b=b[a[0]],h=a[1]);b[h]=function(){b.push([h].concat(Array.prototype.slice.call(arguments,0)))}}var c=b;"undefined"!==typeof d?c=b[d]=[]:d="mixpanel";c.people=c.people||[];c.toString=function(b){var a="mixpanel";"mixpanel"!==d&&(a+="."+d);b||(a+=" (stub)");return a};c.people.toString=function(){return c.toString(1)+".people (stub)"};i="disable time_event track track_pageview track_links track_forms register register_once alias unregister identify name_tag set_config people.set people.set_once people.increment people.append people.union people.track_charge people.clear_charges people.delete_user".split(" ");
for(g=0;g<i.length;g++)f(c,i[g]);b._i.push([a,e,d])};b.__SV=1.2;a=e.createElement("script");a.type="text/javascript";a.async=!0;a.src="undefined"!==typeof MIXPANEL_CUSTOM_LIB_URL?MIXPANEL_CUSTOM_LIB_URL:"file:"===e.location.protocol&&"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js".match(/^\/\//)?"https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js":"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js";f=e.getElementsByTagName("script")[0];f.parentNode.insertBefore(a,f)}})(document,window.mixpanel||[]);
mixpanel.init("ade57caa972d33e3b7bdc7727f3f103a");

this.trackPageview();
};

exports.trackPageview = function() {

    var data = {
        'page name': document.title,
        'url': window.location.pathname,
        'type': page.getType()
    }

    mixpanel.track('page_view', data);

    console.log(data);
};
},{"../../modules/utility/page":38}],29:[function(require,module,exports){
'use strict';

exports.init = function() {
    var pv = this;
    $(window).on('load', function(e) {
        pv.track(false);
    });

    $(window).on('popstate', function(e) {
        pv.track(true);
    });
};

exports.track = function(_isAsync) {
    try {
        if (_isAsync == undefined) {
            _isAsync = true;
        }

        var data = {
            event: "pageview",
            site: $("meta[property='dyg:site']").attr('content'),
            time: new Date().toISOString(),
            hostname: location.hostname,
            url: location.pathname,
            referrer: document.referrer,
            useragent: navigator.userAgent,
            isAsync: _isAsync,
            title: $("meta[property='og:title']").attr('content'),
            image: $("meta[property='og:image']").attr('content'),
            description: $("meta[property='og:description']").attr('content'),
            productid: $("meta[property='dyg:target']").attr('content'),
            producttype: $("meta[property='og:type']").attr('content'),
            pagetype: "article-detail", //$("meta[property='dyg:pagetype']").attr('content'),
            tags: $("meta[property='dyg:tags']").attr('content'),
            categories: $("meta[property='dyg:section']").attr('content')
                //fingerprint: new Fingerprint().get()
        };

        $.ajax({
            type: 'post',
            url: 'http://trackingapi.cloudapp.net/push',
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            traditional: true,
            success: function(res) {
            //console.log("tracking-response");
            // console.log(res);
            }
        });

        /*
                $.ajax({
                    url: '//freegeoip.net/json/',
                    type: 'POST',
                    dataType: 'jsonp',
                    success: function(location) {
                        console.log("location");
                        console.log(location);
                        data.ip = location.ip;
                    }
                });
        */

        /*
                // construct an HTTP request
                var xhr = new XMLHttpRequest();
                xhr.open("POST", "https://lup85c7g14.execute-api.eu-west-1.amazonaws.com/prod/send", true);
                xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

                // send the collected data as JSON
                xhr.send(JSON.stringify(data));

                xhr.onloadend = function(e) {
                    // done
                    console.log(e);
                };
                */
    }
    catch (e) {
        console.log(e);
    }
};

},{}],30:[function(require,module,exports){
'use strict';
var page = require("../utility/page");
var device = require("../utility/device");
var _blacklist = ["d1092ede-f96c-4ad2-8411-c7dc70cb7a33", "5d25a910-4fd0-483f-9ea5-6fb80cc3e858"];
var Handlebars = require("hbsfy/runtime");

Handlebars.registerHelper("inc", function(value, options) {
    return parseInt(value) + 1;
});

Handlebars.registerHelper("type", function(value, options) {
    var rv = "";
    for (var i = 0; i < value.categories.length; i++) {
        rv = rv + " " + value.categories[i];
    }
    return rv;
});

Handlebars.registerHelper("rect", function(value, options) {
    // "http://img-cdn.ntv.com.tr/gorsel/EfteolDxTUeiFHfdQvgfwA.jpg?width=100&height=100&mode=crop&scale=both&v=20150912145747412&meta=square"
    return value.replace("width=100", "width=210").replace("meta=square", "meta=rectangle");
});

Handlebars.registerHelper("pan", function(value, options) {
    // "http://img-cdn.ntv.com.tr/gorsel/EfteolDxTUeiFHfdQvgfwA.jpg?width=100&height=100&mode=crop&scale=both&v=20150912145747412&meta=square"
    return value.replace("width=100", "width=320").replace("meta=square", "meta=panoramic");
});

Handlebars.registerHelper("ifAd", function(value, options) {
    return value.categories.indexOf("Reklam") > -1 ? options.fn(this) : options.inverse(this);
});

Handlebars.registerHelper("toLocaleString", function(value, options) {
    return value.toLocaleString();
});

Handlebars.registerHelper("toLocaleDate", function(value, options) {
    return new Date(value).toLocaleDateString("tr-TR");
});



var bindWidgetClickEventHandlers = function() {
    $(document).ready(function() {
        $(".seg_tracking_block a").off('click.seg_track').on('click.seg_track', function(e) {
            var $this = $(this);
            var href = $this.attr("href");
            var action = "seg-widget-item-internal-click";
            TrackWidgetItemClick(action, href);
        });
    });
};

var TrackWidgetItemClick = function(_action, _href) {
    return;
    var action = _action;
    var href = _href;
    ga('ntvcomtr.send', 'event', {
        'eventCategory': 'seg-widget-item-click',
        'eventAction': action,
        'eventLabel': href,
        'hitCallback': function() {
            console.log("sent : {category:'" + "seg-widget-item-click" + "', action:'" + action + "', label:'" + href + "'}");
        },
        'hitCallbackFail': function() {
            console.log("not sent : {category:'" + "seg-widget-item-click" + "', action:'" + action + "', label:'" + href + "'}");
            TrackWidgetItemClick(action, href);
        }
    });
}


var TrackWidgetImpression = function(_action, _label) {
    return;
    var action = _action;
    var label = _label;
    bindWidgetClickEventHandlers();
    ga('ntvcomtr.send', 'event', {
        'eventCategory': 'seg-widget-impression',
        'eventAction': action,
        'eventLabel': label,
        'hitCallback': function() {
            console.log("{category:'" + "seg-widget-impression" + "', action:'" + action + "', label:'" + label + "'}");
        },
        'hitCallbackFail': function() {
            TrackWidgetImpression(action, label);
        }
    });
};

exports.eliminateProduct = function(product) {
    try {

        return _blacklist.indexOf(product.productId) > -1 ? true : false;
    }
    catch (e) {
        console.log(e);
        return false;
    }
};

exports.renderTrendingStoriesOnArticle = function(title, productList, metadata) {
    try {
        /* code */

        console.log("title : " + title);
        console.log(metadata);
        console.log(productList);

        if ($(".recommended-stories-for-article").length > 0) {
            return false;
        }

        var temp = require("./templates/trendingStoriesOnArticle.hbs");

        var data = {
            "stories": productList
        };

        var rv = $(temp(data));

        $("#story .breadcrumb").before(rv);

        TrackWidgetImpression("seg-trenting-stories-on-article-widget-impression", location.href);

        var swiper = new Swiper('.recommended-stories-for-article', {
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            slidesPerView: 'auto',
            mousewheelControl: 'true',
            mousewheelReleaseOnEdges: 'true',
            observer: 'true',
            slidesPerGroup: 1
        });

        // swiper.reInit();

    }
    catch (e) {
        console.log(e);
    }
};

exports.renderSubArticleTrendingVideo = function(title, productList, metadata) {

    try {
        /* code */

        console.log("title : " + title);
        console.log(metadata);
        console.log(productList);

        if (productList.length < 2) {
            return false;
        }

        //var currentarticleurl = $("aside div.story-nav ol li.current a").attr("href");
        var currentarticleurl = metadata.productUrl;
        var caid = currentarticleurl.substr(currentarticleurl.indexOf(",") + 1).split("#")[0].split("?")[0];
        var currentarticle = $("article[data-url*='" + caid + "']");
        if (currentarticle.next().is(".trending-video-recommendation")) {
            return false;
        }

        var temp = require("./templates/trendingVideosOnArticle.hbs");

        var data = {
            "videos": productList,
        };

        if ($(".trending-video-recommendation").length < 1) {
            data.isFirst = "true";
        }

        var rv = $(temp(data));

        currentarticle.after(rv);

    }
    catch (e) {
        console.log(e);
    }

}

exports.renderTrendingStoriesOnCategory = function(title, productList, metadata) {
    // console.log("title : " + title);
    //console.log(metadata);
    //console.log(productList);

    if (productList.length < 15) {
        console.log(productList);
        return false;
    }

    try {
        /* code */

        var temp = require("./templates/trendingStoriesOnCategory.hbs");

        var data = {
            "facebook": productList.slice(0, 5),
            "twitter": productList.slice(5, 10),
            "all": productList.slice(10, 15)
        };

        var rv = $(temp(data));

        $("#category-page .wrapper .grids").append(rv);
    }
    catch (e) {
        console.log(e);
    }
};

exports.renderSubVideoRecommendations = function(title, productList, metadata) {
    //console.log("title : " + title);
    //console.log(metadata);
    //console.log(productList);
    try {
        /* code */

        if (page.ENV() == 'staging') {
            return false;
        }

        if ($(".recommended-stories").length < 1) {

            var temp = require("./templates/trendingStoriesOnVideo.hbs");

            var data = {
                "gallery": productList.slice(0, 5),
                "video": productList.slice(5, 10),
                "story": productList.slice(10, 15)
            };

            var rv = $(temp(data));
            $("body>article:first").after(rv);
        }

    }
    catch (e) {
        console.log(e);
    }

};

exports.renderSubVideoRecommendations2 = function(title, productList, metadata) {

        try {
            $(document).ready(function() {
                    //console.log("title : " + title);
                    //console.log(metadata);
                    console.log(productList);

                    var temp = require("./templates/trendingVideosOnVideo.hbs");

                    var data = {
                        "videos": productList.slice(0, 12)
                    };

                    var rv = $(temp(data));
                    console.log(rv);

                    $(".vg-content__all").remove();
                    $(".vg-content__selectedProgram").after(rv);
                });
            }
            catch (e) {
                console.log(e);
            }

        };

exports.renderSubPhotoGalleryRecommendations = function(title, productList, metadata) {
    //console.log("title : " + title);
    //console.log(metadata);
    //console.log(productList);
    try {
        /* code */
        if (!device.isDesktop() || page.ENV() == 'staging') {
            return false;
        }

        if ($(".recommended-stories").length < 1) {

            var temp = require("./templates/trendingStoriesOnPhotoGallery.hbs");

            var data = {
                "gallery": productList.slice(0, 5),
                "video": productList.slice(5, 10),
                "story": productList.slice(10, 15)
            };

            var rv = $(temp(data));
            $("body>article:first").after(rv);
            justifyWidgetOffsetOnGallery(false);

            window.dyg.pubsub.events.on("DFP.markupChanged", function() {
                console.log("DFP.markupChanged");
                justifyWidgetOffsetOnGallery(true);
            });

            $(window).on('popstate', function(e) {
                window.dyg.pubsub || window.dyg.pubsub.events.emit("DFP.markupChanged");
                justifyWidgetOffsetOnGallery(true);
            });

        }
    }
    catch (e) {
        console.log(e);
    }

};
var justifyWidgetOffsetOnGallery = function(isOnPop) {
    try {
        /* code */
        if (!page.isGallery()) {
            return false;
        }
        var curl = isOnPop ? window.location.href : $("link[rel='canonical']").attr("href");
        var pictureId = curl.slice(curl.lastIndexOf("/") + 1);
        var cPic = $("article:first li img[src*='" + pictureId + "']");
        var topPos1 = cPic.offset().top + cPic.height() + 20;

        var $ros = $(".ros").first();
        var rosHeight = $.trim($ros.html()) == "" || $ros.css("display") == "none" ? 0 : $ros.height();
        var $aside = cPic.parent().parent().next("aside").first();
        var topPos2 = $aside.offset().top + $aside.height() + rosHeight + 20;

        var topPos = topPos1 > topPos2 ? topPos1 : topPos2;

        var $rs = $(".recommended-stories");
        $rs.css("position", "absolute");
        $rs.css("left", "0px");
        $rs.css("z-index", "2");
        if (isOnPop) {
            $rs.animate({
                top: topPos
            }, 300);
        }
        else {
            $rs.css("top", topPos);
        }

        //console.log(topPos);
    }
    catch (e) {}
};

exports.bindHeadlineClickEventHandlers = function() {

    $(document).ready(function() {
        var PromoLinks = $(".large.headline.at.homepage:first").prevAll().find("a[data-story-id]");
        var SiteHeadlineLinks = $(".large.headline.at.homepage:first").find("a[data-story-id]");
        var MainPageLinks = $(".large.headline.at.homepage:first").nextAll().find("a[data-story-id]");

        var PromoThumbLinks = $(".large.headline.at.homepage:first").prevAll().find("ul.previews li a");
        var siteHeadlineThumbLinks = $(".large.headline.at.homepage:first").find("ul.previews li a");
        var MainPageThumbLinks = $(".large.headline.at.homepage:first").nextAll().find("ul.previews li a");

        PromoThumbLinks.on('click', function() {
            var $this = $(this);
            var $del = $this.parents(".headline.at.homepage").find("a[data-story-id]").eq(PromoThumbLinks.index($this));
            var order = PromoLinks.index($del) + 1;
            var pid = $del.attr("data-story-id");
            sendSegClick(pid, order);
        });

        siteHeadlineThumbLinks.on('click', function() {
            var $this = $(this);
            var $del = $this.parents(".headline.at.homepage").find("a[data-story-id]").eq(siteHeadlineThumbLinks.index($this));
            var order = 100 + SiteHeadlineLinks.index($del) + 1;
            var pid = $del.attr("data-story-id");
            sendSegClick(pid, order);
        });

        MainPageThumbLinks.on('click', function() {
            var $this = $(this);
            var $del = $this.parents(".headline.at.homepage").find("a[data-story-id]").eq(MainPageThumbLinks.index($this));
            var order = 200 + MainPageLinks.index($del) + 1;
            var pid = $del.attr("data-story-id");
            sendSegClick(pid, order);
        });

        PromoLinks.on('click', function() {
            var $this = $(this);
            var order = PromoLinks.index($this) + 1;
            var pid = $this.attr("data-story-id");
            sendSegClick(pid, order);
        });

        SiteHeadlineLinks.on('click', function() {
            var $this = $(this);
            var order = 100 + SiteHeadlineLinks.index($this) + 1;
            var pid = $this.attr("data-story-id");
            sendSegClick(pid, order);
        });

        MainPageLinks.on('click', function() {
            var $this = $(this);
            var order = 200 + MainPageLinks.index($this) + 1;
            var pid = $this.attr("data-story-id");
            sendSegClick(pid, order);
        });

    });

};
var sendSegClick = function(pid, order) {
    Segmentify('event:custom', {
        'type': 'click',
        'params': {
            'productId': pid,
            'channel': 'headline',
            'order': order
        }
    });
    console.log("pid : " + pid + " , order : " + order);
};
},{"../utility/device":37,"../utility/page":38,"./templates/trendingStoriesOnArticle.hbs":31,"./templates/trendingStoriesOnCategory.hbs":32,"./templates/trendingStoriesOnPhotoGallery.hbs":33,"./templates/trendingStoriesOnVideo.hbs":34,"./templates/trendingVideosOnArticle.hbs":35,"./templates/trendingVideosOnVideo.hbs":36,"hbsfy/runtime":9}],31:[function(require,module,exports){
// hbsfy compiled Handlebars template
var HandlebarsCompiler = require('hbsfy/runtime');
module.exports = HandlebarsCompiler.template({"1":function(depth0,helpers,partials,data) {
    var stack1, alias1=helpers.helperMissing, alias2=this.escapeExpression, alias3=this.lambda;

  return "        <li class=\"swiper-slide\">\n            <a class=\""
    + alias2((helpers.type || (depth0 && depth0.type) || alias1).call(depth0,depth0,{"name":"type","hash":{},"data":data}))
    + "\" data-story-id=\""
    + alias2(alias3((depth0 != null ? depth0.productId : depth0), depth0))
    + "\" target=\"_blank\" href=\""
    + alias2(alias3((depth0 != null ? depth0.url : depth0), depth0))
    + "\">\n                <div>\n"
    + ((stack1 = (helpers.ifAd || (depth0 && depth0.ifAd) || alias1).call(depth0,depth0,{"name":"ifAd","hash":{},"fn":this.program(2, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "                    <img src=\""
    + alias2((helpers.rect || (depth0 && depth0.rect) || alias1).call(depth0,(depth0 != null ? depth0.image : depth0),{"name":"rect","hash":{},"data":data}))
    + "\">\n                    <h5 title=\""
    + alias2(alias3((depth0 != null ? depth0.name : depth0), depth0))
    + "\">"
    + alias2(alias3((depth0 != null ? depth0.name : depth0), depth0))
    + "</h5>\n                </div>\n            </a>\n        </li>\n";
},"2":function(depth0,helpers,partials,data) {
    return "                    <span class=\"dyg-valldemossa dyg-valldemossa-indicator\"><span>R</span>REKLAM</span>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<style>\n.recommended-stories-for-article{margin:5px auto;overflow:hidden; padding:5px 0px; position:relative; box-sizing:border-box;}\n.recommended-stories-for-article .swiper-slide{width:210px; margin: 0px 5px; overflow:hidden;box-shadow: 0 2px 0 #ccc; border-radius: 2px; }\n.recommended-stories-for-article .swiper-slide:first-child{margin-left: 0px;}\n.recommended-stories-for-article .swiper-slide:last-child{margin-right: 0px;}\n.recommended-stories-for-article .swiper-button-next, .recommended-stories-for-article .swiper-button-prev{z-index:1!important;}\n.recommended-stories-for-article li a {color:#4d4d4d;display:block;}\n.recommended-stories-for-article li a:hover {color:#007fbd;}\n.recommended-stories-for-article li a div{background-color:#fff;}\n.recommended-stories-for-article li a div h5{font-size:14px;line-height: 16px; padding:5px 10px; height:50px; overflow:hidden; display: table-cell;vertical-align: top;}\n.recommended-stories-for-article li a.PhotoGallery div h5:before{content:'f'!important; display:block;float:left;position:absolute;top:0px;left:0px;margin-top:101px;margin-left:5px;font-family:ntv!important;font-style:normal!important;font-weight:400!important;font-variant:normal!important;text-transform:none!important;speak:none;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;font-size:24px;line-height:24px;color:#4d4d4d; }\n.recommended-stories-for-article li a.VideoGallery div h5:before{content:'e'!important; display:block;float:left;position:absolute;top:0px;left:0px;margin-top:103px;margin-left:5px;font-family:ntv!important;font-style:normal!important;font-weight:400!important;font-variant:normal!important;text-transform:none!important;speak:none;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;font-size:24px;line-height:24px;color:#4d4d4d; }\n.recommended-stories-for-article li a.PhotoGallery div h5,.recommended-stories-for-article li a.VideoGallery div h5 {padding-left:32px;}\n.recommended-stories-for-article li a.PhotoGallery:hover div h5:before,.recommended-stories-for-article li a.VideoGallery:hover div h5:before {color:#007fbd;}\n.recommended-stories-for-article li a.Reklam div {background-color: #EDF7FA!important;}\n.recommended-stories-for-article .dyg-valldemossa{position: absolute;right: 0px;top: 0px;background-color: #007fbd;font: 400 11px titillium_websemibold,Tahoma,Geneva,sans-serif;color: #fff;padding: 4px 7px 4px 34px;width: 44px;height:16px;border: none;}\n.recommended-stories-for-article .dyg-valldemossa>span{display: block;float: left;position: absolute;left: 0;top: 0;width: 24px;height: 100%;-webkit-box-sizing: border-box;-moz-box-sizing: border-box;box-sizing: border-box;background-color: #b3d9eb!important;font-size: 13px;color: #198cc3;text-align: center;padding-top: 3px;}\n@media (max-width:640px){.recommended-stories-for-article{width:320px;}}\n@media(min-width:640px) and (max-width:960px){.recommended-stories-for-article{width:640px;}}\n@media(min-width:960px){.recommended-stories-for-article{width:950px;}}\n</style>\n<div class=\"recommended-stories-for-article seg_tracking_block\">\n    <ul class=\"swiper-wrapper\">\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.stories : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "    </ul>\n    <div class=\"swiper-button-next\"></div>\n    <div class=\"swiper-button-prev\"></div>\n</div>\n";
},"useData":true});

},{"hbsfy/runtime":9}],32:[function(require,module,exports){
// hbsfy compiled Handlebars template
var HandlebarsCompiler = require('hbsfy/runtime');
module.exports = HandlebarsCompiler.template({"1":function(depth0,helpers,partials,data) {
    var alias1=this.lambda, alias2=this.escapeExpression;

  return "            <li>\n                <a class=\"story\" data-story-id=\""
    + alias2(alias1((depth0 != null ? depth0.productId : depth0), depth0))
    + "\" target=\"_blank\" href=\""
    + alias2(alias1((depth0 != null ? depth0.url : depth0), depth0))
    + "\">\n                    <div>\n                        <img src=\""
    + alias2(alias1((depth0 != null ? depth0.image : depth0), depth0))
    + "\">\n                        <div class=\"index\">"
    + alias2((helpers.inc || (depth0 && depth0.inc) || helpers.helperMissing).call(depth0,(data && data.index),{"name":"inc","hash":{},"data":data}))
    + "</div>\n                        <h5 title=\""
    + alias2(alias1((depth0 != null ? depth0.name : depth0), depth0))
    + "\">"
    + alias2(alias1((depth0 != null ? depth0.name : depth0), depth0))
    + "</h5>\n                    </div>\n                </a>\n            </li>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<style>\n.trending-stories{}\n.trending-stories>div {margin: 0 5px 10px 5px; float: left; width:310px; border:1px solid #e6e6e6;background-color: #fff; border-bottom: 3px solid #d8d8d8!important;  box-sizing: border-box;}\n.trending-stories .trending-on-facebook {}\n.trending-stories .trending-on-twitter {}\n.trending-stories .trending-on-web {}\n.trending-stories h4 {background-color: #e3e6ea;padding: 10px; margin:5px;border: 1px solid #d8d8d8; border-bottom: 2px solid #d8d8d8!important; font-size: 18px; }\n.trending-stories ul{list-style-type: none;}\n.trending-stories li {}\n\n.trending-stories li:nth-child(n+6) {display:none;}\n.trending-stories li a .index {color: #ccc;background-color: #005d8a; position: absolute; padding: 3px 0px 4px 8px;  font-size:16px; left:33px; top:33px; font-weight:900; border: 0px solid #ccc; height: 16px;width: 16px;border-radius: 50%;}\n.trending-stories li a:hover .index{background-color:#f9b320!important;color: #005d8a!important;}\n.trending-stories li a img{float:left; border: 2px solid #ccc; height: 50px;width: 50px;border-radius: 50%; display: block;}\n.trending-stories li a:hover img{border: 2px solid #f9b320!important;}\n.trending-stories li a>div{float:left; margin-left:5px; margin-top:3px; position:relative; border-bottom: 1px solid #e6e6e6; width:300px; }\n.trending-stories li:last-child a>div{border-bottom: 0px solid #e6e6e6; margin-bottom:4px;}\n.trending-stories li a {color: #4d4d4d; box-sizing: border-box;     }\n.trending-stories li a:hover{color: #007fbd;}\n.trending-stories li a h5{font-weight: 900;padding-left:10px;overflow: hidden;font-size: 14px;height: 58px;display: table-cell;vertical-align: middle;}\n@media (max-width:640px) {\n    \n}\n@media(min-width:640px) and (max-width:960px)\n{\n.trending-stories .trending-on-web{display:none;}\n}\n</style>\n<div class=\"trending-stories\">\n    <div class=\"trending-on-facebook\">\n        <h4>Facebook'ta popüler</h4>\n        <ul>\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.facebook : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "        </ul>\n    </div>\n    <div class=\" trending-on-twitter \">\n        <h4>Twitter'da popüler</h4>\n        <ul>\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.twitter : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "        </ul>\n    </div>\n    <div class=\"trending-on-web\">\n        <h4>En çok okunanlar</h4>\n        <ul>\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.all : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "        </ul>\n    </div>\n</div>";
},"useData":true});

},{"hbsfy/runtime":9}],33:[function(require,module,exports){
// hbsfy compiled Handlebars template
var HandlebarsCompiler = require('hbsfy/runtime');
module.exports = HandlebarsCompiler.template({"1":function(depth0,helpers,partials,data) {
    var alias1=this.lambda, alias2=this.escapeExpression;

  return "                <li>\n                    <a class=\"gallery\" data-story-id=\""
    + alias2(alias1((depth0 != null ? depth0.productId : depth0), depth0))
    + "\" target=\"_self\" href=\""
    + alias2(alias1((depth0 != null ? depth0.url : depth0), depth0))
    + "\">\n                        <div>\n                            <img src=\""
    + alias2(alias1((depth0 != null ? depth0.image : depth0), depth0))
    + "\"> \n                            <h5 title=\""
    + alias2(alias1((depth0 != null ? depth0.name : depth0), depth0))
    + "\">"
    + alias2(alias1((depth0 != null ? depth0.name : depth0), depth0))
    + "</h5>\n                        </div>\n                    </a>\n                </li>\n";
},"3":function(depth0,helpers,partials,data) {
    var alias1=this.lambda, alias2=this.escapeExpression;

  return "                <li>\n                    <a class=\"video\" data-story-id=\""
    + alias2(alias1((depth0 != null ? depth0.productId : depth0), depth0))
    + "\" target=\"_self\" href=\""
    + alias2(alias1((depth0 != null ? depth0.url : depth0), depth0))
    + "\">\n                        <div>\n                            <img src=\""
    + alias2(alias1((depth0 != null ? depth0.image : depth0), depth0))
    + "\"> \n                            <h5 title=\""
    + alias2(alias1((depth0 != null ? depth0.name : depth0), depth0))
    + "\">"
    + alias2(alias1((depth0 != null ? depth0.name : depth0), depth0))
    + "</h5>\n                        </div>\n                    </a>\n                </li>\n";
},"5":function(depth0,helpers,partials,data) {
    var alias1=this.lambda, alias2=this.escapeExpression;

  return "                <li>\n                    <a class=\"story\" data-story-id=\""
    + alias2(alias1((depth0 != null ? depth0.productId : depth0), depth0))
    + "\" target=\"_self\" href=\""
    + alias2(alias1((depth0 != null ? depth0.url : depth0), depth0))
    + "\">\n                        <div>\n                            <div class=\"index\">0"
    + alias2((helpers.inc || (depth0 && depth0.inc) || helpers.helperMissing).call(depth0,(data && data.index),{"name":"inc","hash":{},"data":data}))
    + "/</div>\n                            <h5 title=\""
    + alias2(alias1((depth0 != null ? depth0.name : depth0), depth0))
    + "\">"
    + alias2(alias1((depth0 != null ? depth0.name : depth0), depth0))
    + "</h5>\n                        </div>\n                    </a>\n                </li>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<style>\n.recommended-stories{width:100%; background-color:#2d2f33!important; }\n.recommended-stories .content{margin: 0 auto;}\n.recommended-stories>div>div {margin: 0 5px 10px 5px; float: left; width:310px;}\n.recommended-stories h4 { color:#cccccd; padding: 10px; margin:5px; border-bottom: 1px solid #3b3b3b; font-size: 20px; }\n.recommended-stories ul{list-style-type: none;}\n.recommended-stories li {}\n.recommended-stories li a img{ height: 146px;width: 146px;}\n.recommended-stories li a>div{float:left; width:155px; height:254px;display:block; position:relative;}\n.recommended-stories li a {color: #cccccd; }\n.recommended-stories li a:hover{color: #fff;}\n.recommended-stories li a h5{font-weight: 900;padding-left:10px;overflow: hidden;font-size: 14px; }\n.recommended-stories .trending-galleries li:nth-child(n+5) {display:none;}\n.recommended-stories .trending-videos li:nth-child(n+5) {display:none;}\n.recommended-stories .trending-stories li:nth-child(n+6) {display:none;}\n.recommended-stories .trending-stories li a>div{height:80px; width:300px; border-bottom: 1px solid #3b3b3b;position:relative; }\n.recommended-stories .trending-stories li a .index{float:left;font-size:40px;font-weight:400; width:76px; padding-top:12px;}\n.recommended-stories .trending-stories li a h5{width:200px; height:80px; font-weight: 400; overflow: hidden;font-size: 16px; display:table-cell; vertical-align: middle;}\n.recommended-stories .trending-videos a.video>div :before{display:block;float:left;position:absolute;top:50%;left:50%;margin-top:-80px;margin-left:-30px;content:'3'!important;font-family:ntv!important;font-style:normal!important;font-weight:400!important;font-variant:normal!important;text-transform:none!important;speak:none;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;font-size:50px;line-height:50px;color:#fff}\n@media (max-width:640px) \n{\n    .recommended-stories .content{width:320px;height: 1755px; }\n}\n@media(min-width:640px) and (max-width:960px)\n{\n    .recommended-stories .content{width:640px; height: 585px;} \n    .recommended-stories .trending-stories{display:none;}\n}\n@media(min-width:960px) \n{\n    .recommended-stories .content{width:960px;height: 585px; } \n}\n</style>\n<div class=\"recommended-stories\">\n    <div class=\"content\">\n        <div class=\"trending-galleries\">\n            <h4>En çok görüntülenenler</h4>\n            <ul>\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.gallery : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "            </ul>\n        </div>\n        <div class=\"trending-videos \">\n            <h4>En çok izlenenler</h4>\n            <ul>\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.video : depth0),{"name":"each","hash":{},"fn":this.program(3, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "            </ul>\n        </div>\n        <div class=\"trending-stories\">\n            <h4>En çok okunanlar</h4>\n            <ul>\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.story : depth0),{"name":"each","hash":{},"fn":this.program(5, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "            </ul>\n        </div>\n    </div>\n</div>\n";
},"useData":true});

},{"hbsfy/runtime":9}],34:[function(require,module,exports){
arguments[4][33][0].apply(exports,arguments)
},{"dup":33,"hbsfy/runtime":9}],35:[function(require,module,exports){
// hbsfy compiled Handlebars template
var HandlebarsCompiler = require('hbsfy/runtime');
module.exports = HandlebarsCompiler.template({"1":function(depth0,helpers,partials,data) {
    return "<style>\n.trending-video-recommendation{height:240px; overflow:hidden;box-sizing:border-box;}\n.trending-video-recommendation h4 {position:relative;padding:10px 5px 10px 32px; margin:5px 0px; border-bottom: 2px solid #d8d8d8!important; font-size: 16px; }\n.trending-video-recommendation li{width: 305px; float:left; margin:5px!important;background-color: #fff;overflow:hidden;box-shadow: 0 2px 0 #ccc; border-radius: 2px; }\n.trending-video-recommendation li a>div{position:relative;}\n.trending-video-recommendation li a {color:#4d4d4d;display:block;}\n.trending-video-recommendation li a:hover {color:#007fbd;}\n.trending-video-recommendation li a:hover span {color:#4d4d4d;}\n.trending-video-recommendation li a img{width:100%;}\n.trending-video-recommendation li a h5{height:38px; padding:10px;overflow:hidden;}\n.trending-video-recommendation li a span{font-size:12px; display :block; float:right; margin:5px;}\n.trending-video-recommendation li a.VideoGallery>div:before{display:block; float:left; position:absolute;top:50%;left:50%;margin-top:-55px;margin-left:-30px;content:'3'!important;font-family:ntv!important;font-style:normal!important;font-weight:400!important;font-variant:normal!important;text-transform:none!important;speak:none;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;font-size:50px;line-height:50px;color:#fff; opacity:0.75;}\n.trending-video-recommendation li a.VideoGallery:hover>div:before{opacity:0.85;}\n.trending-video-recommendation h4:before {content:'e'!important; display:block;float:left;position:absolute;top:0px;left:0px;margin-top:7px;margin-left:5px;font-family:ntv!important;font-style:normal!important;font-weight:400!important;font-variant:normal!important;text-transform:none!important;speak:none;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;font-size:24px;line-height:24px;color:#4d4d4d; }\n@media (max-width:640px){.trending-video-recommendation{width:310px;}.trending-video-recommendation li:last-child{display:none;}.trending-video-recommendation li{width:300px;}}\n@media(min-width:640px) and (max-width:960px){.trending-video-recommendation{width:630px;}}\n@media(min-width:960px){.trending-video-recommendation{width:630px;}}\n</style>\n";
},"3":function(depth0,helpers,partials,data) {
    var alias1=helpers.helperMissing, alias2=this.escapeExpression, alias3=this.lambda;

  return "                <li>\n                    <a class=\""
    + alias2((helpers.type || (depth0 && depth0.type) || alias1).call(depth0,depth0,{"name":"type","hash":{},"data":data}))
    + "\" data-story-id=\""
    + alias2(alias3((depth0 != null ? depth0.productId : depth0), depth0))
    + "\" target=\"_blank\" href=\""
    + alias2(alias3((depth0 != null ? depth0.url : depth0), depth0))
    + "\">\n                        <div>\n        \n                            <img src=\""
    + alias2((helpers.pan || (depth0 && depth0.pan) || alias1).call(depth0,(depth0 != null ? depth0.image : depth0),{"name":"pan","hash":{},"data":data}))
    + "\">\n                            <h5 title=\""
    + alias2(alias3((depth0 != null ? depth0.name : depth0), depth0))
    + "\">"
    + alias2(alias3((depth0 != null ? depth0.name : depth0), depth0))
    + "</h5>\n                            <span> <strong>"
    + alias2(helpers['toLocaleString'].call(depth0,(depth0 != null ? depth0.noResetCounter : depth0),{"name":"toLocaleString","hash":{},"data":data}))
    + "</strong> kişi tarafından izlendi.</span>\n                        </div>\n                    </a>\n                </li>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.isFirst : depth0),{"name":"if","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "<div class=\"trending-video-recommendation\" style=\"display:none;\">\n    <h4>Popüler videolarımızı kaçırmayın</h4>\n    <ul>\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.videos : depth0),{"name":"each","hash":{},"fn":this.program(3, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "    </ul>\n\n</div>";
},"useData":true});

},{"hbsfy/runtime":9}],36:[function(require,module,exports){
// hbsfy compiled Handlebars template
var HandlebarsCompiler = require('hbsfy/runtime');
module.exports = HandlebarsCompiler.template({"1":function(depth0,helpers,partials,data) {
    var alias1=this.lambda, alias2=this.escapeExpression, alias3=helpers.helperMissing;

  return "        <div class=\"vg-box vg-box__medium cf\">\n            <figure>\n                <a data-story-id=\""
    + alias2(alias1((depth0 != null ? depth0.productId : depth0), depth0))
    + "\" href=\""
    + alias2(alias1((depth0 != null ? depth0.url : depth0), depth0))
    + "\">\n                    <img src=\""
    + alias2((helpers.rect || (depth0 && depth0.rect) || alias3).call(depth0,(depth0 != null ? depth0.image : depth0),{"name":"rect","hash":{},"data":data}))
    + "\" alt=\""
    + alias2(alias1((depth0 != null ? depth0.name : depth0), depth0))
    + "\">\n                </a>\n            </figure>\n            <div class=\"detail\">\n                <a class=\"vg-box__title\" data-story-id=\""
    + alias2(alias1((depth0 != null ? depth0.productId : depth0), depth0))
    + "\" href=\""
    + alias2(alias1((depth0 != null ? depth0.url : depth0), depth0))
    + "\">"
    + alias2(alias1((depth0 != null ? depth0.name : depth0), depth0))
    + "</a>\n                <span class=\"clock\">"
    + alias2((helpers.toLocaleDate || (depth0 && depth0.toLocaleDate) || alias3).call(depth0,(depth0 != null ? depth0.insertTime : depth0),{"name":"toLocaleDate","hash":{},"data":data}))
    + "</span>\n            </div>\n        </div>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"vg-content__all cf\">\n    <h2>Öneriler</h2>\n    <div class=\"cf\">\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.videos : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "    </div>\n</div>";
},"useData":true});

},{"hbsfy/runtime":9}],37:[function(require,module,exports){
'use strict';

exports.isPhone = function() {
    return (this.isiPhone() || this.isWindowsPhone() || this.isAndroidPhone());
};

exports.isTablet = function() {
    return (this.isiPad() || this.isAndroidTablet());
};

exports.isiPad = function() {
    return (navigator.userAgent.match(/iPad/i) == 'iPad');
};

exports.isiPhone = function() {
    return (navigator.userAgent.match(/iPhone/i) == 'iPhone');
};

exports.isWindowsPhone = function() {
    return (navigator.userAgent.match(/Windows Phone/i) == 'Windows Phone');
};

exports.isAndroidPhone = function() {
    if (navigator.userAgent.match(/Android/i)) {
        return (navigator.userAgent.match(/Mobile/i) == "Mobile")
    }
    return false;
};

exports.isAndroidTablet = function() {
    if (navigator.userAgent.match(/Android/i)) {
        return (navigator.userAgent.match(/Mobile/i) == null)
    }

    return false;
};

exports.isDesktop = function() {
    if (this.isiPad() == false &&
        this.isiPhone() == false &&
        this.isWindowsPhone() == false &&
        this.isAndroidPhone() == false &&
        this.isAndroidTablet() == false) {
        return true;
    }
    return false;
};
},{}],38:[function(require,module,exports){
'use strict';

exports.init = function() {

};

exports.ENV = function() {
    return location.hostname === "www.ntv.com.tr" ? 'production' : 'staging';
};

exports.getMetaTagByProperty = function(param) {
    var metas = document.getElementsByTagName('meta');
    for (var i = 0; i < metas.length; i++) {
        if (metas[i].getAttribute("property") == param) {
            var val = metas[i].getAttribute("content");
            if (val == null) {
                val = "";
            }
            return val;
        }
    }
    return null;
};

exports.isMainPage = function() {
    var regex01 = new RegExp("http(s?):\/\/(www|staging|test)\.ntv\.com\.tr(\/?)\s");
    var regex02 = new RegExp("http(s?):\/\/(www|staging|test)\.ntv\.com\.tr(\/?)#(.*)");
    var regex03 = new RegExp("http(s?):\/\/(www|staging|test)\.ntv\.com\.tr(\/?)\?(.*)");
    return regex01.test(window.location.href) || regex02.test(window.location.href) || regex03.test(window.location.href);
};

exports.isCategory = function() {
    var regex01 = new RegExp("http(s?):\/\/(www|staging|test)\.ntv\.com\.tr\/(turkiye|dunya|ekonomi|spor|saglik|egitim|teknoloji|yasam|secim-2015|sanat|ortak-gelecek|otomobil|emlak)(\/?)\s");
    var regex02 = new RegExp("http(s?):\/\/(www|staging|test)\.ntv\.com\.tr\/(turkiye|dunya|ekonomi|spor|saglik|egitim|teknoloji|yasam|secim-2015|sanat|ortak-gelecek|otomobil|emlak)(\/?)\?(.*)");
    var regex03 = new RegExp("http(s?):\/\/(www|staging|test)\.ntv\.com\.tr\/(turkiye|dunya|ekonomi|spor|saglik|egitim|teknoloji|yasam|secim-2015|sanat|ortak-gelecek|otomobil|emlak)(\/?)#(.*)");
    return regex01.test(window.location.href) || regex02.test(window.location.href) || regex03.test(window.location.href);
};

exports.onCategory = function(categories) {
    var regex = new RegExp("http(s?):\/\/(www|staging|test)\.ntv\.com\.tr\/(video\/|galeri\/)?(" + categories + ")(\/?)(.*)\s");
    return regex.test(window.location.href);
};

exports.isArticle = function() {
    var regex = new RegExp("http(s?):\/\/(www|staging|test)\.ntv\.com\.tr\/(turkiye|dunya|ekonomi|spor|saglik|egitim|teknoloji|yasam|secim-2015|sanat|ortak-gelecek|otomobil|emlak)\/(.+)(,|%2c)(.+)");
    return regex.test(window.location.href);
};

exports.isVideo = function() {
    var regex = new RegExp("http(s?):\/\/(www|staging|test)\.ntv\.com\.tr\/video(\/)(.*)(,|%2c)(.*)");
    return regex.test(window.location.href);
};

exports.isGallery = function() {
    var regex = new RegExp("http(s?):\/\/(www|staging|test)\.ntv\.com\.tr\/galeri(\/)(.*)(,|%2c)(.*)");
    return regex.test(window.location.href);
};

exports.getType = function() {

    if (this.isGallery()) {
        return "gallery_page";
    }
    else if (this.isVideo()) {
        return "video_page";
    }
    else if (this.isArticle()) {
        return "article_page";
    }
    else if (this.isCategory()) {
        return "category_landing_page";
    }
    else if (this.isMainPage()) {
        return "main_page";
    }
    else {
        return "other";
    }
};
},{}],39:[function(require,module,exports){
//events - a super-basic Javascript (publish subscribe) pattern
'use strict';

var _events = {
    events: {},
    on: function(eventName, fn) {
        this.events[eventName] = this.events[eventName] || [];
        this.events[eventName].push(fn);
    },
    off: function(eventName, fn) {
        if (this.events[eventName]) {
            for (var i = 0; i < this.events[eventName].length; i++) {
                if (this.events[eventName][i] === fn) {
                    this.events[eventName].splice(i, 1);
                    break;
                }
            }
        }
    },
    emit: function(eventName, data) {
        if (this.events[eventName]) {
            this.events[eventName].forEach(function(fn) {
                fn(data);
            });
        }
    }
};

exports.events = _events;

},{}]},{},[10]);
