"use client";

import { useState, useMemo } from "react";
import "../../styles/leaflet-custom.css";
import {
  MapPin,
  Activity,
  AlertTriangle,
  CheckCircle,
  Users,
  FileText,
  Settings,
  Bell,
  Home,
  BarChart3,
  LogOut,
  TrendingUp,
  TrendingDown,
  Beaker,
  Gauge,
  Eye,
  Edit,
  Plus,
  Download,
  Calendar,
  Clock,
  Menu,
  LineChart,
  PieChart,
  Zap,
  TestTube,
  Save,
  RefreshCw,
  Upload,
  Database,
  Wifi,
  WifiOff,
  Wrench,
  Sliders,
  Target,
  Brain,
  BarChart,
  Filter,
  X,
  ChevronDown,
  Check,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import dynamic from "next/dynamic";

// Dynamically import the entire map component to avoid SSR issues
const DynamicMap = dynamic(() => import("../components/LeafletMap"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full">
      <div className="text-slate-400">Loading map...</div>
    </div>
  ),
});
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// Mock historical data for readings table
const historicalReadings = [
  {
    id: "1",
    stationId: "WS001",
    stationName: "Downtown River Station",
    timestamp: "2024-01-07 14:30:00",
    ph: 7.2,
    temperature: 18.5,
    dissolvedOxygen: 8.3,
    turbidity: 2.1,
    conductivity: 450,
    tds: 225,
    wqi: 87,
  },
  {
    id: "2",
    stationId: "WS001",
    stationName: "Downtown River Station",
    timestamp: "2024-01-07 14:25:00",
    ph: 7.1,
    temperature: 18.3,
    dissolvedOxygen: 8.2,
    turbidity: 2.2,
    conductivity: 455,
    tds: 228,
    wqi: 86,
  },
  {
    id: "3",
    stationId: "WS002",
    stationName: "Industrial Park Monitor",
    timestamp: "2024-01-07 14:30:00",
    ph: 6.8,
    temperature: 22.1,
    dissolvedOxygen: 6.2,
    turbidity: 4.8,
    conductivity: 680,
    tds: 340,
    wqi: 65,
  },
  {
    id: "4",
    stationId: "WS003",
    stationName: "Residential Area Sensor",
    timestamp: "2024-01-07 14:30:00",
    ph: 7.4,
    temperature: 19.2,
    dissolvedOxygen: 9.1,
    turbidity: 1.8,
    conductivity: 380,
    tds: 190,
    wqi: 92,
  },
  {
    id: "5",
    stationId: "WS001",
    stationName: "Downtown River Station",
    timestamp: "2024-01-07 14:20:00",
    ph: 7.0,
    temperature: 18.1,
    dissolvedOxygen: 8.1,
    turbidity: 2.3,
    conductivity: 460,
    tds: 230,
    wqi: 85,
  },
  {
    id: "6",
    stationId: "WS002",
    stationName: "Industrial Park Monitor",
    timestamp: "2024-01-07 14:25:00",
    ph: 6.9,
    temperature: 21.8,
    dissolvedOxygen: 6.4,
    turbidity: 4.5,
    conductivity: 675,
    tds: 338,
    wqi: 67,
  },
  // Additional mock data for better visualization
  {
    id: "7",
    stationId: "WS001",
    stationName: "Downtown River Station",
    timestamp: "2024-01-07 14:15:00",
    ph: 6.9,
    temperature: 17.8,
    dissolvedOxygen: 8.0,
    turbidity: 2.4,
    conductivity: 465,
    tds: 232,
    wqi: 84,
  },
  {
    id: "8",
    stationId: "WS001",
    stationName: "Downtown River Station",
    timestamp: "2024-01-07 14:10:00",
    ph: 7.3,
    temperature: 17.5,
    dissolvedOxygen: 7.9,
    turbidity: 2.0,
    conductivity: 440,
    tds: 220,
    wqi: 88,
  },
  {
    id: "9",
    stationId: "WS002",
    stationName: "Industrial Park Monitor",
    timestamp: "2024-01-07 14:20:00",
    ph: 6.7,
    temperature: 21.5,
    dissolvedOxygen: 6.1,
    turbidity: 4.9,
    conductivity: 685,
    tds: 342,
    wqi: 64,
  },
  {
    id: "10",
    stationId: "WS003",
    stationName: "Residential Area Sensor",
    timestamp: "2024-01-07 14:25:00",
    ph: 7.5,
    temperature: 19.0,
    dissolvedOxygen: 9.0,
    turbidity: 1.9,
    conductivity: 375,
    tds: 188,
    wqi: 91,
  },
  // Add more readings for WS001 to test the 30 limit
  ...Array.from({ length: 25 }, (_, i) => ({
    id: `${11 + i}`,
    stationId: "WS001",
    stationName: "Downtown River Station",
    timestamp: `2024-01-07 ${String(13 - Math.floor(i / 6)).padStart(
      2,
      "0"
    )}:${String(55 - (i % 6) * 5).padStart(2, "0")}:00`,
    ph: 7.0 + (Math.random() - 0.5) * 0.4,
    temperature: 18.0 + Math.random() * 2,
    dissolvedOxygen: 8.0 + (Math.random() - 0.5) * 0.6,
    turbidity: 2.0 + Math.random() * 0.5,
    conductivity: 450 + Math.random() * 20,
    tds: 225 + Math.random() * 10,
    wqi: 85 + Math.floor(Math.random() * 6),
  })),
];

// Mock chart data for analytics
const chartData = {
  wqiTrend: [
    { time: "00:00", WS001: 85, WS002: 67, WS003: 92 },
    { time: "04:00", WS001: 86, WS002: 65, WS003: 91 },
    { time: "08:00", WS001: 87, WS002: 68, WS003: 93 },
    { time: "12:00", WS001: 88, WS002: 66, WS003: 92 },
    { time: "16:00", WS001: 87, WS002: 65, WS003: 91 },
    { time: "20:00", WS001: 86, WS002: 67, WS003: 92 },
  ],
  parameterDistribution: [
    { parameter: "Excellent", value: 60, color: "#10b981" },
    { parameter: "Good", value: 25, color: "#3b82f6" },
    { parameter: "Fair", value: 12, color: "#f59e0b" },
    { parameter: "Poor", value: 3, color: "#ef4444" },
  ],
  predictiveInsights: [
    {
      station: "WS001",
      parameter: "pH",
      current: 7.2,
      predicted: 7.1,
      confidence: 85,
      trend: "decreasing",
    },
    {
      station: "WS001",
      parameter: "WQI",
      current: 87,
      predicted: 85,
      confidence: 88,
      trend: "decreasing",
    },
    {
      station: "WS002",
      parameter: "pH",
      current: 6.8,
      predicted: 6.9,
      confidence: 82,
      trend: "increasing",
    },
    {
      station: "WS002",
      parameter: "WQI",
      current: 65,
      predicted: 67,
      confidence: 80,
      trend: "increasing",
    },
    {
      station: "WS003",
      parameter: "pH",
      current: 7.4,
      predicted: 7.3,
      confidence: 95,
      trend: "stable",
    },
    {
      station: "WS003",
      parameter: "WQI",
      current: 92,
      predicted: 93,
      confidence: 93,
      trend: "increasing",
    },
  ],
};

// Mock predictive data
const predictiveData = {
  WS001: {
    ph: { current: 7.2, predicted: 7.1, trend: "decreasing", confidence: 85 },
    temperature: {
      current: 18.5,
      predicted: 19.2,
      trend: "increasing",
      confidence: 92,
    },
    dissolvedOxygen: {
      current: 8.3,
      predicted: 8.1,
      trend: "decreasing",
      confidence: 78,
    },
    wqi: { current: 87, predicted: 85, trend: "decreasing", confidence: 88 },
  },
  WS002: {
    ph: { current: 6.8, predicted: 6.9, trend: "increasing", confidence: 82 },
    temperature: {
      current: 22.1,
      predicted: 22.5,
      trend: "increasing",
      confidence: 89,
    },
    dissolvedOxygen: {
      current: 6.2,
      predicted: 6.0,
      trend: "decreasing",
      confidence: 75,
    },
    wqi: { current: 65, predicted: 67, trend: "increasing", confidence: 80 },
  },
  WS003: {
    ph: { current: 7.4, predicted: 7.3, trend: "stable", confidence: 95 },
    temperature: {
      current: 19.2,
      predicted: 19.0,
      trend: "stable",
      confidence: 91,
    },
    dissolvedOxygen: {
      current: 9.1,
      predicted: 9.2,
      trend: "increasing",
      confidence: 87,
    },
    wqi: { current: 92, predicted: 93, trend: "increasing", confidence: 93 },
  },
};

// Mock data for reports
const reportData = {
  monthlyTrends: [
    { month: "Dec", avgWQI: 82, alerts: 15, stations: 4 },
    { month: "Jan", avgWQI: 85, alerts: 12, stations: 4 },
  ],
  parameterAnalysis: {
    ph: { avg: 7.1, trend: "stable", compliance: 95 },
    temperature: { avg: 19.9, trend: "increasing", compliance: 100 },
    dissolvedOxygen: { avg: 7.9, trend: "stable", compliance: 90 },
    turbidity: { avg: 2.7, trend: "decreasing", compliance: 85 },
  },
};

