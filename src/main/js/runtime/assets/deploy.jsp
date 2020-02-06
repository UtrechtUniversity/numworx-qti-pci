/**
 * script en css loader
 */

var deploy = "//cdn.dwo.nl/apps/"
var dwo_env = "app"

function script(name) {
	var elem = document.createElement('script');
	elem.src = deploy + name;
	elem.async = false;
	document.head.appendChild(elem);
}

function css(name) {
	var elem = document.createElement('link');
	elem.type='text/css';
	elem.rel = 'stylesheet';
	elem.href = deploy + name;
	document.head.appendChild(elem);
}