"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  ShoppingCart,
  ArrowRight,
  Heart,
  Award,
  Shield,
  CheckCircle,
  Users,
  Percent,
  Package,
  RefreshCw,
  TrendingUp,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
   // Initialize all state variables first
   const [currentBanner, setCurrentBanner] = useState(0);
   const [currentProduct, setCurrentProduct] = useState(0);
   const [currentTestimonial, setCurrentTestimonial] = useState(0);
   const [isMobile, setIsMobile] = useState(true); // Default to mobile to prevent layout shift
   const [displayCount, setDisplayCount] = useState({
     products: 1,
     testimonials: 1
   });
  const mainContentClass = "max-w-[1440px] mx-auto px-16"; // This creates a max-width container with 64px padding on each side

  // Update the banners data structure first
const banners = [
  {
    id: 1,
    title: "LUXURY BODY CARE",
    subtitle: "SAVE 30% TODAY",
    description: "Premium Body Lotions for Professional Care",
    cta: "Shop Now",
    image: "https://thethingswellmake.com/wp-content/uploads/2019/11/241-how-to-make-a-simple-basic-homemade-lotion-and-customize-it-for-your-skin-type-4-2.jpg",
    textColor: "text-white"
  },
  {
    id: 2,
    title: "PROFESSIONAL GRADE",
    subtitle: "NEW COLLECTION",
    description: "Discover Our Range of Body Treatment Products",
    cta: "Explore More",
    image: "https://5.imimg.com/data5/SELLER/Default/2023/9/341105361/VW/HK/HH/157670502/body-lotion-for-dry-skin-500x500.jpg",
    textColor: "text-white"
  },
  {
    id: 3,
    title: "EXCLUSIVE OFFER",
    subtitle: "LIMITED TIME",
    description: "Professional Body Care Solutions",
    cta: "Shop Collection",
    image: "https://images.meesho.com/images/products/452073496/9jhlf_512.webp",
    textColor: "text-white"
  }
];
  
  // Products data
  const products = [
    {
      id: 1,
      name: "Ultra-Hydrating Body Lotion",
      price: 39.99,
      image:
        "https://itapelobeautystore.com/cdn/shop/files/5D499C30-FC21-4850-9BE0-2EC63925F641.png?v=1710525464&width=360",
      rating: 4.8,
      reviews: 128,
      badge: "Best Seller",
    },
    {
      id: 2,
      name: "Organic Shea Butter Cream",
      price: 45.99,
      image:
        "https://itapelobeautystore.com/cdn/shop/files/446E064E-3637-4066-AA92-EDB9AA114F85.png?v=1710525432&width=360",
      rating: 4.9,
      reviews: 95,
      badge: "New",
    },
    {
      id: 3,
      name: "Professional Massage Lotion",
      price: 59.99,
      image:
        "https://itapelobeautystore.com/cdn/shop/files/6330439C-E44F-403F-ABF3-3E4A4A710D2C.png?v=1710527650&width=360",
      rating: 4.7,
      reviews: 203,
    },
    {
      id: 4,
      name: "Vitamin E Body Treatment",
      price: 49.99,
      image:
        "https://itapelobeautystore.com/cdn/shop/files/Black_WhiteMinimalistAestheticInitialsFontLogo.jpg?v=1716510954&width=360",
      rating: 4.6,
      reviews: 167,
      badge: "Limited Edition",
    },
    {
      id: 5,
      name: "Coconut Milk Body Cream",
      price: 42.99,
      image:
        "https://itapelobeautystore.com/cdn/shop/files/Caro-White-Body-Lotion---300ml.png?v=1710026788&width=360",
      rating: 4.8,
      reviews: 145,
    },
    {
      id: 6,
      name: "Lavender Dreams Lotion",
      price: 38.99,
      image:"https://itapelobeautystore.com/cdn/shop/files/IMG_7870.jpg?v=1716521552&width=360",
      rating: 4.7,
      reviews: 178,
    },
  ];

  const trendingItems = [
    {
      id: 1,
      title: "Big Bottle Sale",
      image:
        "https://itapelobeautystore.com/cdn/shop/files/IMG_7902.jpg?v=1716526693&width=360",
    },
    {
      id: 2,
      title: "New & Now",
      image:
        "https://itapelobeautystore.com/cdn/shop/files/IMG_7899.jpg?v=1716526001&width=360",
    },
    {
      id: 3,
      title: "Last Chance",
      image:
        "https://itapelobeautystore.com/cdn/shop/files/IMG_7895.png?v=1716525572&width=360",
    },
    {
      id: 4,
      title: "Register Now",
      image:
        "https://itapelobeautystore.com/cdn/shop/files/IMG_7891.jpg?v=1716525242&width=360",
      badge: "COMING SOON 3/24/25",
    },
    {
      id: 5,
      title: "Styling Tools",
      image:
        "https://itapelobeautystore.com/cdn/shop/files/IMG_7890.jpg?v=1716525091&width=360",
    },
    {
      id: 6,
      title: "Shopping Guide",
      image:
        "https://itapelobeautystore.com/cdn/shop/files/IMG_7893.png?v=1716525434&width=360",
    },
  ];

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Licensed Esthetician",
      location: "New York, NY",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
      quote:
        "The professional body care products have transformed my spa treatments. My clients love the results!",
      rating: 5,
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Spa Owner",
      location: "Los Angeles, CA",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
      quote:
        "Superior quality body lotions that meet our high standards. The organic options are particularly popular.",
      rating: 5,
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      role: "Massage Therapist",
      location: "Miami, FL",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
      quote:
        "These professional-grade body lotions provide the perfect consistency for treatments.",
      rating: 5,
    },
    {
      id: 4,
      name: "Lisa Thompson",
      role: "Beauty Influencer",
      location: "Chicago, IL",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      quote:
        "I've tried countless body lotions, but these are truly exceptional. My followers love my recommendations!",
      rating: 5,
    },
    {
      id: 5,
      name: "David Wilson",
      role: "Dermatologist",
      location: "Houston, TX",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a",
      quote:
        "I recommend these products to my patients. The results speak for themselves.",
      rating: 5,
    },
    {
      id: 6,
      name: "Jennifer Lee",
      role: "Wellness Coach",
      location: "Seattle, WA",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2",
      quote:
        "The perfect blend of luxury and effectiveness. My clients see amazing results.",
      rating: 5,
    },
  ];


