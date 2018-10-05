package omar.imagery.catalog.plugin

class BucketController
{
	BucketService bucketService
	
	static allowedMethods = [ scanBucket: 'POST' ]
	
	def scanBucket()
	{
		render bucketService.scanBucket( request.JSON )
	}
}
