"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/cart";

import {
  Search,
  ShoppingBag,
  ShoppingCart,
  Grid,
  MessageCircle,
  LogIn,
  Menu,
  X,
} from "lucide-react";

const Navbar = () => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartCount } = useCart();

  return (
    <header className="bg-black text-white sticky top-0 z-50">
      {/* Replace container with max-w-[1440px] and consistent padding */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="relative">
            <img
              src="/logo.avif"
              alt="COSMO PROF"
              className="h-10 w-auto object-contain rounded-full" // added rounded-full for circular shape
            />
          </Link>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:block flex-1 max-w-md mx-8">
            <div className="relative group">
              <input
                type="text"
                placeholder="Search products..."
                className={`w-full px-6 py-2.5 rounded-full text-black pr-12 text-sm
                  transition-all duration-300 outline-none
                  ${
                    isSearchFocused
                      ? "ring-2 ring-blue-500"
                      : "focus:ring-2 focus:ring-gray-300"
                  }
                  hover:shadow-md`}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
              <button
                className={`absolute right-4 top-2.5 transition-colors duration-300
                  ${isSearchFocused ? "text-blue-500" : "text-gray-400"}
                  hover:text-blue-600`}
              >
                <Search size={20} />
              </button>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="/catalog"
              className="flex items-center text-sm hover:text-gray-300 transition-colors gap-2 group"
            >
              <Grid
                size={20}
                className="group-hover:rotate-180 transition-transform duration-300"
              />
              <span>Catalog</span>
            </a>

            <a
              href="/contact"
              className="flex items-center text-sm hover:text-gray-300 transition-colors gap-2 group"
            >
              <MessageCircle
                size={20}
                className="group-hover:scale-110 transition-transform duration-300"
              />
              <span>Contact</span>
            </a>

            <a
              href="/login"
              className="flex items-center text-sm gap-2 px-4 py-2 rounded-full 
                bg-white text-black hover:bg-gray-100 transition-colors group"
            >
              <LogIn
                size={20}
                className="group-hover:translate-x-1 transition-transform duration-300"
              />
              <span>Log In</span>
            </a>

            <Link href="/cart" className="relative">
              <ShoppingBag className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden ${isMobileMenuOpen ? "block" : "hidden"}`}>
          <div className="py-3">
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-6 py-2.5 rounded-full text-black pr-12 text-sm"
              />
              <button className="absolute right-4 top-2.5 text-gray-400">
                <Search size={20} />
              </button>
            </div>

            <nav className="flex flex-col space-y-4">
              <a
                href="/catalog"
                className="flex items-center text-sm hover:text-gray-300 transition-colors gap-2 py-2"
              >
                <Grid size={20} />
                <span>Catalog</span>
              </a>
              <a
                href="/contact"
                className="flex items-center text-sm hover:text-gray-300 transition-colors gap-2 py-2"
              >
                <MessageCircle size={20} />
                <span>Contact</span>
              </a>
              <a
                href="/login"
                className="flex items-center text-sm hover:text-gray-300 transition-colors gap-2 py-2"
              >
                <LogIn size={20} />
                <span>Log In</span>
              </a>
              <Link href="/cart" className="relative">
                <ShoppingBag className="w-6 h-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
