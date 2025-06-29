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
    hover: { 
      scale: 1.05, 
      boxShadow: "0 0 15px rgba(34, 197, 94, 0.5)",
      transition: { type: "spring", stiffness: 400 } 
    },
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
      className="mb-6 bg-gray-900 p-4 rounded-lg border border-green-400/30 shadow-lg shadow-green-400/10"
      initial="initial"
      animate="animate"
      variants={containerVariants}
    >
      <h2 className="text-lg font-mono font-bold mb-3 text-green-400 flex items-center">
        <span className="mr-2">[ROUTE_SELECTION]</span>
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          █
        </motion.span>
      </h2>
      <motion.div className="flex flex-wrap gap-3">
        <motion.button
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          className={`px-4 py-2 rounded font-mono text-sm font-bold transition-all border-2
            ${!selectedRoute 
              ? 'bg-green-400 text-black border-green-400 shadow-lg shadow-green-400/30' 
              : 'bg-gray-800 text-green-400 border-green-400/50 hover:border-green-400'}`}
          onClick={() => onSelectRoute(null)}
        >
          ALL_ROUTES
        </motion.button>
        
        {routes.map(route => (
          <motion.button
            key={route.id}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className={`px-4 py-2 rounded font-mono text-sm font-bold transition-all border-2
              ${selectedRoute === route.id 
                ? 'text-black border-green-400 shadow-lg' 
                : 'bg-gray-800 text-green-400 border-green-400/50 hover:border-green-400'}`}
            onClick={() => onSelectRoute(route.id)}
            style={{ 
              backgroundColor: selectedRoute === route.id ? route.color : undefined,
              boxShadow: selectedRoute === route.id ? `0 0 15px ${route.color}50` : undefined
            }}
          >
            {route.name.toUpperCase().replace(/\s+/g, '_')}
          </motion.button>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default RouteSelector;