import React, { useState, useEffect } from "react";
import { Map, View, Feature } from "ol";
import { Point } from "ol/geom";
import { Tile as TileLayer } from "ol/layer";
import { Vector as VectorLayer } from "ol/layer";
import { OSM } from "ol/source";
import { Vector as VectorSource } from "ol/source";
import { Style, Icon } from "ol/style";
import { fromLonLat } from "ol/proj";

import {FaShopify} from 'react-icons/fa'
import {RiUserLocationFill} from 'react-icons/ri'

import'./LocationMap.css'


const LocationMap3 = () => {
  const [userCoords, setUserCoords] = useState(null);
  const [shopCoords, setShopCoords] = useState([]);
  const [map, setMap] = useState(null);

  useEffect(() => {
    // Request user's location
    navigator.geolocation.getCurrentPosition((position) => {
      setUserCoords([position.coords.longitude, position.coords.latitude]);
    });

    // Example shop location
    setShopCoords([
      [77.218788, 28.632429],
      [77.284563, 28.615841],
      [77.218788, 28.632429],
      [77.13131, 28.7331],
    ]);
  }, []);

  useEffect(() => {
    if (userCoords && shopCoords.length>0) {
      const userLocation = fromLonLat(userCoords);
      // const shopLocation = fromLonLat(shopCoords);
       const features = shopCoords.map((coords) => {
        return new Feature({
          geometry: new Point(fromLonLat(coords)),
          name: "Shop Location",
        });
      });

            features.unshift(
        new Feature({
          geometry: new Point(userLocation),
          name: "User Location",
        })
      );

      setMap(
        new Map({
          target: null,
          layers: [
            new TileLayer({
              source: new OSM(),
            }),
            new VectorLayer({
              source: new VectorSource({
                features
              }),
              style: (feature) => {
                return new Style({
                  image: new Icon({
                    src:
                      feature.get("name") === "User Location"
                        ? "https://static.thenounproject.com/png/96290-200.png"
                        : "https://static.thenounproject.com/png/1388557-200.png",
                  }),
                });
              },
            }),
          ],
          view: new View({
            center: userLocation,
            zoom: 17,
          }),
        })
      );
    }
  }, [userCoords, shopCoords]);

  useEffect(() => {
    if (map) {
      map.setTarget("map");
    }
  }, [map]);

  return <div id="map" style={{ width: "80%", height: "500px",marginTop:"5rem",marginLeft:"10rem" }} />;
};

export default LocationMap3;















// import React, { useState, useEffect } from "react";
// import { Map, View, Feature } from "ol";
// import { Point } from "ol/geom";
// import { Tile as TileLayer } from "ol/layer";
// import { Vector as VectorLayer } from "ol/layer";
// import { OSM } from "ol/source";
// import { Vector as VectorSource } from "ol/source";
// import { Style,Icon } from "ol/style";
// import { fromLonLat } from "ol/proj";

// import {FaShopify} from 'react-icons/fa'
// import {RiUserLocationFill} from 'react-icons/ri'

// import'./LocationMap.css'


// const LocationMap3 = () => {
//   const [userCoords, setUserCoords] = useState(null);
//   const [shopCoords, setShopCoords] = useState([]);
//   const [map, setMap] = useState(null);

//   useEffect(() => {
//     // Request user's location
//     navigator.geolocation.getCurrentPosition((position) => {
//       setUserCoords([position.coords.longitude, position.coords.latitude]);
//     });

//     // Example shop locations
//     setShopCoords([[77.294563, 28.605841], [77.284563, 28.615841]]);
//   }, []);

//   useEffect(() => {
//     if (userCoords && shopCoords.length > 0) {
//       const userLocation = fromLonLat(userCoords);

//       const features = shopCoords.map((coords) => {
//         return new Feature({
//           geometry: new Point(fromLonLat(coords)),
//           name: "Shop Location",
//         });
//       });

//       features.unshift(
//         new Feature({
//           geometry: new Point(userLocation),
//           name: "User Location",
//         })
//       );

//       setMap(
//         new Map({
//           target: null,
//           layers: [
//             new TileLayer({
//               source: new OSM(),
//             }),
//             new VectorLayer({
//               source: new VectorSource({
//                 features,
//               }),
//                style: (feature) => {
//                 return new Style({
//                   image: new Icon({
//                     src:
//                       feature.get("name") === "User Location"
//                         ? "https://static.thenounproject.com/png/96290-200.png"
//                         : "https://static.thenounproject.com/png/96290-200.png",
//                   }),
//                 });
//               },
//             }),
//           ],
//           view: new View({
//             center: userLocation,
//             zoom: 14,
//           }),
//         })
//       );
//     }
//   }, [userCoords, shopCoords]);

//   useEffect(() => {
//     if (map) {
//       map.setTarget("map");
//     }
//   }, [map]);

//   return <div id="map" style={{ width: "80%", height: "400px",marginTop:"5rem",marginLeft:"5rem" }} />;
// };

// export default LocationMap3;
