// ============================================
// COMPLETE BROWSER NORMALIZATION & POLYFILLS
// ============================================

(function () {
    'use strict';

    // ============================================
    // 1. FETCH API POLYFILL
    // ============================================
    if (!window.fetch) {
        window.fetch = function (url, options) {
            return new Promise(function (resolve, reject) {
                var xhr = new XMLHttpRequest();
                options = options || {};

                xhr.open(options.method || 'GET', url, true);

                // Set headers
                if (options.headers) {
                    Object.keys(options.headers).forEach(function (key) {
                        xhr.setRequestHeader(key, options.headers[key]);
                    });
                }

                xhr.onload = function () {
                    var response = {
                        ok: xhr.status >= 200 && xhr.status < 300,
                        status: xhr.status,
                        statusText: xhr.statusText,
                        url: url,
                        headers: {
                            get: function (name) {
                                return xhr.getResponseHeader(name);
                            }
                        },
                        text: function () {
                            return Promise.resolve(xhr.responseText);
                        },
                        json: function () {
                            try {
                                return Promise.resolve(JSON.parse(xhr.responseText));
                            } catch (e) {
                                return Promise.reject(e);
                            }
                        },
                        blob: function () {
                            return Promise.resolve(new Blob([xhr.response]));
                        },
                        arrayBuffer: function () {
                            return Promise.resolve(xhr.response);
                        }
                    };
                    resolve(response);
                };

                xhr.onerror = function () {
                    reject(new TypeError('Network request failed'));
                };

                xhr.ontimeout = function () {
                    reject(new TypeError('Network request timed out'));
                };

                xhr.send(options.body || null);
            });
        };
    }

    // ============================================
    // 2. PROMISE POLYFILL (if not loaded from CDN)
    // ============================================
    if (typeof Promise === 'undefined') {
        window.Promise = function (executor) {
            var self = this;
            self.status = 'pending';
            self.value = undefined;
            self.callbacks = [];

            function resolve(value) {
                if (self.status !== 'pending') return;
                self.status = 'fulfilled';
                self.value = value;
                self.callbacks.forEach(function (cb) {
                    cb.onFulfilled(value);
                });
            }

            function reject(reason) {
                if (self.status !== 'pending') return;
                self.status = 'rejected';
                self.value = reason;
                self.callbacks.forEach(function (cb) {
                    cb.onRejected(reason);
                });
            }

            self.then = function (onFulfilled, onRejected) {
                return new Promise(function (resolve, reject) {
                    function handle() {
                        var callback = self.status === 'fulfilled' ? onFulfilled : onRejected;
                        if (!callback) {
                            (self.status === 'fulfilled' ? resolve : reject)(self.value);
                            return;
                        }
                        try {
                            resolve(callback(self.value));
                        } catch (e) {
                            reject(e);
                        }
                    }

                    if (self.status === 'pending') {
                        self.callbacks.push({ onFulfilled: handle, onRejected: handle });
                    } else {
                        setTimeout(handle, 0);
                    }
                });
            };

            self.catch = function (onRejected) {
                return self.then(null, onRejected);
            };

            try {
                executor(resolve, reject);
            } catch (e) {
                reject(e);
            }
        };

        Promise.resolve = function (value) {
            return new Promise(function (resolve) {
                resolve(value);
            });
        };

        Promise.reject = function (reason) {
            return new Promise(function (resolve, reject) {
                reject(reason);
            });
        };

        Promise.all = function (promises) {
            return new Promise(function (resolve, reject) {
                var results = [];
                var remaining = promises.length;
                if (remaining === 0) return resolve(results);

                promises.forEach(function (promise, index) {
                    Promise.resolve(promise).then(function (value) {
                        results[index] = value;
                        remaining--;
                        if (remaining === 0) resolve(results);
                    }, reject);
                });
            });
        };

        Promise.race = function (promises) {
            return new Promise(function (resolve, reject) {
                promises.forEach(function (promise) {
                    Promise.resolve(promise).then(resolve, reject);
                });
            });
        };
    }

    // ============================================
    // 3. CONSOLE POLYFILL
    // ============================================
    if (!window.console) {
        window.console = {
            log: function () { },
            error: function () { },
            warn: function () { },
            info: function () { },
            debug: function () { },
            trace: function () { },
            dir: function () { },
            group: function () { },
            groupEnd: function () { },
            time: function () { },
            timeEnd: function () { },
            assert: function () { }
        };
    }

    // ============================================
    // 4. ARRAY METHOD POLYFILLS
    // ============================================
    if (!Array.prototype.forEach) {
        Array.prototype.forEach = function (callback, thisArg) {
            for (var i = 0; i < this.length; i++) {
                if (i in this) {
                    callback.call(thisArg, this[i], i, this);
                }
            }
        };
    }

    if (!Array.prototype.map) {
        Array.prototype.map = function (callback, thisArg) {
            var result = [];
            for (var i = 0; i < this.length; i++) {
                if (i in this) {
                    result[i] = callback.call(thisArg, this[i], i, this);
                }
            }
            return result;
        };
    }

    if (!Array.prototype.filter) {
        Array.prototype.filter = function (callback, thisArg) {
            var result = [];
            for (var i = 0; i < this.length; i++) {
                if (i in this && callback.call(thisArg, this[i], i, this)) {
                    result.push(this[i]);
                }
            }
            return result;
        };
    }

    if (!Array.prototype.find) {
        Array.prototype.find = function (callback, thisArg) {
            for (var i = 0; i < this.length; i++) {
                if (i in this && callback.call(thisArg, this[i], i, this)) {
                    return this[i];
                }
            }
            return undefined;
        };
    }

    if (!Array.prototype.findIndex) {
        Array.prototype.findIndex = function (callback, thisArg) {
            for (var i = 0; i < this.length; i++) {
                if (i in this && callback.call(thisArg, this[i], i, this)) {
                    return i;
                }
            }
            return -1;
        };
    }

    if (!Array.prototype.includes) {
        Array.prototype.includes = function (searchElement, fromIndex) {
            return this.indexOf(searchElement, fromIndex) !== -1;
        };
    }

    if (!Array.prototype.some) {
        Array.prototype.some = function (callback, thisArg) {
            for (var i = 0; i < this.length; i++) {
                if (i in this && callback.call(thisArg, this[i], i, this)) {
                    return true;
                }
            }
            return false;
        };
    }

    if (!Array.prototype.every) {
        Array.prototype.every = function (callback, thisArg) {
            for (var i = 0; i < this.length; i++) {
                if (i in this && !callback.call(thisArg, this[i], i, this)) {
                    return false;
                }
            }
            return true;
        };
    }

    if (!Array.prototype.reduce) {
        Array.prototype.reduce = function (callback, initialValue) {
            var hasInitial = arguments.length > 1;
            var accumulator = hasInitial ? initialValue : this[0];
            var startIndex = hasInitial ? 0 : 1;

            for (var i = startIndex; i < this.length; i++) {
                if (i in this) {
                    accumulator = callback(accumulator, this[i], i, this);
                }
            }
            return accumulator;
        };
    }

    if (!Array.from) {
        Array.from = function (arrayLike, mapFn, thisArg) {
            var result = [];
            for (var i = 0; i < arrayLike.length; i++) {
                result[i] = mapFn ? mapFn.call(thisArg, arrayLike[i], i) : arrayLike[i];
            }
            return result;
        };
    }

    if (!Array.isArray) {
        Array.isArray = function (arg) {
            return Object.prototype.toString.call(arg) === '[object Array]';
        };
    }

    // ============================================
    // 5. STRING METHOD POLYFILLS
    // ============================================
    if (!String.prototype.includes) {
        String.prototype.includes = function (search, start) {
            if (typeof start !== 'number') start = 0;
            return this.indexOf(search, start) !== -1;
        };
    }

    if (!String.prototype.startsWith) {
        String.prototype.startsWith = function (search, pos) {
            pos = !pos || pos < 0 ? 0 : +pos;
            return this.substring(pos, pos + search.length) === search;
        };
    }

    if (!String.prototype.endsWith) {
        String.prototype.endsWith = function (search, this_len) {
            if (this_len === undefined || this_len > this.length) {
                this_len = this.length;
            }
            return this.substring(this_len - search.length, this_len) === search;
        };
    }

    if (!String.prototype.trim) {
        String.prototype.trim = function () {
            return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
        };
    }

    if (!String.prototype.repeat) {
        String.prototype.repeat = function (count) {
            var result = '';
            for (var i = 0; i < count; i++) {
                result += this;
            }
            return result;
        };
    }

    if (!String.prototype.padStart) {
        String.prototype.padStart = function (targetLength, padString) {
            padString = padString || ' ';
            if (this.length >= targetLength) return String(this);
            targetLength = targetLength - this.length;
            while (padString.length < targetLength) {
                padString += padString;
            }
            return padString.slice(0, targetLength) + String(this);
        };
    }

    if (!String.prototype.padEnd) {
        String.prototype.padEnd = function (targetLength, padString) {
            padString = padString || ' ';
            if (this.length >= targetLength) return String(this);
            targetLength = targetLength - this.length;
            while (padString.length < targetLength) {
                padString += padString;
            }
            return String(this) + padString.slice(0, targetLength);
        };
    }

    // ============================================
    // 6. OBJECT METHOD POLYFILLS
    // ============================================
    if (!Object.assign) {
        Object.assign = function (target) {
            if (target == null) {
                throw new TypeError('Cannot convert undefined or null to object');
            }
            var to = Object(target);
            for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i];
                if (source != null) {
                    for (var key in source) {
                        if (Object.prototype.hasOwnProperty.call(source, key)) {
                            to[key] = source[key];
                        }
                    }
                }
            }
            return to;
        };
    }

    if (!Object.keys) {
        Object.keys = function (obj) {
            var keys = [];
            for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) {
                    keys.push(key);
                }
            }
            return keys;
        };
    }

    if (!Object.values) {
        Object.values = function (obj) {
            var values = [];
            for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) {
                    values.push(obj[key]);
                }
            }
            return values;
        };
    }

    if (!Object.entries) {
        Object.entries = function (obj) {
            var entries = [];
            for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) {
                    entries.push([key, obj[key]]);
                }
            }
            return entries;
        };
    }

    if (!Object.create) {
        Object.create = function (proto) {
            function F() { }
            F.prototype = proto;
            return new F();
        };
    }

    // ============================================
    // 7. NUMBER METHOD POLYFILLS
    // ============================================
    if (!Number.isNaN) {
        Number.isNaN = function (value) {
            return typeof value === 'number' && isNaN(value);
        };
    }

    if (!Number.isFinite) {
        Number.isFinite = function (value) {
            return typeof value === 'number' && isFinite(value);
        };
    }

    if (!Number.isInteger) {
        Number.isInteger = function (value) {
            return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
        };
    }

    if (!Number.parseInt) {
        Number.parseInt = parseInt;
    }

    if (!Number.parseFloat) {
        Number.parseFloat = parseFloat;
    }

    // ============================================
    // 8. DOM POLYFILLS
    // ============================================

    // Element.matches()
    if (!Element.prototype.matches) {
        Element.prototype.matches =
            Element.prototype.msMatchesSelector ||
            Element.prototype.webkitMatchesSelector ||
            Element.prototype.mozMatchesSelector ||
            Element.prototype.oMatchesSelector;
    }

    // Element.closest()
    if (!Element.prototype.closest) {
        Element.prototype.closest = function (s) {
            var el = this;
            do {
                if (Element.prototype.matches.call(el, s)) return el;
                el = el.parentElement || el.parentNode;
            } while (el !== null && el.nodeType === 1);
            return null;
        };
    }

    // Element.remove()
    if (!Element.prototype.remove) {
        Element.prototype.remove = function () {
            if (this.parentNode) {
                this.parentNode.removeChild(this);
            }
        };
    }

    // classList polyfill
    if (!('classList' in document.documentElement)) {
        Object.defineProperty(HTMLElement.prototype, 'classList', {
            get: function () {
                var self = this;
                function update(fn) {
                    return function (value) {
                        var classes = self.className.split(/\s+/g).filter(Boolean);
                        var index = classes.indexOf(value);
                        fn(classes, index, value);
                        self.className = classes.join(' ');
                    };
                }

                return {
                    add: update(function (classes, index, value) {
                        if (index === -1) classes.push(value);
                    }),
                    remove: update(function (classes, index) {
                        if (index !== -1) classes.splice(index, 1);
                    }),
                    toggle: update(function (classes, index, value) {
                        if (index !== -1) classes.splice(index, 1);
                        else classes.push(value);
                    }),
                    contains: function (value) {
                        return self.className.split(/\s+/g).indexOf(value) !== -1;
                    },
                    item: function (i) {
                        return self.className.split(/\s+/g)[i] || null;
                    }
                };
            }
        });
    }

    // NodeList.forEach()
    if (window.NodeList && !NodeList.prototype.forEach) {
        NodeList.prototype.forEach = Array.prototype.forEach;
    }

    // HTMLCollection.forEach()
    if (window.HTMLCollection && !HTMLCollection.prototype.forEach) {
        HTMLCollection.prototype.forEach = Array.prototype.forEach;
    }

    // ============================================
    // 9. EVENT HANDLING POLYFILLS
    // ============================================

    // addEventListener for IE8
    if (!window.addEventListener) {
        (function (WindowPrototype, DocumentPrototype, ElementPrototype) {
            WindowPrototype.addEventListener = DocumentPrototype.addEventListener = ElementPrototype.addEventListener = function (type, listener) {
                var target = this;
                target.attachEvent('on' + type, function () {
                    listener.call(target, window.event);
                });
            };

            WindowPrototype.removeEventListener = DocumentPrototype.removeEventListener = ElementPrototype.removeEventListener = function (type, listener) {
                var target = this;
                target.detachEvent('on' + type, listener);
            };
        })(Window.prototype, HTMLDocument.prototype, Element.prototype);
    }

    // CustomEvent polyfill
    if (typeof window.CustomEvent !== "function") {
        function CustomEvent(event, params) {
            params = params || { bubbles: false, cancelable: false, detail: null };
            var evt = document.createEvent('CustomEvent');
            evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
            return evt;
        }
        window.CustomEvent = CustomEvent;
    }

    // Event() constructor polyfill
    if (typeof window.Event !== 'function') {
        (function () {
            window.Event = function (type, eventInitDict) {
                eventInitDict = eventInitDict || {};
                var event = document.createEvent('Event');
                event.initEvent(
                    type,
                    eventInitDict.bubbles !== undefined ? eventInitDict.bubbles : false,
                    eventInitDict.cancelable !== undefined ? eventInitDict.cancelable : false
                );
                return event;
            };
        })();
    }

    // ============================================
    // 10. ANIMATION FRAME POLYFILLS
    // ============================================
    (function () {
        var lastTime = 0;
        var vendors = ['ms', 'moz', 'webkit', 'o'];
        for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
            window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
            window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||
                window[vendors[x] + 'CancelRequestAnimationFrame'];
        }

        if (!window.requestAnimationFrame) {
            window.requestAnimationFrame = function (callback) {
                var currTime = new Date().getTime();
                var timeToCall = Math.max(0, 16 - (currTime - lastTime));
                var id = window.setTimeout(function () {
                    callback(currTime + timeToCall);
                }, timeToCall);
                lastTime = currTime + timeToCall;
                return id;
            };
        }

        if (!window.cancelAnimationFrame) {
            window.cancelAnimationFrame = function (id) {
                clearTimeout(id);
            };
        }
    })();

    // ============================================
    // 11. URL & BLOB POLYFILLS
    // ============================================
    if (!window.URL || !window.URL.createObjectURL) {
        window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;
    }

    // ============================================
    // 12. JSON POLYFILL (for very old browsers)
    // ============================================
    if (!window.JSON) {
        window.JSON = {
            parse: function (text) {
                return eval('(' + text + ')');
            },
            stringify: function (value) {
                var type = typeof value;
                if (type === 'string') return '"' + value + '"';
                if (type === 'number' || type === 'boolean') return String(value);
                if (value === null) return 'null';
                if (type === 'object') {
                    if (Array.isArray(value)) {
                        return '[' + value.map(function (v) { return JSON.stringify(v); }).join(',') + ']';
                    }
                    var pairs = [];
                    for (var key in value) {
                        if (value.hasOwnProperty(key)) {
                            pairs.push('"' + key + '":' + JSON.stringify(value[key]));
                        }
                    }
                    return '{' + pairs.join(',') + '}';
                }
                return undefined;
            }
        };
    }

    // ============================================
    // 13. SETTIMEOUT/SETINTERVAL FIX FOR IE
    // ============================================
    (function () {
        var originalSetTimeout = window.setTimeout;
        var originalSetInterval = window.setInterval;

        window.setTimeout = function (callback, delay) {
            var args = Array.prototype.slice.call(arguments, 2);
            return originalSetTimeout(function () {
                callback.apply(null, args);
            }, delay);
        };

        window.setInterval = function (callback, delay) {
            var args = Array.prototype.slice.call(arguments, 2);
            return originalSetInterval(function () {
                callback.apply(null, args);
            }, delay);
        };
    })();

    // ============================================
    // 14. FORMDATA CHECK
    // ============================================
    if (!window.FormData) {
        console.warn('FormData is not supported in this browser');
    }

    // ============================================
    // 15. VIEWPORT META TAG
    // ============================================
    if (!document.querySelector('meta[name="viewport"]')) {
        var meta = document.createElement('meta');
        meta.name = 'viewport';
        meta.content = 'width=device-width, initial-scale=1.0';
        document.getElementsByTagName('head')[0].appendChild(meta);
    }

    // ============================================
    // 16. PASSIVE EVENT LISTENER SUPPORT
    // ============================================
    window.passiveSupported = false;
    try {
        var options = {
            get passive() {
                window.passiveSupported = true;
                return false;
            }
        };
        window.addEventListener("test", null, options);
        window.removeEventListener("test", null, options);
    } catch (err) {
        window.passiveSupported = false;
    }

    // ============================================
    // 17. DATE.NOW() POLYFILL
    // ============================================
    if (!Date.now) {
        Date.now = function () {
            return new Date().getTime();
        };
    }

    // ============================================
    // 18. PERFORMANCE.NOW() POLYFILL
    // ============================================
    if (!window.performance) {
        window.performance = {};
    }
    if (!window.performance.now) {
        var nowOffset = Date.now();
        window.performance.now = function () {
            return Date.now() - nowOffset;
        };
    }

    // ============================================
    // 19. GETELEMENTSBYCLASSNAME FIX
    // ============================================
    if (!document.getElementsByClassName) {
        document.getElementsByClassName = function (className) {
            return document.querySelectorAll('.' + className);
        };
    }

})();

