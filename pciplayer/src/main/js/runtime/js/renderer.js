define(
[
    'IMSGlobal/jquery_2_1_1',
], 
function($){
    'use strict';

    return {
    	render: function(id, dom, config, assetManager ) {
    		var $dom = $(dom)
    		var $element = $dom.find("iframe");
    		$element.attr("src", assetManager.resolve(
    				"numworxPCIplayer/runtime/assets/outer.html?s=" + encodeURIComponent(config.sco) +
    				"&e=" + encodeURIComponent(config.engine) +
    				"&l=" + encodeURIComponent(config.locale) +
    				"&c=" + encodeURIComponent(config.css) +
    				"&m=" + encodeURIComponent(config.cas) ))
    		$element.attr("width", config.width)
    		$element.attr("height", config.height)
    		return $element;
    	}
    }
	}
)
