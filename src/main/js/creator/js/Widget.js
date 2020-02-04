define(
	'numworxPCIplayer/creator/js/Widget',	
	[
    'taoQtiItem/qtiCreator/widgets/interactions/customInteraction/Widget',
], function(Widget){
    'use strict';

    var InteractionWidget = Widget.clone();

    InteractionWidget.initCreator = function(){

        //this.registerStates(states);

        Widget.initCreator.call(this);

        //for existing likert scale PCI, ensure that the rp template is always NONE
        this.element.getResponseDeclaration().setTemplate('NONE');
    };
    
    return InteractionWidget;
});
