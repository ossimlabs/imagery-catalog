package omar.imagery.catalog.plugin

import org.geotools.factory.Hints

class OmarImageryCatalogBootStrap
{

    def init = { servletContext ->
        Hints.putSystemDefault(Hints.FORCE_LONGITUDE_FIRST_AXIS_ORDER, Boolean.TRUE)
    }
    def destroy = {
    }
}
