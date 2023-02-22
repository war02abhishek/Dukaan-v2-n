import { useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

export default function LocationM() {
  const { isLoaded } = useLoadScript({
    // googleMapsApiKey: "AIzaSyDjcJN33EzE1cL8ctsKc-b81oJEzvz-U7I",
    googleMapsApiKey: "AIzaSyBJ33n343MrV-Gxa5AtttVOJE1vXsiiJXU",
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map />;
}

function Map() {
  const center = useMemo(() => ({ lat: 44, lng: -80 }), []);
  console.log("map");

  return (
    <GoogleMap zoom={10} center={center} mapContainerClassName="map-container">
      <Marker position={center} />
    </GoogleMap>
  );
}
