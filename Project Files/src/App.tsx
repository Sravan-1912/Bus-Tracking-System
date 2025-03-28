import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import BusMap from './components/BusMap';
import RouteSelector from './components/RouteSelector';
import BusStatusList from './components/BusStatusList';
import { Bus, BusRoute } from './types';
import { initialBuses, busRoutes, simulateBusMovement } from './data/mockData';

function App() {
  const [buses, setBuses] = useState<Bus[]>(initialBuses);
  const [routes] = useState<BusRoute[]>(busRoutes);
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>(new Date().toISOString());
  const [isLoading, setIsLoading] = useState(true);

  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Update bus positions every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setBuses(prevBuses => {
        const updatedBuses = simulateBusMovement(prevBuses);
        setLastUpdated(new Date().toISOString());
        return updatedBuses;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Handle manual refresh
  const handleRefresh = () => {
    setBuses(prevBuses => {
      const updatedBuses = simulateBusMovement(prevBuses);
      setLastUpdated(new Date().toISOString());
      return updatedBuses;
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"
          />
          <h2 className="text-xl font-semibold text-gray-800">Loading Bus Tracker...</h2>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col min-h-screen bg-gray-50"
    >
      <Header lastUpdated={lastUpdated} onRefresh={handleRefresh} />
      
      <main className="container mx-auto px-4 py-6 flex-grow">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <RouteSelector 
            routes={routes} 
            selectedRoute={selectedRoute} 
            onSelectRoute={setSelectedRoute} 
          />
        </motion.div>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <BusMap 
            buses={buses} 
            routes={routes} 
            selectedRoute={selectedRoute} 
          />
        </motion.div>
        
        <AnimatePresence>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <BusStatusList 
              buses={buses} 
              routes={routes}
              selectedRoute={selectedRoute} 
            />
          </motion.div>
        </AnimatePresence>
      </main>
      
      <footer className="bg-gray-800 text-white py-4 text-center text-sm">
        <div className="container mx-auto">
          <p>Designed by Bhaskar, Nandini, Harshitha, Sravan</p>
        </div>
      </footer>
    </motion.div>
  );
}

export default App;