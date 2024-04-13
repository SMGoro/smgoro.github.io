define('ai-search-box-entry', ['require'], function (require) {
    return function (t) {
        var e = {};
        function n(i) {
            if (e[i])
                return e[i].exports;
            var s = e[i] = {
                i: i,
                l: !1,
                exports: {}
            };
            return t[i].call(s.exports, s, s.exports, n), s.l = !0, s.exports;
        }
        return n.m = t, n.c = e, n.d = function (t, e, i) {
            n.o(t, e) || Object.defineProperty(t, e, {
                enumerable: !0,
                get: i
            });
        }, n.r = function (t) {
            'undefined' != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, { value: 'Module' }), Object.defineProperty(t, '__esModule', { value: !0 });
        }, n.t = function (t, e) {
            if (1 & e && (t = n(t)), 8 & e)
                return t;
            if (4 & e && 'object' == typeof t && t && t.__esModule)
                return t;
            var i = Object.create(null);
            if (n.r(i), Object.defineProperty(i, 'default', {
                    enumerable: !0,
                    value: t
                }), 2 & e && 'string' != typeof t)
                for (var s in t)
                    n.d(i, s, function (e) {
                        return t[e];
                    }.bind(null, s));
            return i;
        }, n.n = function (t) {
            var e = t && t.__esModule ? function () {
                return t.default;
            } : function () {
                return t;
            };
            return n.d(e, 'a', e), e;
        }, n.o = function (t, e) {
            return Object.prototype.hasOwnProperty.call(t, e);
        }, n.p = '//ms.bdstatic.com/se/ai-search-fe/', n(n.s = 0);
    }({
        0: function (t, e, n) {
            t.exports = n('0c18');
        },
        '0c18': function (t, e, n) {
            'use strict';
            Object.defineProperty(e, '__esModule', { value: !0 }), e.AiSearchBoxEntry = void 0;
            var i, s = n('9ab4'), r = s.__importDefault(n('a0f1'));
            !function (t) {
                t.NewParams = 'ai-search-entry.new-params';
            }(i || (i = {}));
            var a = function () {
                function t() {
                    this.isInit = !1;
                }
                return t.prototype.emptyObj = function (t) {
                    return !t || 'object' == typeof t && 0 === Object.keys(t).length;
                }, t.prototype.formatParams = function (t) {
                    var e = '';
                    if (this.emptyObj(t))
                        return e;
                    var n = '';
                    for (var i in t)
                        if (t.hasOwnProperty(i)) {
                            var s = t[i];
                            e += n + i + '=' + ('object' == typeof s ? JSON.stringify(s) : s), n || (n = '&');
                        }
                    return e;
                }, t.prototype.formatUrl = function (t, e) {
                    void 0 === e && (e = {});
                    var n = this.formatParams(e), i = t || location.origin, s = i.indexOf('?') >= 0 ? '&' : '?';
                    return i + (n ? ''.concat(s).concat(n) : '');
                }, t.prototype.processAsyncChat = function (t) {
                    var e = this, n = (null == t ? void 0 : t.asyncRenderUrl) || 'https://chat.baidu.com';
                    (null == t ? void 0 : t.asyncRenderUrl) && delete t.asyncRenderUrl;
                    var i = this.formatUrl(n, t);
                    return new Promise(function (t, n) {
                        fetch(i, {
                            method: 'get',
                            mode: 'cors',
                            credentials: 'include'
                        }).then(function (i) {
                            return s.__awaiter(e, void 0, void 0, function () {
                                var e;
                                return s.__generator(this, function (s) {
                                    switch (s.label) {
                                    case 0:
                                        return '1' !== i.headers.get('Is-Kunlun') ? [
                                            3,
                                            1
                                        ] : (n(new Error('need validate')), [
                                            3,
                                            4
                                        ]);
                                    case 1:
                                        return i.ok ? [
                                            4,
                                            i.text()
                                        ] : [
                                            3,
                                            3
                                        ];
                                    case 2:
                                        return e = s.sent(), t(e), [
                                            3,
                                            4
                                        ];
                                    case 3:
                                        n('response not correct!'), s.label = 4;
                                    case 4:
                                        return [2];
                                    }
                                });
                            });
                        }).catch(function (t) {
                            n(t);
                        });
                    });
                }, t.prototype.runScript = function (t) {
                    return new Promise(function (e, n) {
                        var i = document.createElement('script');
                        if (i.innerHTML = t.innerHTML, t.getAttribute('data-for'))
                            e(!0);
                        else {
                            var s = t.getAttribute('src');
                            s && i.setAttribute('src', s), i.setAttribute('type', 'text/javascript'), i.readyState ? i.onreadystatechange = function () {
                                'loaded' !== i.readyState && 'complete' !== i.readyState || (i.onreadystatechange = null, e(!0));
                            } : i.onload = function () {
                                e(!0);
                            }, i.onerror = function (t) {
                                return n();
                            }, document.head.appendChild(i), setTimeout(function () {
                                document.head.removeChild(i);
                            }, 10), s || e(!0);
                        }
                    });
                }, t.prototype.setHTMLWithScript = function (t) {
                    var e = this, n = t.querySelectorAll('script');
                    return Array.prototype.slice.apply(n).reduce(function (t, n) {
                        return t.then(function () {
                            return e.runScript(n);
                        });
                    }, Promise.resolve());
                }, t.prototype.attachEntryStatusPage = function (t, e, n) {
                    var i = this;
                    if (t) {
                        this.detachUselessPage();
                        var a = new r.default({ data: s.__assign({ type: n }, e) });
                        a.on('reloadBtnClick', function () {
                            i.loadAISearch(t, e);
                        }), a.on('backBtnClick', function () {
                            i.exitContainer();
                        }), a.attach(t);
                    }
                }, t.prototype.exitContainer = function () {
                    var t = this.createEvent('ai-entry.close', 'Event');
                    window.dispatchEvent(t);
                }, t.prototype.detachUselessPage = function () {
                    var t, e = document.getElementById('ai-search-async-entry');
                    e && (null == e ? void 0 : e.parentNode) && (null === (t = null == e ? void 0 : e.parentNode) || void 0 === t || t.removeChild(e));
                }, t.prototype.isNotSupportShowContainer = function () {
                    var t = navigator.userAgent, e = t && (t.indexOf('mise') > -1 || t.indexOf('MISE') > -1 || t.indexOf('trident') > -1 || t.indexOf('Trident') > -1), n = !1, i = t && t.match(/(edge|edg)\/\d+/i);
                    i && (n = +(i[0] && i[0].split('/')[1]) < 79);
                    return e || n;
                }, t.prototype.createEvent = function (t, e, n) {
                    var i = navigator.userAgent;
                    if (/(mise|trident)/i.test(i)) {
                        var s = document.createEvent(e);
                        return 'Event' === e ? s.initEvent(t, !0, !1) : s.initCustomEvent(t, !0, !1, n), s;
                    }
                    return 'Event' === e ? new Event(t) : new CustomEvent(t, { detail: n });
                }, t.prototype.loadAISearch = function (t, e) {
                    var n = this, s = this.isNotSupportShowContainer();
                    if (t)
                        if (s)
                            this.attachEntryStatusPage(t, e, 'unsupport');
                        else if (this.isInit) {
                            var r = void 0;
                            (r = e ? this.createEvent(i.NewParams, 'CustomEvent', e) : this.createEvent(i.NewParams, 'Event')) && window.dispatchEvent(r);
                        } else {
                            this.attachEntryStatusPage(t, e, 'loading');
                            var a = this;
                            this.processAsyncChat(e).then(function (e) {
                                if (e) {
                                    var i = t || document.getElementById('app'), s = document.createElement('div');
                                    s.style.display = 'none', s.innerHTML = e, i.appendChild(s), n.setHTMLWithScript(s).then(function () {
                                        a.isInit = !0, n.detachUselessPage(), s.style.display = 'block';
                                    });
                                }
                            }).catch(function (i) {
                                i && 'need validate' === i.message ? window.location.href = ''.concat('https://chat.baidu.com', '?k_tag=1') : n.attachEntryStatusPage(t, e, 'error');
                            });
                        }
                    else
                        this.attachEntryStatusPage(t, e, 'error');
                }, t;
            }();
            e.AiSearchBoxEntry = a;
        },
        2377: function (t, e, n) {
            (function (e) {
                !function (n) {
                    var i = 1;
                    function s() {
                    }
                    function r(t, e) {
                        for (var n in e)
                            if (e.hasOwnProperty(n)) {
                                var i = e[n];
                                void 0 !== i && (t[n] = i);
                            }
                        return t;
                    }
                    function a(t, e) {
                        var n = t.prototype, i = new Function();
                        i.prototype = e.prototype, t.prototype = new i(), t.prototype.constructor = t, r(t.prototype, n);
                    }
                    function o(t, e) {
                        if (t && t.length > 0)
                            for (var n = 0, i = t.length; n < i && !1 !== e(t[n], n); n++);
                    }
                    function c(t, e, n, i) {
                        t.addEventListener ? t.addEventListener(e, n, i) : t.attachEvent('on' + e, n);
                    }
                    function p(t, e, n, i) {
                        t.addEventListener ? t.removeEventListener(e, n, i) : t.detachEvent('on' + e, n);
                    }
                    function h(t) {
                        var e = {};
                        return o(t.split(','), function (t) {
                            e[t] = t;
                        }), e;
                    }
                    var l = h('animate,animateMotion,animateTransform,circle,ellipse,line,polygon,polyline,rect,defs,g,marker,mask,missing-glyph,pattern,svg,symbol,desc,metadata,font,font-face,linearGradient,radialGradient,stop,image,path,use,glyph,textPath,text,tref,tspan,clipPath,cursor,filter,foreignObject,view');
                    function u(t) {
                        return l[t] && document.createElementNS ? document.createElementNS('http://www.w3.org/2000/svg', t) : document.createElement(t);
                    }
                    function d(t) {
                        t && t.parentNode && t.parentNode.removeChild(t);
                    }
                    var f, A = [], y = 'function' == typeof Promise && /native code/.test(Promise), g = 'function' == typeof e && /native code/.test(e);
                    function v(t, n) {
                        if (n && (t = function (t, e) {
                                var n = Function.prototype.bind, i = Array.prototype.slice;
                                if (n && t.bind === n)
                                    return n.apply(t, i.call(arguments, 1));
                                var s = i.call(arguments, 2);
                                return function () {
                                    return t.apply(e, s.concat(i.call(arguments)));
                                };
                            }(t, n)), A.push(t), !f)
                            if (f = function () {
                                    var t = A.slice(0);
                                    A = [], f = null;
                                    for (var e = 0, n = t.length; e < n; e++)
                                        t[e]();
                                }, g)
                                e(f);
                            else if ('function' == typeof MessageChannel) {
                                var i = new MessageChannel(), s = i.port2;
                                i.port1.onmessage = f, s.postMessage(1);
                            } else
                                y ? Promise.resolve().then(f) : setTimeout(f, 0);
                    }
                    var m = 'undefined' != typeof navigator && navigator.userAgent.match(/(msie|trident)(\s*|\/)([0-9]+)/i), x = m ? m[3] - 0 : 0;
                    x && !/msie/i.test(m[1]) && (x += 4);
                    var b = x && x < 9;
                    function _(t, e) {
                        var n = document.createEvent('HTMLEvents');
                        n.initEvent(e, !0, !0), t.dispatchEvent(n);
                    }
                    9 === x && c(document, 'selectionchange', function () {
                        var t = document.activeElement;
                        'TEXTAREA' !== t.tagName && 'INPUT' !== t.tagName || _(t, 'input');
                    });
                    var C = h('area,base,br,col,embed,hr,img,input,link,meta,param,source,track,wbr');
                    function k(t) {
                        var e = function () {
                        };
                        return e.isRequired = s, e;
                    }
                    var w = {
                        array: k(),
                        object: k(),
                        func: k(),
                        string: k(),
                        number: k(),
                        bool: k(),
                        symbol: k(),
                        any: k,
                        arrayOf: k,
                        instanceOf: k,
                        shape: k,
                        oneOf: k,
                        oneOfType: k,
                        objectOf: k,
                        exact: k
                    };
                    function E(t) {
                        this.source = t, this.len = this.source.length, this.index = 0;
                    }
                    E.prototype.nextCode = function () {
                        return this.index++, this.source.charCodeAt(this.index);
                    }, E.prototype.goUntil = function (t) {
                        for (var e; this.index < this.len && (e = this.source.charCodeAt(this.index));)
                            switch (e) {
                            case 32:
                            case 9:
                            case 13:
                            case 10:
                                this.index++;
                                break;
                            default:
                                return e === t ? (this.index++, 1) : void 0;
                            }
                    }, E.prototype.match = function (t, e) {
                        t.lastIndex = this.index;
                        var n = t.exec(this.source);
                        if (n && (!e || this.index === n.index))
                            return this.index = t.lastIndex, n;
                    };
                    function N(t) {
                        return t.replace(/-+(.)/gi, function (t, e) {
                            return e.toUpperCase();
                        });
                    }
                    var I = h('allowpaymentrequest,async,autofocus,autoplay,checked,controls,default,defer,disabled,formnovalidate,hidden,ismap,itemscope,loop,multiple,muted,nomodule,novalidate,open,readonly,required,reversed,selected,typemustmatch');
                    function D(t) {
                        return t.match(/\s*([\$0-9a-z_]+)/gi, 1)[1];
                    }
                    function F(t) {
                        var e = function t(e) {
                            var n = function t(e) {
                                var n = function (t) {
                                    var e = R(t);
                                    t.goUntil();
                                    var n = t.source.charCodeAt(t.index);
                                    switch (n) {
                                    case 61:
                                    case 33:
                                        if (61 === t.nextCode())
                                            return n += 61, 61 === t.nextCode() && (n += 61, t.index++), {
                                                type: 8,
                                                operator: n,
                                                segs: [
                                                    e,
                                                    R(t)
                                                ]
                                            };
                                        t.index--;
                                    }
                                    return e;
                                }(e);
                                if (e.goUntil(), 38 === e.source.charCodeAt(e.index)) {
                                    if (38 === e.nextCode())
                                        return e.index++, {
                                            type: 8,
                                            operator: 76,
                                            segs: [
                                                n,
                                                t(e)
                                            ]
                                        };
                                    e.index--;
                                }
                                return n;
                            }(e);
                            if (e.goUntil(), 124 === e.source.charCodeAt(e.index)) {
                                if (124 === e.nextCode())
                                    return e.index++, {
                                        type: 8,
                                        operator: 248,
                                        segs: [
                                            n,
                                            t(e)
                                        ]
                                    };
                                e.index--;
                            }
                            return n;
                        }(t);
                        if (t.goUntil(), 63 === t.source.charCodeAt(t.index)) {
                            t.index++;
                            var n = F(t);
                            if (t.goUntil(), 58 === t.source.charCodeAt(t.index))
                                return t.index++, {
                                    type: 10,
                                    segs: [
                                        e,
                                        n,
                                        F(t)
                                    ]
                                };
                        }
                        return e;
                    }
                    function S(t) {
                        var e = D(t);
                        switch (e) {
                        case 'true':
                        case 'false':
                            return {
                                type: 3,
                                value: 'true' === e
                            };
                        case 'null':
                            return { type: 13 };
                        }
                        var n = {
                            type: 4,
                            paths: [{
                                    type: 1,
                                    value: e
                                }]
                        };
                        t:
                            for (;;)
                                switch (t.source.charCodeAt(t.index)) {
                                case 46:
                                    t.index++, n.paths.push({
                                        type: 1,
                                        value: D(t)
                                    });
                                    break;
                                case 91:
                                    t.index++, n.paths.push(F(t)), t.goUntil(93);
                                    break;
                                default:
                                    break t;
                                }
                        return n;
                    }
                    function T(t, e) {
                        t.goUntil();
                        var n, i = S(t);
                        if (t.goUntil(40))
                            for (n = []; !t.goUntil(41);)
                                n.push(F(t)), t.goUntil(44);
                        else
                            e && (n = e);
                        return n && (i = {
                            type: 6,
                            name: i,
                            args: n
                        }), i;
                    }
                    function P(t) {
                        t.goUntil();
                        var e = t.source.charCodeAt(t.index);
                        switch (e) {
                        case 33:
                        case 43:
                        case 45:
                            return t.index++, function (t, e) {
                                switch (e) {
                                case 33:
                                    var n;
                                    switch (t.type) {
                                    case 2:
                                    case 1:
                                    case 3:
                                        n = !t.value;
                                        break;
                                    case 12:
                                    case 11:
                                        n = !1;
                                        break;
                                    case 13:
                                        n = !0;
                                    }
                                    if (null != n)
                                        return {
                                            type: 3,
                                            value: n
                                        };
                                    break;
                                case 43:
                                    switch (t.type) {
                                    case 2:
                                    case 1:
                                    case 3:
                                        return {
                                            type: 2,
                                            value: +t.value
                                        };
                                    }
                                    break;
                                case 45:
                                    switch (t.type) {
                                    case 2:
                                    case 1:
                                    case 3:
                                        return {
                                            type: 2,
                                            value: -t.value
                                        };
                                    }
                                }
                                return {
                                    type: 9,
                                    expr: t,
                                    operator: e
                                };
                            }(P(t), e);
                        case 34:
                        case 39:
                            return function (t) {
                                var e, n = t.source.charCodeAt(t.index), i = '';
                                t:
                                    for (; e = t.nextCode();)
                                        switch (e) {
                                        case 92:
                                            switch (e = t.nextCode()) {
                                            case 117:
                                                i += String.fromCharCode(parseInt(t.source.slice(t.index + 1, t.index + 5), 16)), t.index += 4;
                                                break;
                                            case 120:
                                                i += String.fromCharCode(parseInt(t.source.slice(t.index + 1, t.index + 3), 16)), t.index += 2;
                                                break;
                                            case 98:
                                                i += '\b';
                                                break;
                                            case 102:
                                                i += '\f';
                                                break;
                                            case 110:
                                                i += '\n';
                                                break;
                                            case 114:
                                                i += '\r';
                                                break;
                                            case 116:
                                                i += '\t';
                                                break;
                                            case 118:
                                                i += '\x0B';
                                                break;
                                            default:
                                                i += String.fromCharCode(e);
                                            }
                                            break;
                                        case n:
                                            t.index++;
                                            break t;
                                        default:
                                            i += String.fromCharCode(e);
                                        }
                                return {
                                    type: 1,
                                    value: i
                                };
                            }(t);
                        case 48:
                        case 49:
                        case 50:
                        case 51:
                        case 52:
                        case 53:
                        case 54:
                        case 55:
                        case 56:
                        case 57:
                            return {
                                type: 2,
                                value: +t.match(/[0-9]+(\.[0-9]+)?/g, 1)[0]
                            };
                        case 40:
                            return function (t) {
                                t.index++;
                                var e = F(t);
                                return t.goUntil(41), e.parenthesized = !0, e;
                            }(t);
                        case 91:
                            t.index++;
                            for (var n = []; !t.goUntil(93);) {
                                var i = {};
                                n.push(i), 46 === t.source.charCodeAt(t.index) && t.match(/\.\.\.\s*/g) && (i.spread = !0), i.expr = F(t), t.goUntil(44);
                            }
                            return {
                                type: 12,
                                items: n
                            };
                        case 123:
                            t.index++;
                            for (var s = []; !t.goUntil(125);) {
                                i = {};
                                s.push(i), 46 === t.source.charCodeAt(t.index) && t.match(/\.\.\.\s*/g) ? (i.spread = !0, i.expr = F(t)) : (i.name = P(t), t.goUntil(58) ? i.expr = F(t) : i.expr = i.name, 4 === i.name.type && (i.name = i.name.paths[0])), t.goUntil(44);
                            }
                            return {
                                type: 11,
                                items: s
                            };
                        }
                        return T(t);
                    }
                    function B(t) {
                        for (var e = P(t);;) {
                            t.goUntil();
                            var n = t.source.charCodeAt(t.index);
                            switch (n) {
                            case 37:
                            case 42:
                            case 47:
                                t.index++, e = {
                                    type: 8,
                                    operator: n,
                                    segs: [
                                        e,
                                        P(t)
                                    ]
                                };
                                continue;
                            }
                            break;
                        }
                        return e;
                    }
                    function O(t) {
                        for (var e = B(t);;) {
                            t.goUntil();
                            var n = t.source.charCodeAt(t.index);
                            switch (n) {
                            case 43:
                            case 45:
                                t.index++, e = {
                                    type: 8,
                                    operator: n,
                                    segs: [
                                        e,
                                        B(t)
                                    ]
                                };
                                continue;
                            }
                            break;
                        }
                        return e;
                    }
                    function R(t) {
                        var e = O(t);
                        t.goUntil();
                        var n = t.source.charCodeAt(t.index);
                        switch (n) {
                        case 60:
                        case 62:
                            return 61 === t.nextCode() && (n += 61, t.index++), {
                                type: 8,
                                operator: n,
                                segs: [
                                    e,
                                    O(t)
                                ]
                            };
                        }
                        return e;
                    }
                    function V(t) {
                        if (t)
                            return 'object' == typeof t && t.type ? t : F(new E(t));
                    }
                    function j(t, e) {
                        var n = T(new E(t), e);
                        return 6 !== n.type && (n = {
                            type: 6,
                            name: n,
                            args: e || []
                        }), n;
                    }
                    var z = {
                        lt: '<',
                        gt: '>',
                        nbsp: '\xA0',
                        quot: '"',
                        emsp: '\u2003',
                        ensp: '\u2002',
                        thinsp: '\u2009',
                        copy: '\xA9',
                        reg: '\xAE',
                        zwnj: '‌',
                        zwj: '‍',
                        amp: '&'
                    };
                    function U(t) {
                        return t.replace(/&#(x[0-9a-f]+|[0-9]+);/g, function (t, e) {
                            return 120 === e.charCodeAt(0) ? String.fromCharCode(parseInt(e.slice(1), 16)) : String.fromCharCode(+e);
                        }).replace(/&([a-z]+);/gi, function (t, e) {
                            return z[e] || t;
                        });
                    }
                    function Y(t, e) {
                        e = e || [
                            '{{',
                            '}}'
                        ];
                        var n, i = new E(t), s = 0, r = [], a = -1;
                        function o(t) {
                            var e = r[a];
                            e && 1 === e.type ? e.value = e.value + t : r[++a] = {
                                type: 1,
                                value: t
                            };
                        }
                        for (var c = e[0], p = c.length, h = e[1], l = h.length;;) {
                            var u, d = i.source.indexOf(c, i.index), f = i.source.indexOf(h, i.index);
                            if (-1 === d || f < d)
                                break;
                            (u = i.source.slice(s, d)) && o(U(u)), i.source.indexOf(h, f + 1) === f + 1 && f++;
                            var A = new E(i.source.slice(d + p, f));
                            if (!A.goUntil(125) && A.index < A.len) {
                                for (var y = {
                                        type: 5,
                                        expr: F(A),
                                        filters: []
                                    }; A.goUntil(124);) {
                                    var g = T(A, []);
                                    switch (g.name.paths[0].value) {
                                    case 'html':
                                        break;
                                    case 'raw':
                                        y.original = 1;
                                        break;
                                    default:
                                        y.filters.push(g);
                                    }
                                }
                                n = n || y.original, r[++a] = y;
                            } else
                                o(c + A.source + h);
                            s = i.index = f + l;
                        }
                        switch ((u = i.source.slice(s)) && o(U(u)), r.length) {
                        case 0:
                            return {
                                type: 1,
                                value: ''
                            };
                        case 1:
                            return 5 !== r[0].type || 0 !== r[0].filters.length || r[0].original ? r[0] : r[0].expr;
                        }
                        return n ? {
                            type: 7,
                            segs: r,
                            original: 1
                        } : {
                            type: 7,
                            segs: r
                        };
                    }
                    function M(t, e, n, i) {
                        var s, r, a = e.indexOf('-');
                        switch (a > 0 && (r = e.slice(0, a), s = e.slice(a + 1)), r) {
                        case 'on':
                            var o, c = {
                                    name: s,
                                    modifier: {}
                                };
                            for (t.events.push(c); (o = n.indexOf(':')) > 0;) {
                                var p = n.slice(0, o);
                                if (!/^[a-z]+$/i.test(p))
                                    break;
                                c.modifier[p] = !0, n = n.slice(o + 1);
                            }
                            c.expr = j(n, [{
                                    type: 4,
                                    paths: [{
                                            type: 1,
                                            value: '$event'
                                        }]
                                }]);
                            break;
                        case 'san':
                        case 's':
                            'else-if' === s && (s = 'elif');
                            var h = function (t, e, n) {
                                switch (t) {
                                case 'is':
                                case 'show':
                                case 'html':
                                case 'bind':
                                case 'if':
                                case 'elif':
                                    return { value: V(e.replace(/(^\{\{|\}\}$)/g, '')) };
                                case 'else':
                                    return { value: {} };
                                case 'transition':
                                    return { value: j(e) };
                                case 'ref':
                                    return { value: Y(e, n.delimiters) };
                                case 'for':
                                    var i = new E(e), s = i.match(/^\s*([$0-9a-z_]+)(\s*,\s*([$0-9a-z_]+))?\s+in\s+/gi, 1);
                                    if (s) {
                                        var r = {
                                            item: s[1],
                                            value: P(i)
                                        };
                                        if (s[3] && (r.index = s[3]), i.match(/\s*trackby\s+/gi, 1)) {
                                            var a = i.index;
                                            r.trackBy = S(i), r.trackByRaw = i.source.slice(a, i.index);
                                        }
                                        return r;
                                    }
                                }
                            }(s, n, i);
                            h && (t.directives[s] = h);
                            break;
                        case 'var':
                            t.vars || (t.vars = []), s = N(s), t.vars.push({
                                name: s,
                                expr: V(n.replace(/(^\{\{|\}\}$)/g, ''))
                            });
                            break;
                        default:
                            if ('prop' === r && (e = s), n && 0 === n.indexOf('{=') && '=}' === n.slice(-2))
                                return void t.props.push({
                                    name: e,
                                    expr: V(n.slice(2, -2)),
                                    x: 1
                                });
                            var l = Y(n || '', i.delimiters);
                            if ('' === l.value)
                                I[e] && (l = {
                                    type: 3,
                                    value: !0
                                });
                            else
                                switch (e) {
                                case 'class':
                                case 'style':
                                    switch (l.type) {
                                    case 7:
                                        for (var u = 0, d = l.segs.length; u < d; u++)
                                            5 === l.segs[u].type && l.segs[u].filters.push({
                                                type: 6,
                                                name: {
                                                    type: 4,
                                                    paths: [{
                                                            type: 1,
                                                            value: '_' + e
                                                        }]
                                                },
                                                args: []
                                            });
                                        break;
                                    case 5:
                                        l.filters.push({
                                            type: 6,
                                            name: {
                                                type: 4,
                                                paths: [{
                                                        type: 1,
                                                        value: '_' + e
                                                    }]
                                            },
                                            args: []
                                        });
                                        break;
                                    default:
                                        1 !== l.type && (l = {
                                            type: 5,
                                            expr: l,
                                            filters: [{
                                                    type: 6,
                                                    name: {
                                                        type: 4,
                                                        paths: [{
                                                                type: 1,
                                                                value: '_' + e
                                                            }]
                                                    },
                                                    args: []
                                                }]
                                        });
                                    }
                                }
                            t.props.push(null != n ? {
                                name: e,
                                expr: l
                            } : {
                                name: e,
                                expr: l,
                                noValue: 1
                            });
                        }
                    }
                    function L(t, e) {
                        (e = e || {}).trimWhitespace = e.trimWhitespace || 'none';
                        var n = {
                            directives: {},
                            props: [],
                            events: [],
                            children: []
                        };
                        if ('string' != typeof t)
                            return n;
                        var i = new E(t = t.replace(/<!--([\s\S]*?)-->/gm, ''));
                        i.goUntil();
                        for (var s, r = /<(\/)?([a-z][a-z0-9-]*)\s*/gi, a = /([-:0-9a-z\[\]_]+)(\s*=\s*(([^'"<>\s]+)|"([^"]*?)"|'([^']*?)'))?\s*/gi, o = n, c = [n], p = 0, h = i.index; null != (s = i.match(r));) {
                            var l = i.index - s[0].length, u = s[1], d = s[2];
                            if (u) {
                                if (62 === i.source.charCodeAt(i.index)) {
                                    var f = p;
                                    for (I(t.slice(h, l)); f > 0 && c[f].tagName !== d;)
                                        f--;
                                    f > 0 && (o = c[p = f - 1]), i.index++;
                                }
                            } else {
                                for (var A = {
                                            directives: {},
                                            props: [],
                                            events: [],
                                            children: [],
                                            tagName: d
                                        }, y = C[d];;) {
                                    var g = i.source.charCodeAt(i.index);
                                    if (62 === g) {
                                        i.index++;
                                        break;
                                    }
                                    if (47 === g && 62 === i.source.charCodeAt(i.index + 1)) {
                                        i.index += 2, y = 1;
                                        break;
                                    }
                                    if (!g) {
                                        I(i.source.slice(h)), A = null;
                                        break;
                                    }
                                    var v = i.match(a, 1);
                                    if (!v) {
                                        I(i.source.slice(h, i.index)), A = null;
                                        break;
                                    }
                                    M(A, v[1], v[2] ? v[5] || v[6] || v[4] || '' : void 0, e);
                                }
                                if (A) {
                                    if (I(t.slice(h, l)), A.directives.show) {
                                        for (var m = null, x = A.props.length; x--;)
                                            if ('style' === A.props[x].name) {
                                                m = A.props[x];
                                                break;
                                            }
                                        var b = {
                                            type: 10,
                                            segs: [
                                                A.directives.show.value,
                                                {
                                                    type: 1,
                                                    value: ''
                                                },
                                                {
                                                    type: 1,
                                                    value: ';display:none;'
                                                }
                                            ]
                                        };
                                        m ? 7 === m.expr.type ? m.expr.segs.push(b) : A.props[x].expr = {
                                            type: 7,
                                            segs: [
                                                m.expr,
                                                b
                                            ]
                                        } : A.props.push({
                                            name: 'style',
                                            expr: b
                                        });
                                    }
                                    if (A.directives.else || A.directives.elif) {
                                        for (var _ = o.children.length, k = null; _--;) {
                                            var w = o.children[_];
                                            if (!w.textExpr) {
                                                k = w;
                                                break;
                                            }
                                            o.children.splice(_, 1);
                                        }
                                        k && (k.elses = k.elses || [], k.elses.push(A));
                                    } else {
                                        if ('tr' === A.tagName && 'table' === o.tagName) {
                                            var N = {
                                                directives: {},
                                                props: [],
                                                events: [],
                                                children: [],
                                                tagName: 'tbody'
                                            };
                                            o.children.push(N), o = N, c[++p] = N;
                                        }
                                        o.children.push(A);
                                    }
                                    y || (o = A, c[++p] = A);
                                }
                            }
                            h = i.index;
                        }
                        return I(i.source.slice(h).replace(/^\s+$/, '')), n;
                        function I(t) {
                            switch (e.trimWhitespace) {
                            case 'blank':
                                /^\s+$/.test(t) && (t = null);
                                break;
                            case 'all':
                                t = t.replace(/(^\s+|\s+$)/g, '');
                            }
                            if (t) {
                                var n = Y(t, e.delimiters), i = o.children[o.children.length - 1], s = i && i.textExpr;
                                s ? s.segs ? s.segs = s.segs.concat(n.segs || n) : null != s.value && null != n.value ? s.value = s.value + n.value : i.textExpr = {
                                    type: 7,
                                    segs: [s].concat(n.segs || n)
                                } : o.children.push({ textExpr: n });
                            }
                        }
                    }
                    function H(t, e, n) {
                        for (var i = e; i;) {
                            if ('function' == typeof i.error)
                                return void i.error(t, e, n);
                            i = i.parentComponent;
                        }
                        throw t;
                    }
                    function $(t) {
                        if ('object' == typeof t) {
                            var e = '';
                            for (var n in t)
                                t.hasOwnProperty(n) && (e += n + ':' + t[n] + ';');
                            return e;
                        }
                        return t;
                    }
                    var W = {
                        url: encodeURIComponent,
                        _class: function (t) {
                            return t instanceof Array ? t.join(' ') : t;
                        },
                        _style: $,
                        _xclass: function (t, e) {
                            return t instanceof Array && (t = t.join(' ')), t ? e ? e + ' ' + t : t : e;
                        },
                        _xstyle: function (t, e) {
                            return (t = t && $(t)) ? e ? e + ';' + t : t : e;
                        }
                    };
                    function G(t, e, n) {
                        if (null != t.value)
                            return t.value;
                        var i;
                        switch (t.type) {
                        case 13:
                            return null;
                        case 9:
                            switch (i = G(t.expr, e, n), t.operator) {
                            case 33:
                                i = !i;
                                break;
                            case 43:
                                i = +i;
                                break;
                            case 45:
                                i = 0 - i;
                            }
                            return i;
                        case 8:
                            i = G(t.segs[0], e, n);
                            var s = G(t.segs[1], e, n);
                            switch (t.operator) {
                            case 37:
                                i %= s;
                                break;
                            case 43:
                                i += s;
                                break;
                            case 45:
                                i -= s;
                                break;
                            case 42:
                                i *= s;
                                break;
                            case 47:
                                i /= s;
                                break;
                            case 60:
                                i = i < s;
                                break;
                            case 62:
                                i = i > s;
                                break;
                            case 76:
                                i = i && s;
                                break;
                            case 94:
                                i = i != s;
                                break;
                            case 121:
                                i = i <= s;
                                break;
                            case 122:
                                i = i == s;
                                break;
                            case 123:
                                i = i >= s;
                                break;
                            case 155:
                                i = i !== s;
                                break;
                            case 183:
                                i = i === s;
                                break;
                            case 248:
                                i = i || s;
                            }
                            return i;
                        case 10:
                            return G(t.segs[G(t.segs[0], e, n) ? 1 : 2], e, n);
                        case 12:
                            i = [];
                            for (var a = 0, o = t.items.length; a < o; a++) {
                                var c = G((p = t.items[a]).expr, e, n);
                                p.spread ? c && (i = i.concat(c)) : i.push(c);
                            }
                            return i;
                        case 11:
                            i = {};
                            for (a = 0, o = t.items.length; a < o; a++) {
                                var p;
                                c = G((p = t.items[a]).expr, e, n);
                                p.spread ? c && r(i, c) : i[G(p.name, e, n)] = c;
                            }
                            return i;
                        case 4:
                            return e.get(t);
                        case 5:
                            if (i = G(t.expr, e, n), n)
                                for (a = 0, o = t.filters.length; a < o; a++) {
                                    var h = t.filters[a], l = h.name.paths[0].value;
                                    switch (l) {
                                    case 'url':
                                    case '_class':
                                    case '_style':
                                        i = W[l](i);
                                        break;
                                    case '_xclass':
                                    case '_xstyle':
                                        i = W[l](i, G(h.args[0], e, n));
                                        break;
                                    default:
                                        try {
                                            i = n.filters[l] && n.filters[l].apply(n, [i].concat(K(h.args, e, n)));
                                        } catch (y) {
                                            H(y, n, 'filter:' + l);
                                        }
                                    }
                                }
                            return null == i && (i = ''), i;
                        case 6:
                            if (n && 4 === t.name.type) {
                                var u = n, d = t.name.paths.length;
                                for (a = 0; u && a < d; a++)
                                    u = u[G(t.name.paths[a], e, n)];
                                u && (i = u.apply(n, K(t.args, e, n)));
                            }
                            break;
                        case 7:
                            var f = '';
                            for (a = 0, o = t.segs.length; a < o; a++) {
                                var A = t.segs[a];
                                f += A.value || G(A, e, n);
                            }
                            return f;
                        }
                        return i;
                    }
                    function K(t, e, n) {
                        for (var i = [], s = 0; s < t.length; s++)
                            i.push(G(t[s], e, n));
                        return i;
                    }
                    function q(t, e, n) {
                        for (var i = 0, s = e.length; i < s; i++)
                            if (J(t, e[i], n))
                                return 1;
                        return 0;
                    }
                    function J(t, e, n) {
                        switch (e.type) {
                        case 4:
                            for (var i = e.paths, s = i.length, r = t.paths, a = r.length, o = 1, c = 0; c < s; c++) {
                                var p = i[c], h = p.value;
                                if (null == h && J(t, p, n)) {
                                    o = 1;
                                    break;
                                }
                                o && c < a && (h || G(p, n)) != r[c].value && (o = 0);
                            }
                            return o && (o = Math.max(1, a - s + 2)), o;
                        case 9:
                            return J(t, e.expr, n) ? 1 : 0;
                        case 7:
                        case 8:
                        case 10:
                            return q(t, e.segs, n);
                        case 12:
                        case 11:
                            for (c = 0; c < e.items.length; c++)
                                if (J(t, e.items[c].expr, n))
                                    return 1;
                            break;
                        case 5:
                            if (J(t, e.expr, n))
                                return 1;
                            for (c = 0; c < e.filters.length; c++)
                                if (q(t, e.filters[c].args, n))
                                    return 1;
                            break;
                        case 6:
                            if (q(t, e.name.paths, n) || q(t, e.args, n))
                                return 1;
                        }
                        return 0;
                    }
                    function Q(t) {
                        return this[t];
                    }
                    var X = {
                        start: { is: Q },
                        compiled: {
                            is: Q,
                            compiled: !0
                        },
                        inited: {
                            is: Q,
                            compiled: !0,
                            inited: !0
                        },
                        created: {
                            is: Q,
                            compiled: !0,
                            inited: !0,
                            created: !0
                        },
                        attached: {
                            is: Q,
                            compiled: !0,
                            inited: !0,
                            created: !0,
                            attached: !0
                        },
                        leaving: {
                            is: Q,
                            compiled: !0,
                            inited: !0,
                            created: !0,
                            attached: !0,
                            leaving: !0
                        },
                        detached: {
                            is: Q,
                            compiled: !0,
                            inited: !0,
                            created: !0,
                            detached: !0
                        },
                        disposed: {
                            is: Q,
                            disposed: !0
                        }
                    };
                    function Z(t, e) {
                        var n = t._pi[e];
                        if (null != n)
                            return t.props[n];
                    }
                    var tt = {
                        readonly: 'readOnly',
                        cellpadding: 'cellPadding',
                        cellspacing: 'cellSpacing',
                        colspan: 'colSpan',
                        rowspan: 'rowSpan',
                        valign: 'vAlign',
                        usemap: 'useMap',
                        frameborder: 'frameBorder',
                        for: 'htmlFor'
                    };
                    function et(t, e, n) {
                        var i = tt[n] || n, s = null != e;
                        i in t ? t[i] = s ? e : '' : s && t.setAttribute(n, e), s || t.removeAttribute(n);
                    }
                    function nt(t, e, n) {
                        t.setAttribute(n, e);
                    }
                    function it(t, e, n) {
                        t[tt[n] || n] = !!e;
                    }
                    function st(t, e, n, i) {
                        x > 9 && !t.value && e && (i.__bkph = !0, v(function () {
                            i.__bkph = !1;
                        })), et(t, e, n);
                    }
                    var rt = {
                            id: function (t, e) {
                                null != e ? t.id = e : t.id && t.removeAttribute('id');
                            },
                            style: function (t, e) {
                                t.style.cssText = e;
                            },
                            class: function (t, e) {
                                (x || t.className !== e) && (t.className = e);
                            },
                            slot: s,
                            draggable: it
                        }, at = {
                            checkbox: function (t, e) {
                                if (t instanceof Array)
                                    for (var n = t.length; n--;)
                                        if (t[n] === e)
                                            return !0;
                            },
                            radio: function (t, e) {
                                return t === e;
                            }
                        }, ot = {
                            input: {
                                multiple: it,
                                checked: function (t, e, n, i) {
                                    var s = e, r = Z(i.aNode, 'value'), a = Z(i.aNode, 'type');
                                    if (r && a) {
                                        var o = G(a.expr, i.scope, i.owner);
                                        if (at[o]) {
                                            var c = Z(i.aNode, 'checked');
                                            null == c || c.hintExpr || (c.hintExpr = r.expr), s = !!at[o](e, i.data ? G(r.expr, i.data, i) : G(r.expr, i.scope, i.owner));
                                        }
                                    }
                                    it(t, s, 'checked'), x && x < 8 && !i.lifeCycle.attached && it(t, s, 'defaultChecked');
                                },
                                placeholder: st,
                                readonly: it,
                                disabled: it,
                                autofocus: it,
                                required: it
                            },
                            option: {
                                value: function (t, e, n, i) {
                                    et(t, e, n), function (t, e) {
                                        var n = t.parent;
                                        for (; n && 'select' !== n.tagName;)
                                            n = n.parent;
                                        if (n) {
                                            var i, s, r = null;
                                            if ((i = Z(n.aNode, 'value')) && (s = i.expr) && (r = 5 === n.nodeType ? G(s, n.data, n) : G(s, n.scope, n.owner) || ''), r === e)
                                                return 1;
                                        }
                                    }(i, e) && (t.selected = !0);
                                }
                            },
                            select: {
                                readonly: it,
                                disabled: it,
                                autofocus: it,
                                required: it
                            },
                            textarea: {
                                placeholder: st,
                                readonly: it,
                                disabled: it,
                                autofocus: it,
                                required: it
                            },
                            button: {
                                disabled: it,
                                autofocus: it,
                                type: function (t, e) {
                                    null != e ? t.setAttribute('type', e) : t.removeAttribute('type');
                                }
                            }
                        };
                    function ct(t, e) {
                        if (l[t])
                            return nt;
                        var n = ot[t];
                        n || (n = ot[t] = {});
                        var i = n[e];
                        return i || (i = rt[e] || et, n[e] = i), i;
                    }
                    function pt(t, e, n) {
                        var i = t.option.target;
                        return i && i.node === e && (!n || i.prop === n);
                    }
                    function ht(t, e, n) {
                        for (var i = t, s = 0; null != i && s < e.paths.length; s++)
                            i = i[G(e.paths[s], n)];
                        return i;
                    }
                    function lt(t, e) {
                        this.parent = e, this.raw = t || {}, this.listeners = [];
                    }
                    function ut(t, e, n, i, s, r) {
                        if (n >= i)
                            return s;
                        null == t && (t = {});
                        var a = e[n], o = G(a, r), c = t;
                        if (t instanceof Array) {
                            var p = +o;
                            o = isNaN(p) ? o : p, (c = t.slice(0))[o] = ut(t[o], e, n + 1, i, s, r);
                        } else if ('object' == typeof t) {
                            c = {};
                            var h = !0;
                            for (var l in t)
                                t.hasOwnProperty(l) && (l === o ? (h = !1, c[o] = ut(t[o], e, n + 1, i, s, r)) : c[l] = t[l]);
                            h && (c[o] = ut(t[o], e, n + 1, i, s, r));
                        }
                        return null == a.value && (e[n] = {
                            type: 'string' == typeof o ? 1 : 2,
                            value: o
                        }), c;
                    }
                    function dt(t, e, n, i) {
                        var s = t.expr.args;
                        return function (r) {
                            r = i ? r : r || window.event;
                            var a = ht(e, t.expr.name, n);
                            if ('function' == typeof a && a.apply(e, s.length ? K(s, new lt({ $event: r }, n), e) : []), t.modifier.prevent)
                                return r.preventDefault && r.preventDefault(), !1;
                            t.modifier.stop && (r.stopPropagation ? r.stopPropagation() : r.cancelBubble = !0);
                        };
                    }
                    function ft(t, e) {
                        if (e)
                            for (var n = 0; n < t.length; n++) {
                                var i = t[n];
                                if (!i.overview) {
                                    var s = i.expr.paths;
                                    i.overview = s[0].value, s.length > 1 && (i.extOverview = s[0].value + '.' + s[1].value, i.wildOverview = s[0].value + '.*');
                                }
                                if (e[i.overview] || i.wildOverview && e[i.wildOverview] || i.extOverview && e[i.extOverview])
                                    return !0;
                            }
                    }
                    function At(t, e, n) {
                        e && (n ? e.insertBefore(t, n) : e.appendChild(t));
                    }
                    lt.prototype.listen = function (t) {
                        'function' == typeof t && this.listeners.push(t);
                    }, lt.prototype.unlisten = function (t) {
                        for (var e = this.listeners.length; e--;)
                            t && this.listeners[e] !== t || this.listeners.splice(e, 1);
                    }, lt.prototype.fire = function (t) {
                        if (!(t.option.silent || t.option.silence || t.option.quiet))
                            for (var e = 0; e < this.listeners.length; e++)
                                this.listeners[e].call(this, t);
                    }, lt.prototype.get = function (t, e) {
                        var n = this.raw;
                        if (!t)
                            return n;
                        'object' != typeof t && (t = V(t));
                        var i = t.paths;
                        if (e = e || this, void 0 === (n = n[i[0].value]) && this.parent)
                            n = this.parent.get(t, e);
                        else
                            for (var s = 1, r = i.length; null != n && s < r; s++)
                                n = n[i[s].value || G(i[s], e)];
                        return n;
                    }, lt.prototype.set = function (t, e, n) {
                        if (n = n || {}, t = V(t), this.get(t) !== e || n.force) {
                            var i = (t = {
                                type: 4,
                                paths: t.paths.slice(0)
                            }).paths[0].value;
                            this.raw[i] = ut(this.raw[i], t.paths, 1, t.paths.length, e, this), this.fire({
                                type: 1,
                                expr: t,
                                value: e,
                                option: n
                            });
                        }
                    }, lt.prototype.assign = function (t, e) {
                        for (var n in (e = e || {}, t))
                            this.set({
                                type: 4,
                                paths: [{
                                        type: 1,
                                        value: n
                                    }]
                            }, t[n], e);
                    }, lt.prototype.merge = function (t, e, n) {
                        for (var i in (n = n || {}, t = V(t), e))
                            this.set({
                                type: 4,
                                paths: t.paths.concat([{
                                        type: 1,
                                        value: i
                                    }])
                            }, e[i], n);
                    }, lt.prototype.apply = function (t, e, n) {
                        t = V(t);
                        var i = this.get(t);
                        this.set(t, e(i), n);
                    }, lt.prototype.splice = function (t, e, n) {
                        n = n || {}, t = {
                            type: 4,
                            paths: (t = V(t)).paths.slice(0)
                        };
                        var i = this.get(t), s = [];
                        if (i instanceof Array) {
                            var r = e[0], a = i.length;
                            r > a ? r = a : r < 0 && (r = a + r) < 0 && (r = 0);
                            var o = i.slice(0);
                            s = o.splice.apply(o, e), this.raw = ut(this.raw, t.paths, 0, t.paths.length, o, this), this.fire({
                                expr: t,
                                type: 2,
                                index: r,
                                deleteCount: s.length,
                                value: s,
                                insertions: e.slice(2),
                                option: n
                            });
                        }
                        return s;
                    }, lt.prototype.push = function (t, e, n) {
                        var i = this.get(t);
                        if (i instanceof Array)
                            return this.splice(t, [
                                i.length,
                                0,
                                e
                            ], n), i.length + 1;
                    }, lt.prototype.pop = function (t, e) {
                        var n = this.get(t);
                        if (n instanceof Array) {
                            var i = n.length;
                            if (i)
                                return this.splice(t, [
                                    i - 1,
                                    1
                                ], e)[0];
                        }
                    }, lt.prototype.shift = function (t, e) {
                        return this.splice(t, [
                            0,
                            1
                        ], e)[0];
                    }, lt.prototype.unshift = function (t, e, n) {
                        var i = this.get(t);
                        if (i instanceof Array)
                            return this.splice(t, [
                                0,
                                0,
                                e
                            ], n), i.length + 1;
                    }, lt.prototype.removeAt = function (t, e, n) {
                        this.splice(t, [
                            e,
                            1
                        ], n);
                    }, lt.prototype.remove = function (t, e, n) {
                        var i = this.get(t);
                        if (i instanceof Array)
                            for (var s = i.length; s--;)
                                if (i[s] === e) {
                                    this.splice(t, [
                                        s,
                                        1
                                    ], n);
                                    break;
                                }
                    };
                    var yt = h('class,style');
                    function gt(t, e) {
                        if (this.index = 0, this.target = t, e)
                            this.children = [
                                e,
                                e.nextSibling
                            ], this.current = e, this.next = this.children[1];
                        else {
                            this.children = [];
                            for (var n, i = t.firstChild; i;) {
                                switch (n = i.nextSibling, i.nodeType) {
                                case 3:
                                    /^\s*$/.test(i.data || i.textContent) ? d(i) : this.children.push(i);
                                    break;
                                case 1:
                                case 8:
                                    this.children.push(i);
                                }
                                i = n;
                            }
                            this.current = this.children[0], this.next = this.children[1];
                        }
                    }
                    function vt(t, e, n, i, s, r) {
                        if (this.aNode = t, this.owner = i, this.scope = n, this.parent = e, this.lifeCycle = X.start, this.children = [], this.parentComponent = 5 === e.nodeType ? e : e.parentComponent, this.tagName = s || t.tagName, b && this.tagName.indexOf('-') > 0 && (this.tagName = 'div'), t._i++, this._sbindData = Mt(t.directives.bind, this.scope, this.owner), this.lifeCycle = X.inited, r) {
                            var a = r.current;
                            if (!a)
                                throw new Error('[SAN REVERSE ERROR] Element not found. \nPaths: ' + $t(this).join(' > '));
                            if (1 !== a.nodeType)
                                throw new Error('[SAN REVERSE ERROR] Element type not match, expect 1 but ' + a.nodeType + '.\nPaths: ' + $t(this).join(' > '));
                            if (a.tagName !== this.tagName.toUpperCase() && a.tagName !== this.tagName)
                                throw new Error('[SAN REVERSE ERROR] Element tagName not match, expect ' + this.tagName + ' but meet ' + a.tagName + '.\nPaths: ' + $t(this).join(' > '));
                            this.el = a, r.goNext(), Nt(this, this.scope, this.owner), this.lifeCycle = X.created, this._attached(), this.lifeCycle = X.attached;
                        }
                    }
                    function mt(t, e, n, i, s, r) {
                        if (t.elem)
                            return new vt(t, e, n, i, r, s);
                        if (t.Clazz)
                            return new t.Clazz(t, e, n, i, s);
                        var a = i.components && i.components[r || t.tagName];
                        if (a)
                            return 'function' == typeof a ? new a({
                                source: t,
                                owner: i,
                                scope: n,
                                parent: e,
                                reverseWalker: s
                            }) : new Et({
                                source: t,
                                owner: i,
                                scope: n,
                                parent: e,
                                reverseWalker: s
                            }, a);
                        if (t.directives.is)
                            switch (r) {
                            case 'fragment':
                            case 'template':
                                return new Ct(t, e, n, i, s);
                            }
                        else
                            t.elem = !0;
                        return new vt(t, e, n, i, r, s);
                    }
                    function xt(t, e, n) {
                        for (var i = t && t.length; i--;)
                            t[i].dispose(e, n);
                    }
                    function bt(t, e, n, i, s) {
                        if (t.elem)
                            return new vt(t, e, n, i, s);
                        if (t.Clazz)
                            return new t.Clazz(t, e, n, i);
                        var r = i.components && i.components[s || t.tagName];
                        if (r)
                            return 'function' == typeof r ? new r({
                                source: t,
                                owner: i,
                                scope: n,
                                parent: e
                            }) : new Et({
                                source: t,
                                owner: i,
                                scope: n,
                                parent: e
                            }, r);
                        if (t.directives.is)
                            switch (s) {
                            case 'fragment':
                            case 'template':
                                return new Ct(t, e, n, i);
                            }
                        else
                            t.elem = !0;
                        return new vt(t, e, n, i, s);
                    }
                    function _t(t, e) {
                        this.sel = document.createComment(this.id), At(this.sel, t, e);
                        for (var n = 0; n < this.aNode.children.length; n++) {
                            var i = bt(this.aNode.children[n], this, this.childScope || this.scope, this.childOwner || this.owner);
                            this.children.push(i), i.attach(t, e);
                        }
                        this.el = document.createComment(this.id), At(this.el, t, e), this.lifeCycle = X.attached;
                    }
                    function Ct(t, e, n, s, r) {
                        if (this.aNode = t, this.owner = s, this.scope = n, this.parent = e, this.parentComponent = 5 === e.nodeType ? e : e.parentComponent, this.id = i++, this.lifeCycle = X.start, this.children = [], r) {
                            var a;
                            r.current && 8 === r.current.nodeType ? (this.sel = r.current, a = 1, r.goNext()) : (this.sel = document.createComment(this.id), At(this.sel, r.target, r.current));
                            for (var o = this.aNode.children, c = 0, p = o.length; c < p; c++)
                                this.children.push(mt(o[c], this, this.scope, this.owner, r));
                            a ? (this.el = r.current, r.goNext()) : (this.el = document.createComment(this.id), At(this.el, r.target, r.current)), this.lifeCycle = X.attached;
                        }
                    }
                    function kt() {
                        this.el = this.el || document.createComment(this.id);
                    }
                    function wt(t) {
                        xt(this.children, t, 1), t || d(this.el), this.el = null, this.owner = null, this.scope = null, this.children = null, this.lifeCycle = X.disposed, this._ondisposed && this._ondisposed();
                    }
                    function Et(t, e) {
                        this.options = t, this.loader = e, this.id = i++, this.children = [];
                        var n = t.reverseWalker;
                        if (n) {
                            var s = this.loader.placeholder;
                            s && (this.children[0] = new s(t)), this._create(), At(this.el, n.target, n.current);
                            var r = this;
                            this.loader.start(function (t) {
                                r.onload(t);
                            });
                        }
                        t.reverseWalker = null;
                    }
                    function Nt(t, e, n) {
                        if (!t.aNode.directives.html)
                            for (var i = new gt(t.el), s = t.aNode.children, r = 0, a = s.length; r < a; r++)
                                t.children.push(mt(s[r], t, e, n, i));
                    }
                    function It(t) {
                        var e = u(t.tagName);
                        t._el = e;
                        for (var n = 0, i = t.props.length; n < i; n++) {
                            var s = t.props[n];
                            null != s.expr.value && s.handler(e, s.expr.value, s.name, t);
                        }
                        return e;
                    }
                    function Dt(t) {
                        var e, n = t.aNode.directives.transition, i = t.owner;
                        if (5 === t.nodeType) {
                            var s = t.source && t.source.directives.transition;
                            s ? n = s : i = t;
                        }
                        if (n && i && 'function' == typeof (e = ht(i, n.value.name)))
                            try {
                                e = e.apply(i, K(n.value.args, t.scope, i));
                            } catch (r) {
                                H(r, i, 'transitionCreate');
                            }
                        return e || t.transition;
                    }
                    function Ft() {
                        if (!this.lifeCycle.leaving) {
                            if (!this.disposeNoTransition) {
                                var t = Dt(this);
                                if (t && t.leave) {
                                    this._toPhase ? this._toPhase('leaving') : this.lifeCycle = X.leaving;
                                    var e = this;
                                    try {
                                        return void t.leave(this.el, function () {
                                            e._leave();
                                        });
                                    } catch (n) {
                                        H(n, 5 === this.nodeType ? this.parentComponent : this.owner, 'transitionLeave');
                                    }
                                }
                            }
                            this._leave();
                        }
                    }
                    function St(t, e) {
                        this.leaveDispose = 1, this.disposeNoDetach = t, this.disposeNoTransition = e, this.detach();
                    }
                    gt.prototype.goNext = function () {
                        this.current = this.children[++this.index], this.next = this.children[this.index + 1];
                    }, vt.prototype.nodeType = 4, vt.prototype.attach = function (t, e) {
                        if (!this.lifeCycle.attached) {
                            var n = this.aNode;
                            if (!this.el) {
                                var i;
                                if (n._ce && n._i > 2 ? (i = n._dp, this.el = (n._el || It(n)).cloneNode(!1)) : (i = n.props, this.el = u(this.tagName)), this._sbindData)
                                    for (var s in this._sbindData)
                                        this._sbindData.hasOwnProperty(s) && ct(this.tagName, s)(this.el, this._sbindData[s], s, this);
                                for (var r = 0, a = i.length; r < a; r++) {
                                    var o = i[r], c = G(o.expr, this.scope, this.owner);
                                    !c && yt[o.name] || o.handler(this.el, c, o.name, this);
                                }
                                this.lifeCycle = X.created;
                            }
                            if (At(this.el, t, e), !this._contentReady) {
                                var p = n.directives.html;
                                if (p)
                                    this.el.innerHTML = G(p.value, this.scope, this.owner);
                                else
                                    for (r = 0, a = n.children.length; r < a; r++) {
                                        var h = n.children[r], l = h.Clazz ? new h.Clazz(h, this, this.scope, this.owner) : bt(h, this, this.scope, this.owner);
                                        this.children.push(l), l.attach(this.el);
                                    }
                                this._contentReady = 1;
                            }
                            this._attached(), this.lifeCycle = X.attached;
                        }
                    }, vt.prototype.detach = Ft, vt.prototype.dispose = St, vt.prototype._leave = function () {
                        if (this.leaveDispose && !this.lifeCycle.disposed) {
                            for (var t = this.children.length; t--;)
                                this.children[t].dispose(1, 1);
                            if (this._elFns) {
                                for (t = this._elFns.length; t--;) {
                                    var e = this._elFns[t];
                                    p(this.el, e[0], e[1], e[2]);
                                }
                                this._elFns = null;
                            }
                            this._inputTimer && (clearInterval(this._inputTimer), this._inputTimer = null), this.disposeNoDetach && this.parent || d(this.el), this.lifeCycle = X.detached, this.el = null, this.owner = null, this.scope = null, this.children = null, this.lifeCycle = X.disposed, this._ondisposed && this._ondisposed();
                        }
                    }, vt.prototype._update = function (t) {
                        var e = this.aNode._d;
                        if (e && ft(t, e)) {
                            var n = this;
                            this._sbindData = Ht(this.aNode.directives.bind, this._sbindData, this.scope, this.owner, t, function (t, e) {
                                t in n.aNode._pi || ct(n.tagName, t)(n.el, e, t, n);
                            });
                            for (var i = this.aNode._dp, s = 0, r = i.length; s < r; s++)
                                for (var a = i[s], o = a.name, c = 0, p = t.length; c < p; c++) {
                                    var h = t[c];
                                    if (!pt(h, this, o) && (J(h.expr, a.expr, this.scope) || a.hintExpr && J(h.expr, a.hintExpr, this.scope))) {
                                        a.handler(this.el, G(a.expr, this.scope, this.owner), o, this);
                                        break;
                                    }
                                }
                            var l = this.aNode.directives.html;
                            if (l) {
                                for (var u = t.length; u--;)
                                    if (J(t[u].expr, l.value, this.scope)) {
                                        this.el.innerHTML = G(l.value, this.scope, this.owner);
                                        break;
                                    }
                            } else
                                for (s = 0, r = this.children.length; s < r; s++)
                                    this.children[s]._update(t);
                        }
                    }, vt.prototype._attached = Yt, Ct.prototype.nodeType = 7, Ct.prototype.attach = _t, Ct.prototype.dispose = function (t, e) {
                        xt(this.children, t, e), t || (d(this.el), d(this.sel)), this.sel = null, this.el = null, this.owner = null, this.scope = null, this.children = null, this.lifeCycle = X.disposed, this._ondisposed && this._ondisposed();
                    }, Ct.prototype._update = function (t) {
                        for (var e = 0; e < this.children.length; e++)
                            this.children[e]._update(t);
                    }, Ct.prototype._getElAsRootNode = function () {
                        return this.sel;
                    }, Et.prototype._create = kt, Et.prototype.dispose = wt, Et.prototype.attach = function (t, e) {
                        var n = this.loader.placeholder;
                        if (n) {
                            var i = new n(this.options);
                            this.children[0] = i, i.attach(t, e);
                        }
                        this._create(), At(this.el, t, e);
                        var s = this;
                        this.loader.start(function (t) {
                            s.onload(t);
                        });
                    }, Et.prototype._getElAsRootNode = function () {
                        var t = this.children[0];
                        return t && t.el;
                    }, Et.prototype.onload = function (t) {
                        if (this.el && t) {
                            var e = new t(this.options);
                            e.attach(this.el.parentNode, this.el);
                            var n = this.options.parent;
                            if (n._rootNode === this)
                                n._rootNode = e, e._getElAsRootNode && (n.el = e._getElAsRootNode());
                            else {
                                var i = n.children;
                                null != this.parentIndex && i[this.parentIndex] === this || o(i, function (t, e) {
                                    t instanceof Et && (t.parentIndex = e);
                                }), i[this.parentIndex] = e;
                            }
                        }
                        this.dispose();
                    }, Et.prototype._update = function (t) {
                        this.children[0] && this.children[0]._update(t);
                    };
                    var Tt = 'undefined' != typeof window;
                    function Pt() {
                        this.composing && (this.composing = 0, _(this, 'input'));
                    }
                    function Bt() {
                        this.composing = 1;
                    }
                    function Ot(t, e, n) {
                        return function () {
                            zt(t, e, n);
                        };
                    }
                    function Rt(t, e, n) {
                        return function () {
                            t.__bkph ? t.__bkph = !1 : this.composing || zt(t, e, n);
                        };
                    }
                    function Vt(t, e, n) {
                        return function () {
                            t._inputTimer = setInterval(function () {
                                zt(t, e, n);
                            }, 16);
                        };
                    }
                    function jt(t) {
                        return function () {
                            clearInterval(t._inputTimer), t._inputTimer = null;
                        };
                    }
                    function zt(t, e, n) {
                        if (t.lifeCycle.created) {
                            var i = t.el;
                            if ('input' === t.tagName && 'checked' === e.name) {
                                var s = Z(t.aNode, 'value'), r = Z(t.aNode, 'type');
                                if (s && r)
                                    switch (i.type) {
                                    case 'checkbox':
                                        return void n[i.checked ? 'push' : 'remove'](e.expr, G(s.expr, n));
                                    case 'radio':
                                        return void (i.checked && n.set(e.expr, G(s.expr, n), {
                                            target: {
                                                node: t,
                                                prop: e.name
                                            }
                                        }));
                                    }
                            }
                            n.set(e.expr, i[e.name], {
                                target: {
                                    node: t,
                                    prop: e.name
                                }
                            });
                        }
                    }
                    function Ut(t, e, n, i) {
                        i = !!i, t._elFns = t._elFns || [], t._elFns.push([
                            e,
                            n,
                            i
                        ]), c(t.el, e, n, i);
                    }
                    function Yt() {
                        if (!this._rootNode) {
                            for (var t = 5 === this.nodeType, e = t ? this.data : this.scope, n = this.aNode._xp, i = 0, r = n.length; i < r; i++) {
                                var a = n[i];
                                switch (a.name) {
                                case 'value':
                                    switch (this.tagName) {
                                    case 'input':
                                    case 'textarea':
                                        Tt && window.CompositionEvent && (Ut(this, 'change', Pt), Ut(this, 'compositionstart', Bt), Ut(this, 'compositionend', Pt)), 'oninput' in this.el ? Ut(this, 'input', Rt(this, a, e)) : (Ut(this, 'focusin', Vt(this, a, e)), Ut(this, 'focusout', jt(this)));
                                        break;
                                    case 'select':
                                        Ut(this, 'change', Ot(this, a, e));
                                    }
                                    break;
                                case 'checked':
                                    switch (this.tagName) {
                                    case 'input':
                                        switch (this.el.type) {
                                        case 'checkbox':
                                        case 'radio':
                                            Ut(this, 'click', Ot(this, a, e));
                                        }
                                    }
                                }
                            }
                            var o = t ? this : this.owner;
                            for (i = 0, r = this.aNode.events.length; i < r; i++) {
                                Ut(this, (c = this.aNode.events[i]).name, dt(c, o, e, c.modifier), c.modifier.capture);
                            }
                            if (t && this.nativeEvents)
                                for (i = 0, r = this.nativeEvents.length; i < r; i++) {
                                    var c;
                                    Ut(this, (c = this.nativeEvents[i]).name, dt(c, this.owner, this.scope), c.modifier.capture);
                                }
                            var p = Dt(this);
                            if (p && p.enter)
                                try {
                                    p.enter(this.el, s);
                                } catch (h) {
                                    H(h, t ? o.parentComponent : o, 'transitionEnter');
                                }
                        }
                    }
                    function Mt(t, e, n) {
                        if (t && e)
                            return G(t.value, e, n);
                    }
                    function Lt(t, e) {
                        var n, i = [];
                        for (n in t)
                            t.hasOwnProperty(n) && i.push(n);
                        for (n in e)
                            e.hasOwnProperty(n) && !t[n] && i.push(n);
                        return i;
                    }
                    function Ht(t, e, n, i, s, r) {
                        if (t) {
                            for (var a = s.length; a--;)
                                if (J(s[a].expr, t.value, n)) {
                                    for (var o = G(t.value, n, i), c = Lt(o, e), p = 0, h = c.length; p < h; p++) {
                                        var l = c[p], u = o[l];
                                        u !== e[l] && r(l, u);
                                    }
                                    return o;
                                }
                            return e;
                        }
                    }
                    function $t(t) {
                        for (var e = [], n = t; n;) {
                            switch (n.nodeType) {
                            case 4:
                                e.unshift(n.tagName);
                                break;
                            case 2:
                                e.unshift('if');
                                break;
                            case 3:
                                e.unshift('for[' + n.aNode.directives.for.item + ']');
                                break;
                            case 6:
                                e.unshift('slot[' + (n.name || 'default') + ']');
                                break;
                            case 7:
                                e.unshift('fragment');
                                break;
                            case 5:
                                e.unshift('component[' + (n.source ? n.source.tagName : 'root') + ']');
                                break;
                            case 1:
                                e.unshift('text');
                            }
                            n = n.parent;
                        }
                        return e;
                    }
                    function Wt(t) {
                        for (var e, n = [], i = [], s = [], r = [], a = -1, o = 0, c = t.length; o < c; o++) {
                            for (var p = n[a], h = i[a], l = s[a], u = r[a]; p && (-3 === l && (l = s[a] = t[o++] || -1), -1 === l);)
                                p = n[--a], h = i[a], l = s[a], u = r[a];
                            var d, f = t[o], A = -1, y = !1;
                            switch (f) {
                            case 1:
                                d = {
                                    directives: {},
                                    props: [],
                                    events: [],
                                    children: []
                                };
                                var g = t[++o];
                                g && (d.tagName = g), A = t[++o] || -1;
                                break;
                            case 3:
                                d = {
                                    type: 1,
                                    value: t[++o]
                                };
                                break;
                            case 4:
                                d = {
                                    type: 2,
                                    value: t[++o]
                                };
                                break;
                            case 5:
                                d = {
                                    type: 3,
                                    value: !!t[++o]
                                };
                                break;
                            case 19:
                                d = { type: 13 };
                                break;
                            case 6:
                                d = {
                                    type: 4,
                                    paths: y = []
                                }, A = t[++o] || -1;
                                break;
                            case 7:
                                d = {
                                    type: 5,
                                    filters: y = []
                                }, t[++o] && (d.original = 1), A = -2;
                                break;
                            case 8:
                                d = {
                                    type: 6,
                                    args: y = []
                                }, A = -2;
                                break;
                            case 9:
                                d = {
                                    type: 7,
                                    segs: y = []
                                }, t[++o] && (d.original = 1), A = t[++o] || -1;
                                break;
                            case 10:
                                y = [], d = {
                                    type: 8,
                                    operator: t[++o],
                                    segs: y
                                }, A = 2;
                                break;
                            case 11:
                                d = {
                                    type: 9,
                                    operator: t[++o]
                                }, A = -2;
                                break;
                            case 12:
                                d = {
                                    type: 10,
                                    segs: y = []
                                }, A = 3;
                                break;
                            case 13:
                                d = {
                                    type: 11,
                                    items: y = []
                                }, A = t[++o] || -1;
                                break;
                            case 14:
                                d = {}, A = -2;
                                break;
                            case 15:
                                d = { spread: !0 }, A = -2;
                                break;
                            case 16:
                                d = {
                                    type: 12,
                                    items: y = []
                                }, A = t[++o] || -1;
                                break;
                            case 17:
                            case 18:
                                d = 18 === f ? { spread: !0 } : {}, A = -2;
                                break;
                            case 2:
                            case 33:
                            case 34:
                                d = { name: t[++o] }, 33 === f && (d.noValue = 1), 34 === f && (d.x = 1), A = -2;
                                break;
                            case 35:
                                d = {
                                    name: t[++o],
                                    modifier: {}
                                }, A = -2;
                                break;
                            case 36:
                                d = { name: t[++o] }, A = -2;
                                break;
                            case 37:
                                d = { item: t[++o] };
                                var v = t[++o];
                                v && (d.index = v);
                                var m = t[++o];
                                m && (d.trackByRaw = m, d.trackBy = V(m)), A = -2;
                                break;
                            case 38:
                            case 39:
                            case 41:
                            case 42:
                            case 43:
                            case 44:
                            case 45:
                                d = {}, A = -2;
                                break;
                            case 40:
                                d = { value: {} };
                                break;
                            default:
                                f || (d = {}, A = -2);
                            }
                            if (e || (e = d), p)
                                switch (h) {
                                case 1:
                                    if (u)
                                        p.elses = p.elses || [], p.elses.push(d), --s[a] || a--;
                                    else {
                                        switch (f) {
                                        case 2:
                                        case 33:
                                        case 34:
                                            p.props.push(d);
                                            break;
                                        case 35:
                                            p.events.push(d);
                                            break;
                                        case 36:
                                            p.vars = p.vars || [], p.vars.push(d);
                                            break;
                                        case 37:
                                            p.directives.for = d;
                                            break;
                                        case 38:
                                            p.directives.if = d;
                                            break;
                                        case 39:
                                            p.directives.elif = d;
                                            break;
                                        case 40:
                                            p.directives.else = d;
                                            break;
                                        case 41:
                                            p.directives.ref = d;
                                            break;
                                        case 42:
                                            p.directives.bind = d;
                                            break;
                                        case 43:
                                            p.directives.html = d;
                                            break;
                                        case 44:
                                            p.directives.transition = d;
                                            break;
                                        case 45:
                                            p.directives.is = d;
                                            break;
                                        case 1:
                                        default:
                                            p.children.push(d);
                                        }
                                        --s[a] || (p.directives.if ? (r[a] = 'elses', s[a] = -3) : a--);
                                    }
                                    break;
                                case 7:
                                    -2 === l ? (s[a] = -3, p.expr = d) : (u.push(d), --s[a] || a--);
                                    break;
                                case 8:
                                    -2 === l ? (s[a] = -3, p.name = d) : (u.push(d), --s[a] || a--);
                                    break;
                                case 6:
                                case 9:
                                case 10:
                                case 12:
                                case 13:
                                case 16:
                                    u.push(d), --s[a] || a--;
                                    break;
                                case 11:
                                case 2:
                                case 33:
                                case 34:
                                case 36:
                                case 15:
                                case 17:
                                case 18:
                                    p.expr = d, a--;
                                    break;
                                case 14:
                                    -2 === l ? (s[a] = -4, p.name = d) : (p.expr = d, a--);
                                    break;
                                case 35:
                                    -2 === l ? (s[a] = -3, p.expr = d) : (p.modifier[f] = !0, --s[a] || a--);
                                    break;
                                case 37:
                                case 38:
                                case 39:
                                case 41:
                                case 42:
                                case 43:
                                case 44:
                                case 45:
                                    p.value = d, a--;
                                    break;
                                default:
                                    p.textExpr = d, a--;
                                }
                            -1 !== A && (n[++a] = d, i[a] = f, s[a] = A, r[a] = y);
                        }
                        return e;
                    }
                    function Gt(t) {
                        t = t || {}, this.lifeCycle = X.start, this.id = i++, 'function' == typeof this.construct && this.construct(t), this.children = [], this.listeners = {}, this.slotChildren = [], this.implicitChildren = [];
                        var e = this.constructor;
                        this.filters = this.filters || e.filters || {}, this.computed = this.computed || e.computed || {}, this.messages = this.messages || e.messages || {}, t.transition && (this.transition = t.transition), this.owner = t.owner, this.scope = t.scope, this.el = t.el;
                        var n = t.parent;
                        n ? (this.parent = n, this.parentComponent = 5 === n.nodeType ? n : n && n.parentComponent) : this.owner && (this.parentComponent = this.owner, this.scope = this.owner.data), this.sourceSlotNameProps = [], this.sourceSlots = { named: {} };
                        var s, a = e.prototype;
                        if (!a.hasOwnProperty('_cmptReady')) {
                            a.components = e.components || a.components || {};
                            var o = a.components;
                            for (var c in o) {
                                var p = o[c];
                                'object' != typeof p || p instanceof qt ? 'self' === p && (o[c] = e) : o[c] = Kt(p);
                            }
                            a._cmptReady = 1;
                        }
                        if (!a.hasOwnProperty('aNode')) {
                            var h = e.aPack || a.hasOwnProperty('aPack') && a.aPack;
                            h ? (a.aNode = Wt(h), e.aPack = a.aPack = null) : a.aNode = Jt(e);
                        }
                        if (ae(a.aNode, this), this.tagName = a.aNode.tagName, this.source = 'string' == typeof t.source ? L(t.source).children[0] : t.source, ae(this.source), a.aNode._i++, this.el) {
                            var l = this.el.firstChild;
                            if (l && 3 === l.nodeType && (l = l.nextSibling), l && 8 === l.nodeType) {
                                var u = l.data.match(/^\s*s-data:([\s\S]+)?$/);
                                if (u) {
                                    var f = u[1];
                                    t.data = new Function('return ' + f.replace(/^[\s\n]*/, '').replace(/"(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})\.\d+Z"/g, function (t, e, n, i, s, r, a) {
                                        return 'new Date(' + +e + ',' + +n + ',' + +i + ',' + +s + ',' + +r + ',' + +a + ')';
                                    }))(), l.previousSibling && d(l.previousSibling), d(l);
                                }
                            }
                        }
                        if (this.source) {
                            this._initSourceSlots(1);
                            for (var A = 0, y = this.source.events.length; A < y; A++) {
                                var g = this.source.events[A];
                                g.modifier.native ? (this.nativeEvents = this.nativeEvents || [], this.nativeEvents.push(g)) : this.on(g.name, dt(g, t.owner, this.scope, 1), g);
                            }
                            this.tagName = this.tagName || this.source.tagName, this.binds = this.source._b, this._srcSbindData = Mt(this.source.directives.bind, this.scope, this.owner);
                        }
                        this._toPhase('compiled');
                        try {
                            s = 'function' == typeof this.initData && this.initData();
                        } catch (k) {
                            H(k, this, 'initData');
                        }
                        if (s = r(s || {}, t.data || this._srcSbindData), this.binds && this.scope)
                            for (A = 0, y = this.binds.length; A < y; A++) {
                                var v = this.binds[A], m = G(v.expr, this.scope, this.owner);
                                void 0 !== m && (s[v.name] = m);
                            }
                        for (var x in (this.data = new lt(s), this.tagName = this.tagName || 'div', b && this.tagName.indexOf('-') > 0 && (this.tagName = 'div'), this.computedDeps = {}, this.computed))
                            this.computed.hasOwnProperty(x) && !this.computedDeps[x] && this._calcComputed(x);
                        this._initDataChanger(), this._sbindData = Mt(this.aNode.directives.bind, this.data, this), this._toPhase('inited');
                        var _ = t.reverseWalker;
                        if (this.el || _) {
                            if (this.aNode.Clazz || this.components[this.aNode.tagName])
                                _ || (_ = new gt(this.el.parentNode, this.el)), this._rootNode = mt(this.aNode, this, this.data, this, _), this._rootNode._getElAsRootNode && (this.el = this._rootNode._getElAsRootNode());
                            else {
                                if (_) {
                                    var C = _.current;
                                    C && 1 === C.nodeType && (this.el = C, _.goNext());
                                }
                                Nt(this, this.data, this);
                            }
                            this._toPhase('created'), this._attached(), this._toPhase('attached');
                        }
                    }
                    function Kt(t, e) {
                        if ('function' == typeof t)
                            return t;
                        function n(t) {
                            e.call(this, t);
                        }
                        return e = e || Gt, n.prototype = t, a(n, e), n;
                    }
                    function qt(t, e, n) {
                        this.load = t, this.placeholder = e, this.fallback = n, this.listeners = [];
                    }
                    function Jt(t) {
                        var e = t.prototype, n = L(t.template || e.template, {
                                trimWhitespace: e.trimWhitespace || t.trimWhitespace,
                                delimiters: e.delimiters || t.delimiters
                            }).children[0];
                        if (n && n.textExpr && (n = null), 'template' === (n = n || {
                                directives: {},
                                props: [],
                                events: [],
                                children: []
                            }).tagName && delete n.tagName, !1 !== e.autoFillStyleAndId && !1 !== t.autoFillStyleAndId && (Qt(n.props), n.elses))
                            for (var i = 0, s = n.elses.length; i < s; i++)
                                Qt(n.elses[i].props);
                        return n;
                    }
                    function Qt(t) {
                        for (var e = {}, n = t.length; n--;) {
                            var i = t[n];
                            switch (i.name) {
                            case 'class':
                            case 'style':
                                e[i.name] = !0, i.expr = {
                                    type: 5,
                                    expr: {
                                        type: 4,
                                        paths: [{
                                                type: 1,
                                                value: i.name
                                            }]
                                    },
                                    filters: [{
                                            type: 6,
                                            args: [i.expr],
                                            name: {
                                                type: 4,
                                                paths: [{
                                                        type: 1,
                                                        value: '_x' + i.name
                                                    }]
                                            }
                                        }]
                                };
                                break;
                            case 'id':
                                e[i.name] = !0;
                            }
                        }
                        e.class || t.push({
                            name: 'class',
                            expr: {
                                type: 5,
                                expr: {
                                    type: 4,
                                    paths: [{
                                            type: 1,
                                            value: 'class'
                                        }]
                                },
                                filters: [{
                                        type: 6,
                                        args: [],
                                        name: {
                                            type: 4,
                                            paths: [{
                                                    type: 1,
                                                    value: '_class'
                                                }]
                                        }
                                    }]
                            }
                        }), e.style || t.push({
                            name: 'style',
                            expr: {
                                type: 5,
                                expr: {
                                    type: 4,
                                    paths: [{
                                            type: 1,
                                            value: 'style'
                                        }]
                                },
                                filters: [{
                                        type: 6,
                                        args: [],
                                        name: {
                                            type: 4,
                                            paths: [{
                                                    type: 1,
                                                    value: '_style'
                                                }]
                                        }
                                    }]
                            }
                        }), e.id || t.push({
                            name: 'id',
                            expr: {
                                type: 4,
                                paths: [{
                                        type: 1,
                                        value: 'id'
                                    }]
                            }
                        });
                    }
                    Gt.prototype._initSourceSlots = function (t) {
                        if (this.sourceSlots.named = {}, this.source && this.scope)
                            for (var e = this.source.children, n = 0, i = e.length; n < i; n++) {
                                var s, r = e[n], a = !r.textExpr && Z(r, 'slot');
                                if (a) {
                                    t && this.sourceSlotNameProps.push(a);
                                    var o = G(a.expr, this.scope, this.owner);
                                    (s = this.sourceSlots.named[o]) || (s = this.sourceSlots.named[o] = []), s.push(r);
                                } else
                                    t && ((s = this.sourceSlots.noname) || (s = this.sourceSlots.noname = []), s.push(r));
                            }
                    }, Gt.prototype.nodeType = 5, Gt.prototype.nextTick = v, Gt.prototype._ctx = new Date().getTime().toString(16), Gt.prototype._toPhase = function (t) {
                        if (!this.lifeCycle[t]) {
                            if (this.lifeCycle = X[t] || this.lifeCycle, 'function' == typeof this[t])
                                try {
                                    this[t]();
                                } catch (e) {
                                    H(e, this, 'hook:' + t);
                                }
                            this._afterLife = this.lifeCycle;
                        }
                    }, Gt.prototype.on = function (t, e, n) {
                        'function' == typeof e && (this.listeners[t] || (this.listeners[t] = []), this.listeners[t].push({
                            fn: e,
                            declaration: n
                        }));
                    }, Gt.prototype.un = function (t, e) {
                        for (var n = this.listeners[t], i = n && n.length; i--;)
                            e && e !== n[i].fn || n.splice(i, 1);
                    }, Gt.prototype.fire = function (t, e) {
                        var n = this;
                        o(this.listeners[t], function (i) {
                            try {
                                i.fn.call(n, e);
                            } catch (s) {
                                H(s, n, 'event:' + t);
                            }
                        });
                    }, Gt.prototype._calcComputed = function (t) {
                        var e = this.computedDeps[t];
                        e || (e = this.computedDeps[t] = {});
                        var n = this;
                        try {
                            var i = this.computed[t].call({
                                data: {
                                    get: function (i) {
                                        return e[i] || (e[i] = 1, n.computed[i] && !n.computedDeps[i] && n._calcComputed(i), n.watch(i, function () {
                                            n._calcComputed(t);
                                        })), n.data.get(i);
                                    }
                                }
                            });
                            this.data.set(t, i);
                        } catch (s) {
                            H(s, this, 'computed:' + t);
                        }
                    }, Gt.prototype.dispatch = function (t, e) {
                        for (var n = this.parentComponent; n;) {
                            var i = n.messages[t] || n.messages['*'];
                            if ('function' == typeof i) {
                                try {
                                    i.call(n, {
                                        target: this,
                                        value: e,
                                        name: t
                                    });
                                } catch (s) {
                                    H(s, n, 'message:' + (t || '*'));
                                }
                                return;
                            }
                            n = n.parentComponent;
                        }
                    }, Gt.prototype.slot = function (t) {
                        var e = [], n = this;
                        return function i(s) {
                            o(s, function (s) {
                                6 === s.nodeType && s.owner === n ? (s.isNamed && s.name === t || !s.isNamed && !t) && e.push(s) : i(s.children);
                            });
                        }(this.children), e;
                    }, Gt.prototype.ref = function (t) {
                        var e, n = this;
                        function i(t) {
                            if (t)
                                for (var n = 0, i = t.length; n < i; n++)
                                    if (s(t[n]), e)
                                        return;
                        }
                        function s(s) {
                            if (1 !== s.nodeType) {
                                if (s.owner === n) {
                                    var r;
                                    switch (s.nodeType) {
                                    case 4:
                                        (r = s.aNode.directives.ref) && G(r.value, s.scope, n) === t && (e = s.el);
                                        break;
                                    case 5:
                                        (r = s.source.directives.ref) && G(r.value, s.scope, n) === t && (e = s);
                                    }
                                    if (e)
                                        return;
                                    i(s.slotChildren);
                                }
                                e || i(s.children);
                            }
                        }
                        return this._rootNode ? s(this._rootNode) : i(this.children), e;
                    }, Gt.prototype._update = function (t) {
                        if (!this.lifeCycle.disposed) {
                            var e = this, n = !1;
                            if (this._notifyNeedReload = function () {
                                    n = !0;
                                }, t)
                                if (this.source && (this._srcSbindData = Ht(this.source.directives.bind, this._srcSbindData, this.scope, this.owner, t, function (t, n) {
                                        t in e.source._pi || e.data.set(t, n, { target: { node: e.owner } });
                                    })), o(t, function (t) {
                                        var i = t.expr;
                                        o(e.binds, function (n) {
                                            var s, r = n.name, a = n.expr;
                                            !pt(t, e, r) && (s = J(i, a, e.scope)) && (s > 2 && (r = {
                                                type: 4,
                                                paths: [{
                                                        type: 1,
                                                        value: r
                                                    }].concat(i.paths.slice(a.paths.length))
                                            }, a = i), s >= 2 && 2 === t.type ? e.data.splice(r, [
                                                t.index,
                                                t.deleteCount
                                            ].concat(t.insertions), { target: { node: e.owner } }) : e.data.set(r, G(a, e.scope, e.owner), { target: { node: e.owner } }));
                                        }), o(e.sourceSlotNameProps, function (t) {
                                            return !(n = n || J(i, t.expr, e.scope));
                                        });
                                    }), n)
                                    this._initSourceSlots(), this._repaintChildren();
                                else
                                    for (var i = this.slotChildren.length; i--;) {
                                        var s = this.slotChildren[i];
                                        s.lifeCycle.disposed ? this.slotChildren.splice(i, 1) : s.isInserted && s._update(t, 1);
                                    }
                            var r = this._dataChanges;
                            if (r) {
                                this._dataChanges = null, this._sbindData = Ht(this.aNode.directives.bind, this._sbindData, this.data, this, r, function (t, n) {
                                    e._rootNode || t in e.aNode._pi || ct(e.tagName, t)(e.el, n, t, e);
                                });
                                var a = this.aNode.directives.html;
                                if (this._rootNode)
                                    this._rootNode._update(r), this._rootNode._getElAsRootNode && (this.el = this._rootNode._getElAsRootNode());
                                else if (a) {
                                    for (var c = r.length; c--;)
                                        if (J(r[c].expr, a.value, this.data)) {
                                            this.el.innerHTML = G(a.value, this.data, this);
                                            break;
                                        }
                                } else {
                                    for (var p = this.aNode._dp, h = 0; h < p.length; h++)
                                        for (var l = p[h], u = 0; u < r.length; u++) {
                                            var d = r[u];
                                            if (J(d.expr, l.expr, this.data) || l.hintExpr && J(d.expr, l.hintExpr, this.data)) {
                                                l.handler(this.el, G(l.expr, this.data, this), l.name, this);
                                                break;
                                            }
                                        }
                                    for (h = 0; h < this.children.length; h++)
                                        this.children[h]._update(r);
                                }
                                n && (this._initSourceSlots(), this._repaintChildren());
                                for (h = 0; h < this.implicitChildren.length; h++)
                                    this.implicitChildren[h]._update(r);
                                'function' == typeof this.updated && this.updated(), this.owner && this._updateBindxOwner(r) && this.owner._update();
                            }
                            this._notifyNeedReload = null;
                        }
                    }, Gt.prototype._updateBindxOwner = function (t) {
                        var e, n = this;
                        return o(t, function (t) {
                            o(n.binds, function (i) {
                                var s = t.expr;
                                if (i.x && !pt(t, n.owner) && J(s, V(i.name), n.data)) {
                                    var r = i.expr;
                                    s.paths.length > 1 && (r = {
                                        type: 4,
                                        paths: i.expr.paths.concat(s.paths.slice(1))
                                    }), e = 1, n.scope.set(r, G(s, n.data, n), {
                                        target: {
                                            node: n,
                                            prop: i.name
                                        }
                                    });
                                }
                            });
                        }), e;
                    }, Gt.prototype._repaintChildren = function () {
                        if (this._rootNode) {
                            var t = this._rootNode.el.parentNode, e = this._rootNode.el.nextSibling;
                            this._rootNode.dispose(0, 1), this.slotChildren = [], this._rootNode = bt(this.aNode, this, this.data, this), this._rootNode.attach(t, e), this._rootNode._getElAsRootNode && (this.el = this._rootNode._getElAsRootNode());
                        } else {
                            xt(this.children, 0, 1), this.children = [], this.slotChildren = [];
                            for (var n = 0, i = this.aNode.children.length; n < i; n++) {
                                var s = bt(this.aNode.children[n], this, this.data, this);
                                this.children.push(s), s.attach(this.el);
                            }
                        }
                    }, Gt.prototype._initDataChanger = function () {
                        var t = this;
                        this._dataChanger = function (e) {
                            t._afterLife.created ? (t._dataChanges || (v(t._update, t), t._dataChanges = []), t._dataChanges.push(e)) : t.lifeCycle.inited && t.owner && t._updateBindxOwner([e]);
                        }, this.data.listen(this._dataChanger);
                    }, Gt.prototype.watch = function (t, e) {
                        var n = V(t), i = G(n, this.data, this), s = this;
                        this.data.listen(function (r) {
                            if (J(r.expr, n, s.data)) {
                                var a = G(n, s.data, s);
                                if (a !== i) {
                                    var o = i;
                                    i = a;
                                    try {
                                        e.call(s, a, {
                                            oldValue: o,
                                            newValue: a,
                                            change: r
                                        });
                                    } catch (c) {
                                        H(c, s, 'watch:' + t);
                                    }
                                }
                            }
                        });
                    }, Gt.prototype._getElAsRootNode = function () {
                        return this.el;
                    }, Gt.prototype.attach = function (t, e) {
                        if (!this.lifeCycle.attached) {
                            var n = this.aNode;
                            if (n.Clazz || this.components[n.tagName])
                                this._rootNode = this._rootNode || bt(n, this, this.data, this), this._rootNode.attach(t, e), this._rootNode._getElAsRootNode && (this.el = this._rootNode._getElAsRootNode()), this._toPhase('created');
                            else {
                                if (!this.el) {
                                    var i;
                                    if (n._ce && n._i > 2 ? (i = n._dp, this.el = (n._el || It(n)).cloneNode(!1)) : (i = n.props, this.el = u(this.tagName)), this._sbindData)
                                        for (var s in this._sbindData)
                                            this._sbindData.hasOwnProperty(s) && ct(this.tagName, s)(this.el, this._sbindData[s], s, this);
                                    for (var r = 0, a = i.length; r < a; r++) {
                                        var o = i[r], c = G(o.expr, this.data, this);
                                        !c && yt[o.name] || o.handler(this.el, c, o.name, this);
                                    }
                                    this._toPhase('created');
                                }
                                if (At(this.el, t, e), !this._contentReady) {
                                    var p = n.directives.html;
                                    if (p)
                                        this.el.innerHTML = G(p.value, this.data, this);
                                    else
                                        for (r = 0, a = n.children.length; r < a; r++) {
                                            var h = n.children[r], l = h.Clazz ? new h.Clazz(h, this, this.data, this) : bt(h, this, this.data, this);
                                            this.children.push(l), l.attach(this.el);
                                        }
                                    this._contentReady = 1;
                                }
                                this._attached();
                            }
                            this._toPhase('attached'), this.owner && !this.parent && this.owner.implicitChildren.push(this);
                        }
                    }, Gt.prototype.detach = Ft, Gt.prototype.dispose = St, Gt.prototype._attached = Yt, Gt.prototype._leave = function () {
                        if (this.leaveDispose) {
                            if (!this.lifeCycle.disposed) {
                                this.data.unlisten(), this.dataChanger = null, this._dataChanges = null;
                                for (var t = this.implicitChildren.length; t--;)
                                    this.implicitChildren[t].dispose(0, 1);
                                if (this.implicitChildren = null, this.source = null, this.sourceSlots = null, this.sourceSlotNameProps = null, this.slotChildren = null, this._rootNode)
                                    this._rootNode.dispose(this.disposeNoDetach && this.parent);
                                else {
                                    for (t = this.children.length; t--;)
                                        this.children[t].dispose(1, 1);
                                    if (this._elFns) {
                                        for (t = this._elFns.length; t--;) {
                                            var e = this._elFns[t];
                                            p(this.el, e[0], e[1], e[2]);
                                        }
                                        this._elFns = null;
                                    }
                                    this._inputTimer && (clearInterval(this._inputTimer), this._inputTimer = null), this.disposeNoDetach && this.parent || d(this.el);
                                }
                                this._toPhase('detached'), this._rootNode = null, this.el = null, this.owner = null, this.scope = null, this.children = null, this._toPhase('disposed'), this._ondisposed && this._ondisposed();
                            }
                        } else
                            this.lifeCycle.attached && (this._rootNode ? this._rootNode.detach ? this._rootNode.detach() : (this._rootNode.dispose(), this._rootNode = null) : d(this.el), this._toPhase('detached'));
                    }, qt.prototype.start = function (t) {
                        var e = this;
                        switch (this.state) {
                        case 2:
                            v(function () {
                                t(e.Component);
                            });
                            break;
                        case 1:
                            this.listeners.push(t);
                            break;
                        default:
                            this.listeners.push(t), this.state = 1;
                            var n = this.load(), i = function (t) {
                                    e.done(t);
                                };
                            n && 'function' == typeof n.then && n.then(i, i);
                        }
                    }, qt.prototype.done = function (t) {
                        this.state = 2, t = t || this.fallback, this.Component = t, o(this.listeners, function (e) {
                            e(t);
                        });
                    };
                    var Xt = h('div,span,img,ul,ol,li,dl,dt,dd,a,b,u,hr,form,input,textarea,button,label,select,option,table,tbody,th,tr,td,thead,main,aside,header,footer,nav');
                    function Zt(t, e, n, s, r) {
                        if (this.aNode = t, this.owner = s, this.scope = n, this.parent = e, r) {
                            var a = r.current;
                            if (a)
                                switch (a.nodeType) {
                                case 8:
                                    if ('s-text' === a.data)
                                        for (this.id = this.id || i++, this.sel = a, a.data = this.id, r.goNext();;) {
                                            if (!(a = r.current))
                                                throw new Error('[SAN REVERSE ERROR] Text end flag not found. \nPaths: ' + $t(this).join(' > '));
                                            if (c = 'text', 8 === (o = a).nodeType && o.data === '/s-' + c) {
                                                this.el = a, r.goNext(), a.data = this.id;
                                                break;
                                            }
                                            r.goNext();
                                        }
                                    break;
                                case 3:
                                    r.goNext(), this.aNode.textExpr.original || (this.el = a);
                                }
                            else
                                this.el = document.createTextNode(''), At(this.el, r.target, r.current);
                        }
                        var o, c;
                    }
                    Zt.prototype.nodeType = 1, Zt.prototype.attach = function (t, e) {
                        if (this.content = G(this.aNode.textExpr, this.scope, this.owner), null == this.content && (this.content = ''), this.aNode.textExpr.original) {
                            this.id = this.id || i++, this.sel = document.createComment(this.id), At(this.sel, t, e), this.el = document.createComment(this.id), At(this.el, t, e);
                            var n = document.createElement('script');
                            t.insertBefore(n, this.el), n.insertAdjacentHTML('beforebegin', this.content), t.removeChild(n);
                        } else
                            this.el = document.createTextNode(this.content), At(this.el, t, e);
                    }, Zt.prototype.dispose = function (t) {
                        t || (d(this.el), d(this.sel)), this.el = null, this.sel = null;
                    };
                    var te = Tt && ('string' == typeof document.createTextNode('').textContent ? 'textContent' : 'data');
                    function ee(t, e, n, s, a) {
                        this.owner = s, this.scope = n, this.parent = e, this.parentComponent = 5 === e.nodeType ? e : e.parentComponent, this.id = i++, this.lifeCycle = X.start, this.children = [], this.nameBind = Z(t, 'name'), this.nameBind && (this.isNamed = !0, this.name = G(this.nameBind.expr, this.scope, this.owner));
                        var c, p, h = s.sourceSlots;
                        if (h && (c = this.isNamed ? h.named[this.name] : h.noname), c && (this.isInserted = !0), this.aNode = {
                                directives: t.directives,
                                props: [],
                                events: [],
                                children: c || t.children.slice(0),
                                vars: t.vars
                            }, this._sbindData = Mt(t.directives.bind, this.scope, this.owner), this._sbindData && (p = r({}, this._sbindData)), t.vars && (p = p || {}, o(t.vars, function (t) {
                                p[t.name] = G(t.expr, n, s);
                            })), this.isInserted && (this.childOwner = s.owner, this.childScope = s.scope), p && (this.isScoped = !0, this.childScope = new lt(p, this.childScope || this.scope)), s.slotChildren.push(this), a) {
                            var l, u = a.current;
                            u && 8 === u.nodeType && 's-slot' === u.data ? (this.sel = a.current, l = 1, a.goNext()) : (this.sel = document.createComment(this.id), a.current ? a.target.insertBefore(this.sel, a.current) : a.target.appendChild(this.sel));
                            for (var d = this.aNode.children, f = 0, A = d.length; f < A; f++)
                                this.children.push(mt(d[f], this, this.childScope || this.scope, this.childOwner || this.owner, a));
                            l ? (this.el = a.current, a.goNext()) : (this.el = document.createComment(this.id), a.current ? a.target.insertBefore(this.el, a.current) : a.target.appendChild(this.el)), this.lifeCycle = X.attached;
                        }
                    }
                    function ne(t, e, n) {
                        this.parent = t.scope, this.raw = {}, this.listeners = [], this.directive = t.aNode.directives.for, this.indexName = this.directive.index || '$index', this.raw[this.directive.item] = e, this.raw[this.indexName] = n;
                    }
                    function ie(t, e, n, s, r) {
                        if (this.aNode = t, this.owner = s, this.scope = n, this.parent = e, this.parentComponent = 5 === e.nodeType ? e : e.parentComponent, this.id = i++, this.children = [], this.param = t.directives.for, this.itemPaths = [{
                                    type: 1,
                                    value: this.param.item
                                }], this.itemExpr = {
                                type: 4,
                                paths: this.itemPaths,
                                raw: this.param.item
                            }, this.param.index && (this.indexExpr = {
                                type: 4,
                                paths: [{
                                        type: 1,
                                        value: '' + this.param.index
                                    }]
                            }), r) {
                            if (this.listData = G(this.param.value, this.scope, this.owner), this.listData instanceof Array)
                                for (var a = 0; a < this.listData.length; a++)
                                    this.children.push(mt(this.aNode.forRinsed, this, new ne(this, this.listData[a], a), this.owner, r));
                            else if (this.listData && 'object' == typeof this.listData)
                                for (var a in this.listData)
                                    this.listData.hasOwnProperty(a) && null != this.listData[a] && this.children.push(mt(this.aNode.forRinsed, this, new ne(this, this.listData[a], a), this.owner, r));
                            this._create(), At(this.el, r.target, r.current);
                        }
                    }
                    function se(t, e, n, s, r) {
                        if (this.aNode = t, this.owner = s, this.scope = n, this.parent = e, this.parentComponent = 5 === e.nodeType ? e : e.parentComponent, this.id = i++, this.children = [], r) {
                            if (G(this.aNode.directives.if.value, this.scope, this.owner))
                                this.elseIndex = -1, this.children[0] = mt(this.aNode.ifRinsed, this, this.scope, this.owner, r);
                            else {
                                var a = t.elses;
                                if (a)
                                    for (var o = 0, c = a.length; o < c; o++) {
                                        var p = a[o], h = p.directives.elif;
                                        if (!h || h && G(h.value, this.scope, this.owner)) {
                                            this.elseIndex = o, this.children[0] = mt(p, this, this.scope, this.owner, r);
                                            break;
                                        }
                                    }
                            }
                            this._create(), At(this.el, r.target, r.current);
                        }
                    }
                    function re(t, e, n, s, r) {
                        this.aNode = t, this.owner = s, this.scope = n, this.parent = e, this.parentComponent = 5 === e.nodeType ? e : e.parentComponent, this.id = i++, this.children = [], this.tagName = this.aNode.tagName, r && (this.cmpt = G(this.aNode.directives.is.value, this.scope) || this.tagName, this.children[0] = mt(this.aNode.isRinsed, this, this.scope, this.owner, r, this.cmpt));
                    }
                    function ae(t, e) {
                        var n;
                        function i(t, e) {
                            var i = function t(e, n) {
                                    var i, s = [];
                                    function r(e, n) {
                                        for (var r = 0, a = e.length; r < a; r++)
                                            s = s.concat(t(e[r], n)), i = i || e[r].dynamic;
                                    }
                                    switch (e.type) {
                                    case 4:
                                        i = n;
                                        var a = e.paths;
                                        s.push(a[0].value), a.length > 1 && s.push(a[0].value + '.' + (a[1].value || '*')), r(a.slice(1), 1);
                                        break;
                                    case 9:
                                        s = t(e.expr, n), i = e.expr.dynamic;
                                        break;
                                    case 7:
                                    case 8:
                                    case 10:
                                        r(e.segs, n);
                                        break;
                                    case 5:
                                        s = t(e.expr), i = e.expr.dynamic, o(e.filters, function (t) {
                                            r(t.name.paths), r(t.args);
                                        });
                                        break;
                                    case 6:
                                        r(e.name.paths), r(e.args);
                                        break;
                                    case 12:
                                    case 11:
                                        for (var c = 0; c < e.items.length; c++)
                                            s = s.concat(t(e.items[c].expr)), i = i || e.items[c].expr.dynamic;
                                    }
                                    return i && (e.dynamic = !0), s;
                                }(t), s = i.length;
                            if (s)
                                for (var r = 0, a = n.length; r < a; r++)
                                    if (!e || r !== a - 1) {
                                        var c = n[r]._d;
                                        c || (c = n[r]._d = {});
                                        for (var p = 0; p < s; p++)
                                            c[i[p]] = 1;
                                    }
                        }
                        t && !t._ht && (n = [], function t(s) {
                            if (!s._ht) {
                                if (n.push(s), s.textExpr)
                                    s._ht = !0, s.Clazz = Zt, i(s.textExpr);
                                else {
                                    s._ht = !0, s._i = 0, s._dp = [], s._xp = [], s._pi = {}, s._b = [], s._ce = !s.directives.is && s.tagName && s.tagName.indexOf('-') < 0 && !/^(template|select|input|option|button|video|audio|canvas|img|embed|object|iframe)$/i.test(s.tagName), o(s.vars, function (t) {
                                        i(t.expr);
                                    });
                                    for (var r = s.props, a = r.length, c = 0; c < a; c++) {
                                        var p = r[c];
                                        s._b.push({
                                            name: N(p.name),
                                            expr: null != p.noValue ? {
                                                type: 3,
                                                value: !0
                                            } : p.expr,
                                            x: p.x,
                                            noValue: p.noValue
                                        }), i(p.expr);
                                    }
                                    for (var h in s.directives)
                                        if (s.directives.hasOwnProperty(h)) {
                                            var l = s.directives[h];
                                            if (i(l.value, !/^(html|bind)$/.test(h)), 'for' === h) {
                                                var u = l.trackBy;
                                                u && 4 === u.type && u.paths[0].value === l.item && (s._gfk = new Function(l.item, 'return ' + l.trackByRaw));
                                            }
                                        }
                                    o(s.elses, function (e) {
                                        t(e);
                                    });
                                    c = 0;
                                    for (var d = s.children.length; c < d; c++)
                                        t(s.children[c]);
                                    for (c = 0; c < a; c++) {
                                        p = r[c];
                                        s._pi[p.name] = c, p.handler = ct(s.tagName, p.name), null == p.expr.value && (p.x && s._xp.push(p), s._dp.push(p));
                                    }
                                    if ('option' === s.tagName && !Z(s, 'value') && s.children[0]) {
                                        var f = {
                                            name: 'value',
                                            expr: s.children[0].textExpr,
                                            handler: ct(s.tagName, 'value')
                                        };
                                        s.props.push(f), s._dp.push(f), s._pi.value = r.length - 1;
                                    }
                                    switch (s.directives.if && (s.ifRinsed = {
                                            children: s.children,
                                            props: r,
                                            events: s.events,
                                            tagName: s.tagName,
                                            vars: s.vars,
                                            directives: s.directives,
                                            _ht: !0,
                                            _i: 0,
                                            _d: s._d,
                                            _dp: s._dp,
                                            _xp: s._xp,
                                            _pi: s._pi,
                                            _b: s._b,
                                            _ce: s._ce
                                        }, s.Clazz = se, s = s.ifRinsed), s.directives.for && (s.forRinsed = {
                                            children: s.children,
                                            props: r,
                                            events: s.events,
                                            tagName: s.tagName,
                                            vars: s.vars,
                                            directives: s.directives,
                                            _ht: !0,
                                            _i: 0,
                                            _d: s._d,
                                            _dp: s._dp,
                                            _xp: s._xp,
                                            _pi: s._pi,
                                            _b: s._b,
                                            _ce: s._ce
                                        }, s.Clazz = ie, s = s.forRinsed), s.directives.is && (s.isRinsed = {
                                            children: s.children,
                                            props: r,
                                            events: s.events,
                                            tagName: s.tagName,
                                            vars: s.vars,
                                            directives: s.directives,
                                            _ht: !0,
                                            _i: 0,
                                            _d: s._d,
                                            _dp: s._dp,
                                            _xp: s._xp,
                                            _pi: s._pi,
                                            _b: s._b,
                                            _ce: s._ce
                                        }, s.Clazz = re, s = s.isRinsed), s.tagName) {
                                    case 'slot':
                                        s.Clazz = ee;
                                        break;
                                    case 'template':
                                    case 'fragment':
                                        s.Clazz = Ct;
                                        break;
                                    default:
                                        if (!s.directives.is && Xt[s.tagName]) {
                                            var A = e && e.components;
                                            A && A[s.tagName] || (s.elem = !0);
                                        }
                                    }
                                }
                                n.pop();
                            }
                        }(t));
                    }
                    function oe(t) {
                        t = t || {}, this.lifeCycle = X.start, this.id = i++, this.children = [], this.slotChildren = [], this.implicitChildren = [];
                        var e = this.constructor;
                        this.owner = t.owner, this.scope = t.scope;
                        var n = t.parent;
                        n ? (this.parent = n, this.parentComponent = 5 === n.nodeType ? n : n && n.parentComponent) : this.owner && (this.parentComponent = this.owner, this.scope = this.owner.data), this.sourceSlotNameProps = [], this.sourceSlots = { named: {} };
                        var s, a = e.prototype;
                        if (!a.hasOwnProperty('aNode')) {
                            var o = e.aPack || a.hasOwnProperty('aPack') && a.aPack;
                            o ? (a.aNode = Wt(o), e.aPack = a.aPack = null) : a.aNode = Jt(e);
                        }
                        if (ae(a.aNode, this), this.tagName = a.aNode.tagName, this.source = 'string' == typeof t.source ? L(t.source).children[0] : t.source, ae(this.source), a.aNode._i++, this.source) {
                            this._initSourceSlots(1);
                            for (var c = 0, p = this.source.events.length; c < p; c++) {
                                var h = this.source.events[c];
                                h.modifier.native && (this.nativeEvents = this.nativeEvents || [], this.nativeEvents.push(h));
                            }
                            this.tagName = this.tagName || this.source.tagName, this.binds = this.source._b, this._srcSbindData = Mt(this.source.directives.bind, this.scope, this.owner);
                        }
                        try {
                            s = 'function' == typeof this.initData && this.initData();
                        } catch (f) {
                            H(f, this, 'initData');
                        }
                        if (s = r(s || {}, t.data || this._srcSbindData), this.binds && this.scope)
                            for (c = 0, p = this.binds.length; c < p; c++) {
                                var l = this.binds[c], u = G(l.expr, this.scope, this.owner);
                                void 0 !== u && (s[l.name] = u);
                            }
                        this.data = new lt(s), this.tagName = this.tagName || 'div', b && this.tagName.indexOf('-') > 0 && (this.tagName = 'div'), this._initDataChanger(), this._sbindData = Mt(this.aNode.directives.bind, this.data, this), this.lifeCycle = X.inited;
                        var d = t.reverseWalker;
                        d && (this.aNode.Clazz ? (this._rootNode = mt(this.aNode, this, this.data, this, d), this._rootNode._getElAsRootNode && (this.el = this._rootNode._getElAsRootNode())) : (this.el = d.current, d.goNext(), Nt(this, this.data, this)), this.lifeCycle = X.created, this._attached(), this.lifeCycle = X.attached);
                    }
                    Zt.prototype._update = function (t) {
                        if (!this.aNode.textExpr.value)
                            for (var e = t.length; e--;)
                                if (J(t[e].expr, this.aNode.textExpr, this.scope)) {
                                    var n = G(this.aNode.textExpr, this.scope, this.owner);
                                    if (null == n && (n = ''), n !== this.content)
                                        if (this.content = n, this.aNode.textExpr.original) {
                                            for (var i = this.sel.nextSibling, s = this.el.parentNode; i !== this.el;) {
                                                var r = i;
                                                i = i.nextSibling, d(r);
                                            }
                                            var a = document.createElement('script');
                                            s.insertBefore(a, this.el), a.insertAdjacentHTML('beforebegin', n), s.removeChild(a);
                                        } else
                                            this.el[te] = n;
                                    return;
                                }
                    }, ee.prototype.nodeType = 6, ee.prototype.dispose = function (t, e) {
                        this.childOwner = null, this.childScope = null, xt(this.children, t, e), t || (d(this.el), d(this.sel)), this.sel = null, this.el = null, this.owner = null, this.scope = null, this.children = null, this.lifeCycle = X.disposed, this._ondisposed && this._ondisposed();
                    }, ee.prototype.attach = _t, ee.prototype._update = function (t, e) {
                        var n = this;
                        if (this.nameBind && G(this.nameBind.expr, this.scope, this.owner) !== this.name)
                            return this.owner._notifyNeedReload(), !1;
                        if (e) {
                            if (this.isInserted)
                                for (var i = 0; i < this.children.length; i++)
                                    this.children[i]._update(t);
                        } else if (this.isScoped) {
                            var s = {};
                            o(this.aNode.vars, function (t) {
                                s[t.name] = 1, n.childScope.set(t.name, G(t.expr, n.scope, n.owner));
                            });
                            var r = [];
                            this._sbindData = Ht(this.aNode.directives.bind, this._sbindData, this.scope, this.owner, t, function (t, e) {
                                s[t] || (n.childScope.set(t, e), r.push({
                                    type: 1,
                                    expr: {
                                        type: 4,
                                        paths: [{
                                                type: 1,
                                                value: t
                                            }]
                                    },
                                    value: e,
                                    option: {}
                                }));
                            }), o(t, function (t) {
                                n.isInserted || r.push(t), o(n.aNode.vars, function (e) {
                                    var i = e.name, s = J(t.expr, e.expr, n.scope);
                                    s < 1 || (2 !== t.type ? r.push({
                                        type: 1,
                                        expr: {
                                            type: 4,
                                            paths: [{
                                                    type: 1,
                                                    value: i
                                                }]
                                        },
                                        value: n.childScope.get(i),
                                        option: t.option
                                    }) : 2 === s && r.push({
                                        expr: {
                                            type: 4,
                                            paths: [{
                                                    type: 1,
                                                    value: i
                                                }]
                                        },
                                        type: 2,
                                        index: t.index,
                                        deleteCount: t.deleteCount,
                                        value: t.value,
                                        insertions: t.insertions,
                                        option: t.option
                                    }));
                                });
                            });
                            for (i = 0; i < this.children.length; i++)
                                this.children[i]._update(r);
                        } else if (!this.isInserted)
                            for (i = 0; i < this.children.length; i++)
                                this.children[i]._update(t);
                    }, ne.prototype.exprResolve = function (t) {
                        var e = this.directive;
                        4 === t.type && t.paths[0].value === e.item && (t = {
                            type: 4,
                            paths: e.value.paths.concat({
                                type: 2,
                                value: this.raw[this.indexName]
                            }, t.paths.slice(1))
                        });
                        for (var n = [], i = 0, s = t.paths.length; i < s; i++) {
                            var r = t.paths[i];
                            if (4 === r.type)
                                switch (r.paths[0].value) {
                                case e.item:
                                    r = {
                                        type: 4,
                                        paths: e.value.paths.concat({
                                            type: 2,
                                            value: this.raw[this.indexName]
                                        }, r.paths.slice(1))
                                    };
                                    break;
                                case this.indexName:
                                    r = {
                                        type: 2,
                                        value: this.raw[this.indexName]
                                    };
                                }
                            n.push(r);
                        }
                        return {
                            type: 4,
                            paths: n
                        };
                    }, a(ne, lt), o([
                        'set',
                        'remove',
                        'unshift',
                        'shift',
                        'push',
                        'pop',
                        'splice'
                    ], function (t) {
                        ne.prototype['_' + t] = lt.prototype[t], ne.prototype[t] = function (e) {
                            e = this.exprResolve(V(e)), this.parent[t].apply(this.parent, [e].concat(Array.prototype.slice.call(arguments, 1)));
                        };
                    }), ie.prototype.nodeType = 3, ie.prototype._create = kt, ie.prototype.dispose = wt, ie.prototype.attach = function (t, e) {
                        this._create(), At(this.el, t, e), this.listData = G(this.param.value, this.scope, this.owner), this._createChildren();
                    }, ie.prototype._createChildren = function () {
                        var t = this.el.parentNode, e = this.listData;
                        if (e instanceof Array)
                            for (var n = 0; n < e.length; n++) {
                                var i = (s = this.aNode.forRinsed).Clazz ? new s.Clazz(s, this, new ne(this, e[n], n), this.owner) : bt(s, this, new ne(this, e[n], n), this.owner);
                                this.children.push(i), i.attach(t, this.el);
                            }
                        else if (e && 'object' == typeof e)
                            for (var n in e)
                                if (e.hasOwnProperty(n) && null != e[n]) {
                                    var s;
                                    i = (s = this.aNode.forRinsed).Clazz ? new s.Clazz(s, this, new ne(this, e[n], n), this.owner) : bt(s, this, new ne(this, e[n], n), this.owner);
                                    this.children.push(i), i.attach(t, this.el);
                                }
                    }, ie.prototype._update = function (t) {
                        var e = G(this.param.value, this.scope, this.owner), n = this.listData instanceof Array, i = e instanceof Array;
                        if (this.children.length)
                            if (!e || i && 0 === e.length)
                                this._disposeChildren(), this.listData = e;
                            else if (n === i && i)
                                this._updateArray(t, e), this.listData = e;
                            else {
                                var s;
                                this.listData = e;
                                for (var r = 0; !s && r < t.length; r++)
                                    s = J(t[r].expr, this.param.value, this.scope);
                                var a = this.aNode._d;
                                if (s || a && ft(t, a)) {
                                    var o = this;
                                    this._disposeChildren(null, function () {
                                        o._createChildren();
                                    });
                                }
                            }
                        else
                            this.listData = e, this._createChildren();
                    }, ie.prototype._disposeChildren = function (t, e) {
                        var n = this.el.parentNode, i = n.firstChild, s = n.lastChild, r = this.children.length, a = !this.aNode.directives.transition && !t && r && i === this.children[0].el && s === this.el;
                        t || (t = this.children, this.children = []);
                        var o = 0;
                        r = t.length;
                        for (var c = 0; c < r; c++) {
                            var p = t[c];
                            a ? p && p.dispose(a, a) : p ? (p._ondisposed = h, p.dispose()) : h();
                        }
                        function h() {
                            ++o >= r && e && e();
                        }
                        a && (x ? n.innerHTML = '' : n.textContent = '', this.el = document.createComment(this.id), n.appendChild(this.el), e && e());
                    }, ie.prototype.opti = 'undefined' != typeof navigator && /chrome\/[0-9]+/i.test(navigator.userAgent), ie.prototype._updateArray = function (t, e) {
                        var n = this.children.length, i = new Array(n), s = 4 === this.children[0].nodeType;
                        function r(t) {
                            for (var e = 0, n = i.length; e < n; e++)
                                (i[e] = i[e] || []).push(t);
                            p = null, c = !1;
                        }
                        for (var a, o = [], c = !0, p = {}, h = e.length, l = this.aNode._gfk, u = 0; u < t.length; u++) {
                            var d = t[u], f = J(d.expr, this.param.value, this.scope);
                            if (f)
                                if (f > 2) {
                                    var A = d.expr.paths, y = this.param.value.paths.length, g = +G(A[y], this.scope, this.owner);
                                    isNaN(g) ? r(d) : a || (c = !1, p && (p[g] = 1), i[g] = i[g] || [], this.param.index && i[g].push(d), d = 1 === d.type ? {
                                        type: d.type,
                                        expr: {
                                            type: 4,
                                            paths: this.itemPaths.concat(A.slice(y + 1))
                                        },
                                        value: d.value,
                                        option: d.option
                                    } : {
                                        index: d.index,
                                        deleteCount: d.deleteCount,
                                        insertions: d.insertions,
                                        type: d.type,
                                        expr: {
                                            type: 4,
                                            paths: this.itemPaths.concat(A.slice(y + 1))
                                        },
                                        value: d.value,
                                        option: d.option
                                    }, i[g].push(d), 1 === d.type ? this.children[g] ? this.children[g].scope._set(d.expr, d.value, { silent: 1 }) : this.children[g] = 0 : this.children[g] && this.children[g].scope._splice(d.expr, [].concat(d.index, d.deleteCount, d.insertions), { silent: 1 }));
                                } else {
                                    if (a)
                                        continue;
                                    if (2 !== f || 2 !== d.type || 'optimized' === this.owner.updateMode && this.opti && !this.aNode.directives.transition)
                                        if (p = null, c = !1, a = 1, l && h && n) {
                                            var v = [], m = [], x = {}, b = [], _ = {};
                                            for (tt = 0; tt < e.length; tt++) {
                                                var C = l(e[tt]);
                                                v.push(C), x[C] = tt;
                                            }
                                            for (tt = 0; tt < this.listData.length; tt++) {
                                                C = l(this.listData[tt]);
                                                m.push(C), _[C] = tt, null != x[C] ? b[tt] = x[C] : (b[tt] = -1, o.push(this.children[tt]));
                                            }
                                            for (var k = 0, w = h, E = 0, N = n; k < h && E < n && v[k] === m[E];)
                                                this.listData[E] !== e[k] && (this.children[E].scope.raw[this.param.item] = e[k], (i[E] = i[E] || []).push({
                                                    type: 1,
                                                    option: d.option,
                                                    expr: this.itemExpr,
                                                    value: e[k]
                                                })), f < 2 && (i[E] = i[E] || []).push(d), k++, E++;
                                            for (Z = this.param.index ? {
                                                    type: 1,
                                                    option: d.option,
                                                    expr: this.indexExpr
                                                } : null; w > k && N > E && v[w - 1] === m[N - 1];)
                                                w--, N--, this.listData[N] !== e[w] && (this.children[N].scope.raw[this.param.item] = e[w], (i[N] = i[N] || []).push({
                                                    type: 1,
                                                    option: d.option,
                                                    expr: this.itemExpr,
                                                    value: e[w]
                                                })), w !== N && (this.children[N].scope.raw[this.children[N].scope.indexName] = w, Z && (i[N] = i[N] || []).push(Z)), f < 2 && (i[N] = i[N] || []).push(d);
                                            var I = [], D = [], F = -1, S = b.slice(E, N), T = N - E, P = new Array(T);
                                            for (tt = 0; tt < T; tt++) {
                                                var B = S[tt];
                                                if (-1 !== B) {
                                                    var O = -1, R = I.length;
                                                    if (R > 0 && I[R - 1] <= B)
                                                        O = R - 1;
                                                    else
                                                        for (; R - O > 1;) {
                                                            var V = Math.floor((O + R) / 2);
                                                            I[V] > B ? R = V : O = V;
                                                        }
                                                    -1 !== O && (P[tt] = D[O]), O === F ? (I[++F] = B, D[F] = tt) : B < I[O + 1] && (I[O + 1] = B, D[O + 1] = tt);
                                                }
                                            }
                                            for (tt = D[F]; F >= 0; tt = P[tt], F--)
                                                I[F] = tt;
                                            var j = I.length, z = j ? b[I[--j] + E] : -1, U = [], Y = [], M = this.el, L = s && M.parentNode;
                                            for (tt = h - 1; tt >= 0; tt--)
                                                if (tt >= w)
                                                    U[tt] = this.children[n - h + tt], Y[tt] = i[n - h + tt], s && (M = U[tt].el);
                                                else if (tt < k)
                                                    U[tt] = this.children[tt], Y[tt] = i[tt];
                                                else {
                                                    var H = _[v[tt]], $ = this.children[H];
                                                    if ($ && (s || tt === z)) {
                                                        var W = $.scope;
                                                        this.listData[H] !== e[tt] && (W.raw[this.param.item] = e[tt], (i[H] = i[H] || []).push({
                                                            type: 1,
                                                            option: d.option,
                                                            expr: this.itemExpr,
                                                            value: e[tt]
                                                        })), Z && tt !== H && (W.raw[W.indexName] = tt, Z && (i[H] = i[H] || []).push(Z)), f < 2 && (i[H] = i[H] || []).push(d), U[tt] = $, Y[tt] = i[H], tt === z ? z = j ? b[I[--j] + E] : -1 : L.insertBefore($.el, M), s && (M = $.el);
                                                    } else
                                                        $ && o.push($), U[tt] = 0, Y[tt] = 0;
                                                }
                                            this.children = U, i = Y;
                                        } else {
                                            n > h && (o = o.concat(this.children.slice(h)), i = i.slice(0, h), this.children = this.children.slice(0, h));
                                            for (tt = 0; tt < h; tt++)
                                                f < 2 && (i[tt] = i[tt] || []).push(d), this.children[tt] ? this.children[tt].scope.raw[this.param.item] !== e[tt] && (this.children[tt].scope.raw[this.param.item] = e[tt], (i[tt] = i[tt] || []).push({
                                                    type: 1,
                                                    option: d.option,
                                                    expr: this.itemExpr,
                                                    value: e[tt]
                                                })) : this.children[tt] = 0;
                                        }
                                    else {
                                        p = null;
                                        var K = d.index, q = d.deleteCount, Q = d.insertions.length, X = Q - q;
                                        if (X)
                                            for (var Z = this.param.index ? {
                                                        type: 1,
                                                        option: d.option,
                                                        expr: this.indexExpr
                                                    } : null, tt = K + q; tt < this.children.length; tt++) {
                                                Z && (c = !1, (i[tt] = i[tt] || []).push(Z));
                                                var et = this.children[tt];
                                                et && (et.scope.raw[et.scope.indexName] = tt - q + Q);
                                            }
                                        for (var nt = q; nt--;) {
                                            if (nt < Q)
                                                c = !1, (i[tt = K + nt] = i[tt] || []).push({
                                                    type: 1,
                                                    option: d.option,
                                                    expr: this.itemExpr,
                                                    value: d.insertions[nt]
                                                }), this.children[tt] && (this.children[tt].scope.raw[this.param.item] = d.insertions[nt]);
                                        }
                                        if (X < 0)
                                            o = o.concat(this.children.splice(K + Q, -X)), i.splice(K + Q, -X);
                                        else if (X > 0) {
                                            c = !1;
                                            var it = [
                                                K + q,
                                                0
                                            ].concat(new Array(X));
                                            this.children.splice.apply(this.children, it), i.splice.apply(i, it);
                                        }
                                    }
                                }
                            else
                                r(d);
                        }
                        if (h !== n && this.param.value.paths) {
                            var st = {
                                type: 1,
                                option: {},
                                expr: {
                                    type: 4,
                                    paths: this.param.value.paths.concat({
                                        type: 1,
                                        value: 'length'
                                    })
                                }
                            };
                            ft([st], this.aNode._d) && r(st);
                        }
                        this._doCreateAndUpdate = at;
                        var rt = this;
                        function at() {
                            if (rt._doCreateAndUpdate = null, !c)
                                for (var t = rt.el, n = t.parentNode, s = -1, r = 0; r < h; r++) {
                                    var a = rt.children[r];
                                    if (a)
                                        !i[r] || p && !p[r] || a._update(i[r]);
                                    else {
                                        if (s < r)
                                            for (s = r + 1, t = null; s < h;) {
                                                var o = rt.children[s];
                                                if (o) {
                                                    t = o.sel || o.el;
                                                    break;
                                                }
                                                s++;
                                            }
                                        rt.children[r] = bt(rt.aNode.forRinsed, rt, new ne(rt, e[r], r), rt.owner), rt.children[r].attach(n, t || rt.el);
                                    }
                                }
                        }
                        0 === o.length ? at() : this._disposeChildren(o, function () {
                            at === rt._doCreateAndUpdate && at();
                        });
                    }, se.prototype.nodeType = 2, se.prototype._create = kt, se.prototype.dispose = wt, se.prototype.attach = function (t, e) {
                        var n, i, s = this.aNode.elses;
                        if (G(this.aNode.directives.if.value, this.scope, this.owner))
                            i = bt(this.aNode.ifRinsed, this, this.scope, this.owner), n = -1;
                        else if (s)
                            for (var r = 0, a = s.length; r < a; r++) {
                                var o = s[r], c = o.directives.elif;
                                if (!c || c && G(c.value, this.scope, this.owner)) {
                                    i = bt(o, this, this.scope, this.owner), n = r;
                                    break;
                                }
                            }
                        i && (this.children[0] = i, i.attach(t, e), this.elseIndex = n), this._create(), At(this.el, t, e);
                    }, se.prototype._update = function (t) {
                        var e, n = this, i = this.aNode.ifRinsed, s = this.aNode.elses;
                        if (G(this.aNode.directives.if.value, this.scope, this.owner))
                            e = -1;
                        else if (s)
                            for (var r = 0, a = s.length; r < a; r++) {
                                var o = s[r], c = o.directives.elif;
                                if (c && G(c.value, this.scope, this.owner) || !c) {
                                    e = r, i = o;
                                    break;
                                }
                            }
                        var p = this.children[0];
                        function h() {
                            void 0 !== e && (n.children[0] = bt(i, n, n.scope, n.owner)).attach(n.el.parentNode, n.el);
                        }
                        e === this.elseIndex ? p && p._update(t) : (this.children = [], p ? (p._ondisposed = h, p.dispose()) : h(), this.elseIndex = e);
                    }, se.prototype._getElAsRootNode = function () {
                        var t = this.children[0];
                        return t && t.el || this.el;
                    }, re.prototype.nodeType = 9, re.prototype.dispose = wt, re.prototype.attach = function (t, e) {
                        this.cmpt = G(this.aNode.directives.is.value, this.scope) || this.tagName;
                        var n = bt(this.aNode.isRinsed, this, this.scope, this.owner, this.cmpt);
                        this.children[0] = n, n.attach(t, e);
                    }, re.prototype._update = function (t) {
                        var e = this.children[0], n = G(this.aNode.directives.is.value, this.scope) || this.tagName;
                        if (n === this.cmpt)
                            e._update(t);
                        else {
                            this.cmpt = n;
                            var i = bt(this.aNode.isRinsed, this, this.scope, this.owner, this.cmpt), s = e.el;
                            i.attach(s.parentNode, s), e.dispose(), this.children[0] = i;
                        }
                    }, re.prototype._getElAsRootNode = function () {
                        return this.children[0].el;
                    }, oe.prototype._initDataChanger = function () {
                        var t = this;
                        this._dataChanger = function (e) {
                            t.lifeCycle.created ? (t._dataChanges || (v(t._update, t), t._dataChanges = []), t._dataChanges.push(e)) : t.lifeCycle.inited && t.owner && t._updateBindxOwner([e]);
                        }, this.data.listen(this._dataChanger);
                    }, oe.prototype.attach = function (t, e) {
                        if (!this.lifeCycle.attached) {
                            var n = this.aNode;
                            if (n.Clazz)
                                this._rootNode = this._rootNode || bt(n, this, this.data, this), this._rootNode.attach(t, e), this._rootNode._getElAsRootNode && (this.el = this._rootNode._getElAsRootNode()), this.lifeCycle = X.created;
                            else {
                                if (!this.el) {
                                    var i;
                                    if (n._ce && n._i > 2 ? (i = n._dp, this.el = (n._el || It(n)).cloneNode(!1)) : (i = n.props, this.el = u(this.tagName)), this._sbindData)
                                        for (var s in this._sbindData)
                                            this._sbindData.hasOwnProperty(s) && ct(this.tagName, s)(this.el, this._sbindData[s], s, this);
                                    for (var r = 0, a = i.length; r < a; r++) {
                                        var o = i[r], c = G(o.expr, this.data, this);
                                        !c && yt[o.name] || o.handler(this.el, c, o.name, this);
                                    }
                                    this.lifeCycle = X.created;
                                }
                                if (At(this.el, t, e), !this._contentReady) {
                                    var p = n.directives.html;
                                    if (p)
                                        this.el.innerHTML = G(p.value, this.data, this);
                                    else
                                        for (r = 0, a = n.children.length; r < a; r++) {
                                            var h = n.children[r], l = h.Clazz ? new h.Clazz(h, this, this.data, this) : bt(h, this, this.data, this);
                                            this.children.push(l), l.attach(this.el);
                                        }
                                    this._contentReady = 1;
                                }
                                this._attached();
                            }
                            this.lifeCycle = X.attached;
                        }
                    }, oe.prototype.nodeType = 5, oe.prototype._getElAsRootNode = function () {
                        return this.el;
                    }, oe.prototype._update = function (t) {
                        if (!this.lifeCycle.disposed) {
                            var e = this, n = !1;
                            if (this._notifyNeedReload = function () {
                                    n = !0;
                                }, t)
                                if (this.source && (this._srcSbindData = Ht(this.source.directives.bind, this._srcSbindData, this.scope, this.owner, t, function (t, n) {
                                        t in e.source._pi || e.data.set(t, n, { target: { node: e.owner } });
                                    })), o(t, function (t) {
                                        var i = t.expr;
                                        o(e.binds, function (n) {
                                            var s, r = n.name, a = n.expr;
                                            !pt(t, e, r) && (s = J(i, a, e.scope)) && (s > 2 && (r = {
                                                type: 4,
                                                paths: [{
                                                        type: 1,
                                                        value: r
                                                    }].concat(i.paths.slice(a.paths.length))
                                            }, a = i), s >= 2 && 2 === t.type ? e.data.splice(r, [
                                                t.index,
                                                t.deleteCount
                                            ].concat(t.insertions), { target: { node: e.owner } }) : e.data.set(r, G(a, e.scope, e.owner), { target: { node: e.owner } }));
                                        }), o(e.sourceSlotNameProps, function (t) {
                                            return !(n = n || J(i, t.expr, e.scope));
                                        });
                                    }), n)
                                    this._initSourceSlots(), this._repaintChildren();
                                else
                                    for (var i = this.slotChildren.length; i--;) {
                                        var s = this.slotChildren[i];
                                        s.lifeCycle.disposed ? this.slotChildren.splice(i, 1) : s.isInserted && s._update(t, 1);
                                    }
                            var r = this._dataChanges;
                            if (r) {
                                this._dataChanges = null, this._sbindData = Ht(this.aNode.directives.bind, this._sbindData, this.data, this, r, function (t, n) {
                                    e._rootNode || t in e.aNode._pi || ct(e.tagName, t)(e.el, n, t, e);
                                });
                                var a = this.aNode.directives.html;
                                if (this._rootNode)
                                    this._rootNode._update(r), this._rootNode._getElAsRootNode && (this.el = this._rootNode._getElAsRootNode());
                                else if (a) {
                                    for (var c = r.length; c--;)
                                        if (J(r[c].expr, a.value, this.data)) {
                                            this.el.innerHTML = G(a.value, this.data, this);
                                            break;
                                        }
                                } else {
                                    for (var p = this.aNode._dp, h = 0; h < p.length; h++)
                                        for (var l = p[h], u = 0; u < r.length; u++) {
                                            var d = r[u];
                                            if (J(d.expr, l.expr, this.data) || l.hintExpr && J(d.expr, l.hintExpr, this.data)) {
                                                l.handler(this.el, G(l.expr, this.data, this), l.name, this);
                                                break;
                                            }
                                        }
                                    for (h = 0; h < this.children.length; h++)
                                        this.children[h]._update(r);
                                }
                                n && (this._initSourceSlots(), this._repaintChildren()), this.owner && this._updateBindxOwner(r) && this.owner._update();
                            }
                            this._notifyNeedReload = null;
                        }
                    }, oe.prototype._updateBindxOwner = function (t) {
                        var e, n = this;
                        return o(t, function (t) {
                            o(n.binds, function (i) {
                                var s = t.expr;
                                if (i.x && !pt(t, n.owner) && J(s, V(i.name), n.data)) {
                                    var r = i.expr;
                                    s.paths.length > 1 && (r = {
                                        type: 4,
                                        paths: i.expr.paths.concat(s.paths.slice(1))
                                    }), e = 1, n.scope.set(r, G(s, n.data, n), {
                                        target: {
                                            node: n,
                                            prop: i.name
                                        }
                                    });
                                }
                            });
                        }), e;
                    }, oe.prototype._initSourceSlots = function (t) {
                        if (this.sourceSlots.named = {}, this.source && this.scope)
                            for (var e = this.source.children, n = 0, i = e.length; n < i; n++) {
                                var s, r = e[n], a = !r.textExpr && Z(r, 'slot');
                                if (a) {
                                    t && this.sourceSlotNameProps.push(a);
                                    var o = G(a.expr, this.scope, this.owner);
                                    (s = this.sourceSlots.named[o]) || (s = this.sourceSlots.named[o] = []), s.push(r);
                                } else
                                    t && ((s = this.sourceSlots.noname) || (s = this.sourceSlots.noname = []), s.push(r));
                            }
                    }, oe.prototype._repaintChildren = function () {
                        if (this._rootNode) {
                            var t = this._rootNode.el.parentNode, e = this._rootNode.el.nextSibling;
                            this._rootNode.dispose(0, 1), this.slotChildren = [], this._rootNode = bt(this.aNode, this, this.data, this), this._rootNode.attach(t, e), this._rootNode._getElAsRootNode && (this.el = this._rootNode._getElAsRootNode());
                        } else {
                            xt(this.children, 0, 1), this.children = [], this.slotChildren = [];
                            for (var n = 0, i = this.aNode.children.length; n < i; n++) {
                                var s = bt(this.aNode.children[n], this, this.data, this);
                                this.children.push(s), s.attach(this.el);
                            }
                        }
                    }, oe.prototype._leave = function () {
                        if (this.leaveDispose) {
                            if (!this.lifeCycle.disposed) {
                                if (this.data.unlisten(), this.dataChanger = null, this._dataChanges = null, this.source = null, this.sourceSlots = null, this.sourceSlotNameProps = null, this.slotChildren = null, this._rootNode)
                                    this._rootNode.dispose(this.disposeNoDetach && this.parent);
                                else {
                                    for (var t = this.children.length; t--;)
                                        this.children[t].dispose(1, 1);
                                    this._inputTimer && (clearInterval(this._inputTimer), this._inputTimer = null), this.disposeNoDetach && this.parent || d(this.el);
                                }
                                this.lifeCycle = X.detached, this._rootNode = null, this.el = null, this.owner = null, this.scope = null, this.children = null, this.lifeCycle = X.disposed, this._ondisposed && this._ondisposed();
                            }
                        } else
                            this.lifeCycle.attached && (this._rootNode ? this._rootNode.detach ? this._rootNode.detach() : (this._rootNode.dispose(), this._rootNode = null) : d(this.el), this.lifeCycle = X.detached);
                    }, oe.prototype.detach = Ft, oe.prototype.dispose = St, oe.prototype._attached = Yt;
                    var ce = {
                        version: '3.12.2',
                        Component: Gt,
                        defineComponent: Kt,
                        defineTemplateComponent: function (t) {
                            switch (typeof t) {
                            case 'function':
                                return t;
                            case 'string':
                                t = { template: t };
                            }
                            function e(t) {
                                oe.call(this, t);
                            }
                            return e.prototype = t, a(e, oe), e;
                        },
                        createComponentLoader: function (t) {
                            var e = t.placeholder, n = t.fallback;
                            return new qt('function' == typeof t ? t : t.load, e, n);
                        },
                        parseComponentTemplate: Jt,
                        unpackANode: Wt,
                        parseTemplate: L,
                        parseExpr: V,
                        ExprType: {
                            STRING: 1,
                            NUMBER: 2,
                            BOOL: 3,
                            ACCESSOR: 4,
                            INTERP: 5,
                            CALL: 6,
                            TEXT: 7,
                            BINARY: 8,
                            UNARY: 9,
                            TERTIARY: 10,
                            OBJECT: 11,
                            ARRAY: 12,
                            NULL: 13
                        },
                        LifeCycle: X,
                        NodeType: {
                            TEXT: 1,
                            IF: 2,
                            FOR: 3,
                            ELEM: 4,
                            CMPT: 5,
                            SLOT: 6,
                            FRAG: 7,
                            LOADER: 8,
                            IS: 9
                        },
                        nextTick: v,
                        Data: lt,
                        evalExpr: G,
                        inherits: a,
                        DataTypes: w
                    };
                    t.exports = ce;
                }();
            }.call(this, n('5118').setImmediate));
        },
        '24fb': function (t, e, n) {
            'use strict';
            t.exports = function (t) {
                var e = [];
                return e.toString = function () {
                    return this.map(function (e) {
                        var n = function (t, e) {
                            var n = t[1] || '', i = t[3];
                            if (!i)
                                return n;
                            if (e && 'function' == typeof btoa) {
                                var s = (a = i, o = btoa(unescape(encodeURIComponent(JSON.stringify(a)))), c = 'sourceMappingURL=data:application/json;charset=utf-8;base64,'.concat(o), '/*# '.concat(c, ' */')), r = i.sources.map(function (t) {
                                        return '/*# sourceURL='.concat(i.sourceRoot || '').concat(t, ' */');
                                    });
                                return [n].concat(r).concat([s]).join('\n');
                            }
                            var a, o, c;
                            return [n].join('\n');
                        }(e, t);
                        return e[2] ? '@media '.concat(e[2], ' {').concat(n, '}') : n;
                    }).join('');
                }, e.i = function (t, n, i) {
                    'string' == typeof t && (t = [[
                            null,
                            t,
                            ''
                        ]]);
                    var s = {};
                    if (i)
                        for (var r = 0; r < this.length; r++) {
                            var a = this[r][0];
                            null != a && (s[a] = !0);
                        }
                    for (var o = 0; o < t.length; o++) {
                        var c = [].concat(t[o]);
                        i && s[c[0]] || (n && (c[2] ? c[2] = ''.concat(n, ' and ').concat(c[2]) : c[2] = n), e.push(c));
                    }
                }, e;
            };
        },
        '266a': function (t, e, n) {
            var i = n('2dba'), s = n('5ffd');
            'string' == typeof (s = s.__esModule ? s.default : s) && (s = [[
                    t.i,
                    s,
                    ''
                ]]);
            var r = {
                insert: 'head',
                singleton: !1
            };
            i(s, r);
            t.exports = s.locals || {};
        },
        '2dba': function (t, e, n) {
            'use strict';
            var i, s = function () {
                    return void 0 === i && (i = Boolean(window && document && document.all && !window.atob)), i;
                }, r = function () {
                    var t = {};
                    return function (e) {
                        if (void 0 === t[e]) {
                            var n = document.querySelector(e);
                            if (window.HTMLIFrameElement && n instanceof window.HTMLIFrameElement)
                                try {
                                    n = n.contentDocument.head;
                                } catch (i) {
                                    n = null;
                                }
                            t[e] = n;
                        }
                        return t[e];
                    };
                }(), a = [];
            function o(t) {
                for (var e = -1, n = 0; n < a.length; n++)
                    if (a[n].identifier === t) {
                        e = n;
                        break;
                    }
                return e;
            }
            function c(t, e) {
                for (var n = {}, i = [], s = 0; s < t.length; s++) {
                    var r = t[s], c = e.base ? r[0] + e.base : r[0], p = n[c] || 0, h = ''.concat(c, ' ').concat(p);
                    n[c] = p + 1;
                    var l = o(h), u = {
                            css: r[1],
                            media: r[2],
                            sourceMap: r[3]
                        };
                    -1 !== l ? (a[l].references++, a[l].updater(u)) : a.push({
                        identifier: h,
                        updater: y(u, e),
                        references: 1
                    }), i.push(h);
                }
                return i;
            }
            function p(t) {
                var e = document.createElement('style'), i = t.attributes || {};
                if (void 0 === i.nonce) {
                    var s = n.nc;
                    s && (i.nonce = s);
                }
                if (Object.keys(i).forEach(function (t) {
                        e.setAttribute(t, i[t]);
                    }), 'function' == typeof t.insert)
                    t.insert(e);
                else {
                    var a = r(t.insert || 'head');
                    if (!a)
                        throw new Error('Couldn\'t find a style target. This probably means that the value for the \'insert\' parameter is invalid.');
                    a.appendChild(e);
                }
                return e;
            }
            var h, l = (h = [], function (t, e) {
                    return h[t] = e, h.filter(Boolean).join('\n');
                });
            function u(t, e, n, i) {
                var s = n ? '' : i.media ? '@media '.concat(i.media, ' {').concat(i.css, '}') : i.css;
                if (t.styleSheet)
                    t.styleSheet.cssText = l(e, s);
                else {
                    var r = document.createTextNode(s), a = t.childNodes;
                    a[e] && t.removeChild(a[e]), a.length ? t.insertBefore(r, a[e]) : t.appendChild(r);
                }
            }
            function d(t, e, n) {
                var i = n.css, s = n.media, r = n.sourceMap;
                if (s ? t.setAttribute('media', s) : t.removeAttribute('media'), r && 'undefined' != typeof btoa && (i += '\n/*# sourceMappingURL=data:application/json;base64,'.concat(btoa(unescape(encodeURIComponent(JSON.stringify(r)))), ' */')), t.styleSheet)
                    t.styleSheet.cssText = i;
                else {
                    for (; t.firstChild;)
                        t.removeChild(t.firstChild);
                    t.appendChild(document.createTextNode(i));
                }
            }
            var f = null, A = 0;
            function y(t, e) {
                var n, i, s;
                if (e.singleton) {
                    var r = A++;
                    n = f || (f = p(e)), i = u.bind(null, n, r, !1), s = u.bind(null, n, r, !0);
                } else
                    n = p(e), i = d.bind(null, n, e), s = function () {
                        !function (t) {
                            if (null === t.parentNode)
                                return !1;
                            t.parentNode.removeChild(t);
                        }(n);
                    };
                return i(t), function (e) {
                    if (e) {
                        if (e.css === t.css && e.media === t.media && e.sourceMap === t.sourceMap)
                            return;
                        i(t = e);
                    } else
                        s();
                };
            }
            t.exports = function (t, e) {
                (e = e || {}).singleton || 'boolean' == typeof e.singleton || (e.singleton = s());
                var n = c(t = t || [], e);
                return function (t) {
                    if (t = t || [], '[object Array]' === Object.prototype.toString.call(t)) {
                        for (var i = 0; i < n.length; i++) {
                            var s = o(n[i]);
                            a[s].references--;
                        }
                        for (var r = c(t, e), p = 0; p < n.length; p++) {
                            var h = o(n[p]);
                            0 === a[h].references && (a[h].updater(), a.splice(h, 1));
                        }
                        n = r;
                    }
                };
            };
        },
        '4c9a': function (t, e, n) {
            var i = n('2377').defineComponent;
            function s(t, e) {
                for (var n = {}, i = {}, s = 0; s < e.length; s++)
                    e[s].exportAs ? n['$' + e[s].exportAs] = e[s].style : r(i, e[s].style);
                n.$style = i;
                var a = t.initData;
                t.initData = a ? function () {
                    return r({}, a.call(this), n);
                } : function () {
                    return n;
                };
            }
            function r(t) {
                'use strict';
                if (null == t)
                    throw new TypeError('Cannot convert undefined or null to object');
                for (var e = Object(t), n = 1; n < arguments.length; n++) {
                    var i = arguments[n];
                    if (null != i)
                        for (var s in i)
                            Object.prototype.hasOwnProperty.call(i, s) && (e[s] = i[s]);
                }
                return e;
            }
            t.exports = function (t, e, n) {
                for (var r = function (t) {
                            var e = [t];
                            'function' == typeof t && (e.push(t.prototype), t.prototype.constructor && e.push(t.prototype.constructor.prototype));
                            return e;
                        }(t), a = 0; a < r.length; a++)
                    e && ('string' == typeof e ? r[a].template = e : e instanceof Array ? r[a].aPack = e : r[a].aNode = e), n.length && s(r[a], n);
                return 'object' == typeof t ? i(t) : t;
            };
        },
        5118: function (t, e, n) {
            (function (t) {
                var i = void 0 !== t && t || 'undefined' != typeof self && self || window, s = Function.prototype.apply;
                function r(t, e) {
                    this._id = t, this._clearFn = e;
                }
                e.setTimeout = function () {
                    return new r(s.call(setTimeout, i, arguments), clearTimeout);
                }, e.setInterval = function () {
                    return new r(s.call(setInterval, i, arguments), clearInterval);
                }, e.clearTimeout = e.clearInterval = function (t) {
                    t && t.close();
                }, r.prototype.unref = r.prototype.ref = function () {
                }, r.prototype.close = function () {
                    this._clearFn.call(i, this._id);
                }, e.enroll = function (t, e) {
                    clearTimeout(t._idleTimeoutId), t._idleTimeout = e;
                }, e.unenroll = function (t) {
                    clearTimeout(t._idleTimeoutId), t._idleTimeout = -1;
                }, e._unrefActive = e.active = function (t) {
                    clearTimeout(t._idleTimeoutId);
                    var e = t._idleTimeout;
                    e >= 0 && (t._idleTimeoutId = setTimeout(function () {
                        t._onTimeout && t._onTimeout();
                    }, e));
                }, n('6017'), e.setImmediate = 'undefined' != typeof self && self.setImmediate || void 0 !== t && t.setImmediate || this && this.setImmediate, e.clearImmediate = 'undefined' != typeof self && self.clearImmediate || void 0 !== t && t.clearImmediate || this && this.clearImmediate;
            }.call(this, n('c8ba')));
        },
        '5ffd': function (t, e, n) {
            (e = n('24fb')(!0)).push([
                t.i,
                '.entry-status-box_2HTVK {\n  width: 100%;\n  height: 100%;\n  background-image: -webkit-gradient(linear, left top, right bottom, from(#DDEBFE), to(#F2F2FE));\n  background-image: -webkit-linear-gradient(top left, #DDEBFE, #F2F2FE);\n  background-image: linear-gradient(to bottom right, #DDEBFE, #F2F2FE);\n}\n.entry-status-box_2HTVK .entry-unsuppot-mask_h72Ls {\n  background: rgba(30, 31, 36, 0.3);\n  width: 100%;\n  height: 100%;\n}\n.entry-status-box_2HTVK .entry-unsuppot-dialog_1oS3t {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  font-size: 16px;\n  line-height: 28px;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%);\n  background: #fff;\n  border-radius: 20px;\n  padding: 42px 68px;\n  text-align: center;\n  width: 208px;\n}\n.entry-status-box_2HTVK .entry-status-container_15bkc {\n  width: 100%;\n  height: 100%;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: column;\n          flex-direction: column;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n          justify-content: center;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n          align-items: center;\n}\n.entry-status-box_2HTVK .entry-status-container_15bkc .entry-status-error-icon_Fn6a1 {\n  background: url(https://mms-voice.cdn.bcebos.com/chatgpt/chat-search/second/pc/pc_error.png) center center no-repeat;\n  -webkit-background-size: 100% 100%;\n          background-size: 100% 100%;\n  width: 50px;\n  height: 50px;\n}\n.entry-status-box_2HTVK .entry-status-container_15bkc .entry-status-static-icon_3n2pX {\n  width: 58px;\n  height: 58px;\n  background: url(https://gips1.baidu.com/it/u=3286278764,3415422308&fm=3028&app=3028&f=PNG&fmt=auto&q=75&size=f58_58);\n  -webkit-background-size: 100% 100%;\n          background-size: 100% 100%;\n}\n.entry-status-box_2HTVK .entry-status-container_15bkc .entry-status-loading-icon_2JwXU {\n  width: 58px;\n  height: 58px;\n  background: url(https://gips2.baidu.com/it/u=4016561039,406999188&fm=3028&app=3028&f=PNG&fmt=auto&q=75&size=f580_174);\n  -webkit-animation: iconAnimation_pRBNC 2s steps(1) infinite;\n          animation: iconAnimation_pRBNC 2s steps(1) infinite;\n  position: absolute;\n  margin-bottom: 24px;\n}\n.entry-status-box_2HTVK .entry-status-container_15bkc .entry-status-error-text_2rukx {\n  font-family: PingFangSC-Regular;\n  font-size: 16px;\n  color: #1E1F24;\n  letter-spacing: 0;\n  text-align: center;\n  line-height: 1;\n  margin: 18px 0;\n}\n.entry-status-box_2HTVK .entry-status-container_15bkc .entry-status-loading-text_2l42O {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n          align-items: center;\n  font-family: PingFangSC-Regular;\n  font-size: 14px;\n  line-height: 16px;\n  margin-top: 8px;\n  color: #1E1F24;\n  text-align: center;\n}\n.entry-status-box_2HTVK .entry-status-container_15bkc .entry-status-loading-text_2l42O .wait-loading_2O_j2 {\n  margin-left: 2px;\n  width: 12px;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: flex;\n}\n.entry-status-box_2HTVK .entry-status-container_15bkc .entry-status-loading-text_2l42O .wait-loading_2O_j2 span {\n  display: inline-block;\n  background: #1E1F24;\n  height: 2px;\n  width: 2px;\n  border-radius: 50%;\n  vertical-align: middle;\n}\n.entry-status-box_2HTVK .entry-status-container_15bkc .entry-status-loading-text_2l42O .wait-loading_2O_j2 .point1_23N7t {\n  -webkit-animation: loadingPoint1_Ypg03 1.2s ease-in infinite;\n          animation: loadingPoint1_Ypg03 1.2s ease-in infinite;\n}\n.entry-status-box_2HTVK .entry-status-container_15bkc .entry-status-loading-text_2l42O .wait-loading_2O_j2 .point2_3W6wW {\n  margin: 0 3px;\n  -webkit-animation: loadingPoint2_3a-27 1.2s ease-in infinite;\n          animation: loadingPoint2_3a-27 1.2s ease-in infinite;\n}\n.entry-status-box_2HTVK .entry-status-container_15bkc .entry-status-loading-text_2l42O .wait-loading_2O_j2 .point3_x7iA1 {\n  -webkit-animation: loadingPoint3_2mlns 1.2s ease-in infinite;\n          animation: loadingPoint3_2mlns 1.2s ease-in infinite;\n}\n.entry-status-box_2HTVK .entry-status-container_15bkc .entry-status-region_3GWFJ {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n          align-items: center;\n}\n.entry-status-box_2HTVK .entry-status-container_15bkc .entry-status-region_3GWFJ .entry-status-common_DyILf {\n  height: 38px;\n  width: 80px;\n  border-radius: 18px;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n          align-items: center;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n          justify-content: center;\n  cursor: pointer;\n}\n.entry-status-box_2HTVK .entry-status-container_15bkc .entry-status-region_3GWFJ .entry-status-back_1lpFL {\n  background: #F7F7FE;\n  margin-right: 16px;\n}\n.entry-status-box_2HTVK .entry-status-container_15bkc .entry-status-region_3GWFJ .entry-status-back_1lpFL span {\n  font-family: PingFangSC-Semibold;\n  font-size: 14px;\n  color: #1E1F24;\n  letter-spacing: 0;\n  text-align: center;\n  line-height: 14px;\n  font-weight: 600;\n}\n.entry-status-box_2HTVK .entry-status-container_15bkc .entry-status-region_3GWFJ .entry-status-back_1lpFL:hover {\n  background: #EBE9FF;\n}\n.entry-status-box_2HTVK .entry-status-container_15bkc .entry-status-region_3GWFJ .entry-status-back_1lpFL:hover span {\n  color: #5240FF;\n}\n.entry-status-box_2HTVK .entry-status-container_15bkc .entry-status-region_3GWFJ .entry-status-button_PD2Tr {\n  background: #EBE9FF;\n}\n.entry-status-box_2HTVK .entry-status-container_15bkc .entry-status-region_3GWFJ .entry-status-button_PD2Tr span {\n  font-family: PingFangSC-Semibold;\n  font-size: 14px;\n  color: #5240FF;\n  letter-spacing: 0;\n  text-align: center;\n  line-height: 14px;\n  font-weight: 600;\n}\n.entry-status-box_2HTVK .entry-status-container_15bkc .entry-status-region_3GWFJ .entry-status-button_PD2Tr:hover {\n  background: #DCD9FF;\n}\n@-webkit-keyframes iconAnimation_pRBNC {\n  0% {\n    background-position: 0px 0px;\n  }\n  3.4482758620689653% {\n    background-position: -58px 0px;\n  }\n  6.896551724137931% {\n    background-position: -116px 0px;\n  }\n  10.344827586206897% {\n    background-position: -174px 0px;\n  }\n  13.793103448275861% {\n    background-position: -232px 0px;\n  }\n  17.24137931034483% {\n    background-position: -290px 0px;\n  }\n  20.689655172413794% {\n    background-position: -348px 0px;\n  }\n  24.137931034482758% {\n    background-position: -406px 0px;\n  }\n  27.586206896551722% {\n    background-position: -464px 0px;\n  }\n  31.03448275862069% {\n    background-position: -522px 0px;\n  }\n  34.48275862068966% {\n    background-position: 0px -58px;\n  }\n  37.93103448275862% {\n    background-position: -58px -58px;\n  }\n  41.37931034482759% {\n    background-position: -116px -58px;\n  }\n  44.827586206896555% {\n    background-position: -174px -58px;\n  }\n  48.275862068965516% {\n    background-position: -232px -58px;\n  }\n  51.724137931034484% {\n    background-position: -290px -58px;\n  }\n  55.172413793103445% {\n    background-position: -348px -58px;\n  }\n  58.620689655172406% {\n    background-position: -406px -58px;\n  }\n  62.06896551724138% {\n    background-position: -464px -58px;\n  }\n  65.51724137931035% {\n    background-position: -522px -58px;\n  }\n  68.96551724137932% {\n    background-position: 0px -116px;\n  }\n  72.41379310344827% {\n    background-position: -58px -116px;\n  }\n  75.86206896551724% {\n    background-position: -116px -116px;\n  }\n  79.3103448275862% {\n    background-position: -174px -116px;\n  }\n  82.75862068965517% {\n    background-position: -232px -116px;\n  }\n  86.20689655172413% {\n    background-position: -290px -116px;\n  }\n  89.65517241379311% {\n    background-position: -348px -116px;\n  }\n  93.10344827586206% {\n    background-position: -406px -116px;\n  }\n  96.55172413793103% {\n    background-position: -464px -116px;\n  }\n  100% {\n    background-position: -522px -116px;\n  }\n}\n@keyframes iconAnimation_pRBNC {\n  0% {\n    background-position: 0px 0px;\n  }\n  3.4482758620689653% {\n    background-position: -58px 0px;\n  }\n  6.896551724137931% {\n    background-position: -116px 0px;\n  }\n  10.344827586206897% {\n    background-position: -174px 0px;\n  }\n  13.793103448275861% {\n    background-position: -232px 0px;\n  }\n  17.24137931034483% {\n    background-position: -290px 0px;\n  }\n  20.689655172413794% {\n    background-position: -348px 0px;\n  }\n  24.137931034482758% {\n    background-position: -406px 0px;\n  }\n  27.586206896551722% {\n    background-position: -464px 0px;\n  }\n  31.03448275862069% {\n    background-position: -522px 0px;\n  }\n  34.48275862068966% {\n    background-position: 0px -58px;\n  }\n  37.93103448275862% {\n    background-position: -58px -58px;\n  }\n  41.37931034482759% {\n    background-position: -116px -58px;\n  }\n  44.827586206896555% {\n    background-position: -174px -58px;\n  }\n  48.275862068965516% {\n    background-position: -232px -58px;\n  }\n  51.724137931034484% {\n    background-position: -290px -58px;\n  }\n  55.172413793103445% {\n    background-position: -348px -58px;\n  }\n  58.620689655172406% {\n    background-position: -406px -58px;\n  }\n  62.06896551724138% {\n    background-position: -464px -58px;\n  }\n  65.51724137931035% {\n    background-position: -522px -58px;\n  }\n  68.96551724137932% {\n    background-position: 0px -116px;\n  }\n  72.41379310344827% {\n    background-position: -58px -116px;\n  }\n  75.86206896551724% {\n    background-position: -116px -116px;\n  }\n  79.3103448275862% {\n    background-position: -174px -116px;\n  }\n  82.75862068965517% {\n    background-position: -232px -116px;\n  }\n  86.20689655172413% {\n    background-position: -290px -116px;\n  }\n  89.65517241379311% {\n    background-position: -348px -116px;\n  }\n  93.10344827586206% {\n    background-position: -406px -116px;\n  }\n  96.55172413793103% {\n    background-position: -464px -116px;\n  }\n  100% {\n    background-position: -522px -116px;\n  }\n}\n@-webkit-keyframes loadingPoint1_Ypg03 {\n  0% {\n    opacity: 0;\n  }\n  33% {\n    opacity: 1;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n@keyframes loadingPoint1_Ypg03 {\n  0% {\n    opacity: 0;\n  }\n  33% {\n    opacity: 1;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n@-webkit-keyframes loadingPoint2_3a-27 {\n  0%,\n  33% {\n    opacity: 0;\n  }\n  67% {\n    opacity: 1;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n@keyframes loadingPoint2_3a-27 {\n  0%,\n  33% {\n    opacity: 0;\n  }\n  67% {\n    opacity: 1;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n@-webkit-keyframes loadingPoint3_2mlns {\n  0%,\n  67% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n@keyframes loadingPoint3_2mlns {\n  0%,\n  67% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n',
                '',
                {
                    version: 3,
                    sources: [
                        '/home/work/nextBuildSpace/workspace/2f76d732-3fef-4286-b523-c7c0c34531b4/temp/packages/sdk/ai-search-async-entry/src/EntryStatusPage.san?lang=less&module=&san=&type=style&index=0',
                        'EntryStatusPage.san'
                    ],
                    names: [],
                    mappings: 'AACA;EACI,WAAA;EACA,YAAA;EACA,8FAAA;EAAA,qEAAA;EAAA,oEAAA;ACEJ;ADLA;EAKQ,iCAAA;EACA,WAAA;EACA,YAAA;ACGR;ADVA;EAUQ,kBAAA;EACA,QAAA;EACA,SAAA;EACA,eAAA;EACA,iBAAA;EACA,wCAAA;UAAA,gCAAA;EACA,gBAAA;EACA,mBAAA;EACA,kBAAA;EACA,kBAAA;EACA,YAAA;ACIR;ADxBA;EAuBQ,WAAA;EACA,YAAA;EACA,oBAAA;EAAA,qBAAA;EAAA,aAAA;EACA,4BAAA;EAAA,6BAAA;EAAA,8BAAA;UAAA,sBAAA;EACA,wBAAA;EAAA,+BAAA;UAAA,uBAAA;EACA,yBAAA;EAAA,2BAAA;UAAA,mBAAA;ACaR;ADzCA;EA8BY,oHAAA;EACA,kCAAA;UAAA,0BAAA;EACA,WAAA;EACA,YAAA;ACeZ;ADhDA;EAoCY,WAAA;EACA,YAAA;EACA,oHAAA;EACA,kCAAA;UAAA,0BAAA;ACgBZ;ADvDA;EA0CY,WAAA;EACA,YAAA;EACA,qHAAA;EACA,2DAAA;UAAA,mDAAA;EACA,kBAAA;EACA,mBAAA;ACiBZ;ADhEA;EAkDY,+BAAA;EACA,eAAA;EACA,cAAA;EACA,iBAAA;EACA,kBAAA;EACA,cAAA;EACA,cAAA;ACiBZ;ADzEA;EA2DY,oBAAA;EAAA,qBAAA;EAAA,aAAA;EACA,yBAAA;EAAA,2BAAA;UAAA,mBAAA;EACA,+BAAA;EACA,eAAA;EACA,iBAAA;EACA,eAAA;EACA,cAAA;EACA,kBAAA;ACqBZ;ADvFA;EAoEgB,gBAAA;EACA,WAAA;EACA,oBAAA;EAAA,qBAAA;EAAA,aAAA;ACwBhB;AD9FA;EAwEoB,qBAAA;EACA,mBAAA;EACA,WAAA;EACA,UAAA;EACA,kBAAA;EACA,sBAAA;ACyBpB;ADtGA;EAgFoB,4DAAA;UAAA,oDAAA;AC0BpB;AD1GA;EAmFoB,aAAA;EACA,4DAAA;UAAA,oDAAA;AC2BpB;AD/GA;EAuFoB,4DAAA;UAAA,oDAAA;AC4BpB;ADnHA;EA4FY,oBAAA;EAAA,qBAAA;EAAA,aAAA;EACA,yBAAA;EAAA,2BAAA;UAAA,mBAAA;AC8BZ;AD3HA;EA+FgB,YAAA;EACA,WAAA;EACA,mBAAA;EACA,oBAAA;EAAA,qBAAA;EAAA,aAAA;EACA,yBAAA;EAAA,2BAAA;UAAA,mBAAA;EACA,wBAAA;EAAA,+BAAA;UAAA,uBAAA;EACA,eAAA;ACqChB;AD1IA;EAwGgB,mBAAA;EACA,kBAAA;ACqChB;AD9IA;EA2GoB,gCAAA;EACA,eAAA;EACA,cAAA;EACA,iBAAA;EACA,kBAAA;EACA,iBAAA;EACA,gBAAA;ACsCpB;ADpCgB;EACI,mBAAA;ACsCpB;ADvCgB;EAGQ,cAAA;ACuCxB;AD7JA;EA2HgB,mBAAA;ACqChB;ADhKA;EA6HoB,gCAAA;EACA,eAAA;EACA,cAAA;EACA,iBAAA;EACA,kBAAA;EACA,iBAAA;EACA,gBAAA;ACsCpB;ADpCgB;EACI,mBAAA;ACsCpB;AD1BI;EAlJJ;IA8IY,4BAAA;ECkCV;EDhLF;IA8IY,8BAAA;ECqCV;EDnLF;IA8IY,+BAAA;ECwCV;EDtLF;IA8IY,+BAAA;EC2CV;EDzLF;IA8IY,+BAAA;EC8CV;ED5LF;IA8IY,+BAAA;ECiDV;ED/LF;IA8IY,+BAAA;ECoDV;EDlMF;IA8IY,+BAAA;ECuDV;EDrMF;IA8IY,+BAAA;EC0DV;EDxMF;IA8IY,+BAAA;EC6DV;ED3MF;IA8IY,8BAAA;ECgEV;ED9MF;IA8IY,gCAAA;ECmEV;EDjNF;IA8IY,iCAAA;ECsEV;EDpNF;IA8IY,iCAAA;ECyEV;EDvNF;IA8IY,iCAAA;EC4EV;ED1NF;IA8IY,iCAAA;EC+EV;ED7NF;IA8IY,iCAAA;ECkFV;EDhOF;IA8IY,iCAAA;ECqFV;EDnOF;IA8IY,iCAAA;ECwFV;EDtOF;IA8IY,iCAAA;EC2FV;EDzOF;IA8IY,+BAAA;EC8FV;ED5OF;IA8IY,iCAAA;ECiGV;ED/OF;IA8IY,kCAAA;ECoGV;EDlPF;IA8IY,kCAAA;ECuGV;EDrPF;IA8IY,kCAAA;EC0GV;EDxPF;IA8IY,kCAAA;EC6GV;ED3PF;IA8IY,kCAAA;ECgHV;ED9PF;IA8IY,kCAAA;ECmHV;EDjQF;IA8IY,kCAAA;ECsHV;EDpQF;IA8IY,kCAAA;ECyHV;AACF;ADtHI;EAlJJ;IA8IY,4BAAA;EC8HV;ED5QF;IA8IY,8BAAA;ECiIV;ED/QF;IA8IY,+BAAA;ECoIV;EDlRF;IA8IY,+BAAA;ECuIV;EDrRF;IA8IY,+BAAA;EC0IV;EDxRF;IA8IY,+BAAA;EC6IV;ED3RF;IA8IY,+BAAA;ECgJV;ED9RF;IA8IY,+BAAA;ECmJV;EDjSF;IA8IY,+BAAA;ECsJV;EDpSF;IA8IY,+BAAA;ECyJV;EDvSF;IA8IY,8BAAA;EC4JV;ED1SF;IA8IY,gCAAA;EC+JV;ED7SF;IA8IY,iCAAA;ECkKV;EDhTF;IA8IY,iCAAA;ECqKV;EDnTF;IA8IY,iCAAA;ECwKV;EDtTF;IA8IY,iCAAA;EC2KV;EDzTF;IA8IY,iCAAA;EC8KV;ED5TF;IA8IY,iCAAA;ECiLV;ED/TF;IA8IY,iCAAA;ECoLV;EDlUF;IA8IY,iCAAA;ECuLV;EDrUF;IA8IY,+BAAA;EC0LV;EDxUF;IA8IY,iCAAA;EC6LV;ED3UF;IA8IY,kCAAA;ECgMV;ED9UF;IA8IY,kCAAA;ECmMV;EDjVF;IA8IY,kCAAA;ECsMV;EDpVF;IA8IY,kCAAA;ECyMV;EDvVF;IA8IY,kCAAA;EC4MV;ED1VF;IA8IY,kCAAA;EC+MV;ED7VF;IA8IY,kCAAA;ECkNV;EDhWF;IA8IY,kCAAA;ECqNV;AACF;AD/MI;EACI;IACI,UAAA;ECiNV;ED/MM;IACI,UAAA;ECiNV;ED/MM;IACI,UAAA;ECiNV;AACF;AD1NI;EACI;IACI,UAAA;EC4NV;ED1NM;IACI,UAAA;EC4NV;ED1NM;IACI,UAAA;EC4NV;AACF;AD1NI;EACI;;IACI,UAAA;EC6NV;ED3NM;IACI,UAAA;EC6NV;ED3NM;IACI,UAAA;EC6NV;AACF;ADtOI;EACI;;IACI,UAAA;ECyOV;EDvOM;IACI,UAAA;ECyOV;EDvOM;IACI,UAAA;ECyOV;AACF;ADvOI;EACI;;IACI,UAAA;EC0OV;EDxOM;IACI,UAAA;EC0OV;AACF;ADhPI;EACI;;IACI,UAAA;ECmPV;EDjPM;IACI,UAAA;ECmPV;AACF',
                    file: 'EntryStatusPage.san',
                    sourcesContent: [
                        '\n.entry-status-box {\n    width: 100%;\n    height: 100%;\n    background-image: linear-gradient(to bottom right, #DDEBFE, #F2F2FE);\n    .entry-unsuppot-mask {\n        background: rgba(30, 31, 36, .3);\n        width: 100%;\n        height: 100%;\n    }\n    .entry-unsuppot-dialog {\n        position: absolute;\n        top: 50%;\n        left: 50%;\n        font-size: 16px;\n        line-height: 28px;\n        transform: translate(-50%, -50%);\n        background: #fff;\n        border-radius: 20px;\n        padding: 42px 68px;\n        text-align: center;\n        width: 208px;\n    }\n    .entry-status-container {\n        width: 100%;\n        height: 100%;\n        display: flex;\n        flex-direction: column;\n        justify-content: center;\n        align-items: center;\n        .entry-status-error-icon {\n            background: url(https://mms-voice.cdn.bcebos.com/chatgpt/chat-search/second/pc/pc_error.png) center center no-repeat;\n            background-size: 100% 100%;\n            width: 50px;\n            height: 50px;\n        }\n        .entry-status-static-icon {\n            width: 58px;\n            height: 58px;\n            background: url(https://gips1.baidu.com/it/u=3286278764,3415422308&fm=3028&app=3028&f=PNG&fmt=auto&q=75&size=f58_58);\n            background-size: 100% 100%;\n        }\n        .entry-status-loading-icon {\n            width: 58px;\n            height: 58px;\n            background: url(https://gips2.baidu.com/it/u=4016561039,406999188&fm=3028&app=3028&f=PNG&fmt=auto&q=75&size=f580_174);\n            animation: iconAnimation 2.0s steps(1) infinite;\n            position: absolute;\n            margin-bottom: 24px;\n        }\n        .entry-status-error-text {\n            font-family: PingFangSC-Regular;\n            font-size: 16px;\n            color: #1E1F24;\n            letter-spacing: 0;\n            text-align: center;\n            line-height: 1;\n            margin: 18px 0;\n        }\n        .entry-status-loading-text {\n            display: flex;\n            align-items: center;\n            font-family: PingFangSC-Regular;\n            font-size: 14px;\n            line-height: 16px;\n            margin-top: 8px;\n            color: #1E1F24;\n            text-align: center;\n            .wait-loading {\n                margin-left: 2px;\n                width: 12px;\n                display: flex;\n                span {\n                    display: inline-block;\n                    background: #1E1F24;\n                    height: 2px;\n                    width: 2px;\n                    border-radius: 50%;\n                    vertical-align: middle;\n                }\n                .point1 {\n                    animation: loadingPoint1 1.2s ease-in infinite;\n                }\n                .point2 {\n                    margin: 0 3px;\n                    animation: loadingPoint2 1.2s ease-in infinite;\n                }\n                .point3 {\n                    animation: loadingPoint3 1.2s ease-in infinite;\n                }\n            }\n        }\n        .entry-status-region {\n            display: flex;\n            align-items: center;\n            .entry-status-common {\n                height: 38px;\n                width: 80px;\n                border-radius: 18px;\n                display: flex;\n                align-items: center;\n                justify-content: center;\n                cursor: pointer;\n            }\n            .entry-status-back {\n                background: #F7F7FE;\n                margin-right: 16px;\n                span {\n                    font-family: PingFangSC-Semibold;\n                    font-size: 14px;\n                    color: #1E1F24;\n                    letter-spacing: 0;\n                    text-align: center;\n                    line-height: 14px;\n                    font-weight: 600;\n                }\n                &:hover {\n                    background: #EBE9FF;\n                    span {\n                        color: #5240FF;\n                    }\n                }\n            }\n            .entry-status-button {\n                background: #EBE9FF;\n                span {\n                    font-family: PingFangSC-Semibold;\n                    font-size: 14px;\n                    color: #5240FF;\n                    letter-spacing: 0;\n                    text-align: center;\n                    line-height: 14px;\n                    font-weight: 600;\n                }\n                &:hover {\n                    background: #DCD9FF;\n                }\n            }\n        }\n    }\n    .loop (@n, @index: 0) when (@index <= @n) {\n        @keyframeSel: percentage(@index / @n);\n        @{keyframeSel} {\n            background-position: -(mod(@index, 10) * 58px) -(floor(@index / 10) * 58px);\n        }\n        .loop(@n, (@index + 1));\n    }\n    @keyframes iconAnimation {\n        .loop(29);\n    }\n    @keyframes loadingPoint1 {\n        0% {\n            opacity: 0;\n        }\n        33% {\n            opacity: 1;\n        }\n        100% {\n            opacity: 1;\n        }\n    }\n    @keyframes loadingPoint2 {\n        0%, 33% {\n            opacity: 0;\n        }\n        67% {\n            opacity: 1;\n        }\n        100% {\n            opacity: 1;\n        }\n    }\n    @keyframes loadingPoint3 {\n        0%, 67% {\n            opacity: 0;\n        }\n        100% {\n            opacity: 1;\n        }\n    }\n}\n',
                        '.entry-status-box {\n  width: 100%;\n  height: 100%;\n  background-image: -webkit-gradient(linear, left top, right bottom, from(#DDEBFE), to(#F2F2FE));\n  background-image: -webkit-linear-gradient(top left, #DDEBFE, #F2F2FE);\n  background-image: linear-gradient(to bottom right, #DDEBFE, #F2F2FE);\n}\n.entry-status-box .entry-unsuppot-mask {\n  background: rgba(30, 31, 36, 0.3);\n  width: 100%;\n  height: 100%;\n}\n.entry-status-box .entry-unsuppot-dialog {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  font-size: 16px;\n  line-height: 28px;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%);\n  background: #fff;\n  border-radius: 20px;\n  padding: 42px 68px;\n  text-align: center;\n  width: 208px;\n}\n.entry-status-box .entry-status-container {\n  width: 100%;\n  height: 100%;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: column;\n          flex-direction: column;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n          justify-content: center;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n          align-items: center;\n}\n.entry-status-box .entry-status-container .entry-status-error-icon {\n  background: url(https://mms-voice.cdn.bcebos.com/chatgpt/chat-search/second/pc/pc_error.png) center center no-repeat;\n  -webkit-background-size: 100% 100%;\n          background-size: 100% 100%;\n  width: 50px;\n  height: 50px;\n}\n.entry-status-box .entry-status-container .entry-status-static-icon {\n  width: 58px;\n  height: 58px;\n  background: url(https://gips1.baidu.com/it/u=3286278764,3415422308&fm=3028&app=3028&f=PNG&fmt=auto&q=75&size=f58_58);\n  -webkit-background-size: 100% 100%;\n          background-size: 100% 100%;\n}\n.entry-status-box .entry-status-container .entry-status-loading-icon {\n  width: 58px;\n  height: 58px;\n  background: url(https://gips2.baidu.com/it/u=4016561039,406999188&fm=3028&app=3028&f=PNG&fmt=auto&q=75&size=f580_174);\n  -webkit-animation: iconAnimation 2s steps(1) infinite;\n          animation: iconAnimation 2s steps(1) infinite;\n  position: absolute;\n  margin-bottom: 24px;\n}\n.entry-status-box .entry-status-container .entry-status-error-text {\n  font-family: PingFangSC-Regular;\n  font-size: 16px;\n  color: #1E1F24;\n  letter-spacing: 0;\n  text-align: center;\n  line-height: 1;\n  margin: 18px 0;\n}\n.entry-status-box .entry-status-container .entry-status-loading-text {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n          align-items: center;\n  font-family: PingFangSC-Regular;\n  font-size: 14px;\n  line-height: 16px;\n  margin-top: 8px;\n  color: #1E1F24;\n  text-align: center;\n}\n.entry-status-box .entry-status-container .entry-status-loading-text .wait-loading {\n  margin-left: 2px;\n  width: 12px;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: flex;\n}\n.entry-status-box .entry-status-container .entry-status-loading-text .wait-loading span {\n  display: inline-block;\n  background: #1E1F24;\n  height: 2px;\n  width: 2px;\n  border-radius: 50%;\n  vertical-align: middle;\n}\n.entry-status-box .entry-status-container .entry-status-loading-text .wait-loading .point1 {\n  -webkit-animation: loadingPoint1 1.2s ease-in infinite;\n          animation: loadingPoint1 1.2s ease-in infinite;\n}\n.entry-status-box .entry-status-container .entry-status-loading-text .wait-loading .point2 {\n  margin: 0 3px;\n  -webkit-animation: loadingPoint2 1.2s ease-in infinite;\n          animation: loadingPoint2 1.2s ease-in infinite;\n}\n.entry-status-box .entry-status-container .entry-status-loading-text .wait-loading .point3 {\n  -webkit-animation: loadingPoint3 1.2s ease-in infinite;\n          animation: loadingPoint3 1.2s ease-in infinite;\n}\n.entry-status-box .entry-status-container .entry-status-region {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n          align-items: center;\n}\n.entry-status-box .entry-status-container .entry-status-region .entry-status-common {\n  height: 38px;\n  width: 80px;\n  border-radius: 18px;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n          align-items: center;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n          justify-content: center;\n  cursor: pointer;\n}\n.entry-status-box .entry-status-container .entry-status-region .entry-status-back {\n  background: #F7F7FE;\n  margin-right: 16px;\n}\n.entry-status-box .entry-status-container .entry-status-region .entry-status-back span {\n  font-family: PingFangSC-Semibold;\n  font-size: 14px;\n  color: #1E1F24;\n  letter-spacing: 0;\n  text-align: center;\n  line-height: 14px;\n  font-weight: 600;\n}\n.entry-status-box .entry-status-container .entry-status-region .entry-status-back:hover {\n  background: #EBE9FF;\n}\n.entry-status-box .entry-status-container .entry-status-region .entry-status-back:hover span {\n  color: #5240FF;\n}\n.entry-status-box .entry-status-container .entry-status-region .entry-status-button {\n  background: #EBE9FF;\n}\n.entry-status-box .entry-status-container .entry-status-region .entry-status-button span {\n  font-family: PingFangSC-Semibold;\n  font-size: 14px;\n  color: #5240FF;\n  letter-spacing: 0;\n  text-align: center;\n  line-height: 14px;\n  font-weight: 600;\n}\n.entry-status-box .entry-status-container .entry-status-region .entry-status-button:hover {\n  background: #DCD9FF;\n}\n@-webkit-keyframes iconAnimation {\n  0% {\n    background-position: 0px 0px;\n  }\n  3.4482758620689653% {\n    background-position: -58px 0px;\n  }\n  6.896551724137931% {\n    background-position: -116px 0px;\n  }\n  10.344827586206897% {\n    background-position: -174px 0px;\n  }\n  13.793103448275861% {\n    background-position: -232px 0px;\n  }\n  17.24137931034483% {\n    background-position: -290px 0px;\n  }\n  20.689655172413794% {\n    background-position: -348px 0px;\n  }\n  24.137931034482758% {\n    background-position: -406px 0px;\n  }\n  27.586206896551722% {\n    background-position: -464px 0px;\n  }\n  31.03448275862069% {\n    background-position: -522px 0px;\n  }\n  34.48275862068966% {\n    background-position: 0px -58px;\n  }\n  37.93103448275862% {\n    background-position: -58px -58px;\n  }\n  41.37931034482759% {\n    background-position: -116px -58px;\n  }\n  44.827586206896555% {\n    background-position: -174px -58px;\n  }\n  48.275862068965516% {\n    background-position: -232px -58px;\n  }\n  51.724137931034484% {\n    background-position: -290px -58px;\n  }\n  55.172413793103445% {\n    background-position: -348px -58px;\n  }\n  58.620689655172406% {\n    background-position: -406px -58px;\n  }\n  62.06896551724138% {\n    background-position: -464px -58px;\n  }\n  65.51724137931035% {\n    background-position: -522px -58px;\n  }\n  68.96551724137932% {\n    background-position: 0px -116px;\n  }\n  72.41379310344827% {\n    background-position: -58px -116px;\n  }\n  75.86206896551724% {\n    background-position: -116px -116px;\n  }\n  79.3103448275862% {\n    background-position: -174px -116px;\n  }\n  82.75862068965517% {\n    background-position: -232px -116px;\n  }\n  86.20689655172413% {\n    background-position: -290px -116px;\n  }\n  89.65517241379311% {\n    background-position: -348px -116px;\n  }\n  93.10344827586206% {\n    background-position: -406px -116px;\n  }\n  96.55172413793103% {\n    background-position: -464px -116px;\n  }\n  100% {\n    background-position: -522px -116px;\n  }\n}\n@keyframes iconAnimation {\n  0% {\n    background-position: 0px 0px;\n  }\n  3.4482758620689653% {\n    background-position: -58px 0px;\n  }\n  6.896551724137931% {\n    background-position: -116px 0px;\n  }\n  10.344827586206897% {\n    background-position: -174px 0px;\n  }\n  13.793103448275861% {\n    background-position: -232px 0px;\n  }\n  17.24137931034483% {\n    background-position: -290px 0px;\n  }\n  20.689655172413794% {\n    background-position: -348px 0px;\n  }\n  24.137931034482758% {\n    background-position: -406px 0px;\n  }\n  27.586206896551722% {\n    background-position: -464px 0px;\n  }\n  31.03448275862069% {\n    background-position: -522px 0px;\n  }\n  34.48275862068966% {\n    background-position: 0px -58px;\n  }\n  37.93103448275862% {\n    background-position: -58px -58px;\n  }\n  41.37931034482759% {\n    background-position: -116px -58px;\n  }\n  44.827586206896555% {\n    background-position: -174px -58px;\n  }\n  48.275862068965516% {\n    background-position: -232px -58px;\n  }\n  51.724137931034484% {\n    background-position: -290px -58px;\n  }\n  55.172413793103445% {\n    background-position: -348px -58px;\n  }\n  58.620689655172406% {\n    background-position: -406px -58px;\n  }\n  62.06896551724138% {\n    background-position: -464px -58px;\n  }\n  65.51724137931035% {\n    background-position: -522px -58px;\n  }\n  68.96551724137932% {\n    background-position: 0px -116px;\n  }\n  72.41379310344827% {\n    background-position: -58px -116px;\n  }\n  75.86206896551724% {\n    background-position: -116px -116px;\n  }\n  79.3103448275862% {\n    background-position: -174px -116px;\n  }\n  82.75862068965517% {\n    background-position: -232px -116px;\n  }\n  86.20689655172413% {\n    background-position: -290px -116px;\n  }\n  89.65517241379311% {\n    background-position: -348px -116px;\n  }\n  93.10344827586206% {\n    background-position: -406px -116px;\n  }\n  96.55172413793103% {\n    background-position: -464px -116px;\n  }\n  100% {\n    background-position: -522px -116px;\n  }\n}\n@-webkit-keyframes loadingPoint1 {\n  0% {\n    opacity: 0;\n  }\n  33% {\n    opacity: 1;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n@keyframes loadingPoint1 {\n  0% {\n    opacity: 0;\n  }\n  33% {\n    opacity: 1;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n@-webkit-keyframes loadingPoint2 {\n  0%,\n  33% {\n    opacity: 0;\n  }\n  67% {\n    opacity: 1;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n@keyframes loadingPoint2 {\n  0%,\n  33% {\n    opacity: 0;\n  }\n  67% {\n    opacity: 1;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n@-webkit-keyframes loadingPoint3 {\n  0%,\n  67% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n@keyframes loadingPoint3 {\n  0%,\n  67% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n'
                    ]
                }
            ]), e.locals = {
                'entry-status-box': 'entry-status-box_2HTVK',
                entryStatusBox: 'entry-status-box_2HTVK',
                'entry-unsuppot-mask': 'entry-unsuppot-mask_h72Ls',
                entryUnsuppotMask: 'entry-unsuppot-mask_h72Ls',
                'entry-unsuppot-dialog': 'entry-unsuppot-dialog_1oS3t',
                entryUnsuppotDialog: 'entry-unsuppot-dialog_1oS3t',
                'entry-status-container': 'entry-status-container_15bkc',
                entryStatusContainer: 'entry-status-container_15bkc',
                'entry-status-error-icon': 'entry-status-error-icon_Fn6a1',
                entryStatusErrorIcon: 'entry-status-error-icon_Fn6a1',
                'entry-status-static-icon': 'entry-status-static-icon_3n2pX',
                entryStatusStaticIcon: 'entry-status-static-icon_3n2pX',
                'entry-status-loading-icon': 'entry-status-loading-icon_2JwXU',
                entryStatusLoadingIcon: 'entry-status-loading-icon_2JwXU',
                iconAnimation: 'iconAnimation_pRBNC',
                'entry-status-error-text': 'entry-status-error-text_2rukx',
                entryStatusErrorText: 'entry-status-error-text_2rukx',
                'entry-status-loading-text': 'entry-status-loading-text_2l42O',
                entryStatusLoadingText: 'entry-status-loading-text_2l42O',
                'wait-loading': 'wait-loading_2O_j2',
                waitLoading: 'wait-loading_2O_j2',
                point1: 'point1_23N7t',
                loadingPoint1: 'loadingPoint1_Ypg03',
                point2: 'point2_3W6wW',
                loadingPoint2: 'loadingPoint2_3a-27',
                point3: 'point3_x7iA1',
                loadingPoint3: 'loadingPoint3_2mlns',
                'entry-status-region': 'entry-status-region_3GWFJ',
                entryStatusRegion: 'entry-status-region_3GWFJ',
                'entry-status-common': 'entry-status-common_DyILf',
                entryStatusCommon: 'entry-status-common_DyILf',
                'entry-status-back': 'entry-status-back_1lpFL',
                entryStatusBack: 'entry-status-back_1lpFL',
                'entry-status-button': 'entry-status-button_PD2Tr',
                entryStatusButton: 'entry-status-button_PD2Tr'
            }, t.exports = e;
        },
        6017: function (t, e, n) {
            (function (t, e) {
                !function (t, n) {
                    'use strict';
                    if (!t.setImmediate) {
                        var i, s, r, a, o, c = 1, p = {}, h = !1, l = t.document, u = Object.getPrototypeOf && Object.getPrototypeOf(t);
                        u = u && u.setTimeout ? u : t, '[object process]' === {}.toString.call(t.process) ? i = function (t) {
                            e.nextTick(function () {
                                f(t);
                            });
                        } : !function () {
                            if (t.postMessage && !t.importScripts) {
                                var e = !0, n = t.onmessage;
                                return t.onmessage = function () {
                                    e = !1;
                                }, t.postMessage('', '*'), t.onmessage = n, e;
                            }
                        }() ? t.MessageChannel ? ((r = new MessageChannel()).port1.onmessage = function (t) {
                            f(t.data);
                        }, i = function (t) {
                            r.port2.postMessage(t);
                        }) : l && 'onreadystatechange' in l.createElement('script') ? (s = l.documentElement, i = function (t) {
                            var e = l.createElement('script');
                            e.onreadystatechange = function () {
                                f(t), e.onreadystatechange = null, s.removeChild(e), e = null;
                            }, s.appendChild(e);
                        }) : i = function (t) {
                            setTimeout(f, 0, t);
                        } : (a = 'setImmediate$' + Math.random() + '$', o = function (e) {
                            e.source === t && 'string' == typeof e.data && 0 === e.data.indexOf(a) && f(+e.data.slice(a.length));
                        }, t.addEventListener ? t.addEventListener('message', o, !1) : t.attachEvent('onmessage', o), i = function (e) {
                            t.postMessage(a + e, '*');
                        }), u.setImmediate = function (t) {
                            'function' != typeof t && (t = new Function('' + t));
                            for (var e = new Array(arguments.length - 1), n = 0; n < e.length; n++)
                                e[n] = arguments[n + 1];
                            var s = {
                                callback: t,
                                args: e
                            };
                            return p[c] = s, i(c), c++;
                        }, u.clearImmediate = d;
                    }
                    function d(t) {
                        delete p[t];
                    }
                    function f(t) {
                        if (h)
                            setTimeout(f, 0, t);
                        else {
                            var e = p[t];
                            if (e) {
                                h = !0;
                                try {
                                    !function (t) {
                                        var e = t.callback, n = t.args;
                                        switch (n.length) {
                                        case 0:
                                            e();
                                            break;
                                        case 1:
                                            e(n[0]);
                                            break;
                                        case 2:
                                            e(n[0], n[1]);
                                            break;
                                        case 3:
                                            e(n[0], n[1], n[2]);
                                            break;
                                        default:
                                            e.apply(void 0, n);
                                        }
                                    }(e);
                                } finally {
                                    d(t), h = !1;
                                }
                            }
                        }
                    }
                }('undefined' == typeof self ? void 0 === t ? this : t : self);
            }.call(this, n('c8ba'), n('f28c')));
        },
        '607a': function (t, e) {
            t.exports = ' <div class="{{$style[\'entry-status-box\']}}" id="ai-search-async-entry"> <div s-if="type===\'unsupport\'"> <div class="{{$style[\'entry-unsuppot-mask\']}}"></div> <div class="{{$style[\'entry-unsuppot-dialog\']}}"> 当前浏览器版本过低\uFF0C请使用最新版本查看 </div> </div> <div s-else class="{{$style[\'entry-status-container\']}}"> <template s-if="type===\'error\'"> <div class="{{$style[\'entry-status-error-icon\']}}"></div> <span class="{{$style[\'entry-status-error-text\']}}">加载失败\uFF0C请重新加载</span> <div class="{{$style[\'entry-status-region\']}}"> <div class="{{$style[\'entry-status-common\']}} {{$style[\'entry-status-back\']}}" on-click="backClicked($event)"> <span>返回首页</span> </div> <div class="{{$style[\'entry-status-common\']}} {{$style[\'entry-status-button\']}}" on-click="btnClicked($event)"> <span>重新加载</span> </div> </div> </template> <template s-else> <div class="{{$style[\'entry-status-static-icon\']}}"></div> <div class="{{$style[\'entry-status-loading-icon\']}}"></div> <div class="{{$style[\'entry-status-loading-text\']}}"> <div>加载中</div> <div class="{{$style[\'wait-loading\']}}"> <span class="{{$style.point1}}"></span> <span class="{{$style.point2}}"></span> <span class="{{$style.point3}}"></span> </div> </div> </template> </div> </div> ';
        },
        '9ab4': function (t, e, n) {
            'use strict';
            n.r(e), n.d(e, '__extends', function () {
                return s;
            }), n.d(e, '__assign', function () {
                return r;
            }), n.d(e, '__rest', function () {
                return a;
            }), n.d(e, '__decorate', function () {
                return o;
            }), n.d(e, '__param', function () {
                return c;
            }), n.d(e, '__esDecorate', function () {
                return p;
            }), n.d(e, '__runInitializers', function () {
                return h;
            }), n.d(e, '__propKey', function () {
                return l;
            }), n.d(e, '__setFunctionName', function () {
                return u;
            }), n.d(e, '__metadata', function () {
                return d;
            }), n.d(e, '__awaiter', function () {
                return f;
            }), n.d(e, '__generator', function () {
                return A;
            }), n.d(e, '__createBinding', function () {
                return y;
            }), n.d(e, '__exportStar', function () {
                return g;
            }), n.d(e, '__values', function () {
                return v;
            }), n.d(e, '__read', function () {
                return m;
            }), n.d(e, '__spread', function () {
                return x;
            }), n.d(e, '__spreadArrays', function () {
                return b;
            }), n.d(e, '__spreadArray', function () {
                return _;
            }), n.d(e, '__await', function () {
                return C;
            }), n.d(e, '__asyncGenerator', function () {
                return k;
            }), n.d(e, '__asyncDelegator', function () {
                return w;
            }), n.d(e, '__asyncValues', function () {
                return E;
            }), n.d(e, '__makeTemplateObject', function () {
                return N;
            }), n.d(e, '__importStar', function () {
                return D;
            }), n.d(e, '__importDefault', function () {
                return F;
            }), n.d(e, '__classPrivateFieldGet', function () {
                return S;
            }), n.d(e, '__classPrivateFieldSet', function () {
                return T;
            }), n.d(e, '__classPrivateFieldIn', function () {
                return P;
            });
            var i = function (t, e) {
                return (i = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (t, e) {
                    t.__proto__ = e;
                } || function (t, e) {
                    for (var n in e)
                        Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
                })(t, e);
            };
            function s(t, e) {
                if ('function' != typeof e && null !== e)
                    throw new TypeError('Class extends value ' + String(e) + ' is not a constructor or null');
                function n() {
                    this.constructor = t;
                }
                i(t, e), t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n());
            }
            var r = function () {
                return (r = Object.assign || function (t) {
                    for (var e, n = 1, i = arguments.length; n < i; n++)
                        for (var s in e = arguments[n])
                            Object.prototype.hasOwnProperty.call(e, s) && (t[s] = e[s]);
                    return t;
                }).apply(this, arguments);
            };
            function a(t, e) {
                var n = {};
                for (var i in t)
                    Object.prototype.hasOwnProperty.call(t, i) && e.indexOf(i) < 0 && (n[i] = t[i]);
                if (null != t && 'function' == typeof Object.getOwnPropertySymbols) {
                    var s = 0;
                    for (i = Object.getOwnPropertySymbols(t); s < i.length; s++)
                        e.indexOf(i[s]) < 0 && Object.prototype.propertyIsEnumerable.call(t, i[s]) && (n[i[s]] = t[i[s]]);
                }
                return n;
            }
            function o(t, e, n, i) {
                var s, r = arguments.length, a = r < 3 ? e : null === i ? i = Object.getOwnPropertyDescriptor(e, n) : i;
                if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate)
                    a = Reflect.decorate(t, e, n, i);
                else
                    for (var o = t.length - 1; o >= 0; o--)
                        (s = t[o]) && (a = (r < 3 ? s(a) : r > 3 ? s(e, n, a) : s(e, n)) || a);
                return r > 3 && a && Object.defineProperty(e, n, a), a;
            }
            function c(t, e) {
                return function (n, i) {
                    e(n, i, t);
                };
            }
            function p(t, e, n, i, s, r) {
                function a(t) {
                    if (void 0 !== t && 'function' != typeof t)
                        throw new TypeError('Function expected');
                    return t;
                }
                for (var o, c = i.kind, p = 'getter' === c ? 'get' : 'setter' === c ? 'set' : 'value', h = !e && t ? i.static ? t : t.prototype : null, l = e || (h ? Object.getOwnPropertyDescriptor(h, i.name) : {}), u = !1, d = n.length - 1; d >= 0; d--) {
                    var f = {};
                    for (var A in i)
                        f[A] = 'access' === A ? {} : i[A];
                    for (var A in i.access)
                        f.access[A] = i.access[A];
                    f.addInitializer = function (t) {
                        if (u)
                            throw new TypeError('Cannot add initializers after decoration has completed');
                        r.push(a(t || null));
                    };
                    var y = (0, n[d])('accessor' === c ? {
                        get: l.get,
                        set: l.set
                    } : l[p], f);
                    if ('accessor' === c) {
                        if (void 0 === y)
                            continue;
                        if (null === y || 'object' != typeof y)
                            throw new TypeError('Object expected');
                        (o = a(y.get)) && (l.get = o), (o = a(y.set)) && (l.set = o), (o = a(y.init)) && s.push(o);
                    } else
                        (o = a(y)) && ('field' === c ? s.push(o) : l[p] = o);
                }
                h && Object.defineProperty(h, i.name, l), u = !0;
            }
            function h(t, e, n) {
                for (var i = arguments.length > 2, s = 0; s < e.length; s++)
                    n = i ? e[s].call(t, n) : e[s].call(t);
                return i ? n : void 0;
            }
            function l(t) {
                return 'symbol' == typeof t ? t : ''.concat(t);
            }
            function u(t, e, n) {
                return 'symbol' == typeof e && (e = e.description ? '['.concat(e.description, ']') : ''), Object.defineProperty(t, 'name', {
                    configurable: !0,
                    value: n ? ''.concat(n, ' ', e) : e
                });
            }
            function d(t, e) {
                if ('object' == typeof Reflect && 'function' == typeof Reflect.metadata)
                    return Reflect.metadata(t, e);
            }
            function f(t, e, n, i) {
                return new (n || (n = Promise))(function (s, r) {
                    function a(t) {
                        try {
                            c(i.next(t));
                        } catch (e) {
                            r(e);
                        }
                    }
                    function o(t) {
                        try {
                            c(i.throw(t));
                        } catch (e) {
                            r(e);
                        }
                    }
                    function c(t) {
                        var e;
                        t.done ? s(t.value) : (e = t.value, e instanceof n ? e : new n(function (t) {
                            t(e);
                        })).then(a, o);
                    }
                    c((i = i.apply(t, e || [])).next());
                });
            }
            function A(t, e) {
                var n, i, s, r, a = {
                        label: 0,
                        sent: function () {
                            if (1 & s[0])
                                throw s[1];
                            return s[1];
                        },
                        trys: [],
                        ops: []
                    };
                return r = {
                    next: o(0),
                    throw: o(1),
                    return: o(2)
                }, 'function' == typeof Symbol && (r[Symbol.iterator] = function () {
                    return this;
                }), r;
                function o(o) {
                    return function (c) {
                        return function (o) {
                            if (n)
                                throw new TypeError('Generator is already executing.');
                            for (; r && (r = 0, o[0] && (a = 0)), a;)
                                try {
                                    if (n = 1, i && (s = 2 & o[0] ? i.return : o[0] ? i.throw || ((s = i.return) && s.call(i), 0) : i.next) && !(s = s.call(i, o[1])).done)
                                        return s;
                                    switch (i = 0, s && (o = [
                                            2 & o[0],
                                            s.value
                                        ]), o[0]) {
                                    case 0:
                                    case 1:
                                        s = o;
                                        break;
                                    case 4:
                                        return a.label++, {
                                            value: o[1],
                                            done: !1
                                        };
                                    case 5:
                                        a.label++, i = o[1], o = [0];
                                        continue;
                                    case 7:
                                        o = a.ops.pop(), a.trys.pop();
                                        continue;
                                    default:
                                        if (!(s = a.trys, (s = s.length > 0 && s[s.length - 1]) || 6 !== o[0] && 2 !== o[0])) {
                                            a = 0;
                                            continue;
                                        }
                                        if (3 === o[0] && (!s || o[1] > s[0] && o[1] < s[3])) {
                                            a.label = o[1];
                                            break;
                                        }
                                        if (6 === o[0] && a.label < s[1]) {
                                            a.label = s[1], s = o;
                                            break;
                                        }
                                        if (s && a.label < s[2]) {
                                            a.label = s[2], a.ops.push(o);
                                            break;
                                        }
                                        s[2] && a.ops.pop(), a.trys.pop();
                                        continue;
                                    }
                                    o = e.call(t, a);
                                } catch (c) {
                                    o = [
                                        6,
                                        c
                                    ], i = 0;
                                } finally {
                                    n = s = 0;
                                }
                            if (5 & o[0])
                                throw o[1];
                            return {
                                value: o[0] ? o[1] : void 0,
                                done: !0
                            };
                        }([
                            o,
                            c
                        ]);
                    };
                }
            }
            var y = Object.create ? function (t, e, n, i) {
                void 0 === i && (i = n);
                var s = Object.getOwnPropertyDescriptor(e, n);
                s && !('get' in s ? !e.__esModule : s.writable || s.configurable) || (s = {
                    enumerable: !0,
                    get: function () {
                        return e[n];
                    }
                }), Object.defineProperty(t, i, s);
            } : function (t, e, n, i) {
                void 0 === i && (i = n), t[i] = e[n];
            };
            function g(t, e) {
                for (var n in t)
                    'default' === n || Object.prototype.hasOwnProperty.call(e, n) || y(e, t, n);
            }
            function v(t) {
                var e = 'function' == typeof Symbol && Symbol.iterator, n = e && t[e], i = 0;
                if (n)
                    return n.call(t);
                if (t && 'number' == typeof t.length)
                    return {
                        next: function () {
                            return t && i >= t.length && (t = void 0), {
                                value: t && t[i++],
                                done: !t
                            };
                        }
                    };
                throw new TypeError(e ? 'Object is not iterable.' : 'Symbol.iterator is not defined.');
            }
            function m(t, e) {
                var n = 'function' == typeof Symbol && t[Symbol.iterator];
                if (!n)
                    return t;
                var i, s, r = n.call(t), a = [];
                try {
                    for (; (void 0 === e || e-- > 0) && !(i = r.next()).done;)
                        a.push(i.value);
                } catch (o) {
                    s = { error: o };
                } finally {
                    try {
                        i && !i.done && (n = r.return) && n.call(r);
                    } finally {
                        if (s)
                            throw s.error;
                    }
                }
                return a;
            }
            function x() {
                for (var t = [], e = 0; e < arguments.length; e++)
                    t = t.concat(m(arguments[e]));
                return t;
            }
            function b() {
                for (var t = 0, e = 0, n = arguments.length; e < n; e++)
                    t += arguments[e].length;
                var i = Array(t), s = 0;
                for (e = 0; e < n; e++)
                    for (var r = arguments[e], a = 0, o = r.length; a < o; a++, s++)
                        i[s] = r[a];
                return i;
            }
            function _(t, e, n) {
                if (n || 2 === arguments.length)
                    for (var i, s = 0, r = e.length; s < r; s++)
                        !i && s in e || (i || (i = Array.prototype.slice.call(e, 0, s)), i[s] = e[s]);
                return t.concat(i || Array.prototype.slice.call(e));
            }
            function C(t) {
                return this instanceof C ? (this.v = t, this) : new C(t);
            }
            function k(t, e, n) {
                if (!Symbol.asyncIterator)
                    throw new TypeError('Symbol.asyncIterator is not defined.');
                var i, s = n.apply(t, e || []), r = [];
                return i = {}, a('next'), a('throw'), a('return'), i[Symbol.asyncIterator] = function () {
                    return this;
                }, i;
                function a(t) {
                    s[t] && (i[t] = function (e) {
                        return new Promise(function (n, i) {
                            r.push([
                                t,
                                e,
                                n,
                                i
                            ]) > 1 || o(t, e);
                        });
                    });
                }
                function o(t, e) {
                    try {
                        (n = s[t](e)).value instanceof C ? Promise.resolve(n.value.v).then(c, p) : h(r[0][2], n);
                    } catch (i) {
                        h(r[0][3], i);
                    }
                    var n;
                }
                function c(t) {
                    o('next', t);
                }
                function p(t) {
                    o('throw', t);
                }
                function h(t, e) {
                    t(e), r.shift(), r.length && o(r[0][0], r[0][1]);
                }
            }
            function w(t) {
                var e, n;
                return e = {}, i('next'), i('throw', function (t) {
                    throw t;
                }), i('return'), e[Symbol.iterator] = function () {
                    return this;
                }, e;
                function i(i, s) {
                    e[i] = t[i] ? function (e) {
                        return (n = !n) ? {
                            value: C(t[i](e)),
                            done: !1
                        } : s ? s(e) : e;
                    } : s;
                }
            }
            function E(t) {
                if (!Symbol.asyncIterator)
                    throw new TypeError('Symbol.asyncIterator is not defined.');
                var e, n = t[Symbol.asyncIterator];
                return n ? n.call(t) : (t = v(t), e = {}, i('next'), i('throw'), i('return'), e[Symbol.asyncIterator] = function () {
                    return this;
                }, e);
                function i(n) {
                    e[n] = t[n] && function (e) {
                        return new Promise(function (i, s) {
                            (function (t, e, n, i) {
                                Promise.resolve(i).then(function (e) {
                                    t({
                                        value: e,
                                        done: n
                                    });
                                }, e);
                            }(i, s, (e = t[n](e)).done, e.value));
                        });
                    };
                }
            }
            function N(t, e) {
                return Object.defineProperty ? Object.defineProperty(t, 'raw', { value: e }) : t.raw = e, t;
            }
            var I = Object.create ? function (t, e) {
                Object.defineProperty(t, 'default', {
                    enumerable: !0,
                    value: e
                });
            } : function (t, e) {
                t.default = e;
            };
            function D(t) {
                if (t && t.__esModule)
                    return t;
                var e = {};
                if (null != t)
                    for (var n in t)
                        'default' !== n && Object.prototype.hasOwnProperty.call(t, n) && y(e, t, n);
                return I(e, t), e;
            }
            function F(t) {
                return t && t.__esModule ? t : { default: t };
            }
            function S(t, e, n, i) {
                if ('a' === n && !i)
                    throw new TypeError('Private accessor was defined without a getter');
                if ('function' == typeof e ? t !== e || !i : !e.has(t))
                    throw new TypeError('Cannot read private member from an object whose class did not declare it');
                return 'm' === n ? i : 'a' === n ? i.call(t) : i ? i.value : e.get(t);
            }
            function T(t, e, n, i, s) {
                if ('m' === i)
                    throw new TypeError('Private method is not writable');
                if ('a' === i && !s)
                    throw new TypeError('Private accessor was defined without a setter');
                if ('function' == typeof e ? t !== e || !s : !e.has(t))
                    throw new TypeError('Cannot write private member to an object whose class did not declare it');
                return 'a' === i ? s.call(t, n) : s ? s.value = n : e.set(t, n), n;
            }
            function P(t, e) {
                if (null === e || 'object' != typeof e && 'function' != typeof e)
                    throw new TypeError('Cannot use \'in\' operator on non-object');
                return 'function' == typeof t ? e === t : t.has(e);
            }
        },
        a0f1: function (t, e, n) {
            var i = n('4c9a'), s = [{
                        exportAs: void 0,
                        style: n('266a')
                    }], r = n('607a'), a = n('a311').default;
            t.exports = n('a311'), t.exports.default = i(a, r, s);
        },
        a311: function (t, e, n) {
            'use strict';
            Object.defineProperty(e, '__esModule', { value: !0 });
            var i = n('9ab4'), s = function (t) {
                    function e() {
                        return null !== t && t.apply(this, arguments) || this;
                    }
                    return i.__extends(e, t), e.prototype.btnClicked = function (t) {
                        this.fire('reloadBtnClick');
                    }, e.prototype.backClicked = function (t) {
                        this.fire('backBtnClick');
                    }, e.prototype.initData = function () {
                        return { type: 'error' };
                    }, e;
                }(n('2377').Component);
            e.default = s;
        },
        c8ba: function (t, e) {
            var n;
            n = function () {
                return this;
            }();
            try {
                n = n || new Function('return this')();
            } catch (i) {
                'object' == typeof window && (n = window);
            }
            t.exports = n;
        },
        f28c: function (t, e) {
            var n, i, s = t.exports = {};
            function r() {
                throw new Error('setTimeout has not been defined');
            }
            function a() {
                throw new Error('clearTimeout has not been defined');
            }
            function o(t) {
                if (n === setTimeout)
                    return setTimeout(t, 0);
                if ((n === r || !n) && setTimeout)
                    return n = setTimeout, setTimeout(t, 0);
                try {
                    return n(t, 0);
                } catch (e) {
                    try {
                        return n.call(null, t, 0);
                    } catch (e) {
                        return n.call(this, t, 0);
                    }
                }
            }
            !function () {
                try {
                    n = 'function' == typeof setTimeout ? setTimeout : r;
                } catch (t) {
                    n = r;
                }
                try {
                    i = 'function' == typeof clearTimeout ? clearTimeout : a;
                } catch (t) {
                    i = a;
                }
            }();
            var c, p = [], h = !1, l = -1;
            function u() {
                h && c && (h = !1, c.length ? p = c.concat(p) : l = -1, p.length && d());
            }
            function d() {
                if (!h) {
                    var t = o(u);
                    h = !0;
                    for (var e = p.length; e;) {
                        for (c = p, p = []; ++l < e;)
                            c && c[l].run();
                        l = -1, e = p.length;
                    }
                    c = null, h = !1, function (t) {
                        if (i === clearTimeout)
                            return clearTimeout(t);
                        if ((i === a || !i) && clearTimeout)
                            return i = clearTimeout, clearTimeout(t);
                        try {
                            i(t);
                        } catch (e) {
                            try {
                                return i.call(null, t);
                            } catch (e) {
                                return i.call(this, t);
                            }
                        }
                    }(t);
                }
            }
            function f(t, e) {
                this.fun = t, this.array = e;
            }
            function A() {
            }
            s.nextTick = function (t) {
                var e = new Array(arguments.length - 1);
                if (arguments.length > 1)
                    for (var n = 1; n < arguments.length; n++)
                        e[n - 1] = arguments[n];
                p.push(new f(t, e)), 1 !== p.length || h || o(d);
            }, f.prototype.run = function () {
                this.fun.apply(null, this.array);
            }, s.title = 'browser', s.browser = !0, s.env = {}, s.argv = [], s.version = '', s.versions = {}, s.on = A, s.addListener = A, s.once = A, s.off = A, s.removeListener = A, s.removeAllListeners = A, s.emit = A, s.prependListener = A, s.prependOnceListener = A, s.listeners = function (t) {
                return [];
            }, s.binding = function (t) {
                throw new Error('process.binding is not supported');
            }, s.cwd = function () {
                return '/';
            }, s.chdir = function (t) {
                throw new Error('process.chdir is not supported');
            }, s.umask = function () {
                return 0;
            };
        }
    });
});