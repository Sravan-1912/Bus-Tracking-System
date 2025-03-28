import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Icon, LatLngBounds, DivIcon } from 'leaflet';
import { Bus, BusRoute, BusStop } from '../types';

// Create a separate component to handle map bounds updates
const MapBoundsUpdater = ({ bounds }: { bounds: LatLngBounds | null }) => {
  const map = useMap();
  
  useEffect(() => {
    if (bounds) {
      map.fitBounds(bounds);
    }
  }, [map, bounds]);
  
  return null;
};

interface BusMapProps {
  buses: Bus[];
  routes: BusRoute[];
  selectedRoute: string | null;
}

const BusMap: React.FC<BusMapProps> = ({ buses, routes, selectedRoute }) => {
  const [mapCenter] = useState<[number, number]>([40.7128, -74.006]);
  const [mapBounds, setMapBounds] = useState<LatLngBounds | null>(null);
  const prevBusesRef = useRef<Bus[]>([]);
  const prevSelectedRouteRef = useRef<string | null>(null);

  // Filter buses by selected route
  const filteredBuses = selectedRoute 
    ? buses.filter(bus => bus.routeId === selectedRoute)
    : buses;

  // Get all stops for the selected route
  const stops = selectedRoute 
    ? routes.find(route => route.id === selectedRoute)?.stops || []
    : routes.flatMap(route => route.stops);

  // Create custom bus icon
  const createBusIcon = (color: string) => {
    return new DivIcon({
      html: `<div style="color: ${color}; background-color: white; border-radius: 50%; padding: 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.2);">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bus">
                <path d="M8 6v6"></path><path d="M16 6v6"></path><path d="M2 12h20"></path>
                <path d="M18 18h2a2 2 0 0 0 2-2v-6a8 8 0 0 0-16 0v6a2 2 0 0 0 2 2h2"></path>
                <path d="M9 18h6"></path><path d="M5 18v2"></path><path d="M19 18v2"></path>
              </svg>
            </div>`,
      className: '',
      iconSize: [30, 30],
      iconAnchor: [15, 15],
    });
  };

  // Create custom stop icon
  const stopIcon = new Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  // Calculate map bounds when buses or selected route changes
  useEffect(() => {
    // Check if buses or selected route has actually changed
    const busesChanged = JSON.stringify(filteredBuses) !== JSON.stringify(prevBusesRef.current);
    const routeChanged = selectedRoute !== prevSelectedRouteRef.current;
    
    // Only update bounds if something has changed
    if ((busesChanged || routeChanged) && filteredBuses.length > 0) {
      // Update refs to current values
      prevBusesRef.current = filteredBuses;
      prevSelectedRouteRef.current = selectedRoute;
      
      const lats = filteredBuses.map(bus => bus.latitude);
      const lngs = filteredBuses.map(bus => bus.longitude);
      
      // Add stops to bounds calculation
      if (stops.length > 0) {
        lats.push(...stops.map(stop => stop.latitude));
        lngs.push(...stops.map(stop => stop.longitude));
      }
      
      if (lats.length > 0 && lngs.length > 0) {
        const minLat = Math.min(...lats);
        const maxLat = Math.max(...lats);
        const minLng = Math.min(...lngs);
        const maxLng = Math.max(...lngs);
        
        const bounds = new LatLngBounds(
          [minLat - 0.01, minLng - 0.01],
          [maxLat + 0.01, maxLng + 0.01]
        );
        
        setMapBounds(bounds);
      }
    }
  }, [filteredBuses, stops, selectedRoute]);

  return (
    <div className="h-[calc(100vh-12rem)] w-full rounded-lg overflow-hidden shadow-lg">
      <MapContainer 
        center={mapCenter} 
        zoom={13} 
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Map bounds updater */}
        {mapBounds && <MapBoundsUpdater bounds={mapBounds} />}
        
        {/* Render bus stops */}
        {stops.map((stop) => (
          <Marker 
            key={stop.id} 
            position={[stop.latitude, stop.longitude]}
            icon={stopIcon}
          >
            <Popup>
              <div>
                <h3 className="font-bold">{stop.name}</h3>
                <p>Bus Stop</p>
              </div>
            </Popup>
          </Marker>
        ))}
        
        {/* Render buses */}
        {filteredBuses.map((bus) => {
          const route = routes.find(r => r.id === bus.routeId);
          const color = route?.color || '#333333';
          
          return (
            <Marker 
              key={bus.id} 
              position={[bus.latitude, bus.longitude]}
              icon={createBusIcon(color)}
            >
              <Popup>
                <div className="min-w-[200px]">
                  <h3 className="font-bold text-lg">{bus.routeName}</h3>
                  <div className="mt-2">
                    <p><span className="font-semibold">Status:</span> 
                      <span className={`ml-1 ${
                        bus.status === 'on-time' ? 'text-green-600' : 
                        bus.status === 'delayed' ? 'text-red-600' : 'text-blue-600'
                      }`}>
                        {bus.status.replace('-', ' ')}
                      </span>
                    </p>
                    <p><span className="font-semibold">Next Stop:</span> {bus.nextStop}</p>
                    <p><span className="font-semibold">ETA:</span> {bus.estimatedArrival}</p>
                    <p><span className="font-semibold">Speed:</span> {bus.speed} km/h</p>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default BusMap;