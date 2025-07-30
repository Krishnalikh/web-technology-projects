'use client'

import { useState, useMemo } from 'react'

type Post = {
  id: number
  title: string
  excerpt: string
  date: string
  category: string
  author: string
  image: string
  views: number
}

type Author = {
  name: string
  bio: string
  avatar: string
  social?: { platform: string; url: string }[]
}

const authors: Record<string, Author> = {
  'Jane Doe': {
    name: 'Jane Doe',
    bio: 'Digital marketing expert and content strategist.',
    avatar: '/authors/jane.jpg',
    social: [
      { platform: 'Twitter', url: 'https://twitter.com/janedoe' },
      { platform: 'LinkedIn', url: 'https://linkedin.com/in/janedoe' }
    ]
  },
  'John Smith': {
    name: 'John Smith',
    bio: 'Advertising analyst and social media specialist.',
    avatar: '/authors/john.jpg',
    social: [{ platform: 'Twitter', url: 'https://twitter.com/johnsmith' }]
  }
}

const posts: Post[] = [
  {
    id: 1,
    title: 'How to Maximize Your Commercial Ads ROI',
    excerpt:
      'Learn proven strategies to get the best return on investment with commercial ads on AdMyBrand.',
    date: '2025-07-01',
    category: 'Commercial Ads',
    author: 'Jane Doe',
    image: '/blog/commercial-ads.jpg',
    views: 1543
  },
  {
    id: 2,
    title: 'Top 5 Social Media Ad Trends for 2025',
    excerpt:
      'Stay ahead with the latest social media advertising trends you can leverage now.',
    date: '2025-06-20',
    category: 'Social Media',
    author: 'John Smith',
    image: '/blog/social-media-trends.jpg',
    views: 2001
  },
  {
    id: 3,
    title: 'Beginner’s Guide to Educational Ads',
    excerpt:
      'How to effectively advertise educational content and institutions using AdMyBrand.',
    date: '2025-05-15',
    category: 'Educational Ads',
    author: 'Jane Doe',
    image: '/blog/educational-ads.jpg',
    views: 860
  },
  {
    id: 4,
    title: 'Secrets Behind Viral Referral Campaigns',
    excerpt: 'Understanding referral campaigns that really boost brand visibility.',
    date: '2025-04-30',
    category: 'Referral',
    author: 'John Smith',
    image: '/blog/referral-campaigns.jpg',
    views: 1270
  },
  {
    id: 5,
    title: 'Email Marketing That Converts',
    excerpt:
      'Tips and tricks for creating email ads that drive engagement and sales.',
    date: '2025-04-15',
    category: 'Email Marketing',
    author: 'Jane Doe',
    image: '/blog/email-marketing.jpg',
    views: 970
  },
  // Add more posts as needed...
]

// Extract unique categories
const categories = ['All', ...Array.from(new Set(posts.map((p) => p.category)))]

const POSTS_PER_PAGE = 4

export default function BlogResourcePage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [currentPage, setCurrentPage] = useState(1)

  // Filter posts based on search and category
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesCategory =
        selectedCategory === 'All' || post.category === selectedCategory
      const matchesSearch =
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [searchTerm, selectedCategory])

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE)
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  )

  // Top trending posts (by views)
  const trendingPosts = posts
    .slice()
    .sort((a, b) => b.views - a.views)
    .slice(0, 3)

  return (
    <div className="max-w-7xl mx-auto p-8 space-y-12">
      <h1 className="text-4xl font-extrabold text-center mb-8">
        📝 AdMyBrand Blog & Resources
      </h1>

      {/* Search and Category Filters */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        <input
          type="search"
          placeholder="Search articles..."
          className="w-full md:w-1/2 border border-gray-300 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value)
            setCurrentPage(1)
          }}
        />

        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`px-4 py-2 rounded-full border transition
                ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white dark:bg-zinc-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-zinc-700 hover:bg-blue-100 hover:text-blue-700'
                }`}
              onClick={() => {
                setSelectedCategory(cat)
                setCurrentPage(1)
              }}
              aria-pressed={selectedCategory === cat}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Posts */}
      <section>
        <h2 className="text-2xl font-bold mb-6">🔥 Featured Posts</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {trendingPosts.map((post) => (
            <article
              key={post.id}
              className="rounded-lg shadow-lg border border-gray-200 dark:border-zinc-700 overflow-hidden cursor-pointer hover:shadow-2xl transition"
              tabIndex={0}
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 space-y-2 bg-white dark:bg-zinc-900">
                <div className="text-sm font-semibold text-blue-600">
                  {post.category}
                </div>
                <h3 className="text-xl font-bold">{post.title}</h3>
                <p className="text-gray-700 dark:text-gray-300 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mt-2">
                  <span>{new Date(post.date).toLocaleDateString()}</span>
                  <span>{post.views.toLocaleString()} views</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Blog Posts List */}
      <section>
        <h2 className="text-2xl font-bold mb-6">📚 All Articles</h2>
        {paginatedPosts.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">
            No posts found.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {paginatedPosts.map((post) => (
              <article
                key={post.id}
                className="flex flex-col border border-gray-200 dark:border-zinc-700 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition cursor-pointer"
                tabIndex={0}
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4 flex flex-col flex-grow">
                  <div className="text-sm font-semibold text-blue-600 mb-1">
                    {post.category}
                  </div>
                  <h3 className="text-lg font-semibold">{post.title}</h3>
                  <p className="text-gray-700 dark:text-gray-300 flex-grow line-clamp-4">
                    {post.excerpt}
                  </p>
                  <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mt-2">
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                    <span>By {post.author}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <nav
            aria-label="Pagination"
            className="flex justify-center space-x-3 mt-8"
          >
            <button
              className="px-4 py-2 border rounded-md disabled:opacity-50"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            >
              Prev
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                className={`px-4 py-2 border rounded-md ${
                  currentPage === i + 1
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white dark:bg-zinc-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-zinc-700 hover:bg-blue-100 hover:text-blue-700'
                }`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button
              className="px-4 py-2 border rounded-md disabled:opacity-50"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            >
              Next
            </button>
          </nav>
        )}
      </section>

      {/* Authors Section */}
      <section>
        <h2 className="text-2xl font-bold mb-6">👩‍💼 Meet Our Authors</h2>
        <div className="flex flex-wrap gap-8 justify-center">
          {Object.values(authors).map((author) => (
            <div
              key={author.name}
              className="max-w-xs text-center p-6 rounded-lg border border-gray-200 dark:border-zinc-700 shadow hover:shadow-xl transition cursor-default"
              tabIndex={0}
            >
              <img
                src={author.avatar}
                alt={author.name}
                className="w-24 h-24 mx-auto rounded-full object-cover mb-4"
              />
              <h3 className="text-lg font-semibold">{author.name}</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">{author.bio}</p>
              <div className="flex justify-center gap-4 text-blue-600">
                {author.social?.map((social) => (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.platform}
                    className="hover:underline"
                  >
                    {social.platform}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
