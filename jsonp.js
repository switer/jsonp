'use strict';

var _cbs = {}
var _ns = 'jsonp'
var _id = 0
var _t = 20*1000

function jsonp (url, cb, options) {
	options = options || {}
	var s = document.createElement('script')
	var cid = _ns + _id ++
	var ended
	window[cid] = function (data) {
		document.head.removeChild(s)
		try {
			data = JSON.parse(data)
		} catch(e) {
			// do nothing	
		}
	}
	function onerror () {
		if (ended) return
		ended = null
		cid = null
	}
	s.src = url
	document.head.appendChild(s)
	if (options.timeout) {
		setTimeout(function () {
			
		})
	}
}
jsonp.timeout = function (t) {
	_t = t
}
jsonp.ns = function (n) {
	_ns = n
}

module.exports = jsonp