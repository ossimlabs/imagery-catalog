package omar.imagery.catalog.app

import omar.imagery.catalog.plugin.ImageCollect

class BootStrap
{
	def collectsService
	def grailsApplication
	
	def init = { servletContext ->
		
//		if ( ImageCollect.count() == 0 )
//		{
//			collectsService.loadCSV()
//		}
		
			println grailsApplication.config.quartz.jdbcStore
	}
	def destroy = {
	}
}
