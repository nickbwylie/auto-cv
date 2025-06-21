import {
  MapContainer,
  TileLayer,
  Polyline,
  Marker,
  useMap,
} from "react-leaflet";
import { LatLngExpression, icon } from "leaflet";
import { useEffect } from "react";

interface TrailMapProps {
  trail: LatLngExpression[];
  hikerPosition: LatLngExpression;
}

const MapAutoFit = ({ trail }: { trail: LatLngExpression[] }) => {
  const map = useMap();
  useEffect(() => {
    map.fitBounds(trail);
  }, [trail, map]);
  return null;
};

// Optional: custom hiker icon
const hikerIcon = icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

export default function TrailMap({ trail, hikerPosition }: TrailMapProps) {
  return (
    <MapContainer
      style={{ height: "400px", width: "100%" }}
      zoom={13}
      scrollWheelZoom={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="© OpenStreetMap contributors"
      />
      <Polyline positions={trail} color="blue" />
      <Marker position={hikerPosition} icon={hikerIcon} />
      <MapAutoFit trail={trail} />
    </MapContainer>
  );
}
