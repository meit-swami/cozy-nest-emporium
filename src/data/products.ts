
export interface ProductVariant {
  id: string;
  color?: string;
  size?: string;
  material?: string;
  image: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  subCategory: string;
  price: number;
  salePrice?: number;
  brand: string;
  description: string;
  features: string[];
  images: string[];
  variants: ProductVariant[];
  inStock: boolean;
  isFeatured: boolean;
  isOnSale: boolean;
  rating: number;
  reviewCount: number;
}

export const productCategories = [
  { 
    id: 'cookware', 
    name: 'Cookware & Bakeware',
    subCategories: [
      { id: 'pots', name: 'Pots & Pans' },
      { id: 'baking', name: 'Baking Sheets & Molds' },
      { id: 'utensils', name: 'Kitchen Utensils' }
    ] 
  },
  { 
    id: 'appliances', 
    name: 'Kitchen Appliances',
    subCategories: [
      { id: 'blenders', name: 'Blenders & Mixers' },
      { id: 'coffee', name: 'Coffee & Tea Makers' },
      { id: 'airfryers', name: 'Air Fryers' }
    ]
  },
  { 
    id: 'storage', 
    name: 'Storage & Organization',
    subCategories: [
      { id: 'containers', name: 'Food Containers' },
      { id: 'racks', name: 'Kitchen Racks' },
      { id: 'shelves', name: 'Shelving Units' }
    ]
  },
  { 
    id: 'dining', 
    name: 'Dining & Serveware',
    subCategories: [
      { id: 'plates', name: 'Plates & Bowls' },
      { id: 'cutlery', name: 'Cutlery Sets' },
      { id: 'glassware', name: 'Glassware' }
    ]
  },
  { 
    id: 'decor', 
    name: 'Home Décor',
    subCategories: [
      { id: 'lamps', name: 'Lamps & Lighting' },
      { id: 'wallart', name: 'Wall Art' },
      { id: 'rugs', name: 'Rugs & Carpets' }
    ]
  },
  { 
    id: 'cleaning', 
    name: 'Cleaning Supplies',
    subCategories: [
      { id: 'vacuum', name: 'Vacuum Cleaners' },
      { id: 'mops', name: 'Mops & Brooms' },
      { id: 'fresheners', name: 'Air Fresheners' }
    ]
  }
];

export const brands = [
  { id: 'homely', name: 'Homely' },
  { id: 'kitchencraft', name: 'KitchenCraft' },
  { id: 'cozynest', name: 'CozyNest Collection' },
  { id: 'chefmate', name: 'ChefMate' },
  { id: 'modernhome', name: 'Modern Home' },
  { id: 'cleanliving', name: 'Clean Living' }
];

