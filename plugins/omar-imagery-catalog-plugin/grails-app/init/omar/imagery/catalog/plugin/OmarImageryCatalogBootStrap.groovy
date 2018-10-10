package omar.imagery.catalog.plugin

import org.geotools.factory.Hints

class OmarImageryCatalogBootStrap
{
	def quartzScheduler
	
	def init = { servletContext ->
		Hints.putSystemDefault( Hints.FORCE_LONGITUDE_FIRST_AXIS_ORDER, Boolean.TRUE )
		
		def bucketScanJobListener = new BucketScanJobListener()
		def bucketScanTriggerListener = new BucketScanTriggerListener()
		
		
		quartzScheduler.listenerManager.addJobListener( bucketScanJobListener,
			/*KeyMatcher.keyEquals( new JobKey( ScanBucketJob.name ) )*/ )
		
		quartzScheduler.listenerManager.addTriggerListener( bucketScanTriggerListener )
	}
	
	def destroy = {
	}
}
