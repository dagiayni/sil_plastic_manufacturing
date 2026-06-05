"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { 
  Wrench, 
  Cpu, 
  FlaskConical, 
  ArrowRight, 
  CheckCircle, 
  Download, 
  FileText, 
  TrendingUp, 
  Award,
  Upload,
  Clock,
  ShieldCheck,
  Zap,
  Users
} from "lucide-react";

/* ─── Animated Counter Component (triggers on scroll into view) ─── */
function AnimatedCounter({ target, suffix = "", duration = 2 }: { target: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const motionVal = useMotionValue(0);
  const rounded = useTransform(motionVal, (v) => Math.floor(v));

  useEffect(() => {
    if (isInView) {
      animate(motionVal, target, { duration, ease: "easeOut" });
    }
  }, [isInView, motionVal, target, duration]);

  useEffect(() => {
    const unsubscribe = rounded.on("change", (v) => {
      if (ref.current) ref.current.textContent = `${v}${suffix}`;
    });
    return unsubscribe;
  }, [rounded, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

/* ─── Stagger wrapper for child elements ─── */
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

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Home() {
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [timeline, setTimeline] = useState("under-1-month");
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName || !email) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setCompanyName("");
        setEmail("");
        setTimeline("under-1-month");
        setFile(null);
      }, 3000);
    }, 1500);
  };

  const services = [
    {
      icon: Wrench,
      title: "Precision Tooling",
      description: "In-house mold design and manufacturing ensuring high precision and durability for complex custom geometries.",
    },
    {
      icon: Cpu,
      title: "Mass Production",
      description: "High-volume injection molding supporting 24/7 automated production lines with zero defect tolerances.",
    },
    {
      icon: FlaskConical,
      title: "Quality Testing",
      description: "Rigorous material analysis and quality control in our dedicated ISO-certified testing laboratory.",
    },
  ];

  return (
    <div className="w-full bg-slate-50 overflow-x-hidden">
      {/* ═══════════════ Hero Section ═══════════════ */}
      <section className="relative w-full min-h-[92vh] flex items-center justify-center bg-navy text-white px-6 md:px-8 py-28 overflow-hidden">
        {/* Background Image with Dark Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero_factory.png"
            alt="SIL Plastic Factory Background"
            fill
            priority
            className="object-cover object-center opacity-30 select-none"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/90 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/70 to-transparent" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="lg:col-span-8 space-y-6"
          >
            {/* Leader Badge */}
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 rounded-full bg-emerald/20 border border-emerald/30 px-4 py-1.5 text-xs font-bold text-emerald uppercase tracking-wider">
              <ShieldCheck className="h-4 w-4" /> LEADER IN SUSTAINABLE POLYMERS
            </motion.div>

            {/* Main Heading */}
            <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight max-w-3xl">
              Precision Plastic Manufacturing for a <span className="text-emerald">Sustainable Future</span>
            </motion.h1>

            {/* Subtext */}
            <motion.p variants={fadeUp} className="text-base md:text-lg text-slate-300 max-w-2xl leading-relaxed">
              Custom industrial & packaging solutions delivered with high quality and environmental stewardship since 1998. We engineer high-performance polymers for automotive, medical, and consumer markets.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={() => {
                  const element = document.getElementById("start-project");
                  element?.scrollIntoView({ behavior: "smooth" });
                }}
                className="flex items-center justify-center gap-2 rounded-xl bg-emerald hover:bg-emerald-dark px-8 py-4 text-base font-bold shadow-lg shadow-emerald/20 hover:shadow-emerald/30 active:scale-95 transition-all cursor-pointer text-center"
              >
                Request a Quote <ArrowRight className="h-5 w-5" />
              </button>
              <button
                onClick={() => {
                  const element = document.getElementById("capabilities");
                  element?.scrollIntoView({ behavior: "smooth" });
                }}
                className="flex items-center justify-center gap-2 rounded-xl border border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 px-8 py-4 text-base font-semibold backdrop-blur-sm transition-all cursor-pointer text-center"
              >
                View Capabilities
              </button>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-5 h-8 rounded-full border-2 border-white/30 flex justify-center pt-1.5">
            <motion.div 
              className="w-1 h-2 bg-emerald rounded-full"
              animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </section>

      {/* ═══════════════ Stats Section (Scroll-triggered counters) ═══════════════ */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={scaleIn}
        className="relative z-20 -mt-10 mx-auto max-w-7xl px-6 md:px-8"
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-xl shadow-slate-200/50">
          <div className="flex items-center gap-4 border-r border-slate-100 last:border-0 pr-4">
            <div className="p-3 bg-emerald/10 rounded-2xl text-emerald shrink-0">
              <Zap className="h-6 w-6" />
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-black text-navy">
                <AnimatedCounter target={25} suffix="+" />
              </div>
              <div className="text-[11px] md:text-xs font-bold text-slate-500 uppercase tracking-wide">Years in Business</div>
            </div>
          </div>

          <div className="flex items-center gap-4 md:border-r border-slate-100 last:border-0 pr-4">
            <div className="p-3 bg-emerald/10 rounded-2xl text-emerald shrink-0">
              <TrendingUp className="h-6 w-6" />
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-black text-navy">
                <AnimatedCounter target={500} suffix="M+" duration={2.5} />
              </div>
              <div className="text-[11px] md:text-xs font-bold text-slate-500 uppercase tracking-wide">Units Produced</div>
            </div>
          </div>

          <div className="flex items-center gap-4 border-r border-slate-100 last:border-0 pr-4">
            <div className="p-3 bg-emerald/10 rounded-2xl text-emerald shrink-0">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-black text-navy">
                <AnimatedCounter target={200} suffix="+" />
              </div>
              <div className="text-[11px] md:text-xs font-bold text-slate-500 uppercase tracking-wide">Global Clients</div>
            </div>
          </div>

          <div className="flex items-center gap-4 last:border-0 pr-4">
            <div className="p-3 bg-emerald/10 rounded-2xl text-emerald shrink-0">
              <Award className="h-6 w-6" />
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-black text-navy">ISO 9001</div>
              <div className="text-[11px] md:text-xs font-bold text-slate-500 uppercase tracking-wide">Certified Quality</div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ═══════════════ Industrial Excellence (Services) Section ═══════════════ */}
      <section id="capabilities" className="py-24 px-6 md:px-8 max-w-7xl mx-auto space-y-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="text-center max-w-3xl mx-auto space-y-4"
        >
          <motion.span variants={fadeUp} className="text-xs font-bold uppercase tracking-wider text-emerald">Our Core Expertise</motion.span>
          <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-extrabold text-navy">Industrial Excellence</motion.h2>
          <motion.p variants={fadeUp} className="text-slate-600 text-sm md:text-base leading-relaxed">
            Offering cutting-edge industrial and specialized polymer solutions tailored for manufacturing, automotive, healthcare, and packaging sectors.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                variants={fadeUp}
                whileHover={{ y: -10, boxShadow: "0 25px 50px rgba(7,33,61,0.08)" }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="bg-white border border-card-border rounded-2xl p-8 flex flex-col justify-between group cursor-pointer"
              >
                <div className="space-y-6">
                  <motion.div
                    whileHover={{ rotate: 8, scale: 1.1 }}
                    className="h-12 w-12 rounded-xl bg-slate-50 border border-card-border flex items-center justify-center text-navy group-hover:bg-emerald group-hover:text-white transition-colors duration-300"
                  >
                    <Icon className="h-6 w-6" />
                  </motion.div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-navy">{service.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{service.description}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    const element = document.getElementById("start-project");
                    element?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="mt-8 flex items-center gap-2 text-xs font-bold text-slate-400 group-hover:text-emerald transition-colors cursor-pointer"
                >
                  Learn More <ArrowRight className="h-4 w-full max-w-[14px] group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* ═══════════════ The Circular Initiative Section ═══════════════ */}
      <section className="bg-navy text-white py-24 px-6 md:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column Text */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="lg:col-span-6 space-y-8"
          >
            <div className="space-y-3">
              <motion.span variants={fadeUp} className="text-xs font-bold uppercase tracking-wider text-emerald">The Circular Initiative</motion.span>
              <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-extrabold tracking-tight">Closing the Loop on Industrial Production</motion.h2>
              <motion.p variants={fadeUp} className="text-slate-300 text-sm md:text-base leading-relaxed">
                We are transitioning the plastic industry through <strong>&quot;The Circular Initiative&quot;</strong> by integrating zero-waste principles, introducing energy-efficient technology, and reducing carbon footprints without compromising structural integrity.
              </motion.p>
            </div>

            {/* Checklist */}
            <motion.div variants={staggerContainer} className="space-y-4">
              {[
                { title: "80% Post-Industrial Waste Recovery", desc: "Recycling raw waste back into industrial-grade compounds." },
                { title: "Solar-Powered Extrusion Lines", desc: "Using localized grid offsets to achieve carbon-neutral extrusion." },
                { title: "Bioplastics & Smart Alternatives", desc: "Developing renewable plant-based resins for automotive & packaging." },
              ].map((item) => (
                <motion.div key={item.title} variants={fadeUp} className="flex items-start gap-3.5">
                  <CheckCircle className="h-5 w-5 text-emerald shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm">{item.title}</h4>
                    <p className="text-xs text-slate-400 mt-0.5">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={fadeUp}>
              <Link
                href="/about"
                className="inline-flex items-center gap-2.5 rounded-full bg-emerald hover:bg-emerald-dark px-6 py-3 text-xs font-bold transition-all shadow-md shadow-emerald/10 cursor-pointer"
              >
                Download Sustainability Report <Download className="h-4.5 w-4.5" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Column Diagram */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-6 flex justify-center relative"
          >
            <div className="relative w-72 h-72 md:w-96 md:h-96 flex items-center justify-center">
              {/* Outer Rotating Dotted Ring */}
              <div className="absolute inset-0 rounded-full border border-dashed border-white/10 animate-[spin_40s_linear_infinite]" />
              
              {/* Inner Rotating Ring */}
              <div className="absolute inset-6 rounded-full border-2 border-dashed border-emerald/20 animate-[spin_25s_linear_infinite_reverse]" />

              {/* Glowing Ambient Backdrop */}
              <div className="absolute inset-16 bg-emerald/10 rounded-full blur-3xl" />

              {/* Core Isometric Render Graphic */}
              <motion.div
                animate={{ rotateY: [0, 5, 0, -5, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-40 h-40 md:w-56 md:h-56 bg-slate-900 border border-white/10 rounded-3xl flex flex-col items-center justify-center p-6 text-center shadow-2xl backdrop-blur-md"
              >
                <div className="relative flex items-center justify-center w-16 h-16 md:w-20 md:h-20 mb-4 bg-emerald/10 border border-emerald/30 rounded-2xl">
                  <svg className="absolute w-12 h-12 md:w-16 md:h-16 text-emerald" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="2" fill="none" strokeDasharray="30 15" className="animate-[spin_10s_linear_infinite]" />
                    <path d="M 50 10 L 50 25 M 50 75 L 50 90 M 10 50 L 25 50 M 75 50 L 90 50" stroke="currentColor" strokeWidth="3" />
                  </svg>
                  <Cpu className="h-6 w-6 md:h-8 md:w-8 text-emerald z-10" />
                </div>
                <span className="text-[10px] md:text-xs font-extrabold uppercase tracking-widest text-emerald">The Loop</span>
                <h3 className="text-sm md:text-base font-bold text-white mt-1">Zero-Waste Standard</h3>
                <p className="text-[9px] md:text-xs text-slate-400 mt-1">Closed-loop water & material recycling</p>
              </motion.div>
              
              {/* Surrounding Nodes (Mini Floating Badges) */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-2 left-6 bg-slate-900 border border-white/10 rounded-xl px-3 py-1.5 flex items-center gap-2 text-[10px] md:text-xs"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-emerald" />
                <span>Solar Offsets</span>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, delay: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-6 right-2 bg-slate-900 border border-white/10 rounded-xl px-3 py-1.5 flex items-center gap-2 text-[10px] md:text-xs"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-emerald animate-pulse" />
                <span>Bioplastics</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ Technical Resources Section ═══════════════ */}
      <section className="py-24 px-6 md:px-8 max-w-7xl mx-auto space-y-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="text-center max-w-3xl mx-auto space-y-4"
        >
          <motion.span variants={fadeUp} className="text-xs font-bold uppercase tracking-wider text-emerald">Knowledge Hub</motion.span>
          <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-extrabold text-navy">Technical Resources</motion.h2>
          <motion.p variants={fadeUp} className="text-slate-600 text-sm md:text-base leading-relaxed">
            Download custom engineering specifications, mechanical characteristics, and polymer science reports.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {/* Resource 1 */}
          <motion.div
            variants={fadeUp}
            whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(0,0,0,0.06)" }}
            className="flex gap-6 bg-white border border-card-border rounded-2xl p-6 md:p-8 transition-all group cursor-pointer"
          >
            <div className="p-4 bg-emerald-light border border-emerald/10 rounded-xl text-emerald shrink-0 h-14 w-14 flex items-center justify-center">
              <FileText className="h-6 w-6" />
            </div>
            <div className="space-y-4">
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-navy">Material Data Sheets</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Download technical specification and quality standards for SIL polymer grades including PP, PET, ABS, and PE.
                </p>
              </div>
              <button
                onClick={() => alert("Downloading Material Data Sheet... (Mock download)")}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald hover:text-emerald-dark transition-colors cursor-pointer"
              >
                Download Data Sheet <Download className="h-3.5 w-3.5" />
              </button>
            </div>
          </motion.div>

          {/* Resource 2 */}
          <motion.div
            variants={fadeUp}
            whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(0,0,0,0.06)" }}
            className="flex gap-6 bg-white border border-card-border rounded-2xl p-6 md:p-8 transition-all group cursor-pointer"
          >
            <div className="p-4 bg-emerald-light border border-emerald/10 rounded-xl text-emerald shrink-0 h-14 w-14 flex items-center justify-center">
              <TrendingUp className="h-6 w-6" />
            </div>
            <div className="space-y-4">
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-navy">Engineering Insights</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Whitepapers and application guides covering tooling design, injection molding mechanics, and sustainability metrics.
                </p>
              </div>
              <Link
                href="/insights"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald hover:text-emerald-dark transition-colors"
              >
                Read White Papers <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════════ Start Your Project (Form) Section ═══════════════ */}
      <section id="start-project" className="bg-white border-t border-slate-100 py-24 px-6 md:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left info column */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="lg:col-span-5 space-y-8"
          >
            <div className="space-y-4">
              <motion.span variants={fadeUp} className="text-xs font-bold uppercase tracking-wider text-emerald">Get in Touch</motion.span>
              <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-extrabold text-navy tracking-tight">Start Your Project</motion.h2>
              <motion.p variants={fadeUp} className="text-slate-600 text-sm md:text-base leading-relaxed">
                Our co-engineering team is ready to analyze your designs. Upload your CAD drawings (STEP, IGES) or technical specifications, and receive a complete feasibility study and quote within 24 hours.
              </motion.p>
            </div>

            {/* Support list */}
            <motion.div variants={staggerContainer} className="space-y-4">
              <motion.div variants={fadeUp} className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-emerald-light flex items-center justify-center text-emerald shrink-0">
                  <CheckCircle className="h-4 w-4" />
                </div>
                <span className="text-sm font-semibold text-navy">CAD Upload: STEP, IGES, or SolidWorks</span>
              </motion.div>
              <motion.div variants={fadeUp} className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-emerald-light flex items-center justify-center text-emerald shrink-0">
                  <Clock className="h-4 w-4" />
                </div>
                <span className="text-sm font-semibold text-navy">Samples in 4 Days (Fast prototype tooling)</span>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right form column */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="lg:col-span-7 bg-navy border border-white/10 text-white rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden"
          >
            {!isSuccess ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Company Name
                  </label>
                  <input
                    type="text"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. SIL Industrial Ltd"
                    className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Contact Email
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. engineering@company.com"
                    className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Project Timeline
                  </label>
                  <select
                    value={timeline}
                    onChange={(e) => setTimeline(e.target.value)}
                    className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald transition-colors [&>option]:bg-navy"
                  >
                    <option value="under-1-month">Short (under 1 month)</option>
                    <option value="1-3-months">Medium (1 to 3 months)</option>
                    <option value="3-plus-months">Long (3+ months)</option>
                  </select>
                </div>

                {/* File Drop Area */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Drag and Drop Technical Files
                  </label>
                  <div
                    onDragEnter={handleDrag}
                    onDragOver={handleDrag}
                    onDragLeave={handleDrag}
                    onDrop={handleDrop}
                    className={`flex flex-col items-center justify-center border-2 border-dashed rounded-2xl p-8 cursor-pointer transition-all ${
                      dragActive
                        ? "border-emerald bg-emerald/5"
                        : file
                        ? "border-emerald/50 bg-white/5"
                        : "border-white/10 hover:bg-white/5"
                    }`}
                    onClick={() => {
                      const input = document.getElementById("page-file-input");
                      input?.click();
                    }}
                  >
                    <input
                      id="page-file-input"
                      type="file"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setFile(e.target.files[0]);
                        }
                      }}
                      accept=".step,.stp,.iges,.igs,.sldprt,.pdf"
                    />
                    {file ? (
                      <div className="text-center">
                        <FileText className="h-10 w-10 text-emerald mx-auto mb-2" />
                        <p className="text-sm font-semibold text-emerald max-w-[240px] truncate mx-auto">
                          {file.name}
                        </p>
                        <p className="text-xs text-slate-400 mt-1">
                          {(file.size / (1024 * 1024)).toFixed(2)} MB
                        </p>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setFile(null);
                          }}
                          className="mt-3 text-xs text-rose-400 hover:text-rose-300 font-medium underline cursor-pointer"
                        >
                          Remove file
                        </button>
                      </div>
                    ) : (
                      <div className="text-center">
                        <Upload className="h-10 w-10 text-slate-400 mx-auto mb-2 animate-bounce" />
                        <p className="text-sm font-medium text-slate-200">
                          Drag and drop technical files or <span className="text-emerald">browse</span>
                        </p>
                        <p className="text-xs text-slate-400 mt-1">
                          Supports CAD format STEP, IGES or PDF up to 25MB
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald hover:bg-emerald-dark py-4 text-sm font-bold text-white shadow-lg shadow-emerald/10 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? "Processing..." : "Start Your Project"}
                </button>
              </form>
            ) : (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex flex-col items-center justify-center py-20 text-center"
              >
                <CheckCircle className="h-16 w-16 text-emerald mb-4" />
                <h3 className="text-2xl font-bold text-white">Project Initialized!</h3>
                <p className="mt-2 text-sm text-slate-300 max-w-sm">
                  We&apos;ve successfully received your details. Our co-engineering team is analyzing the specification and will contact you shortly.
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
