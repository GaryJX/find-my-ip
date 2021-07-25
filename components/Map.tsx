import React from 'react';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet';
import { useContext } from 'react';
import { GlobalContext } from 'pages';
import { useEffect } from 'react';

const UpdateMapView: React.FC = () => {
  const map = useMap();
  const { data } = useContext(GlobalContext);

  useEffect(() => {
    const { latitude = 0, longitude = 0 } = data?.location || {};
    const zoom = latitude === 0 && longitude === 0 ? 1 : 12;
    map.flyTo([latitude, longitude], zoom);
  }, [data]);

  return null;
};

const Map: React.FC = () => {
  const { data } = useContext(GlobalContext);
  const { latitude = 0, longitude = 0 } = data?.location || {};
  const zoom = latitude === 0 && longitude === 0 ? 1 : 12;

  return (
    <MapContainer center={[latitude, longitude]} zoom={zoom} style={{ flex: 1 }}>
      <UpdateMapView />
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[latitude, longitude]} />
    </MapContainer>
  );
};

export default Map;
