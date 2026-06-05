"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, CheckCircle2, AlertCircle, Clock, FileText } from "lucide-react";

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function QuoteModal({ isOpen, onClose }: QuoteModalProps) {
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [timeline, setTimeline] = useState("under-1-month");
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !companyName) return;

    setIsSubmitting(true);
    // Simulate API submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setCompanyName("");
        setEmail("");
        setTimeline("under-1-month");
        setFile(null);
        onClose();
      }, 2500);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-navy/80 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-navy border border-white/10 text-white shadow-2xl z-10"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors cursor-pointer"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Inner Content */}
            <div className="p-8">
              {!isSuccess ? (
                <>
                  <div className="mb-6">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald/20 px-3 py-1 text-xs font-semibold text-emerald tracking-wide">
                      <Clock className="h-3 w-3" /> Quick Quote
                    </span>
                    <h3 className="mt-3 text-2xl font-bold text-white leading-tight">
                      Start Your Project
                    </h3>
                    <p className="mt-2 text-sm text-slate-300">
                      Co-engineering team delivers all technical calculations within 24 hours. ISO certified quality control reports from the first testing.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                        Company Name
                      </label>
                      <input
                        type="text"
                        required
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="e.g. Global Plastics Corp"
                        className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                        Contact Email
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. project@company.com"
                        className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                        Project Timeline
                      </label>
                      <select
                        value={timeline}
                        onChange={(e) => setTimeline(e.target.value)}
                        className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald transition-colors [&>option]:bg-navy"
                      >
                        <option value="under-1-month">Short (under 1 month)</option>
                        <option value="1-3-months">Medium (1 to 3 months)</option>
                        <option value="3-plus-months">Long (3+ months)</option>
                      </select>
                    </div>

                    {/* Drag and Drop File Upload */}
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                        Technical Files (STEP, IGES, SolidWorks, PDF)
                      </label>
                      <div
                        onDragEnter={handleDrag}
                        onDragOver={handleDrag}
                        onDragLeave={handleDrag}
                        onDrop={handleDrop}
                        onClick={triggerFileSelect}
                        className={`flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-6 cursor-pointer transition-all ${
                          dragActive
                            ? "border-emerald bg-emerald/5"
                            : file
                            ? "border-emerald/50 bg-white/5"
                            : "border-white/10 bg-white/0 hover:bg-white/5 hover:border-white/20"
                        }`}
                      >
                        <input
                          ref={fileInputRef}
                          type="file"
                          className="hidden"
                          onChange={handleFileChange}
                          accept=".step,.stp,.iges,.igs,.sldprt,.pdf"
                        />
                        {file ? (
                          <div className="text-center">
                            <FileText className="h-10 w-10 text-emerald mx-auto mb-2" />
                            <p className="text-sm font-medium text-emerald max-w-[200px] truncate mx-auto">
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
                            <Upload className="h-10 w-10 text-slate-400 mx-auto mb-2" />
                            <p className="text-sm font-medium text-slate-200">
                              Drag and drop files or <span className="text-emerald">browse</span>
                            </p>
                            <p className="text-xs text-slate-400 mt-1">
                              Supports STEP, IGES, CAD, or PDF up to 25MB
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald/20 hover:bg-emerald-dark active:scale-[0.98] transition-all cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                          Processing Request...
                        </>
                      ) : (
                        "Start Your Project"
                      )}
                    </button>
                  </form>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <CheckCircle2 className="h-16 w-16 text-emerald mb-4" />
                  <h3 className="text-2xl font-bold text-white">Project Request Sent!</h3>
                  <p className="mt-2 text-sm text-slate-300 max-w-sm">
                    Thank you! Our engineering team will review your specifications and contact you at <strong className="text-white">{email}</strong> within 24 hours.
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
