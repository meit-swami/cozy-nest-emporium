
import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { CheckCircle, ShoppingBag, ArrowRight } from 'lucide-react';

// Array of possible success messages
const successMessages = [
  "Your cozy corner just got an upgrade!",
  "Great choice! Your home is about to get cozier.",
  "Success! Your home essentials are on the way.",
  "Order confirmed! Get ready to transform your space.",
  "Thanks for your order! Your home will thank you too.",
  "Exciting times ahead! Your CozyNest order is confirmed.",
  "Your order is confirmed! Time to get comfy.",
  "Good news! Your home and kitchen upgrades are on the way."
];

const OrderConfirmation = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const orderId = searchParams.get('orderId') || 'ORD-123456';
  
  const [message, setMessage] = useState('');
  const [estimatedDelivery, setEstimatedDelivery] = useState('');
  
  useEffect(() => {
    // Select a random success message
    const randomIndex = Math.floor(Math.random() * successMessages.length);
    setMessage(successMessages[randomIndex]);
    
    // Generate a random delivery date (5-7 days from now)
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 5 + Math.floor(Math.random() * 3));
    setEstimatedDelivery(deliveryDate.toLocaleDateString('en-US', { 
      weekday: 'long',
      month: 'long', 
      day: 'numeric'
    }));
  }, []);
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-lg mx-auto text-center">
          <div className="mb-6">
            <div className="w-20 h-20 bg-cozy-sage/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-10 w-10 text-cozy-sage" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
            <p className="text-xl text-gray-600">{message}</p>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <div className="text-left space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Order Number:</span>
                <span className="font-medium">{orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Estimated Delivery:</span>
                <span className="font-medium">{estimatedDelivery}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping Method:</span>
                <span className="font-medium">Standard Shipping</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Payment Method:</span>
                <span className="font-medium">Cash on Delivery</span>
              </div>
            </div>
          </div>
          
          <p className="mb-6 text-gray-600">
            We'll send you shipping confirmation when your items are on the way!
            You can track your order by clicking the link below or using your order number
            in the tracking feature.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              className="bg-cozy-sage hover:bg-cozy-sage/90 flex items-center gap-2"
              asChild
            >
              <Link to="/">
                <ShoppingBag size={18} />
                Continue Shopping
              </Link>
            </Button>
            
            <Button
              variant="outline"
              className="border-cozy-terracotta text-cozy-terracotta hover:bg-cozy-terracotta/10 flex items-center gap-2"
              asChild
            >
              <Link to="/shop">
                Track Order
                <ArrowRight size={18} />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderConfirmation;
