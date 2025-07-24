import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function Pricing() {
  return (
    <section className="px-4 py-20">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                Choose Your Plan
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Flexible pricing options for organizations of all sizes
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <Card className="bg-gray-900/50 border-gray-800 p-8 relative hover:bg-gray-900/70 transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(59,130,246,0.3)] hover:border-blue-500/50">
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-4 text-white">
                    Starter
                  </h3>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-blue-400">
                      $99
                    </span>
                    <span className="text-gray-400">/month</span>
                  </div>
                  <ul className="space-y-3 mb-8 text-left">
                    <li className="flex items-center text-gray-300">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                      Up to 5 monitoring stations
                    </li>
                    <li className="flex items-center text-gray-300">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                      Real-time data collection
                    </li>
                    <li className="flex items-center text-gray-300">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                      Basic analytics dashboard
                    </li>
                    <li className="flex items-center text-gray-300">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                      Email alerts
                    </li>
                  </ul>
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
                    Get Started
                  </Button>
                </div>
              </Card>

              <Card className="bg-gray-900/50 border-blue-500 p-8 relative hover:bg-gray-900/70 transition-all duration-300 ease-in-out hover:-translate-y-3 hover:shadow-[0_15px_50px_rgba(59,130,246,0.4)] hover:border-blue-400 hover:scale-105">
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white">
                  Most Popular
                </Badge>
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-4 text-white">
                    Professional
                  </h3>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-blue-400">
                      $299
                    </span>
                    <span className="text-gray-400">/month</span>
                  </div>
                  <ul className="space-y-3 mb-8 text-left">
                    <li className="flex items-center text-gray-300">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                      Up to 25 monitoring stations
                    </li>
                    <li className="flex items-center text-gray-300">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                      Advanced predictive analytics
                    </li>
                    <li className="flex items-center text-gray-300">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                      Custom reporting
                    </li>
                    <li className="flex items-center text-gray-300">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                      API access
                    </li>
                    <li className="flex items-center text-gray-300">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                      Priority support
                    </li>
                  </ul>
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
                    Get Started
                  </Button>
                </div>
              </Card>

              <Card className="bg-gray-900/50 border-gray-800 p-8 relative hover:bg-gray-900/70 transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(59,130,246,0.3)] hover:border-blue-500/50">
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-4 text-white">
                    Enterprise
                  </h3>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-blue-400">
                      Custom
                    </span>
                  </div>
                  <ul className="space-y-3 mb-8 text-left">
                    <li className="flex items-center text-gray-300">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                      Unlimited monitoring stations
                    </li>
                    <li className="flex items-center text-gray-300">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                      White-label solutions
                    </li>
                    <li className="flex items-center text-gray-300">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                      Custom integrations
                    </li>
                    <li className="flex items-center text-gray-300">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                      Dedicated support team
                    </li>
                    <li className="flex items-center text-gray-300">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                      On-premise deployment
                    </li>
                  </ul>
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
                    Contact Sales
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </section>
  );
}