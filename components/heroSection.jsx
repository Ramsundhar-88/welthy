'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function Hero() {
  return (
    <div className="pt-20 pb-10 px-4">
      <div className="container mx-auto text-center">
        <section className="pt-32 pb-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-4xl mx-auto">

              {/* Hero Title */}
              <h1 className="text-5xl md:text-8xl font-light mb-8 tracking-tight flex flex-wrap items-baseline gap-2 justify-center">
                <span>Your finances,</span>
                <span className="font-semibold md:ml-4">finally organized</span>
              </h1>

              {/* Subheading */}
              <p className="text-xl text-gray-600 mb-12 max-w-2xl leading-relaxed mx-auto">
                A thoughtfully designed platform that helps you understand where your money goes
                and make better financial decisions.
              </p>

              {/* CTA */}
              <div className="flex justify-center gap-4">
                <Link href="/dashboard">
                  <button className="cursor-pointer group px-8 py-4 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-all flex items-center gap-2">
                    Start tracking
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
              </div>
            </div>

            {/* Dashboard Preview */}
            <div className="mt-24 relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl border border-gray-200">
                {/* Mock window header */}
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-gray-300" />
                  <div className="w-3 h-3 rounded-full bg-gray-300" />
                  <div className="w-3 h-3 rounded-full bg-gray-300" />
                </div>

                {/* Dashboard Mockup */}
                <div className="bg-white p-12">
                  <div className="grid grid-cols-3 gap-6 mb-8">
                    <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100">
                      <div className="text-sm text-gray-500 mb-2">Monthly Income</div>
                      <div className="text-3xl font-semibold">₹15,240</div>
                    </div>
                    <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100">
                      <div className="text-sm text-gray-500 mb-2">Expenses</div>
                      <div className="text-3xl font-semibold">₹8,890</div>
                    </div>
                    <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100">
                      <div className="text-sm text-gray-500 mb-2">Savings</div>
                      <div className="text-3xl font-semibold">₹6,350</div>
                    </div>
                  </div>
                  <div className="h-64 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
