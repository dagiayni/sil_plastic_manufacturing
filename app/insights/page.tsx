"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Share2, Bookmark, Search, Mail, CheckCircle2 } from "lucide-react";

interface Article {
  id: number;
  category: "Sustainability" | "Innovation" | "Facilities";
  readTime: string;
  title: string;
  description: string;
  image: string;
  author: {
    name: string;
    initials: string;
  };
}

const articlesData: Article[] = [
  {
    id: 1,
    category: "Sustainability",
    readTime: "5 min read",
    title: "The Future of Bio-Based Polymers in Heavy Industry",
    description: "Discover how SIL Plastic is pioneering the integration of renewable plant-based resins into high-stress automotive and heavy industry components.",
    image: "/polymer_pellets.png",
    author: {
      name: "Dr. Elias Thorne",
      initials: "ET"
    }
  },
  {
    id: 2,
    category: "Innovation",
    readTime: "8 min read",
    title: "Precision Molding: Zero-Waste Manufacturing Protocols",
    description: "Our latest facility upgrade features a closed-loop water cooling system and real-time AI defect detection to eliminate waste in injection molding processes.",
    image: "/precision_milling.png",
    author: {
      name: "Elena Vance",
      initials: "EV"
    }
  },
  {
    id: 3,
    category: "Facilities",
    readTime: "4 min read",
    title: "Expanding Capacity: New Strategic Hub in Ethiopia",
    description: "SIL Plastic announces its largest regional expansion to date, bringing advanced manufacturing capabilities and sustainable practices to East Africa.",
    image: "/industrial_plant.png",
    author: {
      name: "Marcus Selassie",
      initials: "MS"
    }
  }
];

