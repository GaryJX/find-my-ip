import React, { useContext, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet';
import { useMediaQuery } from '@chakra-ui/react';
import GlobalContext from '@/context/GlobalContext';

type UpdateMapViewProps = {
  latitude: number;
  longitude: number;
  zoom: number;
};

const UpdateMapView: React.FC<UpdateMapViewProps> = ({ latitude, longitude, zoom }) => {
  const map = useMap();
  const { data } = useContext(GlobalContext);

  useEffect(() => {
    map.flyTo([latitude, longitude], zoom);
  }, [data, latitude, longitude, zoom]);

  return null;
};

const Map: React.FC = () => {
  const { data } = useContext(GlobalContext);
  const { latitude = 0, longitude = 0 } = data?.location || {};
  const zoom = latitude === 0 && longitude === 0 ? 1 : 12;
  const [isLargerThan48em] = useMediaQuery('(min-width: 48em)');
  // Offset used to better center the map for smaller screen sizes
  const mapLatitudeOffset = isLargerThan48em ? 0 : 0.02;

  return (
    <MapContainer center={[latitude + mapLatitudeOffset, longitude]} zoom={zoom} style={{ flex: 1 }}>
      <UpdateMapView latitude={latitude + mapLatitudeOffset} longitude={longitude} zoom={zoom} />
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {(latitude !== 0 || longitude !== 0) && <Marker position={[latitude, longitude]} />}
    </MapContainer>
  );
};

export default Map;
