import React, { Component } from "react";
import "ol/ol.css";
import 'ol-layerswitcher/src/ol-layerswitcher.css';
import Map from 'ol/Map.js';
import View from 'ol/View.js';
//import {defaults as defaultControls, ScaleLine} from 'ol/control.js';
import LayerGroup from 'ol/layer/Group';
import TileLayer from 'ol/layer/Tile';
import TileWMS from 'ol/source/TileWMS.js';
import LayerSwitcher from 'ol-layerswitcher';

class OlMap extends Component {

  initMap = (params) => {
    var baseMaps;
    var overlays;

    if  ( params.openLayersConfig.baseMaps ) {
      baseMaps = params.openLayersConfig.baseMaps.map(function(item) {
            return new TileLayer({
               title: item.title,
               type: 'base',
               source: new TileWMS({
                 url: item.url,
                 params: item.params,
                 options: item.options
               }),
               extent: params.extent
             })
     });
   } else {
     baseMaps = [];
   }

   if  ( params.openLayersConfig.overlays ) {
      overlays = params.openLayersConfig.overlays.map(function(item) {
            return new TileLayer({
               title: item.title,
               source: new TileWMS({
                 url: item.url,
                 params: item.params,
                 options: item.options
               }),
               extent: params.extent
             })
     });
   } else {
     overlays = [];
   }

  //  overlays.push(
  //     new Vector({
  //        title: 'Area of Interest',
  //        source: filterVectorSource,
  //        visible: true,
  //        extent: params.extent
  //      })
  //  );

  //  var filterVectorSource = new source.Vector({
  //      wrapX: false
  //  });

   var layers = [
     new LayerGroup({
         title: 'Base Maps',
         layers: baseMaps
     }),
     new LayerGroup({
         title: 'Overlays',
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
     target: 'map',
     view: new View({
       center: [0, 0],
       extent: params.extent,
       projection: "EPSG:4326",
       zoom: 3,
       minZoom: 2,
       maxZoom: 20
     })
   });

   var extent = params.extent;
   map.getView().fit(extent, map.getSize());

   var layerSwitcher = new LayerSwitcher({
         tipLabel: 'Légende' // Optional label for button
   });
   map.addControl(layerSwitcher);


    //  var dragBox = new ol.interaction.DragBox({
    //      condition: ol.events.condition.altKeyOnly,
    //      source: filterVectorSource,
    //      type: 'Circle',
    //      geometryFunction: ol.interaction.Draw.createBox()
    //  });

     //map.addInteraction(dragBox);

    //  var filterStyle = new ol.style.Style({
    //    fill: new ol.style.Fill({
    //      color: "rgba(255, 100, 50, 0.2)"
    //    }),
    //    stroke: new ol.style.Stroke({
    //      width: 5.0,
    //      color: "rgba(255, 100, 50, 0.6)"
    //    })
    //  });

  //  dragBox.on("boxend", function() {
  //    clearLayerSource(filterVectorSource);

  //    var dragBoxExtent = dragBox.getGeometry().getExtent();

  //    var searchPolygon = new ol.Feature({
  //      geometry: new ol.geom.Polygon.fromExtent(dragBoxExtent)
  //    });

  //    searchPolygon.setStyle(filterStyle);
  //    filterVectorSource.addFeatures([searchPolygon]);

  //    console.log(dragBoxExtent);
  //  });
  }

  componentDidMount(){
    this.initMap(PARAMS);
  }

  render() {
    return <div id="map" />;
  }

}

export default OlMap;