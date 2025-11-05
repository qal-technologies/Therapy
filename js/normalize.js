(function () {
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
                        headers: {
                            get: function (name) {
                                return xhr.getResponseHeader(name);
                            }
                        },
                        text: function () {
                            return Promise.resolve(xhr.responseText);
                        },
                        json: function () {
                            return Promise.resolve(JSON.parse(xhr.responseText));
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
})();

(function () {
    'use strict';

    // Feature Detection and Polyfills

    // 1. Console polyfill (for IE9 and below)
    if (!window.console) {
        window.console = {
            log: function () { },
            error: function () { },
            warn: function () { },
            info: function () { }
        };
    }

    // 2. Array methods polyfills
    if (!Array.prototype.forEach) {
        Array.prototype.forEach = function (callback, thisArg) {
            for (var i = 0; i < this.length; i++) {
                callback.call(thisArg, this[i], i, this);
            }
        };
    }

    if (!Array.prototype.map) {
        Array.prototype.map = function (callback, thisArg) {
            var result = [];
            for (var i = 0; i < this.length; i++) {
                result.push(callback.call(thisArg, this[i], i, this));
            }
            return result;
        };
    }

    if (!Array.prototype.filter) {
        Array.prototype.filter = function (callback, thisArg) {
            var result = [];
            for (var i = 0; i < this.length; i++) {
                if (callback.call(thisArg, this[i], i, this)) {
                    result.push(this[i]);
                }
            }
            return result;
        };
    }

    if (!Array.prototype.find) {
        Array.prototype.find = function (callback, thisArg) {
            for (var i = 0; i < this.length; i++) {
                if (callback.call(thisArg, this[i], i, this)) {
                    return this[i];
                }
            }
            return undefined;
        };
    }

    if (!Array.prototype.includes) {
        Array.prototype.includes = function (searchElement) {
            return this.indexOf(searchElement) !== -1;
        };
    }

    // 3. String methods polyfills
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

    // 4. Object methods polyfills
    if (!Object.assign) {
        Object.assign = function (target) {
            for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i];
                for (var key in source) {
                    if (source.hasOwnProperty(key)) {
                        target[key] = source[key];
                    }
                }
            }
            return target;
        };
    }

    if (!Object.keys) {
        Object.keys = function (obj) {
            var keys = [];
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    keys.push(key);
                }
            }
            return keys;
        };
    }

    // 5. Element.closest() polyfill
    if (!Element.prototype.matches) {
        Element.prototype.matches =
            Element.prototype.msMatchesSelector ||
            Element.prototype.webkitMatchesSelector;
    }

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

    // 6. requestAnimationFrame polyfill
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
    }());

    // 7. CustomEvent polyfill
    if (typeof window.CustomEvent !== "function") {
        function CustomEvent(event, params) {
            params = params || { bubbles: false, cancelable: false, detail: null };
            var evt = document.createEvent('CustomEvent');
            evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
            return evt;
        }
        window.CustomEvent = CustomEvent;
    }

    // 8. classList polyfill
    if (!('classList' in document.documentElement)) {
        Object.defineProperty(HTMLElement.prototype, 'classList', {
            get: function () {
                var self = this;
                function update(fn) {
                    return function (value) {
                        var classes = self.className.split(/\s+/g);
                        var index = classes.indexOf(value);
                        fn(classes, index, value);
                        self.className = classes.join(' ');
                    };
                }

                return {
                    add: update(function (classes, index, value) {
                        if (!~index) classes.push(value);
                    }),
                    remove: update(function (classes, index) {
                        if (~index) classes.splice(index, 1);
                    }),
                    toggle: update(function (classes, index, value) {
                        if (~index) classes.splice(index, 1);
                        else classes.push(value);
                    }),
                    contains: function (value) {
                        return !!~self.className.split(/\s+/g).indexOf(value);
                    },
                    item: function (i) {
                        return self.className.split(/\s+/g)[i] || null;
                    }
                };
            }
        });
    }

    // 9. addEventListener polyfill for IE8
    if (!window.addEventListener) {
        (function (WindowPrototype, DocumentPrototype, ElementPrototype) {
            WindowPrototype.addEventListener = DocumentPrototype.addEventListener = ElementPrototype.addEventListener = function (type, listener) {
                var target = this;
                target.attachEvent('on' + type, function () {
                    listener.call(target, window.event);
                });
            };
        })(Window.prototype, HTMLDocument.prototype, Element.prototype);
    }

    // 10. NodeList.forEach polyfill
    if (window.NodeList && !NodeList.prototype.forEach) {
        NodeList.prototype.forEach = Array.prototype.forEach;
    }

    // 11. URL polyfill for older browsers
    if (!window.URL || !window.URL.createObjectURL) {
        window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;
    }

    // 12. FormData polyfill check
    if (!window.FormData) {
        console.warn('FormData is not supported in this browser');
    }

    // 13. Add viewport meta if missing (mobile compatibility)
    if (!document.querySelector('meta[name="viewport"]')) {
        var meta = document.createElement('meta');
        meta.name = 'viewport';
        meta.content = 'width=device-width, initial-scale=1.0';
        document.getElementsByTagName('head')[0].appendChild(meta);
    }

    // 14. Passive event listener support check
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

})();

(function () {
    var prefixes = ['webkit', 'moz', 'ms', 'o'];
    var style = document.createElement('style');

    // Add prefixed CSS properties
    var prefixedCSS = `
        .transform { 
            -webkit-transform: translate(0,0);
            -moz-transform: translate(0,0);
            -ms-transform: translate(0,0);
            -o-transform: translate(0,0);
            transform: translate(0,0);
        }
        .transition {
            -webkit-transition: all 0.3s ease;
            -moz-transition: all 0.3s ease;
            -ms-transition: all 0.3s ease;
            -o-transition: all 0.3s ease;
            transition: all 0.3s ease;
        }
        .flex {
            display: -webkit-box;
            display: -webkit-flex;
            display: -moz-box;
            display: -ms-flexbox;
            display: flex;
        }
        .user-select-none {
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
        }
    `;

    style.textContent = prefixedCSS;
    document.head.appendChild(style);
})();