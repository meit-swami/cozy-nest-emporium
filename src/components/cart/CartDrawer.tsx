
import React from 'react';
import { Link } from 'react-router-dom';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { X, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import CartItem from './CartItem';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer = ({ isOpen, onClose }: CartDrawerProps) => {
  const { cart } = useCart();
  
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-md flex flex-col h-full">
        <SheetHeader className="border-b pb-4">
          <SheetTitle className="text-xl">Shopping Cart</SheetTitle>
        </SheetHeader>
        
        {cart.items.length === 0 ? (
          <div className="flex flex-col items-center justify-center flex-grow py-10">
            <div className="w-16 h-16 bg-cozy-sage/10 rounded-full flex items-center justify-center mb-4">
              <ShoppingBag className="h-8 w-8 text-cozy-sage" />
            </div>
            <h3 className="text-lg font-medium text-cozy-dark mb-1">Your cart is empty</h3>
            <p className="text-gray-500 mb-6 text-center">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Button onClick={onClose} className="bg-cozy-sage hover:bg-cozy-sage/90">
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-grow overflow-auto py-4">
              <div className="space-y-4">
                {cart.items.map((item) => (
                  <CartItem 
                    key={`${item.product.id}-${item.variant}`}
                    item={item}
                  />
                ))}
              </div>
            </div>
            
            <div className="border-t pt-4 mt-auto">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-500">Subtotal</span>
                <span>${cart.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm mb-4">
                <span className="text-gray-500">Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="flex justify-between font-medium text-lg mb-6">
                <span>Total</span>
                <span>${cart.total.toFixed(2)}</span>
              </div>
              
              <div className="space-y-3">
                <Link 
                  to="/checkout"
                  onClick={onClose}
                  className="block w-full bg-cozy-terracotta hover:bg-cozy-terracotta/90 text-white py-3 px-4 rounded-md text-center font-medium transition duration-200"
                >
                  Proceed to Checkout
                </Link>
                <Button 
                  onClick={onClose}
                  variant="outline"
                  className="w-full border-cozy-sage text-cozy-sage hover:bg-cozy-sage/10"
                >
                  Continue Shopping
                </Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
