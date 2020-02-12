console.log("runtime")

define(
	'numworxPCIplayer/runtime/js/renderer',
[
    'IMSGlobal/jquery_2_1_1',
], 
function($){
    'use strict';

    return {
    	render: function(id, dom, config, assetManager ) {
    		var $dom = $(dom)
    		var $element = $dom.find("iframe");
    		$element.attr("src", assetManager.resolve("numworxPCIplayer/runtime/assets/outer.html?s="+config.sco))
    		$element.attr("width", config.width)
    		$element.attr("height", config.height)
    		return $element;
    	}
    }
	}
)





// runtime hook
define(
	'numworxPCIplayer/runtime/js/pciplayer',		
	[
    'qtiCustomInteractionContext',
    'IMSGlobal/jquery_2_1_1',
    'OAT/util/event',
    'numworxPCIplayer/runtime/js/renderer'
], 
	function(qtiCustomInteractionContext, $, event, renderer) {
    	'use strict';
    	var numworxPCIplayer = {
    	        getTypeIdentifier : function() {
    	            return 'numworxPCIplayer';
    	        },

    	        initialize : function(id, dom, config, assetManager) {
    	        	this.id = id;
    	        	this.dom = dom;
    	        	this.config = config || {};
    	        	this.state = {}
    	        	
    	            //add method on(), off() and trigger() to the current object
    	            event.addEventMgr(this);
    	            var self = this;
    	            this.$iframe = renderer.render( this.id, this.dom, this.config, assetManager) 
    	            this.$iframe.on("load", function() {
    	            	console.log("iframe loaded");
    	            	self.api().SetValues(self.state);
    	            })
    	        
    	        },
    	        
    	        api: function() {
    	        	var a =  this.$iframe[0].contentWindow.API_1484_11
    	        	if (a) return a;
    	        	return this;
    	        },
    	        
    	        SetValue: function(key, value) {
    	        	this.state[key] = value;
    	        },
 
    	        GetValue: function(key) {
    	        	return this.state[key] || "";
    	        },
    	        
    	        /**
    	         * Programmatically set the response following the json schema described in
    	         * http://www.imsglobal.org/assessment/pciv1p0cf/imsPCIv1p0cf.html#_Toc353965343
    	         * 
    	         * @param {Object} interaction
    	         * @param {Object} response
    	         */
    	        setResponse : function(response) {
    	        	
    	        },
    	        /**
    	         * Get the response in the json format described in
    	         * http://www.imsglobal.org/assessment/pciv1p0cf/imsPCIv1p0cf.html#_Toc353965343
    	         * 
    	         * @param {Object} interaction
    	         * @returns {Object}
    	         */
    	        getResponse : function getResponse() {

    	        	var value = parseInt("0" + this.api().GetValue("cmi.score.raw"));
    	            return {'base' : {'integer' : value}};
    	        },
    	        /**
    	         * Remove the current response set in the interaction
    	         * The state may not be restored at this point.
    	         * 
    	         * @param {Object} interaction
    	         */
    	        resetResponse : function() {
    	        		
    	        },
    	        /**
    	         * Reverse operation performed by render()
    	         * After this function is executed, only the inital naked markup remains 
    	         * Event listeners are removed and the state and the response are reset
    	         * 
    	         * @param {Object} interaction
    	         */
    	        destroy : function () {

    	        },
    	        /**
    	         * Restore the state of the interaction from the serializedState.
    	         *
    	         * @param {Object} interaction
    	         * @param {Object} serializedState - json format
    	         */
    	        setSerializedState : function(state) {
    	        	if (state['cmi.suspend_data'])
    	        		this.api().SetValue("cmi.suspend_data", state['cmi.suspend_state']);
    	        },

    	        /**
    	         * Get the current state of the interaction as a string.
    	         * It enables saving the state for later usage.
    	         *
    	         * @param {Object} interaction
    	         * @returns {Object} json format
    	         */
    	        getSerializedState : function() {
    	            return {
    	            	"cmi.suspend_data":
    	            	this.api().GetValue("cmi.suspend_data")
    	            }
    	        }
    	    };

    	    qtiCustomInteractionContext.register(numworxPCIplayer);
    	    return numworxPCIplayer;
    	}
)	

define(
		['numworxPCIplayer/runtime/js/pciplayer'],
		function(PCI) {return PCI}
)
