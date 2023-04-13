import { c as create_ssr_component, a as subscribe, b as each, e as escape$1, n as null_to_empty, v as validate_component } from "../../chunks/index2.js";
import "os";
import { w as writable, d as derived } from "../../chunks/index.js";
import { getFirestore } from "Firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import axios from "axios";
import { getStorage } from "firebase/storage";
import "@firebase/util";
const actionBtn_svelte_svelte_type_style_lang = "";
const btn_sidebar_svelte_svelte_type_style_lang = "";
var e = function(t2, n2) {
  return e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e2, t3) {
    e2.__proto__ = t3;
  } || function(e2, t3) {
    for (var n3 in t3)
      Object.prototype.hasOwnProperty.call(t3, n3) && (e2[n3] = t3[n3]);
  }, e(t2, n2);
}, t = function() {
  return t = Object.assign || function(e2) {
    for (var t2, n2 = 1, r2 = arguments.length; n2 < r2; n2++)
      for (var o2 in t2 = arguments[n2])
        Object.prototype.hasOwnProperty.call(t2, o2) && (e2[o2] = t2[o2]);
    return e2;
  }, t.apply(this, arguments);
};
function n(e2, t2, n2) {
  if (n2 || 2 === arguments.length)
    for (var r2, o2 = 0, i2 = t2.length; o2 < i2; o2++)
      !r2 && o2 in t2 || (r2 || (r2 = Array.prototype.slice.call(t2, 0, o2)), r2[o2] = t2[o2]);
  return e2.concat(r2 || Array.prototype.slice.call(t2));
}
var r = function(t2) {
  function n2() {
    return null !== t2 && t2.apply(this, arguments) || this;
  }
  return function(t3, n3) {
    if ("function" != typeof n3 && null !== n3)
      throw new TypeError("Class extends value " + String(n3) + " is not a constructor or null");
    function r2() {
      this.constructor = t3;
    }
    e(t3, n3), t3.prototype = null === n3 ? Object.create(n3) : (r2.prototype = n3.prototype, new r2());
  }(n2, t2), n2;
}(Error), o = {}, i = /* @__PURE__ */ new Set(), a = {};
function c(e2, n2) {
  if ("string" == typeof e2 || "number" == typeof e2 && !isNaN(e2) && Math.abs(e2) !== 1 / 0 || null == e2 || "boolean" == typeof e2)
    return e2;
  var r2 = n2.indexOf(e2);
  if (-1 !== r2)
    return "#$@__instance__" + r2;
  n2.push(e2);
  var o2 = n2.length - 1;
  if (e2.constructor === Array) {
    var s2 = e2.map(function(e3) {
      return c(e3, n2);
    });
    return s2.unshift("#$@__reference__" + o2), s2;
  }
  if (e2.constructor === Object) {
    var u2 = Object.fromEntries(Object.entries(e2).map(function(e3) {
      return [e3[0], c(e3[1], n2)];
    }));
    return u2["#$@__reference__"] = o2, u2;
  }
  i.add(e2.constructor);
  var l2 = {};
  l2 = Object.defineProperty(l2, "#$@__constructor__", { value: e2.constructor.name, enumerable: true }), l2 = Object.defineProperty(l2, "#$@__reference__", { value: o2, enumerable: true });
  var f2 = function(e3, t2) {
    if (Object.keys(a).includes(e3.constructor.name))
      return a[e3.constructor.name].toPlain(e3, function(e4) {
        return c(e4, t2);
      });
  }(e2, n2);
  return void 0 !== f2 ? t(t({}, f2), l2) : (Object.getOwnPropertyNames(e2).forEach(function(t2) {
    Object.defineProperty(l2, t2, { value: c(e2[t2], n2), enumerable: true });
  }), l2);
}
function s(e2, t2, n2) {
  var o2;
  if ("string" == typeof e2 && 0 === e2.indexOf("#$@__instance__"))
    return n2[l2 = parseInt(e2.slice("#$@__instance__".length))];
  if ("string" == typeof e2 || "number" == typeof e2 || null == e2 || "boolean" == typeof e2)
    return e2;
  if (e2.constructor === Array) {
    if (0 === e2.length)
      return [];
    var i2 = e2.shift();
    if ("string" != typeof i2 || "#$@__reference__" !== i2.substring(0, "#$@__reference__".length)) {
      if (0 === Object.keys(n2).length)
        return e2.unshift(i2), e2;
      throw new r();
    }
    var c2 = [];
    n2[l2 = i2.slice("#$@__reference__".length)] = c2;
    for (var u2 = 0; u2 < e2.length; u2++)
      c2[u2] = s(e2[u2], t2, n2);
    return c2;
  }
  if (e2.constructor === Object) {
    var l2;
    if (null === (l2 = null !== (o2 = e2["#$@__reference__"]) && void 0 !== o2 ? o2 : null)) {
      if (0 === Object.keys(n2).length)
        return e2;
      throw new r();
    }
    if (delete e2["#$@__reference__"], !Object.keys(e2).includes("#$@__constructor__")) {
      for (var f2 in c2 = {}, n2[l2] = c2, e2)
        c2[f2] = s(e2[f2], t2, n2);
      return c2;
    }
    var d = e2["#$@__constructor__"];
    delete e2["#$@__constructor__"];
    var h = function(e3, t3, n3, r2) {
      if (Object.keys(a).includes(t3))
        return a[t3].fromPlain(e3, function(e4) {
          return s(e4, n3, r2);
        });
    }(e2, d, t2, n2);
    if (void 0 !== h)
      return h;
    if (!Object.keys(t2).includes(d))
      throw new Error("The class " + d + " is not allowed");
    var p = {};
    for (var f2 in n2[l2] = p, e2)
      p[f2] = s(e2[f2], t2, n2);
    return Object.setPrototypeOf(p, t2[d].prototype), p;
  }
}
function u(e2) {
  o[e2.name] = e2;
}
!function(e2, t2) {
  e2("Date", (e3) => ({ time: e3.getTime() }), function(e3) {
    let t3 = /* @__PURE__ */ new Date();
    return t3.setTime(e3.time), t3;
  }), e2("BigInt", (e3) => ({ number: e3.toString() }), (e3) => BigInt(e3.number)), e2("String", (e3) => ({ text: e3.toString() }), (e3) => new String(e3.text)), e2("RegExp", (e3) => ({ source: e3.source, flags: e3.flags }), (e3) => new RegExp(e3.source, e3.flags)), e2("Number", function(e3) {
    let t3 = { nan: false, infinity: false, positive: true, number: null };
    return Math.abs(e3) === 1 / 0 ? (t3.infinity = true, t3.positive = Math.abs(e3) === e3, t3) : isNaN(e3) ? (t3.nan = true, t3) : (t3.number = e3.valueOf(), t3);
  }, function(e3) {
    return e3.nan ? NaN : e3.infinity ? 1 / 0 * (e3.positive ? 1 : -1) : new Number(e3.number);
  }), e2("Map", (e3, t3) => ({ data: Array.from(e3.entries()).map((e4) => t3(e4)) }), function(e3, t3) {
    const n2 = /* @__PURE__ */ new Map();
    return e3.data.map((e4) => t3(e4)).forEach(([e4, t4]) => n2.set(e4, t4)), n2;
  }), e2("Set", (e3, t3) => ({ data: Array.from(e3.values()).map((e4) => t3(e4)) }), function(e3, t3) {
    const n2 = /* @__PURE__ */ new Set();
    return e3.data.map((e4) => t3(e4)).forEach((e4) => n2.add(e4)), n2;
  }), e2("ArrayBuffer", (e3, t3) => ({ data: t3(new Uint8Array(e3)) }), (e3, t3) => t3(e3.data).buffer), e2("DataView", (e3, t3) => ({ buffer: t3(e3.buffer), offset: e3.byteOffset, length: e3.byteLength }), (e3, t3) => new DataView(t3(e3.buffer), e3.offset, e3.length)), [Error, EvalError, RangeError, AggregateError, ReferenceError, SyntaxError, TypeError, URIError, Int8Array, Uint8Array, Uint8ClampedArray, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array, BigInt64Array, BigUint64Array].forEach((e3) => t2(e3));
}(function(e2, t2, n2) {
  a[e2] = { toPlain: t2, fromPlain: n2 };
}, u);
var l, f = {};
function m(e2) {
  let t2, n2 = e2[0], r2 = 1;
  for (; r2 < e2.length; ) {
    const o2 = e2[r2], i2 = e2[r2 + 1];
    if (r2 += 2, ("optionalAccess" === o2 || "optionalCall" === o2) && null == n2)
      return;
    "access" === o2 || "optionalAccess" === o2 ? (t2 = n2, n2 = i2(n2)) : "call" !== o2 && "optionalCall" !== o2 || (n2 = i2((...e3) => n2.call(t2, ...e3)), t2 = void 0);
  }
  return n2;
}
(l = f).defaults = {}, l.set = function(e2, t2, n2) {
  var r2 = n2 || {}, o2 = l.defaults, i2 = r2.expires || o2.expires, a2 = r2.domain || o2.domain, c2 = void 0 !== r2.path ? r2.path : void 0 !== o2.path ? o2.path : "/", s2 = void 0 !== r2.secure ? r2.secure : o2.secure, u2 = void 0 !== r2.httponly ? r2.httponly : o2.httponly, f2 = void 0 !== r2.samesite ? r2.samesite : o2.samesite, d = i2 ? new Date("number" == typeof i2 ? (/* @__PURE__ */ new Date()).getTime() + 864e5 * i2 : i2) : 0;
  document.cookie = e2.replace(/[^+#$&^`|]/g, encodeURIComponent).replace("(", "%28").replace(")", "%29") + "=" + t2.replace(/[^+#$&/:<-\[\]-}]/g, encodeURIComponent) + (d && d.getTime() >= 0 ? ";expires=" + d.toUTCString() : "") + (a2 ? ";domain=" + a2 : "") + (c2 ? ";path=" + c2 : "") + (s2 ? ";secure" : "") + (u2 ? ";httponly" : "") + (f2 ? ";samesite=" + f2 : "");
}, l.get = function(e2) {
  for (var t2 = document.cookie.split(";"); t2.length; ) {
    var n2 = t2.pop(), r2 = n2.indexOf("=");
    if (r2 = r2 < 0 ? n2.length : r2, decodeURIComponent(n2.slice(0, r2).replace(/^\s+/, "")) === e2)
      return decodeURIComponent(n2.slice(r2 + 1));
  }
  return null;
}, l.erase = function(e2, t2) {
  l.set(e2, "", { expires: -1, domain: t2 && t2.domain, path: t2 && t2.path, secure: 0, httponly: 0 });
}, l.all = function() {
  for (var e2 = {}, t2 = document.cookie.split(";"); t2.length; ) {
    var n2 = t2.pop(), r2 = n2.indexOf("=");
    r2 = r2 < 0 ? n2.length : r2, e2[decodeURIComponent(n2.slice(0, r2).replace(/^\s+/, ""))] = decodeURIComponent(n2.slice(r2 + 1));
  }
  return e2;
};
const v = [], _ = (e2) => {
  ((e3) => {
    const t2 = "undefined" != typeof process && "production" === m([process, "access", (e4) => e4.env, "optionalAccess", (e4) => e4.NODE_ENV]);
    -1 !== v.indexOf(e3) || t2 || ("undefined" == typeof window && (e3 += "\nAre you running on a server? Most of storages are not available while running on a server."), console.warn(e3), v.push(e3));
  })(`Unable to find the ${e2}. No data will be persisted.`);
};
let A = function(e2) {
  return void 0 === e2 ? "undefined" : JSON.stringify(c(e2, []));
}, O = function(e2, t2) {
  if (void 0 === t2 && (t2 = void 0), "string" != typeof e2)
    return e2;
  if (void 0 === t2 && (t2 = {}), "undefined" !== e2) {
    t2 = Object.fromEntries(n(n([], Object.entries(t2), true), Object.entries(o), true));
    try {
      return s(JSON.parse(e2), t2, {});
    } catch (t3) {
      return e2;
    }
  }
};
function E(e2, t2, n2) {
  const r2 = t2.getValue(n2);
  return null !== r2 && e2.set(r2), t2.addListener && t2.addListener(n2, (t3) => {
    e2.set(t3);
  }), e2.subscribe((e3) => {
    t2.setValue(n2, e3);
  }), { ...e2, delete() {
    t2.deleteValue(n2);
  } };
}
function x() {
}
function V(e2 = x, t2 = x) {
  const n2 = [];
  return { callListeners(e3, t3) {
    void 0 !== t3 && n2.filter(({ key: t4 }) => t4 === e3).forEach(({ listener: e4 }) => e4(t3));
  }, addListener(t3, r2) {
    n2.push({ key: t3, listener: r2 }), 1 === n2.length && e2();
  }, removeListener(e3, r2) {
    const o2 = n2.indexOf({ key: e3, listener: r2 });
    -1 !== o2 && n2.splice(o2, 1), 0 === n2.length && t2();
  } };
}
U();
B();
M();
function R(e2, t2 = false) {
  const n2 = (t3) => {
    const n3 = t3.key;
    t3.storageArea === e2 && o2(n3, O(t3.newValue));
  }, { removeListener: r2, callListeners: o2, addListener: i2 } = V(() => {
    t2 && "undefined" != typeof window && m([window, "optionalAccess", (e3) => e3.addEventListener]) && window.addEventListener("storage", n2);
  }, () => {
    t2 && "undefined" != typeof window && m([window, "optionalAccess", (e3) => e3.removeEventListener]) && window.removeEventListener("storage", n2);
  });
  return { addListener: i2, removeListener: r2, getValue(t3) {
    const n3 = e2.getItem(t3);
    return O(n3);
  }, deleteValue(t3) {
    e2.removeItem(t3);
  }, setValue(t3, n3) {
    e2.setItem(t3, A(n3));
  } };
}
function B(e2 = false) {
  return "undefined" != typeof window && m([window, "optionalAccess", (e3) => e3.localStorage]) ? R(window.localStorage, e2) : (_("window.localStorage"), Y());
}
function M(e2 = false) {
  return "undefined" != typeof window && m([window, "optionalAccess", (e3) => e3.sessionStorage]) ? R(window.sessionStorage, e2) : (_("window.sessionStorage"), Y());
}
function U() {
  return "undefined" == typeof document || "string" != typeof m([document, "optionalAccess", (e2) => e2.cookie]) ? (_("document.cookies"), Y()) : { getValue(e2) {
    const t2 = f.get(e2);
    return O(t2);
  }, deleteValue(e2) {
    f.erase(e2, { samesite: "Strict" });
  }, setValue(e2, t2) {
    f.set(e2, A(t2), { samesite: "Strict" });
  } };
}
var D;
function Y() {
  return { getValue: () => null, deleteValue() {
  }, setValue() {
  } };
}
!function(e2) {
  e2[e2.LOCAL = 0] = "LOCAL";
  e2[e2.SESSION = 1] = "SESSION";
  e2[e2.SYNC = 2] = "SYNC";
}(D || (D = {}));
var q, Q = { cipher: {}, hash: {}, keyexchange: {}, mode: {}, misc: {}, codec: {}, exception: { corrupt: function(e2) {
  this.toString = function() {
    return "CORRUPT: " + this.message;
  }, this.message = e2;
}, invalid: function(e2) {
  this.toString = function() {
    return "INVALID: " + this.message;
  }, this.message = e2;
}, bug: function(e2) {
  this.toString = function() {
    return "BUG: " + this.message;
  }, this.message = e2;
}, notReady: function(e2) {
  this.toString = function() {
    return "NOT READY: " + this.message;
  }, this.message = e2;
} } };
Q.cipher.aes = function(e2) {
  this._tables[0][0][0] || this._precompute();
  var t2, n2, r2, o2, i2, a2 = this._tables[0][4], c2 = this._tables[1], s2 = e2.length, u2 = 1;
  if (4 !== s2 && 6 !== s2 && 8 !== s2)
    throw new Q.exception.invalid("invalid aes key size");
  for (this._key = [o2 = e2.slice(0), i2 = []], t2 = s2; t2 < 4 * s2 + 28; t2++)
    r2 = o2[t2 - 1], (t2 % s2 == 0 || 8 === s2 && t2 % s2 == 4) && (r2 = a2[r2 >>> 24] << 24 ^ a2[r2 >> 16 & 255] << 16 ^ a2[r2 >> 8 & 255] << 8 ^ a2[255 & r2], t2 % s2 == 0 && (r2 = r2 << 8 ^ r2 >>> 24 ^ u2 << 24, u2 = u2 << 1 ^ 283 * (u2 >> 7))), o2[t2] = o2[t2 - s2] ^ r2;
  for (n2 = 0; t2; n2++, t2--)
    r2 = o2[3 & n2 ? t2 : t2 - 4], i2[n2] = t2 <= 4 || n2 < 4 ? r2 : c2[0][a2[r2 >>> 24]] ^ c2[1][a2[r2 >> 16 & 255]] ^ c2[2][a2[r2 >> 8 & 255]] ^ c2[3][a2[255 & r2]];
}, Q.cipher.aes.prototype = { encrypt: function(e2) {
  return this._crypt(e2, 0);
}, decrypt: function(e2) {
  return this._crypt(e2, 1);
}, _tables: [[[], [], [], [], []], [[], [], [], [], []]], _precompute: function() {
  var e2, t2, n2, r2, o2, i2, a2, c2, s2 = this._tables[0], u2 = this._tables[1], l2 = s2[4], f2 = u2[4], d = [], h = [];
  for (e2 = 0; e2 < 256; e2++)
    h[(d[e2] = e2 << 1 ^ 283 * (e2 >> 7)) ^ e2] = e2;
  for (t2 = n2 = 0; !l2[t2]; t2 ^= r2 || 1, n2 = h[n2] || 1)
    for (i2 = (i2 = n2 ^ n2 << 1 ^ n2 << 2 ^ n2 << 3 ^ n2 << 4) >> 8 ^ 255 & i2 ^ 99, l2[t2] = i2, f2[i2] = t2, c2 = 16843009 * d[o2 = d[r2 = d[t2]]] ^ 65537 * o2 ^ 257 * r2 ^ 16843008 * t2, a2 = 257 * d[i2] ^ 16843008 * i2, e2 = 0; e2 < 4; e2++)
      s2[e2][t2] = a2 = a2 << 24 ^ a2 >>> 8, u2[e2][i2] = c2 = c2 << 24 ^ c2 >>> 8;
  for (e2 = 0; e2 < 5; e2++)
    s2[e2] = s2[e2].slice(0), u2[e2] = u2[e2].slice(0);
}, _crypt: function(e2, t2) {
  if (4 !== e2.length)
    throw new Q.exception.invalid("invalid aes block size");
  var n2, r2, o2, i2, a2 = this._key[t2], c2 = e2[0] ^ a2[0], s2 = e2[t2 ? 3 : 1] ^ a2[1], u2 = e2[2] ^ a2[2], l2 = e2[t2 ? 1 : 3] ^ a2[3], f2 = a2.length / 4 - 2, d = 4, h = [0, 0, 0, 0], p = this._tables[t2], g = p[0], m2 = p[1], y = p[2], b = p[3], v2 = p[4];
  for (i2 = 0; i2 < f2; i2++)
    n2 = g[c2 >>> 24] ^ m2[s2 >> 16 & 255] ^ y[u2 >> 8 & 255] ^ b[255 & l2] ^ a2[d], r2 = g[s2 >>> 24] ^ m2[u2 >> 16 & 255] ^ y[l2 >> 8 & 255] ^ b[255 & c2] ^ a2[d + 1], o2 = g[u2 >>> 24] ^ m2[l2 >> 16 & 255] ^ y[c2 >> 8 & 255] ^ b[255 & s2] ^ a2[d + 2], l2 = g[l2 >>> 24] ^ m2[c2 >> 16 & 255] ^ y[s2 >> 8 & 255] ^ b[255 & u2] ^ a2[d + 3], d += 4, c2 = n2, s2 = r2, u2 = o2;
  for (i2 = 0; i2 < 4; i2++)
    h[t2 ? 3 & -i2 : i2] = v2[c2 >>> 24] << 24 ^ v2[s2 >> 16 & 255] << 16 ^ v2[u2 >> 8 & 255] << 8 ^ v2[255 & l2] ^ a2[d++], n2 = c2, c2 = s2, s2 = u2, u2 = l2, l2 = n2;
  return h;
} }, Q.bitArray = { bitSlice: function(e2, t2, n2) {
  return e2 = Q.bitArray._shiftRight(e2.slice(t2 / 32), 32 - (31 & t2)).slice(1), void 0 === n2 ? e2 : Q.bitArray.clamp(e2, n2 - t2);
}, extract: function(e2, t2, n2) {
  var r2 = Math.floor(-t2 - n2 & 31);
  return (-32 & (t2 + n2 - 1 ^ t2) ? e2[t2 / 32 | 0] << 32 - r2 ^ e2[t2 / 32 + 1 | 0] >>> r2 : e2[t2 / 32 | 0] >>> r2) & (1 << n2) - 1;
}, concat: function(e2, t2) {
  if (0 === e2.length || 0 === t2.length)
    return e2.concat(t2);
  var n2 = e2[e2.length - 1], r2 = Q.bitArray.getPartial(n2);
  return 32 === r2 ? e2.concat(t2) : Q.bitArray._shiftRight(t2, r2, 0 | n2, e2.slice(0, e2.length - 1));
}, bitLength: function(e2) {
  var t2, n2 = e2.length;
  return 0 === n2 ? 0 : (t2 = e2[n2 - 1], 32 * (n2 - 1) + Q.bitArray.getPartial(t2));
}, clamp: function(e2, t2) {
  if (32 * e2.length < t2)
    return e2;
  var n2 = (e2 = e2.slice(0, Math.ceil(t2 / 32))).length;
  return t2 &= 31, n2 > 0 && t2 && (e2[n2 - 1] = Q.bitArray.partial(t2, e2[n2 - 1] & 2147483648 >> t2 - 1, 1)), e2;
}, partial: function(e2, t2, n2) {
  return 32 === e2 ? t2 : (n2 ? 0 | t2 : t2 << 32 - e2) + 1099511627776 * e2;
}, getPartial: function(e2) {
  return Math.round(e2 / 1099511627776) || 32;
}, equal: function(e2, t2) {
  if (Q.bitArray.bitLength(e2) !== Q.bitArray.bitLength(t2))
    return false;
  var n2, r2 = 0;
  for (n2 = 0; n2 < e2.length; n2++)
    r2 |= e2[n2] ^ t2[n2];
  return 0 === r2;
}, _shiftRight: function(e2, t2, n2, r2) {
  var o2, i2, a2;
  for (void 0 === r2 && (r2 = []); t2 >= 32; t2 -= 32)
    r2.push(n2), n2 = 0;
  if (0 === t2)
    return r2.concat(e2);
  for (o2 = 0; o2 < e2.length; o2++)
    r2.push(n2 | e2[o2] >>> t2), n2 = e2[o2] << 32 - t2;
  return i2 = e2.length ? e2[e2.length - 1] : 0, a2 = Q.bitArray.getPartial(i2), r2.push(Q.bitArray.partial(t2 + a2 & 31, t2 + a2 > 32 ? n2 : r2.pop(), 1)), r2;
}, _xor4: function(e2, t2) {
  return [e2[0] ^ t2[0], e2[1] ^ t2[1], e2[2] ^ t2[2], e2[3] ^ t2[3]];
}, byteswapM: function(e2) {
  var t2, n2;
  for (t2 = 0; t2 < e2.length; ++t2)
    n2 = e2[t2], e2[t2] = n2 >>> 24 | n2 >>> 8 & 65280 | (65280 & n2) << 8 | n2 << 24;
  return e2;
} }, Q.codec.utf8String = { fromBits: function(e2) {
  var t2, n2, r2 = "", o2 = Q.bitArray.bitLength(e2);
  for (t2 = 0; t2 < o2 / 8; t2++)
    0 == (3 & t2) && (n2 = e2[t2 / 4]), r2 += String.fromCharCode(n2 >>> 8 >>> 8 >>> 8), n2 <<= 8;
  return decodeURIComponent(escape(r2));
}, toBits: function(e2) {
  e2 = unescape(encodeURIComponent(e2));
  var t2, n2 = [], r2 = 0;
  for (t2 = 0; t2 < e2.length; t2++)
    r2 = r2 << 8 | e2.charCodeAt(t2), 3 == (3 & t2) && (n2.push(r2), r2 = 0);
  return 3 & t2 && n2.push(Q.bitArray.partial(8 * (3 & t2), r2)), n2;
} }, Q.codec.base64 = { _chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", fromBits: function(e2, t2, n2) {
  var r2, o2 = "", i2 = 0, a2 = Q.codec.base64._chars, c2 = 0, s2 = Q.bitArray.bitLength(e2);
  for (n2 && (a2 = a2.substr(0, 62) + "-_"), r2 = 0; 6 * o2.length < s2; )
    o2 += a2.charAt((c2 ^ e2[r2] >>> i2) >>> 26), i2 < 6 ? (c2 = e2[r2] << 6 - i2, i2 += 26, r2++) : (c2 <<= 6, i2 -= 6);
  for (; 3 & o2.length && !t2; )
    o2 += "=";
  return o2;
}, toBits: function(e2, t2) {
  e2 = e2.replace(/\s|=/g, "");
  var n2, r2, o2 = [], i2 = 0, a2 = Q.codec.base64._chars, c2 = 0;
  for (t2 && (a2 = a2.substr(0, 62) + "-_"), n2 = 0; n2 < e2.length; n2++) {
    if ((r2 = a2.indexOf(e2.charAt(n2))) < 0)
      throw new Q.exception.invalid("this isn't base64!");
    i2 > 26 ? (i2 -= 26, o2.push(c2 ^ r2 >>> i2), c2 = r2 << 32 - i2) : c2 ^= r2 << 32 - (i2 += 6);
  }
  return 56 & i2 && o2.push(Q.bitArray.partial(56 & i2, c2, 1)), o2;
} }, Q.codec.base64url = { fromBits: function(e2) {
  return Q.codec.base64.fromBits(e2, 1, 1);
}, toBits: function(e2) {
  return Q.codec.base64.toBits(e2, 1);
} }, Q.mode.gcm = { name: "gcm", encrypt: function(e2, t2, n2, r2, o2) {
  var i2, a2 = t2.slice(0), c2 = Q.bitArray;
  return o2 = o2 || 128, r2 = r2 || [], i2 = Q.mode.gcm._ctrMode(true, e2, a2, r2, n2, o2), c2.concat(i2.data, i2.tag);
}, decrypt: function(e2, t2, n2, r2, o2) {
  var i2, a2, c2 = t2.slice(0), s2 = Q.bitArray, u2 = s2.bitLength(c2);
  if (r2 = r2 || [], (o2 = o2 || 128) <= u2 ? (a2 = s2.bitSlice(c2, u2 - o2), c2 = s2.bitSlice(c2, 0, u2 - o2)) : (a2 = c2, c2 = []), i2 = Q.mode.gcm._ctrMode(false, e2, c2, r2, n2, o2), !s2.equal(i2.tag, a2))
    throw new Q.exception.corrupt("gcm: tag doesn't match");
  return i2.data;
}, _galoisMultiply: function(e2, t2) {
  var n2, r2, o2, i2, a2, c2 = Q.bitArray._xor4;
  for (o2 = [0, 0, 0, 0], i2 = t2.slice(0), n2 = 0; n2 < 128; n2++) {
    for (0 != (e2[Math.floor(n2 / 32)] & 1 << 31 - n2 % 32) && (o2 = c2(o2, i2)), a2 = 0 != (1 & i2[3]), r2 = 3; r2 > 0; r2--)
      i2[r2] = i2[r2] >>> 1 | (1 & i2[r2 - 1]) << 31;
    i2[0] = i2[0] >>> 1, a2 && (i2[0] = i2[0] ^ 225 << 24);
  }
  return o2;
}, _ghash: function(e2, t2, n2) {
  var r2, o2, i2 = n2.length;
  for (r2 = t2.slice(0), o2 = 0; o2 < i2; o2 += 4)
    r2[0] ^= 4294967295 & n2[o2], r2[1] ^= 4294967295 & n2[o2 + 1], r2[2] ^= 4294967295 & n2[o2 + 2], r2[3] ^= 4294967295 & n2[o2 + 3], r2 = Q.mode.gcm._galoisMultiply(r2, e2);
  return r2;
}, _ctrMode: function(e2, t2, n2, r2, o2, i2) {
  var a2, c2, s2, u2, l2, f2, d, h, p, g, m2, y, b = Q.bitArray;
  for (p = n2.length, g = b.bitLength(n2), m2 = b.bitLength(r2), y = b.bitLength(o2), a2 = t2.encrypt([0, 0, 0, 0]), 96 === y ? (c2 = o2.slice(0), c2 = b.concat(c2, [1])) : (c2 = Q.mode.gcm._ghash(a2, [0, 0, 0, 0], o2), c2 = Q.mode.gcm._ghash(a2, c2, [0, 0, Math.floor(y / 4294967296), 4294967295 & y])), s2 = Q.mode.gcm._ghash(a2, [0, 0, 0, 0], r2), f2 = c2.slice(0), d = s2.slice(0), e2 || (d = Q.mode.gcm._ghash(a2, s2, n2)), l2 = 0; l2 < p; l2 += 4)
    f2[3]++, u2 = t2.encrypt(f2), n2[l2] ^= u2[0], n2[l2 + 1] ^= u2[1], n2[l2 + 2] ^= u2[2], n2[l2 + 3] ^= u2[3];
  return n2 = b.clamp(n2, g), e2 && (d = Q.mode.gcm._ghash(a2, s2, n2)), h = [Math.floor(m2 / 4294967296), 4294967295 & m2, Math.floor(g / 4294967296), 4294967295 & g], d = Q.mode.gcm._ghash(a2, d, h), u2 = t2.encrypt(c2), d[0] ^= u2[0], d[1] ^= u2[1], d[2] ^= u2[2], d[3] ^= u2[3], { tag: b.bitSlice(d, 0, i2), data: n2 };
} }, function(e2) {
  e2[e2.EXCEPTION = 0] = "EXCEPTION";
  e2[e2.NO_ENCRYPTION = 1] = "NO_ENCRYPTION";
  e2[e2.NO_STORAGE = 2] = "NO_STORAGE";
}(q || (q = {}));
E(writable([]), typeof window !== void 0 ? B() : {}, "page");
E(writable([]), typeof window !== void 0 ? B() : {}, "screenSize");
let userAuthStore = E(writable([]), typeof window !== void 0 ? B() : {}, "userAuth");
let businessStore = E(writable([]), typeof window !== void 0 ? B() : {}, "business");
let authstatusStore = E(writable([]), typeof window !== void 0 ? B() : {}, "status");
E(writable([]), typeof window !== void 0 ? B() : {}, "customers");
E(writable([]), typeof window !== void 0 ? B() : {}, "loan");
E(writable([]), typeof window !== void 0 ? B() : {}, "receipts");
E(writable([]), typeof window !== void 0 ? B() : {}, "team");
E(writable([]), typeof window !== void 0 ? B() : {}, "email");
const input_svelte_svelte_type_style_lang = "";
const table_svelte_svelte_type_style_lang = "";
function createNotificationStore(timeout) {
  const _notifications = writable([]);
  function send(message, type = "default", timeout2) {
    _notifications.update((state) => {
      return [...state, { id: id(), type, message, timeout: timeout2 }];
    });
  }
  const notifications2 = derived(_notifications, ($_notifications, set) => {
    set($_notifications);
    if ($_notifications.length > 0) {
      const timer = setTimeout(() => {
        _notifications.update((state) => {
          state.shift();
          return state;
        });
      }, $_notifications[0].timeout);
      return () => {
        clearTimeout(timer);
      };
    }
  });
  const { subscribe: subscribe2 } = notifications2;
  return {
    subscribe: subscribe2,
    send,
    default: (msg, timeout2) => send(msg, "default", timeout2),
    danger: (msg, timeout2) => send(msg, "danger", timeout2),
    warning: (msg, timeout2) => send(msg, "warning", timeout2),
    info: (msg, timeout2) => send(msg, "info", timeout2),
    success: (msg, timeout2) => send(msg, "success", timeout2)
  };
}
function id() {
  return "_" + Math.random().toString(36).substr(2, 9);
}
const notifications = createNotificationStore();
let baseUrl = "https://sore-pear-dog-hat.cyclic.app/";
async function axiosGetRoute(params, url, headers) {
  try {
    const res = await axios.get(baseUrl + url, {
      headers: headers ?? {},
      params
    });
    return res;
  } catch (error) {
    console.log(error);
  }
}
async function appInit() {
  let res = await axiosGetRoute({}, "/api/getsecrets", {});
  return res.data.secrets;
}
let firebaseConfig = await appInit();
const app$1 = initializeApp(firebaseConfig);
getAuth(app$1);
getFirestore(app$1);
getStorage(app$1);
const avatarName_svelte_svelte_type_style_lang = "";
const app = "";
const settings_svelte_svelte_type_style_lang = "";
const bodywrapper_svelte_svelte_type_style_lang = "";
const sidebar_svelte_svelte_type_style_lang = "";
const Small_Screen = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="text-xl font-bold px-20 py-40 ">We are working on <break>the smaller screen versions </break>
    <div class="text-sm font-medium pt-5 ">Please use a computer</div></div>
<h1 style="position: fixed;bottom: 30px;" class="text-slate-300 text-lg font-extrabold ">CLIQ MINI SERVICE
</h1>`;
});
const openingScreen_svelte_svelte_type_style_lang = "";
const toast_svelte_svelte_type_style_lang = "";
const css = {
  code: ".notifications.svelte-1pwolby{position:fixed;bottom:50px;left:0;right:0;margin:0 auto;padding:0;z-index:9999;display:flex;flex-direction:column;justify-content:flex-start;align-items:center;pointer-events:none;border-radius:4px}.toast.svelte-1pwolby{flex:0 0 auto;margin-bottom:10px;border:2px solid black}.content.svelte-1pwolby{padding:10px;display:block;color:white;font-weight:500}.oppositeContent.svelte-1pwolby{padding:10px;display:block;color:rgb(42, 40, 40);font-weight:600}",
  map: null
};
const Toast = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $notifications, $$unsubscribe_notifications;
  $$unsubscribe_notifications = subscribe(notifications, (value) => $notifications = value);
  let { themes = {
    danger: "#FF5067",
    success: "#39F179",
    warning: "#FF9200",
    info: "#00B3FF",
    default: "#9FAFA1"
  } } = $$props;
  if ($$props.themes === void 0 && $$bindings.themes && themes !== void 0)
    $$bindings.themes(themes);
  $$result.css.add(css);
  $$unsubscribe_notifications();
  return `<div class="notifications svelte-1pwolby">${each($notifications, (notification) => {
    return `<div class="toast px-3 text-center rounded-full shadow-2xl text-sm border-solid border-black svelte-1pwolby" style="${"background: " + escape$1(themes[notification.type], true) + ";"}"><div class="${escape$1(
      null_to_empty(notification.type != "success" && notification.type != "info" ? "content" : "oppositeContent"),
      true
    ) + " svelte-1pwolby"}">${escape$1(notification.message)}</div>
			${notification.icon ? `<i class="${escape$1(null_to_empty(notification.icon), true) + " svelte-1pwolby"}"></i>` : ``}
		</div>`;
  })}
</div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let loggedIn;
  let $$unsubscribe_userAuthStore;
  let $authstatusStore, $$unsubscribe_authstatusStore;
  let $$unsubscribe_businessStore;
  $$unsubscribe_userAuthStore = subscribe(userAuthStore, (value) => value);
  $$unsubscribe_authstatusStore = subscribe(authstatusStore, (value) => $authstatusStore = value);
  $$unsubscribe_businessStore = subscribe(businessStore, (value) => value);
  loggedIn = typeof window != "undefined" && $authstatusStore != void 0 && $authstatusStore.length != 0 ? $authstatusStore.code == "authorized" : false;
  $$unsubscribe_userAuthStore();
  $$unsubscribe_authstatusStore();
  $$unsubscribe_businessStore();
  return `
${escape$1(loggedIn)}
${`${validate_component(Small_Screen, "SmallScreen").$$render($$result, {}, {}, {})}`}
${validate_component(Toast, "Toast").$$render($$result, {}, {}, {})}`;
});
export {
  Page as default
};
