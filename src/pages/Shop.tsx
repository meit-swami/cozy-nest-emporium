
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { filterProducts, productCategories, brands, Product } from '@/data/products';
import { Star, ShoppingCart, Heart, SlidersHorizontal, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';

const Shop = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const { addToCart } = useCart();
  
  // Filters state
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    searchParams.get('category') || undefined
  );
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | undefined>(
    searchParams.get('subcategory') || undefined
  );
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [onSale, setOnSale] = useState<boolean>(searchParams.get('sale') === 'true');
  
  // Products and UI state
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Apply filters
  useEffect(() => {
    const products = filterProducts(
      selectedCategory,
      selectedSubCategory,
      selectedBrands.length > 0 ? selectedBrands : undefined,
      priceRange,
      onSale
    );
    setFilteredProducts(products);
    
    // Update URL params
    const params = new URLSearchParams();
    if (selectedCategory) params.set('category', selectedCategory);
    if (selectedSubCategory) params.set('subcategory', selectedSubCategory);
    if (onSale) params.set('sale', 'true');
    
    navigate(`/shop?${params.toString()}`, { replace: true });
  }, [selectedCategory, selectedSubCategory, selectedBrands, priceRange, onSale, navigate]);
  
  // Get subcategories for the selected category
  const subCategories = selectedCategory 
    ? productCategories.find(cat => cat.id === selectedCategory)?.subCategories || []
    : [];
  
  const handleAddToCart = (product: Product) => {
    // Default to first variant
    const firstVariant = product.variants[0].id;
    addToCart(product, firstVariant, 1);
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters for Desktop */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-8">
              <div>
                <h3 className="font-bold text-lg mb-4">Categories</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      setSelectedCategory(undefined);
                      setSelectedSubCategory(undefined);
                    }}
                    className={`w-full text-left px-2 py-1 rounded ${
                      !selectedCategory ? 'bg-cozy-sage text-white' : 'hover:bg-gray-100'
                    }`}
                  >
                    All Categories
                  </button>
                  {productCategories.map((category) => (
                    <div key={category.id}>
                      <button
                        onClick={() => {
                          setSelectedCategory(category.id);
                          setSelectedSubCategory(undefined);
                        }}
                        className={`w-full text-left px-2 py-1 rounded ${
                          selectedCategory === category.id ? 'bg-cozy-sage text-white' : 'hover:bg-gray-100'
                        }`}
                      >
                        {category.name}
                      </button>
                      
                      {selectedCategory === category.id && category.subCategories.length > 0 && (
                        <div className="ml-4 mt-2 space-y-1">
                          {category.subCategories.map(sub => (
                            <button
                              key={sub.id}
                              onClick={() => setSelectedSubCategory(sub.id)}
                              className={`w-full text-left px-2 py-1 rounded text-sm ${
                                selectedSubCategory === sub.id ? 'bg-cozy-terracotta text-white' : 'hover:bg-gray-100'
                              }`}
                            >
                              {sub.name}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-bold text-lg mb-4">Price Range</h3>
                <Slider 
                  defaultValue={priceRange} 
                  min={0} 
                  max={200} 
                  step={10}
                  onValueChange={(value) => setPriceRange(value as [number, number])}
                  className="mb-6"
                />
                <div className="flex justify-between">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
              
              <div>
                <h3 className="font-bold text-lg mb-4">Brands</h3>
                <div className="space-y-2">
                  {brands.map((brand) => (
                    <div key={brand.id} className="flex items-center">
                      <Checkbox
                        id={`brand-${brand.id}`}
                        checked={selectedBrands.includes(brand.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedBrands(prev => [...prev, brand.id]);
                          } else {
                            setSelectedBrands(prev => prev.filter(id => id !== brand.id));
                          }
                        }}
                      />
                      <Label htmlFor={`brand-${brand.id}`} className="ml-2 cursor-pointer">
                        {brand.name}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <div className="flex items-center">
                  <Checkbox
                    id="onsale"
                    checked={onSale}
                    onCheckedChange={(checked) => setOnSale(!!checked)}
                  />
                  <Label htmlFor="onsale" className="ml-2 cursor-pointer">
                    On Sale
                  </Label>
                </div>
              </div>
              
              <Button
                onClick={() => {
                  setSelectedCategory(undefined);
                  setSelectedSubCategory(undefined);
                  setSelectedBrands([]);
                  setPriceRange([0, 200]);
                  setOnSale(false);
                }}
                variant="outline"
                className="w-full"
              >
                Reset Filters
              </Button>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="flex-grow">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">
                {selectedCategory 
                  ? productCategories.find(cat => cat.id === selectedCategory)?.name
                  : 'All Products'
                }
                {selectedSubCategory && subCategories.length > 0 && (
                  <span className="text-cozy-terracotta">
                    {' > '}
                    {subCategories.find(sub => sub.id === selectedSubCategory)?.name}
                  </span>
                )}
              </h1>
              
              <Button 
                variant="outline" 
                className="md:hidden flex items-center gap-2"
                onClick={() => setIsFilterOpen(true)}
              >
                <SlidersHorizontal size={16} />
                Filters
              </Button>
            </div>
            
            {/* Active Filters */}
            {(selectedCategory || selectedSubCategory || selectedBrands.length > 0 || onSale || priceRange[0] > 0 || priceRange[1] < 200) && (
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedCategory && (
                  <div className="inline-flex items-center bg-gray-100 rounded-full px-3 py-1 text-sm">
                    <span>
                      {productCategories.find(cat => cat.id === selectedCategory)?.name}
                    </span>
                    <button
                      onClick={() => {
                        setSelectedCategory(undefined);
                        setSelectedSubCategory(undefined);
                      }}
                      className="ml-2"
                    >
                      <X size={14} />
                    </button>
                  </div>
                )}
                
                {selectedSubCategory && (
                  <div className="inline-flex items-center bg-gray-100 rounded-full px-3 py-1 text-sm">
                    <span>
                      {subCategories.find(sub => sub.id === selectedSubCategory)?.name}
                    </span>
                    <button
                      onClick={() => setSelectedSubCategory(undefined)}
                      className="ml-2"
                    >
                      <X size={14} />
                    </button>
                  </div>
                )}
                
                {selectedBrands.map(brandId => (
                  <div key={brandId} className="inline-flex items-center bg-gray-100 rounded-full px-3 py-1 text-sm">
                    <span>
                      {brands.find(brand => brand.id === brandId)?.name}
                    </span>
                    <button
                      onClick={() => setSelectedBrands(prev => prev.filter(id => id !== brandId))}
                      className="ml-2"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
                
                {(priceRange[0] > 0 || priceRange[1] < 200) && (
                  <div className="inline-flex items-center bg-gray-100 rounded-full px-3 py-1 text-sm">
                    <span>${priceRange[0]} - ${priceRange[1]}</span>
                    <button
                      onClick={() => setPriceRange([0, 200])}
                      className="ml-2"
                    >
                      <X size={14} />
                    </button>
                  </div>
                )}
                
                {onSale && (
                  <div className="inline-flex items-center bg-gray-100 rounded-full px-3 py-1 text-sm">
                    <span>On Sale</span>
                    <button
                      onClick={() => setOnSale(false)}
                      className="ml-2"
                    >
                      <X size={14} />
                    </button>
                  </div>
                )}
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSelectedCategory(undefined);
                    setSelectedSubCategory(undefined);
                    setSelectedBrands([]);
                    setPriceRange([0, 200]);
                    setOnSale(false);
                  }}
                  className="text-cozy-terracotta hover:text-cozy-terracotta/80 text-sm"
                >
                  Clear All
                </Button>
              </div>
            )}
            
            {/* Results Count */}
            <p className="text-gray-500 mb-6">
              Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
            </p>
            
            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <h3 className="text-xl font-bold mb-2">No products found</h3>
                <p className="text-gray-500 mb-6">
                  Try adjusting your filters or browse our categories
                </p>
                <Button
                  onClick={() => {
                    setSelectedCategory(undefined);
                    setSelectedSubCategory(undefined);
                    setSelectedBrands([]);
                    setPriceRange([0, 200]);
                    setOnSale(false);
                  }}
                  className="bg-cozy-sage hover:bg-cozy-sage/90"
                >
                  Reset Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="product-card group">
                    <div className="relative">
                      <a href={`/product/${product.id}`}>
                        <div className="aspect-square bg-gray-100 overflow-hidden">
                          <img 
                            src={product.images[0]} 
                            alt={product.name} 
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                      </a>
                      
                      {product.isOnSale && (
                        <div className="absolute top-2 left-2 bg-cozy-terracotta text-white text-xs font-bold px-2 py-1 rounded">
                          SALE
                        </div>
                      )}
                      
                      <button 
                        className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
                        aria-label="Add to wishlist"
                      >
                        <Heart size={18} className="text-cozy-dark" />
                      </button>
                      
                      <div className="absolute bottom-0 left-0 right-0 bg-white p-2 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                        <Button 
                          onClick={() => handleAddToCart(product)}
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
                      
                      <a href={`/product/${product.id}`}>
                        <h3 className="font-medium text-cozy-dark mb-1 hover:text-cozy-terracotta transition-colors">
                          {product.name}
                        </h3>
                      </a>
                      
                      <div className="flex items-center mt-1">
                        {product.salePrice ? (
                          <>
                            <span className="font-bold text-cozy-terracotta">${product.salePrice.toFixed(2)}</span>
                            <span className="ml-2 text-gray-500 line-through text-sm">${product.price.toFixed(2)}</span>
                          </>
                        ) : (
                          <span className="font-bold text-cozy-dark">${product.price.toFixed(2)}</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Mobile Filters Drawer */}
      <div className={`fixed inset-0 bg-black/50 z-50 ${isFilterOpen ? 'block' : 'hidden'}`}
           onClick={() => setIsFilterOpen(false)}></div>
      <div className={`fixed inset-y-0 left-0 w-80 max-w-full bg-white z-50 transform transition-transform duration-300 ${
        isFilterOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-4 h-full overflow-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Filters</h2>
            <Button variant="ghost" size="icon" onClick={() => setIsFilterOpen(false)}>
              <X size={24} />
            </Button>
          </div>
          
          <div className="space-y-8">
            <div>
              <h3 className="font-bold text-lg mb-4">Categories</h3>
              <div className="space-y-2">
                <button
                  onClick={() => {
                    setSelectedCategory(undefined);
                    setSelectedSubCategory(undefined);
                    setIsFilterOpen(false);
                  }}
                  className={`w-full text-left px-2 py-1 rounded ${
                    !selectedCategory ? 'bg-cozy-sage text-white' : 'hover:bg-gray-100'
                  }`}
                >
                  All Categories
                </button>
                {productCategories.map((category) => (
                  <div key={category.id}>
                    <button
                      onClick={() => {
                        setSelectedCategory(category.id);
                        setSelectedSubCategory(undefined);
                      }}
                      className={`w-full text-left px-2 py-1 rounded ${
                        selectedCategory === category.id ? 'bg-cozy-sage text-white' : 'hover:bg-gray-100'
                      }`}
                    >
                      {category.name}
                    </button>
                    
                    {selectedCategory === category.id && category.subCategories.length > 0 && (
                      <div className="ml-4 mt-2 space-y-1">
                        {category.subCategories.map(sub => (
                          <button
                            key={sub.id}
                            onClick={() => {
                              setSelectedSubCategory(sub.id);
                              setIsFilterOpen(false);
                            }}
                            className={`w-full text-left px-2 py-1 rounded text-sm ${
                              selectedSubCategory === sub.id ? 'bg-cozy-terracotta text-white' : 'hover:bg-gray-100'
                            }`}
                          >
                            {sub.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-4">Price Range</h3>
              <Slider 
                defaultValue={priceRange} 
                min={0} 
                max={200} 
                step={10}
                onValueChange={(value) => setPriceRange(value as [number, number])}
                className="mb-6"
              />
              <div className="flex justify-between">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-4">Brands</h3>
              <div className="space-y-2">
                {brands.map((brand) => (
                  <div key={brand.id} className="flex items-center">
                    <Checkbox
                      id={`mobile-brand-${brand.id}`}
                      checked={selectedBrands.includes(brand.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedBrands(prev => [...prev, brand.id]);
                        } else {
                          setSelectedBrands(prev => prev.filter(id => id !== brand.id));
                        }
                      }}
                    />
                    <Label htmlFor={`mobile-brand-${brand.id}`} className="ml-2 cursor-pointer">
                      {brand.name}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <div className="flex items-center">
                <Checkbox
                  id="mobile-onsale"
                  checked={onSale}
                  onCheckedChange={(checked) => setOnSale(!!checked)}
                />
                <Label htmlFor="mobile-onsale" className="ml-2 cursor-pointer">
                  On Sale
                </Label>
              </div>
            </div>
          </div>
          
          <div className="flex gap-4 mt-8">
            <Button
              onClick={() => {
                setSelectedCategory(undefined);
                setSelectedSubCategory(undefined);
                setSelectedBrands([]);
                setPriceRange([0, 200]);
                setOnSale(false);
              }}
              variant="outline"
              className="flex-1"
            >
              Reset
            </Button>
            <Button
              onClick={() => setIsFilterOpen(false)}
              className="flex-1 bg-cozy-sage hover:bg-cozy-sage/90"
            >
              Apply
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Shop;
