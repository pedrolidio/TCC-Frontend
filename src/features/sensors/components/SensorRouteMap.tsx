'use client';

import { MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const setupLeafletIcons = () => {
  if (typeof window === 'undefined') return;
  
  const iconRetinaUrl = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png';
  const iconUrl = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png';
  const shadowUrl = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png';

  const DefaultIcon = L.icon({
    iconUrl,
    iconRetinaUrl,
    shadowUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41]
  });

  L.Marker.prototype.options.icon = DefaultIcon;
};

setupLeafletIcons();

interface SensorRouteMapProps {
  positions: [number, number][];
}

export default function SensorRouteMap({ positions }: SensorRouteMapProps) {
  if (!positions || positions.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center bg-gray-100 rounded-lg border border-gray-300">
        <p className="text-gray-500">Sem rota definida para exibição.</p>
      </div>
    );
  }

  const startPosition = positions[0];
  const endPosition = positions[positions.length - 1];

  return (
    <div className="h-96 w-full rounded-lg overflow-hidden border border-gray-300 shadow-sm isolate z-0">
      <MapContainer 
        center={startPosition} 
        zoom={15} 
        scrollWheelZoom={false} 
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <Polyline 
          positions={positions} 
          pathOptions={{ color: 'blue', weight: 4 }} 
        />

        <Marker position={startPosition}>
          <Popup>Início do percurso</Popup>
        </Marker>

        <Marker position={endPosition}>
          <Popup>Fim do percurso</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}