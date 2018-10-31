import React, { Component } from "react";
import { altKeyOnly } from "ol/events/condition.js";
import CollectsTable from "./CollectsTable";
import "./CollectsTable.css";
import { DragBox, Draw, Select } from "ol/interaction.js";
import Feature from "ol/Feature";
import { fromExtent as polygonFromExtent } from "ol/geom/Polygon";
import LayerGroup from "ol/layer/Group";
import LayerSwitcher from "ol-layerswitcher";
import Map from "ol/Map.js";
import View from "ol/View.js";
import { Style, Fill, Stroke } from "ol/style.js";
import TileLayer from "ol/layer/Tile";
import TileWMS from "ol/source/TileWMS.js";
import { Vector as VectorLayer } from "ol/layer.js";
import { Vector as VectorSource } from "ol/source.js";
import "./OlMap.css";
import "ol/ol.css";
import "ol-layerswitcher/src/ol-layerswitcher.css";

class OlMap extends Component {
  state = {
    mapBbox: [],
  }

  initMap = params => {
    let baseMaps = [];
    let overlays = [];

    if (params.openLayersConfig.baseMaps) {
      baseMaps = params.openLayersConfig.baseMaps.map(function(item) {
        return new TileLayer({
          title: item.title,
          type: "base",
          source: new TileWMS({
            url: item.url,
            params: item.params,
            options: item.options
          }),
          extent: params.extent
        });
      });
    } else {
      baseMaps = [];
    }

    if (params.openLayersConfig.overlays) {
      overlays = params.openLayersConfig.overlays.map(function(item) {
        return new TileLayer({
          title: item.title,
          source: new TileWMS({
            url: item.url,
            params: item.params,
            options: item.options
          }),
          extent: params.extent
        });
      });
    } else {
      overlays = [];
    }

    const clearLayerSource = source => {
      if (source.getFeatures().length >= 1) {
        source.clear();
      }
    };

    const filterVectorSource = new VectorSource({
      wrapX: false
    });

    overlays.push(
      new VectorLayer({
        title: "Area of Interest",
        source: filterVectorSource,
        visible: true,
        extent: params.extent
      })
    );

    var layers = [
      new LayerGroup({
        title: "Base Maps",
        layers: baseMaps
      }),
      new LayerGroup({
        title: "Overlays",
        layers: overlays
      })
    ];

    var map = new Map({
      //  controls: ol.control.defaults().extend([
      //    new ol.control.ScaleLine({
      //      units: 'degrees'
      //    })
      //  ]),
      layers: layers,
      target: "map",
      view: new View({
        center: [0, 0],
        extent: params.extent,
        projection: "EPSG:4326",
        zoom: 3,
        minZoom: 2,
        maxZoom: 20
      })
    });

    //  const extent = params.extent;
    //  map.getView().fit(extent, map.getSize());

    const layerSwitcher = new LayerSwitcher({
      tipLabel: "Legend" // Optional label for button
    });
    map.addControl(layerSwitcher);

    const dragBox = new DragBox({
      condition: altKeyOnly,
      source: filterVectorSource,
      type: "Circle"
      //geometryFunction: Draw.createBox()
    });

    map.addInteraction(dragBox);

    const filterStyle = new Style({
      fill: new Fill({
        color: "rgba(255, 100, 50, 0.2)"
      }),
      stroke: new Stroke({
        width: 5.0,
        color: "rgba(255, 100, 50, 0.6)"
      })
    });

    dragBox.on("boxend", () => {
      clearLayerSource(filterVectorSource);

      const dragBoxExtent = dragBox.getGeometry().getExtent();

      const dragboxPoly = polygonFromExtent(dragBoxExtent);

      const searchPolygon = new Feature({
        geometry: dragboxPoly
      });

      searchPolygon.setStyle(filterStyle);
      filterVectorSource.addFeatures([searchPolygon]);

      console.log(dragBoxExtent);
      this.setState({mapBbox: dragBoxExtent});
      this.child.getNewData();

    });
  };

  componentDidMount() {
    this.initMap(PARAMS);
    console.log('map state: ', this.state.mapBbox);
  }

  render() {
    return (
      <div id="map">
        <CollectsTable mapData={this.state.mapBbox} ref={instance => { this.child = instance; }}/>
      </div>);
  }
}

export default OlMap;
