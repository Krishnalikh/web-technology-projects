'use client'

import { useState } from 'react'

type AdType = {
  id: number
  name: string
  description: string
  basePrice: number // price per hour
}

const adTypes: AdType[] = [
  { id: 1, name: "Commercial Ads", description: "High impact ads for businesses.", basePrice: 100 },
  { id: 2, name: "Normal Ads", description: "Standard ads for general promotion.", basePrice: 50 },
  { id: 3, name: "Educational Ads", description: "Ads targeting educational content.", basePrice: 40 },
  { id: 4, name: "Social Media Ads", description: "Reach social platforms effectively.", basePrice: 60 },
  { id: 5, name: "Banner Ads", description: "Static or animated banners.", basePrice: 30 },
  { id: 6, name: "Video Ads", description: "Short video advertisements.", basePrice: 120 },
  { id: 7, name: "Mobile Ads", description: "Ads optimized for mobile devices.", basePrice: 70 },
  { id: 8, name: "Popup Ads", description: "Attention-grabbing popups.", basePrice: 35 },
  { id: 9, name: "Email Ads", description: "Targeted email campaigns.", basePrice: 80 },
  { id: 10, name: "Influencer Ads", description: "Collaboration with influencers.", basePrice: 150 },
]

export default function PricingPage() {
  const [selectedAd, setSelectedAd] = useState(adTypes[0].id)
  const [duration, setDuration] = useState(1) // in hours

  const ad = adTypes.find(a => a.id === selectedAd)!

  // Pricing logic
  let totalPrice = ad.basePrice * duration

  // Optional discount: 10% off for 10+ hours
  if (duration >= 10) totalPrice *= 0.9

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      <h2 className="text-3xl font-bold text-center mb-8">💰 AdMyBrand Pricing Calculator</h2>

      {/* Pricing Table */}
      <section className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300 dark:border-zinc-700 rounded-lg">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="py-3 px-4 text-left rounded-tl-lg">Ad Type</th>
              <th className="py-3 px-4 text-left">Description</th>
              <th className="py-3 px-4 text-right rounded-tr-lg">Price per Hour ($)</th>
            </tr>
          </thead>
          <tbody>
            {adTypes.map((adType) => (
              <tr
                key={adType.id}
                className={`border-t border-gray-200 dark:border-zinc-700 hover:bg-blue-50 dark:hover:bg-zinc-800 cursor-pointer ${
                  selectedAd === adType.id ? "bg-blue-100 dark:bg-blue-900 font-semibold" : ""
                }`}
                onClick={() => setSelectedAd(adType.id)}
              >
                <td className="py-3 px-4">{adType.name}</td>
                <td className="py-3 px-4 text-gray-700 dark:text-gray-300">{adType.description}</td>
                <td className="py-3 px-4 text-right">{adType.basePrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Calculator Controls */}
      <section className="border border-gray-300 dark:border-zinc-700 rounded-lg p-6 bg-gray-50 dark:bg-zinc-900">
        <h3 className="text-xl font-semibold mb-4">Calculate Your Price</h3>
        <div className="flex flex-col md:flex-row md:items-center md:space-x-8 space-y-4 md:space-y-0 max-w-md">
          <div className="flex flex-col w-full">
            <label htmlFor="adType" className="mb-1 font-medium">Select Ad Type</label>
            <select
              id="adType"
              value={selectedAd}
              onChange={e => setSelectedAd(parseInt(e.target.value))}
              className="border px-3 py-2 rounded-md"
            >
              {adTypes.map(adType => (
                <option key={adType.id} value={adType.id}>{adType.name}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col w-full max-w-xs">
            <label htmlFor="duration" className="mb-1 font-medium">Duration (hours)</label>
            <input
              type="number"
              id="duration"
              min={1}
              max={72}
              value={duration}
              onChange={e => setDuration(Math.max(1, Math.min(72, Number(e.target.value))))}
              className="border px-3 py-2 rounded-md"
            />
          </div>
        </div>

        {/* Display Selected Ad Description */}
        <p className="mt-4 text-gray-700 dark:text-gray-300 italic">Selected: <strong>{ad.name}</strong> - {ad.description}</p>

        {/* Total Price */}
        <div className="mt-6 text-2xl font-bold">
          Estimated Cost:{" "}
          <span className="text-blue-600">${totalPrice.toFixed(2)}</span>
          {duration >= 10 && (
            <span className="ml-3 text-green-600 font-semibold text-base">(10% discount applied!)</span>
          )}
        </div>
      </section>

      {/* Extra Info Section */}
      <section className="text-center text-gray-700 dark:text-gray-300 space-y-3 max-w-lg mx-auto">
        <p>
          Need a custom plan? Contact our sales team at <a href="mailto:sales@admybrand.com" className="text-blue-600 underline">sales@admybrand.com</a> or call <a href="tel:+1234567890" className="text-blue-600 underline">+1 (234) 567-890</a>.
        </p>
        <p>
          We offer volume discounts and bundled packages for long-term campaigns. Ask about our exclusive promotional offers!
        </p>
      </section>
    </div>
  )
}
