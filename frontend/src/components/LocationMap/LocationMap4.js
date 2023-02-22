import React, { useState, useEffect } from "react";
import { Map, View, Feature } from "ol";
import { Point } from "ol/geom";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { OSM, Vector as VectorSource } from "ol/source";
import { Icon, Style } from "ol/style";

const LocationMap4 = () => {
  const [userLocation, setUserLocation] = useState({});
  const [shops, setShops] = useState([
    { name: "Shop 1", latitude: 18.989088, longitude: 75.760078 },
    { name: "Shop 2", latitude: 37.788022, longitude: -122.399797 },
    { name: "Shop 3", latitude: 37.7913, longitude: -122.3977 },
  ]);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    }
  }, []);

  useEffect(() => {
    if (Object.keys(userLocation).length === 0) {
      return;
    }

    const sortedShops = shops
      .map((shop) => ({
        ...shop,
        distance:
          Math.acos(
            Math.sin(userLocation.latitude) * Math.sin(shop.latitude) +
              Math.cos(userLocation.latitude) *
                Math.cos(shop.latitude) *
                Math.cos(shop.longitude - userLocation.longitude)
          ) * 6371,
      }))
      .sort((a, b) => a.distance - b.distance);

      const vectorSource = new VectorSource({
        features: [],
      });

    const map = new Map({
      target: null,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        new VectorLayer({
          source: vectorSource,
        }),
      ],
      view: new View({
        center: [userLocation.longitude, userLocation.latitude],
        zoom: 5,
      }),
    });



    setTimeout(() => {
      map.setTarget("map");
       const vectorSource = map.getLayers().getArray()[1].getSource();
       vectorSource.addFeatures(
         sortedShops.slice(0, 3).map((shop) =>
           new Feature({
             id: shop.name,
             geometry: new Point([shop.longitude, shop.latitude]),
             name: shop.name,
           }).setStyle(
             new Style({
               image: new Icon({
                 src: "https://png.pngtree.com/element_our/20190528/ourmid/pngtree-store-icon-image_1128274.jpg",
               }),
             })
           )
         )
       );
    }, 0);
  }, [userLocation]);

  return <div id="map" style={{ height: "400px" }} />;
};

export default LocationMap4;