export const products: Product[] = [
  {
    id: 'non-stick-pan-set',
    name: 'Premium Non-Stick Pan Set',
    category: 'cookware',
    subCategory: 'pots',
    price: 89.99,
    salePrice: 69.99,
    brand: 'kitchencraft',
    description: 'Our premium non-stick pan set includes 8", 10", and 12" pans with ergonomic handles and even heat distribution. Perfect for everyday cooking from searing to sautéing.',
    features: [
      'Triple-layered non-stick coating',
      'Aluminum core for even heating',
      'Ergonomic stay-cool handles',
      'Oven safe up to 450°F',
      'Dishwasher safe for easy cleanup'
    ],
    images: [
      '/placeholder.svg',
      '/placeholder.svg',
      '/placeholder.svg'
    ],
    variants: [
      { id: 'pan-set-black', color: 'Black', image: '/placeholder.svg' },
      { id: 'pan-set-copper', color: 'Copper', image: '/placeholder.svg' }
    ],
    inStock: true,
    isFeatured: true,
    isOnSale: true,
    rating: 4.8,
    reviewCount: 127
  },
  {
    id: 'coffee-maker-deluxe',
    name: 'Deluxe Coffee Maker with Grinder',
    category: 'appliances',
    subCategory: 'coffee',
    price: 129.99,
    brand: 'kitchencraft',
    description: 'Start your morning right with this deluxe coffee maker featuring a built-in grinder, programmable timer, and temperature control for the perfect cup every time.',
    features: [
      'Built-in conical burr grinder',
      'Programmable 24-hour timer',
      'Temperature control system',
      'Thermal carafe keeps coffee hot for hours',
      '12-cup capacity'
    ],
    images: [
      '/placeholder.svg',
      '/placeholder.svg',
      '/placeholder.svg'
    ],
    variants: [
      { id: 'coffee-maker-silver', color: 'Stainless Steel', image: '/placeholder.svg' },
      { id: 'coffee-maker-black', color: 'Black', image: '/placeholder.svg' }
    ],
    inStock: true,
    isFeatured: true,
    isOnSale: false,
    rating: 4.5,
    reviewCount: 89
  },
  {
    id: 'luxury-bedding-set',
    name: 'Luxury Egyptian Cotton Bedding Set',
    category: 'decor',
    subCategory: 'bedding',
    price: 199.99,
    salePrice: 159.99,
    brand: 'cozynest',
    description: 'Transform your bedroom with our luxury Egyptian cotton bedding set. With a 500 thread count and silky-soft finish, this set includes a duvet cover, fitted sheet, and pillowcases.',
    features: [
      '100% Egyptian cotton',
      '500 thread count',
      'Silky-soft finish',
      'Includes duvet cover, fitted sheet, and 2 pillowcases',
      'Machine washable'
    ],
    images: [
      '/placeholder.svg',
      '/placeholder.svg',
      '/placeholder.svg'
    ],
    variants: [
      { id: 'bedding-white', color: 'White', image: '/placeholder.svg' },
      { id: 'bedding-cream', color: 'Cream', image: '/placeholder.svg' },
      { id: 'bedding-sage', color: 'Sage', image: '/placeholder.svg' }
    ],
    inStock: true,
    isFeatured: false,
    isOnSale: true,
    rating: 4.9,
    reviewCount: 213
  },
  {
    id: 'kitchen-storage-containers',
    name: 'Airtight Food Storage Container Set',
    category: 'storage',
    subCategory: 'containers',
    price: 49.99,
    brand: 'homely',
    description: 'Keep your pantry organized and your food fresh with our 10-piece airtight container set. Perfect for storing dry goods like pasta, rice, cereal, and baking ingredients.',
    features: [
      'Airtight silicone seal',
      'BPA-free plastic',
      '10-piece set in various sizes',
      'Stackable design for space efficiency',
      'Dishwasher safe'
    ],
    images: [
      '/placeholder.svg',
      '/placeholder.svg',
      '/placeholder.svg'
    ],
    variants: [
      { id: 'containers-clear', material: 'Clear Plastic', image: '/placeholder.svg' }
    ],
    inStock: true,
    isFeatured: true,
    isOnSale: false,
    rating: 4.6,
    reviewCount: 75
  },
  {
    id: 'cordless-vacuum-cleaner',
    name: 'Lightweight Cordless Vacuum Cleaner',
    category: 'cleaning',
    subCategory: 'vacuum',
    price: 149.99,
    salePrice: 129.99,
    brand: 'cleanliving',
    description: 'This lightweight cordless vacuum cleaner makes cleaning a breeze. With a 40-minute runtime, powerful suction, and versatile attachments, it tackles every corner of your home.',
    features: [
      'Cordless design with 40-minute runtime',
      'Powerful cyclonic suction',
      'Weighs only 5.5 lbs',
      'Converts to handheld for versatile cleaning',
      'HEPA filtration system'
    ],
    images: [
      '/placeholder.svg',
      '/placeholder.svg',
      '/placeholder.svg'
    ],
    variants: [
      { id: 'vacuum-blue', color: 'Blue', image: '/placeholder.svg' },
      { id: 'vacuum-gray', color: 'Gray', image: '/placeholder.svg' }
    ],
    inStock: true,
    isFeatured: true,
    isOnSale: true,
    rating: 4.7,
    reviewCount: 162
  },
  {
    id: 'modern-dining-set',
    name: 'Modern Stoneware Dining Set',
    category: 'dining',
    subCategory: 'plates',
    price: 119.99,
    brand: 'modernhome',
    description: 'Elevate your dining experience with our modern stoneware set. This 16-piece collection includes dinner plates, salad plates, bowls, and mugs for a complete table setting.',
    features: [
      'Durable stoneware construction',
      '16-piece set (service for 4)',
      'Microwave and dishwasher safe',
      'Minimalist modern design',
      'Stackable for compact storage'
    ],
    images: [
      '/placeholder.svg',
      '/placeholder.svg',
      '/placeholder.svg'
    ],
    variants: [
      { id: 'dining-white', color: 'White', image: '/placeholder.svg' },
      { id: 'dining-terracotta', color: 'Terracotta', image: '/placeholder.svg' },
      { id: 'dining-sage', color: 'Sage', image: '/placeholder.svg' }
    ],
    inStock: true,
    isFeatured: true,
    isOnSale: false,
    rating: 4.5,
    reviewCount: 94
  },
  {
    id: 'air-fryer-pro',
    name: 'Digital Air Fryer Pro',
    category: 'appliances',
    subCategory: 'airfryers',
    price: 179.99,
    salePrice: 149.99,
    brand: 'kitchencraft',
    description: 'Cook healthier meals in less time with our Digital Air Fryer Pro. The 5.5-quart capacity is perfect for families, while the 8 preset cooking functions make meal preparation effortless.',
    features: [
      '5.5-quart capacity',
      '8 preset cooking functions',
      'Digital touchscreen control',
      'Rapid air circulation technology',
      'Dishwasher-safe parts'
    ],
    images: [
      '/placeholder.svg',
      '/placeholder.svg',
      '/placeholder.svg'
    ],
    variants: [
      { id: 'airfryer-black', color: 'Black', image: '/placeholder.svg' },
      { id: 'airfryer-silver', color: 'Stainless Steel', image: '/placeholder.svg' }
    ],
    inStock: true,
    isFeatured: true,
    isOnSale: true,
    rating: 4.8,
    reviewCount: 136
  },
  {
    id: 'bamboo-kitchen-utensils',
    name: 'Bamboo Kitchen Utensil Set',
    category: 'cookware',
    subCategory: 'utensils',
    price: 34.99,
    brand: 'homely',
    description: 'This beautiful bamboo utensil set includes all the essentials for cooking: spatula, spoon, slotted spoon, fork, and tongs. Made from sustainable bamboo with comfortable handles.',
    features: [
      'Made from sustainable bamboo',
      '5-piece set of essential tools',
      'Non-scratch safe for all cookware',
      'Naturally antibacterial',
      'Lightweight with comfortable grip'
    ],
    images: [
      '/placeholder.svg',
      '/placeholder.svg',
      '/placeholder.svg'
    ],
    variants: [
      { id: 'utensils-natural', material: 'Natural Bamboo', image: '/placeholder.svg' }
    ],
    inStock: true,
    isFeatured: false,
    isOnSale: false,
    rating: 4.4,
    reviewCount: 58
  },
  {
    id: 'geometric-wall-shelves',
    name: 'Geometric Floating Wall Shelves',
    category: 'decor',
    subCategory: 'wallart',
    price: 79.99,
    brand: 'modernhome',
    description: 'Add style and functionality to any room with our geometric floating wall shelves. The set of three shelves comes in different sizes and can be arranged in countless configurations.',
    features: [
      'Set of 3 hexagonal shelves in different sizes',
      'Solid wood construction',
      'Metal bracket mounting system included',
      'Weight capacity: 15 lbs per shelf',
      'Modern geometric design'
    ],
    images: [
      '/placeholder.svg',
      '/placeholder.svg',
      '/placeholder.svg'
    ],
    variants: [
      { id: 'shelves-walnut', material: 'Walnut', image: '/placeholder.svg' },
      { id: 'shelves-white', material: 'White Oak', image: '/placeholder.svg' }
    ],
    inStock: true,
    isFeatured: true,
    isOnSale: false,
    rating: 4.6,
    reviewCount: 87
  },
  {
    id: 'luxury-hand-soap',
    name: 'Luxury Hand Soap & Lotion Set',
    category: 'cleaning',
    subCategory: 'fresheners',
    price: 29.99,
    brand: 'cozynest',
    description: 'Elevate your bathroom or kitchen with our luxury hand soap and lotion set. Featuring botanical extracts and essential oils in elegant glass dispensers.',
    features: [
      'Includes hand soap and matching lotion',
      'Made with botanical extracts and essential oils',
      'Elegant glass dispensers with brushed metal pumps',
      'Paraben and sulfate-free formula',
      'Available in 4 signature scents'
    ],
    images: [
      '/placeholder.svg',
      '/placeholder.svg',
      '/placeholder.svg'
    ],
    variants: [
      { id: 'soap-lavender', material: 'Lavender & Sage', image: '/placeholder.svg' },
      { id: 'soap-citrus', material: 'Mediterranean Citrus', image: '/placeholder.svg' },
      { id: 'soap-eucalyptus', material: 'Eucalyptus Mint', image: '/placeholder.svg' },
      { id: 'soap-vanilla', material: 'Vanilla Amber', image: '/placeholder.svg' }
    ],
    inStock: true,
    isFeatured: false,
    isOnSale: false,
    rating: 4.7,
    reviewCount: 103
  }
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getRelatedProducts = (product: Product, limit: number = 4): Product[] => {
  return products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, limit);
};

