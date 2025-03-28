import React from 'react';
import { Bus, BusRoute } from '../types';
import BusStatusCard from './BusStatusCard';

interface BusStatusListProps {
  buses: Bus[];
  routes: BusRoute[];
  selectedRoute: string | null;
}

const BusStatusList: React.FC<BusStatusListProps> = ({ 
  buses, 
  routes,
  selectedRoute 
}) => {
  // Filter buses by selected route
  const filteredBuses = selectedRoute 
    ? buses.filter(bus => bus.routeId === selectedRoute)
    : buses;

  // Sort buses: first by route, then by status (delayed first)
  const sortedBuses = [...filteredBuses].sort((a, b) => {
    // First sort by route name
    if (a.routeName !== b.routeName) {
      return a.routeName.localeCompare(b.routeName);
    }
    
    // Then sort by status (delayed first, then on-time, then early)
    const statusOrder = { 'delayed': 0, 'on-time': 1, 'early': 2 };
    return statusOrder[a.status] - statusOrder[b.status];
  });

  // Get route color for each bus
  const getRouteColor = (routeId: string): string => {
    const route = routes.find(r => r.id === routeId);
    return route?.color || '#333333';
  };

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-3">Bus Status</h2>
      {sortedBuses.length === 0 ? (
        <div className="bg-gray-100 p-4 rounded-lg text-center text-gray-500">
          No buses currently available for the selected route.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedBuses.map(bus => (
            <BusStatusCard 
              key={bus.id} 
              bus={bus} 
              routeColor={getRouteColor(bus.routeId)} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BusStatusList;