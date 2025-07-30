'use client';
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type Repo = {
  id: number;
  name: string;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  description: string | null;
};

export default function TrendsPage() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRepos() {
      try {
        const res = await fetch(
          "https://api.github.com/orgs/vercel/repos?per_page=10"
        );
        if (!res.ok) throw new Error("Failed to fetch GitHub repos");
        const data: Repo[] = await res.json();
        setRepos(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchRepos();
  }, []);

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      <h2 className="text-3xl font-extrabold tracking-tight mb-6 text-center">
        📊 Vercel GitHub Repositories Stats
      </h2>

      {loading ? (
        <div className="text-center text-gray-500 dark:text-gray-400">
          Loading live data...
        </div>
      ) : (
        <div className="space-y-6">
          {repos.map((repo, i) => (
            <motion.div
              key={repo.id}
              className="border rounded-lg p-6 shadow-md bg-white dark:bg-zinc-900 cursor-pointer hover:shadow-xl transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              whileHover={{ scale: 1.03 }}
            >
              <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400 mb-1">
                {repo.name}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4 min-h-[40px]">
                {repo.description || "No description"}
              </p>

              <div className="flex space-x-6 text-gray-600 dark:text-gray-400 font-medium">
                <div>
                  ⭐ Stars:{" "}
                  <span className="text-blue-600 dark:text-blue-400 font-bold">
                    {repo.stargazers_count}
                  </span>
                </div>
                <div>
                  🍴 Forks:{" "}
                  <span className="text-blue-600 dark:text-blue-400 font-bold">
                    {repo.forks_count}
                  </span>
                </div>
                <div>
                  👀 Watchers:{" "}
                  <span className="text-blue-600 dark:text-blue-400 font-bold">
                    {repo.watchers_count}
                  </span>
                </div>
              </div>

              {/* Progress bars for stars/forks/watchers normalized */}
              <div className="mt-4 space-y-3">
                {[
                  { label: "Stars", value: repo.stargazers_count, color: "blue" },
                  { label: "Forks", value: repo.forks_count, color: "green" },
                  { label: "Watchers", value: repo.watchers_count, color: "purple" },
                ].map(({ label, value, color }, idx) => {
                  // Max scale for bar (e.g. max 200 for demo)
                  const max = 200;
                  const widthPercent = Math.min((value / max) * 100, 100);
                  return (
                    <div key={label}>
                      <div className="flex justify-between mb-1 text-sm font-medium">
                        <span>{label}</span>
                        <span>{value}</span>
                      </div>
                      <div className="bg-gray-200 dark:bg-zinc-800 rounded-full h-4">
                        <motion.div
                          className={`h-4 rounded-full bg-${color}-600`}
                          initial={{ width: 0 }}
                          animate={{ width: `${widthPercent}%` }}
                          transition={{ duration: 1, delay: idx * 0.3 }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
