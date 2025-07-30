'use client'

import { useState } from 'react'
import { CalendarDays, Clock, Edit2, Zap } from 'lucide-react'
import { motion } from 'framer-motion'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export default function CampaignPage() {
  const [budget, setBudget] = useState(1000)
  const [spent, setSpent] = useState(350)
  const [clicks, setClicks] = useState(0)
  const [impressions, setImpressions] = useState(15000)
  const [conversions, setConversions] = useState(120)

  const [showSchedule, setShowSchedule] = useState(false)
  const [showCreate, setShowCreate] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedAd, setSelectedAd] = useState('')

  const [newCampaignName, setNewCampaignName] = useState('')
  const [newCampaignType, setNewCampaignType] = useState('Commercial')

  const simulate = () => {
    const randomClicks = Math.floor(budget / (Math.random() * 10 + 5))
    setClicks(randomClicks)
    setImpressions(impressions + randomClicks * 15)
    setConversions(conversions + Math.floor(randomClicks * 0.05))
    setSpent(spent + budget * 0.2)
  }

  const campaignTypes = ['Commercial', 'Educational', 'Seasonal', 'Social Media', 'B2B', 'Event']

  return (
    <div className="p-8 space-y-10 max-w-7xl mx-auto text-gray-800 dark:text-white">
      <h2 className="text-3xl font-extrabold text-center text-blue-700 dark:text-blue-400">📣 ADmyBRAND Campaign Dashboard</h2>

      {/* Simulator */}
      <motion.div className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-lg space-y-4">
        <h3 className="text-xl font-semibold">🎛️ Campaign Simulator</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="number" value={budget} onChange={e => setBudget(+e.target.value)} placeholder="Budget ($)" className="border p-2 rounded-md" />
          <button onClick={simulate} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition">Simulate Clicks</button>
        </div>
        {clicks > 0 && (
          <div className="text-lg mt-2 text-green-600">Estimated Clicks: <strong>{clicks}</strong></div>
        )}
      </motion.div>

      {/* Performance Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[
          { label: 'Impressions', value: impressions.toLocaleString(), color: 'from-cyan-500 to-blue-500' },
          { label: 'Clicks', value: clicks, color: 'from-purple-500 to-pink-500' },
          { label: 'Conversions', value: conversions, color: 'from-emerald-500 to-lime-500' }
        ].map((stat, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className={`p-5 rounded-xl shadow-md text-white bg-gradient-to-br ${stat.color}`}
          >
            <div className="flex justify-between items-center text-sm uppercase">
              <span>{stat.label}</span>
              <Zap className="w-4 h-4" />
            </div>
            <div className="text-3xl font-bold mt-2">{stat.value}</div>
          </motion.div>
        ))}
      </div>

      {/* Budget Progress */}
      <div>
        <h3 className="text-lg font-semibold mb-2">📊 Budget Usage</h3>
        <div className="w-full bg-gray-300 dark:bg-zinc-700 rounded-full h-4 overflow-hidden">
          <motion.div
            className="bg-blue-600 h-4"
            initial={{ width: 0 }}
            animate={{ width: `${(spent / budget) * 100}%` }}
            transition={{ duration: 1 }}
          />
        </div>
        <p className="mt-1 text-sm">{`$${spent.toFixed(2)} spent of $${budget}`}</p>
      </div>

      {/* Campaign Schedule Section */}
      <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-md p-6 border space-y-6">
        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
          <CalendarDays />
          <h3 className="text-lg font-semibold">🗓️ Scheduling & Upcoming Campaigns</h3>
        </div>

        <ul className="space-y-4 border-l border-gray-300 dark:border-zinc-700 pl-4 ml-2">
          <li className="relative">
            <span className="absolute left-[-10px] top-1 w-3 h-3 bg-blue-600 rounded-full"></span>
            <div className="text-sm">
              <strong>Aug 2:</strong> Summer Sale Campaign (📍Running)
            </div>
          </li>
          <li className="relative">
            <span className="absolute left-[-10px] top-1 w-3 h-3 bg-yellow-400 rounded-full"></span>
            <div className="text-sm">
              <strong>Aug 10:</strong> Back-to-School Launch (⏳Scheduled)
            </div>
          </li>
          <li className="relative">
            <span className="absolute left-[-10px] top-1 w-3 h-3 bg-gray-400 rounded-full"></span>
            <div className="text-sm">
              <strong>Aug 20:</strong> Monsoon Promo (🛑 Paused)
            </div>
          </li>
        </ul>
    </div>

      

      {/* Schedule and Create Section */}
      <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-md space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold flex items-center gap-2"><CalendarDays />🗓️ Schedule & Create</h3>
          <div className="flex gap-3">
            <button onClick={() => setShowCreate(!showCreate)} className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 flex items-center gap-2">
              <Edit2 className="w-4 h-4" /> Create Campaign
            </button>
            <button onClick={() => setShowSchedule(!showSchedule)} className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 flex items-center gap-2">
              <Clock className="w-4 h-4" /> Edit Schedule
            </button>
          </div>
        </div>

        {/* Edit Schedule */}
        {showSchedule && (
          <motion.div className="space-y-4 border-t pt-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <label className="block font-medium">Select Date:</label>
            <DatePicker selected={selectedDate} onChange={(date: Date) => setSelectedDate(date)} className="p-2 border rounded-md" />
            <label className="block font-medium">Select Campaign:</label>
            <select value={selectedAd} onChange={(e) => setSelectedAd(e.target.value)} className="p-2 border rounded-md w-full max-w-xs">
              <option value="">Select</option>
              {campaignTypes.map((type, i) => (
                <option key={i} value={type}>{type}</option>
              ))}
            </select>
            {selectedAd && <p className="text-sm text-green-600">✅ Scheduled {selectedAd} campaign on {selectedDate.toDateString()}</p>}
          </motion.div>
        )}

        {/* Create Campaign */}
        {showCreate && (
          <motion.div className="space-y-4 border-t pt-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <label className="block font-medium">Campaign Name:</label>
            <input value={newCampaignName} onChange={e => setNewCampaignName(e.target.value)} className="p-2 border rounded-md w-full max-w-md" placeholder="Enter campaign name" />
            <label className="block font-medium">Campaign Type:</label>
            <select value={newCampaignType} onChange={e => setNewCampaignType(e.target.value)} className="p-2 border rounded-md w-full max-w-md">
              {campaignTypes.map((type, i) => (
                <option key={i} value={type}>{type}</option>
              ))}
            </select>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">🚀 Launch Campaign</button>
            {newCampaignName && <p className="text-sm text-blue-600">Created campaign <strong>{newCampaignName}</strong> of type <strong>{newCampaignType}</strong></p>}
          </motion.div>
        )}
      </div>
    </div>
    
  )
}
