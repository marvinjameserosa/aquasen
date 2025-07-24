import { Card } from "@/components/ui/card";
import { Globe, Shield, Zap } from "lucide-react";

export default function Features() {
  return (
    <section id="features" className="px-4 py-20">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Built for the Future
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            The Swiss Army Knife of Environmental Monitoring.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="bg-gray-900/50 border-gray-800 p-8 hover:bg-gray-900/70 transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(59,130,246,0.3)]">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-6">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-4 text-white">
              Real-time Monitoring
            </h3>
            <p className="text-gray-400">
              Continuous tracking of water quality parameters for immediate
              insights and alerts.
            </p>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800 p-8 hover:bg-gray-900/70 transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(6,182,212,0.3)]">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-lg flex items-center justify-center mb-6">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-4 text-white">
              Accurate Sensors
            </h3>
            <p className="text-gray-400">
              Precision IoT sensors providing reliable and consistent data for
              water quality analysis.
            </p>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800 p-8 hover:bg-gray-900/70 transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(34,197,94,0.3)]">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center mb-6">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-4 text-white">
              Predictive Analytics
            </h3>
            <p className="text-gray-400">
              Leverage ML models for water quality prediction and proactive
              environmental management.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
}