// Mock data for water monitoring stations along Pasig River
const stations = [
  {
    id: "WS001",
    name: "Pasig River - Bagumbayan",
    location: "Bagumbayan, Marikina",
    coordinates: { lat: 14.6507, lng: 121.1052 }, // Near Bagumbayan Bridge
    status: "online",
    lastUpdate: "2 minutes ago",
    wqi: 87,
    health: "Good",
    parameters: {
      ph: {
        value: 7.2,
        status: "normal",
        unit: "pH",
        threshold: { min: 6.5, max: 8.5 },
      },
      temperature: {
        value: 28.5,
        status: "normal",
        unit: "°C",
        threshold: { min: 0, max: 35 },
      },
      dissolvedOxygen: {
        value: 6.3,
        status: "normal",
        unit: "mg/L",
        threshold: { min: 5, max: 15 },
      },
      turbidity: {
        value: 4.1,
        status: "warning",
        unit: "NTU",
        threshold: { min: 0, max: 5 },
      },
      conductivity: {
        value: 520,
        status: "normal",
        unit: "µS/cm",
        threshold: { min: 0, max: 1000 },
      },
      tds: {
        value: 260,
        status: "normal",
        unit: "ppm",
        threshold: { min: 0, max: 500 },
      },
    },
    alerts: 1,
    description:
      "Monitoring station near Bagumbayan Bridge - upstream location",
    installDate: "2023-03-15",
    lastMaintenance: "2024-01-01",
    nextMaintenance: "2024-04-01",
    calibration: {
      lastCalibrated: "2024-01-01",
      nextCalibration: "2024-02-01",
      status: "calibrated",
    },
  },
  {
    id: "WS002",
    name: "Pasig River - Guadalupe",
    location: "Guadalupe Bridge, Makati",
    coordinates: { lat: 14.5654, lng: 121.0454 }, // Near Guadalupe Bridge
    status: "warning",
    lastUpdate: "5 minutes ago",
    wqi: 45,
    health: "Poor",
    parameters: {
      ph: {
        value: 6.2,
        status: "warning",
        unit: "pH",
        threshold: { min: 6.5, max: 8.5 },
      },
      temperature: {
        value: 30.1,
        status: "high",
        unit: "°C",
        threshold: { min: 0, max: 35 },
      },
      dissolvedOxygen: {
        value: 3.8,
        status: "low",
        unit: "mg/L",
        threshold: { min: 5, max: 15 },
      },
      turbidity: {
        value: 8.2,
        status: "high",
        unit: "NTU",
        threshold: { min: 0, max: 5 },
      },
      conductivity: {
        value: 850,
        status: "high",
        unit: "µS/cm",
        threshold: { min: 0, max: 1000 },
      },
      tds: {
        value: 425,
        status: "high",
        unit: "ppm",
        threshold: { min: 0, max: 500 },
      },
    },
    alerts: 3,
    description:
      "Critical monitoring point near industrial area - pollution concerns",
    installDate: "2023-05-20",
    lastMaintenance: "2023-12-15",
    nextMaintenance: "2024-03-15",
    calibration: {
      lastCalibrated: "2023-12-15",
      nextCalibration: "2024-01-15",
      status: "needs_calibration",
    },
  },
  {
    id: "WS003",
    name: "Pasig River - Lambingan",
    location: "Lambingan Bridge, Pasig",
    coordinates: { lat: 14.5871, lng: 121.0813 }, // Near Lambingan Bridge
    status: "online",
    lastUpdate: "1 minute ago",
    wqi: 72,
    health: "Fair",
    parameters: {
      ph: {
        value: 7.0,
        status: "normal",
        unit: "pH",
        threshold: { min: 6.5, max: 8.5 },
      },
      temperature: {
        value: 29.2,
        status: "normal",
        unit: "°C",
        threshold: { min: 0, max: 35 },
      },
      dissolvedOxygen: {
        value: 5.1,
        status: "normal",
        unit: "mg/L",
        threshold: { min: 5, max: 15 },
      },
      turbidity: {
        value: 5.8,
        status: "warning",
        unit: "NTU",
        threshold: { min: 0, max: 5 },
      },
      conductivity: {
        value: 680,
        status: "normal",
        unit: "µS/cm",
        threshold: { min: 0, max: 1000 },
      },
      tds: {
        value: 340,
        status: "normal",
        unit: "ppm",
        threshold: { min: 0, max: 500 },
      },
    },
    alerts: 1,
    description: "Mid-stream monitoring station for trend analysis",
    installDate: "2023-04-10",
    lastMaintenance: "2024-01-05",
    nextMaintenance: "2024-04-05",
    calibration: {
      lastCalibrated: "2024-01-05",
      nextCalibration: "2024-02-05",
      status: "calibrated",
    },
  },
  {
    id: "WS004",
    name: "Pasig River - Estero de Paco",
    location: "Estero de Paco, Manila",
    coordinates: { lat: 14.5995, lng: 120.9842 }, // Near Manila Bay confluence
    status: "online",
    lastUpdate: "3 minutes ago",
    wqi: 58,
    health: "Fair",
    parameters: {
      ph: {
        value: 6.8,
        status: "normal",
        unit: "pH",
        threshold: { min: 6.5, max: 8.5 },
      },
      temperature: {
        value: 31.5,
        status: "high",
        unit: "°C",
        threshold: { min: 0, max: 35 },
      },
      dissolvedOxygen: {
        value: 4.5,
        status: "low",
        unit: "mg/L",
        threshold: { min: 5, max: 15 },
      },
      turbidity: {
        value: 6.5,
        status: "high",
        unit: "NTU",
        threshold: { min: 0, max: 5 },
      },
      conductivity: {
        value: 750,
        status: "normal",
        unit: "µS/cm",
        threshold: { min: 0, max: 1000 },
      },
      tds: {
        value: 375,
        status: "normal",
        unit: "ppm",
        threshold: { min: 0, max: 500 },
      },
    },
    alerts: 2,
    description:
      "Downstream monitoring before Manila Bay - tidal influence area",
    installDate: "2023-06-01",
    lastMaintenance: "2023-12-20",
    nextMaintenance: "2024-03-20",
    calibration: {
      lastCalibrated: "2023-12-20",
      nextCalibration: "2024-01-20",
      status: "calibrated",
    },
  },
];

const teamMembers = [
  {
    id: "1",
    name: "Dr. Sarah Chen",
    role: "Water Quality Specialist",
    email: "sarah.chen@aquasen.com",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "active",
    lastActive: "2 minutes ago",
    permissions: ["read", "write", "admin"],
  },
  {
    id: "2",
    name: "Mike Rodriguez",
    role: "Field Technician",
    email: "mike.rodriguez@aquasen.com",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "active",
    lastActive: "15 minutes ago",
    permissions: ["read", "write"],
  },
  {
    id: "3",
    name: "Emma Thompson",
    role: "Data Analyst",
    email: "emma.thompson@aquasen.com",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "offline",
    lastActive: "2 hours ago",
    permissions: ["read"],
  },
];

// Mock downloads data
const downloadsData = {
  firmware: [
    {
      id: "fw001",
      name: "Water Quality Sensor Firmware v2.1.3",
      version: "2.1.3",
      size: "2.4 MB",
      date: "2024-01-05",
      type: "firmware",
      description:
        "Latest firmware update with improved pH sensor accuracy and temperature compensation",
      compatible: ["WS001", "WS002", "WS003"],
    },
    {
      id: "fw002",
      name: "Turbidity Sensor Firmware v1.8.2",
      version: "1.8.2",
      size: "1.2 MB",
      date: "2023-12-20",
      type: "firmware",
      description: "Bug fixes for turbidity readings in low-light conditions",
      compatible: ["WS001", "WS003"],
    },
    {
      id: "fw003",
      name: "Communication Module Firmware v3.0.1",
      version: "3.0.1",
      size: "3.1 MB",
      date: "2024-01-02",
      type: "firmware",
      description:
        "Enhanced wireless connectivity and data transmission reliability",
      compatible: ["WS001", "WS002", "WS003"],
    },
  ],
  software: [
    {
      id: "sw001",
      name: "AquaMonitor Desktop Client v4.2.0",
      version: "4.2.0",
      size: "45.2 MB",
      date: "2024-01-07",
      type: "software",
      description:
        "Desktop application for advanced data analysis and station configuration",
      platform: "Windows/Mac/Linux",
    },
    {
      id: "sw002",
      name: "Station Configuration Tool v2.5.1",
      version: "2.5.1",
      size: "12.8 MB",
      date: "2023-12-28",
      type: "software",
      description:
        "Utility for configuring sensor parameters and calibration settings",
      platform: "Windows",
    },
    {
      id: "sw003",
      name: "Data Export Plugin v1.3.0",
      version: "1.3.0",
      size: "5.4 MB",
      date: "2024-01-03",
      type: "software",
      description:
        "Plugin for exporting data to various formats including CSV, Excel, and JSON",
      platform: "Cross-platform",
    },
  ],
  documentation: [
    {
      id: "doc001",
      name: "Installation Guide v3.1",
      version: "3.1",
      size: "8.2 MB",
      date: "2024-01-01",
      type: "documentation",
      description:
        "Complete installation and setup guide for water monitoring stations",
      format: "PDF",
    },
    {
      id: "doc002",
      name: "API Documentation v2.0",
      version: "2.0",
      size: "4.1 MB",
      date: "2023-12-15",
      type: "documentation",
      description: "Comprehensive API documentation for developers",
      format: "PDF",
    },
    {
      id: "doc003",
      name: "Troubleshooting Manual v1.8",
      version: "1.8",
      size: "6.7 MB",
      date: "2023-12-22",
      type: "documentation",
      description: "Common issues and solutions for water monitoring systems",
      format: "PDF",
    },
  ],
};

