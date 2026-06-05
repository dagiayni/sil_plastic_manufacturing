"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  Target, 
  Quote, 
  Calendar, 
  Leaf, 
  Cpu, 
  Globe2,
  Mail,
  ExternalLink,
  Share2,
  ArrowRight
} from "lucide-react";
import QuoteModal from "../components/QuoteModal";

/* ─── Animation Variants ─── */
const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.7 } },
};

const slideInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const slideInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: "easeOut" } },
};

export default function About() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  const timelineEvents = [
    {
      year: "1998",
      title: "The Foundation",
      description: "Starting as a small family-owned facility, SIL Plastic established its roots in high-density polyethylene production, focusing on quality above all else.",
      icon: Calendar,
      variant: "white"
    },
    {
      year: "2005",
      title: "The Green Shift",
      description: "Implementation of our first 100% closed-loop water recycling system, establishing sustainable environmental stewardship as a core company pillar.",
      icon: Leaf,
      variant: "green"
    },
    {
      year: "2018",
      title: "Automation Era",
      description: "Full integration of AI-driven quality control systems across all production lines, raising defect precision tolerances to automotive grades.",
      icon: Cpu,
      variant: "navy"
    },
    {
      year: "Today",
      title: "Continental Footprint",
      description: "SIL Plastic operates six major facilities across the continent, providing essential polymer products to infrastructure, agriculture, and healthcare sectors.",
      icon: Globe2,
      variant: "white"
    }
  ];

  const partners = ["ALPHA", "OMEGA", "DELTA", "BETA", "SIGMA"];

  return (
    <div className="w-full bg-slate-50 overflow-x-hidden">
      {/* Hero Banner */}
      <section className="relative w-full py-28 md:py-36 bg-navy text-white px-6 md:px-8 overflow-hidden text-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/about_hero.png"
            alt="SIL About Hero Background"
            fill
            className="object-cover opacity-25 select-none"
          />
          <div className="absolute inset-0 bg-navy/80" />
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="relative z-10 max-w-4xl mx-auto space-y-4"
        >
          <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl font-black tracking-tight">About Us</motion.h1>
          <motion.p variants={fadeUp} className="text-base md:text-xl text-emerald font-semibold uppercase tracking-wider">
            Precision in Polymer Engineering
          </motion.p>
          <motion.p variants={fadeUp} className="text-sm md:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
            Pioneering the future of sustainable, circular manufacturing and polymer science across Africa.
          </motion.p>
        </motion.div>
      </section>

      {/* Mission & Background Section */}
      <section className="py-24 px-6 md:px-8 max-w-4xl mx-auto space-y-16">
        {/* Mission Statement */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="space-y-6"
        >
          <motion.div variants={fadeUp} className="flex items-center gap-2.5 text-emerald">
            <Target className="h-5 w-5" />
            <span className="text-xs font-bold uppercase tracking-wider">Our Mission</span>
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-2xl md:text-3xl font-extrabold text-navy leading-tight">
            To lead the polymer industry through sustainable innovation and unwavering precision.
          </motion.h2>
          <motion.p variants={fadeUp} className="text-slate-600 text-sm md:text-base leading-relaxed">
            Founded on the principles of heavy-industry reliability and modern environmental stewardship, SIL Plastic Manufacturing PLC serves as a cornerstone of industrial progress. We don&apos;t just manufacture plastic; we engineer solutions that balance the needs of massive scale production with the urgent requirement for ecological responsibility.
          </motion.p>
        </motion.div>

        {/* Quote Box */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={slideInLeft}
          className="relative border-l-4 border-emerald bg-white shadow-sm rounded-r-2xl p-6 md:p-8 flex gap-4"
        >
          <Quote className="h-10 w-10 text-emerald/20 shrink-0" />
          <div className="space-y-1.5">
            <p className="text-sm md:text-base font-bold italic text-navy leading-relaxed">
              &quot;Sustainability isn&apos;t a goal; it&apos;s our standard operating procedure.&quot;
            </p>
            <p className="text-xs text-slate-400 font-semibold">— Executive Leadership Team, SIL Plastic</p>
          </div>
        </motion.div>
      </section>

      {/* Our Evolution Section */}
      <section className="bg-white border-y border-slate-100 py-24 px-6 md:px-8">
        <div className="max-w-4xl mx-auto space-y-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="text-center max-w-2xl mx-auto space-y-3"
          >
            <motion.span variants={fadeUp} className="text-xs font-bold uppercase tracking-wider text-emerald">Our Journey</motion.span>
            <motion.h2 variants={fadeUp} className="text-3xl font-extrabold text-navy">Our Evolution</motion.h2>
            <motion.p variants={fadeUp} className="text-slate-500 text-sm">
              How we scaled from a local supplier to a continent-wide technology leader.
            </motion.p>
          </motion.div>

          {/* Timeline Cards */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 relative"
          >
            {timelineEvents.map((event, index) => {
              const Icon = event.icon;
              
              // Define styling variants
              let cardStyle = "bg-white border border-card-border text-navy";
              let badgeStyle = "bg-emerald/10 text-emerald";
              let titleStyle = "text-navy";
              let textStyle = "text-slate-600";
              let yearStyle = "text-emerald";

              if (event.variant === "green") {
                cardStyle = "bg-emerald text-white border-0 shadow-lg shadow-emerald/15";
                badgeStyle = "bg-white/20 text-white";
                titleStyle = "text-white";
                textStyle = "text-emerald-light";
                yearStyle = "text-emerald-light";
              } else if (event.variant === "navy") {
                cardStyle = "bg-navy text-white border-0 shadow-lg shadow-navy/15";
                badgeStyle = "bg-white/10 text-emerald";
                titleStyle = "text-white";
                textStyle = "text-slate-300";
                yearStyle = "text-emerald";
              }

              return (
                <motion.div
                  key={event.year}
                  variants={fadeUp}
                  whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(0,0,0,0.08)" }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className={`rounded-2xl p-8 space-y-6 flex flex-col justify-between cursor-pointer ${cardStyle}`}
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <motion.div
                        whileHover={{ rotate: 12, scale: 1.15 }}
                        className={`h-10 w-10 rounded-xl flex items-center justify-center ${badgeStyle}`}
                      >
                        <Icon className="h-5 w-5" />
                      </motion.div>
                      <span className={`text-2xl font-black ${yearStyle}`}>{event.year}</span>
                    </div>
                    <div className="space-y-2">
                      <h3 className={`text-lg font-bold leading-snug ${titleStyle}`}>{event.title}</h3>
                      <p className={`text-xs md:text-sm leading-relaxed ${textStyle}`}>{event.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Centralized Building Image */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={scaleIn}
            className="relative h-64 md:h-96 w-full rounded-3xl overflow-hidden border border-slate-100 shadow-xl"
          >
            <Image
              src="/office_building.png"
              alt="SIL Plastic Headquarters"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="absolute bottom-6 left-6 text-white space-y-1"
            >
              <span className="text-[10px] font-bold uppercase tracking-widest text-emerald">HQ Infrastructure</span>
              <h4 className="text-lg font-bold">Addis Ababa Engineering Campus</h4>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Global Partners Section */}
      <section className="py-24 px-6 md:px-8 max-w-4xl mx-auto space-y-12 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="space-y-3"
        >
          <motion.span variants={fadeUp} className="text-xs font-bold uppercase tracking-wider text-emerald">Trusted Network</motion.span>
          <motion.h2 variants={fadeUp} className="text-2xl md:text-3xl font-extrabold text-navy">Global Partners</motion.h2>
          <motion.p variants={fadeUp} className="text-slate-600 text-sm max-w-md mx-auto">
            Delivering custom polymer precision to industry leaders across the globe.
          </motion.p>
        </motion.div>

        {/* Partner Logos Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={staggerContainer}
          className="grid grid-cols-2 md:grid-cols-5 gap-4"
        >
          {partners.map((partner) => (
            <motion.div
              key={partner}
              variants={fadeUp}
              whileHover={{ scale: 1.05, borderColor: "rgba(0,135,90,0.4)" }}
              className="bg-white border border-card-border rounded-xl h-16 flex items-center justify-center font-black text-slate-400 tracking-wider text-sm hover:text-navy transition-colors cursor-pointer"
            >
              {partner}
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Stay Connected (Bottom CTA) */}
      <section className="bg-navy text-white py-20 px-6 md:px-8 text-center border-t border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald/10 to-transparent opacity-50" />
        
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={staggerContainer}
          className="relative z-10 max-w-2xl mx-auto space-y-8"
        >
          <div className="space-y-3">
            <motion.h2 variants={fadeUp} className="text-3xl font-black">Stay Connected</motion.h2>
            <motion.p variants={fadeUp} className="text-slate-300 text-sm md:text-base max-w-md mx-auto leading-relaxed">
              Follow our journey as we redefine polymer manufacturing standards across industrial networks.
            </motion.p>
          </div>

          {/* Social Icons */}
          <motion.div variants={fadeUp} className="flex gap-4 items-center justify-center text-slate-400">
            <a href="#" className="h-10 w-10 rounded-full border border-white/10 hover:border-white/30 flex items-center justify-center hover:text-white transition-colors hover:scale-110 active:scale-95">
              <ExternalLink className="h-4.5 w-4.5" />
            </a>
            <a href="#" className="h-10 w-10 rounded-full border border-white/10 hover:border-white/30 flex items-center justify-center hover:text-white transition-colors hover:scale-110 active:scale-95">
              <Share2 className="h-4.5 w-4.5" />
            </a>
            <a href="#" className="h-10 w-10 rounded-full border border-white/10 hover:border-white/30 flex items-center justify-center hover:text-white transition-colors hover:scale-110 active:scale-95">
              <Mail className="h-4.5 w-4.5" />
            </a>
          </motion.div>

          <motion.div variants={fadeUp}>
            <button
              onClick={() => setIsQuoteOpen(true)}
              className="inline-flex items-center gap-2 rounded-full bg-emerald hover:bg-emerald-dark px-8 py-3.5 text-sm font-bold transition-all shadow-lg shadow-emerald/10 cursor-pointer active:scale-95"
            >
              Get a Quote <ArrowRight className="h-4.5 w-4.5" />
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* Internal Modal */}
      <QuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} />
    </div>
  );
}
