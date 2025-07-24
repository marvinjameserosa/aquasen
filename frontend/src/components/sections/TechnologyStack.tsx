export default function TechnologyStack() {
  return (
    <section className="px-4 py-20 bg-gray-900/30">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                Built with Modern Technology
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Leveraging cutting-edge tools and frameworks for reliable
                performance
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
              <div className="flex flex-col items-center group cursor-pointer transition-all duration-300 ease-in-out hover:-translate-y-2">
                <div className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center mb-4 group-hover:bg-gray-700 group-hover:shadow-[0_8px_30px_rgba(59,130,246,0.4)] transition-all duration-300">
                  <span className="text-blue-400 font-bold group-hover:text-blue-300 transition-colors duration-300">TS</span>
                </div>
                <span className="text-gray-300 group-hover:text-white transition-colors duration-300">TypeScript</span>
              </div>

              <div className="flex flex-col items-center group cursor-pointer transition-all duration-300 ease-in-out hover:-translate-y-2">
                <div className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center mb-4 group-hover:bg-gray-700 group-hover:shadow-[0_8px_30px_rgba(6,182,212,0.4)] transition-all duration-300">
                  <span className="text-cyan-400 font-bold group-hover:text-cyan-300 transition-colors duration-300">React</span>
                </div>
                <span className="text-gray-300 group-hover:text-white transition-colors duration-300">React</span>
              </div>

              <div className="flex flex-col items-center group cursor-pointer transition-all duration-300 ease-in-out hover:-translate-y-2">
                <div className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center mb-4 group-hover:bg-gray-700 group-hover:shadow-[0_8px_30px_rgba(34,197,94,0.4)] transition-all duration-300">
                  <span className="text-green-400 font-bold group-hover:text-green-300 transition-colors duration-300">Node</span>
                </div>
                <span className="text-gray-300 group-hover:text-white transition-colors duration-300">Node.js</span>
              </div>

              <div className="flex flex-col items-center group cursor-pointer transition-all duration-300 ease-in-out hover:-translate-y-2">
                <div className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center mb-4 group-hover:bg-gray-700 group-hover:shadow-[0_8px_30px_rgba(168,85,247,0.4)] transition-all duration-300">
                  <span className="text-purple-400 font-bold group-hover:text-purple-300 transition-colors duration-300">IoT</span>
                </div>
                <span className="text-gray-300 group-hover:text-white transition-colors duration-300">IoT Sensors</span>
              </div>

              <div className="flex flex-col items-center group cursor-pointer transition-all duration-300 ease-in-out hover:-translate-y-2">
                <div className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center mb-4 group-hover:bg-gray-700 group-hover:shadow-[0_8px_30px_rgba(251,191,36,0.4)] transition-all duration-300">
                  <span className="text-yellow-400 font-bold group-hover:text-yellow-300 transition-colors duration-300">ML</span>
                </div>
                <span className="text-gray-300 group-hover:text-white transition-colors duration-300">Machine Learning</span>
              </div>

              <div className="flex flex-col items-center group cursor-pointer transition-all duration-300 ease-in-out hover:-translate-y-2">
                <div className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center mb-4 group-hover:bg-gray-700 group-hover:shadow-[0_8px_30px_rgba(248,113,113,0.4)] transition-all duration-300">
                  <span className="text-red-400 font-bold group-hover:text-red-300 transition-colors duration-300">API</span>
                </div>
                <span className="text-gray-300 group-hover:text-white transition-colors duration-300">REST API</span>
              </div>
            </div>
          </div>
        </section>
    );
}