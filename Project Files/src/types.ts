export interface Bus {
  id: string;
  routeId: string;
  routeName: string;
  latitude: number;
  longitude: number;
  heading: number;
  speed: number;
  lastUpdated: string;
  status: 'on-time' | 'delayed' | 'early';
  nextStop: string;
  estimatedArrival: string;
  busNumber: string;
  passengerCount: number;
  maxCapacity: number;
}

export interface BusRoute {
  id: string;
  name: string;
  color: string;
  stops: BusStop[];
}

export interface BusStop {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
}