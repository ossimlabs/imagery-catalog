package omar.imagery.catalog.app

class UrlMappings {

    static mappings = {
        "/"(controller: 'imageryCatalogMap')
        "/$controller/$action?/$id?(.$format)?"{
            constraints {
                // apply constraints here
            }
        }

        "500"(view: '/error')
        "404"(view: '/notFound')
    }
}
