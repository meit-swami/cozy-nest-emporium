
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative bg-cozy-beige">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-cozy-dark mb-4">
              Make Your Home <span className="text-cozy-terracotta">Cozy & Stylish</span>
            </h1>
            <p className="text-lg md:text-xl mb-8 text-cozy-dark/80 max-w-lg">
              Discover our premium collection of home and kitchen essentials designed to bring comfort and style to your everyday life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button className="bg-cozy-terracotta hover:bg-cozy-terracotta/90 text-white px-8 py-6">
                Shop Now
              </Button>
              <Button variant="outline" className="border-cozy-sage text-cozy-sage hover:bg-cozy-sage/10 px-8 py-6">
                Explore Collections
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square md:aspect-[4/3] bg-cozy-sage/20 rounded-2xl overflow-hidden">
              <img
                src="/placeholder.svg"
                alt="Modern kitchen with CozyNest products"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-xl shadow-lg hidden md:block">
              <p className="font-bold text-cozy-terracotta mb-1">Summer Sale</p>
              <p className="text-3xl font-bold text-cozy-dark">Up to 40% Off</p>
              <Link to="/shop?sale=true" className="flex items-center mt-2 text-cozy-sage font-medium">
                Shop the sale <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
