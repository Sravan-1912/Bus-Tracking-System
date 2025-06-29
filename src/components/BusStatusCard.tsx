import React from 'react';
import { motion } from 'framer-motion';
import { Bus } from '../types';
import { Clock, Navigation, MapPin, Users, Activity, Zap } from 'lucide-react';

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
      boxShadow: `0 10px 30px ${routeColor}30`,
      transition: { type: "spring", stiffness: 400 }
    }
  };

  const iconVariants = {
    initial: { scale: 0 },
    animate: { scale: 1 },
    hover: { scale: 1.2, rotate: 360 }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-time': return 'text-green-400';
      case 'delayed': return 'text-red-400';
      case 'early': return 'text-blue-400';
      default: return 'text-green-400';
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'on-time': return 'bg-green-400/20 border-green-400';
      case 'delayed': return 'bg-red-400/20 border-red-400';
      case 'early': return 'bg-blue-400/20 border-blue-400';
      default: return 'bg-green-400/20 border-green-400';
    }
  };

  return (
    <motion.div 
      className="bg-gray-900 rounded-lg border-2 border-green-400/30 p-4 cursor-pointer font-mono shadow-lg shadow-green-400/10"
      style={{ borderLeftColor: routeColor, borderLeftWidth: '4px' }}
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      layout
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-bold text-lg text-green-400 mb-1">[{bus.routeName.toUpperCase().replace(/\s+/g, '_')}]</h3>
          <p className="text-sm text-green-300 flex items-center">
            <Zap size={12} className="mr-1" />
            {bus.busNumber}
          </p>
        </div>
        <motion.div
          className={`px-3 py-1 rounded border text-xs font-bold ${getStatusBg(bus.status)} ${getStatusColor(bus.status)}`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {bus.status.toUpperCase().replace('-', '_')}
        </motion.div>
      </div>
      
      <div className="space-y-3">
        <motion.div 
          className="flex items-center text-green-300"
          whileHover={{ x: 5 }}
        >
          <motion.div
            variants={iconVariants}
            whileHover="hover"
          >
            <MapPin size={16} className="mr-3 text-green-400" />
          </motion.div>
          <span className="text-sm">NEXT: {bus.nextStop.toUpperCase()}</span>
        </motion.div>
        
        <motion.div 
          className="flex items-center text-green-300"
          whileHover={{ x: 5 }}
        >
          <motion.div
            variants={iconVariants}
            whileHover="hover"
          >
            <Clock size={16} className="mr-3 text-green-400" />
          </motion.div>
          <span className="text-sm">ETA: {bus.estimatedArrival.toUpperCase()}</span>
        </motion.div>
        
        <motion.div 
          className="flex items-center text-green-300"
          whileHover={{ x: 5 }}
        >
          <motion.div
            variants={iconVariants}
            whileHover="hover"
          >
            <Navigation size={16} className="mr-3 text-green-400" />
          </motion.div>
          <span className="text-sm">VELOCITY: {bus.speed} KM/H</span>
        </motion.div>

        <motion.div 
          className="flex items-center text-green-300"
          whileHover={{ x: 5 }}
        >
          <motion.div
            variants={iconVariants}
            whileHover="hover"
          >
            <Users size={16} className="mr-3 text-green-400" />
          </motion.div>
          <div className="w-full">
            <div className="flex justify-between text-sm mb-2">
              <span>PASSENGERS</span>
              <span className="text-green-400 font-bold">{bus.passengerCount}/{bus.maxCapacity}</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-2 border border-green-400/30">
              <motion.div
                className="h-2 rounded-full relative overflow-hidden"
                style={{ 
                  backgroundColor: routeColor,
                  width: `${(bus.passengerCount / bus.maxCapacity) * 100}%`
                }}
                initial={{ width: 0 }}
                animate={{ width: `${(bus.passengerCount / bus.maxCapacity) * 100}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
              </motion.div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="flex items-center justify-between pt-2 border-t border-green-400/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center text-green-400">
            <Activity size={12} className="mr-1" />
            <span className="text-xs">ACTIVE</span>
          </div>
          <motion.div
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-2 h-2 bg-green-400 rounded-full"
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default BusStatusCard;