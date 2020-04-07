define( 
		'numworxPCIplayer/pciCreator',
		[
		'numworxPCIplayer/creator/js/Widget',
		'numworxPCIplayer/creator/js/markup'
		],
		function(Widget, markupTpl) {
		'use strict';
	    var _typeIdentifier = 'numworxPCIplayer';
		var numworxPciPlayer = {
			        /**
			         * (required) Get the typeIdentifier of the custom interaction
			         *
			         * @returns {String}
			         */
			        getTypeIdentifier : function(){
			            return _typeIdentifier;
			        },
			        /**
			         * (required) Get the widget prototype
			         * Used in the renderer
			         *
			         * @returns {Object} Widget
			         */
			        getWidget : function(){
			            return Widget;
			        },
			        /**
			         * (optional) Get the default properties values of the pci.
			         * Used on new pci instance creation
			         *
			         * @returns {Object}
			         */
			        getDefaultProperties : function(pci) {
			            return {
			            	'sco': "https://app.dwo.nl/dwo/rest/public/scoData/getJSONLaunchDataBytes?scoId=674042",
			            	'width': 400,
			            	'height': 400,
			            	'cas': "https://app.dwo.nl/ideas/IdeasServlet",
			            	'css': "https://app.dwo.nl/dwo/rest/public/scoData/get/674042/style.css",
			            	'engine': "https://cdn.dwo.nl/apps/",
			            	'locale': 'fr'
			            };
			        },
			        /**
			         * (optional) Callback to execute on the
			         * Used on new pci instance creation
			         *
			         * @returns {Object}
			         */
			        afterCreate : function(pci){
			        },
			        /**
			         * (required) Gives the qti pci xml template
			         *
			         * @returns {function} handlebar template
			         */
			        getMarkupTemplate : function(){
			            return markupTpl;
			        },
			        /**
			         * (optional) Allows passing additional data to xml template
			         *
			         * @returns {function} handlebar template
			         */
			        getMarkupData : function(pci, defaultData){
			        	defaultData.sco = pci.prop('sco')
			        	defaultData.height = pci.prop('height')
			        	defaultData.width = pci.prop('width')
			        	defaultData.locale = pci.prop('locale')
			        	defaultData.engine = pci.prop('engine')
			        	defaultData.cas = pci.prop('cas')
			        	defaultData.css = pci.prop('css')
			            return defaultData;
			        }
			}
		
			return numworxPciPlayer;
		}
	)
