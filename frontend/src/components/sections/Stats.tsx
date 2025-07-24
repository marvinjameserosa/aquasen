"use client";

import { useState, useEffect, useRef } from "react";

const useCountUp = (
  end: number,
  duration: number = 2000,
  shouldStart: boolean = false
) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!shouldStart) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      const easeOutQuart = 1 - Math.pow(1 - progress, 4);

      setCount(Math.floor(end * easeOutQuart));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration, shouldStart]);

  return count;
};

const formatNumber = (num: number, originalText: string) => {
  if (originalText.includes("K+")) {
    return `${(num / 1000).toFixed(0)}K+`;
  }
  if (originalText.includes("M+")) {
    return `${(num / 1000000).toFixed(1)}M+`;
  }
  if (originalText.includes("%")) {
    return `${(num / 10).toFixed(1)}%`;
  }
  if (
    originalText.includes("+") &&
    !originalText.includes("K") &&
    !originalText.includes("M")
  ) {
    return `${num}+`;
  }
  return num.toString();
};

export default function Stats() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const stats = [
    {
      value: 10000,
      display: "10K+",
      label: "Monitoring Stations",
      color: "text-blue-400",
    },
    {
      value: 1000000,
      display: "1M+",
      label: "Data Points",
      color: "text-cyan-400",
    },
    { value: 999, display: "99.9%", label: "Uptime", color: "text-green-400" },
    { value: 50, display: "50+", label: "Countries", color: "text-yellow-400" },
  ];

  const animatedValue1 = useCountUp(stats[0].value, 2000, isVisible);
  const animatedValue2 = useCountUp(stats[1].value, 2200, isVisible);
  const animatedValue3 = useCountUp(stats[2].value, 2400, isVisible);
  const animatedValue4 = useCountUp(stats[3].value, 2600, isVisible);
  const animatedValues = [
    animatedValue1,
    animatedValue2,
    animatedValue3,
    animatedValue4,
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.4 }
    );

    const currentRef = sectionRef.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="px-4 py-20 bg-gradient-to-r from-purple-900/20 to-cyan-900/20"
    >
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index}>
              <div className={`text-4xl font-bold ${stat.color} mb-2`}>
                {formatNumber(animatedValues[index], stat.display)}
              </div>
              <div className="text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
