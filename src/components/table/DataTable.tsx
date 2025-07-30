"use client"
import { useState } from "react"

type User = {
  id: number
  name: string
  email: string
  role: string
  status: "Active" | "Inactive"
}

const mockData: User[] = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "Marketer", status: "Active" },
  { id: 2, name: "Bob Smith", email: "bob@example.com", role: "Analyst", status: "Inactive" },
  { id: 3, name: "Charlie Ray", email: "charlie@example.com", role: "Manager", status: "Active" },
  { id: 4, name: "Dana Lee", email: "dana@example.com", role: "Admin", status: "Active" },
  { id: 5, name: "Eli Tomlin", email: "eli@example.com", role: "Marketer", status: "Inactive" },
  { id: 6, name: "Faye Brown", email: "faye@example.com", role: "Designer", status: "Active" },
  { id: 7, name: "George Hill", email: "george@example.com", role: "Intern", status: "Inactive" },
]

export function DataTable() {
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(0)
  const pageSize = 5

  const filtered = mockData.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  )

  const paginated = filtered.slice(page * pageSize, (page + 1) * pageSize)

  return (
    <div className="border rounded-xl shadow-sm overflow-hidden">
      <div className="p-4">
        <input
          type="text"
          placeholder="Search users..."
          className="border px-3 py-2 w-full rounded-md text-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <table className="w-full text-sm text-left">
        <thead className="bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-300 uppercase text-xs">
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Role</th>
            <th className="px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {paginated.map(user => (
            <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-zinc-700">
              <td className="px-4 py-3">{user.name}</td>
              <td className="px-4 py-3">{user.email}</td>
              <td className="px-4 py-3">{user.role}</td>
              <td className="px-4 py-3">
                <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                  user.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {user.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="p-4 flex justify-between items-center">
        <button
          onClick={() => setPage(p => Math.max(0, p - 1))}
          disabled={page === 0}
          className="text-sm px-3 py-1 border rounded-md disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={() => setPage(p => (p + 1 < Math.ceil(filtered.length / pageSize)) ? p + 1 : p)}
          disabled={(page + 1) * pageSize >= filtered.length}
          className="text-sm px-3 py-1 border rounded-md disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  )
}
