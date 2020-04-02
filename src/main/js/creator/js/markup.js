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
