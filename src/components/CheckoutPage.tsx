import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useStatus } from '@/context/StatusContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ShieldCheck, CreditCard, AlertCircle, ShoppingCart, User, CheckCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';

const CheckoutPage: React.FC = () => {
  const { cart, clearCart } = useCart();
  const { currentUser, isAuthenticated } = useAuth();
  const { showStatus } = useStatus();
  const navigate = useNavigate();

  // Payment form state
  const [paymentInfo, setPaymentInfo] = useState({
    cardholderName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    saveCard: false
  });

  // Billing address state
  const [billingInfo, setBillingInfo] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'United States'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  // Calculate order summary
  const subtotal = cart.reduce((sum, item) => sum + (item.price.current * item.quantity), 0);
  const tax = subtotal * 0.05; // 5% tax
  const total = subtotal + tax;

  // Fill user data if available
  useEffect(() => {
    if (isAuthenticated && currentUser) {
      setBillingInfo(prev => ({
        ...prev,
        fullName: currentUser.displayName || '',
        email: currentUser.email || ''
      }));
    }
  }, [isAuthenticated, currentUser]);

  useEffect(() => {
    // Redirect if cart is empty
    if (cart.length === 0) {
      navigate('/cart');
    }

    // Redirect if not authenticated
    if (!isAuthenticated) {
      navigate('/login?redirect=checkout');
    }

    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, [cart, isAuthenticated, navigate]);

  // Handle input changes for payment form
  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setPaymentInfo(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error when field is being edited
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Handle input changes for billing form
  const handleBillingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBillingInfo(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when field is being edited
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validate the form before submission
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Validate payment information
    if (!paymentInfo.cardholderName.trim()) {
      newErrors.cardholderName = 'Cardholder name is required';
    }

    if (!paymentInfo.cardNumber.trim()) {
      newErrors.cardNumber = 'Card number is required';
    } else if (!/^\d{16}$/.test(paymentInfo.cardNumber.replace(/\s/g, ''))) {
      newErrors.cardNumber = 'Invalid card number';
    }

    if (!paymentInfo.expiryDate.trim()) {
      newErrors.expiryDate = 'Expiry date is required';
    } else if (!/^\d{2}\/\d{2}$/.test(paymentInfo.expiryDate)) {
      newErrors.expiryDate = 'Use format MM/YY';
    }

    if (!paymentInfo.cvv.trim()) {
      newErrors.cvv = 'CVV is required';
    } else if (!/^\d{3,4}$/.test(paymentInfo.cvv)) {
      newErrors.cvv = 'Invalid CVV';
    }

    // Validate billing information
    if (!billingInfo.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!billingInfo.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(billingInfo.email)) {
      newErrors.email = 'Invalid email address';
    }

    if (!billingInfo.address.trim()) {
      newErrors.address = 'Address is required';
    }

    if (!billingInfo.city.trim()) {
      newErrors.city = 'City is required';
    }

    if (!billingInfo.zip.trim()) {
      newErrors.zip = 'ZIP code is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      showStatus('Please correct the errors in the form', 'error');
      return;
    }

    setIsProcessing(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Successful checkout
      showStatus('Payment successful! Thank you for your purchase.', 'success');
      clearCart();

      // Redirect to order confirmation page
      navigate('/order-confirmation');
    } catch (error) {
      showStatus('Payment failed. Please try again.', 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  // Render step indicator
  const renderStepIndicator = () => {
    const steps = [
      { 
        number: 1, 
        title: 'Cart Review', 
        icon: ShoppingCart, 
        description: 'Review your selected courses',
        completed: true
      },
      { 
        number: 2, 
        title: 'Billing & Payment', 
        icon: CreditCard, 
        description: 'Enter payment information',
        completed: false,
        current: true
      },
      { 
        number: 3, 
        title: 'Confirmation', 
        icon: CheckCircle, 
        description: 'Complete your purchase',
        completed: false
      }
    ];

    return (
      <div className="mb-8">
        <div className="flex items-center justify-center">
          {steps.map((step, index) => (
            <React.Fragment key={step.number}>
              <div className="flex flex-col items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-colors ${
                  step.completed
                    ? 'bg-green-500 border-green-500 text-white'
                    : step.current
                    ? 'bg-purple-600 border-purple-600 text-white'
                    : 'bg-gray-200 border-gray-300 text-gray-500'
                }`}>
                  {step.completed ? (
                    <CheckCircle className="w-6 h-6" />
                  ) : (
                    <step.icon className="w-6 h-6" />
                  )}
                </div>
                <span className="text-sm mt-2 font-medium text-gray-700 dark:text-gray-300">
                  {step.title}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                  {step.description}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className={`w-16 h-1 mx-4 transition-colors ${
                  step.completed ? 'bg-green-500' : 'bg-gray-300'
                }`} />
              )}
            </React.Fragment>
          ))}
        </div>
        
        {/* Progress message */}
        <div className="text-center mt-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Complete Your Purchase
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
                            You're almost there! Just a few more steps to access your web development courses.
          </p>
        </div>
      </div>
    );
  };

  if (cart.length === 0 || !isAuthenticated) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Step Indicator */}
        {renderStepIndicator()}

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Checkout Form */}
          <div className="w-full lg:w-8/12">
            <form onSubmit={handleSubmit}>
              {/* Payment Information */}
              <Card className="bg-white dark:bg-gray-800 shadow-sm mb-8 overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <CreditCard className="w-5 h-5 text-purple-600" />
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                      Payment Information
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Cardholder Name */}
                    <div className="md:col-span-2">
                      <label htmlFor="cardholderName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Cardholder Name
                      </label>
                      <Input
                        id="cardholderName"
                        name="cardholderName"
                        value={paymentInfo.cardholderName}
                        onChange={handlePaymentChange}
                        placeholder="Name as it appears on card"
                        className={errors.cardholderName ? 'border-red-500' : ''}
                      />
                      {errors.cardholderName && (
                        <p className="text-red-500 text-xs mt-1">{errors.cardholderName}</p>
                      )}
                    </div>

                    {/* Card Number */}
                    <div className="md:col-span-2">
                      <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Card Number
                      </label>
                      <Input
                        id="cardNumber"
                        name="cardNumber"
                        value={paymentInfo.cardNumber}
                        onChange={handlePaymentChange}
                        placeholder="1234 5678 9012 3456"
                        className={errors.cardNumber ? 'border-red-500' : ''}
                      />
                      {errors.cardNumber && (
                        <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>
                      )}
                    </div>

                    {/* Expiry Date */}
                    <div>
                      <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Expiry Date
                      </label>
                      <Input
                        id="expiryDate"
                        name="expiryDate"
                        value={paymentInfo.expiryDate}
                        onChange={handlePaymentChange}
                        placeholder="MM/YY"
                        className={errors.expiryDate ? 'border-red-500' : ''}
                      />
                      {errors.expiryDate && (
                        <p className="text-red-500 text-xs mt-1">{errors.expiryDate}</p>
                      )}
                    </div>

                    {/* CVV */}
                    <div>
                      <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        CVV
                      </label>
                      <Input
                        id="cvv"
                        name="cvv"
                        value={paymentInfo.cvv}
                        onChange={handlePaymentChange}
                        placeholder="123"
                        className={errors.cvv ? 'border-red-500' : ''}
                      />
                      {errors.cvv && (
                        <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>
                      )}
                    </div>

                    {/* Save Card */}
                    <div className="md:col-span-2 flex items-center gap-2">
                      <Checkbox
                        id="saveCard"
                        name="saveCard"
                        checked={paymentInfo.saveCard}
                        onCheckedChange={(checked) => {
                          setPaymentInfo(prev => ({
                            ...prev,
                            saveCard: checked === true
                          }));
                        }}
                      />
                      <label htmlFor="saveCard" className="text-sm text-gray-700 dark:text-gray-300">
                        Save card for future purchases
                      </label>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Billing Address */}
              <Card className="bg-white dark:bg-gray-800 shadow-sm mb-8 overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <User className="w-5 h-5 text-purple-600" />
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                      Billing Address
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div className="md:col-span-2">
                      <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Full Name
                      </label>
                      <Input
                        id="fullName"
                        name="fullName"
                        value={billingInfo.fullName}
                        onChange={handleBillingChange}
                        className={errors.fullName ? 'border-red-500' : ''}
                      />
                      {errors.fullName && (
                        <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div className="md:col-span-2">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={billingInfo.email}
                        onChange={handleBillingChange}
                        className={errors.email ? 'border-red-500' : ''}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                      )}
                    </div>

                    {/* Address */}
                    <div className="md:col-span-2">
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Address
                      </label>
                      <Input
                        id="address"
                        name="address"
                        value={billingInfo.address}
                        onChange={handleBillingChange}
                        className={errors.address ? 'border-red-500' : ''}
                      />
                      {errors.address && (
                        <p className="text-red-500 text-xs mt-1">{errors.address}</p>
                      )}
                    </div>

                    {/* City */}
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        City
                      </label>
                      <Input
                        id="city"
                        name="city"
                        value={billingInfo.city}
                        onChange={handleBillingChange}
                        className={errors.city ? 'border-red-500' : ''}
                      />
                      {errors.city && (
                        <p className="text-red-500 text-xs mt-1">{errors.city}</p>
                      )}
                    </div>

                    {/* State */}
                    <div>
                      <label htmlFor="state" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        State/Province
                      </label>
                      <Input
                        id="state"
                        name="state"
                        value={billingInfo.state}
                        onChange={handleBillingChange}
                        className={errors.state ? 'border-red-500' : ''}
                      />
                      {errors.state && (
                        <p className="text-red-500 text-xs mt-1">{errors.state}</p>
                      )}
                    </div>

                    {/* ZIP Code */}
                    <div>
                      <label htmlFor="zip" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        ZIP/Postal Code
                      </label>
                      <Input
                        id="zip"
                        name="zip"
                        value={billingInfo.zip}
                        onChange={handleBillingChange}
                        className={errors.zip ? 'border-red-500' : ''}
                      />
                      {errors.zip && (
                        <p className="text-red-500 text-xs mt-1">{errors.zip}</p>
                      )}
                    </div>

                    {/* Country */}
                    <div>
                      <label htmlFor="country" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Country
                      </label>
                      <select
                        id="country"
                        name="country"
                        value={billingInfo.country}
                        onChange={handleBillingChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      >
                        <option value="United States">United States</option>
                        <option value="Canada">Canada</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Australia">Australia</option>
                      </select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Submit Button */}
              <div className="flex justify-end">
                <Button
                  type="submit"
                  className="bg-purple-600 hover:bg-purple-700 text-white py-6 px-12 text-lg"
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <div className="mr-2 animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                      Processing...
                    </>
                  ) : (
                    `Complete Purchase - ${total.toFixed(2)} USD`
                  )}
                </Button>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-4/12">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Order Summary
              </h2>

              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between py-2">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-white">
                        {item.title} {item.quantity > 1 ? `(x${item.quantity})` : ''}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        By {item.instructor.name}
                      </p>
                    </div>
                    <span className="font-medium text-gray-900 dark:text-white">
                      ${(item.price.current * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}

                <Separator />

                <div className="flex justify-between text-gray-700 dark:text-gray-300">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-gray-700 dark:text-gray-300">
                  <span>Tax (5%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-bold text-gray-900 dark:text-white">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg flex gap-3">
                <ShieldCheck className="w-6 h-6 text-green-500 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Secure Checkout
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Your payment information is encrypted and secure.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
