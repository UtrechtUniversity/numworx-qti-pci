console.log("pcicreator.js")
define(
		'numworxPCIplayer/creator/js/markup',
		[],
		function() {			
			return function(object) { 
				return'<div class="numworx">MARKUP.TPL ' + object.sco  + ' </div>'
			}
		}
)

define(
	'numworxPCIplayer/creator/js/states',
	[
    'taoQtiItem/qtiCreator/widgets/states/factory',
    'taoQtiItem/qtiCreator/widgets/interactions/blockInteraction/states/states',
    // hier states.... zie https://hub.taotesting.com/articles/qti/qti-item-creator
    ], function(factory, states){
    //the mediaInteraction state bundle contains 2 custom states Question and Sleep
    //the third argument of createBundle() enable us to exclude the answer, correct and map states from the inherited blockInteraction states bundle
    return factory.createBundle(states, arguments, ['answer', 'correct', 'map']);
});


define(
	'numworxPCIplayer/creator/js/Widget',	
	[
    'taoQtiItem/qtiCreator/widgets/interactions/customInteraction/Widget',
    'numworxPCIplayer/creator/js/states'
], 
function(Widget, states){
    'use strict';

    var InteractionWidget = Widget.clone();

    InteractionWidget.initCreator = function(){

        this.registerStates(states);

        Widget.initCreator.call(this);

        //for existing likert scale PCI, ensure that the rp template is always NONE
        this.element.getResponseDeclaration().setTemplate('NONE');
    };
    
    return InteractionWidget;
});


define( 
		'numworxPCIplayer/pciCreator',
		[
		'numworxPCIplayer/creator/js/Widget',
		'numworxPCIplayer/creator/js/markup'
		],
		function(Widget, markupTpl) {
		'use strict';
	    var _typeIdentifier = 'numworxPCIplayer';
	    console.log("pciCREATOR AMD");
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
			        getDefaultProperties : function(pci){
			            return {
			            	'sco': 12356
			            };
			        },
			        /**
			         * (optional) Callback to execute on the
			         * Used on new pci instance creation
			         *
			         * @returns {Object}
			         */
			        afterCreate : function(pci){
			            //always set the NONE response processing mode
			            pci.getResponseDeclaration().setTemplate('NONE');
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
			        	defaultData.sco = pci.properties.sco;
			            return defaultData;
			        }
			}
		
			return numworxPciPlayer;
		}
	)

	
define ( ['numworxPCIplayer/pciCreator'], function(PCI) { return PCI;})