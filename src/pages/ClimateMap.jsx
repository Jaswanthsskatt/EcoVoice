import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { 
  Search, 
  MapPin, 
  Sliders, 
  Layers, 
  Info, 
  X, 
  Wind, 
  Droplets, 
  Sun, 
  CloudRain, 
  Compass, 
  SunDim,
  CloudLightning,
  CloudSnow,
  Cloud,
  Moon,
  Loader2,
  AlertCircle,
  Eye,
  Map as MapIcon,
  Globe,
  Activity
} from 'lucide-react';

// API Configuration
const API_KEY = '5V9J8R3CW29LNC6BQQH84VW5S';

// Map Layers Setup
const BASE_MAPS = {
  dark: {
    name: 'Sleek Dark',
    url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    attribution: '&copy; OpenStreetMap contributors &copy; CARTO'
  },
  light: {
    name: 'Eco Light',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; OpenStreetMap contributors'
  },
  satellite: {
    name: 'Satellite',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and GIS User Community'
  }
};

const WEATHER_ELEMENTS = [
  { id: 'precipcomposite', name: 'Radar / Precip', unit: 'mm', color: 'from-sky-300 to-indigo-300' },
  { id: 'temp', name: 'Temperature', unit: '°C', color: 'from-cyan-300 via-amber-100 to-rose-300' },
  { id: 'wind', name: 'Wind Speed', unit: 'km/h', color: 'from-emerald-200 via-sky-200 to-slate-400' },
  { id: 'cloudcover', name: 'Cloud Cover', unit: '%', color: 'from-slate-700 to-slate-200' }
];

