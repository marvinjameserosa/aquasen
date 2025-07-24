import { Card } from "@/components/ui/card";
import { Globe, Shield, Calendar } from "lucide-react";
import Link from "next/link";

export default function GettingStarted() {
  return (
    <section className="px-4 py-20 bg-gradient-to-r from-blue-900/20 to-cyan-900/20">
      <div className="container mx-auto">
        {" "}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Simple. Powerful. Revolutionary.
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Water quality monitoring has never been this intuitive. In just
            three steps, you&apos;ll have real-time insights that protect what
            matters most.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="space-y-6">
              {" "}
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-lg font-bold">1</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    Connect Your Sensors
                  </h3>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    Simply plug in your water quality sensors. Our intelligent
                    system automatically detects and configures them for you.
                  </p>
                  <div className="mt-4 px-4 py-2 bg-blue-900/30 rounded-lg border border-blue-500/20">
                    <span className="text-blue-400 text-sm font-medium">
                      ✨ Auto-detection in seconds
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-lg font-bold">2</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    Watch the Magic Happen
                  </h3>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    Real-time data flows into beautiful, intuitive dashboards.
                    No configuration needed. Just pure insights.
                  </p>
                  <div className="mt-4 px-4 py-2 bg-cyan-900/30 rounded-lg border border-cyan-500/20">
                    <span className="text-cyan-400 text-sm font-medium">
                      📊 Live data visualization
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-green-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-lg font-bold">3</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    Protect What Matters
                  </h3>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    Get instant alerts when water quality changes. Make informed
                    decisions with confidence and precision.
                  </p>
                  <div className="mt-4 px-4 py-2 bg-green-900/30 rounded-lg border border-green-500/20">
                    <span className="text-green-400 text-sm font-medium">
                      🛡️ Smart notifications
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>{" "}
          <div>
            <Card className="bg-gray-900/50 border-gray-800 p-8">
              <h3 className="text-2xl font-bold mb-6 text-white">
                Ready to Transform Your Water Quality Monitoring?
              </h3>
              <div className="space-y-6">
                <Link
                  href="/demo"
                  className="flex items-center justify-center w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl"
                >
                  <span>Start Free Trial</span>
                </Link>
                <Link
                  href="/pricing"
                  className="flex items-center justify-center w-full py-3 px-6 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800 hover:border-gray-500 transition-all duration-300 font-medium"
                >
                  <span>View Pricing</span>
                </Link>
                <div className="pt-4 border-t border-gray-700">
                  <p className="text-sm text-gray-400 text-center mb-4">
                    Learn More
                  </p>
                  <div className="space-y-3">
                    <Link
                      href="/demo-video"
                      className="flex items-center space-x-3 text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      <Globe className="w-5 h-5" />
                      <span>Watch Product Demo</span>
                    </Link>
                    <Link
                      href="/case-studies"
                      className="flex items-center space-x-3 text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      <Shield className="w-5 h-5" />
                      <span>Customer Success Stories</span>
                    </Link>
                    <Link
                      href="/contact"
                      className="flex items-center space-x-3 text-green-400 hover:text-green-300 transition-colors"
                    >
                      <Calendar className="w-5 h-5" />
                      <span>Schedule a Consultation</span>
                    </Link>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
