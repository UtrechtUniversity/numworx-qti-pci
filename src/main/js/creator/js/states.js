define(
	[
    'taoQtiItem/qtiCreator/widgets/states/factory',
    'taoQtiItem/qtiCreator/widgets/interactions/blockInteraction/states/states',
    // hier states.... zie https://hub.taotesting.com/articles/qti/qti-item-creator
    'numworxPCIplayer/creator/js/states/Question',
    'numworxPCIplayer/creator/js/states/Answer',
    'numworxPCIplayer/creator/js/states/Correct',
    ], function(factory, states){
    //the mediaInteraction state bundle contains 2 custom states Question and Sleep
    //the third argument of createBundle() enable us to exclude the answer, correct and map states from the inherited blockInteraction states bundle
    return factory.createBundle(states, arguments, ['map']);
});