function ClimateMap() {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const tileLayerRef = useRef(null);
  const weatherOverlayRef = useRef(null);
  const markerRef = useRef(null);

  // UI state
  const [activeTab, setActiveTab] = useState('controls'); // 'controls' | 'weather'
  const [baseMapType, setBaseMapType] = useState('dark');
  const [activeElement, setActiveElement] = useState('precipcomposite');
  const [opacity, setOpacity] = useState(0.7);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState('');

  // Weather data state
  const [selectedCoords, setSelectedCoords] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [weatherLoading, setWeatherDataLoading] = useState(false);
  const [weatherError, setWeatherError] = useState('');

  // Function to add or update weather tile overlay
  const updateWeatherOverlay = (map, element, currentOpacity) => {
    if (weatherOverlayRef.current) {
      map.removeLayer(weatherOverlayRef.current);
    }

    const weatherUrl = `https://maps.visualcrossing.com/VisualCrossingWebServices/rest/api/v1/map/tile/${element}/{z}/{x}/{y}.webp?key=${API_KEY}&time=latest&unitGroup=metric&strict=false`;

    const weatherLayer = L.tileLayer(weatherUrl, {
      opacity: currentOpacity,
      maxZoom: 18,
      attribution: 'Weather by Visual Crossing',
      zIndex: 100
    }).addTo(map);

    weatherOverlayRef.current = weatherLayer;
  };

  // Fetch weather data for coordinates
  const fetchWeatherData = async (lat, lng) => {
    setWeatherDataLoading(true);
    setWeatherError('');
    setWeatherData(null);

    try {
      const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat},${lng}?key=${API_KEY}&unitGroup=metric&include=current`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch weather information from API.');
      }
      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      console.error(err);
      setWeatherError('Error loading weather data. Please try again.');
    } finally {
      setWeatherDataLoading(false);
    }
  };

  // Click handler on map
  const handleMapClick = (lat, lng) => {
    const latRounded = parseFloat(lat.toFixed(6));
    const lngRounded = parseFloat(lng.toFixed(6));
    setSelectedCoords({ lat: latRounded, lng: lngRounded });
    setActiveTab('weather');
    fetchWeatherData(latRounded, lngRounded);

    // Setup marker
    if (!mapRef.current) return;

    if (markerRef.current) {
      mapRef.current.removeLayer(markerRef.current);
    }

    // Create a gorgeous pulsing marker icon using divIcon
    const customIcon = L.divIcon({
      html: `
        <div class="relative flex h-8 w-8 items-center justify-center">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <div class="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-white shadow-md"></div>
        </div>
      `,
      className: 'custom-marker',
      iconSize: [32, 32],
      iconAnchor: [16, 16]
    });

    const marker = L.marker([latRounded, lngRounded], { icon: customIcon }).addTo(mapRef.current);
    markerRef.current = marker;
  };

  // Search location using OpenStreetMap Nominatim
  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setSearchLoading(true);
    setSearchError('');

    try {
      const geocodeUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=1`;
      const response = await fetch(geocodeUrl, {
        headers: {
          'Accept-Language': 'en'
        }
      });
      if (!response.ok) {
        throw new Error('Geocoding service unavailable.');
      }
      const results = await response.json();
      
      if (results && results.length > 0) {
        const { lat, lon } = results[0];
        const latitude = parseFloat(lat);
        const longitude = parseFloat(lon);

        if (mapRef.current) {
          mapRef.current.flyTo([latitude, longitude], 9, {
            duration: 1.5,
            easeLinearity: 0.25
          });
          handleMapClick(latitude, longitude);
        }
      } else {
        setSearchError('Location not found. Try a different query.');
      }
    } catch (err) {
      console.error(err);
      setSearchError('Failed to search location. Please check connection.');
    } finally {
      setSearchLoading(false);
    }
  };

  // Setup Leaflet map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Initialize map centered on a global view
    const map = L.map(mapContainerRef.current, {
      center: [20, 0],
      zoom: 3,
      minZoom: 2,
      maxZoom: 18,
      zoomControl: false // We will add custom zoom controls later or use standard on bottom-right
    });

    mapRef.current = map;

    // Add standard zoom control to bottom right
    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // Set base map tile layer
    const baseTile = L.tileLayer(BASE_MAPS[baseMapType].url, {
      attribution: BASE_MAPS[baseMapType].attribution
    }).addTo(map);
    tileLayerRef.current = baseTile;

    // Setup initial weather overlay
    updateWeatherOverlay(map, activeElement, opacity);

    // Map click handler to place pin and fetch weather
    map.on('click', (e) => {
      const { lat, lng } = e.latlng;
      handleMapClick(lat, lng);
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fetch weather data on mount for London, UK (coordinates)
  useEffect(() => {
    // London, UK coordinates
    const lat = 51.5074;
    const lng = -0.1278;

    // Center the map on London and add a marker after render
    const timer = setTimeout(() => {
      setSelectedCoords({ lat, lng });
      setActiveTab('weather');
      fetchWeatherData(lat, lng);

      if (mapRef.current) {
        mapRef.current.setView([lat, lng], 7);
        
        if (markerRef.current) {
          mapRef.current.removeLayer(markerRef.current);
        }

        const customIcon = L.divIcon({
          html: `
            <div class="relative flex h-8 w-8 items-center justify-center">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <div class="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-white shadow-md"></div>
            </div>
          `,
          className: 'custom-marker',
          iconSize: [32, 32],
          iconAnchor: [16, 16]
        });

        const marker = L.marker([lat, lng], { icon: customIcon }).addTo(mapRef.current);
        markerRef.current = marker;
      }
    }, 500);

    return () => clearTimeout(timer);
  }, []);


  // Update base map layer when baseMapType changes
  useEffect(() => {
    if (!mapRef.current || !tileLayerRef.current) return;

    mapRef.current.removeLayer(tileLayerRef.current);
    const newBaseTile = L.tileLayer(BASE_MAPS[baseMapType].url, {
      attribution: BASE_MAPS[baseMapType].attribution
    }).addTo(mapRef.current);
    tileLayerRef.current = newBaseTile;

    // Ensure weather overlay is brought to front
    if (weatherOverlayRef.current) {
      weatherOverlayRef.current.bringToFront();
    }
  }, [baseMapType]);

  // Update weather overlay when active element or opacity changes
  useEffect(() => {
    if (!mapRef.current) return;
    updateWeatherOverlay(mapRef.current, activeElement, opacity);
  }, [activeElement, opacity]);

  // Map weather icon string to Lucide icons
  const getWeatherIcon = (iconName) => {
    const props = { className: 'w-10 h-10 text-emerald-400 animate-pulse' };
    switch (iconName) {
      case 'snow':
        return <CloudSnow {...props} />;
      case 'rain':
      case 'showers-day':
      case 'showers-night':
        return <CloudRain {...props} />;
      case 'thunder-rain':
      case 'thunder-showers-day':
      case 'thunder-showers-night':
        return <CloudLightning {...props} />;
      case 'wind':
        return <Wind {...props} />;
      case 'fog':
        return <Cloud {...props} />;
      case 'cloudy':
        return <Cloud {...props} />;
      case 'partly-cloudy-day':
        return <SunDim {...props} />;
      case 'partly-cloudy-night':
        return <Moon {...props} />;
      case 'clear-day':
        return <Sun {...props} />;
      case 'clear-night':
        return <Moon {...props} />;
      default:
        return <Sun {...props} />;
    }
  };

  // Helper to render weather Legends based on selected element
  const renderLegend = () => {
    switch (activeElement) {
      case 'precipcomposite':
        return (
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-slate-400">
              <span>Light Rain</span>
              <span>Moderate</span>
              <span>Heavy Radar</span>
            </div>via-indigo-200
            <div className="h-2.5 w-full rounded-full bg-linear-to-r from-sky-200  via-indigo-200 to-purple-300" />
          </div>
        );
      case 'temp':
        return (
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-slate-400">
              <span>Freezing (-15°C)</span>
              <span>Mild (15°C)</span>
              <span>Hot (40°C)</span>
            </div>
            <div className="h-2.5 w-full rounded-full bg-linear-to-r from-cyan-200 via-teal-100 via-amber-100 via-orange-100 to-rose-300" />
          </div>
        );
      case 'wind':
        return (
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-slate-400">
              <span>Calm</span>
              <span>Breeze</span>
              <span>Gale (80 km/h)</span>
            </div>
            <div className="h-2.5 w-full rounded-full bg-linear-to-r from-emerald-100 via-teal-100 via-sky-200 to-slate-400" />
          </div>
        );
      case 'cloudcover':
        return (
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-slate-400">
              <span>Sunny (0%)</span>
              <span>Partly</span>
              <span>Overcast (100%)</span>
            </div>
            <div className="h-2.5 w-full rounded-full bg-linear-to-r from-slate-800 via-slate-500 to-slate-200" />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative w-full h-[calc(100vh-5.25rem)] overflow-hidden bg-slate-950 font-sans flex flex-col lg:flex-row">
      
      {/* Sidebar Controls & Weather Stats */}
      <div className="absolute top-4 left-4 z-500 w-[calc(100%-2rem)] sm:w-100 max-h-[calc(100vh-8.5rem)] flex flex-col bg-white border border-gray-200 rounded-2xl shadow-2xl overflow-hidden transition-all duration-300">
        
        {/* Sidebar Header / Navigation */}
        <div className="flex border-b border-gray-150 p-2 bg-gray-50/80">
          <button
            onClick={() => setActiveTab('controls')}
            className={`flex-1 py-2 px-3 text-sm font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'controls' 
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20' 
                : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <Sliders className="w-4 h-4" />
            Map controls
          </button>
          <button
            onClick={() => {
              setActiveTab('weather');
              if (selectedCoords && !weatherData && !weatherLoading) {
                fetchWeatherData(selectedCoords.lat, selectedCoords.lng);
              }
            }}
            className={`flex-1 py-2 px-3 text-sm font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'weather' 
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20' 
                : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <Activity className="w-4 h-4" />
            Eco Report
          </button>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5 custom-scrollbar max-h-[60vh] sm:max-h-[70vh]">
          
          {/* TAB 1: MAP CONTROLS */}
          {activeTab === 'controls' && (
            <>
              {/* Location Search Bar */}
              <form onSubmit={handleSearchSubmit} className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Search Location</label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Enter city, region, or address..."
                    className="w-full bg-gray-50 border border-gray-250 rounded-xl py-3 pl-11 pr-10 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                  />
                  <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" />
                  
                  {searchLoading ? (
                    <Loader2 className="absolute right-3.5 top-3.5 w-4 h-4 text-emerald-500 animate-spin" />
                  ) : searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3.5 top-3.5 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
                {searchError && (
                  <div className="flex items-center gap-1.5 text-xs text-rose-600 mt-1 bg-rose-50 p-2 rounded-lg border border-rose-100">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{searchError}</span>
                  </div>
                )}
              </form>

              {/* Weather Overlay Elements Picker */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5" />
                  Weather Layer
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {WEATHER_ELEMENTS.map((el) => (
                    <button
                      key={el.id}
                      onClick={() => setActiveElement(el.id)}
                      className={`relative flex flex-col p-3 rounded-xl border text-left transition-all duration-200 cursor-pointer overflow-hidden ${
                        activeElement === el.id
                          ? 'bg-emerald-50 border-emerald-500/80 ring-1 ring-emerald-500/50 text-emerald-950'
                          : 'bg-gray-50/50 border-gray-200 hover:border-gray-300 text-gray-700'
                      }`}
                    >
                      <span className="text-xs font-bold">{el.name}</span>
                      <span className="text-[10px] text-gray-400">Unit: {el.unit}</span>
                      {activeElement === el.id && (
                        <div className={`absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r ${el.color}`} />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Layer Opacity Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5" />
                    Layer Opacity
                  </label>
                  <span className="text-xs font-mono text-emerald-600">{Math.round(opacity * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="1.0"
                  step="0.05"
                  value={opacity}
                  onChange={(e) => setOpacity(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-gray-150 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
              </div>

              {/* Base Map Selector */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
                  <MapIcon className="w-3.5 h-3.5" />
                  Base Style
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {Object.entries(BASE_MAPS).map(([key, mapConfig]) => (
                    <button
                      key={key}
                      onClick={() => setBaseMapType(key)}
                      className={`py-2 px-1 text-center rounded-xl border text-xs font-semibold transition-all duration-200 cursor-pointer ${
                        baseMapType === key
                          ? 'bg-emerald-600 text-white border-transparent shadow-lg shadow-emerald-600/10'
                          : 'bg-gray-50 border-gray-200 text-gray-500 hover:text-gray-900 hover:border-gray-300'
                      }`}
                    >
                      {mapConfig.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Legend Display */}
              <div className="bg-gray-50 border border-gray-200/80 rounded-xl p-4 space-y-3">
                <div className="flex items-center gap-1.5 text-xs font-bold text-gray-700">
                  <Info className="w-3.5 h-3.5 text-gray-400" />
                  <span>Legend: {WEATHER_ELEMENTS.find(e => e.id === activeElement)?.name}</span>
                </div>
                {renderLegend()}
              </div>

              {/* Dynamic instruction notice */}
              <div className="text-xs text-gray-500 leading-relaxed bg-gray-50 border border-gray-200/60 rounded-xl p-3 flex gap-2">
                <MapPin className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Click any point on the map to query historical, real-time, and predicted ecological weather datasets.</span>
              </div>
            </>
          )}

          {/* TAB 2: ECO WEATHER REPORT */}
          {activeTab === 'weather' && (
            <div className="space-y-4">
              {weatherLoading && (
                <div className="flex flex-col items-center justify-center py-12 space-y-3">
                  <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
                  <span className="text-sm text-gray-500">Retrieving climate metrics...</span>
                </div>
              )}

              {weatherError && (
                <div className="text-center py-8 space-y-3">
                  <AlertCircle className="w-10 h-10 text-rose-500 mx-auto" />
                  <p className="text-sm text-gray-600">{weatherError}</p>
                  <button
                    onClick={() => {
                      if (selectedCoords) fetchWeatherData(selectedCoords.lat, selectedCoords.lng);
                    }}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Retry
                  </button>
                </div>
              )}

              {!selectedCoords && !weatherLoading && (
                <div className="flex flex-col items-center justify-center text-center py-12 space-y-3 text-gray-400">
                  <Globe className="w-12 h-12 text-gray-300 stroke-1" />
                  <div>
                    <h4 className="font-semibold text-gray-800 text-sm">No Location Selected</h4>
                    <p className="text-xs text-gray-500 mt-1 max-w-60 mx-auto">
                      Use the search bar or click on the map to display instant eco-climate updates.
                    </p>
                  </div>
                </div>
              )}

              {weatherData && !weatherLoading && (
                <div className="space-y-4 animate-fadeIn">
                  
                  {/* Location Title Header */}
                  <div className="border-b border-gray-200/60 pb-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-0.5">
                        <h3 className="font-bold text-gray-800 text-base leading-snug text-wrap">
                          {weatherData.resolvedAddress || 'Custom Location'}
                        </h3>
                        <p className="text-xs text-gray-500 flex items-center gap-1 font-mono">
                          <MapPin className="w-3 h-3 text-emerald-500" />
                          {weatherData.latitude.toFixed(4)}°N, {weatherData.longitude.toFixed(4)}°E
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          setWeatherData(null);
                          setSelectedCoords(null);
                          if (markerRef.current && mapRef.current) {
                            mapRef.current.removeLayer(markerRef.current);
                            markerRef.current = null;
                          }
                          setActiveTab('controls');
                        }}
                        className="p-1 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Main Temperature & Conditions Block */}
                  <div className="bg-gray-50 border border-gray-200/80 rounded-2xl p-4 flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-extrabold text-gray-900 tracking-tight">
                          {Math.round(weatherData.currentConditions.temp)}
                        </span>
                        <span className="text-xl font-medium text-emerald-600">°C</span>
                      </div>
                      <p className="text-xs text-gray-500">
                        Feels like: <span className="font-semibold text-gray-800">{Math.round(weatherData.currentConditions.feelslike)}°C</span>
                      </p>
                      <p className="text-sm font-semibold text-gray-800 capitalize mt-1.5">
                        {weatherData.currentConditions.conditions}
                      </p>
                    </div>
                    <div>
                      {getWeatherIcon(weatherData.currentConditions.icon)}
                    </div>
                  </div>

                  {/* Climate details Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    
                    {/* Humidity */}
                    <div className="bg-gray-50 border border-gray-150 rounded-xl p-3 flex items-center gap-3">
                      <div className="p-2 bg-emerald-500/10 text-emerald-600 rounded-lg">
                        <Droplets className="w-4 h-4" />
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-[10px] uppercase font-bold text-gray-500">Humidity</span>
                        <p className="text-sm font-bold text-gray-800">{Math.round(weatherData.currentConditions.humidity)}%</p>
                      </div>
                    </div>

                    {/* Wind Speed */}
                    <div className="bg-gray-50 border border-gray-150 rounded-xl p-3 flex items-center gap-3">
                      <div className="p-2 bg-emerald-500/10 text-emerald-600 rounded-lg">
                        <Wind className="w-4 h-4" />
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-[10px] uppercase font-bold text-gray-500">Wind</span>
                        <p className="text-sm font-bold text-gray-800">{Math.round(weatherData.currentConditions.windspeed)} km/h</p>
                      </div>
                    </div>

                    {/* UV Index */}
                    <div className="bg-gray-50 border border-gray-150 rounded-xl p-3 flex items-center gap-3">
                      <div className="p-2 bg-emerald-500/10 text-emerald-600 rounded-lg">
                        <Sun className="w-4 h-4" />
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-[10px] uppercase font-bold text-gray-500">UV Index</span>
                        <p className="text-sm font-bold text-gray-800">{weatherData.currentConditions.uvindex} / 10</p>
                      </div>
                    </div>

                    {/* Cloud Cover */}
                    <div className="bg-gray-50 border border-gray-150 rounded-xl p-3 flex items-center gap-3">
                      <div className="p-2 bg-emerald-500/10 text-emerald-600 rounded-lg">
                        <Cloud className="w-4 h-4" />
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-[10px] uppercase font-bold text-gray-500">Clouds</span>
                        <p className="text-sm font-bold text-gray-800">{Math.round(weatherData.currentConditions.cloudcover)}%</p>
                      </div>
                    </div>
                  </div>

                  {/* Ecological Solar Info */}
                  <div className="bg-gray-50 border border-gray-150 rounded-xl p-4 space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5 text-emerald-500" />
                      Eco-Environmental Metrics
                    </h4>
                    
                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <div className="space-y-1">
                        <span className="text-gray-500 font-medium">Solar Radiation</span>
                        <p className="font-bold text-gray-800">{weatherData.currentConditions.solarradiation ? `${Math.round(weatherData.currentConditions.solarradiation)} W/m²` : 'N/A'}</p>
                      </div>
                      <div className="space-y-1">
                        <span className="text-gray-500 font-medium">Solar Energy</span>
                        <p className="font-bold text-gray-800">{weatherData.currentConditions.solarenergy ? `${weatherData.currentConditions.solarenergy} MJ/m²` : 'N/A'}</p>
                      </div>
                      <div className="space-y-1">
                        <span className="text-gray-500 font-medium">Atmospheric Pressure</span>
                        <p className="font-bold text-gray-800">{weatherData.currentConditions.pressure ? `${Math.round(weatherData.currentConditions.pressure)} hPa` : 'N/A'}</p>
                      </div>
                      <div className="space-y-1">
                        <span className="text-gray-500 font-medium">Timezone</span>
                        <p className="font-bold text-gray-800 truncate">{weatherData.timezone}</p>
                      </div>
                    </div>
                  </div>

                  {/* Sun Times */}
                  <div className="bg-gray-50 border border-gray-150 rounded-xl p-3.5 flex justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-2">
                      <Compass className="w-4 h-4 text-amber-500" />
                      <div>
                        <span className="text-[10px] text-gray-400 block">SUNRISE</span>
                        <span className="font-bold text-gray-700">{weatherData.currentConditions.sunrise.substring(0, 5)} AM</span>
                      </div>
                    </div>
                    <div className="w-px bg-gray-200" />
                    <div className="flex items-center gap-2">
                      <Compass className="w-4 h-4 text-indigo-400" />
                      <div>
                        <span className="text-[10px] text-gray-400 block">SUNSET</span>
                        <span className="font-bold text-gray-700">{weatherData.currentConditions.sunset.substring(0, 5)} PM</span>
                      </div>
                    </div>
                  </div>

                </div>
              )}
            </div>
          )}

        </div>
        
        {/* Footnote */}
        <div className="bg-gray-50 px-5 py-3 border-t border-gray-200 flex items-center justify-between text-[10px] text-gray-500">
          <span>EcoVoice Climate Monitor</span>
          <span className="font-mono">v1.2.0</span>
        </div>
      </div>

      {/* Map Element Container */}
      <div 
        ref={mapContainerRef} 
        className="w-full h-full relative z-10"
        style={{ outline: 'none' }}
      />
      
      {/* Absolute Leaflet CSS Override for Sleek Design */}
      <style>{`
        .leaflet-container {
          background: #020617 !important;
          font-family: inherit;
        }
        .leaflet-bar {
          border: 1px solid rgba(30, 41, 59, 0.8) !important;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3) !important;
          border-radius: 12px !important;
          overflow: hidden;
        }
        .leaflet-bar a {
          background-color: rgba(15, 23, 42, 0.95) !important;
          color: #e2e8f0 !important;
          border-bottom: 1px solid rgba(30, 41, 59, 0.8) !important;
          transition: all 0.2s;
        }
        .leaflet-bar a:hover {
          background-color: #059669 !important;
          color: white !important;
        }
        .leaflet-bar a.leaflet-disabled {
          background-color: #0f172a !important;
          color: #475569 !important;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
          display: block;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(16, 185, 129, 0.2);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(16, 185, 129, 0.4);
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

export default ClimateMap;
