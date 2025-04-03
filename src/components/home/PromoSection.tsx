
import React from 'react';
import { Link } from 'react-router-dom';
import { Truck, ShieldCheck, RefreshCw, Clock } from 'lucide-react';

const PromoSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="flex items-start p-6 bg-cozy-cream/50 rounded-lg">
            <div className="bg-cozy-sage text-white p-3 rounded-full mr-4">
              <Truck size={24} />
            </div>
            <div>
              <h3 className="font-bold text-cozy-dark mb-1">Free Shipping</h3>
              <p className="text-sm text-gray-600">On all orders over $50</p>
            </div>
          </div>
          
          <div className="flex items-start p-6 bg-cozy-cream/50 rounded-lg">
            <div className="bg-cozy-sage text-white p-3 rounded-full mr-4">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h3 className="font-bold text-cozy-dark mb-1">2-Year Warranty</h3>
              <p className="text-sm text-gray-600">On all our products</p>
            </div>
          </div>
          
          <div className="flex items-start p-6 bg-cozy-cream/50 rounded-lg">
            <div className="bg-cozy-sage text-white p-3 rounded-full mr-4">
              <RefreshCw size={24} />
            </div>
            <div>
              <h3 className="font-bold text-cozy-dark mb-1">Easy Returns</h3>
              <p className="text-sm text-gray-600">30-day return policy</p>
            </div>
          </div>
          
          <div className="flex items-start p-6 bg-cozy-cream/50 rounded-lg">
            <div className="bg-cozy-sage text-white p-3 rounded-full mr-4">
              <Clock size={24} />
            </div>
            <div>
              <h3 className="font-bold text-cozy-dark mb-1">24/7 Support</h3>
              <p className="text-sm text-gray-600">Customer service</p>
            </div>
          </div>
        </div>
        
        {/* Promo Banner */}
        <div className="bg-cozy-sage/10 rounded-xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <span className="text-cozy-terracotta font-medium mb-2">Special Collection</span>
              <h2 className="text-3xl md:text-4xl font-bold text-cozy-dark mb-4">
                Refresh Your Kitchen With Our New Arrivals
              </h2>
              <p className="text-gray-600 mb-8 max-w-md">
                Discover our latest kitchen essentials designed to make cooking easier and more enjoyable. From premium cookware to innovative gadgets.
              </p>
              <div>
                <Link 
                  to="/shop?category=cookware" 
                  className="bg-cozy-terracotta hover:bg-cozy-terracotta/90 text-white px-6 py-3 rounded-md inline-block transition duration-200"
                >
                  Explore Collection
                </Link>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                alt="Kitchen essentials collection" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoSection;
