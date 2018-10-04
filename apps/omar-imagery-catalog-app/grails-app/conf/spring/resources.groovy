import omar.imagery.catalog.OpenLayersConfig

// Place your Spring DSL code here
beans = {
	openLayersConfig( OpenLayersConfig )
	openLayersLayerConverter( OpenLayersConfig.OpenLayersLayerConverter )
}
