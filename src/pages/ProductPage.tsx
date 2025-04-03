
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { getProductById, getRelatedProducts, Product } from '@/data/products';
import { Minus, Plus, Star, Heart, Share2, ShoppingCart, Truck, RefreshCw, ShieldCheck } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';

const ProductPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const product = getProductById(productId || '');
  const { addToCart } = useCart();
  
  const [selectedVariant, setSelectedVariant] = useState(
    product?.variants[0].id || ''
  );
  const [quantity, setQuantity] = useState(1);
  
  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="mb-8">Sorry, the product you are looking for does not exist.</p>
          <Link to="/shop">
            <Button className="bg-cozy-sage hover:bg-cozy-sage/90">
              Return to Shop
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }
  
  const variantObject = product.variants.find(v => v.id === selectedVariant);
  const relatedProducts = getRelatedProducts(product);
  
  const handleAddToCart = () => {
    addToCart(product, selectedVariant, quantity);
  };
  
  const handleAddToWishlist = () => {
    toast.success("Product added to wishlist!");
  };
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Image Gallery */}
          <div className="lg:w-1/2">
            <div className="sticky top-24 space-y-4">
              {/* Main Image */}
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <img 
                  src={variantObject?.image || product.images[0]} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Thumbnail Gallery */}
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <button 
                    key={index}
                    className="aspect-square bg-gray-100 rounded overflow-hidden border-2 hover:border-cozy-sage"
                  >
                    <img src={image} alt={`${product.name} view ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Product Details */}
          <div className="lg:w-1/2">
            <div className="mb-2 flex items-center">
              <div className="flex items-center text-yellow-400">
                <Star size={18} fill="currentColor" />
                <span className="ml-1 text-cozy-dark">{product.rating}</span>
              </div>
              <span className="text-gray-500 ml-1">({product.reviewCount} reviews)</span>
            </div>
            
            <h1 className="text-3xl font-bold text-cozy-dark mb-2">{product.name}</h1>
            
            <div className="text-lg mb-4">
              {product.salePrice ? (
                <div className="flex items-center">
                  <span className="font-bold text-cozy-terracotta">${product.salePrice.toFixed(2)}</span>
                  <span className="ml-3 text-gray-500 line-through">${product.price.toFixed(2)}</span>
                  <span className="ml-3 bg-cozy-terracotta/10 text-cozy-terracotta px-2 py-1 text-sm rounded">
                    Save ${(product.price - product.salePrice).toFixed(2)}
                  </span>
                </div>
              ) : (
                <span className="font-bold">${product.price.toFixed(2)}</span>
              )}
            </div>
            
            <p className="text-gray-600 mb-6">{product.description}</p>
            
            {/* Variants */}
            {product.variants.length > 1 && (
              <div className="mb-6">
                <h3 className="font-medium mb-2">
                  {product.variants[0].color ? 'Colors' : 
                   product.variants[0].size ? 'Sizes' : 
                   product.variants[0].material ? 'Materials' : 'Options'}:
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((variant) => {
                    const variantLabel = variant.color || variant.size || variant.material;
                    
                    return (
                      <button
                        key={variant.id}
                        onClick={() => setSelectedVariant(variant.id)}
                        className={`border-2 rounded-md px-3 py-1 ${
                          selectedVariant === variant.id 
                            ? 'border-cozy-sage bg-cozy-sage/10' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {variantLabel}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
            
            {/* Quantity Selector */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Quantity:</h3>
              <div className="flex items-center border rounded-md w-32">
                <button 
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="w-10 h-10 flex items-center justify-center border-r"
                  disabled={quantity <= 1}
                >
                  <Minus size={16} />
                </button>
                <div className="flex-grow text-center">
                  <span>{quantity}</span>
                </div>
                <button 
                  onClick={() => setQuantity(q => q + 1)}
                  className="w-10 h-10 flex items-center justify-center border-l"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
            
            {/* Add to Cart Button */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <Button 
                onClick={handleAddToCart}
                className="flex-grow bg-cozy-sage hover:bg-cozy-sage/90 text-white flex items-center justify-center gap-2 py-6"
              >
                <ShoppingCart size={20} />
                Add to Cart
              </Button>
              
              <div className="flex gap-2">
                <Button 
                  onClick={handleAddToWishlist}
                  variant="outline" 
                  className="flex-1 border-cozy-terracotta text-cozy-terracotta hover:bg-cozy-terracotta/10"
                >
                  <Heart size={20} />
                </Button>
                <Button 
                  onClick={handleShare}
                  variant="outline" 
                  className="flex-1"
                >
                  <Share2 size={20} />
                </Button>
              </div>
            </div>
            
            {/* Delivery & Returns */}
            <div className="space-y-3 mb-8">
              <div className="flex items-start gap-3">
                <div className="bg-cozy-sage/10 p-2 rounded-full">
                  <Truck size={18} className="text-cozy-sage" />
                </div>
                <div>
                  <h4 className="font-medium">Free Shipping</h4>
                  <p className="text-sm text-gray-500">On orders over $50. Delivery within 5-7 business days.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-cozy-sage/10 p-2 rounded-full">
                  <RefreshCw size={18} className="text-cozy-sage" />
                </div>
                <div>
                  <h4 className="font-medium">30-Day Returns</h4>
                  <p className="text-sm text-gray-500">Not completely satisfied? Return within 30 days for a full refund.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-cozy-sage/10 p-2 rounded-full">
                  <ShieldCheck size={18} className="text-cozy-sage" />
                </div>
                <div>
                  <h4 className="font-medium">2-Year Warranty</h4>
                  <p className="text-sm text-gray-500">All our products come with a 2-year manufacturer warranty.</p>
                </div>
              </div>
            </div>
            
            {/* Product Tabs */}
            <Tabs defaultValue="details" className="mt-8">
              <TabsList className="w-full grid grid-cols-3">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              <TabsContent value="details" className="pt-4">
                <p>{product.description}</p>
                <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <h4 className="font-medium">Brand</h4>
                    <p className="text-gray-500">{product.brand}</p>
                  </div>
                  <div>
                    <h4 className="font-medium">Category</h4>
                    <p className="text-gray-500">{product.category}</p>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="features" className="pt-4">
                <ul className="list-disc pl-5 space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </TabsContent>
              <TabsContent value="reviews" className="pt-4">
                <div className="flex items-center mb-4">
                  <div className="text-4xl font-bold mr-4">{product.rating}</div>
                  <div>
                    <div className="flex text-yellow-400 mb-1">
                      {[...Array(5)].map((_, index) => (
                        <Star key={index} size={20} fill={index < Math.floor(product.rating) ? 'currentColor' : 'none'} />
                      ))}
                    </div>
                    <p className="text-sm text-gray-500">Based on {product.reviewCount} reviews</p>
                  </div>
                </div>
                <p className="text-gray-500 italic mb-4">
                  Reviews are coming soon. Be the first to review this product!
                </p>
                <Button className="bg-cozy-terracotta hover:bg-cozy-terracotta/90">
                  Write a Review
                </Button>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        
        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-8">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relProduct) => (
                <div key={relProduct.id} className="product-card group">
                  <div className="relative">
                    <Link to={`/product/${relProduct.id}`}>
                      <div className="aspect-square bg-gray-100 overflow-hidden">
                        <img 
                          src={relProduct.images[0]} 
                          alt={relProduct.name} 
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                    </Link>
                    
                    {relProduct.isOnSale && (
                      <div className="absolute top-2 left-2 bg-cozy-terracotta text-white text-xs font-bold px-2 py-1 rounded">
                        SALE
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4">
                    <Link to={`/product/${relProduct.id}`}>
                      <h3 className="font-medium text-cozy-dark mb-1 hover:text-cozy-terracotta transition-colors">
                        {relProduct.name}
                      </h3>
                    </Link>
                    
                    <div className="flex items-center mt-1">
                      {relProduct.salePrice ? (
                        <>
                          <span className="font-bold text-cozy-terracotta">${relProduct.salePrice.toFixed(2)}</span>
                          <span className="ml-2 text-gray-500 line-through text-sm">${relProduct.price.toFixed(2)}</span>
                        </>
                      ) : (
                        <span className="font-bold text-cozy-dark">${relProduct.price.toFixed(2)}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProductPage;
