import React from 'react';
import { motion } from 'framer-motion';
import { Bus as BusIcon, Clock, RefreshCw, Terminal, Wifi } from 'lucide-react';

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
      className="bg-gray-900 border-b-2 border-green-400 text-green-400 py-4 px-6 shadow-lg shadow-green-400/20"
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
              className="relative"
            >
              <BusIcon size={32} className="mr-3 text-green-400" />
              <motion.div
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full"
              />
            </motion.div>
            <div>
              <motion.h1 
                className="text-2xl font-mono font-bold text-green-400 tracking-wider"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                [AP_BUS_TRACKER]
              </motion.h1>
              <motion.p 
                className="text-green-300 text-sm font-mono flex items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Terminal size={12} className="mr-1" />
                REAL-TIME_SURVEILLANCE_ACTIVE
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="ml-1"
                >
                  █
                </motion.span>
              </motion.p>
            </div>
          </motion.div>
          
          <div className="flex items-center space-x-4">
            <motion.div 
              className="flex items-center text-sm font-mono bg-gray-800 px-3 py-1 rounded border border-green-400/30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <Wifi size={14} className="mr-2 text-green-400" />
              <span className="text-green-300">ONLINE</span>
            </motion.div>
            
            <motion.div 
              className="flex items-center text-sm font-mono bg-gray-800 px-3 py-1 rounded border border-green-400/30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <Clock size={14} className="mr-2 text-green-400" />
              <span className="text-green-300">{formatLastUpdated(lastUpdated)}</span>
            </motion.div>
            
            <motion.button 
              onClick={onRefresh}
              className="bg-green-400 text-black px-4 py-2 rounded font-mono text-sm font-bold flex items-center hover:bg-green-300 transition-colors shadow-lg shadow-green-400/30 border border-green-400"
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(34, 197, 94, 0.5)" }}
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
              REFRESH
            </motion.button>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;