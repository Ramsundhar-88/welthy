import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import {
  featuresData,
  howItWorksData,
  statsData,
  testimonialsData,
} from "@/data/landing";
import HeroSection from "@/components/heroSection";
import Link from "next/link";
import { TrendingUp, Shield, Zap, BarChart3, PieChart, Wallet } from 'lucide-react';

const features = [
  { 
    icon: <TrendingUp className="w-5 h-5" />, 
    title: "Smart Tracking", 
    desc: "Automatically categorize and analyze your spending patterns over time" 
  },
  { 
    icon: <BarChart3 className="w-5 h-5" />, 
    title: "Visual Reports", 
    desc: "Beautiful charts that make understanding your finances effortless" 
  },
  { 
    icon: <Shield className="w-5 h-5" />, 
    title: "Secure & Private", 
    desc: "Your financial data stays encrypted and under your control" 
  },
  { 
    icon: <Zap className="w-5 h-5" />, 
    title: "Real-Time Updates", 
    desc: "See your financial picture update instantly across all devices" 
  },
  { 
    icon: <PieChart className="w-5 h-5" />, 
    title: "Budget Planning", 
    desc: "Set realistic goals and watch your progress in real time" 
  },
  { 
    icon: <Wallet className="w-5 h-5" />, 
    title: "Multi-Account", 
    desc: "Manage all your accounts in one unified, beautiful interface" 
  }
];

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <section id="features" className="py-16 md:py-24 lg:py-32 px-4 md:px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-12 md:mb-16 lg:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-4 md:mb-6 tracking-tight">
              Everything you need,
              <br />
              <span className="font-semibold">nothing you don&apos;t</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed">
              Powerful features wrapped in a simple, intuitive interface that respects your time.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {features.map((feature, i) => (
              <div 
                key={i}
                className="group p-6 md:p-8 rounded-2xl md:rounded-3xl bg-white border border-gray-200 hover:border-gray-300 transition-all"
              >
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-gray-900 text-white flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3">
                  {feature.title}
                </h3>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 lg:py-32 px-4 md:px-6 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-4 md:mb-6 tracking-tight">
            Start managing your
            <br />
            <span className="font-semibold">finances today</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 mb-8 md:mb-12 leading-relaxed px-4">
            No credit card required. No commitment. Just better financial clarity.
          </p>
          <button className="px-8 md:px-10 py-4 md:py-5 bg-white text-gray-900 rounded-full hover:bg-gray-100 transition-colors text-base md:text-lg font-medium">
            Get Started Free
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 md:py-12 px-4 md:px-6 border-t border-gray-200">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
          <div className="text-gray-600 text-sm md:text-base">© 2025 Welth</div>
          <div className="flex gap-6 md:gap-8">
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors text-sm md:text-base">Privacy</a>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors text-sm md:text-base">Terms</a>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors text-sm md:text-base">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;