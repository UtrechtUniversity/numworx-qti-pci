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
    		return "<div>" +
//    		`<label>Width: <input name='width' value='${o.width}' ><label></p>` +
    		`<p><label>Height: <input name='height' value='${o.height}' ><label></p>` +
    		`<p><label>Activity: <input name='sco' value='${o.sco}' ><label></p>` +
    		`<p><label>Style: <input name='css' value='${o.css}' ><label></p>` +
    		`<p><label>Engine: <input name='engine' value='${o.engine}' ><label></p>` +
    		`<p><label>CAS: <input name='cas' value='${o.cas}' ><label></p>` +
    		`<p><label>Locale: <input name='locale' value='${o.locale}' ><label></p>` +
    		"</div>"
    		;   		
    	}
    	
    	var _widget = this.widget,
        	$form = _widget.$form,
        	interaction = _widget.element,
        	response = interaction.getResponseDeclaration(),
        	width = parseInt(interaction.prop('width')) || 800,
        	height = parseInt(interaction.prop('height')) || 400,
        	locale = interaction.prop('locale')|| "fr",
        	sco    = interaction.prop('sco') || "",
        	css    = interaction.prop('css') || "",
        	engine = interaction.prop('engine') || "https://cdn.dwo.nl/apps/",
        	cas    = interaction.prop('cas') || "https://app.dwo.nl/ideas/IdeasServlet";
    	
    	
    	
//render the form using the form template
        $form.html(formTpl({ 'width':width, 'height':height, 'sco':sco,
        					 'css': css, 'engine': engine, 'cas':cas, 'locale': locale}));
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
                interaction.triggerPci('scochange', [value]);
            },
            engine : function(interaction, value) {

                //update the pci property value:
                interaction.prop('engine', value);

                //trigger change event:
                interaction.triggerPci('enginechange', [value]);
            },
            css : function(interaction, value) {

                //update the pci property value:
                interaction.prop('css', value);

                //trigger change event:
                interaction.triggerPci('csschange', [value]);
            },
            cas : function(interaction, value) {

                //update the pci property value:
                interaction.prop('cas', value);

                //trigger change event:
                interaction.triggerPci('caschange', [value]);
            },
            locale : function(interaction, value) {

                //update the pci property value:
                interaction.prop('locale', value);

                //trigger change event:
                interaction.triggerPci('localechange', [value]);
            }

        });

    };

    return InteractionStateQuestion;
});
