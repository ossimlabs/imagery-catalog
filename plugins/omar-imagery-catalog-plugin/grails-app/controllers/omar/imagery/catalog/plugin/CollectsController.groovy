package omar.imagery.catalog.plugin

import grails.async.web.AsyncController
import grails.converters.JSON

class CollectsController implements AsyncController
{
	CollectsService collectsService

	def getTile()
	{
		def ctx = startAsync()

		ctx.start {
			render collectsService.getTile( params )
			ctx.complete()
		}
	}

	def getData()
	{
		println params

		def query = [
			pageSize: params.pageSize?.toInteger() ?: 10,
			page: ( params.page?.toInteger() ?: 1 ) - 1,
			sorted: params.sorted,
			order: params.order,
			filter: params.filter
		]

		def results = collectsService.getData( query )
		render contentType: 'application/json', text: [
			columns: [ [
				Header: 'Prefix',
				accessor: 'prefix',
			], [
				Header: 'Start Date',
				accessor: 'start_date',
			], [
				Header: 'End Date',
				accessor: 'end_date',
//			], [
//				Header: 'Geometry',
//				accessor: 'the_geom',
			] ],
			data: results.data,
			pages: Math.ceil(results.count / query.pageSize)
		] as JSON
	}
}
