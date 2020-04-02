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
