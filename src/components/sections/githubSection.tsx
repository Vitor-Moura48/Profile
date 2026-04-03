"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink, Star, GitFork, Code2 } from "lucide-react";
import { useTranslation } from "../../hooks/useTranslation";

interface GitHubStats {
  totalContributions: number;
  totalStars: number;
  topLanguage: string;
  loading: boolean;
  error: boolean;
}

export const GitHubSection = () => {
  const githubUsername = "Vitor-Moura48";
  const githubProfile = `https://github.com/${githubUsername}`;
  const { t } = useTranslation();
  const [stats, setStats] = useState<GitHubStats>({
    totalContributions: 0,
    totalStars: 0,
    topLanguage: "",
    loading: true,
    error: false,
  });

  useEffect(() => {
    const fetchGitHubStats = async () => {
      try {
        const headers: Record<string, string> = {
          "Accept": "application/vnd.github.v3+json",
        };

        if (process.env.NEXT_PUBLIC_GITHUB_TOKEN) {
          headers["Authorization"] = `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`;
        }

        // Fetch repos (públicos + privados do usuário autenticado)
        const reposResponse = await fetch(
          `https://api.github.com/user/repos?per_page=100&sort=updated&visibility=all`,
          { headers }
        );

        if (!reposResponse.ok) throw new Error("Failed to fetch repos");
        const repos = await reposResponse.json();

        // Calcular stars e linguagem
        let totalStars = 0;
        const languageCount: Record<string, number> = {};

        repos.forEach((repo: any) => {
          totalStars += repo.stargazers_count || 0;
          if (repo.language) {
            languageCount[repo.language] =
              (languageCount[repo.language] || 0) + 1;
          }
        });

        const topLanguage = Object.entries(languageCount).sort(
          (a, b) => b[1] - a[1]
        )[0]?.[0] || "TypeScript";

        // Fetch commits totais (públicos e privados)
        let totalContributions = 0;
        const activeRepos = repos.filter((repo: any) => !repo.archived && !repo.fork);

        console.log("📊 Processando contribuições de", activeRepos.length, "repositórios...");

        for (const repo of activeRepos) {
          try {
            const commitsResponse = await fetch(
              `https://api.github.com/repos/${repo.full_name}/commits?author=${githubUsername}&per_page=1`,
              { headers }
            );

            if (commitsResponse.ok) {
              const linkHeader = commitsResponse.headers.get("link");
              if (linkHeader) {
                const lastPageMatch = linkHeader.match(/&page=(\d+)>; rel="last"/);
                if (lastPageMatch) {
                  const count = parseInt(lastPageMatch[1]);
                  totalContributions += count;
                  console.log(`✅ ${repo.name}: ${count} commits`);
                }
              }
            }
          } catch (err) {
            console.log(`⚠️ Erro em ${repo.name}`);
          }
        }

        console.log("📈 Total de contribuições:", totalContributions);

        setStats({
          totalContributions,
          totalStars,
          topLanguage,
          loading: false,
          error: false,
        });
      } catch (error) {
        console.error("Erro ao buscar dados do GitHub:", error);
        setStats((prev) => ({
          ...prev,
          loading: false,
          error: true,
        }));
      }
    };

    fetchGitHubStats();
  }, []);

  const displayStats = [
    {
      label: t("github.contributions"),
      value: stats.totalContributions.toLocaleString(),
      icon: "📊",
    },
    {
      label: t("github.stars"),
      value: stats.totalStars.toLocaleString(),
      icon: "⭐",
    },
    {
      label: t("github.topLanguage"),
      value: stats.topLanguage,
      icon: "💻",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="my-10 md:my-20">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-bold text-white mb-3">GitHub</h2>
        <p className="text-zinc-400">
          {t("github.subtitle")}
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-3 gap-2 md:gap-4 mb-8"
      >
        {displayStats.map((stat, idx) => (
          <motion.div
            key={idx}
            variants={itemVariants}
            className="bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 border border-zinc-700/50 rounded-lg p-3 md:p-6 text-center hover:border-blue-500/50 transition-all"
          >
            <div className="text-xl md:text-3xl mb-1 md:mb-2">{stat.icon}</div>
            {stats.loading ? (
              <div className="h-6 bg-zinc-700/50 rounded animate-pulse mb-1" />
            ) : (
              <div className="text-sm md:text-2xl font-bold text-blue-400 mb-1 leading-tight">
                {stat.value}
              </div>
            )}
            <p className="text-zinc-400 text-[10px] md:text-sm leading-tight">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>

      {stats.error && (
        <p className="text-center text-zinc-400 text-sm mb-4">
          {t("github.error")}
        </p>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <a
          href={githubProfile}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 border border-gray-700 text-white rounded-lg transition-all transform hover:scale-105"
        >
          <Github className="w-5 h-5" />
          {t("github.visit")}
          <ExternalLink className="w-4 h-4" />
        </a>
      </motion.div>
    </div>
  );
};

