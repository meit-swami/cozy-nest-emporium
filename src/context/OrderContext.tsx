import React, { createContext, useContext, useState } from 'react';
import { toast } from '@/hooks/use-toast';

// Update the OrderStatus type to include the location property
type OrderStatus = {
  status: string;
  date: string;
  location?: string; // Make location optional
  note?: string;
};

type OrderContextType = {
  trackingNumber: string;
  setTrackingNumber: (trackingNumber: string) => void;
  trackingStatuses: OrderStatus[] | null;
  fetchTrackingStatus: (trackingNumber: string) => void;
  isLoading: boolean;
  error: string | null;
};

const OrderContext = createContext<OrderContextType | undefined>(undefined);

const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrder must be used within an OrderProvider");
  }
  return context;
};

type OrderProviderProps = {
  children: React.ReactNode;
};

const getRandomPastDate = (daysAgo: number): string => {
  const pastDate = new Date();
  pastDate.setDate(pastDate.getDate() - daysAgo);
  return pastDate.toISOString().split('T')[0];
};

const locations = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'];

const getRandomLocation = (): string => {
  return locations[Math.floor(Math.random() * locations.length)];
};

const generateRandomTrackingStatuses = (): OrderStatus[] => {
  return [
    {
      status: 'Order Placed',
      date: getRandomPastDate(14),
      note: 'Your order has been received and is being processed'
    },
    {
      status: 'Payment Confirmed',
      date: getRandomPastDate(12)
    },
    {
      status: 'Processing',
      date: getRandomPastDate(10),
      note: 'Your order is being prepared for shipment'
    },
    {
      status: 'Shipped',
      date: getRandomPastDate(7),
      location: getRandomLocation(), // Now this is valid
      note: 'Your package is on its way'
    },
    {
      status: 'Out for Delivery',
      date: getRandomPastDate(1),
      location: getRandomLocation(), // Now this is valid
      note: 'Your package will be delivered today'
    },
    {
      status: 'Delivered',
      date: new Date().toISOString().split('T')[0],
      note: 'Thank you for shopping with us!'
    }
  ];
};

const OrderProvider: React.FC<OrderProviderProps> = ({ children }) => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [trackingStatuses, setTrackingStatuses] = useState<OrderStatus[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTrackingStatus = async (trackingNumber: string) => {
    setIsLoading(true);
    setError(null);
    try {
      // Simulate fetching tracking status
      await new Promise(resolve => setTimeout(resolve, 1000));

      // For simplicity, generate random statuses
      const statuses = generateRandomTrackingStatuses();
      setTrackingStatuses(statuses);
      toast({
        title: "Tracking status updated.",
        description: "Your order's journey is at your fingertips.",
      })
    } catch (err: any) {
      setError(err.message || 'Failed to fetch tracking status');
      setTrackingStatuses(null);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Failed to fetch tracking status. Please try again.",
      })
    } finally {
      setIsLoading(false);
    }
  };

  const value: OrderContextType = {
    trackingNumber,
    setTrackingNumber,
    trackingStatuses,
    fetchTrackingStatus,
    isLoading,
    error,
  };

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  );
};

export { OrderProvider, useOrder };
