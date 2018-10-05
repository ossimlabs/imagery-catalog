package omar.imagery.catalog.plugin

import omar.imagery.catalog.lib.aws.BucketScanner

class ScanBucketJob
{
	
	static triggers = {}
	
	def execute( def context )
	{
		println context.mergedJobDataMap
		
		String scanType = context.mergedJobDataMap.scanType
		String profileName = context.mergedJobDataMap.profileName
		String bucketName = context.mergedJobDataMap.bucketName
		
		BucketScanner.scan( scanType, bucketName, profileName )
	}
}