export default function Insights() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All Articles");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [newsletterEmail, setNewsletterEmail] = useState<string>("");
  const [newsletterSuccess, setNewsletterSuccess] = useState<boolean>(false);
  const [bookmarks, setBookmarks] = useState<Record<number, boolean>>({});

  const categories = ["All Articles", "Sustainability", "Innovation", "Facilities"];

  const toggleBookmark = (id: number) => {
    setBookmarks(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSuccess(true);
    setTimeout(() => {
      setNewsletterSuccess(false);
      setNewsletterEmail("");
    }, 3000);
  };

  // Filter logic
  const filteredArticles = articlesData.filter(article => {
    const matchesCategory = selectedCategory === "All Articles" || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          article.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full bg-slate-50 min-h-screen pb-20 overflow-x-hidden">
      {/* Page Header */}
      <section className="bg-white border-b border-slate-100 pt-24 pb-16 px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto space-y-4 text-center sm:text-left"
        >
          <span className="text-xs font-bold uppercase tracking-wider text-emerald">Knowledge Center</span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-navy tracking-tight">Our Insights</h1>
          <p className="text-slate-600 text-sm md:text-base max-w-2xl leading-relaxed">
            Exploring the intersection of advanced polymer engineering, materials science, and industrial sustainability.
          </p>
        </motion.div>
      </section>

      {/* Controls: Search and Filter Category Pills */}
      <section className="max-w-4xl mx-auto px-6 md:px-8 py-10 space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Category Filters */}
          <div className="flex flex-wrap gap-2.5 w-full sm:w-auto">
            {categories.map((category) => {
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full px-4.5 py-1.5 text-xs font-bold transition-all border cursor-pointer ${
                    isActive
                      ? "bg-navy text-white border-navy"
                      : "bg-white text-slate-500 border-slate-200 hover:text-navy hover:border-slate-300"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          {/* Search bar */}
          <div className="relative w-full sm:w-72">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
              <Search className="h-4 w-4" />
            </span>
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-slate-200 bg-white pl-10 pr-4 py-2 text-xs focus:outline-none focus:border-emerald focus:ring-1 focus:ring-emerald/20 transition-all text-slate-800 placeholder-slate-400"
            />
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="max-w-4xl mx-auto px-6 md:px-8">
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredArticles.length > 0 ? (
              filteredArticles.map((article) => {
                const isBookmarked = !!bookmarks[article.id];
                return (
                  <motion.article
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    key={article.id}
                    className="flex flex-col bg-white border border-card-border rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-slate-200/50 transition-all group"
                  >
                    {/* Article Thumbnail */}
                    <div className="relative h-48 w-full bg-slate-100 overflow-hidden shrink-0">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    {/* Article Content */}
                    <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                      <div className="space-y-3">
                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                          <span className="text-emerald">{article.category}</span>
                          <span>·</span>
                          <span>{article.readTime}</span>
                        </div>
                        <h3 className="text-base font-extrabold text-navy group-hover:text-emerald transition-colors line-clamp-2 leading-snug">
                          {article.title}
                        </h3>
                        <p className="text-slate-600 text-xs md:text-sm leading-relaxed line-clamp-3">
                          {article.description}
                        </p>
                      </div>

                      {/* Card Footer: Author & Actions */}
                      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                        {/* Author Info */}
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-[10px] font-black text-navy shrink-0">
                            {article.author.initials}
                          </div>
                          <span className="text-xs font-bold text-navy">{article.author.name}</span>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2 text-slate-400">
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(window.location.origin + "/insights");
                              alert("Link copied to clipboard!");
                            }}
                            className="p-2 rounded-full hover:bg-slate-50 hover:text-navy transition-colors cursor-pointer"
                            title="Share article"
                          >
                            <Share2 className="h-4.5 w-4.5" />
                          </button>
                          <button
                            onClick={() => toggleBookmark(article.id)}
                            className={`p-2 rounded-full hover:bg-slate-50 transition-colors cursor-pointer ${
                              isBookmarked ? "text-emerald" : "hover:text-navy"
                            }`}
                            title="Bookmark article"
                          >
                            <Bookmark className="h-4.5 w-4.5" fill={isBookmarked ? "currentColor" : "none"} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                );
              })
            ) : (
              <div className="col-span-full py-16 text-center text-slate-400">
                <Search className="h-10 w-10 mx-auto mb-3 opacity-40" />
                <p className="text-sm font-semibold">No articles found matching search criteria.</p>
              </div>
            )}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Trusted Partners Section */}
      <section className="bg-white border-y border-slate-100 py-16 px-6 md:px-8 mt-24">
        <div className="max-w-4xl mx-auto space-y-8 text-center">
          <div className="space-y-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">WHO TRUSTED US</span>
            <p className="text-xs font-semibold text-slate-500 max-w-sm mx-auto">
              Partnering with global leaders across automotive, aerospace, and medical sectors.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-50">
            <span className="font-black tracking-widest text-slate-400 text-sm">ALPHA</span>
            <span className="font-black tracking-widest text-slate-400 text-sm">DELTA</span>
            <span className="font-black tracking-widest text-slate-400 text-sm">OMEGA</span>
          </div>
        </div>
      </section>

      {/* Newsletter Block */}
      <section className="max-w-4xl mx-auto px-6 md:px-8 mt-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="bg-navy rounded-3xl p-8 md:p-12 text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div className="space-y-3 max-w-md">
            <span className="text-xs font-bold text-emerald uppercase tracking-wider">Technical Digest</span>
            <h3 className="text-xl md:text-2xl font-bold">Stay updated on polymer science</h3>
            <p className="text-slate-300 text-xs md:text-sm leading-relaxed">
              Get monthly updates on sustainable manufacturing, materials research, and machinery protocols direct to your inbox.
            </p>
          </div>

          <div className="w-full md:w-auto shrink-0">
            {!newsletterSuccess ? (
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Email address"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="rounded-full bg-white/5 border border-white/10 px-4.5 py-3.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald w-full md:w-64 transition-all"
                />
                <button
                  type="submit"
                  className="rounded-full bg-emerald hover:bg-emerald-dark px-6 py-3.5 text-xs font-bold text-white transition-all cursor-pointer select-none shrink-0"
                >
                  Join
                </button>
              </form>
            ) : (
              <div className="flex items-center gap-2 text-emerald">
                <CheckCircle2 className="h-5 w-5" />
                <span className="text-xs font-semibold">Joined Technical Digest!</span>
              </div>
            )}
          </div>
        </motion.div>
      </section>
    </div>
  );
}
