// pages/catalog.jsx
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from '@/context/cart' // Add this import

import { useRouter, useSearchParams } from "next/navigation";
import {
  Filter,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Star,
  Minus,
  Plus,
  ArrowLeft,
  lucideIcons,
  CheckCircle,
  Award,
  Leaf,
} from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const productData = [
  {
    id: 1,
    name: "Hydrating Rose Facial Serum",
    brand: "Glow Labs",
    category: "Skincare",
    price: 49.99,
    rating: 4.8,
    image: "/product-1.jpg",
    description:
      "Intensive hydrating serum with rose water and hyaluronic acid",
    details:
      "This luxurious facial serum combines the power of Damascus rose water with triple-weight hyaluronic acid for deep hydration. Perfect for all skin types, especially dry and sensitive skin.",
    ingredients: ["Rose Water", "Hyaluronic Acid", "Vitamin E", "Glycerin"],
    usage: "Apply 2-3 drops to clean, damp skin morning and evening.",
  },
  {
    id: 2,
    name: "Vitamin C Brightening Cream",
    brand: "Pure Beauty",
    category: "Skincare",
    price: 38.99,
    rating: 4.7,
    image: "/product-2.jpg",
    description: "Brightening cream with 20% Vitamin C complex",
    details:
      "Advanced brightening formula with 20% stabilized Vitamin C, ferulic acid, and vitamin E. Helps fade dark spots and improve skin radiance.",
    ingredients: ["Vitamin C", "Ferulic Acid", "Vitamin E", "Niacinamide"],
    usage: "Apply a small amount to face and neck every morning.",
  },
  {
    id: 3,
    name: "Silk Protein Hair Mask",
    brand: "Hair Luxe",
    category: "Haircare",
    price: 34.99,
    rating: 4.9,
    image: "/product-3.jpg",
    description: "Deep conditioning hair mask with silk proteins",
    details:
      "Intensive hair treatment mask enriched with silk proteins and keratin. Repairs damaged hair and adds incredible shine and softness.",
    ingredients: ["Silk Proteins", "Keratin", "Argan Oil", "Panthenol"],
    usage: "Apply to damp hair, leave for 15-20 minutes, then rinse.",
  },
  {
    id: 4,
    name: "Matte Velvet Foundation",
    brand: "Glam Cosmetics",
    category: "Makeup",
    price: 42.99,
    rating: 4.6,
    image: "/product-4.jpg",
    description: "Long-wearing matte foundation with buildable coverage",
    details:
      "Lightweight yet full-coverage foundation that stays matte all day. Available in 40 shades for all skin tones.",
    ingredients: ["Silica", "Vitamin E", "Hyaluronic Acid", "SPF 15"],
    usage: "Apply with brush or sponge for desired coverage.",
  },
  {
    id: 4,
    name: "Matte Velvet Foundation",
    brand: "Glam Cosmetics",
    category: "Makeup",
    price: 42.99,
    rating: 4.6,
    image: "/product-4.jpg",
    description: "Long-wearing matte foundation with buildable coverage",
    details:
      "Lightweight yet full-coverage foundation that stays matte all day. Available in 40 shades for all skin tones.",
    ingredients: ["Silica", "Vitamin E", "Hyaluronic Acid", "SPF 15"],
    usage: "Apply with brush or sponge for desired coverage.",
  },
  {
    id: 4,
    name: "Matte Velvet Foundation",
    brand: "Glam Cosmetics",
    category: "Makeup",
    price: 42.99,
    rating: 4.6,
    image: "/product-4.jpg",
    description: "Long-wearing matte foundation with buildable coverage",
    details:
      "Lightweight yet full-coverage foundation that stays matte all day. Available in 40 shades for all skin tones.",
    ingredients: ["Silica", "Vitamin E", "Hyaluronic Acid", "SPF 15"],
    usage: "Apply with brush or sponge for desired coverage.",
  },
  {
    id: 4,
    name: "Matte Velvet Foundation",
    brand: "Glam Cosmetics",
    category: "Makeup",
    price: 42.99,
    rating: 4.6,
    image: "/product-4.jpg",
    description: "Long-wearing matte foundation with buildable coverage",
    details:
      "Lightweight yet full-coverage foundation that stays matte all day. Available in 40 shades for all skin tones.",
    ingredients: ["Silica", "Vitamin E", "Hyaluronic Acid", "SPF 15"],
    usage: "Apply with brush or sponge for desired coverage.",
  },
  {
    id: 4,
    name: "Matte Velvet Foundation",
    brand: "Glam Cosmetics",
    category: "Makeup",
    price: 42.99,
    rating: 4.6,
    image: "/product-4.jpg",
    description: "Long-wearing matte foundation with buildable coverage",
    details:
      "Lightweight yet full-coverage foundation that stays matte all day. Available in 40 shades for all skin tones.",
    ingredients: ["Silica", "Vitamin E", "Hyaluronic Acid", "SPF 15"],
    usage: "Apply with brush or sponge for desired coverage.",
  },
  {
    id: 4,
    name: "Matte Velvet Foundation",
    brand: "Glam Cosmetics",
    category: "Makeup",
    price: 42.99,
    rating: 4.6,
    image: "/product-4.jpg",
    description: "Long-wearing matte foundation with buildable coverage",
    details:
      "Lightweight yet full-coverage foundation that stays matte all day. Available in 40 shades for all skin tones.",
    ingredients: ["Silica", "Vitamin E", "Hyaluronic Acid", "SPF 15"],
    usage: "Apply with brush or sponge for desired coverage.",
  },
  {
    id: 4,
    name: "Matte Velvet Foundation",
    brand: "Glam Cosmetics",
    category: "Makeup",
    price: 42.99,
    rating: 4.6,
    image: "/product-4.jpg",
    description: "Long-wearing matte foundation with buildable coverage",
    details:
      "Lightweight yet full-coverage foundation that stays matte all day. Available in 40 shades for all skin tones.",
    ingredients: ["Silica", "Vitamin E", "Hyaluronic Acid", "SPF 15"],
    usage: "Apply with brush or sponge for desired coverage.",
  },
  {
    id: 4,
    name: "Matte Velvet Foundation",
    brand: "Glam Cosmetics",
    category: "Makeup",
    price: 42.99,
    rating: 4.6,
    image: "/product-4.jpg",
    description: "Long-wearing matte foundation with buildable coverage",
    details:
      "Lightweight yet full-coverage foundation that stays matte all day. Available in 40 shades for all skin tones.",
    ingredients: ["Silica", "Vitamin E", "Hyaluronic Acid", "SPF 15"],
    usage: "Apply with brush or sponge for desired coverage.",
  },
  {
    id: 4,
    name: "Matte Velvet Foundation",
    brand: "Glam Cosmetics",
    category: "Makeup",
    price: 42.99,
    rating: 4.6,
    image: "/product-4.jpg",
    description: "Long-wearing matte foundation with buildable coverage",
    details:
      "Lightweight yet full-coverage foundation that stays matte all day. Available in 40 shades for all skin tones.",
    ingredients: ["Silica", "Vitamin E", "Hyaluronic Acid", "SPF 15"],
    usage: "Apply with brush or sponge for desired coverage.",
  },
  {
    id: 4,
    name: "Matte Velvet Foundation",
    brand: "Glam Cosmetics",
    category: "Makeup",
    price: 42.99,
    rating: 4.6,
    image: "/product-4.jpg",
    description: "Long-wearing matte foundation with buildable coverage",
    details:
      "Lightweight yet full-coverage foundation that stays matte all day. Available in 40 shades for all skin tones.",
    ingredients: ["Silica", "Vitamin E", "Hyaluronic Acid", "SPF 15"],
    usage: "Apply with brush or sponge for desired coverage.",
  },
  {
    id: 4,
    name: "Matte Velvet Foundation",
    brand: "Glam Cosmetics",
    category: "Makeup",
    price: 42.99,
    rating: 4.6,
    image: "/product-4.jpg",
    description: "Long-wearing matte foundation with buildable coverage",
    details:
      "Lightweight yet full-coverage foundation that stays matte all day. Available in 40 shades for all skin tones.",
    ingredients: ["Silica", "Vitamin E", "Hyaluronic Acid", "SPF 15"],
    usage: "Apply with brush or sponge for desired coverage.",
  },
  {
    id: 4,
    name: "Matte Velvet Foundation",
    brand: "Glam Cosmetics",
    category: "Makeup",
    price: 42.99,
    rating: 4.6,
    image: "/product-4.jpg",
    description: "Long-wearing matte foundation with buildable coverage",
    details:
      "Lightweight yet full-coverage foundation that stays matte all day. Available in 40 shades for all skin tones.",
    ingredients: ["Silica", "Vitamin E", "Hyaluronic Acid", "SPF 15"],
    usage: "Apply with brush or sponge for desired coverage.",
  },
  {
    id: 4,
    name: "Matte Velvet Foundation",
    brand: "Glam Cosmetics",
    category: "Makeup",
    price: 42.99,
    rating: 4.6,
    image: "/product-4.jpg",
    description: "Long-wearing matte foundation with buildable coverage",
    details:
      "Lightweight yet full-coverage foundation that stays matte all day. Available in 40 shades for all skin tones.",
    ingredients: ["Silica", "Vitamin E", "Hyaluronic Acid", "SPF 15"],
    usage: "Apply with brush or sponge for desired coverage.",
  },
  {
    id: 4,
    name: "Matte Velvet Foundation",
    brand: "Glam Cosmetics",
    category: "Makeup",
    price: 42.99,
    rating: 4.6,
    image: "/product-4.jpg",
    description: "Long-wearing matte foundation with buildable coverage",
    details:
      "Lightweight yet full-coverage foundation that stays matte all day. Available in 40 shades for all skin tones.",
    ingredients: ["Silica", "Vitamin E", "Hyaluronic Acid", "SPF 15"],
    usage: "Apply with brush or sponge for desired coverage.",
  },
  {
    id: 4,
    name: "Matte Velvet Foundation",
    brand: "Glam Cosmetics",
    category: "Makeup",
    price: 42.99,
    rating: 4.6,
    image: "/product-4.jpg",
    description: "Long-wearing matte foundation with buildable coverage",
    details:
      "Lightweight yet full-coverage foundation that stays matte all day. Available in 40 shades for all skin tones.",
    ingredients: ["Silica", "Vitamin E", "Hyaluronic Acid", "SPF 15"],
    usage: "Apply with brush or sponge for desired coverage.",
  },
  {
    id: 4,
    name: "Matte Velvet Foundation",
    brand: "Glam Cosmetics",
    category: "Makeup",
    price: 42.99,
    rating: 4.6,
    image: "/product-4.jpg",
    description: "Long-wearing matte foundation with buildable coverage",
    details:
      "Lightweight yet full-coverage foundation that stays matte all day. Available in 40 shades for all skin tones.",
    ingredients: ["Silica", "Vitamin E", "Hyaluronic Acid", "SPF 15"],
    usage: "Apply with brush or sponge for desired coverage.",
  },
  {
    id: 4,
    name: "Matte Velvet Foundation",
    brand: "Glam Cosmetics",
    category: "Makeup",
    price: 42.99,
    rating: 4.6,
    image: "/product-4.jpg",
    description: "Long-wearing matte foundation with buildable coverage",
    details:
      "Lightweight yet full-coverage foundation that stays matte all day. Available in 40 shades for all skin tones.",
    ingredients: ["Silica", "Vitamin E", "Hyaluronic Acid", "SPF 15"],
    usage: "Apply with brush or sponge for desired coverage.",
  },
  {
    id: 4,
    name: "Matte Velvet Foundation",
    brand: "Glam Cosmetics",
    category: "Makeup",
    price: 42.99,
    rating: 4.6,
    image: "/product-4.jpg",
    description: "Long-wearing matte foundation with buildable coverage",
    details:
      "Lightweight yet full-coverage foundation that stays matte all day. Available in 40 shades for all skin tones.",
    ingredients: ["Silica", "Vitamin E", "Hyaluronic Acid", "SPF 15"],
    usage: "Apply with brush or sponge for desired coverage.",
  },
  {
    id: 4,
    name: "Matte Velvet Foundation",
    brand: "Glam Cosmetics",
    category: "Makeup",
    price: 42.99,
    rating: 4.6,
    image: "/product-4.jpg",
    description: "Long-wearing matte foundation with buildable coverage",
    details:
      "Lightweight yet full-coverage foundation that stays matte all day. Available in 40 shades for all skin tones.",
    ingredients: ["Silica", "Vitamin E", "Hyaluronic Acid", "SPF 15"],
    usage: "Apply with brush or sponge for desired coverage.",
  },
  {
    id: 4,
    name: "Matte Velvet Foundation",
    brand: "Glam Cosmetics",
    category: "Makeup",
    price: 42.99,
    rating: 4.6,
    image: "/product-4.jpg",
    description: "Long-wearing matte foundation with buildable coverage",
    details:
      "Lightweight yet full-coverage foundation that stays matte all day. Available in 40 shades for all skin tones.",
    ingredients: ["Silica", "Vitamin E", "Hyaluronic Acid", "SPF 15"],
    usage: "Apply with brush or sponge for desired coverage.",
  },
  {
    id: 4,
    name: "Matte Velvet Foundation",
    brand: "Glam Cosmetics",
    category: "Makeup",
    price: 42.99,
    rating: 4.6,
    image: "/product-4.jpg",
    description: "Long-wearing matte foundation with buildable coverage",
    details:
      "Lightweight yet full-coverage foundation that stays matte all day. Available in 40 shades for all skin tones.",
    ingredients: ["Silica", "Vitamin E", "Hyaluronic Acid", "SPF 15"],
    usage: "Apply with brush or sponge for desired coverage.",
  },
  {
    id: 4,
    name: "Matte Velvet Foundation",
    brand: "Glam Cosmetics",
    category: "Makeup",
    price: 42.99,
    rating: 4.6,
    image: "/product-4.jpg",
    description: "Long-wearing matte foundation with buildable coverage",
    details:
      "Lightweight yet full-coverage foundation that stays matte all day. Available in 40 shades for all skin tones.",
    ingredients: ["Silica", "Vitamin E", "Hyaluronic Acid", "SPF 15"],
    usage: "Apply with brush or sponge for desired coverage.",
  },
  {
    id: 4,
    name: "Matte Velvet Foundation",
    brand: "Glam Cosmetics",
    category: "Makeup",
    price: 42.99,
    rating: 4.6,
    image: "/product-4.jpg",
    description: "Long-wearing matte foundation with buildable coverage",
    details:
      "Lightweight yet full-coverage foundation that stays matte all day. Available in 40 shades for all skin tones.",
    ingredients: ["Silica", "Vitamin E", "Hyaluronic Acid", "SPF 15"],
    usage: "Apply with brush or sponge for desired coverage.",
  },
  {
    id: 4,
    name: "Matte Velvet Foundation",
    brand: "Glam Cosmetics",
    category: "Makeup",
    price: 42.99,
    rating: 4.6,
    image: "/product-4.jpg",
    description: "Long-wearing matte foundation with buildable coverage",
    details:
      "Lightweight yet full-coverage foundation that stays matte all day. Available in 40 shades for all skin tones.",
    ingredients: ["Silica", "Vitamin E", "Hyaluronic Acid", "SPF 15"],
    usage: "Apply with brush or sponge for desired coverage.",
  },
  {
    id: 4,
    name: "Matte Velvet Foundation",
    brand: "Glam Cosmetics",
    category: "Makeup",
    price: 42.99,
    rating: 4.6,
    image: "/product-4.jpg",
    description: "Long-wearing matte foundation with buildable coverage",
    details:
      "Lightweight yet full-coverage foundation that stays matte all day. Available in 40 shades for all skin tones.",
    ingredients: ["Silica", "Vitamin E", "Hyaluronic Acid", "SPF 15"],
    usage: "Apply with brush or sponge for desired coverage.",
  },
  {
    id: 4,
    name: "Matte Velvet Foundation",
    brand: "Glam Cosmetics",
    category: "Makeup",
    price: 42.99,
    rating: 4.6,
    image: "/product-4.jpg",
    description: "Long-wearing matte foundation with buildable coverage",
    details:
      "Lightweight yet full-coverage foundation that stays matte all day. Available in 40 shades for all skin tones.",
    ingredients: ["Silica", "Vitamin E", "Hyaluronic Acid", "SPF 15"],
    usage: "Apply with brush or sponge for desired coverage.",
  },
  {
    id: 4,
    name: "Matte Velvet Foundation",
    brand: "Glam Cosmetics",
    category: "Makeup",
    price: 42.99,
    rating: 4.6,
    image: "/product-4.jpg",
    description: "Long-wearing matte foundation with buildable coverage",
    details:
      "Lightweight yet full-coverage foundation that stays matte all day. Available in 40 shades for all skin tones.",
    ingredients: ["Silica", "Vitamin E", "Hyaluronic Acid", "SPF 15"],
    usage: "Apply with brush or sponge for desired coverage.",
  },
  {
    id: 4,
    name: "Matte Velvet Foundation",
    brand: "Glam Cosmetics",
    category: "Makeup",
    price: 42.99,
    rating: 4.6,
    image: "/product-4.jpg",
    description: "Long-wearing matte foundation with buildable coverage",
    details:
      "Lightweight yet full-coverage foundation that stays matte all day. Available in 40 shades for all skin tones.",
    ingredients: ["Silica", "Vitamin E", "Hyaluronic Acid", "SPF 15"],
    usage: "Apply with brush or sponge for desired coverage.",
  },
  {
    id: 4,
    name: "Matte Velvet Foundation",
    brand: "Glam Cosmetics",
    category: "Makeup",
    price: 42.99,
    rating: 4.6,
    image: "/product-4.jpg",
    description: "Long-wearing matte foundation with buildable coverage",
    details:
      "Lightweight yet full-coverage foundation that stays matte all day. Available in 40 shades for all skin tones.",
    ingredients: ["Silica", "Vitamin E", "Hyaluronic Acid", "SPF 15"],
    usage: "Apply with brush or sponge for desired coverage.",
  },
  {
    id: 4,
    name: "Matte Velvet Foundation",
    brand: "Glam Cosmetics",
    category: "Makeup",
    price: 42.99,
    rating: 4.6,
    image: "/product-4.jpg",
    description: "Long-wearing matte foundation with buildable coverage",
    details:
      "Lightweight yet full-coverage foundation that stays matte all day. Available in 40 shades for all skin tones.",
    ingredients: ["Silica", "Vitamin E", "Hyaluronic Acid", "SPF 15"],
    usage: "Apply with brush or sponge for desired coverage.",
  },
  {
    id: 4,
    name: "Matte Velvet Foundation",
    brand: "Glam Cosmetics",
    category: "Makeup",
    price: 42.99,
    rating: 4.6,
    image: "/product-4.jpg",
    description: "Long-wearing matte foundation with buildable coverage",
    details:
      "Lightweight yet full-coverage foundation that stays matte all day. Available in 40 shades for all skin tones.",
    ingredients: ["Silica", "Vitamin E", "Hyaluronic Acid", "SPF 15"],
    usage: "Apply with brush or sponge for desired coverage.",
  },
  {
    id: 4,
    name: "Matte Velvet Foundation",
    brand: "Glam Cosmetics",
    category: "Makeup",
    price: 42.99,
    rating: 4.6,
    image: "/product-4.jpg",
    description: "Long-wearing matte foundation with buildable coverage",
    details:
      "Lightweight yet full-coverage foundation that stays matte all day. Available in 40 shades for all skin tones.",
    ingredients: ["Silica", "Vitamin E", "Hyaluronic Acid", "SPF 15"],
    usage: "Apply with brush or sponge for desired coverage.",
  },
  {
    id: 4,
    name: "Matte Velvet Foundation",
    brand: "Glam Cosmetics",
    category: "Makeup",
    price: 42.99,
    rating: 4.6,
    image: "/product-4.jpg",
    description: "Long-wearing matte foundation with buildable coverage",
    details:
      "Lightweight yet full-coverage foundation that stays matte all day. Available in 40 shades for all skin tones.",
    ingredients: ["Silica", "Vitamin E", "Hyaluronic Acid", "SPF 15"],
    usage: "Apply with brush or sponge for desired coverage.",
  },
  {
    id: 4,
    name: "Matte Velvet Foundation",
    brand: "Glam Cosmetics",
    category: "Makeup",
    price: 42.99,
    rating: 4.6,
    image: "/product-4.jpg",
    description: "Long-wearing matte foundation with buildable coverage",
    details:
      "Lightweight yet full-coverage foundation that stays matte all day. Available in 40 shades for all skin tones.",
    ingredients: ["Silica", "Vitamin E", "Hyaluronic Acid", "SPF 15"],
    usage: "Apply with brush or sponge for desired coverage.",
  },
  {
    id: 4,
    name: "Matte Velvet Foundation",
    brand: "Glam Cosmetics",
    category: "Makeup",
    price: 42.99,
    rating: 4.6,
    image: "/product-4.jpg",
    description: "Long-wearing matte foundation with buildable coverage",
    details:
      "Lightweight yet full-coverage foundation that stays matte all day. Available in 40 shades for all skin tones.",
    ingredients: ["Silica", "Vitamin E", "Hyaluronic Acid", "SPF 15"],
    usage: "Apply with brush or sponge for desired coverage.",
  },
  {
    id: 4,
    name: "Matte Velvet Foundation",
    brand: "Glam Cosmetics",
    category: "Makeup",
    price: 42.99,
    rating: 4.6,
    image: "/product-4.jpg",
    description: "Long-wearing matte foundation with buildable coverage",
    details:
      "Lightweight yet full-coverage foundation that stays matte all day. Available in 40 shades for all skin tones.",
    ingredients: ["Silica", "Vitamin E", "Hyaluronic Acid", "SPF 15"],
    usage: "Apply with brush or sponge for desired coverage.",
  },
  {
    id: 4,
    name: "Matte Velvet Foundation",
    brand: "Glam Cosmetics",
    category: "Makeup",
    price: 42.99,
    rating: 4.6,
    image: "/product-4.jpg",
    description: "Long-wearing matte foundation with buildable coverage",
    details:
      "Lightweight yet full-coverage foundation that stays matte all day. Available in 40 shades for all skin tones.",
    ingredients: ["Silica", "Vitamin E", "Hyaluronic Acid", "SPF 15"],
    usage: "Apply with brush or sponge for desired coverage.",
  },
  {
    id: 4,
    name: "Matte Velvet Foundation",
    brand: "Glam Cosmetics",
    category: "Makeup",
    price: 42.99,
    rating: 4.6,
    image: "/product-4.jpg",
    description: "Long-wearing matte foundation with buildable coverage",
    details:
      "Lightweight yet full-coverage foundation that stays matte all day. Available in 40 shades for all skin tones.",
    ingredients: ["Silica", "Vitamin E", "Hyaluronic Acid", "SPF 15"],
    usage: "Apply with brush or sponge for desired coverage.",
  },
  {
    id: 4,
    name: "Matte Velvet Foundation",
    brand: "Glam Cosmetics",
    category: "Makeup",
    price: 42.99,
    rating: 4.6,
    image: "/product-4.jpg",
    description: "Long-wearing matte foundation with buildable coverage",
    details:
      "Lightweight yet full-coverage foundation that stays matte all day. Available in 40 shades for all skin tones.",
    ingredients: ["Silica", "Vitamin E", "Hyaluronic Acid", "SPF 15"],
    usage: "Apply with brush or sponge for desired coverage.",
  },
  {
    id: 4,
    name: "Matte Velvet Foundation",
    brand: "Glam Cosmetics",
    category: "Makeup",
    price: 42.99,
    rating: 4.6,
    image: "/product-4.jpg",
    description: "Long-wearing matte foundation with buildable coverage",
    details:
      "Lightweight yet full-coverage foundation that stays matte all day. Available in 40 shades for all skin tones.",
    ingredients: ["Silica", "Vitamin E", "Hyaluronic Acid", "SPF 15"],
    usage: "Apply with brush or sponge for desired coverage.",
  },
  {
    id: 4,
    name: "Matte Velvet Foundation",
    brand: "Glam Cosmetics",
    category: "Makeup",
    price: 42.99,
    rating: 4.6,
    image: "/product-4.jpg",
    description: "Long-wearing matte foundation with buildable coverage",
    details:
      "Lightweight yet full-coverage foundation that stays matte all day. Available in 40 shades for all skin tones.",
    ingredients: ["Silica", "Vitamin E", "Hyaluronic Acid", "SPF 15"],
    usage: "Apply with brush or sponge for desired coverage.",
  },
  {
    id: 4,
    name: "Matte Velvet Foundation",
    brand: "Glam Cosmetics",
    category: "Makeup",
    price: 42.99,
    rating: 4.6,
    image: "/product-4.jpg",
    description: "Long-wearing matte foundation with buildable coverage",
    details:
      "Lightweight yet full-coverage foundation that stays matte all day. Available in 40 shades for all skin tones.",
    ingredients: ["Silica", "Vitamin E", "Hyaluronic Acid", "SPF 15"],
    usage: "Apply with brush or sponge for desired coverage.",
  },
  {
    id: 4,
    name: "Matte Velvet Foundation",
    brand: "Glam Cosmetics",
    category: "Makeup",
    price: 42.99,
    rating: 4.6,
    image: "/product-4.jpg",
    description: "Long-wearing matte foundation with buildable coverage",
    details:
      "Lightweight yet full-coverage foundation that stays matte all day. Available in 40 shades for all skin tones.",
    ingredients: ["Silica", "Vitamin E", "Hyaluronic Acid", "SPF 15"],
    usage: "Apply with brush or sponge for desired coverage.",
  },
  {
    id: 4,
    name: "Matte Velvet Foundation",
    brand: "Glam Cosmetics",
    category: "Makeup",
    price: 42.99,
    rating: 4.6,
    image: "/product-4.jpg",
    description: "Long-wearing matte foundation with buildable coverage",
    details:
      "Lightweight yet full-coverage foundation that stays matte all day. Available in 40 shades for all skin tones.",
    ingredients: ["Silica", "Vitamin E", "Hyaluronic Acid", "SPF 15"],
    usage: "Apply with brush or sponge for desired coverage.",
  },
  {
    id: 4,
    name: "Matte Velvet Foundation",
    brand: "Glam Cosmetics",
    category: "Makeup",
    price: 42.99,
    rating: 4.6,
    image: "/product-4.jpg",
    description: "Long-wearing matte foundation with buildable coverage",
    details:
      "Lightweight yet full-coverage foundation that stays matte all day. Available in 40 shades for all skin tones.",
    ingredients: ["Silica", "Vitamin E", "Hyaluronic Acid", "SPF 15"],
    usage: "Apply with brush or sponge for desired coverage.",
  },
  {
    id: 4,
    name: "Matte Velvet Foundation",
    brand: "Glam Cosmetics",
    category: "Makeup",
    price: 42.99,
    rating: 4.6,
    image: "/product-4.jpg",
    description: "Long-wearing matte foundation with buildable coverage",
    details:
      "Lightweight yet full-coverage foundation that stays matte all day. Available in 40 shades for all skin tones.",
    ingredients: ["Silica", "Vitamin E", "Hyaluronic Acid", "SPF 15"],
    usage: "Apply with brush or sponge for desired coverage.",
  },
  {
    id: 5,
    name: "Rose Quartz Facial Roller",
    brand: "Crystal Beauty",
    category: "Tools",
    price: 29.99,
    rating: 4.7,
    image: "/product-5.jpg",
    description: "Genuine rose quartz facial massage tool",
    details:
      "100% authentic rose quartz roller that helps reduce puffiness and promote lymphatic drainage. Perfect for morning skincare routine.",
    ingredients: ["Genuine Rose Quartz"],
    usage:
      "Use gentle rolling motions on clean skin or over skincare products.",
  },
];

