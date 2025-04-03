
import React from 'react';
import { Link } from 'react-router-dom';
import { X, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart, CartItem as CartItemType } from '@/context/CartContext';

interface CartItemProps {
  item: CartItemType;
}

const CartItem = ({ item }: CartItemProps) => {
  const { removeFromCart, updateQuantity } = useCart();
  const { product, variant, quantity } = item;
  
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      updateQuantity(product.id, variant, newQuantity);
    }
  };
  
  const price = product.salePrice || product.price;
  const totalPrice = price * quantity;
  
  // Find the variant object
  const variantObject = product.variants.find(v => v.id === variant);
  const variantImage = variantObject?.image || product.images[0];
  
  // Find variant display name
  let variantDisplay = '';
  if (variantObject) {
    if (variantObject.color) variantDisplay = variantObject.color;
    else if (variantObject.material) variantDisplay = variantObject.material;
    else if (variantObject.size) variantDisplay = variantObject.size;
  }
  
  return (
    <div className="flex items-start border-b pb-4">
      <div className="flex-shrink-0 w-20 h-20 bg-gray-100 rounded overflow-hidden">
        <img src={variantImage} alt={product.name} className="w-full h-full object-cover" />
      </div>
      
      <div className="ml-4 flex-grow">
        <div className="flex justify-between">
          <Link to={`/product/${product.id}`} className="font-medium text-cozy-dark hover:text-cozy-terracotta transition-colors">
            {product.name}
          </Link>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-gray-400 hover:text-gray-500"
            onClick={() => removeFromCart(product.id, variant)}
          >
            <X size={16} />
          </Button>
        </div>
        
        {variantDisplay && (
          <p className="text-sm text-gray-500">{variantDisplay}</p>
        )}
        
        <div className="flex justify-between items-center mt-2">
          <div className="flex items-center border rounded-md">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8"
              onClick={() => handleQuantityChange(quantity - 1)}
              disabled={quantity <= 1}
            >
              <Minus size={14} />
            </Button>
            <span className="w-8 text-center">{quantity}</span>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8"
              onClick={() => handleQuantityChange(quantity + 1)}
            >
              <Plus size={14} />
            </Button>
          </div>
          
          <div className="text-right">
            <div className="font-medium">${totalPrice.toFixed(2)}</div>
            {quantity > 1 && (
              <div className="text-xs text-gray-500">${price.toFixed(2)} each</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