// Handle resize effect
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      
      // Set product display count
      if (width < 640) {
        setDisplayCount(prev => ({ ...prev, products: 1 })); // Mobile
      } else if (width < 768) {
        setDisplayCount(prev => ({ ...prev, products: 2 })); // Small tablet
      } else if (width < 1024) {
        setDisplayCount(prev => ({ ...prev, products: 3 })); // Large tablet
      } else {
        setDisplayCount(prev => ({ ...prev, products: 4 })); // Desktop
      }

      // Set testimonial display count
      if (width < 768) {
        setDisplayCount(prev => ({ ...prev, testimonials: 1 })); // Mobile
      } else if (width < 1024) {
        setDisplayCount(prev => ({ ...prev, testimonials: 2 })); // Tablet
      } else {
        setDisplayCount(prev => ({ ...prev, testimonials: 3 })); // Desktop
      }
    };

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-scroll effect
  useEffect(() => {
    const intervals = {
      banner: setInterval(() => {
        setCurrentBanner(prev => (prev === banners.length - 1 ? 0 : prev + 1));
      }, 6000),
      product: setInterval(() => {
        setCurrentProduct(prev => (prev === products.length - displayCount.products ? 0 : prev + 1));
      }, 4000),
      testimonial: setInterval(() => {
        setCurrentTestimonial(prev => (prev === testimonials.length - displayCount.testimonials ? 0 : prev + 1));
      }, 5000)
    };

    return () => {
      Object.values(intervals).forEach(clearInterval);
    };
  }, [displayCount]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <section className="relative h-[600px] md:h-[700px] lg:h-[800px] overflow-hidden">
  {/* Carousel Controls */}
  <div className="absolute inset-0 flex items-center justify-between z-20 px-4">
    <button 
      onClick={() => setCurrentBanner(current => current === 0 ? banners.length - 1 : current - 1)}
      className="p-2 rounded-full bg-black/30 hover:bg-black/50 text-white transition-all duration-200"
    >
      <ChevronLeft className="w-6 h-6" />
    </button>
    <button 
      onClick={() => setCurrentBanner(current => current === banners.length - 1 ? 0 : current + 1)}
      className="p-2 rounded-full bg-black/30 hover:bg-black/50 text-white transition-all duration-200"
    >
      <ChevronRight className="w-6 h-6" />
    </button>
  </div>

  {/* Carousel Slides */}
  {banners.map((banner, index) => (
    <div
      key={banner.id}
      className={`absolute inset-0 transition-opacity duration-1000 ease-in-out
        ${currentBanner === index ? 'opacity-100' : 'opacity-0'}`}
    >
      {/* Background Image with Overlay */}
      <div className="relative w-full h-full">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/60 z-10" />
        <img
          src={banner.image}
          alt={banner.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <div className="text-center px-4 max-w-4xl mx-auto">
          <h1 className={`text-4xl md:text-6xl lg:text-7xl font-bold mb-4 ${banner.textColor} tracking-wider transition-all duration-300 transform`}>
            {banner.title}
          </h1>
          <p className={`text-3xl md:text-5xl lg:text-6xl font-light mb-6 ${banner.textColor} tracking-wide transition-all duration-300 transform`}>
            {banner.subtitle}
          </p>
          <p className={`text-lg md:text-xl lg:text-2xl mb-8 ${banner.textColor} max-w-2xl mx-auto transition-all duration-300 transform`}>
            {banner.description}
          </p>
          <button className="bg-white text-black px-8 py-3 text-lg md:text-xl rounded-none hover:bg-black hover:text-white transition-all duration-300 transform hover:scale-105">
            {banner.cta}
          </button>
        </div>
      </div>
    </div>
  ))}

  {/* Carousel Indicators */}
  <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center gap-3">
    {banners.map((_, index) => (
      <button
        key={index}
        onClick={() => setCurrentBanner(index)}
        className={`w-3 h-3 rounded-full transition-all duration-300 
          ${currentBanner === index ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/75'}`}
      />
    ))}
  </div>
</section>



      {/* Product Carousel */}
      <section className="py-16">
      <div className={mainContentClass}>
          <h2 className="text-2xl md:text-4xl font-bold mb-6 md:mb-12 text-center">
            Featured Products
          </h2>
          <div className="relative">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${currentProduct * (100 / displayCount.products)}%)`,
                }}
              >
                {products.map((product) => (
                  <div 
                    key={product.id} 
                    style={{ 
                      minWidth: `${100 / displayCount.products}%` 
                    }}
                    className="px-2 md:px-4"
                  >
                    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                      <div className="relative">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-48 md:h-64 object-cover"
                        />
                        {product.badge && (
                          <div className="absolute top-2 md:top-4 right-2 md:right-4 bg-black text-white px-2 md:px-3 py-1 rounded-full text-xs md:text-sm">
                            {product.badge}
                          </div>
                        )}
                        <button className="absolute bottom-2 md:bottom-4 right-2 md:right-4 p-1.5 md:p-2 bg-white rounded-full shadow-md hover:bg-gray-100">
                          <Heart className="w-4 h-4 md:w-5 md:h-5" />
                        </button>
                      </div>
                      <div className="p-3 md:p-4">
                        <h3 className="text-sm md:text-base font-semibold mb-1 md:mb-2">{product.name}</h3>
                        <div className="flex items-center mb-1 md:mb-2">
                          <div className="flex items-center">
                            <Star className="w-3 h-3 md:w-4 md:h-4 text-yellow-400 fill-current" />
                            <span className="ml-1 text-xs md:text-sm">
                              {product.rating}
                            </span>
                          </div>
                          <span className="text-xs md:text-sm text-gray-500 ml-2">
                            ({product.reviews} reviews)
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-base md:text-lg font-bold">
                            ${product.price}
                          </span>
                          <button className="bg-black text-white p-1.5 md:p-2 rounded-full hover:bg-gray-800">
                            <ShoppingCart className="w-4 h-4 md:w-5 md:h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold">Trending Now</h2>
            <p className="text-gray-600 text-sm">
              Get inspired with must-have product and exclusive sales events
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {trendingItems.map((item) => (
              <div key={item.id} className="group cursor-pointer">
                <div className="relative aspect-square overflow-hidden rounded-lg">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {item.badge && (
                    <div className="absolute top-2 right-2 bg-yellow-400 text-xs px-2 py-1 rounded">
                      {item.badge}
                    </div>
                  )}
                </div>
                <h3 className="mt-2 text-sm font-medium text-center">
                  {item.title}
                </h3>
              </div>
            ))}
          </div>

          {/* Bottom Banners */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div className="relative aspect-[16/9] rounded-lg overflow-hidden">
              <img
                src="https://itapelobeautystore.com/cdn/shop/files/IMG_8442.png?v=1717394256&width=360"
                alt="Sharpest Savings"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 z-10">
                <h3 className="text-lg font-bold uppercase tracking-wider text-white drop-shadow-lg">
                  The Sharpest Savings
                </h3>
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-20"></div>
            </div>
            <div className="relative aspect-[16/9] rounded-lg overflow-hidden">
              <img
                src="https://itapelobeautystore.com/cdn/shop/files/IMG_8466.png?v=1717487116&width=360"
                alt="New Year Deals"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 z-10">
                <h3 className="text-lg font-bold uppercase text-white drop-shadow-lg">
                  Ring in the New Year with
                </h3>
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-20"></div>
            </div>
            <div className="relative aspect-[16/9] rounded-lg overflow-hidden">
              <img
                src="https://itapelobeautystore.com/cdn/shop/files/IMG_8471.jpg?v=1717487552&width=360"
                alt="Special Offers"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 z-10">
                <h3 className="text-lg font-bold uppercase text-white drop-shadow-lg">
                  Special Offers
                </h3>
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-20"></div>
            </div>
          </div>

          {/* View More Button */}
          <div className="flex justify-center mt-8">
            <Link href="/catalog">
              <button className="flex bg-black text-white items-center px-6 py-2 border border-gray-300 rounded-md transition-colors group">
                <span>View More</span>
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </Link>
          </div>
        </div>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
      <div className={mainContentClass}>
          <h2 className="text-2xl md:text-4xl font-bold mb-6 md:mb-12 text-center">
            What Our Customers Say
          </h2>
          <div className="relative">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${currentTestimonial * (100 / displayCount.testimonials)}%)`,
                }}
              >
                {testimonials.map((testimonial) => (
                  <div 
                    key={testimonial.id} 
                    style={{ 
                      minWidth: `${100 / displayCount.testimonials}%` 
                    }}
                    className="px-2 md:px-4"
                  >
                    <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 h-full">
                      <div className="flex items-center mb-3 md:mb-4">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover mr-3 md:mr-4"
                        />
                        <div>
                          <h3 className="text-sm md:text-base font-semibold">{testimonial.name}</h3>
                          <p className="text-xs md:text-sm text-gray-600">
                            {testimonial.role}
                          </p>
                          <p className="text-xs md:text-sm text-gray-500">
                            {testimonial.location}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-4 line-clamp-3">
                        "{testimonial.quote}"
                      </p>
                      <div className="flex items-center">
                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                          <Star
                            key={i}
                            className="w-3 h-3 md:w-4 md:h-4 text-yellow-400 fill-current"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Dots */}
            <div className="flex justify-center mt-4 md:mt-8 space-x-2">
              {[...Array(testimonials.length - displayCount.testimonials + 1)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                    currentTestimonial === index ? "bg-black" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-8 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">
            Why Choose Cosmo Prof
          </h2>
          <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto px-4">
            Experience the difference with our professional beauty solutions
            and unmatched service quality
          </p>
        </div>

        {/* Main Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-8 md:mb-16">
          {/* Feature Card 1 */}
          <div className="text-center p-4 group hover:transform hover:scale-105 transition-all duration-300">
            <div className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 bg-purple-100 rounded-full flex items-center justify-center group-hover:bg-purple-200 transition-colors">
              <Package className="w-6 h-6 md:w-8 md:h-8 text-purple-600" />
            </div>
            <h3 className="text-base md:text-lg font-semibold mb-2">Premium Products</h3>
            <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-4">
              Professional-grade beauty solutions from top brands worldwide
            </p>
            <ul className="text-xs md:text-sm text-gray-500 space-y-1 md:space-y-2">
              <li>• Exclusive professional brands</li>
              <li>• Quality guaranteed products</li>
              <li>• Latest beauty innovations</li>
            </ul>
          </div>

          {/* Feature Card 2 */}
          <div className="text-center p-4 group hover:transform hover:scale-105 transition-all duration-300">
            <div className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors">
              <RefreshCw className="w-6 h-6 md:w-8 md:h-8 text-blue-600" />
            </div>
            <h3 className="text-base md:text-lg font-semibold mb-2">Hassle-Free Returns</h3>
            <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-4">
              Flexible return policy with satisfaction guarantee
            </p>
            <ul className="text-xs md:text-sm text-gray-500 space-y-1 md:space-y-2">
              <li>• 30-day money-back guarantee</li>
              <li>• Free returns on most items</li>
              <li>• Quick refund process</li>
            </ul>
          </div>

          {/* Feature Card 3 */}
          <div className="text-center p-4 group hover:transform hover:scale-105 transition-all duration-300">
            <div className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition-colors">
              <TrendingUp className="w-6 h-6 md:w-8 md:h-8 text-green-600" />
            </div>
            <h3 className="text-base md:text-lg font-semibold mb-2">Expert Support</h3>
            <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-4">
              Professional beauty advice and dedicated assistance
            </p>
            <ul className="text-xs md:text-sm text-gray-500 space-y-1 md:space-y-2">
              <li>• Licensed beauty consultants</li>
              <li>• 24/7 customer service</li>
              <li>• Personalized recommendations</li>
            </ul>
          </div>

          {/* Feature Card 4 */}
          <div className="text-center p-4 group hover:transform hover:scale-105 transition-all duration-300">
            <div className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 bg-pink-100 rounded-full flex items-center justify-center group-hover:bg-pink-200 transition-colors">
              <Award className="w-6 h-6 md:w-8 md:h-8 text-pink-600" />
            </div>
            <h3 className="text-base md:text-lg font-semibold mb-2">Rewards Program</h3>
            <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-4">
              Earn points and exclusive benefits with every purchase
            </p>
            <ul className="text-xs md:text-sm text-gray-500 space-y-1 md:space-y-2">
              <li>• Points on every purchase</li>
              <li>• Member-only discounts</li>
              <li>• Special birthday rewards</li>
            </ul>
          </div>
        </div>

        {/* Additional Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <div className="bg-gray-50 p-6 md:p-8 rounded-2xl">
            <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 flex items-center">
              <Shield className="w-5 h-5 md:w-6 md:h-6 mr-2 text-blue-600" />
              Professional Guarantee
            </h3>
            <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-4">
              We stand behind every product we sell with our professional
              satisfaction guarantee.
            </p>
            <ul className="space-y-2 md:space-y-3">
              <li className="flex items-center text-xs md:text-sm text-gray-600">
                <CheckCircle className="w-4 h-4 md:w-5 md:h-5 mr-2 text-green-500" />
                100% Authentic Products
              </li>
              <li className="flex items-center text-xs md:text-sm text-gray-600">
                <CheckCircle className="w-4 h-4 md:w-5 md:h-5 mr-2 text-green-500" />
                Quality Assurance
              </li>
              <li className="flex items-center text-xs md:text-sm text-gray-600">
                <CheckCircle className="w-4 h-4 md:w-5 md:h-5 mr-2 text-green-500" />
                Professional Grade Standards
              </li>
            </ul>
          </div>

          <div className="bg-gray-50 p-6 md:p-8 rounded-2xl">
            <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 flex items-center">
              <Users className="w-5 h-5 md:w-6 md:h-6 mr-2 text-purple-600" />
              Professional Community
            </h3>
            <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-4">
              Join our community of beauty professionals and stay updated with
              latest trends.
            </p>
            <ul className="space-y-2 md:space-y-3">
              <li className="flex items-center text-xs md:text-sm text-gray-600">
                <CheckCircle className="w-4 h-4 md:w-5 md:h-5 mr-2 text-green-500" />
                Educational Resources
              </li>
              <li className="flex items-center text-xs md:text-sm text-gray-600">
                <CheckCircle className="w-4 h-4 md:w-5 md:h-5 mr-2 text-green-500" />
                Professional Networks
              </li>
              <li className="flex items-center text-xs md:text-sm text-gray-600">
                <CheckCircle className="w-4 h-4 md:w-5 md:h-5 mr-2 text-green-500" />
                Industry Events & Workshops
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
      <Footer />
      
    </div>
  );
}
