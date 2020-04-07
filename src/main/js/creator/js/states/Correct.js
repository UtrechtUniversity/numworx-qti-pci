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
                
// set initial and only correct response: { ... , "succes": true, ... }
        var correctResponse = [];    
        correctResponse.push('{ "success": true }');
        responseDeclaration.setCorrect(correctResponse);

    }, function(){
        var widget = this.widget;
        var interaction = widget.element;
        
    });
    return InteractionStateCorrect;
	});
