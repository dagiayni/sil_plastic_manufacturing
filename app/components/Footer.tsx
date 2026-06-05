"use client";

import React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, Globe, Share2 } from "lucide-react";

interface FooterProps {
  openQuote: () => void;
}

export default function Footer({ openQuote }: FooterProps) {
  const capabilities = ["Injection Molding", "Blow Molding", "Precision Tooling", "Material Testing"];
  const resources = ["Sustainability Report", "Technical Data Sheets", "Engineering Insights", "Investor Relations"];
  const company = ["Global Facilities", "Engineering Blog", "About Us", "Contact Us"];
  const legal = ["Privacy Policy", "Terms of Service", "ISO Certificates"];

  return (
    <footer className="w-full bg-navy-dark text-slate-300 py-16 px-6 md:px-8 border-t border-white/5 pb-28 md:pb-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Main Info Column */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-extrabold tracking-tight text-white">
                SIL Plastic<span className="text-emerald font-black">.</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Precision in Polymer Engineering. Shaping a sustainable industrial future and leading the transition to high-precision, circular manufacturing processes since 1998.
            </p>
            {/* Contact Details */}
            <div className="space-y-3 pt-2 text-sm text-slate-400">
              <div className="flex items-center gap-3">
                <MapPin className="h-4.5 w-4.5 text-emerald shrink-0" />
                <span>Addis Ababa, Ethiopia</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4.5 w-4.5 text-emerald shrink-0" />
                <a href="mailto:contact@silplastic.com" className="hover:text-white transition-colors">
                  contact@silplastic.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4.5 w-4.5 text-emerald shrink-0" />
                <a href="tel:+251112345678" className="hover:text-white transition-colors">
                  +251 (0) 11 234 5678
                </a>
              </div>
            </div>
          </div>

          {/* Capabilities */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">Capabilities</h4>
            <ul className="space-y-2.5 text-sm">
              {capabilities.map((item) => (
                <li key={item}>
                  <Link href="/" className="hover:text-white transition-colors text-slate-400">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">Resources</h4>
            <ul className="space-y-2.5 text-sm">
              {resources.map((item) => {
                const href = item === "Sustainability Report" 
                  ? "/about" 
                  : item === "Engineering Insights" 
                    ? "/insights" 
                    : "/";
                return (
                  <li key={item}>
                    <Link href={href} className="hover:text-white transition-colors text-slate-400">
                      {item}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Legal / Social Column */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">Company & Legal</h4>
            <ul className="space-y-2.5 text-sm mb-6">
              {company.map((item) => {
                const href = item === "About Us" 
                  ? "/about" 
                  : item === "Engineering Blog" 
                    ? "/insights" 
                    : "/";
                return (
                  <li key={item}>
                    <Link href={href} className="hover:text-white transition-colors text-slate-400">
                      {item}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="flex gap-4.5 items-center">
              <button 
                onClick={openQuote}
                className="rounded-full bg-emerald px-4 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-emerald-dark transition-colors cursor-pointer"
              >
                Quote
              </button>
              <div className="flex gap-3 text-slate-400">
                <a href="#" className="hover:text-white transition-colors"><Globe className="h-4 w-4" /></a>
                <a href="#" className="hover:text-white transition-colors"><Share2 className="h-4 w-4" /></a>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-10 border-white/10" />

        {/* Footer Bottom Info */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} SIL Plastic Manufacturing PLC. All rights reserved.</p>
          <div className="flex gap-6">
            {legal.map((item) => (
              <Link key={item} href="/" className="hover:text-white transition-colors">
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
