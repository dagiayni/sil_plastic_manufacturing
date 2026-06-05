"use client";

import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import QuoteModal from "./QuoteModal";

interface ClientWrapperProps {
  children: React.ReactNode;
}

export default function ClientWrapper({ children }: ClientWrapperProps) {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  return (
    <>
      <Navbar openQuote={() => setIsQuoteOpen(true)} />
      <main className="flex-1 flex flex-col">{children}</main>
      <Footer openQuote={() => setIsQuoteOpen(true)} />
      <QuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} />
    </>
  );
}
