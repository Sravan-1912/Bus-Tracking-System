import React from 'react';
import { motion } from 'framer-motion';
import { BusRoute } from '../types';

interface RouteSelectorProps {
  routes: BusRoute[];
  selectedRoute: string | null;
  onSelectRoute: (routeId: string | null) => void;
}

const RouteSelector: React.FC<RouteSelectorProps> = ({ 
  routes, 
  selectedRoute, 
  onSelectRoute 
}) => {
  const buttonVariants = {
    initial: { scale: 0.9, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    hover: { scale: 1.05, transition: { type: "spring", stiffness: 400 } },
    tap: { scale: 0.95 }
  };

  const containerVariants = {
    initial: { opacity: 0, y: -20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <motion.div 
      className="mb-6"
      initial="initial"
      animate="animate"
      variants={containerVariants}
    >
      <h2 className="text-lg font-semibold mb-3">Bus Routes</h2>
      <motion.div className="flex flex-wrap gap-2">
        <motion.button
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
            ${!selectedRoute 
              ? 'bg-blue-600 text-white shadow-lg' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          onClick={() => onSelectRoute(null)}
        >
          All Routes
        </motion.button>
        
        {routes.map(route => (
          <motion.button
            key={route.id}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors shadow-lg
              ${selectedRoute === route.id 
                ? 'text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            onClick={() => onSelectRoute(route.id)}
            style={{ 
              backgroundColor: selectedRoute === route.id ? route.color : undefined,
            }}
          >
            {route.name}
          </motion.button>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default RouteSelector;