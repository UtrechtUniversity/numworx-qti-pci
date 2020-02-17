define(
		'numworxPCIplayer/creator/js/markup',
		[],
		function() {			
			return function(object) { 
				// XHTML
				return `<div class="numworxPCIplayer"><iframe width='${object.width}' height='${object.height}'></iframe></div>`
			}
		}
)

define(
	'numworxPCIplayer/creator/widget/states/Correct',

[
    'taoQtiItem/qtiCreator/widgets/states/factory',
    'taoQtiItem/qtiCreator/widgets/states/Correct',
    'lodash'
], function(stateFactory, Correct, _){

    var InteractionStateCorrect = stateFactory.create(Correct, function(){
    
        var widget = this.widget;
        var interaction = widget.element;
        var responseDeclaration = interaction.getResponseDeclaration();
                
// set initial and only correct response: 100
        var correctResponse = [];    
        correctResponse.push(100);
        responseDeclaration.setCorrect(correctResponse);

    }, function(){
        var widget = this.widget;
        var interaction = widget.element;
        
    });
    return InteractionStateCorrect;
	});



define(
	    'numworxPCIplayer/creator/widget/states/Question',
[
    'taoQtiItem/qtiCreator/widgets/states/factory',
    'taoQtiItem/qtiCreator/widgets/interactions/states/Question',
    'taoQtiItem/qtiCreator/widgets/helpers/formElement',
    'taoQtiItem/qtiCreator/editor/simpleContentEditableElement',
    'taoQtiItem/qtiCreator/editor/containerEditor',
    'lodash',
    'jquery'
], function(stateFactory, Question, formElement, simpleEditor, containerEditor,  _, $){
    'use strict';

    var InteractionStateQuestion = stateFactory.extend(Question, function(){

        var $container = this.widget.$container,
            interaction = this.widget.element,
            $iframe = $container.find('iframe');
        $iframe.addClass('sleep');


    }, function(){

        var $container = this.widget.$container,
        	interaction = this.widget.element,
            $iframe = $container.find('iframe');
           
        simpleEditor.destroy($container);
        interaction.updateMarkup();
        $iframe.attr("width", interaction.prop('width'))
		$iframe.attr("height", interaction.prop('height'))
    });

    InteractionStateQuestion.prototype.initForm = function(){

    	function formTpl(o) {
    		return `<p><label>Width: <input name='width' value='${o.width}' ><label></p>` +
    		`<p><label>Height: <input name='height' value='${o.height}' ><label></p>` +
    		`<p><label>Activity: <input name='sco' value='${o.sco}' ><label></p>`;   		
    	}
    	
    	var _widget = this.widget,
        $form = _widget.$form,
        interaction = _widget.element,
        response = interaction.getResponseDeclaration(),
        width = parseInt(interaction.prop('width')) || 800,
        height = parseInt(interaction.prop('height')) || 400,
        sco    = parseInt(interaction.prop( 'sco')) || "";
//render the form using the form template
        $form.html(formTpl({ 'width':width, 'height':height, 'sco':sco}));
//init form javascript
        formElement.initWidget($form);

        //init data change callbacks
        formElement.setChangeCallbacks($form, interaction, {
            width : function(interaction, value) {

                //update the pci property value:
                interaction.prop('width', value);

                //trigger change event:
                interaction.triggerPci('widthchange', [parseInt(value)]);
            },
            height : function(interaction, value) {

                //update the pci property value:
                interaction.prop('height', value);

                //trigger change event:
                interaction.triggerPci('heightchange', [parseInt(value)]);
            },
            sco : function(interaction, value) {

                //update the pci property value:
                interaction.prop('sco', value);

                //trigger change event:
                interaction.triggerPci('scochange', [parseInt(value)]);
            }

        });

    };

    return InteractionStateQuestion;
});


define(
	'numworxPCIplayer/creator/widget/states/Answer',
[
    'taoQtiItem/qtiCreator/widgets/states/factory',
    'taoQtiItem/qtiCreator/widgets/interactions/states/Answer',
    'taoQtiItem/qtiCreator/widgets/interactions/helpers/answerState'
], function(stateFactory, Answer, answerStateHelper){

    var InteractionStateAnswer = stateFactory.extend(Answer, function(){
        
        //forward to one of the available sub state, according to the response processing template
        answerStateHelper.forward(this.widget);
        
    }, function(){
        
    });

    InteractionStateAnswer.prototype.initResponseForm = function() {
        answerStateHelper.initResponseForm(this.widget, {
            rpTemplates: ["CUSTOM", 'MATCH_CORRECT', "NONE"]
        })
    }   
    return InteractionStateAnswer;
});




define(
	'numworxPCIplayer/creator/js/states',
	[
    'taoQtiItem/qtiCreator/widgets/states/factory',
    'taoQtiItem/qtiCreator/widgets/interactions/blockInteraction/states/states',
    // hier states.... zie https://hub.taotesting.com/articles/qti/qti-item-creator
    'numworxPCIplayer/creator/widget/states/Question',
    'numworxPCIplayer/creator/widget/states/Answer',
    'numworxPCIplayer/creator/widget/states/Correct',
    ], function(factory, states){
    //the mediaInteraction state bundle contains 2 custom states Question and Sleep
    //the third argument of createBundle() enable us to exclude the answer, correct and map states from the inherited blockInteraction states bundle
    return factory.createBundle(states, arguments, ['map']);
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

        var $container = this.$container,
        $iframe = $container.find('iframe');
        $iframe.addClass('sleep');

        var interaction = this.element;
        var responseDeclaration = interaction.getResponseDeclaration();
        if (! responseDeclaration.getCorrect()) {       
// set initial and only correct response: 100, only if not set already.
        	var correctResponse = [];    
        	correctResponse.push(100);
        	responseDeclaration.setCorrect(correctResponse);
        }
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
			            	'sco': 674042,
			            	'width': 400,
			            	'height': 400
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
			            return defaultData;
			        }
			}
		
			return numworxPciPlayer;
		}
	)

	
define ( ['numworxPCIplayer/pciCreator'], function(PCI) { return PCI;})