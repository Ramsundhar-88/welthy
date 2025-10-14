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

       <section id="features" className="py-32 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-20">
            <h2 className="text-5xl md:text-6xl font-light mb-6 tracking-tight">
              Everything you need,
              <br />
              <span className="font-semibold">nothing you don't</span>
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Powerful features wrapped in a simple, intuitive interface that respects your time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <div 
                key={i}
                className="group p-8 rounded-3xl bg-white border border-gray-200 hover:border-gray-300 transition-all"
              >
                <div className="w-12 h-12 rounded-2xl bg-gray-900 text-white flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      {/* <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-5xl font-light mb-6 tracking-tight">
                Built for the way
                <br />
                <span className="font-semibold">you actually work</span>
              </h2>
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Connect your accounts</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Securely link your bank accounts and credit cards. Your data is encrypted and always under your control.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Watch it organize</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Transactions are automatically categorized and analyzed. No spreadsheets, no manual entry.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Make better decisions</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Get insights that actually matter. See where your money goes and plan for what's next.
                  </p>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section> >*/}

      {/* CTA Section */}
      <section className="py-32 px-6 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-light mb-6 tracking-tight">
            Start managing your
            <br />
            <span className="font-semibold">finances today</span>
          </h2>
          <p className="text-xl text-gray-400 mb-12 leading-relaxed">
            No credit card required. No commitment. Just better financial clarity.
          </p>
          <button className="px-10 py-5 bg-white text-gray-900 rounded-full hover:bg-gray-100 transition-colors text-lg font-medium">
            Get Started Free
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-gray-200">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-gray-600">© 2025 Welth</div>
          <div className="flex gap-8">
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Privacy</a>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Terms</a>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;