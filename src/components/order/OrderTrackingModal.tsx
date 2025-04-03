
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2, Package, CheckCircle, Truck, Clock, X } from 'lucide-react';
import { useOrder } from '@/context/OrderContext';

interface OrderTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const OrderTrackingModal = ({ isOpen, onClose }: OrderTrackingModalProps) => {
  const { trackOrder } = useOrder();
  const [orderId, setOrderId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [orderStatus, setOrderStatus] = useState<any>(null);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!orderId.trim()) return;
    
    setIsLoading(true);
    
    // Simulate network request
    setTimeout(() => {
      const status = trackOrder(orderId);
      setOrderStatus(status);
      setIsLoading(false);
    }, 1000);
  };
  
  const renderStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'processing':
        return <Clock className="text-yellow-500" />;
      case 'shipped':
        return <Truck className="text-blue-500" />;
      case 'delivered':
        return <CheckCircle className="text-green-500" />;
      case 'canceled':
        return <X className="text-red-500" />;
      default:
        return <Package className="text-gray-500" />;
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold">Track Your Order</DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          {!orderStatus ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  Enter your order ID to track your package. You can find this in your confirmation email.
                </p>
                <Input 
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  placeholder="e.g., ORD-123456"
                  disabled={isLoading}
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-cozy-sage hover:bg-cozy-sage/90" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Tracking...
                  </>
                ) : (
                  'Track Order'
                )}
              </Button>
              
              <div className="text-center text-sm text-gray-500">
                Example order IDs for testing: ORD-123456, ORD-789012
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <div className="mx-auto w-16 h-16 flex items-center justify-center bg-cozy-sage/10 rounded-full">
                  {renderStatusIcon(orderStatus.status)}
                </div>
                <h3 className="text-xl font-medium">Order {orderStatus.orderId}</h3>
                <p className="text-cozy-terracotta font-medium capitalize">
                  Status: {orderStatus.status}
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Order Date:</p>
                    <p className="font-medium">{orderStatus.date}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Estimated Delivery:</p>
                    <p className="font-medium">{orderStatus.estimatedDelivery || 'N/A'}</p>
                  </div>
                  {orderStatus.trackingNumber && (
                    <div>
                      <p className="text-gray-500">Tracking Number:</p>
                      <p className="font-medium">{orderStatus.trackingNumber}</p>
                    </div>
                  )}
                  {orderStatus.shippingProvider && (
                    <div>
                      <p className="text-gray-500">Shipping Provider:</p>
                      <p className="font-medium">{orderStatus.shippingProvider}</p>
                    </div>
                  )}
                </div>
                
                <div className="border-t pt-4">
                  <h4 className="font-medium mb-3">Tracking History</h4>
                  <div className="space-y-3">
                    {orderStatus.statusHistory.map((item: any, index: number) => (
                      <div key={index} className="relative pl-6 pb-3">
                        {index < orderStatus.statusHistory.length - 1 && (
                          <div className="absolute left-[0.4375rem] top-2 bottom-0 w-0.5 bg-gray-200"></div>
                        )}
                        <div className="absolute left-0 top-1 w-3 h-3 rounded-full bg-cozy-sage"></div>
                        <p className="font-medium">{item.status}</p>
                        <p className="text-sm text-gray-500">{item.date}</p>
                        {item.location && <p className="text-sm">{item.location}</p>}
                        {item.note && <p className="text-sm italic text-gray-500">"{item.note}"</p>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setOrderStatus(null);
                    setOrderId('');
                  }}
                >
                  Track Another Order
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderTrackingModal;