// Generate additional products
const additionalProducts = Array.from({ length: 45 }, (_, index) => {
  const templates = [
    {
      name: "Collagen Peptide Serum",
      brand: "Glow Labs",
      category: "Skincare",
      basePrice: 54.99,
      description: "Anti-aging serum with marine collagen",
    },
    {
      name: "Retinol Night Cream",
      brand: "Pure Beauty",
      category: "Skincare",
      basePrice: 48.99,
      description: "Advanced retinol formula for overnight renewal",
    },
    {
      name: "Biotin Hair Growth Shampoo",
      brand: "Hair Luxe",
      category: "Haircare",
      basePrice: 32.99,
      description: "Strengthening shampoo for hair growth",
    },
    {
      name: "Mineral Setting Powder",
      brand: "Glam Cosmetics",
      category: "Makeup",
      basePrice: 36.99,
      description: "Translucent setting powder for all skin tones",
    },
    {
      name: "Essential Oil Diffuser",
      brand: "Crystal Beauty",
      category: "Tools",
      basePrice: 45.99,
      description: "Ultrasonic aromatherapy diffuser",
    },
  ];

  const template = templates[index % templates.length];
  const variant = Math.floor(index / templates.length) + 2;

  return {
    id: index + 6,
    name: `${template.name} ${variant}`,
    brand: template.brand,
    category: template.category,
    price: Math.round((template.basePrice + variant * 2) * 100) / 100,
    rating: (4 + Math.random()).toFixed(1),
    image: `/product-${(index % 8) + 1}.jpg`,
    description: template.description,
    details: `Professional-grade ${template.description.toLowerCase()} with advanced formula for optimal results. Enhanced with natural extracts and vitamins.`,
    ingredients: [
      "Premium Extract",
      "Vitamin Complex",
      "Natural Oils",
      "Botanical Extracts",
    ],
    usage:
      "Follow package instructions for best results. Suitable for daily use.",
  };
});

