
import React from 'react';
import { Link } from 'react-router-dom';
import { productCategories } from '@/data/products';
import { ArrowRight } from 'lucide-react';

const CategorySection = () => {
  // Map of category IDs to image URLs
  const categoryImages = {
    'cookware': 'https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'appliances': 'https://images.unsplash.com/photo-1574269906084-f80fad427989?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'storage': 'https://images.unsplash.com/photo-1520981825232-ece5fae45120?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'dining': 'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'decor': 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'cleaning': 'https://images.unsplash.com/photo-1563453392212-326f5e854473?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  };
  
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
                  src={categoryImages[category.id] || 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'}
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
