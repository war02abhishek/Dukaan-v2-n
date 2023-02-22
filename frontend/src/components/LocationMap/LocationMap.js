import React, { useState, useEffect } from "react";
import { usePosition } from "use-position";
import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";
import "./LocationMap.css";

const LocationMap = () => {
  const [selectedShop, setSelectedShop] = useState(null);
  const [shops, setShops] = useState([
    {
      lat: 37.7749,
      lng: -122.4194,
      name: "Shop 1",
      address: "123 Main St, San Francisco, CA 94111",
    },
    {
      lat: 40.7128,
      lng: -74.006,
      name: "Shop 2",
      address: "456 Broadway, New York, NY 10012",
    },
  ]);
  // const { latitude, longitude} = usePosition();
  let latitude = 40.7128;
  let longitude = 40.7128;

  const handleShopClick = (shop) => {
    setSelectedShop(shop);
  };

  const onMapClick = (event) => {
    setShops([...shops, { lat: event.latLng.lat(), lng: event.latLng.lng() }]);
  };

  return (
    <div className="map-container">
      <GoogleMap
        
        zoom={12}
        center={{ lat: latitude || 37.7749, lng: longitude || -122.4194 }}
        onClick={onMapClick}

      >
        {shops.map((shop) => (
          <Marker
            key={shop.name}
            position={{ lat: shop.lat, lng: shop.lng }}
            onClick={() => handleShopClick(shop)}
          />
        ))}
        {selectedShop && (
          <InfoWindow
            position={{ lat: selectedShop.lat, lng: selectedShop.lng }}
            onCloseClick={() => setSelectedShop(null)}
          >
            <div>
              <h2>{selectedShop.name}</h2>
              <p>{selectedShop.address}</p>
            </div>
          </InfoWindow>
        )}
        {latitude && (
          <Marker
            position={{ lat: latitude, lng: longitude }}
            icon={{
              url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
            }}
          />
        )}
      </GoogleMap>
    </div>
  );
};

export default LocationMap;
