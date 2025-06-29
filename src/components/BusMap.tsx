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

  // Create custom bus icon with hacker theme
  const createBusIcon = (color: string) => {
    return new DivIcon({
      html: `<div style="color: ${color}; background-color: #111827; border: 2px solid ${color}; border-radius: 50%; padding: 5px; box-shadow: 0 0 15px ${color}50;">
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

  // Create custom stop icon with hacker theme
  const createStopIcon = () => {
    return new DivIcon({
      html: `<div style="color: #22c55e; background-color: #111827; border: 2px solid #22c55e; border-radius: 50%; padding: 3px; box-shadow: 0 0 10px #22c55e50;">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 6v6l4 2"></path>
              </svg>
            </div>`,
      className: '',
      iconSize: [22, 22],
      iconAnchor: [11, 11],
    });
  };

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
    <div className="h-[calc(100vh-12rem)] w-full rounded-lg overflow-hidden border-2 border-green-400/30 shadow-lg shadow-green-400/20">
      <MapContainer 
        center={mapCenter} 
        zoom={13} 
        style={{ 
          height: '100%', 
          width: '100%',
          backgroundColor: '#111827',
          filter: 'hue-rotate(120deg) saturate(1.2) brightness(0.8)'
        }}
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
            icon={createStopIcon()}
          >
            <Popup className="hacker-popup">
              <div className="bg-gray-900 text-green-400 p-3 rounded border border-green-400/50 font-mono">
                <h3 className="font-bold text-green-400 mb-2">[STOP_LOCATION]</h3>
                <p className="text-green-300 text-sm">{stop.name.toUpperCase()}</p>
                <div className="mt-2 text-xs text-green-400">
                  <div>LAT: {stop.latitude.toFixed(4)}</div>
                  <div>LNG: {stop.longitude.toFixed(4)}</div>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
        
        {/* Render buses */}
        {filteredBuses.map((bus) => {
          const route = routes.find(r => r.id === bus.routeId);
          const color = route?.color || '#22c55e';
          
          return (
            <Marker 
              key={bus.id} 
              position={[bus.latitude, bus.longitude]}
              icon={createBusIcon(color)}
            >
              <Popup className="hacker-popup">
                <div className="bg-gray-900 text-green-400 p-4 rounded border border-green-400/50 font-mono min-w-[250px]">
                  <h3 className="font-bold text-lg text-green-400 mb-3 flex items-center">
                    <span className="mr-2">[BUS_UNIT]</span>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  </h3>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-green-300">ROUTE:</span>
                      <span className="text-green-400 font-bold">{bus.routeName.toUpperCase()}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-green-300">STATUS:</span>
                      <span className={`font-bold ${
                        bus.status === 'on-time' ? 'text-green-400' : 
                        bus.status === 'delayed' ? 'text-red-400' : 'text-blue-400'
                      }`}>
                        {bus.status.toUpperCase().replace('-', '_')}
                      </span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-green-300">NEXT_STOP:</span>
                      <span className="text-green-400">{bus.nextStop.toUpperCase()}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-green-300">ETA:</span>
                      <span className="text-green-400">{bus.estimatedArrival.toUpperCase()}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-green-300">VELOCITY:</span>
                      <span className="text-green-400">{bus.speed} KM/H</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-green-300">PASSENGERS:</span>
                      <span className="text-green-400">{bus.passengerCount}/{bus.maxCapacity}</span>
                    </div>
                    
                    <div className="pt-2 border-t border-green-400/30">
                      <div className="text-xs text-green-300">
                        <div>UNIT_ID: {bus.busNumber}</div>
                        <div>COORDS: {bus.latitude.toFixed(4)}, {bus.longitude.toFixed(4)}</div>
                      </div>
                    </div>
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