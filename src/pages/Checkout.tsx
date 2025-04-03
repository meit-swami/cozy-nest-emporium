
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Select, 
  SelectContent, 
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

// US States for form
const usStates = [
  { value: "AL", label: "Alabama" },
  { value: "AK", label: "Alaska" },
  { value: "AZ", label: "Arizona" },
  { value: "AR", label: "Arkansas" },
  { value: "CA", label: "California" },
  // Add more states as needed
];

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();
  const [activeTab, setActiveTab] = useState('information');
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Form state
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [apartment, setApartment] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('CA');
  const [zipCode, setZipCode] = useState('');
  const [phone, setPhone] = useState('');
  const [saveInfo, setSaveInfo] = useState(false);
  
  // Shipping same as billing
  const [sameAsBilling, setSameAsBilling] = useState(true);
  
  // Shipping information
  const [shippingFirstName, setShippingFirstName] = useState('');
  const [shippingLastName, setShippingLastName] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [shippingApartment, setShippingApartment] = useState('');
  const [shippingCity, setShippingCity] = useState('');
  const [shippingState, setShippingState] = useState('CA');
  const [shippingZipCode, setShippingZipCode] = useState('');
  const [shippingPhone, setShippingPhone] = useState('');
  
  // Shipping method
  const [shippingMethod, setShippingMethod] = useState('standard');
  
  // Payment method
  const [paymentMethod, setPaymentMethod] = useState('cod');
  
  const shippingMethods = [
    { id: 'standard', name: 'Standard Shipping', price: 5.99, time: '5-7 business days' },
    { id: 'express', name: 'Express Shipping', price: 12.99, time: '2-3 business days' },
  ];
  
  const handleContinueToShipping = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!email || !firstName || !lastName || !address || !city || !state || !zipCode || !phone) {
      toast.error('Please fill out all required fields');
      return;
    }
    
    setActiveTab('shipping');
  };
  
  const handleContinueToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    
    const shippingFirstNameToCheck = sameAsBilling ? firstName : shippingFirstName;
    const shippingLastNameToCheck = sameAsBilling ? lastName : shippingLastName;
    const shippingAddressToCheck = sameAsBilling ? address : shippingAddress;
    const shippingCityToCheck = sameAsBilling ? city : shippingCity;
    const shippingStateToCheck = sameAsBilling ? state : shippingState;
    const shippingZipCodeToCheck = sameAsBilling ? zipCode : shippingZipCode;
    
    if (!shippingFirstNameToCheck || !shippingLastNameToCheck || !shippingAddressToCheck || !shippingCityToCheck || !shippingStateToCheck || !shippingZipCodeToCheck) {
      toast.error('Please fill out all required shipping fields');
      return;
    }
    
    setActiveTab('payment');
  };
  
  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (cart.items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      const orderId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
      clearCart();
      navigate(`/order-confirmation?orderId=${orderId}`);
    }, 2000);
  };
  
  // Calculate totals
  const subtotal = cart.total;
  const shipping = shippingMethod === 'standard' ? 5.99 : 12.99;
  const tax = subtotal * 0.0825; // 8.25% tax rate
  const total = subtotal + shipping + tax;
  
  // If cart is empty, redirect to cart page
  if (cart.items.length === 0 && !isProcessing) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="mb-8">Add some products to your cart before proceeding to checkout.</p>
          <Button 
            onClick={() => navigate('/shop')}
            className="bg-cozy-sage hover:bg-cozy-sage/90"
          >
            Continue Shopping
          </Button>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <h1 className="text-2xl font-bold mb-6">Checkout</h1>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="w-full grid grid-cols-3">
                <TabsTrigger value="information" disabled={activeTab !== 'information'}>
                  Information
                </TabsTrigger>
                <TabsTrigger value="shipping" disabled={activeTab === 'information'}>
                  Shipping
                </TabsTrigger>
                <TabsTrigger value="payment" disabled={activeTab === 'information' || activeTab === 'shipping'}>
                  Payment
                </TabsTrigger>
              </TabsList>
              
              {/* Information Tab */}
              <TabsContent value="information">
                <form onSubmit={handleContinueToShipping} className="space-y-6 mt-6">
                  <div>
                    <h2 className="text-lg font-medium mb-4">Contact Information</h2>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email"
                          type="email"
                          placeholder="you@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                      
                      <div className="flex items-center">
                        <Checkbox
                          id="save-info"
                          checked={saveInfo}
                          onCheckedChange={(checked) => setSaveInfo(!!checked)}
                        />
                        <Label htmlFor="save-info" className="ml-2 cursor-pointer">
                          Save this information for next time
                        </Label>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h2 className="text-lg font-medium mb-4">Billing Address</h2>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="first-name">First Name</Label>
                          <Input 
                            id="first-name"
                            placeholder="John"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="last-name">Last Name</Label>
                          <Input 
                            id="last-name"
                            placeholder="Doe"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="address">Address</Label>
                        <Input 
                          id="address"
                          placeholder="123 Main St"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="apartment">Apartment, suite, etc. (optional)</Label>
                        <Input 
                          id="apartment"
                          placeholder="Apt 4B"
                          value={apartment}
                          onChange={(e) => setApartment(e.target.value)}
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="city">City</Label>
                          <Input 
                            id="city"
                            placeholder="San Francisco"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="state">State</Label>
                          <Select value={state} onValueChange={setState}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select State" />
                            </SelectTrigger>
                            <SelectContent>
                              {usStates.map((state) => (
                                <SelectItem key={state.value} value={state.value}>
                                  {state.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="zip">ZIP Code</Label>
                          <Input 
                            id="zip"
                            placeholder="94103"
                            value={zipCode}
                            onChange={(e) => setZipCode(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input 
                          id="phone"
                          type="tel"
                          placeholder="(415) 555-0123"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => navigate('/shop')}
                    >
                      Return to Shop
                    </Button>
                    <Button 
                      type="submit"
                      className="bg-cozy-sage hover:bg-cozy-sage/90"
                    >
                      Continue to Shipping
                    </Button>
                  </div>
                </form>
              </TabsContent>
              
              {/* Shipping Tab */}
              <TabsContent value="shipping">
                <form onSubmit={handleContinueToPayment} className="space-y-6 mt-6">
                  <div>
                    <h2 className="text-lg font-medium mb-4">Shipping Address</h2>
                    
                    <div className="flex items-center mb-4">
                      <Checkbox
                        id="same-as-billing"
                        checked={sameAsBilling}
                        onCheckedChange={(checked) => setSameAsBilling(!!checked)}
                      />
                      <Label htmlFor="same-as-billing" className="ml-2 cursor-pointer">
                        Same as billing address
                      </Label>
                    </div>
                    
                    {!sameAsBilling && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="shipping-first-name">First Name</Label>
                            <Input 
                              id="shipping-first-name"
                              placeholder="John"
                              value={shippingFirstName}
                              onChange={(e) => setShippingFirstName(e.target.value)}
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="shipping-last-name">Last Name</Label>
                            <Input 
                              id="shipping-last-name"
                              placeholder="Doe"
                              value={shippingLastName}
                              onChange={(e) => setShippingLastName(e.target.value)}
                              required
                            />
                          </div>
                        </div>
                        
                        <div>
                          <Label htmlFor="shipping-address">Address</Label>
                          <Input 
                            id="shipping-address"
                            placeholder="123 Main St"
                            value={shippingAddress}
                            onChange={(e) => setShippingAddress(e.target.value)}
                            required
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="shipping-apartment">Apartment, suite, etc. (optional)</Label>
                          <Input 
                            id="shipping-apartment"
                            placeholder="Apt 4B"
                            value={shippingApartment}
                            onChange={(e) => setShippingApartment(e.target.value)}
                          />
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div>
                            <Label htmlFor="shipping-city">City</Label>
                            <Input 
                              id="shipping-city"
                              placeholder="San Francisco"
                              value={shippingCity}
                              onChange={(e) => setShippingCity(e.target.value)}
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="shipping-state">State</Label>
                            <Select value={shippingState} onValueChange={setShippingState}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select State" />
                              </SelectTrigger>
                              <SelectContent>
                                {usStates.map((state) => (
                                  <SelectItem key={state.value} value={state.value}>
                                    {state.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="shipping-zip">ZIP Code</Label>
                            <Input 
                              id="shipping-zip"
                              placeholder="94103"
                              value={shippingZipCode}
                              onChange={(e) => setShippingZipCode(e.target.value)}
                              required
                            />
                          </div>
                        </div>
                        
                        <div>
                          <Label htmlFor="shipping-phone">Phone</Label>
                          <Input 
                            id="shipping-phone"
                            type="tel"
                            placeholder="(415) 555-0123"
                            value={shippingPhone}
                            onChange={(e) => setShippingPhone(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <h2 className="text-lg font-medium mb-4">Shipping Method</h2>
                    <RadioGroup value={shippingMethod} onValueChange={setShippingMethod} className="space-y-3">
                      {shippingMethods.map((method) => (
                        <div 
                          key={method.id}
                          className={`flex items-center justify-between border rounded-md p-4 cursor-pointer ${
                            shippingMethod === method.id ? 'border-cozy-sage bg-cozy-sage/5' : 'border-gray-200'
                          }`}
                          onClick={() => setShippingMethod(method.id)}
                        >
                          <div className="flex items-center">
                            <RadioGroupItem value={method.id} id={method.id} className="mr-3" />
                            <div>
                              <Label htmlFor={method.id} className="text-base font-medium cursor-pointer">
                                {method.name}
                              </Label>
                              <p className="text-sm text-gray-500">{method.time}</p>
                            </div>
                          </div>
                          <div className="font-medium">${method.price.toFixed(2)}</div>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                  
                  <div className="flex justify-between pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setActiveTab('information')}
                    >
                      Return to Information
                    </Button>
                    <Button 
                      type="submit"
                      className="bg-cozy-sage hover:bg-cozy-sage/90"
                    >
                      Continue to Payment
                    </Button>
                  </div>
                </form>
              </TabsContent>
              
              {/* Payment Tab */}
              <TabsContent value="payment">
                <form onSubmit={handlePlaceOrder} className="space-y-6 mt-6">
                  <div>
                    <h2 className="text-lg font-medium mb-4">Payment Method</h2>
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
                      <div 
                        className={`flex items-center justify-between border rounded-md p-4 cursor-pointer ${
                          paymentMethod === 'cod' ? 'border-cozy-sage bg-cozy-sage/5' : 'border-gray-200'
                        }`}
                        onClick={() => setPaymentMethod('cod')}
                      >
                        <div className="flex items-center">
                          <RadioGroupItem value="cod" id="cod" className="mr-3" />
                          <Label htmlFor="cod" className="text-base font-medium cursor-pointer">
                            Cash on Delivery (COD)
                          </Label>
                        </div>
                      </div>
                    </RadioGroup>
                    
                    <div className="mt-4 bg-gray-50 p-4 rounded-md">
                      <p className="text-sm text-gray-600">
                        You will pay for your order when it is delivered to your shipping address. Please have the exact amount ready as our delivery personnel may not carry change.
                      </p>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <Button
                      type="submit"
                      className="w-full bg-cozy-terracotta hover:bg-cozy-terracotta/90 py-6"
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processing Order...
                        </>
                      ) : (
                        <>Place Order - ${total.toFixed(2)}</>
                      )}
                    </Button>
                    
                    <div className="flex justify-start mt-4">
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => setActiveTab('shipping')}
                        disabled={isProcessing}
                      >
                        Return to Shipping
                      </Button>
                    </div>
                  </div>
                </form>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-lg p-6 sticky top-24">
              <h2 className="text-lg font-medium mb-4">Order Summary</h2>
              
              <div className="mb-4 max-h-80 overflow-auto">
                {cart.items.map((item) => {
                  const price = item.product.salePrice || item.product.price;
                  const variantObject = item.product.variants.find(v => v.id === item.variant);
                  const variantImage = variantObject?.image || item.product.images[0];
                  
                  return (
                    <div key={`${item.product.id}-${item.variant}`} className="flex items-center mb-4">
                      <div className="relative w-16 h-16 rounded overflow-hidden flex-shrink-0 border">
                        <img 
                          src={variantImage} 
                          alt={item.product.name} 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-0 right-0 bg-cozy-terracotta text-white w-5 h-5 flex items-center justify-center text-xs rounded-full -mt-1 -mr-1">
                          {item.quantity}
                        </div>
                      </div>
                      <div className="ml-3 flex-grow">
                        <p className="text-sm font-medium truncate">{item.product.name}</p>
                        <p className="text-xs text-gray-500">
                          {variantObject?.color || variantObject?.size || variantObject?.material || ''}
                        </p>
                      </div>
                      <div className="ml-2 text-right">
                        <p className="text-sm font-medium">${(price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-medium text-lg pt-2 border-t">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
