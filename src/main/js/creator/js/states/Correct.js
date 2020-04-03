define(
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
