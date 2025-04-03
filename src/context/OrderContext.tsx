
import React, { createContext, useContext, ReactNode } from 'react';
import { toast } from "sonner";

interface OrderStatus {
  orderId: string;
  status: 'processing' | 'shipped' | 'delivered' | 'canceled';
  date: string;
  trackingNumber?: string;
  estimatedDelivery?: string;
  shippingProvider?: string;
  statusHistory: Array<{
    status: string;
    date: string;
    location?: string;
    note?: string;
  }>;
}

interface OrderContextType {
  trackOrder: (orderId: string) => OrderStatus | null;
}

// Mock order data
const mockOrderStatuses: Record<string, OrderStatus> = {
  'ORD-123456': {
    orderId: 'ORD-123456',
    status: 'shipped',
    date: '2023-07-15',
    trackingNumber: 'TRK789012345',
    estimatedDelivery: '2023-07-20',
    shippingProvider: 'FedEx',
    statusHistory: [
      { status: 'Order Placed', date: '2023-07-15 10:30 AM', note: 'Order received' },
      { status: 'Payment Confirmed', date: '2023-07-15 11:45 AM' },
      { status: 'Processing', date: '2023-07-16 09:20 AM', note: 'Preparing your items' },
      { status: 'Shipped', date: '2023-07-17 02:15 PM', location: 'Distribution Center' }
    ]
  },
  'ORD-789012': {
    orderId: 'ORD-789012',
    status: 'delivered',
    date: '2023-07-01',
    trackingNumber: 'TRK456789012',
    estimatedDelivery: '2023-07-07',
    shippingProvider: 'UPS',
    statusHistory: [
      { status: 'Order Placed', date: '2023-07-01 08:45 AM' },
      { status: 'Payment Confirmed', date: '2023-07-01 09:30 AM' },
      { status: 'Processing', date: '2023-07-02 10:15 AM' },
      { status: 'Shipped', date: '2023-07-03 01:20 PM', location: 'Regional Warehouse' },
      { status: 'In Transit', date: '2023-07-05 08:30 AM', location: 'Local Facility' },
      { status: 'Out for Delivery', date: '2023-07-07 09:45 AM' },
      { status: 'Delivered', date: '2023-07-07 02:30 PM', note: 'Left at front door' }
    ]
  }
};

// Generate random order status data for any order ID
const generateRandomOrderStatus = (orderId: string): OrderStatus => {
  const statuses = ['processing', 'shipped', 'delivered', 'canceled'] as const;
  const randomStatus = statuses[Math.floor(Math.random() * 3)]; // Exclude canceled for most orders
  
  const orderDate = new Date();
  orderDate.setDate(orderDate.getDate() - Math.floor(Math.random() * 14)); // Random date in last 14 days
  
  const estimatedDelivery = new Date(orderDate);
  estimatedDelivery.setDate(orderDate.getDate() + 3 + Math.floor(Math.random() * 5)); // 3-7 days after order
  
  const shippingProviders = ['FedEx', 'UPS', 'USPS', 'DHL'];
  const randomProvider = shippingProviders[Math.floor(Math.random() * shippingProviders.length)];
  
  // Create random tracking number
  const trackingNumber = `TRK${Math.floor(Math.random() * 1000000000)}`;
  
  // Generate status history
  const statusHistory = [
    { 
      status: 'Order Placed', 
      date: `${orderDate.toISOString().split('T')[0]} ${orderDate.getHours()}:${orderDate.getMinutes()} AM`, 
      note: 'Order received' 
    },
    { 
      status: 'Payment Confirmed', 
      date: `${orderDate.toISOString().split('T')[0]} ${orderDate.getHours() + 1}:${orderDate.getMinutes()} AM` 
    }
  ];
  
  // Add processing status
  const processingDate = new Date(orderDate);
  processingDate.setDate(orderDate.getDate() + 1);
  statusHistory.push({
    status: 'Processing',
    date: `${processingDate.toISOString().split('T')[0]} ${processingDate.getHours()}:${processingDate.getMinutes()} AM`,
    note: 'Preparing your items'
  });
  
  // Add shipped status if applicable
  if (randomStatus === 'shipped' || randomStatus === 'delivered') {
    const shippedDate = new Date(processingDate);
    shippedDate.setDate(processingDate.getDate() + 1);
    statusHistory.push({
      status: 'Shipped',
      date: `${shippedDate.toISOString().split('T')[0]} ${shippedDate.getHours()}:${shippedDate.getMinutes()} PM`,
      location: 'Distribution Center'
    });
    
    // Add in transit status
    const transitDate = new Date(shippedDate);
    transitDate.setDate(shippedDate.getDate() + 1);
    statusHistory.push({
      status: 'In Transit',
      date: `${transitDate.toISOString().split('T')[0]} ${transitDate.getHours()}:${transitDate.getMinutes()} AM`,
      location: 'Regional Hub'
    });
  }
  
  // Add delivered status if applicable
  if (randomStatus === 'delivered') {
    const deliveredDate = new Date(estimatedDelivery);
    statusHistory.push({
      status: 'Out for Delivery',
      date: `${deliveredDate.toISOString().split('T')[0]} ${deliveredDate.getHours() - 3}:${deliveredDate.getMinutes()} AM`
    });
    
    statusHistory.push({
      status: 'Delivered',
      date: `${deliveredDate.toISOString().split('T')[0]} ${deliveredDate.getHours()}:${deliveredDate.getMinutes()} PM`,
      note: 'Left at front door'
    });
  }
  
  return {
    orderId,
    status: randomStatus,
    date: orderDate.toISOString().split('T')[0],
    trackingNumber,
    estimatedDelivery: estimatedDelivery.toISOString().split('T')[0],
    shippingProvider: randomProvider,
    statusHistory
  };
};

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const trackOrder = (orderId: string): OrderStatus | null => {
    // First check if this is one of our hardcoded example orders
    if (mockOrderStatuses[orderId]) {
      return mockOrderStatuses[orderId];
    }
    
    // For any other order ID, generate random tracking info
    if (orderId && orderId.trim().length > 3) {
      // Simple validation to ensure order ID has some substance
      return generateRandomOrderStatus(orderId);
    }
    
    // Invalid order ID
    toast.error("Please enter a valid order ID");
    return null;
  };

  return (
    <OrderContext.Provider value={{ trackOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = (): OrderContextType => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
};