// Combine initial and additional products
// const productData = [...initialProducts, ...additionalProducts];

const ProductDetails = ({ product, onBack }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("100ml");
  const [addingToCart, setAddingToCart] = useState(false);

  const handleAddToCart = () => {
    if (!product) return;

    setAddingToCart(true);
    try {
      addToCart(product, quantity, selectedSize);
    } finally {
      setAddingToCart(false);
    }
  };

  // Ensure product exists
  if (!product) return null;

  // Define sizes array
  const sizes = ["50ml", "100ml", "200ml"];

  // Define value content array
  const valueContent = [
    {
      title: "Natural Ingredients",
      description:
        "100% pure and natural ingredients sourced from sustainable suppliers",
      icon: <Leaf className="w-8 h-8 mx-auto text-purple-600" />,
    },
    {
      title: "Expert Formulation",
      description:
        "Developed by aromatherapy experts for maximum therapeutic benefits",
      icon: <Award className="w-8 h-8 mx-auto text-purple-600" />,
    },
    {
      title: "Quality Tested",
      description:
        "Rigorous quality testing ensures product safety and efficacy",
      icon: <CheckCircle className="w-8 h-8 mx-auto text-purple-600" />,
    },
  ];

  // Define related products
  const relatedProducts = [
    {
      id: 1,
      name: "Related Oil 1",
      price: 29.99,
      rating: 4.5,
      image: "/oil-1.jpg",
    },
    {
      id: 2,
      name: "Related Oil 2",
      price: 34.99,
      rating: 4.3,
      image: "/oil-2.jpg",
    },
    {
      id: 3,
      name: "Related Oil 3",
      price: 24.99,
      rating: 4.7,
      image: "/oil-3.jpg",
    },
    {
      id: 4,
      name: "Related Oil 4",
      price: 39.99,
      rating: 4.4,
      image: "/oil-4.jpg",
    },
  ];

  // Handle payment
  // In the ProductDetails component, update the handlePayNow function:
  const handlePayNow = () => {
    // Create an order object with all necessary product details
    const orderData = {
      id: product.id,
      name: product.name,
      brand: product.brand,
      price: product.price,
      image: product.image,
      quantity: quantity,
      size: selectedSize,
      totalPrice: product.price * quantity,
    };

    // Store the order data in localStorage
    localStorage.setItem("checkoutData", JSON.stringify(orderData));

    // Create URL with query parameters
    const queryParams = new URLSearchParams({
      productId: product.id,
      quantity: quantity,
      size: selectedSize,
    }).toString();

    // Use Next.js router to navigate to checkout page
    window.location.href = `/checkout?${queryParams}`;
  };

  return (
    <div className="max-w-[1440px] mx-auto px-6 md:px-8 lg:px-12 xl:px-24 py-12">
      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-purple-600 mb-8 hover:text-purple-700"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Catalog
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Left Column - Image Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-square rounded-lg overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((_, index) => (
              <div
                key={index}
                className="relative aspect-square rounded-lg overflow-hidden cursor-pointer"
              >
                <Image
                  src={product.image}
                  alt={`${product.name} view ${index + 1}`}
                  fill
                  className="object-cover hover:opacity-75 transition-opacity"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - Product Info */}
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <div className="flex items-center gap-4">
              <span className="text-2xl font-bold text-purple-600">
                ${product.price}
              </span>
              <div className="flex items-center">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="ml-1">{product.rating}</span>
              </div>
            </div>
          </div>

          {/* Product Options */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Size</label>
              <div className="flex gap-4">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded-lg ${
                      selectedSize === size
                        ? "border-purple-600 bg-purple-50 text-purple-600"
                        : "hover:border-purple-600"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Quantity</label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 border rounded-lg hover:border-purple-600"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 border rounded-lg hover:border-purple-600"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={handlePayNow}
              className="flex-1 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Pay Now
            </button>
            <button
              onClick={handleAddToCart}
              disabled={addingToCart}
              className="flex-1 py-3 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {addingToCart ? "Adding..." : "Add to Cart"}
            </button>
          </div>


          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-2">Description</h2>
              <p className="text-gray-600">{product.details}</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
              <ul className="list-disc list-inside text-gray-600">
                {product.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">How to Use</h2>
              <p className="text-gray-600">{product.usage}</p>
            </div>
          </div>

          {/* Value Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {valueContent.map((item, index) => (
              <div key={index} className="text-center p-4 border rounded-lg">
                <div className="mb-2">{item.icon}</div>
                <h3 className="font-semibold mb-1">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-24">
        <h2 className="text-2xl font-bold mb-8">
          More Products You Might Like
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {relatedProducts.map((relatedProduct) => (
            <div key={relatedProduct.id} className="group cursor-pointer">
              <div className="relative aspect-square rounded-lg overflow-hidden mb-4">
                <Image
                  src={relatedProduct.image}
                  alt={relatedProduct.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="font-semibold mb-2">{relatedProduct.name}</h3>
              <div className="flex items-center justify-between">
                <span className="text-purple-600 font-bold">
                  ${relatedProduct.price}
                </span>
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="ml-1 text-sm">{relatedProduct.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recently Viewed */}
      <div className="mt-24">
        <h2 className="text-2xl font-bold mb-8">Recently Viewed</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {relatedProducts.slice(0, 4).map((relatedProduct) => (
            <div key={relatedProduct.id} className="group cursor-pointer">
              <div className="relative aspect-square rounded-lg overflow-hidden mb-4">
                <Image
                  src={relatedProduct.image}
                  alt={relatedProduct.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="font-semibold mb-2">{relatedProduct.name}</h3>
              <div className="flex items-center justify-between">
                <span className="text-purple-600 font-bold">
                  ${relatedProduct.price}
                </span>
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="ml-1 text-sm">{relatedProduct.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
const CatalogPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get("productId");

  // Initialize all state variables
  const [products, setProducts] = useState(productData);
  const [filteredProducts, setFilteredProducts] = useState(productData);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    category: "all",
    priceRange: "all",
    brand: "all",
    sortBy: "newest",
  });

  // Pagination settings
  const productsPerPage = 12;
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Filter handlers
  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...filters, [filterType]: value };
    setFilters(newFilters);
    applyFilters(newFilters);
    setCurrentPage(1);
  };

  const applyFilters = (currentFilters) => {
    let result = [...products];

    // Category filter
    if (currentFilters.category !== "all") {
      result = result.filter(
        (product) => product.category === currentFilters.category
      );
    }

    // Price range filter
    if (currentFilters.priceRange !== "all") {
      const [min, max] = currentFilters.priceRange.split("-").map(Number);
      result = result.filter(
        (product) => product.price >= min && product.price <= max
      );
    }

    // Brand filter
    if (currentFilters.brand !== "all") {
      result = result.filter(
        (product) => product.brand === currentFilters.brand
      );
    }

    // Sorting
    switch (currentFilters.sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // 'newest' - keep original order
        break;
    }

    setFilteredProducts(result);
  };

  // Get current page products
  const getCurrentProducts = () => {
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    return filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  };

  // Pagination handler
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handle product click
  const handleProductClick = (productId) => {
    router.push(`/catalog?productId=${productId}`);
  };

  // Handle back button
  const handleBack = () => {
    router.push("/catalog");
  };

  // Find selected product
  const selectedProduct = productId
    ? products.find((p) => p.id === parseInt(productId))
    : null;

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {selectedProduct ? (
          <ProductDetails product={selectedProduct} onBack={handleBack} />
        ) : (
          <div className="max-w-[1440px] mx-auto px-6 md:px-8 lg:px-12 xl:px-24 py-12">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-4">Our Products</h1>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* Filter Section */}
                <div className="flex flex-wrap gap-4">
                  {/* Category Filter */}
                  <select
                    className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={filters.category}
                    onChange={(e) =>
                      handleFilterChange("category", e.target.value)
                    }
                  >
                    <option value="all">All Categories</option>
                    <option value="Skincare">Skincare</option>
                    <option value="Haircare">Haircare</option>
                    <option value="Makeup">Makeup</option>
                    <option value="Tools">Tools</option>
                    <option value="Fragrances">Fragrances</option>
                  </select>

                  {/* Price Range Filter */}
                  <select
                    className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={filters.priceRange}
                    onChange={(e) =>
                      handleFilterChange("priceRange", e.target.value)
                    }
                  >
                    <option value="all">All Prices</option>
                    <option value="0-25">Under $25</option>
                    <option value="25-50">$25 - $50</option>
                    <option value="50-100">$50 - $100</option>
                    <option value="100-1000">Over $100</option>
                  </select>

                  {/* Brand Filter */}
                  <select
                    className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={filters.brand}
                    onChange={(e) =>
                      handleFilterChange("brand", e.target.value)
                    }
                  >
                    <option value="all">All Brands</option>
                    <option value="Brand 1">Brand 1</option>
                    <option value="Brand 2">Brand 2</option>
                    <option value="Brand 3">Brand 3</option>
                    <option value="Brand 4">Brand 4</option>
                    <option value="Brand 5">Brand 5</option>
                  </select>
                </div>

                {/* Sort By */}
                <select
                  className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={filters.sortBy}
                  onChange={(e) => handleFilterChange("sortBy", e.target.value)}
                >
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Best Rating</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {getCurrentProducts().map((product) => (
                <div
                  key={product.id}
                  onClick={() => handleProductClick(product.id)}
                  className="cursor-pointer"
                >
                  <div className="group border rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <div className="relative h-64 bg-gray-100">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold mb-2">
                        {product.name}
                      </h3>
                      <p className="text-gray-600 mb-2">{product.brand}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-purple-600">
                          ${product.price}
                        </span>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="ml-1">{product.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-12 flex flex-col items-center gap-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter((pageNum) => {
                    if (totalPages <= 7) return true;
                    if (pageNum === 1 || pageNum === totalPages) return true;
                    if (
                      pageNum >= currentPage - 2 &&
                      pageNum <= currentPage + 2
                    )
                      return true;
                    return false;
                  })
                  .map((pageNum, index, array) => {
                    if (index > 0 && pageNum - array[index - 1] > 1) {
                      return (
                        <React.Fragment key={`ellipsis-${pageNum}`}>
                          <span className="px-2">...</span>
                          <button
                            onClick={() => handlePageChange(pageNum)}
                            className={`w-10 h-10 rounded-lg border ${
                              currentPage === pageNum
                                ? "bg-purple-600 text-white"
                                : "hover:bg-gray-100"
                            }`}
                          >
                            {pageNum}
                          </button>
                        </React.Fragment>
                      );
                    }
                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`w-10 h-10 rounded-lg border ${
                          currentPage === pageNum
                            ? "bg-purple-600 text-white"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg border hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Results count */}
              <div className="text-gray-600">
                Showing {(currentPage - 1) * productsPerPage + 1} to{" "}
                {Math.min(
                  currentPage * productsPerPage,
                  filteredProducts.length
                )}{" "}
                of {filteredProducts.length} products
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
};

export default CatalogPage;
