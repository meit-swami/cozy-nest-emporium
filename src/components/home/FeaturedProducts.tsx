import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react'; // Make sure to import ArrowRight
import { useCart } from '@/context/CartContext';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';

const FeaturedProducts = () => {
  const products = [
    {
      id: 1,
      name: 'Cozy Knit Blanket',
      imageUrl: 'https://source.unsplash.com/300x200/?blanket',
      price: 49.99,
    },
    {
      id: 2,
      name: 'Soft Throw Pillow',
      imageUrl: 'https://source.unsplash.com/300x200/?pillow',
      price: 24.99,
    },
    {
      id: 3,
      name: 'Comfortable Bed Sheets',
      imageUrl: 'https://source.unsplash.com/300x200/?bedsheets',
      price: 79.99,
    },
  ];

  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    addToCart(product);
    toast({
      title: "Added to cart!",
      description: `${product.name} added to your cart.`,
    })
  };

  return (
    <section className="py-12 bg-cozy-cream">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-cozy-dark mb-2">{product.name}</h3>
                <p className="text-cozy-dark">${product.price.toFixed(2)}</p>
                <Button className="mt-4 w-full" onClick={() => handleAddToCart(product)}>
                  Add to Cart
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-6">
          <Link to="/shop" className="text-cozy-terracotta hover:underline flex items-center justify-center gap-2">
            View All Products
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
