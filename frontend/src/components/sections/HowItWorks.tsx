export default function HowItWorks() {
    return (
       <section className="px-4 py-20">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                How It Works
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Simple, powerful water quality monitoring in three steps
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">
                  Deploy Sensors
                </h3>
                <p className="text-gray-400">
                  Install IoT sensors at monitoring locations to collect
                  real-time water quality data
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">
                  Analyze Data
                </h3>
                <p className="text-gray-400">
                  AI-powered analytics process sensor data to calculate Water
                  Quality Index (WQI)
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">
                  Take Action
                </h3>
                <p className="text-gray-400">
                  Receive alerts and insights to make informed decisions about
                  water management
                </p>
              </div>
            </div>
          </div>
        </section>
    );
    }