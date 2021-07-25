import React from 'react';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';

type MapProps = {
  latitude: number;
  longitude: number;
};

const Map: React.FC<MapProps> = ({ latitude, longitude }) => {
  return (
    <MapContainer center={[latitude, longitude]} zoom={12} style={{ flex: 1 }}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[latitude, longitude]}></Marker>
    </MapContainer>
  );
};

export default Map;
