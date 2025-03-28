import React from 'react';
import { motion } from 'framer-motion';
import { Bus as BusIcon, Clock, RefreshCw } from 'lucide-react';

interface HeaderProps {
  lastUpdated: string;
  onRefresh: () => void;
}

const Header: React.FC<HeaderProps> = ({ lastUpdated, onRefresh }) => {
  const formatLastUpdated = (isoString: string): string => {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="bg-blue-600 text-white py-4 px-6 shadow-md"
    >
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <motion.div 
            className="flex items-center"
            whileHover={{ scale: 1.02 }}
          >
            <motion.div
              animate={{ 
                rotate: [0, 10, -10, 0],
                y: [0, -2, 2, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <BusIcon size={32} className="mr-3" />
            </motion.div>
            <div>
              <motion.h1 
                className="text-2xl font-bold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Andhra Pradesh Bus Tracker
              </motion.h1>
              <motion.p 
                className="text-blue-100 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Real-time bus location and status
              </motion.p>
            </div>
          </motion.div>
          
          <div className="flex items-center">
            <motion.div 
              className="flex items-center mr-4 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <Clock size={16} className="mr-1" />
              <span>Last updated: {formatLastUpdated(lastUpdated)}</span>
            </motion.div>
            <motion.button 
              onClick={onRefresh}
              className="bg-white text-blue-600 px-4 py-2 rounded-full text-sm font-medium flex items-center hover:bg-blue-50 transition-colors shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <RefreshCw size={14} className="mr-2" />
              </motion.div>
              Refresh
            </motion.button>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;