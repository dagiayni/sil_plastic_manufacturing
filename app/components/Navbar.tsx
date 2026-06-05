"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Home, Info, BookOpen, MessageSquare, ChevronRight } from "lucide-react";

interface NavbarProps {
  openQuote: () => void;
}

export default function Navbar({ openQuote }: NavbarProps) {
  const pathname = usePathname();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isSolid = scrolled || pathname === "/insights";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // check initial state
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Insights", href: "/insights" },
  ];

  const bottomNavItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "About", href: "/about", icon: Info },
    { name: "Insights", href: "/insights", icon: BookOpen },
  ];

  return (
    <>
      {/* Top Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 w-full transition-all duration-500 ease-out ${
          isSolid
            ? "bg-white/95 backdrop-blur-xl border-b border-slate-200/80 shadow-sm"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl h-16 items-center justify-between px-6 md:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span
              className={`text-xl font-extrabold tracking-tight transition-colors duration-500 ${
                isSolid
                  ? "text-navy group-hover:text-emerald"
                  : "text-white group-hover:text-emerald"
              }`}
            >
              SIL Plastic<span className="text-emerald font-black">.</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative py-1 text-sm font-semibold tracking-wide transition-colors duration-300 ${
                    isActive
                      ? "text-emerald"
                      : isSolid
                      ? "text-slate-600 hover:text-navy"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavLine"
                      className="absolute bottom-0 left-0 h-0.5 w-full bg-emerald rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Header Action Button (Desktop Only) */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={openQuote}
              className={`rounded-full px-5 py-2 text-sm font-bold shadow-sm active:scale-95 transition-all cursor-pointer ${
                isSolid
                  ? "bg-emerald text-white hover:bg-emerald-dark"
                  : "bg-white/15 text-white border border-white/25 hover:bg-white/25 backdrop-blur-sm"
              }`}
            >
              Get a Quote
            </button>
          </div>

          {/* Mobile Menu Toggle (Hamburger) */}
          <button
            onClick={() => setIsDrawerOpen(true)}
            className={`flex md:hidden p-2 -mr-2 focus:outline-none cursor-pointer transition-colors duration-300 ${
              isSolid ? "text-slate-700 hover:text-navy" : "text-white hover:text-white/70"
            }`}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>

      {/* Slide-out Mobile Navigation Drawer */}
      <AnimatePresence>
        {isDrawerOpen && (
          <div className="fixed inset-0 z-50 flex md:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDrawerOpen(false)}
              className="absolute inset-0 bg-navy/60 backdrop-blur-sm"
            />

            {/* Menu Container */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative ml-auto flex h-full w-4/5 max-w-sm flex-col bg-white p-6 shadow-2xl"
            >
              {/* Drawer Close Button */}
              <div className="flex items-center justify-between mb-8">
                <span className="text-lg font-bold text-navy">Menu</span>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="rounded-full p-2 text-slate-500 hover:bg-slate-100 hover:text-navy focus:outline-none cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Drawer Links */}
              <div className="flex flex-col gap-3">
                {navLinks.map((link, index) => {
                  const isActive = pathname === link.href;
                  return (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.08 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsDrawerOpen(false)}
                        className={`flex items-center justify-between rounded-xl px-4 py-3 text-base font-bold transition-all ${
                          isActive
                            ? "bg-emerald-light text-emerald"
                            : "text-slate-700 hover:bg-slate-50 hover:text-navy"
                        }`}
                      >
                        {link.name}
                        <ChevronRight className="h-4 w-4 opacity-65" />
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* CTA Drawer Button */}
              <div className="mt-auto pt-6 border-t border-slate-100">
                <button
                  onClick={() => {
                    setIsDrawerOpen(false);
                    openQuote();
                  }}
                  className="w-full flex items-center justify-center rounded-xl bg-emerald py-3.5 text-sm font-bold text-white shadow-md shadow-emerald/10 hover:bg-emerald-dark transition-all cursor-pointer"
                >
                  Request a Quote
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating Bottom Navigation Tab Bar (Mobile Only) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 flex h-20 items-center justify-around border-t border-slate-200/80 bg-white/95 px-4 pb-5 shadow-[0_-4px_24px_rgba(0,0,0,0.04)] md:hidden backdrop-blur-md">
        {bottomNavItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className="flex flex-col items-center justify-center w-16"
            >
              <div className="relative flex items-center justify-center p-1">
                <Icon
                  className={`h-5.5 w-5.5 transition-colors ${
                    isActive ? "text-emerald" : "text-slate-400"
                  }`}
                />
                {isActive && (
                  <motion.span
                    layoutId="activeBottomTabDot"
                    className="absolute -bottom-1 h-1 w-1 bg-emerald rounded-full"
                  />
                )}
              </div>
              <span
                className={`mt-1 text-[11px] font-semibold tracking-wide transition-colors ${
                  isActive ? "text-emerald font-bold" : "text-slate-500"
                }`}
              >
                {item.name}
              </span>
            </Link>
          );
        })}

        {/* Contact Tab (Mobile) - triggers the global quote popup */}
        <button
          onClick={openQuote}
          className="flex flex-col items-center justify-center w-16 cursor-pointer"
        >
          <div className="relative flex items-center justify-center p-1">
            <MessageSquare className="h-5.5 w-5.5 text-slate-400 hover:text-emerald transition-colors" />
          </div>
          <span className="mt-1 text-[11px] font-semibold tracking-wide text-slate-500">
            Contact
          </span>
        </button>
      </div>
    </>
  );
}
