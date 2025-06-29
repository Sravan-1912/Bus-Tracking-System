import React from 'react';
import { motion } from 'framer-motion';
import { Bus, BusRoute } from '../types';
import BusStatusCard from './BusStatusCard';
import { Database, AlertTriangle } from 'lucide-react';

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
    return route?.color || '#00ff00';
  };

  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <motion.div 
      className="mt-6 bg-gray-900 p-4 rounded-lg border border-green-400/30 shadow-lg shadow-green-400/10"
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-mono font-bold text-green-400 flex items-center">
          <Database size={20} className="mr-2" />
          [BUS_STATUS_DATABASE]
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="ml-2"
          >
            █
          </motion.span>
        </h2>
        <div className="text-sm font-mono text-green-300 bg-gray-800 px-3 py-1 rounded border border-green-400/30">
          ACTIVE_UNITS: {sortedBuses.length}
        </div>
      </div>
      
      {sortedBuses.length === 0 ? (
        <motion.div 
          className="bg-gray-800 border border-red-400/50 p-6 rounded-lg text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <AlertTriangle size={32} className="mx-auto mb-3 text-red-400" />
          <p className="text-red-400 font-mono font-bold mb-2">[ERROR] NO_UNITS_DETECTED</p>
          <p className="text-red-300 font-mono text-sm">
            No active bus units found for selected route parameters.
          </p>
        </motion.div>
      ) : (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          variants={containerVariants}
        >
          {sortedBuses.map((bus, index) => (
            <motion.div
              key={bus.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <BusStatusCard 
                bus={bus} 
                routeColor={getRouteColor(bus.routeId)} 
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};

export default BusStatusList;