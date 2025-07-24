"use client";

import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  LayersControl,
  FeatureGroup,
  Polyline,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default marker icons
delete (L.Icon.Default.prototype as Record<string, unknown>)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

interface Station {
  id: string;
  name: string;
  location: string;
  coordinates: { lat: number; lng: number };
  status: string;
  wqi: number;
  lastUpdate: string;
}

interface LeafletMapProps {
  stations: Station[];
  onStationClick: (stationId: string) => void;
}

// Create custom station icons based on status
const createStationIcon = (station: Station) => {
  const getColor = () => {
    if (station.status === "offline") return "#ef4444";
    if (station.wqi >= 80) return "#10b981";
    if (station.wqi >= 60) return "#f59e0b";
    return "#ef4444";
  };
  const getStatusIcon = () => {
    if (station.status === "offline") return "⚠️";
    if (station.wqi >= 80) return "✅";
    if (station.wqi >= 60) return "⚡";
    return "🔴";
  };

  const color = getColor();
  const statusIcon = getStatusIcon();

  return L.divIcon({
    html: `
      <div style="
        position: relative;
        width: 40px;
        height: 50px;
        display: flex;
        flex-direction: column;
        align-items: center;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      ">
        <!-- Main Station Icon -->
        <div style="
          width: 32px;
          height: 32px;
          background: linear-gradient(135deg, ${color} 0%, ${color}dd 100%);
          border: 2px solid white;
          border-radius: 50%;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          z-index: 2;
        ">
          <!-- WQI Value -->
          <span style="
            font-size: 10px;
            font-weight: bold;
            color: white;
            text-shadow: 0 1px 2px rgba(0,0,0,0.5);
          ">${station.wqi}</span>
          
          <!-- Status Indicator -->
          <div style="
            position: absolute;
            top: -4px;
            right: -4px;
            width: 16px;
            height: 16px;
            background: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
          ">${statusIcon}</div>
        </div>
        
        <!-- Station Label -->
        <div style="
          background: rgba(15, 23, 42, 0.9);
          color: white;
          padding: 2px 6px;
          border-radius: 8px;
          font-size: 8px;
          font-weight: 500;
          white-space: nowrap;
          margin-top: 4px;
          border: 1px solid rgba(71, 85, 105, 0.5);
          box-shadow: 0 2px 4px rgba(0,0,0,0.3);
          max-width: 80px;
          text-align: center;
          z-index: 1;
        ">
          ${station.id}
        </div>
        
        <!-- Pulse Animation for Online Stations -->
        ${
          station.status === "online"
            ? `
          <div style="
            position: absolute;
            top: 0;
            left: 4px;
            width: 32px;
            height: 32px;
            border: 2px solid ${color};
            border-radius: 50%;
            opacity: 0.6;
            animation: pulse 2s infinite;
          "></div>
        `
            : ""
        }
      </div>
      
      <style>
        @keyframes pulse {
          0% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.2); opacity: 0.3; }
          100% { transform: scale(1.4); opacity: 0; }
        }
      </style>
    `,
    className: "custom-station-icon",
    iconSize: [40, 50],
    iconAnchor: [20, 50],
  });
};

export default function LeafletMap({
  stations,
  onStationClick,
}: LeafletMapProps) {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredStations, setFilteredStations] = useState(stations);

  useEffect(() => {
    setMapLoaded(true);
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = stations.filter(
        (station) =>
          station.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          station.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
          station.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredStations(filtered);
    } else {
      setFilteredStations(stations);
    }
  }, [searchTerm, stations]);

  if (!mapLoaded) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-slate-400">Loading map...</div>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full">
      {/* Search Control */}
      <div className="absolute top-4 left-4 z-[1000] bg-slate-800/90 backdrop-blur-sm rounded-lg border border-slate-600 p-3 min-w-[280px]">
        <div className="flex items-center gap-2 mb-2">
          <svg
            className="w-4 h-4 text-cyan-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search stations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-slate-700 text-white text-sm px-3 py-1 rounded border border-slate-600 focus:border-cyan-400 focus:outline-none"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="text-slate-400 hover:text-white text-sm"
            >
              ✕
            </button>
          )}
        </div>

        {searchTerm && (
          <div className="text-xs text-slate-400">
            Found {filteredStations.length} of {stations.length} stations
          </div>
        )}
      </div>

      <MapContainer
        center={[14.6091, 121.0223]}
        zoom={12}
        style={{ height: "100%", width: "100%" }}
        className="rounded-2xl"
      >
        <LayersControl position="topright">
          {/* Base Layers */}
          <LayersControl.BaseLayer checked name="OpenStreetMap">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Allround Map">
            <TileLayer
              url="https://tile.thunderforest.com/mobile-atlas/{z}/{x}/{y}.png?apikey=YOUR_API_KEY"
              attribution='&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Satellite">
            <TileLayer
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
            />
          </LayersControl.BaseLayer>
          {/* Thematic Overlays */}
          <LayersControl.Overlay name="Water Quality Zones">
            <FeatureGroup>
              {/* Water quality zones as polygons */}
              <Polyline
                positions={[
                  [14.6507, 121.1052],
                  [14.5871, 121.0813],
                  [14.5654, 121.0454],
                  [14.5995, 120.9842],
                ]}
                pathOptions={{
                  color: "#06b6d4",
                  weight: 4,
                  opacity: 0.8,
                  dashArray: "10, 5",
                }}
              />
            </FeatureGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Industrial Areas">
            <FeatureGroup>
              {/* Industrial pollution risk areas */}
              <Polyline
                positions={[
                  [14.5654, 121.0454],
                  [14.56, 121.04],
                  [14.57, 121.05],
                ]}
                pathOptions={{
                  color: "#ef4444",
                  weight: 3,
                  opacity: 0.6,
                  fillColor: "#ef4444",
                  fillOpacity: 0.2,
                }}
              />
            </FeatureGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Population Density">
            <FeatureGroup>
              {/* Population density overlay */}
              <Polyline
                positions={[
                  [14.5871, 121.0813],
                  [14.58, 121.075],
                  [14.59, 121.085],
                ]}
                pathOptions={{
                  color: "#f59e0b",
                  weight: 2,
                  opacity: 0.5,
                  fillColor: "#f59e0b",
                  fillOpacity: 0.1,
                }}
              />
            </FeatureGroup>
          </LayersControl.Overlay>{" "}
        </LayersControl>

        {/* Station Markers */}
        {filteredStations.map((station) => (
          <Marker
            key={station.id}
            position={[station.coordinates.lat, station.coordinates.lng]}
            icon={createStationIcon(station)}
            eventHandlers={{
              click: () => {
                onStationClick(station.id);
              },
            }}
          >
            <Popup className="custom-popup">
              <div className="p-2 min-w-[200px]">
                <h3 className="font-bold text-gray-900 mb-2">{station.name}</h3>
                <div className="space-y-1 text-sm">
                  <p>
                    <span className="font-medium">Location:</span>{" "}
                    {station.location}
                  </p>
                  <p>
                    <span className="font-medium">WQI:</span>
                    <span
                      className={`ml-1 font-bold ${
                        station.wqi >= 80
                          ? "text-green-600"
                          : station.wqi >= 60
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      {station.wqi}
                    </span>
                  </p>
                  <p>
                    <span className="font-medium">Status:</span>
                    <span
                      className={`ml-1 capitalize ${
                        station.status === "online"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {station.status}
                    </span>
                  </p>
                  <p>
                    <span className="font-medium">Last Update:</span>{" "}
                    {station.lastUpdate}
                  </p>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
