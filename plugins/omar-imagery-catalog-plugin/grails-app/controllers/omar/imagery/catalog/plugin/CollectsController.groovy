package omar.imagery.catalog.plugin

import grails.async.web.AsyncController

class CollectsController implements AsyncController
{
	CollectsService collectsService
	
	def getTile()
	{
		def ctx = startAsync()
		
		ctx.start {
			render collectsService.getTile( params )
			webRequest.renderView = false
			ctx.complete()
		}
	}
}
