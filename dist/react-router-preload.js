/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.handler = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.withPreload = withPreload;
exports.fetchPreload = fetchPreload;
exports.createBrowserHistory = createBrowserHistory;

var _react = __webpack_require__(1);

var _reactRouterConfig = __webpack_require__(2);

var _history = __webpack_require__(3);

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @constant key
 * @type {String}
 */
var key = '@@react-router-component-will-fetch';

/**
 * @constant handler
 * @type {Symbol}
 */
var handler = exports.handler = Symbol('react-router/fetch-data');

/**
 * @constant defaultOptions
 * @type {Object}
 */
var defaultOptions = {
    createCancelToken: function createCancelToken() {
        return Symbol('cancelToken');
    },
    cancelOnEscape: true,
    routeTree: [],
    onEnter: function onEnter() {
        return console.log('Entering');
    },
    onLoaded: function onLoaded(location) {
        return console.log('Entered');
    },
    onCancel: function onCancel() {
        return console.log('Cancelled');
    }
};

/**
 * @method withPreload
 * @param {React.Component} WrappedComponent
 * @param {Promise} fetchData
 * @return {React.Component}
 */
function withPreload(WrappedComponent, fetchData) {
    var _class, _temp;

    return _temp = _class = function (_PureComponent) {
        _inherits(_class, _PureComponent);

        function _class() {
            _classCallCheck(this, _class);

            return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
        }

        _createClass(_class, [{
            key: 'render',


            /**
             * @method render
             * @return {XML}
             */


            /**
             * @constant handler
             * @type {Symbol}
             */
            value: function render() {
                return React.createElement(WrappedComponent, this.props);
            }

            /**
             * @constant displayName
             * @type {String}
             */

        }]);

        return _class;
    }(_react.PureComponent), _class[handler] = fetchData, _class.displayName = WrappedComponent.displayName || WrappedComponent.name, _temp;
}

/**
 * @method fetchPreload
 * @param {React.Component} Component
 * @param {Array} params
 * @return {Promise}
 */
function fetchPreload(Component) {
    for (var _len = arguments.length, params = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        params[_key - 1] = arguments[_key];
    }

    return handler in Component && Component[handler].apply(Component, params);
}

/**
 * @method createBrowserHistoryWithRouter
 * @param {Object} [instanceOptions = defaultOptions]
 * @return {Object}
 */
function createBrowserHistory() {
    var instanceOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultOptions;


    var options = _extends({}, defaultOptions, instanceOptions);

    /**
     * @param {Object} [browserHistoryOptions = {}]
     * @return {Object}
     */
    return function () {

        /**
         * @method handle
         * @param {Object} location
         * @param {Function} callback
         * @return {void}
         */
        var handle = function () {
            var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(location, callback) {
                var branches, cancelToken;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:

                                cancelAll();
                                options.onEnter(location);
                                transitions.add(callback);

                                branches = (0, _reactRouterConfig.matchRoutes)(options.routeTree, location.pathname);
                                cancelToken = options.createCancelToken();
                                _context.next = 7;
                                return Promise.all(branches.filter(function (branch) {
                                    return branch.route.component;
                                }).map(function (branch) {
                                    var params = { match: branch.match, cancelToken: cancelToken };
                                    return fetchPreload(branch.route.component, params);
                                }));

                            case 7:

                                if (transitions.has(callback)) {
                                    callback(true);
                                    transitions.clear();
                                    options.onLoaded(location);
                                }

                            case 8:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            return function handle(_x3, _x4) {
                return _ref.apply(this, arguments);
            };
        }();

        // Handle the event where the user hits the escape key during the transitioning phase.


        var browserHistoryOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};


        /**
         * @constant transitions
         * @type {Set}
         */
        var transitions = new Set();

        /**
         * @method cancelAll
         * @return {void}
         */
        function cancelAll() {
            transitions.size > 0 && options.onCancel(transitions.size);
            transitions.forEach(function (callback) {
                return callback(false);
            });
            transitions.clear();
        }options.cancelOnEscape && window.addEventListener('keydown', function (event) {
            return event.key === 'Escape' && cancelAll();
        });

        var history = (0, _history.createBrowserHistory)(_extends({}, browserHistoryOptions, {

            /**
             * @method getUserConfirmation
             * @param {String} message
             * @param {Function} callback
             * @return {Promise|void}
             */
            getUserConfirmation: function getUserConfirmation(message, callback) {

                switch (message) {

                    case key:
                        {
                            return handle(history.location, callback);
                        }

                    default:
                        {
                            var create = options.createUserConfirmation || function (message) {
                                return callback(window.confirm.message(message));
                            };
                            return create(message, callback);
                        }

                }
            }
        }));

        history.block(key);
        return history;
    };
}

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = react;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = react-router-config;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = history;

/***/ })
/******/ ]);