import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Contact() {
  return (
    <section className="px-4 py-20">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">
          Ready to Get Started?
        </h2>
        <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
          Join the future of water quality monitoring. Contact us to learn more
          about implementing Aquasen in your organization.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-lg px-8 py-3 hover:scale-105 transition-all duration-300 ease-in-out hover:shadow-[0_8px_30px_rgba(59,130,246,0.4)]"
          >
            Contact Us
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-gray-600 text-white hover:bg-gray-800 text-lg px-8 py-3 bg-transparent hover:scale-105 transition-all duration-300 ease-in-out hover:shadow-[0_8px_30px_rgba(156,163,175,0.3)] hover:border-gray-500"
          >
            Schedule Demo
          </Button>
        </div>
      </div>
    </section>
  );
}