export default function WaterMonitoringDashboard() {
  const [currentView, setCurrentView] = useState("dashboard");
  const [selectedStationId, setSelectedStationId] = useState("WS001");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [editingStation, setEditingStation] = useState<string | null>(null);
  const [addingStation, setAddingStation] = useState(false);
  const [readingsFilter, setReadingsFilter] = useState("");
  const [stationSelectorOpen, setStationSelectorOpen] = useState(false);
  const [newStation, setNewStation] = useState({
    id: "",
    name: "",
    location: "",
    description: "",
    coordinates: { x: 50, y: 50 },
    parameters: {} as Record<
      string,
      { min: number; max: number; unit: string }
    >,
  });

  // Handle station click from map
  const handleStationClick = (stationId: string) => {
    setSelectedStationId(stationId);
    setCurrentView("stations");
  };

  const onlineStations = stations.filter((s) => s.status === "online").length;
  const warningStations = stations.filter((s) => s.status === "warning").length;
  const offlineStations = stations.filter((s) => s.status === "offline").length;
  const avgWQI = Math.round(
    stations.reduce((sum, station) => sum + station.wqi, 0) / stations.length
  );

  // Get filtered readings for selected station (limit to 30)
  const filteredReadings = useMemo(() => {
    const stationReadings = historicalReadings.filter(
      (r) => r.stationId === selectedStationId
    );

    const filtered = stationReadings.filter((reading) => {
      if (!readingsFilter) return true;

      const searchTerm = readingsFilter.toLowerCase();
      return (
        reading.timestamp.toLowerCase().includes(searchTerm) ||
        reading.ph.toString().includes(searchTerm) ||
        reading.temperature.toString().includes(searchTerm) ||
        reading.wqi.toString().includes(searchTerm)
      );
    });

    // Limit to 30 most recent readings
    return filtered.slice(0, 30);
  }, [selectedStationId, readingsFilter]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-emerald-500";
      case "warning":
        return "bg-amber-500";
      case "offline":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getWQIColor = (wqi: number) => {
    if (wqi >= 90) return "text-emerald-400";
    if (wqi >= 70) return "text-blue-400";
    if (wqi >= 50) return "text-amber-400";
    return "text-red-400";
  };

  const getParameterStatusColor = (status: string) => {
    switch (status) {
      case "normal":
        return "text-emerald-400";
      case "warning":
        return "text-amber-400";
      case "high":
      case "low":
        return "text-red-400";
      default:
        return "text-slate-400";
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "increasing":
        return "text-emerald-400";
      case "decreasing":
        return "text-red-400";
      case "stable":
        return "text-blue-400";
      default:
        return "text-slate-400";
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "increasing":
        return <TrendingUp className="h-4 w-4" />;
      case "decreasing":
        return <TrendingDown className="h-4 w-4" />;
      case "stable":
        return <BarChart className="h-4 w-4" />;
      default:
        return <BarChart className="h-4 w-4" />;
    }
  };

  const handleAddStation = () => {
    // Here you would typically send the data to your backend
    console.log("Adding new station:", newStation);
    setAddingStation(false);
    setNewStation({
      id: "",
      name: "",
      location: "",
      description: "",
      coordinates: { x: 50, y: 50 },
      parameters: {},
    });
  };

  const addParameter = () => {
    const paramName = `parameter_${
      Object.keys(newStation.parameters).length + 1
    }`;
    setNewStation({
      ...newStation,
      parameters: {
        ...newStation.parameters,
        [paramName]: { min: 0, max: 100, unit: "" },
      },
    });
  };
  const updateParameter = (
    paramName: string,
    field: string,
    value: string | number
  ) => {
    setNewStation({
      ...newStation,
      parameters: {
        ...newStation.parameters,
        [paramName]: {
          ...newStation.parameters[paramName],
          [field]: value,
        },
      },
    });
  };
  const removeParameter = (paramName: string) => {
    const { [paramName]: _, ...rest } = newStation.parameters;
    setNewStation({
      ...newStation,
      parameters: rest,
    });
  };

  const renderAddStationDialog = () => (
    <Dialog open={addingStation} onOpenChange={setAddingStation}>
      <DialogContent className="max-w-4xl bg-slate-900 border-slate-700 text-white max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white flex items-center gap-2">
            <Plus className="h-5 w-5 text-cyan-400" />
            Add New Station
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Station Info */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white text-lg">
                Station Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-slate-300">Station ID *</Label>
                  <Input
                    placeholder="e.g., WS004"
                    value={newStation.id}
                    onChange={(e) =>
                      setNewStation({ ...newStation, id: e.target.value })
                    }
                    className="mt-1 bg-slate-700 border-slate-600 text-white"
                  />
                </div>
                <div>
                  <Label className="text-slate-300">Station Name *</Label>
                  <Input
                    placeholder="e.g., North District Monitor"
                    value={newStation.name}
                    onChange={(e) =>
                      setNewStation({ ...newStation, name: e.target.value })
                    }
                    className="mt-1 bg-slate-700 border-slate-600 text-white"
                  />
                </div>
              </div>

              <div>
                <Label className="text-slate-300">Location *</Label>
                <Input
                  placeholder="e.g., North Industrial District"
                  value={newStation.location}
                  onChange={(e) =>
                    setNewStation({ ...newStation, location: e.target.value })
                  }
                  className="mt-1 bg-slate-700 border-slate-600 text-white"
                />
              </div>

              <div>
                <Label className="text-slate-300">Description</Label>
                <Textarea
                  placeholder="Brief description of the monitoring station..."
                  value={newStation.description}
                  onChange={(e) =>
                    setNewStation({
                      ...newStation,
                      description: e.target.value,
                    })
                  }
                  className="mt-1 bg-slate-700 border-slate-600 text-white"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-slate-300">Map X Coordinate (%)</Label>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    value={newStation.coordinates.x}
                    onChange={(e) =>
                      setNewStation({
                        ...newStation,
                        coordinates: {
                          ...newStation.coordinates,
                          x: Number.parseInt(e.target.value) || 50,
                        },
                      })
                    }
                    className="mt-1 bg-slate-700 border-slate-600 text-white"
                  />
                </div>
                <div>
                  <Label className="text-slate-300">Map Y Coordinate (%)</Label>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    value={newStation.coordinates.y}
                    onChange={(e) =>
                      setNewStation({
                        ...newStation,
                        coordinates: {
                          ...newStation.coordinates,
                          y: Number.parseInt(e.target.value) || 50,
                        },
                      })
                    }
                    className="mt-1 bg-slate-700 border-slate-600 text-white"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Parameters Configuration */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white text-lg flex items-center gap-2">
                  <Beaker className="h-5 w-5 text-cyan-400" />
                  Parameters Configuration
                </CardTitle>
                <Button
                  onClick={addParameter}
                  size="sm"
                  className="bg-cyan-500 hover:bg-cyan-600 text-white"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Parameter
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.keys(newStation.parameters).length === 0 ? (
                <div className="text-center py-8 text-slate-400">
                  <Beaker className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No parameters configured yet</p>
                  <p className="text-sm">
                    Click &quot;Add Parameter&quot; to start configuring sensor
                    parameters
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {Object.entries(newStation.parameters).map(
                    ([paramName, param]) => (
                      <div
                        key={paramName}
                        className="bg-slate-700 rounded-lg p-4"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <Input
                            placeholder="Parameter name (e.g., pH, Temperature)"
                            value={paramName.replace("parameter_", "")}
                            onChange={(e) => {
                              const newName = e.target.value || paramName;
                              const { [paramName]: oldParam, ...rest } =
                                newStation.parameters;
                              setNewStation({
                                ...newStation,
                                parameters: {
                                  ...rest,
                                  [newName]: oldParam,
                                },
                              });
                            }}
                            className="bg-slate-600 border-slate-500 text-white font-medium"
                          />
                          <Button
                            onClick={() => removeParameter(paramName)}
                            size="sm"
                            variant="ghost"
                            className="text-red-400 hover:text-red-300"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <Label className="text-slate-400 text-sm">
                              Min Threshold
                            </Label>
                            <Input
                              type="number"
                              value={param.min}
                              onChange={(e) =>
                                updateParameter(
                                  paramName,
                                  "min",
                                  Number.parseFloat(e.target.value) || 0
                                )
                              }
                              className="mt-1 bg-slate-600 border-slate-500 text-white"
                            />
                          </div>
                          <div>
                            <Label className="text-slate-400 text-sm">
                              Max Threshold
                            </Label>
                            <Input
                              type="number"
                              value={param.max}
                              onChange={(e) =>
                                updateParameter(
                                  paramName,
                                  "max",
                                  Number.parseFloat(e.target.value) || 100
                                )
                              }
                              className="mt-1 bg-slate-600 border-slate-500 text-white"
                            />
                          </div>
                          <div>
                            <Label className="text-slate-400 text-sm">
                              Unit
                            </Label>
                            <Input
                              placeholder="e.g., pH, °C, mg/L"
                              value={param.unit}
                              onChange={(e) =>
                                updateParameter(
                                  paramName,
                                  "unit",
                                  e.target.value
                                )
                              }
                              className="mt-1 bg-slate-600 border-slate-500 text-white"
                            />
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => setAddingStation(false)}
              className="border-slate-600 text-slate-300"
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddStation}
              disabled={
                !newStation.id || !newStation.name || !newStation.location
              }
              className="bg-cyan-500 hover:bg-cyan-600 text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Station
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  const renderStationManagement = (stationId: string) => {
    const station = stations.find((s) => s.id === stationId);
    if (!station) return null;

    return (
      <Dialog
        open={editingStation === stationId}
        onOpenChange={() => setEditingStation(null)}
      >
        <DialogContent className="max-w-4xl bg-slate-900 border-slate-700 text-white">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-white flex items-center gap-2">
              <Wrench className="h-5 w-5 text-cyan-400" />
              Station Management - {station.name}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Station Info */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white text-lg">
                  Station Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-slate-300">Station ID</Label>
                    <Input
                      defaultValue={station.id}
                      className="mt-1 bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-slate-300">Station Name</Label>
                    <Input
                      defaultValue={station.name}
                      className="mt-1 bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-slate-300">Location</Label>
                    <Input
                      defaultValue={station.location}
                      className="mt-1 bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-slate-300">Install Date</Label>
                    <Input
                      defaultValue={station.installDate}
                      className="mt-1 bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-slate-300">Next Maintenance</Label>
                    <Input
                      defaultValue={station.nextMaintenance}
                      className="mt-1 bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Parameter Configuration */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white text-lg flex items-center gap-2">
                  <Sliders className="h-5 w-5 text-cyan-400" />
                  Parameter Configuration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(station.parameters).map(([key, param]) => (
                    <div key={key} className="bg-slate-700 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-white font-medium capitalize">
                          {key.replace(/([A-Z])/g, " $1").trim()}
                        </h3>
                        <Badge
                          className={`${getParameterStatusColor(
                            param.status
                          )} bg-slate-800`}
                        >
                          {param.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <Label className="text-slate-400 text-sm">
                            Current Value
                          </Label>
                          <Input
                            defaultValue={param.value}
                            className="mt-1 bg-slate-600 border-slate-500 text-white"
                          />
                        </div>
                        <div>
                          <Label className="text-slate-400 text-sm">
                            Min Threshold
                          </Label>
                          <Input
                            defaultValue={param.threshold.min}
                            className="mt-1 bg-slate-600 border-slate-500 text-white"
                          />
                        </div>
                        <div>
                          <Label className="text-slate-400 text-sm">
                            Max Threshold
                          </Label>
                          <Input
                            defaultValue={param.threshold.max}
                            className="mt-1 bg-slate-600 border-slate-500 text-white"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Calibration Settings */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white text-lg flex items-center gap-2">
                  <Target className="h-5 w-5 text-cyan-400" />
                  Calibration Management
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-slate-300">Last Calibrated</Label>
                    <Input
                      defaultValue={station.calibration.lastCalibrated}
                      className="mt-1 bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-slate-300">Next Calibration</Label>
                    <Input
                      defaultValue={station.calibration.nextCalibration}
                      className="mt-1 bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-slate-300">Calibration Status</Label>
                    <Badge
                      className={`ml-2 ${
                        station.calibration.status === "calibrated"
                          ? "bg-emerald-500/20 text-emerald-400"
                          : "bg-amber-500/20 text-amber-400"
                      }`}
                    >
                      {station.calibration.status.replace("_", " ")}
                    </Badge>
                  </div>
                  <Button className="bg-cyan-500 hover:bg-cyan-600 text-white">
                    <Target className="h-4 w-4 mr-2" />
                    Run Calibration
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => setEditingStation(null)}
                className="border-slate-600 text-slate-300"
              >
                Cancel
              </Button>
              <Button className="bg-cyan-500 hover:bg-cyan-600 text-white">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  const renderPredictiveAnalyticsChart = () => (
    <Card className="bg-slate-900/50 backdrop-blur-sm border-slate-700 rounded-2xl">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Brain className="h-5 w-5 text-cyan-400" />
          AI Predictive Analytics - Next 24 Hours
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80 relative">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 800 300"
            className="overflow-visible"
          >
            {/* Grid lines */}
            <defs>
              <pattern
                id="predictive-grid"
                width="80"
                height="30"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 80 0 L 0 0 0 30"
                  fill="none"
                  stroke="rgb(71 85 105)"
                  strokeWidth="0.5"
                  opacity="0.3"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#predictive-grid)" />

            {/* Y-axis labels */}
            <text x="20" y="30" fill="rgb(148 163 184)" fontSize="12">
              100
            </text>
            <text x="20" y="80" fill="rgb(148 163 184)" fontSize="12">
              75
            </text>
            <text x="20" y="130" fill="rgb(148 163 184)" fontSize="12">
              50
            </text>
            <text x="20" y="180" fill="rgb(148 163 184)" fontSize="12">
              25
            </text>
            <text x="20" y="230" fill="rgb(148 163 184)" fontSize="12">
              0
            </text>

            {/* X-axis labels */}
            {["Now", "6h", "12h", "18h", "24h"].map((label, index) => (
              <text
                key={index}
                x={80 + index * 150}
                y="280"
                fill="rgb(148 163 184)"
                fontSize="12"
                textAnchor="middle"
              >
                {label}
              </text>
            ))}

            {/* WQI Prediction Lines */}
            <polyline
              fill="none"
              stroke="#06b6d4"
              strokeWidth="3"
              points="80,50 230,55 380,60 530,65 680,70"
            />
            <polyline
              fill="none"
              stroke="#f59e0b"
              strokeWidth="3"
              points="80,120 230,115 380,110 530,105 680,100"
            />
            <polyline
              fill="none"
              stroke="#10b981"
              strokeWidth="3"
              points="80,40 230,38 380,35 530,33 680,30"
            />

            {/* Confidence bands */}
            <polygon
              fill="#06b6d4"
              fillOpacity="0.1"
              points="80,45 230,50 380,55 530,60 680,65 680,75 530,70 380,65 230,60 80,55"
            />
            <polygon
              fill="#f59e0b"
              fillOpacity="0.1"
              points="80,115 230,110 380,105 530,100 680,95 680,105 530,110 380,115 230,120 80,125"
            />
            <polygon
              fill="#10b981"
              fillOpacity="0.1"
              points="80,35 230,33 380,30 530,28 680,25 680,35 530,38 380,40 230,43 80,45"
            />

            {/* Data points with confidence indicators */}
            {[0, 1, 2, 3, 4].map((index) => (
              <g key={index}>
                <circle
                  cx={80 + index * 150}
                  cy={50 + index * 5}
                  r="4"
                  fill="#06b6d4"
                />
                <circle
                  cx={80 + index * 150}
                  cy={120 - index * 5}
                  r="4"
                  fill="#f59e0b"
                />
                <circle
                  cx={80 + index * 150}
                  cy={40 - index * 2}
                  r="4"
                  fill="#10b981"
                />
              </g>
            ))}

            {/* Prediction indicators */}
            <text
              x="400"
              y="20"
              fill="rgb(148 163 184)"
              fontSize="14"
              textAnchor="middle"
              fontWeight="bold"
            >
              Predictive Confidence: 85-95%
            </text>
          </svg>

          {/* Legend */}
          <div className="absolute top-4 right-4 bg-slate-800 rounded-lg p-4 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-cyan-500 rounded-full"></div>
              <span className="text-slate-300 text-sm">Downtown (WS001)</span>
              <span className="text-cyan-400 text-xs font-medium">87→85</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-amber-500 rounded-full"></div>
              <span className="text-slate-300 text-sm">Industrial (WS002)</span>
              <span className="text-amber-400 text-xs font-medium">65→67</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-emerald-500 rounded-full"></div>
              <span className="text-slate-300 text-sm">
                Residential (WS003)
              </span>
              <span className="text-emerald-400 text-xs font-medium">
                92→93
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderAnalyticsCharts = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* WQI Trend Chart */}
      <Card className="bg-slate-900/50 backdrop-blur-sm border-slate-700 rounded-2xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <LineChart className="h-5 w-5 text-cyan-400" />
            WQI Trend (24 Hours)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 relative">
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 400 200"
              className="overflow-visible"
            >
              {/* Grid lines */}
              <defs>
                <pattern
                  id="grid-pattern"
                  width="40"
                  height="20"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 40 0 L 0 0 0 20"
                    fill="none"
                    stroke="rgb(71 85 105)"
                    strokeWidth="0.5"
                    opacity="0.3"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid-pattern)" />

              {/* Y-axis labels */}
              <text x="10" y="20" fill="rgb(148 163 184)" fontSize="12">
                100
              </text>
              <text x="10" y="70" fill="rgb(148 163 184)" fontSize="12">
                75
              </text>
              <text x="10" y="120" fill="rgb(148 163 184)" fontSize="12">
                50
              </text>
              <text x="10" y="170" fill="rgb(148 163 184)" fontSize="12">
                25
              </text>

              {/* X-axis labels */}
              {chartData.wqiTrend.map((point, index) => (
                <text
                  key={index}
                  x={50 + index * 55}
                  y="195"
                  fill="rgb(148 163 184)"
                  fontSize="12"
                  textAnchor="middle"
                >
                  {point.time}
                </text>
              ))}

              {/* WS001 Line */}
              <polyline
                fill="none"
                stroke="#06b6d4"
                strokeWidth="2"
                points={chartData.wqiTrend
                  .map(
                    (point, index) =>
                      `${50 + index * 55},${180 - point.WS001 * 1.6}`
                  )
                  .join(" ")}
              />

              {/* WS002 Line */}
              <polyline
                fill="none"
                stroke="#f59e0b"
                strokeWidth="2"
                points={chartData.wqiTrend
                  .map(
                    (point, index) =>
                      `${50 + index * 55},${180 - point.WS002 * 1.6}`
                  )
                  .join(" ")}
              />

              {/* WS003 Line */}
              <polyline
                fill="none"
                stroke="#10b981"
                strokeWidth="2"
                points={chartData.wqiTrend
                  .map(
                    (point, index) =>
                      `${50 + index * 55},${180 - point.WS003 * 1.6}`
                  )
                  .join(" ")}
              />

              {/* Data points */}
              {chartData.wqiTrend.map((point, index) => (
                <g key={index}>
                  <circle
                    cx={50 + index * 55}
                    cy={180 - point.WS001 * 1.6}
                    r="3"
                    fill="#06b6d4"
                  />
                  <circle
                    cx={50 + index * 55}
                    cy={180 - point.WS002 * 1.6}
                    r="3"
                    fill="#f59e0b"
                  />
                  <circle
                    cx={50 + index * 55}
                    cy={180 - point.WS003 * 1.6}
                    r="3"
                    fill="#10b981"
                  />
                </g>
              ))}
            </svg>

            {/* Legend */}
            <div className="absolute top-4 right-4 bg-slate-800 rounded-lg p-3 space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
                <span className="text-slate-300 text-sm">Downtown</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                <span className="text-slate-300 text-sm">Industrial</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                <span className="text-slate-300 text-sm">Residential</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Parameter Distribution */}
      <Card className="bg-slate-900/50 backdrop-blur-sm border-slate-700 rounded-2xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <PieChart className="h-5 w-5 text-cyan-400" />
            Water Quality Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center">
            <svg width="200" height="200" viewBox="0 0 200 200">
              {/* Pie chart segments */}
              <circle
                cx="100"
                cy="100"
                r="80"
                fill="#10b981"
                stroke="#1f2937"
                strokeWidth="2"
                strokeDasharray={`${(60 / 100) * 502.4} 502.4`}
                strokeDashoffset="0"
                transform="rotate(-90 100 100)"
              />
              <circle
                cx="100"
                cy="100"
                r="80"
                fill="#3b82f6"
                stroke="#1f2937"
                strokeWidth="2"
                strokeDasharray={`${(25 / 100) * 502.4} 502.4`}
                strokeDashoffset={`-${(60 / 100) * 502.4}`}
                transform="rotate(-90 100 100)"
              />
              <circle
                cx="100"
                cy="100"
                r="80"
                fill="#f59e0b"
                stroke="#1f2937"
                strokeWidth="2"
                strokeDasharray={`${(12 / 100) * 502.4} 502.4`}
                strokeDashoffset={`-${(85 / 100) * 502.4}`}
                transform="rotate(-90 100 100)"
              />
              <circle
                cx="100"
                cy="100"
                r="80"
                fill="#ef4444"
                stroke="#1f2937"
                strokeWidth="2"
                strokeDasharray={`${(3 / 100) * 502.4} 502.4`}
                strokeDashoffset={`-${(97 / 100) * 502.4}`}
                transform="rotate(-90 100 100)"
              />

              {/* Center circle */}
              <circle cx="100" cy="100" r="40" fill="#1e293b" />
              <text
                x="100"
                y="95"
                textAnchor="middle"
                fill="white"
                fontSize="14"
                fontWeight="bold"
              >
                Overall
              </text>
              <text
                x="100"
                y="110"
                textAnchor="middle"
                fill="#06b6d4"
                fontSize="18"
                fontWeight="bold"
              >
                {avgWQI}
              </text>
            </svg>
          </div>

          {/* Legend */}
          <div className="grid grid-cols-2 gap-3 mt-4">
            {chartData.parameterDistribution.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-slate-300 text-sm">{item.parameter}</span>
                <span className="text-slate-400 text-sm ml-auto">
                  {item.value}%
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderDashboard = () => {
    return (
      <>
        {/* Station Map - Moved to top */}
        <div className="mb-8">
          <Card className="bg-slate-900/50 backdrop-blur-sm border-slate-700 rounded-2xl">
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-cyan-400" />
                <CardTitle className="text-white">Station Network</CardTitle>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                  <span className="text-slate-400">
                    Excellent ({onlineStations})
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                  <span className="text-slate-400">
                    Fair ({warningStations})
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-slate-400">
                    Poor ({offlineStations})
                  </span>
                </div>
              </div>
            </CardHeader>{" "}
            <CardContent>
              <div className="relative bg-slate-800 rounded-2xl border border-slate-600 h-96 overflow-hidden">
                <DynamicMap
                  stations={stations}
                  onStationClick={handleStationClick}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-slate-900/50 backdrop-blur-sm border-slate-700 rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm font-medium">
                    Total Stations
                  </p>
                  <p className="text-3xl font-bold text-white mt-1">
                    {stations.length}
                  </p>
                  <div className="flex items-center gap-1 mt-2">
                    <TrendingUp className="h-4 w-4 text-emerald-400" />
                    <span className="text-emerald-400 text-sm font-medium">
                      12%
                    </span>
                    <span className="text-slate-400 text-sm">
                      vs last month
                    </span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-cyan-500 rounded-2xl flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 backdrop-blur-sm border-slate-700 rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm font-medium">
                    Average WQI
                  </p>
                  <p
                    className={`text-3xl font-bold mt-1 ${getWQIColor(avgWQI)}`}
                  >
                    {avgWQI}
                  </p>
                  <div className="flex items-center gap-1 mt-2">
                    <TrendingUp className="h-4 w-4 text-emerald-400" />
                    <span className="text-emerald-400 text-sm font-medium">
                      5%
                    </span>
                    <span className="text-slate-400 text-sm">
                      vs last month
                    </span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center">
                  <Gauge className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 backdrop-blur-sm border-slate-700 rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm font-medium">
                    Active Alerts
                  </p>
                  <p className="text-3xl font-bold text-amber-400 mt-1">
                    {stations.reduce((sum, station) => sum + station.alerts, 0)}
                  </p>
                  <div className="flex items-center gap-1 mt-2">
                    <TrendingDown className="h-4 w-4 text-red-400" />
                    <span className="text-red-400 text-sm font-medium">3%</span>
                    <span className="text-slate-400 text-sm">
                      vs last month
                    </span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-amber-500 rounded-2xl flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 backdrop-blur-sm border-slate-700 rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm font-medium">
                    System Health
                  </p>
                  <p className="text-3xl font-bold text-emerald-400 mt-1">
                    {Math.round((onlineStations / stations.length) * 100)}%
                  </p>
                  <div className="flex items-center gap-1 mt-2">
                    <TrendingUp className="h-4 w-4 text-emerald-400" />
                    <span className="text-emerald-400 text-sm font-medium">
                      8%
                    </span>
                    <span className="text-slate-400 text-sm">
                      vs last month
                    </span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center">
                  <Activity className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Predictive Analytics Chart */}
        <div className="mb-8">{renderPredictiveAnalyticsChart()}</div>

        {/* Analytics Charts */}
        {renderAnalyticsCharts()}

        {/* Active Alerts */}
        <div className="grid grid-cols-1 gap-6">
          <Card className="bg-slate-900/50 backdrop-blur-sm border-slate-700 rounded-2xl">
            <CardHeader>
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-400" />
                <CardTitle className="text-white">Active Alerts</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-l-4 border-l-amber-500 pl-4">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                  <div>
                    <h4 className="text-white font-medium">pH Level Warning</h4>
                    <p className="text-slate-400 text-sm mt-1">
                      Industrial Park Monitor - pH below optimal range
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-xs">
                      <span className="text-amber-400 font-medium">
                        pH: 6.8
                      </span>
                      <span className="text-slate-500">5 min ago</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-l-4 border-l-red-500 pl-4">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                  <div>
                    <h4 className="text-white font-medium">
                      High Conductivity
                    </h4>
                    <p className="text-slate-400 text-sm mt-1">
                      Industrial Park Monitor - Conductivity exceeds threshold
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-xs">
                      <span className="text-red-400 font-medium">
                        680 µS/cm
                      </span>
                      <span className="text-slate-500">5 min ago</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-l-4 border-l-cyan-500 pl-4">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-cyan-500 mt-0.5" />
                  <div>
                    <h4 className="text-white font-medium">System Update</h4>
                    <p className="text-slate-400 text-sm mt-1">
                      All sensors calibrated successfully
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-xs">
                      <span className="text-cyan-400 font-medium">
                        Completed
                      </span>
                      <span className="text-slate-500">1 hour ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </>
    );
  };

  const renderStations = () => {
    const selectedStation = stations.find((s) => s.id === selectedStationId);
    if (!selectedStation) return null;

    const predictions =
      predictiveData[selectedStationId as keyof typeof predictiveData];

    return (
      <div className="space-y-6">
        {/* Station Selector with Search */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Popover
              open={stationSelectorOpen}
              onOpenChange={setStationSelectorOpen}
            >
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={stationSelectorOpen}
                  className="w-80 justify-between bg-slate-800 border-slate-600 text-white hover:bg-slate-700"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-3 h-3 rounded-full ${getStatusColor(
                        selectedStation.status
                      )}`}
                    />
                    <span>{selectedStation.name}</span>
                    <Badge
                      className={`ml-2 ${getWQIColor(
                        selectedStation.wqi
                      )} bg-slate-700`}
                    >
                      WQI: {selectedStation.wqi}
                    </Badge>
                  </div>
                  <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0 bg-slate-800 border-slate-600">
                <Command className="bg-slate-800">
                  <CommandInput
                    placeholder="Search stations..."
                    className="text-white"
                  />
                  <CommandList>
                    <CommandEmpty>No station found.</CommandEmpty>
                    <CommandGroup>
                      {stations.map((station) => (
                        <CommandItem
                          key={station.id}
                          value={station.id}
                          onSelect={(currentValue) => {
                            setSelectedStationId(currentValue);
                            setStationSelectorOpen(false);
                          }}
                          className="text-white hover:bg-slate-700"
                        >
                          <div className="flex items-center gap-3 w-full">
                            <div
                              className={`w-3 h-3 rounded-full ${getStatusColor(
                                station.status
                              )}`}
                            />
                            <div className="flex-1">
                              <div className="font-medium">{station.name}</div>
                              <div className="text-sm text-slate-400">
                                {station.location}
                              </div>
                            </div>
                            <Badge
                              className={`${getWQIColor(
                                station.wqi
                              )} bg-slate-700`}
                            >
                              WQI: {station.wqi}
                            </Badge>
                            <Check
                              className={`ml-auto h-4 w-4 ${
                                selectedStationId === station.id
                                  ? "opacity-100"
                                  : "opacity-0"
                              }`}
                            />
                          </div>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex items-center gap-3">
            <Badge
              className={`${getWQIColor(
                selectedStation.wqi
              )} bg-slate-800 border-slate-600`}
            >
              WQI: {selectedStation.wqi}
            </Badge>
            <Badge
              className={`${
                selectedStation.status === "online"
                  ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                  : "bg-amber-500/20 text-amber-400 border-amber-500/30"
              }`}
            >
              {selectedStation.health}
            </Badge>
            <Button
              onClick={() => setEditingStation(selectedStation.id)}
              className="bg-cyan-500 hover:bg-cyan-600 text-white"
            >
              <Wrench className="h-4 w-4 mr-2" />
              Manage Station
            </Button>
            <Button
              onClick={() => setAddingStation(true)}
              variant="outline"
              className="border-slate-600 text-slate-300 hover:text-white bg-transparent"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Station
            </Button>
          </div>
        </div>

        {/* Station Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-slate-900/50 backdrop-blur-sm border-slate-700 rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm font-medium">
                    Current WQI
                  </p>
                  <p
                    className={`text-3xl font-bold mt-1 ${getWQIColor(
                      selectedStation.wqi
                    )}`}
                  >
                    {selectedStation.wqi}
                  </p>
                  <p className="text-slate-400 text-sm mt-1">
                    {selectedStation.health}
                  </p>
                </div>
                <div className="w-12 h-12 bg-cyan-500 rounded-2xl flex items-center justify-center">
                  <Gauge className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 backdrop-blur-sm border-slate-700 rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm font-medium">Status</p>
                  <p className="text-2xl font-bold text-white mt-1 capitalize">
                    {selectedStation.status}
                  </p>
                  <p className="text-slate-400 text-sm mt-1">
                    Updated {selectedStation.lastUpdate}
                  </p>
                </div>
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                    selectedStation.status === "online"
                      ? "bg-emerald-500"
                      : "bg-amber-500"
                  }`}
                >
                  {selectedStation.status === "online" ? (
                    <Wifi className="h-6 w-6 text-white" />
                  ) : (
                    <WifiOff className="h-6 w-6 text-white" />
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 backdrop-blur-sm border-slate-700 rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm font-medium">
                    Active Alerts
                  </p>
                  <p className="text-3xl font-bold text-amber-400 mt-1">
                    {selectedStation.alerts}
                  </p>
                  <p className="text-slate-400 text-sm mt-1">Current issues</p>
                </div>
                <div className="w-12 h-12 bg-amber-500 rounded-2xl flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 backdrop-blur-sm border-slate-700 rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm font-medium">
                    Next Maintenance
                  </p>
                  <p className="text-lg font-bold text-white mt-1">
                    {selectedStation.nextMaintenance}
                  </p>
                  <p className="text-slate-400 text-sm mt-1">Scheduled</p>
                </div>
                <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Data Visualization for Station */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Parameter Trends */}
          <Card className="bg-slate-900/50 backdrop-blur-sm border-slate-700 rounded-2xl">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <LineChart className="h-5 w-5 text-cyan-400" />
                Parameter Trends (Last 24h)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 relative">
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 400 200"
                  className="overflow-visible"
                >
                  {/* Grid lines */}
                  <defs>
                    <pattern
                      id="station-grid"
                      width="40"
                      height="20"
                      patternUnits="userSpaceOnUse"
                    >
                      <path
                        d="M 40 0 L 0 0 0 20"
                        fill="none"
                        stroke="rgb(71 85 105)"
                        strokeWidth="0.5"
                        opacity="0.3"
                      />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#station-grid)" />

                  {/* Sample trend lines for this station */}
                  <polyline
                    fill="none"
                    stroke="#06b6d4"
                    strokeWidth="2"
                    points="50,150 100,140 150,145 200,135 250,130 300,125"
                  />
                  <polyline
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="2"
                    points="50,120 100,115 150,110 200,105 250,100 300,95"
                  />
                  <polyline
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="2"
                    points="50,80 100,85 150,90 200,88 250,92 300,95"
                  />

                  {/* Data points */}
                  <circle cx="50" cy="150" r="3" fill="#06b6d4" />
                  <circle cx="100" cy="140" r="3" fill="#06b6d4" />
                  <circle cx="150" cy="145" r="3" fill="#06b6d4" />
                  <circle cx="200" cy="135" r="3" fill="#06b6d4" />
                  <circle cx="250" cy="130" r="3" fill="#06b6d4" />
                  <circle cx="300" cy="125" r="3" fill="#06b6d4" />
                </svg>

                {/* Legend */}
                <div className="absolute top-4 right-4 bg-slate-800 rounded-lg p-3 space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
                    <span className="text-slate-300 text-sm">pH</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                    <span className="text-slate-300 text-sm">DO</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                    <span className="text-slate-300 text-sm">Temp</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Predictive Analysis for Station */}
          {predictions && (
            <Card className="bg-slate-900/50 backdrop-blur-sm border-slate-700 rounded-2xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Brain className="h-5 w-5 text-cyan-400" />
                  AI Predictions & Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(predictions).map(([param, data]) => (
                    <div key={param} className="bg-slate-800 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-white font-semibold capitalize">
                          {param === "wqi"
                            ? "WQI"
                            : param.replace(/([A-Z])/g, " $1").trim()}
                        </h3>
                        <div
                          className={`flex items-center gap-2 ${getTrendColor(
                            data.trend
                          )}`}
                        >
                          {getTrendIcon(data.trend)}
                          <span className="text-sm font-medium">
                            {data.confidence}% confidence
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-2xl font-bold text-white">
                            {data.current} → {data.predicted}
                          </div>
                          <div className="text-slate-400 text-sm">
                            24-hour forecast
                          </div>
                        </div>
                        <div
                          className={`text-lg font-semibold ${getTrendColor(
                            data.trend
                          )}`}
                        >
                          {data.trend}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Parameter Analysis */}
        <Card className="bg-slate-900/50 backdrop-blur-sm border-slate-700 rounded-2xl">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <TestTube className="h-5 w-5 text-cyan-400" />
              Parameter Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(selectedStation.parameters).map(
                ([key, param]) => (
                  <div key={key} className="bg-slate-800 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-white font-semibold capitalize">
                        {key.replace(/([A-Z])/g, " $1").trim()}
                      </h3>
                      <Badge
                        className={`text-xs ${
                          param.status === "normal"
                            ? "bg-emerald-500/20 text-emerald-400"
                            : param.status === "warning"
                            ? "bg-amber-500/20 text-amber-400"
                            : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {param.status}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400 text-sm">Current</span>
                        <span
                          className={`font-semibold ${getParameterStatusColor(
                            param.status
                          )}`}
                        >
                          {param.value} {param.unit}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400 text-sm">Range</span>
                        <span className="text-slate-300 text-sm">
                          {param.threshold.min} - {param.threshold.max}{" "}
                          {param.unit}
                        </span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2 mt-3">
                        <div
                          className={`h-2 rounded-full ${
                            param.status === "normal"
                              ? "bg-emerald-500"
                              : param.status === "warning"
                              ? "bg-amber-500"
                              : "bg-red-500"
                          }`}
                          style={{
                            width: `${Math.min(
                              100,
                              ((param.value - param.threshold.min) /
                                (param.threshold.max - param.threshold.min)) *
                                100
                            )}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </CardContent>
        </Card>

        {/* Station Readings Table */}
        <Card className="bg-slate-900/50 backdrop-blur-sm border-slate-700 rounded-2xl">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white flex items-center gap-2">
                <Database className="h-5 w-5 text-cyan-400" />
                Station Readings ({filteredReadings.length} of 30 max)
              </CardTitle>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                  <Input
                    placeholder="Filter readings..."
                    value={readingsFilter}
                    onChange={(e) => setReadingsFilter(e.target.value)}
                    className="pl-10 w-64 bg-slate-800 border-slate-600 text-white placeholder:text-slate-400"
                  />
                </div>
                {readingsFilter && (
                  <Button
                    onClick={() => setReadingsFilter("")}
                    size="sm"
                    variant="ghost"
                    className="text-slate-400 hover:text-white"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
                <Button
                  size="sm"
                  variant="outline"
                  className="border-slate-600 text-slate-300 bg-transparent"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button
                  size="sm"
                  className="bg-cyan-500 hover:bg-cyan-600 text-white"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-700">
                    <TableHead className="text-slate-400">Timestamp</TableHead>
                    <TableHead className="text-slate-400">pH</TableHead>
                    <TableHead className="text-slate-400">Temp (°C)</TableHead>
                    <TableHead className="text-slate-400">DO (mg/L)</TableHead>
                    <TableHead className="text-slate-400">
                      Turbidity (NTU)
                    </TableHead>
                    <TableHead className="text-slate-400">
                      Conductivity (µS/cm)
                    </TableHead>
                    <TableHead className="text-slate-400">TDS (ppm)</TableHead>
                    <TableHead className="text-slate-400">WQI</TableHead>
                    <TableHead className="text-slate-400">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReadings.length > 0 ? (
                    filteredReadings.map((reading) => (
                      <TableRow key={reading.id} className="border-slate-700">
                        <TableCell className="text-slate-300">
                          {reading.timestamp}
                        </TableCell>
                        <TableCell className="text-white">
                          {reading.ph.toFixed(1)}
                        </TableCell>
                        <TableCell className="text-white">
                          {reading.temperature.toFixed(1)}
                        </TableCell>
                        <TableCell className="text-white">
                          {reading.dissolvedOxygen.toFixed(1)}
                        </TableCell>
                        <TableCell className="text-white">
                          {reading.turbidity.toFixed(1)}
                        </TableCell>
                        <TableCell className="text-white">
                          {reading.conductivity.toFixed(0)}
                        </TableCell>
                        <TableCell className="text-white">
                          {reading.tds.toFixed(0)}
                        </TableCell>
                        <TableCell
                          className={`font-semibold ${getWQIColor(
                            reading.wqi
                          )}`}
                        >
                          {reading.wqi}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-slate-400 hover:text-white"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-slate-400 hover:text-white"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={9}
                        className="text-center text-slate-400 py-8"
                      >
                        No readings found for this station
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Station Management Dialog */}
        {renderStationManagement(selectedStation.id)}
        {renderAddStationDialog()}
      </div>
    );
  };

  const renderDownloads = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-end">
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="border-slate-600 text-slate-300 hover:text-white bg-transparent"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Check for Updates
          </Button>
        </div>
      </div>

      {/* Firmware Updates */}
      <Card className="bg-slate-900/50 backdrop-blur-sm border-slate-700 rounded-2xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Zap className="h-5 w-5 text-cyan-400" />
            Firmware Updates
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {downloadsData.firmware.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 bg-slate-800 rounded-xl"
              >
                <div className="flex-1">
                  <h3 className="text-white font-semibold">{item.name}</h3>
                  <p className="text-slate-400 text-sm mt-1">
                    {item.description}
                  </p>
                  <div className="flex items-center gap-4 mt-2 text-xs">
                    <span className="text-cyan-400 font-medium">
                      v{item.version}
                    </span>
                    <span className="text-slate-500">{item.size}</span>
                    <span className="text-slate-500">{item.date}</span>
                    <div className="flex items-center gap-1">
                      <span className="text-slate-500">Compatible:</span>
                      {item.compatible.map((stationId) => (
                        <Badge
                          key={stationId}
                          className="bg-slate-700 text-slate-300 text-xs"
                        >
                          {stationId}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <Button className="bg-cyan-500 hover:bg-cyan-600 text-white">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Software Tools */}
      <Card className="bg-slate-900/50 backdrop-blur-sm border-slate-700 rounded-2xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Settings className="h-5 w-5 text-cyan-400" />
            Software Tools
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {downloadsData.software.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 bg-slate-800 rounded-xl"
              >
                <div className="flex-1">
                  <h3 className="text-white font-semibold">{item.name}</h3>
                  <p className="text-slate-400 text-sm mt-1">
                    {item.description}
                  </p>
                  <div className="flex items-center gap-4 mt-2 text-xs">
                    <span className="text-cyan-400 font-medium">
                      v{item.version}
                    </span>
                    <span className="text-slate-500">{item.size}</span>
                    <span className="text-slate-500">{item.date}</span>
                    <Badge className="bg-slate-700 text-slate-300 text-xs">
                      {item.platform}
                    </Badge>
                  </div>
                </div>
                <Button className="bg-cyan-500 hover:bg-cyan-600 text-white">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Documentation */}
      <Card className="bg-slate-900/50 backdrop-blur-sm border-slate-700 rounded-2xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <FileText className="h-5 w-5 text-cyan-400" />
            Documentation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {downloadsData.documentation.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 bg-slate-800 rounded-xl"
              >
                <div className="flex-1">
                  <h3 className="text-white font-semibold">{item.name}</h3>
                  <p className="text-slate-400 text-sm mt-1">
                    {item.description}
                  </p>
                  <div className="flex items-center gap-4 mt-2 text-xs">
                    <span className="text-cyan-400 font-medium">
                      v{item.version}
                    </span>
                    <span className="text-slate-500">{item.size}</span>
                    <span className="text-slate-500">{item.date}</span>
                    <Badge className="bg-slate-700 text-slate-300 text-xs">
                      {item.format}
                    </Badge>
                  </div>
                </div>
                <Button className="bg-cyan-500 hover:bg-cyan-600 text-white">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderReports = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-end">
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="border-slate-600 text-slate-300 hover:text-white bg-transparent"
          >
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Report
          </Button>
          <Button className="bg-cyan-500 hover:bg-cyan-600 text-white">
            <Download className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* Report Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-slate-900/50 backdrop-blur-sm border-slate-700 rounded-2xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium">
                  Monthly Reports
                </p>
                <p className="text-3xl font-bold text-white mt-1">24</p>
                <p className="text-emerald-400 text-sm mt-1">
                  Generated this month
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center">
                <FileText className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 backdrop-blur-sm border-slate-700 rounded-2xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium">
                  Compliance Rate
                </p>
                <p className="text-3xl font-bold text-emerald-400 mt-1">
                  92.5%
                </p>
                <p className="text-slate-400 text-sm mt-1">
                  Above regulatory standards
                </p>
              </div>
              <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 backdrop-blur-sm border-slate-700 rounded-2xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium">
                  Data Points
                </p>
                <p className="text-3xl font-bold text-white mt-1">15.2K</p>
                <p className="text-slate-400 text-sm mt-1">
                  Collected this month
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-500 rounded-2xl flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 backdrop-blur-sm border-slate-700 rounded-2xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium">
                  Trend Analysis
                </p>
                <p className="text-3xl font-bold text-cyan-400 mt-1">Stable</p>
                <p className="text-slate-400 text-sm mt-1">
                  Overall water quality
                </p>
              </div>
              <div className="w-12 h-12 bg-cyan-500 rounded-2xl flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Report Types */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-slate-900/50 backdrop-blur-sm border-slate-700 rounded-2xl">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <PieChart className="h-5 w-5 text-cyan-400" />
              Quick Reports
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <Button className="w-full justify-start bg-slate-800 hover:bg-slate-700 text-white border-slate-600">
                <FileText className="h-4 w-4 mr-3" />
                Daily Water Quality Summary
              </Button>
              <Button className="w-full justify-start bg-slate-800 hover:bg-slate-700 text-white border-slate-600">
                <BarChart3 className="h-4 w-4 mr-3" />
                Weekly Trend Analysis
              </Button>
              <Button className="w-full justify-start bg-slate-800 hover:bg-slate-700 text-white border-slate-600">
                <AlertTriangle className="h-4 w-4 mr-3" />
                Alert History Report
              </Button>
              <Button className="w-full justify-start bg-slate-800 hover:bg-slate-700 text-white border-slate-600">
                <CheckCircle className="h-4 w-4 mr-3" />
                Compliance Report
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 backdrop-blur-sm border-slate-700 rounded-2xl">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <LineChart className="h-5 w-5 text-cyan-400" />
              Parameter Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(reportData.parameterAnalysis).map(
                ([param, data]) => (
                  <div key={param} className="bg-slate-800 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-white font-semibold capitalize">
                        {param.replace(/([A-Z])/g, " $1").trim()}
                      </h3>
                      <Badge
                        className={`${
                          data.trend === "stable"
                            ? "bg-blue-500/20 text-blue-400"
                            : data.trend === "increasing"
                            ? "bg-amber-500/20 text-amber-400"
                            : "bg-emerald-500/20 text-emerald-400"
                        }`}
                      >
                        {data.trend}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-slate-400">Average:</span>
                        <span className="ml-2 text-white font-medium">
                          {data.avg}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400">Compliance:</span>
                        <span className="ml-2 text-emerald-400 font-medium">
                          {data.compliance}%
                        </span>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Reports */}
      <Card className="bg-slate-900/50 backdrop-blur-sm border-slate-700 rounded-2xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Clock className="h-5 w-5 text-cyan-400" />
            Recent Reports
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              {
                name: "Weekly Water Quality Report - Week 1",
                date: "2024-01-07",
                type: "Weekly Summary",
                status: "Generated",
              },
              {
                name: "Monthly Compliance Report - December",
                date: "2024-01-01",
                type: "Compliance",
                status: "Generated",
              },
              {
                name: "Alert Analysis Report",
                date: "2024-01-06",
                type: "Alert Summary",
                status: "Generated",
              },
            ].map((report, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-slate-800 rounded-lg"
              >
                <div>
                  <h3 className="text-white font-medium">{report.name}</h3>
                  <p className="text-slate-400 text-sm">
                    {report.type} • Generated on {report.date}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-emerald-500/20 text-emerald-400">
                    {report.status}
                  </Badge>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-slate-400 hover:text-white"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-end">
        <Button className="bg-cyan-500 hover:bg-cyan-600 text-white">
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <Card className="bg-slate-900/50 backdrop-blur-sm border-slate-700 rounded-2xl">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Settings className="h-5 w-5 text-cyan-400" />
              General Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="system-name" className="text-slate-300">
                  System Name
                </Label>
                <Input
                  id="system-name"
                  defaultValue="AquaMonitor System"
                  className="mt-2 bg-slate-800 border-slate-600 text-white"
                />
              </div>
              <div>
                <Label htmlFor="location" className="text-slate-300">
                  Primary Location
                </Label>
                <Input
                  id="location"
                  defaultValue="Water Treatment District"
                  className="mt-2 bg-slate-800 border-slate-600 text-white"
                />
              </div>
              <div>
                <Label htmlFor="timezone" className="text-slate-300">
                  Timezone
                </Label>
                <Select defaultValue="utc">
                  <SelectTrigger className="mt-2 bg-slate-800 border-slate-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-600">
                    <SelectItem value="utc">UTC</SelectItem>
                    <SelectItem value="est">Eastern Time</SelectItem>
                    <SelectItem value="pst">Pacific Time</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Monitoring Settings */}
        <Card className="bg-slate-900/50 backdrop-blur-sm border-slate-700 rounded-2xl">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Activity className="h-5 w-5 text-cyan-400" />
              Monitoring Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="sampling-interval" className="text-slate-300">
                  Sampling Interval (minutes)
                </Label>
                <Input
                  id="sampling-interval"
                  type="number"
                  defaultValue="5"
                  className="mt-2 bg-slate-800 border-slate-600 text-white"
                />
              </div>
              <div>
                <Label htmlFor="data-retention" className="text-slate-300">
                  Data Retention (days)
                </Label>
                <Input
                  id="data-retention"
                  type="number"
                  defaultValue="365"
                  className="mt-2 bg-slate-800 border-slate-600 text-white"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-slate-300">Auto-calibration</Label>
                  <p className="text-slate-500 text-sm">
                    Automatically calibrate sensors
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Alert Settings */}
        <Card className="bg-slate-900/50 backdrop-blur-sm border-slate-700 rounded-2xl">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Bell className="h-5 w-5 text-cyan-400" />
              Alert Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-slate-300">Email Notifications</Label>
                  <p className="text-slate-500 text-sm">
                    Send alerts via email
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-slate-300">SMS Notifications</Label>
                  <p className="text-slate-500 text-sm">
                    Send critical alerts via SMS
                  </p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-slate-300">
                    Real-time Dashboard Alerts
                  </Label>
                  <p className="text-slate-500 text-sm">
                    Show alerts on dashboard
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div>
                <Label htmlFor="alert-threshold" className="text-slate-300">
                  Alert Threshold Level
                </Label>
                <Select defaultValue="medium">
                  <SelectTrigger className="mt-2 bg-slate-800 border-slate-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-600">
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Parameter Thresholds */}
        <Card className="bg-slate-900/50 backdrop-blur-sm border-slate-700 rounded-2xl">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Beaker className="h-5 w-5 text-cyan-400" />
              Parameter Thresholds
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              {[
                { name: "pH Level", min: 6.5, max: 8.5, unit: "pH" },
                { name: "Temperature", min: 0, max: 30, unit: "°C" },
                { name: "Dissolved Oxygen", min: 5, max: 15, unit: "mg/L" },
                { name: "Turbidity", min: 0, max: 5, unit: "NTU" },
              ].map((param, index) => (
                <div key={index} className="bg-slate-800 rounded-lg p-4">
                  <h3 className="text-white font-medium mb-3">{param.name}</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-slate-400 text-sm">
                        Min Value
                      </Label>
                      <Input
                        type="number"
                        defaultValue={param.min}
                        className="mt-1 bg-slate-700 border-slate-600 text-white"
                      />
                    </div>
                    <div>
                      <Label className="text-slate-400 text-sm">
                        Max Value
                      </Label>
                      <Input
                        type="number"
                        defaultValue={param.max}
                        className="mt-1 bg-slate-700 border-slate-600 text-white"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Data Export Settings */}
        <Card className="bg-slate-900/50 backdrop-blur-sm border-slate-700 rounded-2xl">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Upload className="h-5 w-5 text-cyan-400" />
              Data Export Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="export-format" className="text-slate-300">
                  Default Export Format
                </Label>
                <Select defaultValue="csv">
                  <SelectTrigger className="mt-2 bg-slate-800 border-slate-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-600">
                    <SelectItem value="csv">CSV</SelectItem>
                    <SelectItem value="xlsx">Excel</SelectItem>
                    <SelectItem value="json">JSON</SelectItem>
                    <SelectItem value="pdf">PDF</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-slate-300">
                    Auto-export Daily Reports
                  </Label>
                  <p className="text-slate-500 text-sm">
                    Automatically export daily summaries
                  </p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-slate-300">Include Raw Data</Label>
                  <p className="text-slate-500 text-sm">
                    Include raw sensor readings in exports
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* System Maintenance */}
        <Card className="bg-slate-900/50 backdrop-blur-sm border-slate-700 rounded-2xl">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Zap className="h-5 w-5 text-cyan-400" />
              System Maintenance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label className="text-slate-300">System Status</Label>
                <div className="mt-2 flex items-center gap-2">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                  <span className="text-emerald-400">
                    All systems operational
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <Button className="w-full justify-start bg-slate-800 hover:bg-slate-700 text-white border-slate-600">
                  <RefreshCw className="h-4 w-4 mr-3" />
                  Run System Diagnostics
                </Button>
                <Button className="w-full justify-start bg-slate-800 hover:bg-slate-700 text-white border-slate-600">
                  <Database className="h-4 w-4 mr-3" />
                  Backup Database
                </Button>
                <Button className="w-full justify-start bg-slate-800 hover:bg-slate-700 text-white border-slate-600">
                  <Upload className="h-4 w-4 mr-3" />
                  Update System
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderTeam = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-end">
        <Button className="bg-cyan-500 hover:bg-cyan-600 text-white">
          <Plus className="h-4 w-4 mr-2" />
          Invite Member
        </Button>
      </div>

      <Card className="bg-slate-900/50 backdrop-blur-sm border-slate-700 rounded-2xl">
        <CardHeader>
          <CardTitle className="text-white">Team Members</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between p-4 bg-slate-800 rounded-xl"
              >
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={member.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="bg-cyan-500 text-white">
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-white font-semibold">{member.name}</h3>
                    <p className="text-slate-400 text-sm">{member.role}</p>
                    <p className="text-slate-500 text-xs">{member.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <Badge
                      className={`${
                        member.status === "active"
                          ? "bg-emerald-500/20 text-emerald-400"
                          : "bg-slate-500/20 text-slate-400"
                      }`}
                    >
                      {member.status}
                    </Badge>
                    <p className="text-slate-500 text-xs mt-1">
                      Last active: {member.lastActive}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-slate-400 hover:text-white"
                  >
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const selectedStation = stations.find((s) => s.id === selectedStationId);

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #8b5cf6 0%, transparent 50%),
                       radial-gradient(circle at 75% 75%, #06b6d4 0%, transparent 50%),
                       radial-gradient(circle at 50% 50%, #10b981 0%, transparent 50%)`,
            backgroundSize: "400px 400px, 600px 600px, 800px 800px",
          }}
        />
      </div>
      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                     linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      <div className="relative z-10 flex h-screen">
        {/* Simplified Sidebar */}
        <div
          className={`${
            sidebarCollapsed ? "w-16" : "w-80"
          } bg-slate-900/95 backdrop-blur-sm border-r border-slate-700 flex flex-col transition-all duration-300`}
        >
          {/* Logo and Toggle */}
          <div className="p-6 flex items-center justify-between">
            {!sidebarCollapsed && (
              <div className="flex items-center gap-3">
                <Image
                  src="/logo.svg"
                  alt="Aquasen Logo"
                  width={8}
                  height={8}
                  className="w-8 h-8"
                />
                <span className="text-white font-semibold text-lg">
                  Aquasen
                </span>
              </div>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="text-slate-400 hover:text-white"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>

          {/* User Profile */}
          {!sidebarCollapsed && (
            <div className="p-6 border-b border-slate-700">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src="/placeholder.svg?height=48&width=48" />
                  <AvatarFallback className="bg-cyan-500 text-white font-semibold">
                    WM
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-white font-semibold">Water Manager</h3>
                  <p className="text-slate-400 text-sm">System Administrator</p>
                </div>
              </div>
            </div>
          )}

          {/* Simple Navigation */}
          <div className="flex-1 p-4 space-y-2">
            <button
              onClick={() => setCurrentView("dashboard")}
              className={`flex items-center w-full p-3 text-left rounded-xl transition-colors ${
                sidebarCollapsed ? "justify-center" : "gap-3"
              } ${
                currentView === "dashboard"
                  ? "bg-cyan-500 text-white"
                  : "text-slate-300 hover:text-white hover:bg-slate-800"
              }`}
            >
              <BarChart3 className="h-5 w-5" />
              {!sidebarCollapsed && (
                <span className="font-medium">Dashboard</span>
              )}
            </button>

            <button
              onClick={() => setCurrentView("stations")}
              className={`flex items-center w-full p-3 text-left rounded-xl transition-colors ${
                sidebarCollapsed ? "justify-center" : "gap-3"
              } ${
                currentView === "stations"
                  ? "bg-cyan-500 text-white"
                  : "text-slate-300 hover:text-white hover:bg-slate-800"
              }`}
            >
              <MapPin className="h-5 w-5" />
              {!sidebarCollapsed && (
                <span className="font-medium">Stations</span>
              )}
            </button>

            <button
              onClick={() => setCurrentView("team")}
              className={`flex items-center w-full p-3 text-left rounded-xl transition-colors ${
                sidebarCollapsed ? "justify-center" : "gap-3"
              } ${
                currentView === "team"
                  ? "bg-cyan-500 text-white"
                  : "text-slate-300 hover:text-white hover:bg-slate-800"
              }`}
            >
              <Users className="h-5 w-5" />
              {!sidebarCollapsed && <span className="font-medium">Team</span>}
            </button>

            <button
              onClick={() => setCurrentView("reports")}
              className={`flex items-center w-full p-3 text-left rounded-xl transition-colors ${
                sidebarCollapsed ? "justify-center" : "gap-3"
              } ${
                currentView === "reports"
                  ? "bg-cyan-500 text-white"
                  : "text-slate-300 hover:text-white hover:bg-slate-800"
              }`}
            >
              <FileText className="h-5 w-5" />
              {!sidebarCollapsed && (
                <span className="font-medium">Reports</span>
              )}
            </button>

            <button
              onClick={() => setCurrentView("downloads")}
              className={`flex items-center w-full p-3 text-left rounded-xl transition-colors ${
                sidebarCollapsed ? "justify-center" : "gap-3"
              } ${
                currentView === "downloads"
                  ? "bg-cyan-500 text-white"
                  : "text-slate-300 hover:text-white hover:bg-slate-800"
              }`}
            >
              <Download className="h-5 w-5" />
              {!sidebarCollapsed && (
                <span className="font-medium">Downloads</span>
              )}
            </button>

            <button
              onClick={() => setCurrentView("settings")}
              className={`flex items-center w-full p-3 text-left rounded-xl transition-colors ${
                sidebarCollapsed ? "justify-center" : "gap-3"
              } ${
                currentView === "settings"
                  ? "bg-cyan-500 text-white"
                  : "text-slate-300 hover:text-white hover:bg-slate-800"
              }`}
            >
              <Settings className="h-5 w-5" />
              {!sidebarCollapsed && (
                <span className="font-medium">Settings</span>
              )}
            </button>
          </div>

          {/* Sign Out */}
          {!sidebarCollapsed && (
            <div className="p-4 border-t border-slate-700">
              <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors">
                <LogOut className="h-5 w-5" />
                <span className="font-medium">Sign Out</span>
              </button>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="bg-slate-900/50 backdrop-blur-sm border-b border-slate-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-white mb-1">
                  {currentView === "dashboard"
                    ? "Dashboard"
                    : currentView === "stations"
                    ? selectedStation?.name || "Station Management"
                    : currentView === "team"
                    ? "Team Management"
                    : currentView === "reports"
                    ? "Reports & Analytics"
                    : currentView === "downloads"
                    ? "Downloads & Updates"
                    : currentView === "settings"
                    ? "System Settings"
                    : "Dashboard"}
                </h1>
                <p className="text-slate-400">
                  {currentView === "dashboard"
                    ? ""
                    : currentView === "stations"
                    ? selectedStation
                      ? `${selectedStation.id} • ${selectedStation.location} • ${selectedStation.description}`
                      : "Focus on individual stations with data visualization, predictive modeling, and readings"
                    : currentView === "team"
                    ? "Manage team members and access permissions"
                    : currentView === "reports"
                    ? "Generate comprehensive water quality reports and insights"
                    : currentView === "downloads"
                    ? "Download firmware updates, software tools, and documentation"
                    : currentView === "settings"
                    ? "Configure system preferences and monitoring parameters"
                    : "Welcome back! Monitor your water quality network."}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-slate-400 hover:text-white"
                >
                  <Bell className="h-5 w-5" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-slate-400 hover:text-white"
                >
                  <Home className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </header>

          {/* Dashboard Content */}
          <div className="flex-1 p-6 overflow-auto">
            {currentView === "dashboard" && renderDashboard()}
            {currentView === "stations" && renderStations()}
            {currentView === "team" && renderTeam()}
            {currentView === "reports" && renderReports()}
            {currentView === "downloads" && renderDownloads()}
            {currentView === "settings" && renderSettings()}
          </div>
        </div>
      </div>
    </div>
  );
}
