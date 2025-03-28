import { Bus, BusRoute } from '../types';

// Mock data for bus routes in Andhra Pradesh
export const busRoutes: BusRoute[] = [
  {
    id: 'route-1',
    name: 'Vijayawada - Guntur Express',
    color: '#FF5733',
    stops: [
      { id: 'stop-1', name: 'Vijayawada Bus Station', latitude: 16.5062, longitude: 80.6480 },
      { id: 'stop-2', name: 'Mangalagiri', latitude: 16.4307, longitude: 80.5665 },
      { id: 'stop-3', name: 'Guntur Bus Station', latitude: 16.3067, longitude: 80.4365 }
    ]
  },
  {
    id: 'route-2',
    name: 'Visakhapatnam - Vizianagaram',
    color: '#33A8FF',
    stops: [
      { id: 'stop-4', name: 'Visakhapatnam RTC Complex', latitude: 17.7222, longitude: 83.3011 },
      { id: 'stop-5', name: 'Pendurthi', latitude: 17.7799, longitude: 83.2067 },
      { id: 'stop-6', name: 'Vizianagaram Bus Station', latitude: 18.1066, longitude: 83.3955 }
    ]
  },
  {
    id: 'route-3',
    name: 'Tirupati - Nellore Express',
    color: '#33FF57',
    stops: [
      { id: 'stop-7', name: 'Tirupati Central Bus Station', latitude: 13.6288, longitude: 79.4192 },
      { id: 'stop-8', name: 'Srikalahasti', latitude: 13.7513, longitude: 79.7025 },
      { id: 'stop-9', name: 'Nellore Bus Station', latitude: 14.4426, longitude: 79.9865 }
    ]
  }
];

// Initial mock data for buses
export const initialBuses: Bus[] = [
  {
    id: 'bus-1',
    routeId: 'route-1',
    routeName: 'Vijayawada - Guntur Express',
    latitude: 16.5062,
    longitude: 80.6480,
    heading: 225,
    speed: 45,
    lastUpdated: new Date().toISOString(),
    status: 'on-time',
    nextStop: 'Mangalagiri',
    estimatedArrival: '15 min',
    busNumber: 'AP 07 Z 1234',
    passengerCount: 32,
    maxCapacity: 45
  },
  {
    id: 'bus-2',
    routeId: 'route-2',
    routeName: 'Visakhapatnam - Vizianagaram',
    latitude: 17.7222,
    longitude: 83.3011,
    heading: 45,
    speed: 50,
    lastUpdated: new Date().toISOString(),
    status: 'delayed',
    nextStop: 'Pendurthi',
    estimatedArrival: '20 min',
    busNumber: 'AP 31 Y 5678',
    passengerCount: 28,
    maxCapacity: 45
  },
  {
    id: 'bus-3',
    routeId: 'route-3',
    routeName: 'Tirupati - Nellore Express',
    latitude: 13.6288,
    longitude: 79.4192,
    heading: 90,
    speed: 55,
    lastUpdated: new Date().toISOString(),
    status: 'early',
    nextStop: 'Srikalahasti',
    estimatedArrival: '10 min',
    busNumber: 'AP 02 X 9012',
    passengerCount: 35,
    maxCapacity: 45
  }
];

// Function to simulate bus movement
export function simulateBusMovement(buses: Bus[]): Bus[] {
  return buses.map(bus => {
    const route = busRoutes.find(r => r.id === bus.routeId);
    if (!route) return bus;

    // Find current and next stop
    const currentStopIndex = route.stops.findIndex(stop => 
      stop.name === bus.nextStop
    );
    
    // Calculate movement towards next stop
    const nextStop = route.stops[currentStopIndex];
    if (!nextStop) return bus;

    // Calculate direction to next stop
    const dx = nextStop.longitude - bus.longitude;
    const dy = nextStop.latitude - bus.latitude;
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);

    // Update position with some randomization
    const speedFactor = 0.0001 * bus.speed;
    const newLatitude = bus.latitude + (Math.sin(angle * (Math.PI / 180)) * speedFactor);
    const newLongitude = bus.longitude + (Math.cos(angle * (Math.PI / 180)) * speedFactor);

    // Randomly update passenger count
    const passengerChange = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
    const newPassengerCount = Math.max(0, Math.min(bus.maxCapacity, bus.passengerCount + passengerChange));

    // Update status and ETA
    const statuses: Array<'on-time' | 'delayed' | 'early'> = ['on-time', 'delayed', 'early'];
    const newStatus = Math.random() > 0.95 
      ? statuses[Math.floor(Math.random() * statuses.length)]
      : bus.status;

    // Update estimated arrival time
    const estimatedMinutes = parseInt(bus.estimatedArrival.split(' ')[0]);
    let newEstimatedMinutes = estimatedMinutes;
    
    if (newStatus === 'delayed' && estimatedMinutes < 30) {
      newEstimatedMinutes = estimatedMinutes + 1;
    } else if (newStatus === 'early' && estimatedMinutes > 1) {
      newEstimatedMinutes = estimatedMinutes - 1;
    }

    return {
      ...bus,
      latitude: newLatitude,
      longitude: newLongitude,
      heading: angle,
      speed: Math.max(40, Math.min(60, bus.speed + (Math.random() > 0.5 ? 1 : -1))),
      lastUpdated: new Date().toISOString(),
      status: newStatus,
      estimatedArrival: `${newEstimatedMinutes} min`,
      passengerCount: newPassengerCount
    };
  });
}