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
    				"numworxPCIplayer/runtime/assets/outer.html?s=" + config.sco +
    				"&e=" + config.engine +
    				"&l=" + config.locale +
    				"&c=" + config.css +
    				"&m=" + config.cas))
    		$element.attr("width", config.width)
    		$element.attr("height", config.height)
    		return $element;
    	}
    }
	}
)
