import React, { useState, useEffect } from "react";
import { Play, TrendingUp, Star, ChevronRight, Sparkles } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { buttonColor } from "../color/color";
import { featuredContent } from "../../app/data/HeroSection/heroSection";

const HeroSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
 const {isLoggedIn,videos}= useAuth();
   const defaultVideoId = videos[0]?._id

  // Simulated featured content - replace with actual data



  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredContent.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const current = featuredContent[currentSlide];

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 transition-opacity duration-1000">
        <img
          src={current.image}
          alt={current.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 px-6 md:px-12 pt-32 md:pt-40 pb-20 max-w-7xl">
        {/* Trending Badge */}
        {current.trending && (
          <div className="flex items-center gap-2 mb-4 animate-pulse">
            <TrendingUp className="w-5 h-5 text-red-500" />
            <span className="text-red-500 font-bold text-sm uppercase tracking-wider">Trending Now</span>
          </div>
        )}

        {/* Title */}
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 max-w-3xl leading-tight">
          {current.title}
        </h1>

        {/* Meta Information */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center gap-1 bg-yellow-500/20 px-3 py-1 rounded-full">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span className="text-yellow-500 font-bold text-sm">{current.rating}</span>
          </div>
          <span className="text-gray-300 font-semibold">{current.year}</span>
          <span className="text-gray-400">{current.genre}</span>
        </div>

        {/* Description */}
        <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl leading-relaxed">
          {current.description}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-4">
          {isLoggedIn ? (
            <>
              <Link to={`/video/${defaultVideoId}`} className="flex items-center gap-3 px-8 py-4 bg-white text-black rounded-xl font-bold text-lg hover:bg-gray-200 transition-all shadow-2xl transform hover:scale-105">
                <Play className="w-6 h-6 fill-black" />
                Play Now
              </Link>
              <button className="flex items-center gap-3 px-8 py-4 bg-white/20 backdrop-blur-sm text-white rounded-xl font-bold text-lg hover:bg-white/30 transition-all border border-white/30">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                My List
              </button>
              <button className="flex items-center gap-2 px-6 py-4 text-white hover:text-gray-300 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                More Info
              </button>
            </>
          ) : (
            <>
              <Link to="/signup">
                <button style={{background:buttonColor}} className="flex items-center gap-3 px-8 py-4 text-white rounded-xl font-bold text-lg hover:from-red-700 hover:to-purple-700 transition-all shadow-2xl transform hover:scale-105">
                  <Sparkles className="w-6 h-6" />
                  Start Free Trial
                </button>
              </Link>
              <Link to="/login">
                <button className="flex items-center gap-3 px-8 py-4 bg-white/20 backdrop-blur-sm text-white rounded-xl font-bold text-lg hover:bg-white/30 transition-all border border-white/30">
                  Sign In to Watch
                  <ChevronRight className="w-5 h-5" />
                </button>
              </Link>
            </>
          )}
        </div>

        {/* Stats */}
        {!isLoggedIn && (
          <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl">
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">10K+</div>
              <div className="text-gray-400 text-sm">Movies & Series</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">4K</div>
              <div className="text-gray-400 text-sm">Ultra HD Quality</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">50M+</div>
              <div className="text-gray-400 text-sm">Happy Viewers</div>
            </div>
          </div>
        )}
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {featuredContent.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-1 rounded-full transition-all ${
              index === currentSlide ? "w-8 bg-red-600" : "w-6 bg-white/50 hover:bg-white/75"
            }`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 right-8 z-20 animate-bounce">
        <svg className="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </div>
  );
};

export default HeroSection;