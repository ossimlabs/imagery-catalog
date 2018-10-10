package omar.imagery.catalog.plugin

import groovy.transform.ToString
import com.vividsolutions.jts.geom.Polygon

import java.time.OffsetDateTime

@ToString( includeNames = true )
class ImageCollect
{
	String prefix
	OffsetDateTime startDate
	OffsetDateTime endDate
	Polygon footprint
	
	static constraints = {
	}
	
	static mapping = {
		id generator: 'identity'
		startDate sqlType: 'timestamp with time zone'
		endDate sqlType: 'timestamp with time zone'
		footprint sqlType: 'geometry(Polygon, 4326)'
	}
}
