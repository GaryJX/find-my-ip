import React from 'react';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import { useContext } from 'react';
import { GlobalContext } from 'pages';

const Map: React.FC = () => {
  const data = useContext(GlobalContext);
  const { latitude = 0, longitude = 0 } = data?.location || {};

  return (
    <MapContainer center={[latitude, longitude]} zoom={12} style={{ flex: 1 }}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[latitude, longitude]} />
    </MapContainer>
  );
};

export default Map;
