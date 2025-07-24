"use client";

import { Card } from "@/components/ui/card";
import { Star, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const testimonials = [
    {
      id: 1,
      quote:
        "Aquasen has revolutionized how we monitor water quality across our research sites. The real-time data and predictive analytics have been game-changing for our environmental studies.",
      name: "Dr. Sarah Chen",
      title: "Environmental Research Institute",
      company: "Research Institute",
      project: "Environmental Monitoring",
      savings: "60% time saved",
      initials: "DR",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      id: 2,
      quote:
        "The IoT sensor integration is seamless, and the dashboard provides exactly the insights we need for water management decisions. Highly recommended for any environmental monitoring project.",
      name: "Michael Johnson",
      title: "Water Authority Director",
      company: "City Water Authority",
      project: "Municipal Water System",
      savings: "40% efficiency boost",
      initials: "MJ",
      gradient: "from-cyan-500 to-green-500",
    },
    {
      id: 3,
      quote:
        "As a thesis researcher, Aquasen provided the perfect platform for my water quality studies. The data accuracy and analysis tools exceeded my expectations.",
      name: "Anna Lopez",
      title: "Graduate Researcher",
      company: "University Lab",
      project: "Thesis Research",
      savings: "Research completed 3x faster",
      initials: "AL",
      gradient: "from-green-500 to-purple-500",
    },
    {
      id: 4,
      quote:
        "Best investment we've made. The budget tracking caught potential overruns early, saving us $2M. The AI insights help us make data-driven decisions every day.",
      name: "Emily Watson",
      title: "Construction Director",
      company: "Skyline Builders",
      project: "Mixed-Use Development",
      savings: "$2M saved in overruns",
      initials: "EW",
      gradient: "from-blue-600 to-blue-700",
    },
  ];

  useEffect(() => {
    if (isAutoPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
      }, 4000); // Change every 4 seconds
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAutoPlaying, testimonials.length]);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="px-4 py-20 bg-gray-900/30 backdrop-blur-sm">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            What Our Users Say
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Trusted by environmental organizations and researchers worldwide
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          {/* Main testimonial card */}
          <Card className="bg-gradient-to-b from-gray-900/70 to-gray-800/50 border border-gray-700 p-8 md:p-12 text-center transition-all duration-500 ease-in-out hover:-translate-y-2 hover:shadow-[0_10px_50px_rgba(59,130,246,0.35)] rounded-xl">
            {/* Quote */}
            <div className="mb-8 relative">
              <div className="absolute -top-6 -left-2 text-7xl text-blue-500/20 font-serif">
                &ldquo;
              </div>
              <p className="text-gray-100 text-xl relative z-10 italic">
                {currentTestimonial.quote.replace(/"/g, '\\"')}
              </p>
              <div className="absolute -bottom-10 -right-2 text-7xl text-blue-500/20 font-serif">
                &rdquo;
              </div>
            </div>

            {/* Star rating */}
            <div className="flex justify-center text-yellow-400 mb-8">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current mx-0.5" />
              ))}
            </div>

            <div className="flex items-center justify-between">
              {/* Navigation button */}
              <button
                onClick={goToPrevious}
                aria-label="Previous testimonial"
                className="w-10 h-10 bg-blue-500/20 hover:bg-blue-500/40 rounded-full flex items-center justify-center transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-blue-300" />
              </button>

              {/* User details */}
              <div className="flex items-center space-x-4">
                <div
                  className={`w-14 h-14 bg-gradient-to-br ${currentTestimonial.gradient} rounded-full flex items-center justify-center shadow-lg`}
                >
                  <span className="text-white font-bold text-lg">
                    {currentTestimonial.initials}
                  </span>
                </div>
                <div className="text-left">
                  <div className="font-bold text-xl text-white">
                    {currentTestimonial.name}
                  </div>
                  <div className="text-gray-400">
                    {currentTestimonial.title}
                  </div>
                  <div className="text-blue-400 font-medium">
                    {currentTestimonial.company}
                  </div>
                </div>
              </div>

              {/* Navigation button */}
              <button
                onClick={goToNext}
                aria-label="Next testimonial"
                className="w-10 h-10 bg-blue-500/20 hover:bg-blue-500/40 rounded-full flex items-center justify-center transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-blue-300" />
              </button>
            </div>

            {/* Project & Savings info */}
            <div className="mt-8 flex flex-wrap justify-center items-center gap-4">
              <div className="text-sm text-gray-400 bg-gray-800/50 px-4 py-2 rounded-full">
                Project:{" "}
                <span className="text-white">{currentTestimonial.project}</span>
              </div>
              <div className="bg-gradient-to-r from-blue-600 to-blue-400 text-white px-5 py-2 rounded-full font-semibold text-sm">
                {currentTestimonial.savings}
              </div>
            </div>
          </Card>

          {/* Dot indicators & controls */}
          <div className="mt-8 flex items-center justify-center space-x-2">
            <button
              onClick={toggleAutoPlay}
              className="mr-4 bg-gray-800 hover:bg-gray-700 p-2 rounded-full transition-colors"
              aria-label={
                isAutoPlaying ? "Pause auto-scroll" : "Play auto-scroll"
              }
            >
              {isAutoPlaying ? (
                <Pause className="w-4 h-4 text-blue-400" />
              ) : (
                <Play className="w-4 h-4 text-blue-400" />
              )}
            </button>

            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-blue-500 w-6"
                    : "bg-gray-600 hover:bg-gray-500"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
