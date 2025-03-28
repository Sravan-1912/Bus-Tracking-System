import React from 'react';
import { motion } from 'framer-motion';
import { Bus } from '../types';
import { Clock, Navigation, MapPin, Users } from 'lucide-react';

interface BusStatusCardProps {
  bus: Bus;
  routeColor: string;
}

const BusStatusCard: React.FC<BusStatusCardProps> = ({ bus, routeColor }) => {
  const cardVariants = {
    initial: { opacity: 0, x: -20 },
    animate: { 
      opacity: 1, 
      x: 0,
      transition: { type: "spring", stiffness: 300 }
    },
    hover: {
      y: -5,
      transition: { type: "spring", stiffness: 400 }
    }
  };

  const iconVariants = {
    initial: { scale: 0 },
    animate: { scale: 1 },
    hover: { scale: 1.2, rotate: 360 }
  };

  return (
    <motion.div 
      className="bg-white rounded-lg shadow-md p-4 border-l-4 cursor-pointer"
      style={{ borderLeftColor: routeColor }}
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      layout
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold text-lg">{bus.routeName}</h3>
          <p className="text-sm text-gray-500">{bus.busNumber}</p>
        </div>
        <motion.div
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            bus.status === 'on-time' ? 'bg-green-100 text-green-800' : 
            bus.status === 'delayed' ? 'bg-red-100 text-red-800' : 
            'bg-blue-100 text-blue-800'
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {bus.status.replace('-', ' ')}
        </motion.div>
      </div>
      
      <div className="mt-4 space-y-3">
        <motion.div 
          className="flex items-center"
          whileHover={{ x: 5 }}
        >
          <motion.div
            variants={iconVariants}
            whileHover="hover"
          >
            <MapPin size={16} className="mr-2 text-gray-500" />
          </motion.div>
          <span>Next: {bus.nextStop}</span>
        </motion.div>
        
        <motion.div 
          className="flex items-center"
          whileHover={{ x: 5 }}
        >
          <motion.div
            variants={iconVariants}
            whileHover="hover"
          >
            <Clock size={16} className="mr-2 text-gray-500" />
          </motion.div>
          <span>ETA: {bus.estimatedArrival}</span>
        </motion.div>
        
        <motion.div 
          className="flex items-center"
          whileHover={{ x: 5 }}
        >
          <motion.div
            variants={iconVariants}
            whileHover="hover"
          >
            <Navigation size={16} className="mr-2 text-gray-500" />
          </motion.div>
          <span>{bus.speed} km/h</span>
        </motion.div>

        <motion.div 
          className="flex items-center"
          whileHover={{ x: 5 }}
        >
          <motion.div
            variants={iconVariants}
            whileHover="hover"
          >
            <Users size={16} className="mr-2 text-gray-500" />
          </motion.div>
          <div className="w-full">
            <div className="flex justify-between text-sm mb-1">
              <span>Passengers</span>
              <span>{bus.passengerCount}/{bus.maxCapacity}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div
                className="h-2 rounded-full"
                style={{ 
                  backgroundColor: routeColor,
                  width: `${(bus.passengerCount / bus.maxCapacity) * 100}%`
                }}
                initial={{ width: 0 }}
                animate={{ width: `${(bus.passengerCount / bus.maxCapacity) * 100}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default BusStatusCard;