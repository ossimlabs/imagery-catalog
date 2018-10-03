package omar.imagery.catalog.app

import omar.imagery.catalog.OpenLayersConfig

class ImageryCatalogMapController {
    OpenLayersConfig openLayersConfig
    def index() {
        [ collectsParams: [
			openLayersConfig: openLayersConfig,
			extent: [-180, -90, 180, 90]]
		]
    }
}
