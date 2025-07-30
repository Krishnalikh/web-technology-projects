'use client'
import { useState } from "react"

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (form.name && form.email && form.message) {
      setSubmitted(true)
    }
  }

  return (
    <div className="p-8 max-w-3xl mx-auto space-y-10">
      <h2 className="text-3xl font-extrabold tracking-tight mb-6">📬 Contact Us</h2>

      {submitted ? (
        <div className="text-green-600 font-semibold text-lg rounded-md bg-green-50 p-4 shadow-md">
          Thank you! We'll get back to you soon.
        </div>
      ) : (
        <form 
          onSubmit={handleSubmit} 
          className="space-y-6 bg-white dark:bg-zinc-900 p-6 rounded-lg shadow-lg"
        >
          <label className="block">
            <span className="text-gray-700 dark:text-gray-300 font-medium mb-1 block">Your Name</span>
            <input 
              name="name" 
              value={form.name} 
              onChange={handleChange} 
              placeholder="John Doe" 
              className="border border-gray-300 dark:border-gray-700 rounded-md px-4 py-3 w-full transition focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </label>

          <label className="block">
            <span className="text-gray-700 dark:text-gray-300 font-medium mb-1 block">Email Address</span>
            <input 
              type="email"
              name="email" 
              value={form.email} 
              onChange={handleChange} 
              placeholder="john@example.com" 
              className="border border-gray-300 dark:border-gray-700 rounded-md px-4 py-3 w-full transition focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </label>

          <label className="block">
            <span className="text-gray-700 dark:text-gray-300 font-medium mb-1 block">Message</span>
            <textarea 
              name="message" 
              value={form.message} 
              onChange={handleChange} 
              placeholder="Write your message here..." 
              className="border border-gray-300 dark:border-gray-700 rounded-md px-4 py-3 w-full h-32 resize-none transition focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </label>

          <button 
            type="submit" 
            className="bg-blue-600 text-white font-semibold rounded-md px-6 py-3 w-full hover:bg-blue-700 transition shadow-md hover:shadow-lg"
          >
            Send Message
          </button>
        </form>
      )}

      {/* Company Contact Info */}
      <section className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-zinc-800 dark:to-zinc-900 p-6 rounded-lg shadow-lg font-serif">
        <h3 className="text-2xl font-bold mb-4 text-blue-700 dark:text-blue-400 underline decoration-2 decoration-blue-500 dark:decoration-blue-600">
          📍 Our Contact Information
        </h3>
        <ul className="space-y-3 text-gray-800 dark:text-gray-300">
          <li>
            <strong className="text-blue-600 dark:text-blue-400">Phone:</strong> <a href="tel:+1234567890" className="hover:text-blue-800 dark:hover:text-blue-500 transition">+1 (234) 567-890</a>
          </li>
          <li>
            <strong className="text-blue-600 dark:text-blue-400">Email:</strong> <a href="mailto:contact@company.com" className="hover:text-blue-800 dark:hover:text-blue-500 transition">contact@company.com</a>
          </li>
          <li>
            <strong className="text-blue-600 dark:text-blue-400">Fax:</strong> <span className="italic">+1 (234) 567-891</span>
          </li>
          <li>
            <strong className="text-blue-600 dark:text-blue-400">Postal Address:</strong>
            <address className="not-italic mt-1">
              123 Business Rd.<br />
              Suite 456<br />
              Cityville, ST 78910<br />
              United States
            </address>
          </li>
          <li>
            <strong className="text-blue-600 dark:text-blue-400">Location:</strong> 
            <span className="ml-1">123 Business Rd., Cityville, ST</span>
          </li>
        </ul>
      </section>
    </div>
  )
}
