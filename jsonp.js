/**
 * jspnp
 * @version 1.0.0
 * @author switer
 * @github https://github.com/switer/jsonp
 */
!function () {
	'use strict';
	var _cbs = {}
	var _ns = '_jsonp'
	var _pn = 'callback'
	var _id = 0
	var _t = 20*1000

	function noop () {}

	function jsonp (url, cb, options) {

		options = options || {}
		cb = cb || noop

		var s = document.createElement('script')
		var cid = _ns + _id ++
		var ended

		window[cid] = function (data) {
			onsuccess(data)
			window[cid] = onsuccess = onerror = noop
		}
		function onsuccess (data) {
			document.head.removeChild(s)
			cb(null, data)
		}
		function onerror (e) {
			document.head.removeChild(s)
			cb(e || 'error')
			window[cid] = onsuccess = onerror = noop
		}
		s.onerror = s.onabort = function (e) {
			onerror(e ? e.type : 'error')
		}
		url = url.replace(/[\?\&]$/, '')
		url = url + (~url.indexOf('?') ? '&' : '?') + _pn + '=' + cid
		s.src = url
		document.head.appendChild(s)
		setTimeout(function () {
			onerror('timeout')
		}, options.timeout || _t)
	}
	jsonp.timeout = function (t) {
		_t = t
	}
	jsonp.ns = function (n) {
		_ns = n
	}
	jsonp.pn = function (n) {
		_pn = n
	}

	/**
	 *  Global namespace is "Routed"
	 */
	if (typeof module !== 'undefined' && module.exports) module.exports = jsonp
	else if (typeof exports !== 'undefined') exports.jsonp = jsonp
	else window.jsonp = jsonp
}();