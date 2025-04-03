
import React from 'react';
import { Link } from 'react-router-dom';
import { productCategories } from '@/data/products';
import { ArrowRight } from 'lucide-react';

const CategorySection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-center mx-auto">Shop By Category</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {productCategories.map((category) => (
            <Link
              key={category.id}
              to={`/shop?category=${category.id}`}
              className="group product-card overflow-hidden transition-all duration-300 hover:-translate-y-1"
            >
              <div className="aspect-[3/2] bg-cozy-cream relative overflow-hidden">
                <img
                  src="/placeholder.svg"
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-white text-xl font-bold mb-2">{category.name}</h3>
                  <div className="flex items-center text-white/90 text-sm font-medium transition-transform duration-300 transform group-hover:translate-x-1">
                    <span>Shop Now</span>
                    <ArrowRight size={16} className="ml-1" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