// ============================================
// CSS VENDOR PREFIX HELPER
// ============================================
(function () {
    var style = document.createElement('style');

    var prefixedCSS = `
        /* Transform */
        .transform { 
            -webkit-transform: translate(0,0);
            -moz-transform: translate(0,0);
            -ms-transform: translate(0,0);
            -o-transform: translate(0,0);
            transform: translate(0,0);
        }
        
        /* Transition */
        .transition {
            -webkit-transition: all 0.3s ease;
            -moz-transition: all 0.3s ease;
            -ms-transition: all 0.3s ease;
            -o-transition: all 0.3s ease;
            transition: all 0.3s ease;
        }
        
        /* Flexbox */
        .flex {
            display: -webkit-box;
            display: -webkit-flex;
            display: -moz-box;
            display: -ms-flexbox;
            display: flex;
        }
        
        /* User Select */
        .user-select-none {
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
        }
        
        /* Box Sizing (apply to all) */
        *, *:before, *:after {
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
        }
        
        /* Appearance */
        input, button, select, textarea {
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
        }
        
        /* Smooth Scrolling */
        html {
            -webkit-overflow-scrolling: touch;
        }
    `;

    style.textContent = prefixedCSS;
    if (document.head) {
        document.head.appendChild(style);
    } else {
        document.addEventListener('DOMContentLoaded', function () {
            document.head.appendChild(style);
        });
    }
})();

console.log('✅ Browser normalization complete - All polyfills loaded');