
import React from 'react';
import { Link } from 'react-router-dom';
import { getDiscountedProducts, Product } from '@/data/products';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { Star, ShoppingCart, Heart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

const DiscountProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  
  const handleAddToCart = () => {
    // Default to first variant
    const firstVariant = product.variants[0].id;
    addToCart(product, firstVariant, 1);
  };
  
  // Calculate discount percentage
  const discountPercentage = product.salePrice
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : 0;
  
  // Use the first image from product or a placeholder
  const productImage = product.images[0] && product.images[0] !== '/placeholder.svg' 
    ? product.images[0] 
    : `https://images.unsplash.com/photo-${1500000000000 + parseInt(product.id.replace(/\D/g, ''), 10) % 1000000000}?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80`;
  
  return (
    <div className="product-card group">
      <div className="relative">
        <Link to={`/product/${product.id}`}>
          <div className="aspect-square bg-gray-100 overflow-hidden">
            <img 
              src={productImage} 
              alt={product.name} 
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80";
              }}
            />
          </div>
        </Link>
        
        <div className="absolute top-2 left-2 bg-cozy-terracotta text-white text-xs font-bold px-2 py-1 rounded">
          {discountPercentage}% OFF
        </div>
        
        <button 
          className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
          aria-label="Add to wishlist"
        >
          <Heart size={18} className="text-cozy-dark" />
        </button>
        
        <div className="absolute bottom-0 left-0 right-0 bg-white p-2 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <Button 
            onClick={handleAddToCart}
            className="w-full bg-cozy-sage hover:bg-cozy-sage/90 text-white flex items-center justify-center gap-2"
            size="sm"
          >
            <ShoppingCart size={16} />
            Add to Cart
          </Button>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center mb-1">
          <div className="flex items-center text-yellow-400">
            <Star size={14} fill="currentColor" />
            <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
          </div>
          <span className="text-xs text-gray-500 ml-1">({product.reviewCount})</span>
          <span className="ml-auto text-sm font-medium text-gray-500">{product.brand}</span>
        </div>
        
        <Link to={`/product/${product.id}`}>
          <h3 className="font-medium text-cozy-dark mb-1 hover:text-cozy-terracotta transition-colors">
            {product.name}
          </h3>
        </Link>
        
        <div className="flex items-center mt-1">
          {product.salePrice && (
            <>
              <span className="font-bold text-cozy-terracotta">${product.salePrice.toFixed(2)}</span>
              <span className="ml-2 text-gray-500 line-through text-sm">${product.price.toFixed(2)}</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const DiscountSection = () => {
  const discountedProducts = getDiscountedProducts(3);
  
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
          <h2 className="section-title">Special Offers</h2>
          <Link to="/shop?sale=true" className="text-cozy-terracotta hover:text-cozy-terracotta/80 font-medium flex items-center mt-4 md:mt-0">
            View All Deals
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {discountedProducts.map((product) => (
            <DiscountProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default DiscountSection;
