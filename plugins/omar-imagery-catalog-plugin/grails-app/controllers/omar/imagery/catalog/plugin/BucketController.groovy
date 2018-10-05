package omar.imagery.catalog.plugin

class BucketController
{
	BucketService bucketService
	
	static allowedMethods = [ scanBucket: 'POST' ]
	
	def scanBucket()
	{
		bucketService.scanBucket( request.JSON )
	}
}
