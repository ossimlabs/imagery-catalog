package omar.imagery.catalog.plugin

import geoscript.GeoScript
import geoscript.filter.Filter
import geoscript.geom.Bounds
import geoscript.render.Map as GeoScriptMap
import geoscript.workspace.PostGIS

import org.springframework.beans.factory.annotation.Value
import org.springframework.util.FastByteArrayOutputStream

import javax.imageio.ImageIO
import java.awt.image.BufferedImage

import static geoscript.style.Symbolizers.fill
import static geoscript.style.Symbolizers.stroke

import java.time.OffsetDateTime

class CollectsService
{
	GeoScriptConfig geoScriptConfig
	
	@Value( '${collects.databaseName}' )
	String databaseName
	
	def messageSource

//	def getTile( def params )
//	{
//		def image = new BufferedImage( 256, 256, BufferedImage.TYPE_INT_ARGB )
//		def ostream = new FastByteArrayOutputStream( image.width * image.height * 4 )
//
//		ImageIO.write( image, 'png', ostream )
//
//		[ contentType: 'image/png', file: ostream.inputStream ]
//	}
	
	def getTile( def params )
	{
//		println params
		
		Integer width = params?.find { it.key.toUpperCase() == 'WIDTH' }?.value?.toInteger()
		Integer height = params?.find { it.key.toUpperCase() == 'HEIGHT' }?.value?.toInteger()
		List<Double> bbox = params?.find { it.key.toUpperCase() == 'BBOX' }?.value?.split( ',' )*.toDouble()
		String srs = params?.find { it.key.toUpperCase() == 'SRS' }?.value
		String layers = params?.find { it.key.toUpperCase() == 'LAYERS' }?.value
		
		def ostream = new FastByteArrayOutputStream( width * height * 4 )
		def postgis = new PostGIS( databaseName, user: 'postgres' )
		def layer = postgis[layers]
		
		layer.style = stroke( color: 'blue' ) + fill( opacity: 0 )

//		println  "proj: ${layer.proj}"
		
		def bounds = new Bounds( *bbox, srs )
		
		def renderParams = [
			width: width,
			height: height,
			bounds: bounds,
			proj: bounds.proj,
			layers: [
				layer
			]
		]

//		println renderParams
		
		def map = new GeoScriptMap( renderParams )
		
		try
		{
			map.render( ostream )
		}
		catch ( e )
		{
			System.err.println e.message
		}
		finally
		{
			map.close()
		}
		
		postgis?.close()
		
		[ contentType: 'image/png', file: ostream.inputStream ]
	}
	
	def loadCSV()
	{
		def file = '/tmp/prefixes.txt' as File
		
		file.eachLine { line ->
			def record = line.split( ',' )
			
			def footprint = new Bounds( record[1].toDouble(), record[2].toDouble(), record[3].toDouble(), record[4].toDouble(), 'epsg:4326' )?.polygon?.g
			
			footprint.setSRID( 4326 )
			
			def feature = new ImageCollect(
				prefix: record[0],
				footprint: footprint,
				startDate: OffsetDateTime.parse( record[5] ),//.toInstant(),
				endDate: OffsetDateTime.parse( record[6] )//.toInstant()
			)
			
			if ( !feature.save() )
			{
				feature.errors.allErrors.each { e ->
					System.err.println messageSource.getMessage( e, Locale.default )
				}
			}
		}
	}
	
	def getData( def query )
	{
//		println query
		
		def postgis = new PostGIS( databaseName, user: 'postgres' )
		def layer = postgis['collects']
		
		def data = layer.getFeatures(
			max: query.pageSize,
			start: query.page,
			filter: query.filtered ?: Filter.PASS,
			sort: query.sorted ? [ [ query.sorted, query.order ] ] : [ [ 'prefix','asc' ] ]
		)?.collect { it.attributes }
		
		def count = layer.count( query.filtered ?: Filter.PASS )
		
		postgis?.close()
		
		[ count: count, data: data ]
	}
}
