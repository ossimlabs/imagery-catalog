package omar.imagery.catalog.plugin

import org.grails.web.json.JSONObject
import org.springframework.beans.factory.annotation.Value

class BucketService
{
	@Value( '${aws.bucketName}' )
	String bucketName

	@Value( '${aws.profileName}' )
	String profileName

	@Value( '${aws.clientRegion}' )
	String clientRegion

	def scanBucket( JSONObject jsonObject )
	{
		def scanParams = [
			scanType: jsonObject.scanType,
			profileName: profileName,
			bucketName: bucketName,
			clientRegion: clientRegion
		]

		ScanBucketJob.triggerNow( scanParams )

		[ contentType: 'application/json', text: new JSONObject( timeStarted: new Date().format( "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", TimeZone.getTimeZone( 'UTC' ) ) ).toString() ]
	}
}
