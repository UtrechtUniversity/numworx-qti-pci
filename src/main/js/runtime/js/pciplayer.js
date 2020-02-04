// runtime hook
define([
    'qtiCustomInteractionContext',
    'taoQtiItem/portableLib/jquery_2_1_1',
    'taoQtiItem/portableLib/OAT/util/event',
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
    	        	
    	            //add method on(), off() and trigger() to the current object
    	            event.addEventMgr(this);
	        	
    	            renderer.render( this.id, this.dom. this.config, assetManager) 
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

    	        	var value = 1;
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
    	        },

    	        /**
    	         * Get the current state of the interaction as a string.
    	         * It enables saving the state for later usage.
    	         *
    	         * @param {Object} interaction
    	         * @returns {Object} json format
    	         */
    	        getSerializedState : function() {
    	            return {};
    	        }
    	    };

    	    qtiCustomInteractionContext.register(numworxPCIplayer);
    	    return numworxPCIplayer;
    	}
)