export const getFeaturedProducts = (limit: number = 6): Product[] => {
  return products
    .filter(product => product.isFeatured)
    .slice(0, limit);
};

export const getDiscountedProducts = (limit: number = 6): Product[] => {
  return products
    .filter(product => product.isOnSale)
    .slice(0, limit);
};

export const getProductsByCategory = (category: string, limit?: number): Product[] => {
  const filteredProducts = products.filter(product => product.category === category);
  return limit ? filteredProducts.slice(0, limit) : filteredProducts;
};

export const filterProducts = (
  categoryFilter?: string,
  subCategoryFilter?: string,
  brandFilter?: string[],
  priceRange?: [number, number],
  onSale?: boolean
): Product[] => {
  return products.filter(product => {
    // Category filter
    if (categoryFilter && product.category !== categoryFilter) return false;
    
    // Subcategory filter
    if (subCategoryFilter && product.subCategory !== subCategoryFilter) return false;
    
    // Brand filter
    if (brandFilter && brandFilter.length > 0 && !brandFilter.includes(product.brand)) return false;
    
    // Price range filter
    if (priceRange) {
      const productPrice = product.salePrice || product.price;
      if (productPrice < priceRange[0] || productPrice > priceRange[1]) return false;
    }
    
    // On sale filter
    if (onSale === true && !product.isOnSale) return false;
    
    return true;
  });
};
