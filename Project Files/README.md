# Andhra Pradesh Bus Tracker

A modern, real-time bus tracking system for Andhra Pradesh's public transportation network. This application provides live updates on bus locations, routes, and status information with an intuitive user interface.

## Features

- **Real-time Bus Tracking**: Monitor bus locations across Andhra Pradesh in real-time
- **Interactive Map**: Leaflet-based map showing bus positions and routes
- **Route Filtering**: Easy filtering of specific bus routes
- **Status Updates**: Live updates on bus status, including delays and ETAs
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Smooth animations and transitions using Framer Motion
- **Passenger Information**: Real-time updates on passenger count and capacity

## Technology Stack

- **Frontend Framework**: React with TypeScript
- **Mapping**: React Leaflet
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Build Tool**: Vite

## Project Structure

```
src/
├── components/
│   ├── BusMap.tsx         # Interactive map component
│   ├── BusStatusCard.tsx  # Individual bus status display
│   ├── BusStatusList.tsx  # List of all bus statuses
│   ├── Header.tsx         # Application header
│   └── RouteSelector.tsx  # Route filtering component
├── data/
│   └── mockData.ts        # Sample data for testing
├── types/
│   └── index.ts           # TypeScript type definitions
├── App.tsx               # Main application component
└── main.tsx             # Application entry point
```

## Key Components

### BusMap
- Displays an interactive map of Andhra Pradesh
- Shows real-time bus locations with custom markers
- Highlights bus routes and stops
- Provides detailed information in popups

### RouteSelector
- Allows users to filter specific bus routes
- Shows all available routes with color coding
- Provides an intuitive interface for route selection

### BusStatusList
- Displays detailed status for each bus
- Shows passenger count and capacity
- Indicates delays and estimated arrival times
- Updates in real-time

### BusStatusCard
- Individual card showing bus details
- Color-coded status indicators
- Shows current speed and heading
- Displays passenger information

## Features in Detail

### Real-time Updates
- Bus positions update every 3 seconds
- Simulated movement along predefined routes
- Status updates including delays and ETAs
- Passenger count changes

### Route Management
- Multiple routes across major cities
- Color-coded route identification
- Detailed stop information
- Interactive route selection

### User Interface
- Modern, clean design
- Smooth animations and transitions
- Responsive layout
- Loading indicators and feedback

### Map Features
- Custom bus markers with route colors
- Interactive popups with detailed information
- Auto-centering on selected routes
- Stop markers with location details

## Future Enhancements

1. **Real-time Data Integration**
   - Integration with actual GPS data from buses
   - Real-time traffic information
   - Weather updates affecting routes

2. **User Features**
   - User accounts and favorites
   - Route planning
   - Push notifications for delays
   - Journey planning

3. **Additional Information**
   - Bus schedules
   - Fare information
   - Service alerts
   - Historical data analysis

4. **Mobile Features**
   - Native mobile apps
   - Offline support
   - Location-based alerts
   - QR code ticketing

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

